"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/services", label: "Tjänster" },
  { href: "/boking", label: "Boking" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#1f1f1f]/95 backdrop-blur-md shadow-md transition-all duration-300 ${
        scrolled ? "bg-[#1f1f1f]" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#b2862d] transition-transform duration-200 hover:scale-105">
            Rezcut
          </span>
          <span className="text-xl text-white opacity-50">✂</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative transition-colors duration-200 hover:text-[#b2862d] py-1 ${
                  pathname === link.href
                    ? "text-[#b2862d] border-b-2 border-[#b2862d]"
                    : ""
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#b2862d] to-yellow-400 rounded-full shadow-md"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle and Hamburger */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Öppna meny"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-[#1f1f1f] rounded-xl shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-4 px-6 gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 hover:bg-[#b2862d]/20 hover:text-[#b2862d] ${
                  pathname === link.href
                    ? "text-[#b2862d] border-b-2 border-[#b2862d]"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
