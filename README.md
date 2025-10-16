# SH-Cutz Barbershop - Bokningswebbplats

En modern och professionell webbplats för SH-Cutz Barbershop med integrerat bokningssystem, adminpanel och automatisk e-postbekräftelse.

![SH-Cutz](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)

## 📋 Innehållsförteckning

- [Översikt](#översikt)
- [Funktioner](#funktioner)
- [Tech Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Kom igång](#kom-igång)
- [API-dokumentation](#api-dokumentation)
- [Miljövariabler](#miljövariabler)
- [Sidor](#sidor)
- [Deployment](#deployment)

## 🎯 Översikt

SH-Cutz är en fullständig webbapplikation för en barbershop som inkluderar:
- Responsiv webbplats med moderna designprinciper
- Fullt fungerande bokningssystem
- Automatisk e-postbekräftelse till kunder
- E-postnotifiering till salongen vid nya bokningar
- Adminpanel för att hantera bokningar
- Filbaserad datalagring för bokningar

## ✨ Funktioner

### För Kunder
- 🏠 **Hemsida** - Presenterar salongen, tjänster, galleri och kundrecensioner
- 📅 **Online Bokning** - Enkelt bokningssystem med datumväljare
- ✉️ **E-postbekräftelse** - Automatisk bekräftelse skickas till kunden
- 💈 **Tjänstöversikt** - Detaljerad information om alla tjänster
- 📞 **Kontaktinformation** - Öppettider, adress och kontaktuppgifter

### För Administratörer
- 🔐 **Adminpanel** - Säker sida för att hantera bokningar
- ✅ **Statushantering** - Markera bokningar som hanterade/ohanterade
- 📊 **Bokningsöversikt** - Se alla bokningar med detaljerad information
- 🔄 **Realtidsuppdatering** - Bokningar uppdateras direkt i systemet

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5.4** - React-ramverk med App Router
- **React 19.1.0** - Användargränssnittsbibliotek
- **TypeScript 5** - Typsäkert JavaScript
- **Tailwind CSS 4** - Utility-first CSS-ramverk

### Backend & API
- **Next.js API Routes** - Serverless API-endpoints
- **Nodemailer 7.0.9** - E-posthantering via SMTP
- **File System (fs)** - Datalagring i JSON-fil

### Development Tools
- **Turbopack** - Snabb bundler för utveckling
- **ESLint** - Code linting
- **PostCSS** - CSS-transformation

## 📁 Projektstruktur

```
sh-cutz-booking/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Hemsida
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Globala CSS-stilar
│   ├── admin/
│   │   └── page.tsx         # Adminpanel för bokningshantering
│   ├── api/
│   │   ├── bookings/
│   │   │   └── route.ts     # GET & PATCH för bokningar
│   │   └── send/
│   │       └── route.ts     # POST för att skapa bokning & skicka e-post
│   ├── boking/
│   │   └── page.tsx         # Bokningssida med formulär
│   ├── contact/
│   │   └── page.tsx         # Kontaktsida
│   └── services/
│       └── page.tsx         # Tjänstesida
├── components/              # React-komponenter
│   ├── BookningForm.tsx     # Bokningsformulär
│   ├── Footer.tsx           # Sidfot
│   └── Navbar.tsx           # Navigeringsmeny
├── data/
│   └── bookings.json        # Datalagring för bokningar
├── public/                  # Statiska filer
│   └── images/              # Bilder för webbplatsen
├── .env.local              # Miljövariabler (ej i git)
├── package.json            # NPM-dependencies
├── tsconfig.json           # TypeScript-konfiguration
├── tailwind.config.js      # Tailwind CSS-konfiguration
└── next.config.ts          # Next.js-konfiguration
```

## 🚀 Kom igång

### Förutsättningar

Se till att du har följande installerat:
- **Node.js** 20.x eller senare
- **npm** eller annan pakethanterare (yarn, pnpm, bun)

### Installation

1. **Klona projektet**
```bash
git clone <repository-url>
cd sh-cutz-booking
```

2. **Installera dependencies**
```bash
npm install
```

3. **Skapa miljövariabler**

Skapa en `.env.local`-fil i projektets rotmapp:
```env
SMTP_USER=din-email@gmail.com
SMTP_PASS=ditt-app-lösenord
```

> **OBS!** För Gmail måste du använda ett App-specifikt lösenord. Gå till Google Account Settings → Security → 2-Step Verification → App passwords

4. **Skapa datamapp**
```bash
mkdir data
echo "[]" > data/bookings.json
```

5. **Starta utvecklingsservern**
```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### Build för produktion

```bash
npm run build
npm start
```

## 📡 API-dokumentation

### POST `/api/send`

Skapar en ny bokning och skickar e-post till både kund och salong.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0701234567",
  "service": "Haircut",
  "date": "2025-10-20",
  "time": "14:00",
  "message": "Vill ha kort på sidorna"
}
```

**Response:**
```json
{
  "success": true
}
```

**Funktioner:**
- Sparar bokningen i `data/bookings.json`
- Skickar bekräftelse till kunden
- Skickar notifiering till salongen
- Genererar unikt ID baserat på timestamp

### GET `/api/bookings`

Hämtar alla bokningar från systemet.

**Response:**
```json
[
  {
    "id": 1729081234567,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0701234567",
    "service": "Haircut",
    "date": "2025-10-20",
    "time": "14:00",
    "message": "Vill ha kort på sidorna",
    "created": "2025-10-16T10:55:36.000Z",
    "handled": false
  }
]
```

### PATCH `/api/bookings`

Uppdaterar status på en bokning (markera som hanterad/ohanterad).

**Request Body:**
```json
{
  "id": 1729081234567,
  "handled": true
}
```

**Response:**
```json
{
  "success": true
}
```

## 🔐 Miljövariabler

Skapa en `.env.local`-fil med följande variabler:

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `SMTP_USER` | E-postadress för SMTP-server | `info@sh-cutz.se` |
| `SMTP_PASS` | Lösenord/App-lösenord för e-post | `abcd efgh ijkl mnop` |

### Konfigurera Gmail SMTP

1. Aktivera 2-stegsverifiering på ditt Google-konto
2. Gå till [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Skapa ett nytt app-lösenord för "Mail"
4. Använd det genererade lösenordet i `SMTP_PASS`

## 📄 Sidor

### `/` - Hemsida
- Hero-sektion med call-to-action
- Om-sektion med information om salongen
- Tjänstöversikt med priser
- Galleri med bilder
- Kundrecensioner
- Kontaktinformation i footer

### `/boking` - Bokningssida
- Interaktivt bokningsformulär
- Datumväljare för bokningsdatum
- Tjänstval med dropdown
- Validering av alla fält
- Bekräftelsemeddelande efter lyckad bokning

### `/services` - Tjänster
- Detaljerad lista över alla tjänster
- Priser och tidsuppskattningar
- Beskrivningar av varje tjänst

### `/contact` - Kontakt
- Kontaktinformation
- Öppettider
- Karta/adress
- Kontaktformulär (om implementerat)

### `/admin` - Adminpanel
- Översikt över alla bokningar
- Sortering efter status (hanterad/ohanterad)
- Möjlighet att markera bokningar som hanterade
- Visar kundinformation och bokningsdetaljer

## 🎨 Anpassning

### Färgschema

Projektet använder ett anpassat färgschema definierat i Tailwind CSS:
- **Charcoal** (`#1a1a1a`) - Primär bakgrundsfärg
- **Gold** (`#d4af37`) - Accentfärg
- **Cream** (`#f5f5dc`) - Textfärg

### Tjänster

För att uppdatera tjänster, redigera:
- `app/page.tsx` - Hemsidans tjänstsektion
- `app/services/page.tsx` - Tjänstesidan
- `components/BookningForm.tsx` - Dropdown med tjänster

### Bilder

Placera bilder i `public/images/`:
- `barbershop-hero.jpg` - Hero-bild
- `gallery1.jpg` till `gallery6.jpg` - Galleribilder
- Ikoner för tjänster

## 🚢 Deployment

### Vercel (Rekommenderat)

1. Pusha koden till GitHub
2. Importera projektet på [Vercel](https://vercel.com)
3. Lägg till miljövariabler i Vercel Dashboard
4. Deploy!

### Andra plattformar

Projektet kan också deployas på:
- Netlify
- Railway
- Render
- Egen VPS

**OBS!** Se till att:
- Sätta miljövariabler
- Skapa `data`-mappen med `bookings.json`
- Konfigurera build-kommandon korrekt

## 📝 Utveckling

### Tillgängliga Scripts

```bash
# Starta utvecklingsserver med Turbopack
npm run dev

# Bygg för produktion
npm run build

# Starta produktionsserver
npm start

# Kör linting
npm run lint
```

### Lägga till nya funktioner

1. **Ny sida:** Skapa en ny mapp i `app/` med en `page.tsx`
2. **Ny komponent:** Lägg till i `components/`
3. **Nytt API:** Skapa `route.ts` i `app/api/`

## 🤝 Bidra

Om du vill bidra till projektet:
1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/AmazingFeature`)
3. Commita dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Pusha till branchen (`git push origin feature/AmazingFeature`)
5. Öppna en Pull Request

## 📞 Support

För frågor och support, kontakta:
- **E-post:** info@sh-cutz.se
- **Telefon:** 070-123 45 67
- **Adress:** Centralvägen 1, 194 76 Upplands Väsby

## 📜 Licens

© 2025 SH-Cutz. Alla rättigheter förbehållna.

---

**Byggt med ❤️ av SH-Cutz Team**
