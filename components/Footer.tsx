"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 mt-16 border-t border-gold">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-gold font-bold mb-4">Snabblänkar</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Hem
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-gold transition-colors"
              >
                Tjänster
              </Link>
            </li>
            <li>
              <Link
                href="/boking"
                className="hover:text-gold transition-colors"
              >
                Bokning
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gold transition-colors"
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gold font-bold mb-4">Kontakt</h3>
          <p>Centralvägen 1, 194 76 Upplands Väsby</p>
          <p>070-123 45 67</p>
          <p>info@rezcut.se</p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-gold font-bold mb-4">Öppettider</h3>
          <p>Mån–Fre: 10:00–20:00</p>
          <p>Lör: 10:00–15:00</p>
          <p>Sön: Stängt</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Rezcut. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
}
