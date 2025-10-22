"use client";
import Link from "next/link";
import BookingForm from "../../components/BookningForm"; // Import the new component

export default function BookingPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-[#1f1f1f] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Boka Din Tid
        </h1>
        <p className="text-lg md:text-xl text-[#b2862d] font-medium mb-2">
          Välj tjänst, datum och tid — och säkra din plats hos våra
          professionella barberare.
        </p>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <BookingForm /> {/* Render the new BookingForm component */}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1f1f1f] text-white text-center py-12">
        <h2 className="text-3xl font-bold text-[#b2862d] mb-4">
          Redo för en ny look?
        </h2>
        <p className="mb-6">Vi ser fram emot att välkomna dig till SH-Cutz.</p>
        <Link href="/services">
          <button className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200 hover:scale-105">
            Se Våra Tjänster
          </button>
        </Link>
      </section>
    </div>
  );
}
