// ─────────────────────────────────────────────────────────────
// WEDDING CONFIG — edit everything here, no need to touch components
// ─────────────────────────────────────────────────────────────

const weddingConfig = {
  couple: {
    brideName: "Anamika",
    groomName: "Sumit",
    coupleHashtag: "#AnamikaWedsSumit",
  },

  parents: {
    bride: { father: "Mr. Bhimsen Adhikari", mother: "Mrs. Lipika Adhikari" },
    groom: { father: "Mr. Sunil Verma", mother: "Mrs. Meena Verma" },
  },

  // 4-5 members shown on each side in the Family section
  family: {
    bride: [
      { name: "Mr. Bhimsen Adhikari", relation: "Father" },
      { name: "Mrs. Lipika Adhikari", relation: "Mother" },
    ],
    groom: [
      { name: "Mr. Chitra Banerjee", relation: "Father" },
      { name: "Mrs. Beena Banerjee", relation: "Mother" },
    ],
  },

  // ISO date string — used by countdown + .ics download
  weddingDateTime: "2026-12-12T20:00:00+05:30",

  scratchCardReveal: {
    date: "25th November 2026",
    time: "8:00 PM onwards",
    venue: "Abhinandan Palace, Mopka, Bilaspur",
    day: "Wednesday",
  },

  venue: {
    name: "Abhinandan Palace",
    address: "Seepat Rd, Mopka, Chhattisgarh, India",
    // 1. Map Embed URL (for <iframe> element)
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.536737351654!2d82.1835!3d22.0835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280ae2a615f491%3A0x813b14f0e7441f29!2sAbhinandan%20Palace!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    
    // 2. Directions URL (for "Get Directions" button)
    directionsUrl: 
      "https://www.google.com/maps/dir/?api=1&destination=Abhinandan+Palace+Mopka+Bilaspur+Chhattisgarh",
    
    // 3. Direct Google Maps Place URL (for opening in Google Maps app/browser)
    mapsUrl: 
      "https://maps.google.com/?cid=9312059679423340329",
  },

  // Background art — your real illustrated assets live in public/assets/
  visuals: {
    archFrame: "/assets/arch-frame.png",
    groomImage: "/assets/groom.png",
    brideImage: "/assets/bride.png",
    havanImage: "/assets/havan.png",

    // House intro / loader sequence assets
    houseBg: "/assets/house-bg.webp",
    taxi: "/assets/taxi.webp",
    doorPanel: "/assets/doorPanel.webp",
    doorFrame: "/assets/doorFrame.webp",
    
    houseBgLaptop: "/assets/house-bg-laptop.webp",
    doorFrameLaptop: "/assets/doorFrame-laptop.webp",
    ganesh: "/assets/ganesh.webp"
  },

  quotes: [
    "Two souls, one beautiful journey.",
    "Every love story is beautiful, but ours is my favorite.",
  ],

  story: [
    "Every beautiful journey begins with a single moment...",
    "Two hearts, once strangers, found their way to one another through laughter, patience, and quiet understanding.",
    "Now two families come together to celebrate love, happiness, and new beginnings.",
  ],

  music: {
    src: "/music/wedding-theme.mp3", // place your mp3 in public/music/
    title: "Our Song",
  },

  colors: {
    primary: "#FFF8F0",
    secondary: "#D4AF37",
    accent: "#E8B4B8",
    background: "#FDF6EC",
    text: "#3B2B20",
  },

  socials: {
    whatsappShareText: "You're invited to Anamika & Sumits's wedding! 💍✨",
  },
};

export default weddingConfig;