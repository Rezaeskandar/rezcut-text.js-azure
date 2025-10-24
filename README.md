-sh-cutz-booking/ +rezcut/ ├── app/ # Next.js App Router │ ├── page.tsx # Hemsida │ ├── layout.tsx # Root layout │ ├── globals.css # Globala CSS-stilar │ ├── admin/ │ │ └── page.tsx # Adminpanel för bokningshantering │ ├── api/ │ │ ├── bookings/ │ │ │ └── route.ts # GET & PATCH för bokningar +│ │ ├── contact/ +│ │ │ └── route.ts # POST för kontaktformulär │ │ └── send/ │ │ └── route.ts # POST för att skapa bokning & skicka e-post │ ├── boking/ │ │ └── page.tsx # Bokningssida med formulär │ ├── contact/ │ │ └── page.tsx # Kontaktsida │ └── services/ │ └── page.tsx # Tjänstesida ├── components/ # React-komponenter │ ├── BookningForm.tsx # Bokningsformulär │ ├── Footer.tsx # Sidfot │ └── Navbar.tsx # Navigeringsmeny ├── data/ -│ └── bookings.json # Datalagring för bokningar +│ ├── bookings.json # Datalagring för bokningar (lokalt) +│ ├── availability.ts # Konfiguration för öppettider +│ └── services.ts # Lista över tjänster ├── public/ # Statiska filer -│ └── images/ # Bilder för webbplatsen -├── .env.local # Miljövariabler (ej i git) -├── package.json # NPM-dependencies -├── tsconfig.json # TypeScript-konfiguration -├── tailwind.config.js # Tailwind CSS-konfiguration -└── next.config.ts # Next.js-konfiguration +│ ├── images/ # Bilder +│ └── logo.png # Logotyp +├── .env.local.example # Exempelfil för miljövariabler +└── ... # Övriga konfigurationsfiler (package.json etc.)bbbbb

plaintext
 Show full code block 

## 🚀 Kom igång

### Förutsättningar

Se till att du har följande installerat:
-
- **Node.js** 20.x eller senare
- **npm** eller annan pakethanterare (yarn, pnpm, bun)

### Installation

1. **Klona projektet**
-
```bash
git clone <repository-url>
-cd sh-cutz-booking
+cd rezcut
Installera dependencies
bash
npm install
Skapa miljövariabler
-Skapa en .env.local-fil i projektets rotmapp:
-env +Kopiera `.env.local.example` till en ny fil som heter `.env.local` och fyll i dina värden. + +bash +cp .env.local.example .env.local ++ +**Filinnehåll (`.env.local`):** + SMTP_USER=din-email@gmail.com SMTP_PASS=ditt-app-lösenord +NEXT_PUBLIC_ADMIN_PASSWORD=ditt-hemliga-admin-lösenord

plaintext
 Show full code block 

> **OBS!** För Gmail måste du använda ett App-specifikt lösenord. Gå till Google Account Settings → Security → 2-Step Verification → App passwords

-4. **Skapa datamapp**
+4. **Skapa databasfil**

```bash
mkdir data
echo "[]" > data/bookings.json
Starta utvecklingsservern
bash
npm run dev
Öppna http://localhost:3000 i din webbläsare.

-### Build för produktion
-bash -npm run build -npm start -
-## 📡 API-dokumentation +## 📡 API-dokumentation

POST /api/send
Skapar en ny bokning och skickar e-post till både kund och salong.

-Request Body:
-```json -{

"name": "John Doe",
"email": "john@example.com",
"phone": "0701234567",
"service": "Haircut",
"date": "2025-10-20",
"time": "14:00",
"message": "Vill ha kort på sidorna" -} -```
-Response:
-```json -{

"success": true -} -```
Funktioner:
Sparar bokningen i data/bookings.json
Skickar bekräftelse till kunden
Skickar notifiering till salongen
Genererar unikt ID baserat på timestamp
+### POST /api/contact + +Hanterar meddelanden från kontaktformuläret och skickar e-post. +

GET /api/bookings
Hämtar alla bokningar från systemet.

-Response:
-```json -[

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
} -] -```
PATCH /api/bookings
Uppdaterar status på en bokning (markera som hanterad/ohanterad).

-Request Body:
-```json -{

"id": 1729081234567,
"handled": true -} -```
-Response:
-```json -{

"success": true -} -```
-## 🔐 Miljövariabler
-Skapa en .env.local-fil med följande variabler:
-| Variabel | Beskrivning | Exempel | -| ----------- | -------------------------------- | --------------------- | -| SMTP_USER | E-postadress för SMTP-server | info@sh-cutz.se | -| SMTP_PASS | Lösenord/App-lösenord för e-post | abcd efgh ijkl mnop | +## 🔐 Miljövariabler + +| Variabel | Beskrivning | Exempel | +| ----------------------------- | ------------------------------------------------ | ------------------------- | +| SMTP_USER | E-postadress för SMTP-server (t.ex. Gmail). | info@rezcut.se | +| SMTP_PASS | App-lösenord för e-postkontot. | abcd efgh ijkl mnop | +| NEXT_PUBLIC_ADMIN_PASSWORD | Lösenord för att komma åt /admin-sidan. | ditt-säkra-lösenord |

Konfigurera Gmail SMTP
Aktivera 2-stegsverifiering på ditt Google-konto
Gå till Google App Passwords
Skapa ett nytt app-lösenord för "Mail"
Använd det genererade lösenordet i SMTP_PASS
-## 📄 Sidor
-### / - Hemsida
-- Hero-sektion med call-to-action -- Om-sektion med information om salongen -- Tjänstöversikt med priser -- Galleri med bilder -- Kundrecensioner -- Kontaktinformation i footer
-### /boking - Bokningssida
-- Interaktivt bokningsformulär -- Datumväljare för bokningsdatum -- Tjänstval med dropdown -- Validering av alla fält -- Bekräftelsemeddelande efter lyckad bokning
-### /services - Tjänster
-- Detaljerad lista över alla tjänster -- Priser och tidsuppskattningar -- Beskrivningar av varje tjänst
-### /contact - Kontakt
-- Kontaktinformation -- Öppettider -- Karta/adress -- Kontaktformulär (om implementerat)
-### /admin - Adminpanel
-- Översikt över alla bokningar -- Sortering efter status (hanterad/ohanterad) -- Möjlighet att markera bokningar som hanterade -- Visar kundinformation och bokningsdetaljer
-## 🎨 Anpassning
-### Färgschema
-Projektet använder ett anpassat färgschema definierat i Tailwind CSS:
-- Charcoal (#1a1a1a) - Primär bakgrundsfärg -- Gold (#d4af37) - Accentfärg -- Cream (#f5f5dc) - Textfärg
-### Tjänster
-För att uppdatera tjänster, redigera:
-- app/page.tsx - Hemsidans tjänstsektion -- app/services/page.tsx - Tjänstesidan -- components/BookningForm.tsx - Dropdown med tjänster
-### Bilder
-Placera bilder i public/images/:
-- barbershop-hero.jpg - Hero-bild -- gallery1.jpg till gallery6.jpg - Galleribilder -- Ikoner för tjänster
-## 🚢 Deployment
-### Vercel (Rekommenderat) +## 🚢 Deployment (Viktigt!) + +### Rekommenderade plattformar + +Projektet är byggt för att enkelt kunna driftsättas på moderna hostingplattformar som: +- Vercel (starkt rekommenderat) +- Azure Static Web Apps +- Netlify + +Dessa plattformar integreras smidigt med GitHub för automatisk deployment.

Pusha koden till GitHub -2. Importera projektet på Vercel -3. Lägg till miljövariabler i Vercel Dashboard +2. Importera ditt GitHub-repository på vald plattform (t.ex. Vercel). +3. Lägg till miljövariablerna från din .env.local-fil i plattformens inställningar för miljövariabler.
Deploy!
-### Andra plattformar
-Projektet kan också deployas på:
-- Netlify -- Railway -- Render -- Egen VPS
-OBS! Se till att:
-- Sätta miljövariabler -- Skapa data-mappen med bookings.json -- Konfigurera build-kommandon korrekt
-## 📝 Utveckling
-### Tillgängliga Scripts
-```bash -# Starta utvecklingsserver med Turbopack -npm run dev
-# Bygg för produktion -npm run build
-# Starta produktionsserver -npm start
-# Kör linting -npm run lint -```
-### Lägga till nya funktioner
-1. Ny sida: Skapa en ny mapp i app/ med en page.tsx -2. Ny komponent: Lägg till i components/ -3. Nytt API: Skapa route.ts i app/api/
-## 🤝 Bidra
-Om du vill bidra till projektet:
-1. Forka projektet -2. Skapa en feature branch (git checkout -b feature/AmazingFeature) -3. Commita dina ändringar (git commit -m 'Add some AmazingFeature') -4. Pusha till branchen (git push origin feature/AmazingFeature) -5. Öppna en Pull Request +### ⚠️ Varning om datalagring + +Det nuvarande systemet sparar bokningar i en lokal fil (data/bookings.json). Detta fungerar inte i en serverless produktionsmiljö (som Vercel eller Azure). Filsystemet är ofta skrivskyddat eller tillfälligt, vilket innebär att alla nya bokningar kommer att försvinna. + +Lösning: Innan du tar emot riktiga bokningar måste du byta ut filhanteringen mot en riktig databas. Bra och gratis alternativ inkluderar: +- Vercel KV +- Supabase +- Azure Cosmos DB (Free Tier)