'use client';

import * as React from 'react';
import Image from 'next/image';
import { MainNav } from '@/components/MainNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  if (pathname === '/') {
    return null;
  }

  return (
    <>
      <header className="bg-gray-800 text-white shadow-md px-4">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center px-4">
          <div className="text-left">
            <p className="font-bold text-xl">Welcome to the Parishes of Caol and Glenfinnan</p>
            <p className="text-lg">Serving St John the Evangelist Church, Caol & St Mary & St Finnan Church, Glenfinnan</p>
          </div>
          <div className="flex-shrink-0 mx-4">
            <div
              className="relative w-[120px] h-[120px] rounded-full bg-white/20 p-2 cursor-pointer hover:bg-white/30 transition-colors duration-200"
              onClick={() => handleImageClick('/logo.png')}
            >
              <Image src="/logo.png" alt="Parish Logo" layout="fill" objectFit="contain" />
            </div>
          </div>
          <div className="text-right">
            <MainNav />
          </div>
        </div>
      </header>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
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
