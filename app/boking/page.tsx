"use client";
import { Suspense } from "react";
import Link from "next/link";
import BookingForm from "../../components/BookningForm"; // Import the new component
import { useSearchParams } from "next/navigation";

// Skapa en ny komponent för att isolera useSearchParams
function BookingComponent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  return <BookingForm defaultServiceId={serviceId || undefined} />;
}

export default function BookingPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-[#1f1f1f] text-gray-900 dark:text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Boka Din Tid
        </h1>
        <p className="text-lg md:text-xl text-yellow-600 dark:text-[#b2862d] font-medium mb-2">
          Välj tjänst, datum och tid — och säkra din plats hos våra
          professionella barberare.
        </p>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="text-center p-8">Laddar bokningsformulär...</div>
          }
        >
          <BookingComponent />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-[#1f1f1f] text-center py-12">
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-[#b2862d] mb-4">
          Redo för en ny stil?
        </h2>
        <p className="mb-6 text-gray-700 dark:text-white">
          Vi ser fram emot att välkomna dig till Noori's Barber.
        </p>
        <Link href="/services">
          <button className="bg-yellow-500 dark:bg-[#b2862d] text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 dark:hover:bg-[#b2862d]/80 transition-all duration-200 hover:scale-105">
            Se Våra Tjänster
          </button>
        </Link>
      </section>
    </div>
  );
}
