import { NextResponse } from "next/server";
import { getDbContainer } from "../../lib/cosmos";

const AVAILABILITY_ID = "availability-settings";

const defaultAvailability = {
  id: AVAILABILITY_ID,
  startTime: "10:00",
  endTime: "20:00",
  saturdayEndTime: "15:00",
  slotDurationMinutes: 30,
  workingDays: [1, 2, 3, 4, 5, 6], // Mån-Lör
  breakTimes: [{ start: "13:00", end: "14:00" }],
};

/**
 * GET-funktion för att hämta nuvarande tillgänglighetsinställningar.
 */
export async function GET() {
  const container = getDbContainer();
  try {
    const { resource: availability } = await container
      .item(AVAILABILITY_ID, AVAILABILITY_ID)
      .read();

    if (availability) {
      return NextResponse.json(availability);
    } else {
      // Om inga inställningar finns, skapa och returnera standardvärden
      await container.items.create(defaultAvailability);
      return NextResponse.json(defaultAvailability);
    }
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 404
    ) {
      // Om dokumentet inte finns (första gången), skapa det.
      await container.items.create(defaultAvailability);
      return NextResponse.json(defaultAvailability);
    }
    console.error("Error fetching availability from Cosmos DB:", error);
    return NextResponse.json(
      { error: "Kunde inte ansluta till databasen." },
      { status: 500 }
    );
  }
}

/**
 * POST-funktion för att uppdatera tillgänglighetsinställningar.
 */
export async function POST(req: Request) {
  try {
    const container = getDbContainer();
    const newSettings = await req.json();
    await container.items.upsert({ id: AVAILABILITY_ID, ...newSettings });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating availability in Cosmos DB:", error);
    return NextResponse.json(
      { error: "Kunde inte spara inställningar i databasen." },
      { status: 500 }
    );
  }
}
