# Rezcut Barbershop - Webbplats & Bokningssystem

!Next.js
!React
!TypeScript
!Tailwind CSS
!Azure

En modern och professionell webbplats för Rezcut Barbershop med ett integrerat bokningssystem, adminpanel och dynamisk hantering av öppettider via Azure Cosmos DB.

## 🎯 Översikt

Rezcut är en fullständig webbapplikation byggd med Next.js som inkluderar:

- En responsiv och modern webbplats.
- Ett fullt fungerande bokningssystem med dynamiska tider.
- Automatisk e-postbekräftelse till kunder och notifiering till salongen.
- En adminpanel för att hantera bokningar.
- En adminpanel för att enkelt kunna ändra arbetsdagar, tider och raster.
- **Öppettider** sparas och hanteras via **Azure Cosmos DB**.
- **Bokningar** sparas i en lokal `bookings.json`-fil (för enkelhetens skull i utveckling och på Azure App Service).

## ✨ Funktioner

### För Kunder
- **Hemsida:** Presentation av salongen, tjänster, galleri och kundrecensioner.
- **Onlinebokning:** Ett enkelt bokningssystem som visar lediga tider baserat på administratörens inställningar.
- **E-postbekräftelse:** Automatisk bekräftelse skickas till kunden efter bokningsförfrågan.
- **Kontakt:** Sida med kontaktuppgifter, karta och kontaktformulär.

### För Administratörer
- **Lösenordsskyddad Adminpanel (`/admin`):** Säker sida för att se och hantera inkomna bokningar.
- **Dynamisk Tidsstyrning (`/admin/tider`):** Enkel sida för att ställa in vilka dagar och tider du arbetar, samt lägga till raster. All data sparas i Azure Cosmos DB.
- **Statushantering:** Markera bokningar som "hanterade" eller "ohanterade".

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Backend & API:** Next.js API Routes, Nodemailer (för e-post).
- **Databas:**
  - **Azure Cosmos DB:** För att spara och hantera öppettider.
  - **File System (fs):** För att spara bokningar i `bookings.json`.

## 📁 Projektstruktur

```
rezcut/
├── app/
│   ├── admin/
│   │   ├── page.tsx         # Adminpanel för bokningar
│   │   └── tider/
│   │       └── page.tsx     # Adminpanel för öppettider
│   ├── api/
│   │   ├── availability/
│   │   │   └── route.ts     # API för att hämta/spara öppettider
│   │   ├── bookings/
│   │   │   └── route.ts     # API för att hämta/uppdatera bokningar
│   │   ├── contact/
│   │   │   └── route.ts     # API för kontaktformulär
│   │   └── send/
│   │       └── route.ts     # API för att skapa bokning & skicka e-post
│   ├── boking/
│   │   └── page.tsx         # Bokningssida
│   └── ...                  # Övriga sidor (hem, tjänster, kontakt)
├── components/              # React-komponenter
├── data/                    # Statisk data (tjänster, bokningar)
├── lib/
│   └── cosmos.ts            # Anslutningslogik för Cosmos DB
└── ...                      # Övriga konfigurationsfiler
```

## 🚀 Kom igång

1.  **Klona projektet:** `git clone <repository-url>`
2.  **Installera paket:** `npm install`
3.  **Konfigurera miljövariabler:**
    -   Kopiera `.env.local.example` till en ny fil: `.env.local`.
    -   Fyll i dina värden för `SMTP_USER`, `SMTP_PASS`, `NEXT_PUBLIC_ADMIN_PASSWORD` och `COSMOS_CONNECTION_STRING`.
4.  **Starta utvecklingsservern:** `npm run dev`

## 🔐 Miljövariabler

| Variabel | Beskrivning |
| :--- | :--- |
| `SMTP_USER` | Din e-postadress för att skicka bekräftelser (t.ex. Gmail). |
| `SMTP_PASS` | Ditt app-lösenord för e-postkontot. |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Lösenord för att komma åt `/admin`-sidorna. |
| `COSMOS_CONNECTION_STRING` | Din anslutningssträng till Azure Cosmos DB. |

## 🚢 Deployment till Azure

Projektet är konfigurerat för att driftsättas på **Azure App Service**.

1.  **Skapa en App Service:** Skapa en ny App Service i Azure-portalen med Node.js som runtime stack.
2.  **Koppla till GitHub:** Använd "Deployment Center" för att sätta upp automatisk publicering från ditt GitHub-repository.
3.  **Lägg till miljövariabler:** Gå till **Configuration -> Application settings** i din App Service och lägg till alla miljövariabler från din `.env.local`-fil.
4.  **Publicera:** Pusha dina ändringar till GitHub för att starta en publicering.

> **OBS!** Se till att din Azure App Service har följande inställningar under **Configuration -> Application settings** för att bygget ska fungera korrekt:
> - `SCM_DO_BUILD_DURING_DEPLOYMENT`: `true`
> - `WEBSITES_CONTAINER_START_TIME_LIMIT`: `300`


---

**Byggt med ❤️ för Rezcut**
