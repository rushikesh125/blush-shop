"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide Navbar for any route starting with '/admin/'
  if (pathname.startsWith('/admin')) return null;

  return <Navbar />;
}
