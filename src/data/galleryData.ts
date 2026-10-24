export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  date: string;
  desc: string;
  featured?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    url: "/WhatsApp Image 2026-10-25 at 00.32.11.jpeg",
    title: "Sweet Sunshine Smile",
    category: "Portrait",
    date: "25 Oct 2026",
    desc: "A bright, warm portrait capturing genuine charm and cheerful energy.",
    featured: true
  },
  {
    id: "2",
    url: "/WhatsApp Image 2026-10-25 at 00.32.12.jpeg",
    title: "Aisle Adventures",
    category: "Lifestyle",
    date: "25 Oct 2026",
    desc: "Playful candid moment exploring plushies and vibrant aisles.",
    featured: true
  },
  {
    id: "3",
    url: "/WhatsApp Image 2026-10-25 at 00.32.11 (1).jpeg",
    title: "Floral Cozy Mood",
    category: "Moments",
    date: "25 Oct 2026",
    desc: "Serene relaxation with colorful floral accents and calm warmth.",
    featured: false
  },
  {
    id: "4",
    url: "/WhatsApp Image 2026-10-25 at 00.32.12 (1).jpeg",
    title: "Gentle Glow",
    category: "Portrait",
    date: "25 Oct 2026",
    desc: "Soft natural light highlighting effortless grace and subtle joy.",
    featured: true
  },
  {
    id: "5",
    url: "/WhatsApp Image 2026-10-25 at 00.32.12 (2).jpeg",
    title: "Candid Elegance",
    category: "Candid",
    date: "25 Oct 2026",
    desc: "Unposed spontaneity with an authentic and endearing sparkle.",
    featured: false
  }
];
