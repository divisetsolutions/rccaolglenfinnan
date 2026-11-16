"""Convert Sunday homily .docx files into JSON ready for the website.
Usage: python3 homilies_to_json.py <homily folder> <out.json>
Only files listed in MANIFEST are read, so funeral and wedding homilies are never published."""
import html, json, re, subprocess, sys
from pathlib import Path

OT = 'Sunday in Ordinary Time'
MANIFEST = [
  ('2026-01-11', 'The Baptism of the Lord', 'Homily for the Baptism of the Lord 11th Jan.docx'),
  ('2026-01-25', f'3rd {OT} (Sunday of the Word of God)', 'Homily for 3rd Sunday Word of God 25th Jan.docx'),
  ('2026-02-01', f'4th {OT}', 'Homily for 4th Sunday Year A1st Feb.docx'),
  ('2026-02-08', f'5th {OT}', 'Homily for 5th Sunday Year A 8th Feb.docx'),
  ('2026-02-15', f'6th {OT}', 'Homily for 6th Sunday Year A 15th Feb.docx'),
  ('2026-02-18', 'Ash Wednesday', 'Ash Wednesday Homily.docx'),
  ('2026-02-22', '1st Sunday of Lent', 'Homily for the 1st Sunday of Lent Year A 22nd Feb.docx'),
  ('2026-03-01', '2nd Sunday of Lent', 'Homily for the 2nd Sunday of Lent Year A 1st Mar.docx'),
  ('2026-03-15', '4th Sunday of Lent', 'Homily for the 4th Sunday of Lent Year A 15th Mar.docx'),
  ('2026-03-29', 'Palm Sunday', 'Homily for Palm Sunday Year A 29th Mar.docx'),
  ('2026-04-04', 'The Easter Vigil', 'Homily Easter Vigil.docx'),
  ('2026-04-05', 'Easter Sunday', 'Homily Easter Sunday.docx'),
  ('2026-04-12', '2nd Sunday of Easter', 'Homily for the 2nd Sunday of Easter Year A 12 April.docx'),
  ('2026-04-19', '3rd Sunday of Easter', 'Homily_3rd_Sunday_Easter_Year_A_19th_April_2026.docx'),
  ('2026-04-26', '4th Sunday of Easter', 'Homily_4th_Sunday_Easter_Year_A_26th_Apr_2026 (1).docx'),
  ('2026-05-03', '5th Sunday of Easter', 'Homily_5th_Sunday_Easter_Year_A_3rd_May_2026.docx'),
  ('2026-05-10', '6th Sunday of Easter', 'Homily_6th_Sunday_Easter_Year_A_10th_May_2026.docx'),
  ('2026-05-14', 'The Ascension of the Lord', 'Homily_Ascension_Year_A_14th_May_2026.docx'),
  ('2026-05-24', 'Pentecost Sunday', 'Homily_Pentecost_Sunday_Year_A_24th_May_2026.docx'),
  ('2026-05-31', 'The Most Holy Trinity', 'Homily_Holy_Trinity_Year_A_31st_May_2026.docx'),
  ('2026-06-07', 'Corpus Christi', 'Homily_Corpus_Christi_Year_A_7th_June_2026.docx'),
  ('2026-06-14', f'11th {OT}', 'Homily_11th_Sunday_Ordinary_Time_Year_A_14th_June_2026.docx'),
  ('2026-06-21', f'12th {OT}', 'Homily_12th_Sunday_Ordinary_Time_Year_A_21st_June_2026.docx'),
  ('2026-06-28', f'13th {OT}', 'Homily_13th_Sunday_Ordinary_Time_Year_A_28th_June_2026.docx'),
  ('2026-06-28', 'Saints Peter and Paul', 'Homily_Sts_Peter_and_Paul_28th_June_2026.docx'),
  ('2026-07-05', f'14th {OT}', 'Homily_14th_Sunday_Ordinary_Time_Year_A_5th_July_2026.docx'),
  ('2026-07-12', f'15th {OT}', 'Homily_15th_Sunday_Ordinary_Time_Year_A_12th_July_2026_1.docx'),
  ('2026-07-19', f'16th {OT}', 'Homily_16th_Sunday_Ordinary_Time_Year_A_19th_July_2026.docx'),
  ('2026-07-26', f'17th {OT}', 'Homily_17th_Sunday_Ordinary_Time_Year_A_26th_July_2026.docx'),
  ('2026-08-02', f'18th {OT}', 'Homily_18th_Sunday_Ordinary_Time_Year_A_2nd_August_2026.docx'),
  ('2026-08-09', f'19th {OT}', 'Homily_19th_Sunday_Ordinary_Time_Year_A_9th_August_2026.docx'),
  ('2026-08-16', 'The Assumption of the Blessed Virgin Mary', 'Homily_The_Assumption_of_the_Blessed_Virgin_Mary_20th_Sunday_Ordinary_Time_Year_A_16th_August_2026.docx'),
  ('2026-08-23', f'21st {OT}', 'Homily_21st_Sunday_Ordinary_Time_Year_A_23rd_August_2026.docx'),
  ('2026-08-30', f'22nd {OT}', 'Homily_22nd_Sunday_Ordinary_Time_Year_A_30th_August_2026.docx'),
  ('2026-09-06', f'23rd {OT}', 'Homily_23rd_Sunday_Ordinary_Time_Year_A_6th_September_2026.docx'),
  ('2026-09-13', f'24th {OT}', 'Homily_24th_Sunday_Ordinary_Time_Year_A_13th_September_2026.docx'),
  ('2026-09-20', f'25th {OT}', 'Homily-25th_Sunday_Ordinary_Time_Year_A-20th_September_2026.docx'),
  ('2026-10-04', f'27th {OT}', 'Homily_27th_Sunday_Ordinary_Time_Year_A_4th_October_2026.docx'),
  ('2026-10-11', f'28th {OT}', 'Homily_28th_Sunday_Ordinary_Time_Year_A_11th_October_2026.docx'),
  ('2026-11-01', 'All Saints', 'Homily_All_Saints_1st_November_2026.docx'),
  ('2026-11-08', f'32nd {OT}', 'Homily_32nd_Sunday_Ordinary_Time_Year_A_8th_November_2026.docx'),
  ('2026-11-15', f'33rd {OT}', 'Homily_33rd_Sunday_Ordinary_Time_Year_A_15th_November_2026.docx'),
]

ALLOWED = {'p', 'em', 'strong', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'br'}

def clean(markup: str) -> str:
    markup = re.sub(r'<h1[^>]*>', '<h2>', markup).replace('</h1>', '</h2>')
    def tag(m):
        name = m.group(2).lower()
        return f'<{m.group(1)}{name}>' if name in ALLOWED else ''
    markup = re.sub(r'<(/?)([a-zA-Z0-9]+)[^>]*>', tag, markup)
    return re.sub(r'<p>\s*</p>', '', markup).strip()

text = lambda block: html.unescape(re.sub(r'<[^>]+>', '', block)).strip()

def convert(path: Path):
    raw = subprocess.run(['pandoc', str(path), '-t', 'html', '--wrap=none'], capture_output=True, text=True, check=True).stdout
    blocks = re.findall(r'<(?:p|h[1-6]|ul|ol|blockquote)[\s>].*?</(?:p|h[1-6]|ul|ol|blockquote)>', clean(raw), flags=re.S)
    theme, body = None, []
    for i, b in enumerate(blocks):
        t = text(b)
        if not t:
            continue
        if i < 3 and len(t) < 160 and re.search(r'homily|sunday in ordinary time|year a\b', t, re.I) and not re.match(r'^theme', t, re.I):
            continue                                   # the heading line
        m = re.match(r'^theme\s*[:\-–]\s*(.+)$', t, re.I)
        if i < 6 and m and len(t) < 140:
            theme = m.group(1).strip().strip('“”"').rstrip('.')
            continue
        body.append(b)
    if not theme and body and len(text(body[0])) < 60 and not text(body[0]).endswith('.'):
        theme = text(body.pop(0))                      # an untitled short line used as the title
    first = next((text(b) for b in body if len(text(b)) > 80), text(body[0]) if body else '')
    excerpt = first if len(first) <= 230 else re.sub(r'\s+\S*$', '', first[:230]).rstrip(',;:') + '…'
    return theme, excerpt, '\n'.join(body).replace('13thth', '13th'), body

if __name__ == '__main__':
    folder, out = Path(sys.argv[1]), sys.argv[2]
    items = []
    for date, occasion, name in MANIFEST:
        p = folder / name
        if not p.exists():
            print('MISSING', name); continue
        theme, excerpt, content, body = convert(p)
        sid = f'homily-{date}' + ('-peter-paul' if 'Peter' in occasion else '')
        items.append({'id': sid, 'date': date, 'occasion': f'{occasion}, Year A' if 'Sunday' in occasion and 'Easter Sunday' not in occasion and 'Palm' not in occasion and 'Pentecost' not in occasion else occasion,
                      'title': theme or occasion, 'excerpt': excerpt, 'content': content})
        print(f"{date} | {occasion[:34]:34} | {(theme or '(no theme)')[:44]:44} | {len(body):2} paras | lead-in: {text(body[0])[:50] if body else 'EMPTY'}")
    json.dump(items, open(out, 'w'), ensure_ascii=False, indent=1)
    print(len(items), 'homilies written')
