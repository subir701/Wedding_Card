import { CalendarPlus } from "lucide-react";
import weddingConfig from "../config/weddingConfig";

function buildIcs() {
  const { weddingDateTime } = weddingConfig;
  const { brideName, groomName } = weddingConfig.couple;
  const { venue } = weddingConfig;
  const start = new Date(weddingDateTime);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${brideName} & ${groomName}'s Wedding`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${venue.name}, ${venue.address}`,
    "DESCRIPTION:Join us as we celebrate our wedding day!",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
}

export default function Footer() {
  const downloadIcs = () => {
    const blob = new Blob([buildIcs()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-invite.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="py-10 px-6 bg-inkbrown text-cream/80 text-center text-sm">
      <button
        onClick={downloadIcs}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 hover:bg-cream/20 transition-colors mb-6"
      >
        <CalendarPlus size={14} /> Add to Calendar
      </button>
      <p className="opacity-70">
        Made with ❤️ for {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
      </p>
    </footer>
  );
}
