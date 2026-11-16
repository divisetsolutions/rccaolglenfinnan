#!/usr/bin/env python3
"""Weekly publisher for the parish website.

Looks in Google Drive for this week's newsletter and Sunday homily and puts
them on the website. Safe to run as often as you like: it only publishes a
file that is new or has changed since it was last published.

  python3 scripts/weekly_publish.py            publish anything new
  python3 scripts/weekly_publish.py --dry-run  show what would be published
  python3 scripts/weekly_publish.py --seed     mark current files as already published

Rules that keep private texts off the site:
  * A homily is published only if its file name looks like a Sunday or feast
    day ("Homily_33rd_Sunday_Ordinary_Time_Year_A_15th_November_2026.docx").
    Funeral, requiem, wedding and anniversary homilies never match.
  * A homily is published only after 3 pm on the day it was preached.
  * Anything the script is unsure about is skipped and written to the log.
"""
import datetime as dt, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path
from zoneinfo import ZoneInfo

REPO = Path(__file__).resolve().parent.parent
DRIVE = Path('/mnt/d/google-drive')
HOMILIES = DRIVE / 'Homily'
NEWSLETTERS = DRIVE / 'Caol Parish' / 'Newsletter'
STATE_DIR = Path.home() / '.local' / 'state' / 'parish-publish'
STATE, LOG = STATE_DIR / 'state.json', STATE_DIR / 'log.txt'
NODE = shutil.which('node') or str(Path.home() / '.nvm/versions/node/v22.14.0/bin/node')
POWERSHELL = '/mnt/c/WINDOWS/System32/WindowsPowerShell/v1.0/powershell.exe'
WIN_TEMP = Path('/mnt/c/Users/egbon/AppData/Local/Temp/parish-publish')

sys.path.insert(0, str(REPO / 'scripts'))
from homilies_to_json import convert  # noqa: E402

MONTHS = {m: i + 1 for i, m in enumerate(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])}
DAY_MONTH = r'(?P<d>\d{1,2})(?:st|nd|rd|th)?[_\-. ]+(?P<mon>[A-Za-z]{3,9})\.?'
HOMILY = re.compile(r'^Homily[_\-](?P<occ>.+?)(?:[_\-]Year[_\-](?P<yr>[ABC]))?[_\-]' + DAY_MONTH + r'[_\-]?(?P<y>\d{4})(?:_\d+| \(\d+\))?\.docx$', re.I)
NEWSLETTER = re.compile(r'^(?!~\$).*?[_\- ]' + DAY_MONTH + r'(?: \(\d+\))?\.docx$', re.I)
ALLOW = re.compile(r'sunday|saints|ascension|pentecost|trinity|corpus|assumption|king|advent|lent|easter|christmas|nativity|epiphany|baptism_of_the_lord|holy_family|peter_and_paul|immaculate|mother_of_god|ash_wednesday|holy_thursday|good_friday|vigil|palm|presentation|annunciation', re.I)
DENY = re.compile(r'requiem|funeral|marriage|wedding|anni|memorial|jubilee|bidding', re.I)

SEEN = {}  # date -> {state key: mtime} for every candidate file, including duplicates

def log(msg):
    line = f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M')}  {msg}"
    print(line)
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    with open(LOG, 'a') as f:
        f.write(line + '\n')

def parse_date(m, year):
    mon = MONTHS.get(m.group('mon').lower()[:3])
    try:
        return dt.date(int(year), mon, int(m.group('d'))) if mon else None
    except ValueError:
        return None

def occasion_text(occ, yr):
    t = re.sub(r'[_\-]+', ' ', occ).strip()
    t = re.sub(r'Sunday Ordinary Time', 'Sunday in Ordinary Time', t, flags=re.I)
    t = re.sub(r'Sunday (Easter|Lent|Advent)\b', r'Sunday of \1', t, flags=re.I)
    return f'{t}, Year {yr.upper()}' if yr else t

def find_homilies(now, state):
    found = {}
    for year in {now.year, now.year - 1}:
        for p in sorted((HOMILIES / str(year)).glob('*.docx')):
            m = HOMILY.match(p.name)
            if not m:
                continue
            if DENY.search(p.name) or not ALLOW.search(m.group('occ')):
                continue
            date = parse_date(m, m.group('y'))
            if not date or not (now.date() - dt.timedelta(days=21) <= date <= now.date()):
                continue
            if date == now.date() and now.hour < 15:
                continue                      # not yet preached at both churches
            key, mtime = f'homily:{p}', p.stat().st_mtime
            if state.get(key) == mtime:
                continue
            SEEN.setdefault(date, {})[key] = mtime
            best = found.get(date)
            if not best or mtime > best[1]:
                found[date] = (p, mtime, key, occasion_text(m.group('occ'), m.group('yr')))
    return found

def find_newsletters(now, state):
    found = {}
    for year in {now.year, now.year - 1}:
        for p in sorted((NEWSLETTERS / str(year)).glob('*.docx')):
            m = NEWSLETTER.match(p.name)
            date = parse_date(m, year) if m else None
            # Saturday evening's newsletter is dated for the Sunday, so allow one day ahead.
            if not date or not (now.date() - dt.timedelta(days=8) <= date <= now.date() + dt.timedelta(days=1)):
                continue
            key, mtime = f'newsletter:{p}', p.stat().st_mtime
            if state.get(key) == mtime:
                continue
            SEEN.setdefault(date, {})[key] = mtime
            best = found.get(date)
            if not best or mtime > best[1]:
                found[date] = (p, mtime, key)
    return found

def word_to_pdf(folder):
    """Export every .docx in a Windows temp folder to PDF using Word."""
    win = subprocess.run(['wslpath', '-w', str(folder)], capture_output=True, text=True, check=True).stdout.strip()
    script = (
        "$w = New-Object -ComObject Word.Application; $w.Visible = $false; $w.DisplayAlerts = 0; "
        f"try {{ Get-ChildItem '{win}\\*.docx' | ForEach-Object {{ $d = $w.Documents.Open($_.FullName, $false, $true); "
        "$d.ExportAsFixedFormat(($_.FullName -replace '\\.docx$', '.pdf'), 17); $d.Close($false) } } finally { $w.Quit() }"
    )
    subprocess.run([POWERSHELL, '-NoProfile', '-Command', script], check=True, timeout=300, capture_output=True)

def main():
    dry, seed = '--dry-run' in sys.argv, '--seed' in sys.argv
    now = dt.datetime.now(ZoneInfo('Europe/London'))
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    if not DRIVE.exists():
        log('Google Drive folder not found at /mnt/d/google-drive; nothing done.')
        return 1
    homilies, newsletters = find_homilies(now, state), find_newsletters(now, state)
    if not homilies and not newsletters:
        log('Nothing new to publish.')
        return 0
    for date, (p, *_rest) in sorted(newsletters.items()):
        log(f"{'Would publish' if dry else 'Seeding' if seed else 'Publishing'} newsletter {date}: {p.name}")
    for date, (p, _m, _k, occ) in sorted(homilies.items()):
        log(f"{'Would publish' if dry else 'Seeding' if seed else 'Publishing'} homily {date} ({occ}): {p.name}")
    if dry:
        return 0
    if seed:
        for d in list(newsletters) + list(homilies):
            state.update(SEEN.get(d, {}))
        STATE.write_text(json.dumps(state, indent=1))
        return 0

    failed = False
    if newsletters:
        try:
            shutil.rmtree(WIN_TEMP, ignore_errors=True)
            WIN_TEMP.mkdir(parents=True)
            for date, (p, *_r) in newsletters.items():
                shutil.copy(p, WIN_TEMP / f'{date.isoformat()}.docx')
            word_to_pdf(WIN_TEMP)
            subprocess.run([NODE, str(REPO / 'scripts' / 'publish-newsletter.cjs'), str(WIN_TEMP)], check=True, cwd=REPO, timeout=300)
            for d in newsletters:
                state.update({k: v for k, v in SEEN.get(d, {}).items() if k.startswith('newsletter:')})
            log(f'Newsletters published: {len(newsletters)}')
        except Exception as e:  # noqa: BLE001
            failed = True
            log(f'NEWSLETTER FAILED: {e}')
    if homilies:
        try:
            items = []
            for date, (p, _m, _k, occ) in sorted(homilies.items()):
                theme, excerpt, content, body = convert(p)
                if len(body) < 3:
                    log(f'Skipped {p.name}: could not read enough text from it.')
                    continue
                items.append({'id': f'homily-{date.isoformat()}', 'date': date.isoformat(), 'occasion': occ, 'title': theme or occ.split(',')[0], 'excerpt': excerpt, 'content': content})
            if items:
                with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
                    json.dump(items, f, ensure_ascii=False)
                subprocess.run([NODE, str(REPO / 'scripts' / 'publish-homilies.cjs'), f.name], check=True, cwd=REPO, timeout=300)
                os.unlink(f.name)
            for d in homilies:
                state.update({k: v for k, v in SEEN.get(d, {}).items() if k.startswith('homily:')})
            log(f"Homilies published: {', '.join(i['title'] for i in items) or 'none'}")
        except Exception as e:  # noqa: BLE001
            failed = True
            log(f'HOMILY FAILED: {e}')
    STATE.write_text(json.dumps(state, indent=1))
    return 1 if failed else 0

if __name__ == '__main__':
    sys.exit(main())
