import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-navy-deep text-ivory/80 mt-0">
      {/* Top gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 py-20">
        {/* Top wordmark */}
        <div className="text-center mb-14">
          <p className="smallcaps-lg text-gold">In Nomine Patris</p>
          <h3 className="mt-3 font-display text-ivory text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.01em] leading-tight">
            St John the Evangelist <span className="text-gold/80">·</span> St Mary &amp; St Finnan
          </h3>
          <div className="mt-5 mx-auto max-w-[140px] ornament-rule">
            <span className="text-base">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Caol */}
          <div>
            <p className="smallcaps text-gold mb-4">St John the Evangelist</p>
            <p className="font-display text-ivory text-xl leading-snug">Caol, Fort William</p>
            <p className="font-serif italic text-ivory/65 mt-2 text-sm">Beneath Ben Nevis</p>
            <hr className="gold-rule-thin my-5 max-w-[80px]" />
            <address className="not-italic font-sans text-sm leading-relaxed text-ivory/75">
              St Johns Road, Caol
              <br />
              Fort William PH33 7PR
              <br />
              <a href="tel:01397719281" className="hover:text-gold transition-colors">
                01397 719281
              </a>
              <br />
              <a href="mailto:caol@rcdai.org.uk" className="hover:text-gold transition-colors">
                caol@rcdai.org.uk
              </a>
            </address>
          </div>

          {/* Glenfinnan */}
          <div>
            <p className="smallcaps text-gold mb-4">St Mary &amp; St Finnan</p>
            <p className="font-display text-ivory text-xl leading-snug">Glenfinnan</p>
            <p className="font-serif italic text-ivory/65 mt-2 text-sm">Above Loch Shiel</p>
            <hr className="gold-rule-thin my-5 max-w-[80px]" />
            <address className="not-italic font-sans text-sm leading-relaxed text-ivory/75">
              Glenfinnan PH37 4LT
              <br />
              <a href="mailto:glenfinnan@rcdai.org.uk" className="hover:text-gold transition-colors">
                glenfinnan@rcdai.org.uk
              </a>
              <br />
              <span className="font-serif italic text-ivory/55">Clergy based at Caol</span>
            </address>
          </div>

          {/* Quick links */}
          <div>
            <p className="smallcaps text-gold mb-4">The Parish</p>
            <ul className="space-y-2.5 font-sans text-sm">
              <li>
                <Link href="/calendar" className="hover:text-gold transition-colors">
                  Mass &amp; Service Times
                </Link>
              </li>
              <li>
                <Link href="/sacraments" className="hover:text-gold transition-colors">
                  Sacraments
                </Link>
              </li>
              <li>
                <Link href="/prayer-requests" className="hover:text-gold transition-colors">
                  Prayer Requests
                </Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-gold transition-colors">
                  Give to the Parish
                </Link>
              </li>
              <li>
                <Link href="/safeguarding" className="hover:text-gold transition-colors">
                  Safeguarding
                </Link>
              </li>
              <li>
                <a
                  href="https://www.rcdai.org.uk/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.rcdai.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Diocese of Argyll &amp; the Isles
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-gold/20">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-4 text-gold/70">
              <span className="h-px w-8 bg-gold/40" />
              <span>✦</span>
              <span className="h-px w-8 bg-gold/40" />
            </div>
            <p className="font-serif italic text-ivory/60 text-sm">
              &copy; {new Date().getFullYear()} The Parishes of Caol &amp; Glenfinnan
            </p>
            <p className="smallcaps text-stone/80">
              Scottish Charity SC002876
              <span className="mx-2 text-gold/40">·</span>
              Web by{' '}
              <a
                href="https://divisetsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Diviset Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
