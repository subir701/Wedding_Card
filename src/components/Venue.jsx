import { MapPin, Navigation } from "lucide-react";
import weddingConfig from "../config/weddingConfig";
import ScrollFade from "./ScrollFade";

export default function VenueSection() {
  const { name, address, mapEmbedUrl, directionsUrl, mapsUrl } = weddingConfig.venue;

  return (
    <ScrollFade className="w-full flex flex-col items-center justify-center px-6 py-16">
      <h2 className="section-title !text-3xl sm:!text-4xl md:!text-6xl mt-16 sm:mt-8 md:mt-0">
        The Venue
      </h2>

      <p className="section-subtitle !text-[10px] sm:!text-xs max-w-[220px] sm:max-w-none mx-auto">
        Join us at this beautiful location
      </p>

      <div className="max-w-[260px] sm:max-w-md md:max-w-3xl mx-auto glass-card overflow-hidden mt-4 sm:mt-6">
        <div className="aspect-video w-full">
          <iframe
            title="Venue location map"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="p-3 sm:p-5 md:p-6 text-center">
          <p className="font-heading text-lg sm:text-2xl md:text-3xl text-gold-dark flex items-center justify-center gap-1.5 sm:gap-2">
            <MapPin size={16} className="shrink-0" />
            {name}
          </p>
          <p className="text-[11px] sm:text-sm text-inkbrown/70 mt-1">{address}</p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
            {/* Added missing opening <a> tag */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-btn !text-xs sm:!text-sm !px-5 sm:!px-8 !py-2 sm:!py-3 inline-flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Navigation size={14} />
              Get Directions
            </a>

            {/* Added missing opening <a> tag */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-full border border-gold text-gold-dark hover:bg-gold/10 transition-colors text-xs sm:text-sm"
            >
              <MapPin size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </ScrollFade>
  );
}