export type WeddingEvent = {
  id: string;
  name: string;
  /** ISO date/time in Asia/Kolkata, e.g. "2026-12-07T10:00:00+05:30" */
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  venue?: string;
  description?: string;
  /** Optional image path, e.g. "/images/haldi.jpg" */
  image?: string;
  /** Optional Google Maps link for the event venue */
  mapsUrl?: string;
  /** Show an "add to Google Calendar" link */
  addToCalendar?: boolean;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type FamilyMember = {
  name: string;
  relation?: string;
};

export type WeddingConfig = {
  brideName: string;
  brideNameEn: string;
  groomName: string;
  groomNameEn: string;
  /** ISO date/time with IST offset — null until the family supplies it */
  weddingDate: string | null;
  muhurtaTime: string | null;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  parkingInfo: string;
  travelInfo: string;
  brideParents: FamilyMember[];
  groomParents: FamilyMember[];
  familyNames: string[];
  events: WeddingEvent[];
  galleryImages: GalleryImage[];
  backgroundMusicUrl: string;
  rsvpEndpoint: string;
  rsvpPhone: string;
  rsvpEmail: string;
  hashtag: string;
  /** Portrait placeholders — replace with real photos when supplied */
  bridePhoto: string;
  groomPhoto: string;
  couplePhoto: string;
  ogImage: string;
};

export const wedding: WeddingConfig = {
  brideName: "आकांक्षा",
  brideNameEn: "Akanksha",
  groomName: "विक्रम",
  groomNameEn: "Vikram",

  weddingDate: "2026-11-15T12:05:00+05:30",
  muhurtaTime: "दु १२:०५",

  venueName: "नक्षत्र लॉन्स",
  venueAddress: "पेणूर, मोहोळ-पंढरपूर रोड, ता. मोहोळ, जि. सोलापूर",
  googleMapsUrl: "",
  parkingInfo: "",
  travelInfo: "",

  brideParents: [
    { name: "ब्रह्मदेव तानाजी सातपुते", relation: "वडिल" },
    { name: "", relation: "आई" },
  ],
  groomParents: [
    { name: "शामराव गोपाळ भोसले", relation: "वडिल" },
    { name: "", relation: "आई" },
  ],
  familyNames: ["सातपुते", "भोसले"],

  events: [
    {
      id: "saksharpuda-haldi",
      name: "साक्षरपुडा व हळदी",
      date: "2026-11-14T19:00:00+05:30",
      startTime: "०७:०० PM",
      venue: "नक्षत्र लॉन्स, पेणूर",
      description: "शनिवार दि. १४/११/२०२६ रोजी सांय. ०७.०० वा.",
      addToCalendar: true,
    },
    {
      id: "wedding",
      name: "शुभविवाह",
      date: "2026-11-15T12:05:00+05:30",
      startTime: "१२:०५ PM",
      venue: "नक्षत्र लॉन्स, पेणूर",
      description:
        "मिती कार्तिक सु. ०६ शके १९४८ रविवार दि. १५/११/२०२६ रोजी दु. १२.०५ या शुभमुहूर्तावर",
      addToCalendar: true,
    },
    {
      id: "preeti-bhojan",
      name: "प्रीती भोजन",
      date: "2026-11-15T13:30:00+05:30",
      startTime: "After Akshata",
      venue: "नक्षत्र लॉन्स, पेणूर",
      description: "अक्षता नंतर (विवाहस्थळी)",
      addToCalendar: true,
    },
  ],
  galleryImages: [],

  backgroundMusicUrl: "/audio/background.mp3",
  rsvpEndpoint: "",
  rsvpPhone: "",
  rsvpEmail: "",

  hashtag: "#आकांक्षाविवाहविक्रम",

  bridePhoto: "/images/bride.png",
  groomPhoto: "/images/groom.png",
  couplePhoto: "",
  ogImage: "/images/og-invitation.jpg",
};

export const navItems = [
  { id: "mangalacharan", label: "मुखपृष्ठ" },
  { id: "couple", label: "वधू-वर" },
  { id: "invitation", label: "आमंत्रण" },
  { id: "events", label: "कार्यक्रम" },
  { id: "venue", label: "स्थळ" },
] as const;

export const isConfigured = (value: string | null | undefined): boolean =>
  Boolean(value && value.trim().length > 0);
