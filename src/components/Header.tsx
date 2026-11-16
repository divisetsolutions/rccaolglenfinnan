'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from '@/components/MainNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/') {
    return null;
  }

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-500',
          scrolled ? 'shadow-ivoryLift' : ''
        )}
      >
        {/* Eyebrow strip */}
        <div className="bg-navy-deep text-ivory/80">
          <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center justify-center">
            <span className="smallcaps text-gold/90">
              Parish of Caol and Glenfinnan
              <span className="mx-3 text-gold/60">✦</span>
              Diocese of Argyll and the Isles
            </span>
          </div>
        </div>

        {/* Main bar */}
        <div className="bg-ivory border-b border-gold/30">
          <div className="mx-auto max-w-[1400px] px-6 py-5 flex items-center gap-6">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleImageClick('/logo.png')}
              className="relative shrink-0 h-[72px] w-[72px] rounded-full overflow-hidden ring-1 ring-gold/40 bg-ivory-soft transition-transform hover:scale-[1.03]"
              aria-label="View parish crest"
            >
              <Image src="/logo.png" alt="Parish crest" fill className="object-contain p-1" />
            </button>

            {/* Wordmark */}
            <Link href="/" className="flex-1 min-w-0">
              <div className="font-display text-navy text-[1.55rem] md:text-[1.7rem] leading-[1.05] tracking-[-0.01em]">
                St John the Evangelist
                <span className="mx-2 text-gold/80">·</span>
                St Mary and St Finnan
              </div>
              <div className="smallcaps text-stone mt-1">Caol and Glenfinnan</div>
            </Link>
          </div>

          {/* Nav row */}
          <div className="border-t border-gold/20">
            <div className="mx-auto max-w-[1400px] px-6 py-3">
              <MainNav />
            </div>
          </div>
        </div>
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-ivory">
          <DialogHeader>
            <DialogTitle className="sr-only">Image View</DialogTitle>
          </DialogHeader>
          <Image
            src={selectedImage}
            alt="Selected image"
            width={1200}
            height={800}
            className="object-contain w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
