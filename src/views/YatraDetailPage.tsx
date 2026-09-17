"use client";

import {
  getYatraBySlug,
  getYatraHeroImages,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappLink,
} from "@/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Flame,
  Heart,
  HeartHandshake,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TripCostCalculator } from "@/components/TripCostCalculator";

// ─── Static per-yatra enrichment data ────────────────────────────────────────
type YatraEnrichment = {
  tagline: string;
  highlights: string[];
  spiritualStory: string;
  mythologicalRef: string;
  pujaDetails: string[];
  templeSchedule: {
    period: string;
    morningAarti: string;
    darshan: string;
    eveningAarti: string;
  }[];
  registrationDocs: string[];
  registrationPortal: string;
  medicalAdvisory: string[];
  helicopterDetails: string | null;
  helipads: string[];
  accessibilityServices: string[];
  reviews: {
    name: string;
    state: string;
    rating: number;
    text: string;
    date: string;
  }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  coverImage: string;
  altitudeM: string;
  difficulty: string;
  highlights2: string[];
};

const ENRICHMENTS: Record<string, YatraEnrichment> = {
  "char-dham-yatra": {
    tagline: "The Four Sacred Abodes — A Divine Circuit of Ultimate Liberation",
    coverImage:
      "https://images.unsplash.com/photo-1629116596704-e3c2b10f5e2b?w=1400&q=80",
    altitudeM: "3,583 m (Kedarnath)",
    difficulty: "Moderate",
    highlights: [
      "Visit all four sacred dhams in one epic journey",
      "Kedarnath — one of the 12 Jyotirlingas at 3,583 m",
      "Yamunotri — source of River Yamuna, Surya Kund hot spring",
      "Gangotri — source of River Ganga, Bhagirathi origins",
      "Badrinath — Lord Vishnu's abode, Tapt Kund ritual bath",
      "Mana Village — last Indian village before Tibet",
      "BKTC-registered puja services at all four dhams",
      "Expert pilgrimage coordinator from Day 1 to Day 12",
    ],
    highlights2: [
      "Kedarnath Helicopter Option",
      "Luxury / Budget Tiers",
      "Biometric Registration Assistance",
      "All Meals Included",
    ],
    spiritualStory:
      "The Char Dham Yatra is considered the most sacred pilgrimage circuit in Hinduism. The great philosopher-saint Adi Shankaracharya established the four dhams in the 8th century CE to unify Hindu spiritual practice across the Indian subcontinent. Each dham is associated with a cardinal direction — Badrinath (north), Puri (east), Rameshwaram (south), and Dwarka (west) — but the Chota Char Dham of Uttarakhand encompasses four high-altitude shrines nestled in the Garhwal Himalayas, each representing a distinct aspect of the divine.\n\nYamunotri is the abode of Goddess Yamuna, the twin sister of Yama (god of death). A dip in her waters is believed to wash away sins and grant a peaceful death. Gangotri honours the descent of the celestial river Ganga onto earth, as prayed for by King Bhagirath to liberate his 60,000 ancestors. Kedarnath, deep in the Mandakini valley, is where Lord Shiva appeared as a bull to elude the Pandavas, and his hump (dorsal hump) became the sacred lingam worshipped today. Badrinath is the meditating form of Lord Vishnu — where he sat for thousands of years in tapasya, enduring the severe cold, protected by Goddess Lakshmi who took the form of a badri (Indian jujube) tree to shield him.",
    mythologicalRef:
      "Referenced in the Skanda Purana, Mahabharata, Bhagavata Purana, and Vishnu Purana. Adi Shankaracharya revived and codified the pilgrimage routes in the 8th century. The Char Dham is associated with the four stages of human life (ashrams) and the four Vedas.",
    pujaDetails: [
      "Yamunotri — Yamuna Puja, Divya Shila darshan, ritual bath in Surya Kund (51°C hot spring). Cost: ₹200–₹1,500 depending on puja type.",
      "Gangotri — Ganga Puja at the temple, Bhagirathi Puja at the river bank. Cost: ₹500–₹2,000.",
      "Kedarnath — Mahabhishek (₹1,501), Rudra Abhishek (₹5,001), Laghu Rudra (₹11,001) — booked via BKTC portal: bktc.nic.in.",
      "Badrinath — Abhishek, Maha Abhishek, Akhand Jyoti — booked via BKTC. Cost: ₹250–₹5,000.",
      "Brahma Kapal Puja (Badrinath) — Ancestor rituals on the Alaknanda riverbank. Mandatory before leaving Badrinath for family welfare.",
    ],
    templeSchedule: [
      {
        period: "May–June",
        morningAarti: "4:30 AM",
        darshan: "6:00 AM – 3:00 PM, 4:00 PM – 9:00 PM",
        eveningAarti: "7:30 PM",
      },
      {
        period: "July–August",
        morningAarti: "4:00 AM",
        darshan: "6:00 AM – 1:00 PM, 3:00 PM – 9:00 PM",
        eveningAarti: "8:00 PM",
      },
      {
        period: "Sept–Oct",
        morningAarti: "4:30 AM",
        darshan: "6:00 AM – 3:00 PM, 4:00 PM – 8:30 PM",
        eveningAarti: "7:00 PM",
      },
    ],
    registrationDocs: [
      "Valid government-issued photo ID (Aadhaar, Passport, Voter ID, Driving Licence)",
      "Biometric registration at designated centres or online at registrationandtouristcare.uk.gov.in",
      "Medical fitness certificate for pilgrims above 60 years of age",
      "Signed medical declaration form (provided by Manya team)",
      "Emergency contact details",
      "Passport-size photographs (4 copies)",
    ],
    registrationPortal: "https://registrationandtouristcare.uk.gov.in",
    medicalAdvisory: [
      "Carry personal medications and a copy of prescription",
      "Those with heart conditions, hypertension, or asthma should consult a cardiologist before departing",
      "Acute Mountain Sickness (AMS) risk above 2,500 m — acclimatize at Rishikesh/Haridwar for 1 day before ascending",
      "Diamox (Acetazolamide) 125mg twice daily from Day 2 onwards is strongly recommended (consult doctor)",
      "Oxygen cylinders available at GMVN guesthouses and at Manya base camps",
      "Age limit for Kedarnath trek: Physically fit pilgrims up to 75 years. Medical screening required above 65.",
    ],
    helicopterDetails:
      "Helicopter service to Kedarnath is available from Phata, Guptkashi, Sirsi, and Agastyamuni helipads. One-way fare: ₹4,500–₹8,000 per person (government-controlled tariff). Round-trip: ₹7,500–₹14,000. Must be pre-booked — no walk-in tickets. Book via the official UCADA portal (heliyatra.irctc.co.in) or through Manya's concierge service. Helicopter for Badrinath is available from Jolly Grant Airport Dehradun to Badrinath for private charters.",
    helipads: [
      "Phata Helipad",
      "Guptkashi Helipad",
      "Sirsi Helipad",
      "Agastyamuni Helipad",
    ],
    accessibilityServices: [
      "Pony (Ghoda) — ₹2,500–₹4,000 one way from Gaurikund to Kedarnath (16 km trail)",
      "Palki (palanquin carried by 4 bearers) — ₹6,000–₹9,000 one way",
      "Doli (smaller enclosed palanquin) — ₹5,000–₹7,000 one way",
      "Wheelchair assistance at Badrinath temple premises",
      "GMVN provides dedicated pilgrim assistance for senior citizens",
      "Medical teams stationed at Gaurikund, Lincholi, and Kedarnath base",
    ],
    reviews: [
      {
        name: "Priya Sharma",
        state: "Maharashtra",
        rating: 5,
        text: "TrekRoots made our Char Dham trip absolutely seamless. The guide was knowledgeable about every temple ritual. Our family of 6 felt completely safe throughout.",
        date: "October 2024",
      },
      {
        name: "Rajesh Kumar",
        state: "Delhi",
        rating: 5,
        text: "The helicopter arrangement to Kedarnath was perfectly handled. Accommodation was better than expected. A truly transformative spiritual experience.",
        date: "May 2024",
      },
      {
        name: "Meena Iyer",
        state: "Tamil Nadu",
        rating: 5,
        text: "As a first-time Char Dham pilgrim, I was nervous. Manya's team guided us at every step. The Brahma Kapal ritual at Badrinath was the most moving experience of my life.",
        date: "September 2023",
      },
    ],
    faqs: [
      {
        q: "When does Char Dham Yatra open and close?",
        a: "The Char Dham temples open around Akshaya Tritiya (late April/early May) and close on Bhai Dooj (November). Exact dates vary each year per the Hindu calendar and are announced by the temple committees. For 2025: Yamunotri & Gangotri open May 3, Kedarnath May 2, Badrinath May 4.",
      },
      {
        q: "Is registration mandatory for Char Dham Yatra?",
        a: "Yes. Since 2021, all pilgrims must register at registrationandtouristcare.uk.gov.in. Daily caps are enforced. Register early to secure your preferred dates.",
      },
      {
        q: "What is the best time to do Char Dham Yatra?",
        a: "May–June (pre-monsoon) is ideal for clear weather. September–October offers beautiful post-monsoon clarity and fewer crowds. July–August has heavy rainfall and trail risks.",
      },
      {
        q: "How difficult is the Kedarnath trek?",
        a: "The Gaurikund to Kedarnath trek is 16–18 km one way, gaining ~680 m altitude. It is moderately difficult. Fit individuals can complete it in 5–8 hours. Pony, Palki, and Helicopter alternatives are available.",
      },
      {
        q: "What is included in Manya's Char Dham package?",
        a: "All accommodation (as per chosen tier), all meals from Day 1 dinner to Day 12 breakfast, AC transport throughout, experienced pilgrimage guide, registration assistance, first-aid kit, and coordination for Kedarnath helicopter if booked.",
      },
      {
        q: "Can senior citizens do Char Dham Yatra?",
        a: "Yes, with appropriate precautions. We recommend helicopter service for Kedarnath for those above 65. A medical certificate is mandatory. Our team provides extra support and monitoring throughout.",
      },
      {
        q: "What is the altitude at each dham?",
        a: "Yamunotri: 3,293 m | Gangotri: 3,048 m | Kedarnath: 3,583 m | Badrinath: 3,133 m. Altitude sickness risk is real above 2,500 m — acclimatize properly.",
      },
      {
        q: "Can I do Char Dham via helicopter for the entire circuit?",
        a: "Currently only Kedarnath and Badrinath have helicopter services. Yamunotri requires a 5–6 km trek (or Pony/Palki). Gangotri is fully road-accessible.",
      },
    ],
    relatedSlugs: ["kedarnath-yatra", "badrinath-yatra", "do-dham-yatra"],
  },
  "kedarnath-yatra": {
    tagline:
      "Lord Shiva's Abode — The Most Sacred Jyotirlinga in the Himalayas",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
    altitudeM: "3,583 m (11,755 ft)",
    difficulty: "Moderate (16 km trek)",
    highlights: [
      "One of the 12 sacred Jyotirlingas of Lord Shiva",
      "Ancient temple believed to be over 1,200 years old, built by Adi Shankaracharya",
      "Stunning location below Kedarnath Peak (6,940 m)",
      "Bhairavnath Temple visit — traditional after Kedarnath darshan",
      "Chorabari Tal (Gandhi Sarovar) — scenic glacial lake nearby",
      "Helicopter option from 4 helipads reduces trek to 7 minutes",
      "Rudra Abhishek and Mahabhishek puja bookable via BKTC",
      "Panoramic views of Kedarnath, Kedardome, and Bhrigu Panth peaks",
    ],
    highlights2: [
      "4 Helipad Options",
      "Trek or Fly",
      "BKTC Puja Pre-booking",
      "Medical Team on Trail",
    ],
    spiritualStory:
      "According to the Mahabharata, after the Battle of Kurukshetra, the Pandavas sought Lord Shiva to cleanse themselves of the sin of killing their own kin. Shiva, reluctant to bless them, disguised himself as a bull and hid among a herd of cattle in the Garhwal Himalayas. When Bhima recognized him and grabbed his tail, the bull dove into the ground, leaving only his hump visible. That hump became the sacred Kedarnath Jyotirlinga.\n\nThe remaining body parts of Lord Shiva — his arms, navel, face, and locks — appeared at Tungnath, Madmaheshwar, Rudranath, and Kalpeshwar respectively, forming the Panch Kedar circuit. The current temple structure at Kedarnath is attributed to Adi Shankaracharya (8th century CE), who is also said to have attained samadhi here in 820 CE. His samadhi sthal stands behind the main temple.",
    mythologicalRef:
      "Referenced extensively in the Skanda Purana's Kedara Khand, Mahabharata (Vana Parva), and the Shiva Purana. One of the 12 Jyotirlingas — self-manifested lingams of Lord Shiva that represent his limitless cosmic power.",
    pujaDetails: [
      "Mahabhishek (Grand Worship) — ₹1,501 per person. Includes: Panchamrit abhishek, Rudrabhishek, offering of bel leaves, dhatura, and bhang. Duration: 45 minutes. Book 7 days in advance via bktc.nic.in.",
      "Rudra Abhishek — ₹5,001. Full Rudra recitation with Sanskrit priests. Duration: 1.5 hours. Limited slots daily.",
      "Laghu Rudra — ₹11,001. Most comprehensive puja. Reserved 30 days in advance. Duration: 3–4 hours.",
      "Bhog Prasad — ₹300. Includes temple charanamrit and prasad thali.",
      "Bhairavnath Temple — Free. Traditionally visited after Kedarnath darshan. The bhairav is considered the kshetrapala (protector) of Kedarnath.",
    ],
    templeSchedule: [
      {
        period: "May–June (Opening)",
        morningAarti: "4:00 AM (Mahabhishek/VIP)",
        darshan: "6:00 AM – 3:00 PM",
        eveningAarti: "7:30 PM – 8:30 PM",
      },
      {
        period: "July–August",
        morningAarti: "4:00 AM",
        darshan: "6:00 AM – 1:00 PM, 3:00 PM – 9:00 PM",
        eveningAarti: "8:00 PM – 9:00 PM",
      },
      {
        period: "Sept–Oct (Closing)",
        morningAarti: "4:30 AM",
        darshan: "6:00 AM – 3:00 PM",
        eveningAarti: "7:00 PM – 8:00 PM",
      },
    ],
    registrationDocs: [
      "Valid government photo ID (Aadhaar mandatory for biometric)",
      "Online registration at registrationandtouristcare.uk.gov.in (mandatory since 2018)",
      "Medical certificate for pilgrims aged 60+",
      "Signed AMS declaration form",
    ],
    registrationPortal: "https://registrationandtouristcare.uk.gov.in",
    medicalAdvisory: [
      "Gaurikund altitude: 1,982 m. Kedarnath: 3,583 m — a 1,600 m gain over 16 km.",
      "Spend 1 night at Rudraprayag (915 m) or Guptkashi (1,319 m) for acclimatization",
      "AMS symptoms: headache, nausea, shortness of breath — descend immediately if they appear",
      "Diabetics and cardiac patients must carry medical records and consult specialist before trek",
      "Oxygen cylinders and first-aid kits available at Lincholi, Bhimbali, and Kedarnath medical camps",
      "SDRF rescue teams stationed at key points on the trail",
    ],
    helicopterDetails:
      "Helicopter services are available from 4 government-approved helipads to Kedarnath. The 7-minute flight replaces the 16–18 km trek. Tariff (government-controlled): One-way ₹4,500–₹5,500 | Round-trip ₹8,500–₹10,000. Book via heliyatra.irctc.co.in (official IRCTC portal) or via Manya's concierge team. Operators: Himalayan Heli Services, Pawan Hans, Heritage Aviation, UTAir.",
    helipads: [
      "Phata Helipad (Rudraprayag)",
      "Guptkashi Helipad",
      "Sirsi Helipad",
      "Agastyamuni Helipad",
    ],
    accessibilityServices: [
      "Horse/Pony — ₹2,500–₹4,000 one way from Gaurikund (16 km)",
      "Palki (4-bearer palanquin) — ₹6,000–₹8,500 one way",
      "Doli (closed palanquin) — ₹5,000–₹7,500 one way",
      "Pitthoo (porter carrying person) — ₹3,500–₹5,000 one way",
      "All services regulated by Uttarakhand Tourism. Manya arranges advance booking to avoid last-minute unavailability.",
    ],
    reviews: [
      {
        name: "Arjun Mehta",
        state: "Gujarat",
        rating: 5,
        text: "The Manya team arranged everything perfectly — from the Guptkashi hotel to the Kedarnath puja slot. The sunrise at the temple was a moment I will carry forever.",
        date: "May 2025",
      },
      {
        name: "Sunita Devi",
        state: "Rajasthan",
        rating: 5,
        text: "I am 67 years old and went via helicopter. Manya team stayed with me every step. The Mahabhishek puja was emotional beyond words. Har Har Mahadev!",
        date: "September 2024",
      },
    ],
    faqs: [
      {
        q: "How long is the Kedarnath trek?",
        a: "Gaurikund to Kedarnath is 16–18 km one way with an altitude gain of approximately 1,600 m. Fit pilgrims take 5–8 hours to ascend. Descent takes 4–6 hours.",
      },
      {
        q: "Is the Kedarnath trek safe for women?",
        a: "Yes. The trail is well-patrolled, with SDRF teams and medical camps. Manya assigns dedicated support staff. Women travelling solo or in groups are welcomed with full safety protocols.",
      },
      {
        q: "What is the best helipad for Kedarnath helicopter?",
        a: "Phata is the most popular and well-connected. Guptkashi is closest to the dham. All four helipads operate under government-approved operators — booking in advance is essential.",
      },
      {
        q: "Can I do Kedarnath in a day trip from Rishikesh?",
        a: "Not advisable. The drive from Rishikesh to Gaurikund alone is 220 km (6–7 hours). With the trek or helicopter, a minimum 2-night stay is recommended for a meaningful experience.",
      },
      {
        q: "When does Kedarnath temple open in 2025?",
        a: "Kedarnath temple is scheduled to open on May 2, 2025 (Akshaya Tritiya). Closing date is typically on Bhai Dooj in November (around November 2025).",
      },
      {
        q: "What is Bhairavnath Temple at Kedarnath?",
        a: "Bhairavnath is the protector deity (kshetrapala) of Kedarnath. Tradition mandates visiting Bhairavnath temple after Kedarnath darshan. The temple is a 30-minute walk from the main temple. Entry is free.",
      },
      {
        q: "Are there ATMs or mobile connectivity at Kedarnath?",
        a: "BSNL has limited connectivity at Kedarnath. No ATMs on the trail — carry sufficient cash before Gaurikund. Emergency satellite phones are available at official camps.",
      },
      {
        q: "What happens if weather deteriorates during the trek?",
        a: "The trail is regularly monitored. Manya team will advise on safer timings. In case of extreme weather, helicopter alternatives or trail holdbacks are communicated immediately. Your safety is our first priority.",
      },
    ],
    relatedSlugs: ["char-dham-yatra", "panch-kedar-yatra", "do-dham-yatra"],
  },
  "badrinath-yatra": {
    tagline: "Lord Vishnu's Eternal Abode — Where God Meditates for Humanity",
    coverImage:
      "https://images.unsplash.com/photo-1629116596704-e3c2b10f5e2b?w=1400&q=80",
    altitudeM: "3,133 m (10,279 ft)",
    difficulty: "Easy (road accessible)",
    highlights: [
      "One of the 108 Divya Desams and one of the Char Dhams",
      "Lord Vishnu's meditating form enshrined since ancient times",
      "Tapt Kund — natural hot spring for ritual bath before darshan",
      "Mana Village — last Indian village before the Tibet border",
      "Brahma Kapal — sacred platform for ancestor (pitru) rituals on Alaknanda bank",
      "Saraswati River cave and Bheem Pul rock bridge near Mana",
      "Narad Kund, Shesh Netra, and Charanamrit Kund within temple complex",
      "Fully road accessible — no trekking required",
    ],
    highlights2: [
      "No Trek Required",
      "Tapt Kund Hot Spring",
      "Mana Village Day Trip",
      "Brahma Kapal Rituals",
    ],
    spiritualStory:
      "Badrinath is one of the most ancient pilgrimage sites in India, mentioned in the Vedas, the Mahabharata, and the Bhagavata Purana. According to legend, Lord Vishnu chose this location to perform intense tapasya (meditation). When he sat in meditation, the harsh cold and snow of the Himalayas threatened him — his consort Goddess Lakshmi transformed herself into a badri tree (Indian jujube) to shelter him. Hence the name Badrinath — 'Lord of the Badri forest.'\n\nAdi Shankaracharya, during his visit in the 9th century CE, discovered the idol of Lord Badrinarayan in the Narad Kund (a hot spring near the temple) and installed it in a cave. The present temple structure dates from the 17th century, rebuilt by the Garhwal kings after destruction. The Rawal (head priest) of Badrinath is traditionally a Namboodiri Brahmin from Kerala, a practice established by Shankaracharya to connect South and North India through devotion.",
    mythologicalRef:
      "Referenced in Vishnu Purana, Skanda Purana (Badrikashrama Mahatmya), Mahabharata (Sabha Parva), and numerous Vaishnava texts. The 41st among the 108 Divya Desams (sacred Vishnu temples) of South Indian Vaishnava tradition.",
    pujaDetails: [
      "Abhishek — ₹250–₹500. Simple ritual bathing of the idol with Panchamrit.",
      "Maha Abhishek — ₹2,501–₹5,001. Elaborate 45-minute ritual with chanting, flowers, and sacred water.",
      "Akhand Jyoti — ₹116. A perpetual flame lit in your name for divine blessings.",
      "Brahma Kapal Puja — Free to ₹500 (pandit's dakshina). Performed on the Alaknanda riverbank for the liberation of ancestral souls. Considered more powerful than Gaya puja by many traditions.",
      "All pujas bookable through BKTC website or via Manya's pre-arranged slots.",
    ],
    templeSchedule: [
      {
        period: "May–June",
        morningAarti: "4:30 AM (Mahabhishek)",
        darshan: "6:00 AM – 1:00 PM, 3:00 PM – 9:00 PM",
        eveningAarti: "8:00 PM",
      },
      {
        period: "July–October",
        morningAarti: "4:30 AM",
        darshan: "6:00 AM – 1:00 PM, 3:00 PM – 9:00 PM",
        eveningAarti: "8:30 PM",
      },
    ],
    registrationDocs: [
      "Valid government-issued photo ID",
      "Biometric registration at registrationandtouristcare.uk.gov.in",
      "Medical fitness certificate for ages 65+",
    ],
    registrationPortal: "https://registrationandtouristcare.uk.gov.in",
    medicalAdvisory: [
      "Altitude is 3,133 m — acclimatize at Joshimath (1,875 m) for 1 night before ascending",
      "AMS can occur even at this moderate altitude — drink plenty of water, avoid alcohol",
      "GMVN medical post available at Badrinath township",
      "Cardiac patients should consult doctor before travel above 2,500 m",
    ],
    helicopterDetails:
      "Private helicopter charter from Jolly Grant Airport Dehradun to Badrinath is available for groups. Cost: ₹35,000–₹55,000 per flight (8-seater). Contact Manya team for arrangements. No scheduled helicopter service currently operational for Badrinath (unlike Kedarnath).",
    helipads: ["Jolly Grant Airport (Dehradun) — Private Charter"],
    accessibilityServices: [
      "Badrinath is fully road accessible — suitable for wheelchair users within the temple complex",
      "Wheelchair rental available at Badrinath township",
      "Palanquin service within the temple precinct for elderly pilgrims",
      "GMVN provides dedicated senior pilgrim assistance",
    ],
    reviews: [
      {
        name: "Vijaya Krishnaswamy",
        state: "Karnataka",
        rating: 5,
        text: "The Brahma Kapal ritual at Badrinath moved our entire family to tears. Manya had arranged a wonderful pandit in advance. The Mana village visit was the perfect bonus.",
        date: "June 2024",
      },
      {
        name: "Ramesh Gupta",
        state: "Uttar Pradesh",
        rating: 5,
        text: "Smooth, spiritual, and perfectly organized. The Tapt Kund bath before the morning aarti was an unforgettable experience.",
        date: "October 2023",
      },
    ],
    faqs: [
      {
        q: "Do I need to trek to Badrinath?",
        a: "No. Badrinath is fully road accessible via NH-7. Buses and private vehicles can drive directly to the temple town. No trekking required.",
      },
      {
        q: "What is Tapt Kund?",
        a: "Tapt Kund is a natural hot spring (45–55°C) adjacent to the Badrinath temple, fed by a stream from the Taptakund hot spring near Narad Kund. Pilgrims take a ritual dip before entering the temple.",
      },
      {
        q: "What is Mana Village?",
        a: "Mana Village, 3 km from Badrinath temple, is the last inhabited village before the Indo-Tibet border. It is home to the legendary Vyas Gufa (where Sage Vyasa dictated the Mahabharata), Saraswati River, and Bheem Pul (a natural rock bridge).",
      },
      {
        q: "What are temple darshan timings?",
        a: "Summer: 4:30 AM Mahabhishek, darshan from 6:00 AM. Evening aarti at 8:00–8:30 PM. Temple closes for 2-hour afternoon break. Check BKTC's official website for daily updated timings.",
      },
      {
        q: "Is Badrinath open throughout the year?",
        a: "No. Badrinath opens in late April/early May and closes in mid-November. During winter, the deity is moved to Joshimath (Narsingha temple) and worshipped there.",
      },
    ],
    relatedSlugs: ["char-dham-yatra", "kedarnath-yatra", "do-dham-yatra"],
  },
  "do-dham-yatra": {
    tagline:
      "The Twin Peaks of Devotion — Kedarnath & Badrinath in One Sacred Journey",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
    altitudeM: "3,583 m (Kedarnath)",
    difficulty: "Moderate",
    highlights: [
      "Combined Shiva and Vishnu darshan — complete divine experience",
      "Kedarnath trek or helicopter from Gaurikund",
      "Badrinath fully road accessible",
      "Mana Village — last Indian village before Tibet",
      "Brahma Kapal ancestor rituals at Badrinath",
      "Chopta-Tungnath route optional addition for adventure seekers",
      "Private vehicle arrangement throughout (no shared travel)",
      "Manya family homestay option at Chopta en-route",
    ],
    highlights2: [
      "Shiva + Vishnu Darshan",
      "6–7 Days Optimized",
      "Private Transport",
      "Flexible Itinerary",
    ],
    spiritualStory:
      "The Do Dham Yatra combines the two most significant shrines of the Garhwal Himalayas — Kedarnath (Lord Shiva) and Badrinath (Lord Vishnu), representing the two great streams of Hinduism — Shaivism and Vaishnavism — united in a single pilgrimage. In Hindu philosophy, Shiva and Vishnu are considered complementary aspects of the same ultimate divine reality (Brahman). The Do Dham journey therefore represents seeking the complete divine, crossing the divide between the two great traditions.",
    mythologicalRef:
      "Both Kedarnath and Badrinath are referenced in the Mahabharata as sites visited by the Pandavas. The proximity of the two dhams in the Garhwal range suggests an ancient pilgrimage circuit predating the Char Dham circuit formalized by Adi Shankaracharya.",
    pujaDetails: [
      "All Kedarnath pujas — Mahabhishek (₹1,501), Rudra Abhishek (₹5,001)",
      "All Badrinath pujas — Maha Abhishek (₹2,501), Akhand Jyoti (₹116)",
      "Brahma Kapal Puja at Badrinath — ₹300–₹500 dakshina",
      "Manya coordinates advance booking for all puja slots via BKTC",
    ],
    templeSchedule: [
      {
        period: "May–June",
        morningAarti: "4:00 AM (Kedarnath), 4:30 AM (Badrinath)",
        darshan: "6:00 AM onwards at both temples",
        eveningAarti: "7:30 PM (Kedarnath), 8:00 PM (Badrinath)",
      },
      {
        period: "Sept–Oct",
        morningAarti: "4:30 AM",
        darshan: "6:00 AM – 3:00 PM",
        eveningAarti: "7:00 PM",
      },
    ],
    registrationDocs: [
      "Valid government photo ID",
      "Online registration for both Kedarnath and Badrinath",
      "Medical certificate for ages 60+",
    ],
    registrationPortal: "https://registrationandtouristcare.uk.gov.in",
    medicalAdvisory: [
      "Same advisories as Kedarnath and Badrinath individually",
      "Acclimatize at Guptkashi (1,319 m) before ascending to Kedarnath",
      "Carry personal medications and first-aid essentials",
    ],
    helicopterDetails:
      "Helicopter for Kedarnath available from Phata, Guptkashi, Sirsi, and Agastyamuni helipads. One-way from ₹4,500–₹5,500. Manya coordinates booking as part of the Do Dham package on request.",
    helipads: ["Phata", "Guptkashi", "Sirsi", "Agastyamuni"],
    accessibilityServices: [
      "Pony/Palki/Doli at Kedarnath (₹2,500–₹8,500 one way)",
      "Badrinath is fully road and wheelchair accessible",
    ],
    reviews: [
      {
        name: "Prakash Nair",
        state: "Kerala",
        rating: 5,
        text: "The Do Dham package was perfectly timed. Our family completed both dhams comfortably in 6 days. Manya's guide explained the mythology at each stop — incredibly enriching.",
        date: "June 2024",
      },
    ],
    faqs: [
      {
        q: "What is the Do Dham Yatra?",
        a: "The Do Dham Yatra combines pilgrimages to two sacred shrines: Kedarnath (Lord Shiva) and Badrinath (Lord Vishnu) in the Garhwal Himalayas, usually completed in 6–7 days from Haridwar.",
      },
      {
        q: "Can I do Do Dham in 5 days?",
        a: "Yes, with helicopter at Kedarnath. The route is: Day 1 Haridwar→Guptkashi, Day 2 Helicopter to Kedarnath and back to Guptkashi, Day 3 Guptkashi→Joshimath, Day 4 Badrinath darshan, Day 5 return.",
      },
      {
        q: "Is Do Dham cheaper than Char Dham?",
        a: "Yes, Do Dham is approximately 40–50% less expensive than the full Char Dham, as it skips Yamunotri and Gangotri and the associated travel.",
      },
    ],
    relatedSlugs: ["char-dham-yatra", "kedarnath-yatra", "badrinath-yatra"],
  },
  "valley-of-flowers-hemkund-sahib": {
    tagline:
      "Heaven on Earth — Where 300 Wildflowers Bloom and a Glacier-Lake Reflects the Sky",
    coverImage:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=80",
    altitudeM: "4,329 m (Hemkund Sahib)",
    difficulty: "Moderate",
    highlights: [
      "UNESCO World Heritage Site (Valley of Flowers, since 1982)",
      "300+ flowering species including Brahma Kamal, Blue Poppy, and Cobra Lily",
      "Hemkund Sahib — world's highest gurudwara at 4,329 m",
      "Sacred Hemkund Lake — one of the few natural glacial lakes surrounded by seven snow peaks",
      "Ghangaria — base village with warm guesthouses and GMVN rest houses",
      "October: Valley turns golden with dying flora — equally spectacular",
      "Snow Leopard, Himalayan Brown Bear, and Blue Sheep in the valley",
      "Forest Dept permit mandatory — limited 200 visitors per day",
    ],
    highlights2: [
      "UNESCO Heritage",
      "300+ Flower Species",
      "Sikh Pilgrimage",
      "Wildlife Sightings",
    ],
    spiritualStory:
      "Hemkund Sahib holds profound significance for the Sikh faith. According to the Dasam Granth (a text attributed to Guru Gobind Singh, the 10th Sikh Guru), Guru Gobind Singh meditated in a previous life at Hemkund — a lake surrounded by seven snow-capped peaks. He prayed to God to unite with him, and the divine responded. For Sikhs, the journey to Hemkund Sahib is therefore not just a pilgrimage but a recreation of their Guru's personal spiritual quest. The shimmering glacial lake at 4,329 m reflects the surrounding peaks like a mirror — a sacred setting that explains why it was chosen as a place of deep meditation.\n\nThe Valley of Flowers is equally sacred in Hindu tradition. According to the Ramayana, Hanuman collected the Sanjeevani herb from this valley to revive Lakshmana. The valley was 'rediscovered' by mountaineer Frank Smythe in 1931, who was so enchanted by the carpet of wildflowers that he named it the Valley of Flowers in his 1938 book.",
    mythologicalRef:
      "Hemkund Sahib: Dasam Granth (Guru Gobind Singh). Valley of Flowers: Ramayana (Hanuman's Sanjeevani mission). Hindu tradition also identifies the valley as the meditating ground of Sage Pushp.",
    pujaDetails: [
      "Hemkund Sahib Gurudwara — Free entry. Langar (community kitchen) serves free vegetarian meals 24 hours daily to all pilgrims regardless of faith.",
      "Ardas (Sikh prayer) at the Gurudwara steps — performed by granthi (priest). Visitors of all faiths welcome.",
      "Head covering (rumaal/dupatta) mandatory inside the Gurudwara. Provided free at the entrance.",
      "Valley of Flowers — No religious rituals. Conservation rules prohibit picking flowers, camping inside the valley, or fires.",
    ],
    templeSchedule: [
      {
        period: "June–September (Valley & Gurudwara Open)",
        morningAarti: "4:30 AM (Gurudwara)",
        darshan: "Gurudwara open 24 hours | Valley: 7:00 AM – 6:00 PM",
        eveningAarti: "7:00 PM (Gurudwara)",
      },
    ],
    registrationDocs: [
      "Valid government photo ID",
      "Valley of Flowers permit — purchased at Govindghat or Ghangaria forest check post",
      "₹150/day (Indian nationals), ₹600/day (foreign nationals)",
      "Video camera permit: ₹500/day (Indian), ₹2,000 (foreign)",
      "No camping inside the valley — stay at Ghangaria (3 km from valley entrance)",
    ],
    registrationPortal: "https://www.incredibleindia.org",
    medicalAdvisory: [
      "Valley altitude: 3,600–3,962 m. Hemkund Sahib: 4,329 m — significant altitude gain on Day 4.",
      "Acclimatize 1 day at Ghangaria (3,048 m) before attempting Hemkund Sahib",
      "Hemkund trail is steep — 6 km, 1,280 m altitude gain. Allow 4–5 hours up.",
      "Carry glucose, energy bars, and extra water on the Hemkund day",
      "Medical post at Ghangaria base camp staffed by GMVN doctors in season",
    ],
    helicopterDetails:
      "Helicopter service available from Govindghat to Ghangaria. One-way: ₹3,000–₹4,000 per person. Saves the 13 km uphill trek to Ghangaria base. Operated by GMVN and approved private operators. Limited seats — book at Govindghat helipad on first-come-first-served basis.",
    helipads: ["Govindghat Helipad → Ghangaria"],
    accessibilityServices: [
      "Pony from Govindghat to Ghangaria (13 km) — ₹1,500–₹2,000 one way",
      "Palki service available for elderly pilgrims on Hemkund Sahib trail",
      "SGPC (Shiromani Gurdwara Parbandhak Committee) provides free porter service for disabled Sikh pilgrims",
    ],
    reviews: [
      {
        name: "Gurpreet Singh",
        state: "Punjab",
        rating: 5,
        text: "Reaching Hemkund Sahib was the most spiritual moment of my life. The Ardas at 4,329 m, surrounded by glaciers and seven peaks, left me speechless. Manya made the logistics flawless.",
        date: "August 2024",
      },
      {
        name: "Anita Joshi",
        state: "Delhi",
        rating: 5,
        text: "The Valley of Flowers in late July is absolutely magical. Manya's guide knew every flower species by name. A memory for life.",
        date: "July 2024",
      },
    ],
    faqs: [
      {
        q: "When is the best time to see flowers in the Valley of Flowers?",
        a: "Mid-July to mid-August is peak bloom — the valley is an unbroken carpet of colour. September has fewer flowers but clearer weather. October sees the valley turn golden-russet as plants die back.",
      },
      {
        q: "Is camping allowed in the Valley of Flowers?",
        a: "No. The Valley of Flowers National Park prohibits overnight camping inside the valley. All accommodation is at Ghangaria, 3 km from the valley entrance.",
      },
      {
        q: "Is Hemkund Sahib only for Sikhs?",
        a: "No. Hemkund Sahib welcomes pilgrims and visitors of all faiths. The langar (free community meal) is available to everyone. Basic etiquette (head covering, no smoking) is expected.",
      },
      {
        q: "Can I drive to Ghangaria?",
        a: "No. Ghangaria is accessible only by trekking (13 km from Govindghat) or helicopter. The route is not driveable. Govindghat is the last road-accessible point.",
      },
      {
        q: "What is the altitude of the Valley of Flowers?",
        a: "The valley ranges from 3,600 m to 3,962 m. The entrance is at approximately 3,600 m. Hemkund Sahib is at 4,329 m, a further 6 km and 1,280 m climb from Ghangaria.",
      },
    ],
    relatedSlugs: ["char-dham-yatra", "kedarnath-yatra", "panch-kedar-yatra"],
  },
  "gangotri-gaumukh-tapovan": {
    tagline:
      "To the Source — Where the Ganga Emerges from the Ice and Heaven Meets Earth",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    altitudeM: "4,463 m (Tapovan)",
    difficulty: "Moderate to Difficult",
    highlights: [
      "Gangotri Temple — origin of the Bhagirathi River (source of Ganga)",
      "Gaumukh Glacier — actual source of the Bhagirathi at 3,892 m",
      "Tapovan Meadow — legendary base camp for Shivling (6,543 m) expeditions",
      "Shivling Peak (6,543 m) — the 'Matterhorn of the Himalayas'",
      "Bhagirathi Peaks I, II, III visible from Tapovan",
      "Forest Department permit mandatory — 150 visitors per day cap",
      "One of the most spiritually charged treks in all of India",
      "Nandanvan meadow extension possible for experienced trekkers",
    ],
    highlights2: [
      "Glacier Source",
      "Shivling Views",
      "Permit Required",
      "150/Day Cap",
    ],
    spiritualStory:
      "The Ganga is not merely a river in Hindu tradition — she is Goddess Ganga, who descended from heaven to earth. According to the Ramayana and Mahabharata, King Bhagirath performed tapasya (austerities) for thousands of years to bring Ganga to earth to liberate the 60,000 souls of his ancestors (the Sagara princes) who had been reduced to ashes by the wrath of Sage Kapila. Brahma granted the boon, but the force of Ganga descending from heaven would have destroyed the earth. Bhagirath then prayed to Lord Shiva, who agreed to receive Ganga in his matted locks, thus cushioning her fall. The place where Ganga emerged from Shiva's locks is Gangotri — and the river is called Bhagirathi in Bhagirath's honour, all the way to Devprayag where she meets the Alaknanda and becomes the Ganga.\n\nGaumukh (meaning 'Cow's Mouth') is the snout of the Gangotri Glacier, the actual physical source of the Bhagirathi River. The glacier is currently retreating at 20–25 metres per year — a sobering reminder of climate change's impact on the Himalayas.",
    mythologicalRef:
      "Skanda Purana (Kedar Khand), Ramayana (Bala Kanda — Bhagirath's penance), Mahabharata (Vana Parva), Vishnu Purana. The descent of Ganga is one of the most celebrated events in Hindu mythology.",
    pujaDetails: [
      "Gangotri Temple — Ganga Puja at the temple ghat (₹500–₹2,000). Performed by temple priests at Bhagirathi River bank.",
      "Bhagirathi Puja — Ritual bath in the sacred river. The water temperature is 5–10°C year-round.",
      "Shradh/Pind Daan (ancestor rituals) are performed at the Gangotri ghat for pilgrims who wish to liberate ancestral souls.",
      "No formal pujas are performed at Gaumukh or Tapovan (both are within the national park).",
    ],
    templeSchedule: [
      {
        period: "May–June",
        morningAarti: "6:00 AM",
        darshan: "7:00 AM – 12:00 PM, 4:00 PM – 9:00 PM",
        eveningAarti: "8:00 PM",
      },
      {
        period: "July–October",
        morningAarti: "6:00 AM",
        darshan: "7:00 AM – 12:00 PM, 3:00 PM – 8:00 PM",
        eveningAarti: "7:30 PM",
      },
    ],
    registrationDocs: [
      "Valid government photo ID",
      "Gangotri National Park permit for Gaumukh trek — obtained at Gangotri Forest Checkpost",
      "Fee: ₹150/day (Indian), ₹600/day (foreign) + camera fee",
      "Daily cap: 150 trekkers per day. Pre-booking recommended during June–September peak.",
    ],
    registrationPortal: "https://uttarakhandforest.gov.in",
    medicalAdvisory: [
      "Gaumukh altitude: 3,892 m. Tapovan: 4,463 m — spend 1 night at Gangotri (3,048 m) before continuing",
      "The trail to Gaumukh involves loose boulders and glacier moraine — trekking poles mandatory",
      "AMS risk is high above 3,800 m — watch for symptoms (headache, nausea, fatigue)",
      "Temperature at Tapovan drops to -5°C at night even in summer — carry 4-season sleeping bag",
    ],
    helicopterDetails: null,
    helipads: [],
    accessibilityServices: [
      "No pony/palki services beyond Gangotri temple to Gaumukh — the trail requires physical trekking",
      "Bhojwasa (18 km from Gangotri, 3,775 m) has a GMVN tourist bungalow and dharamshala for night halt",
    ],
    reviews: [
      {
        name: "Vikram Bose",
        state: "West Bengal",
        rating: 5,
        text: "Standing at Gaumukh and watching the Bhagirathi emerge from the glacier was a transcendental moment. Manya's guide was exceptional — knew the geology, mythology, and ecology perfectly.",
        date: "September 2024",
      },
    ],
    faqs: [
      {
        q: "Is Gaumukh a trek or a pilgrimage?",
        a: "Both. Gaumukh (3,892 m) requires a 19 km trek from Gangotri across boulder fields and moraine. It is deeply sacred as the source of Ganga, combining physical challenge with spiritual reward.",
      },
      {
        q: "Can I camp at Tapovan?",
        a: "Camping is permitted at Tapovan (4,463 m) with a Forest Dept permit. Manya provides all camping equipment — tents, sleeping bags, mats, and stoves.",
      },
      {
        q: "What is the difficulty of the Gaumukh trail?",
        a: "Gangotri to Bhojwasa (18 km) is moderate. Bhojwasa to Gaumukh (5 km) is moderately difficult due to boulders. Gaumukh to Tapovan (4 km) is difficult — steep climb across the glacier snout.",
      },
      {
        q: "Is the Gangotri Glacier retreating?",
        a: "Yes. The glacier has retreated approximately 2 km over the past century, and currently retreats 20–25 m per year. Gaumukh was once accessible by road — now it requires a 19 km trek.",
      },
    ],
    relatedSlugs: ["char-dham-yatra", "kedarnath-yatra", "panch-kedar-yatra"],
  },
  "panch-kedar-yatra": {
    tagline: "Five Faces of Shiva — The Ultimate Himalayan Pilgrimage Circuit",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
    altitudeM: "3,800 m (Tungnath, world's highest Shiva temple)",
    difficulty: "Difficult (multi-trek, 15–18 days)",
    highlights: [
      "Five sacred Shiva temples forming one complete divine body",
      "Kedarnath (3,583 m) — Shiva's dorsal hump",
      "Madmaheshwar (3,497 m) — Shiva's navel",
      "Tungnath (3,680 m) — world's highest Shiva temple, Shiva's arms",
      "Rudranath (3,600 m) — Shiva's face, most remote of the five",
      "Kalpeshwar (2,200 m) — Shiva's locks (jata), accessible year-round",
      "Complete circuit connects five valleys of Garhwal Himalayas",
      "For dedicated, experienced trekkers and pilgrims only",
    ],
    highlights2: [
      "All 5 Shiva Forms",
      "15–18 Days Circuit",
      "Most Challenging Yatra",
      "Year-round Kalpeshwar",
    ],
    spiritualStory:
      "The Panch Kedar myth is rooted in the Mahabharata. After the Battle of Kurukshetra, the Pandavas sought Lord Shiva to seek absolution for the sin of gotra-hatya (killing their own clan). Shiva, unwilling to absolve them easily, disguised himself as a bull and hid in the Garhwal mountains among cattle. When Bhima recognised him and grabbed him, the bull submerged into the earth — but his body appeared at five different locations simultaneously: the dorsal hump (prista) at Kedarnath, the navel (nabhi) at Madmaheshwar, the arms (bhuja) at Tungnath, the face (mukha) at Rudranath, and the matted locks (jata) at Kalpeshwar. These five sites together form the Panch Kedar, and only by visiting all five does a devotee attain the complete blessing of Lord Shiva.",
    mythologicalRef:
      "Skanda Purana (Kedar Khand), Mahabharata (Vana Parva). The Panch Kedar is considered among the most ancient pilgrimage circuits in the Himalayas, predating written records. The temples are believed to have been established by the Pandavas themselves.",
    pujaDetails: [
      "Kedarnath — Mahabhishek (₹1,501), Rudra Abhishek (₹5,001) via BKTC",
      "Madmaheshwar — Simple abhishek with Bhagirathi water and bel leaves (₹200–₹500)",
      "Tungnath — Local priests perform puja. Abhishek: ₹300–₹1,000",
      "Rudranath — Puja performed at the naturally self-manifested face of Shiva in the rock (₹200–₹500)",
      "Kalpeshwar — Puja at the jata (matted locks) form of Shiva (₹100–₹300)",
    ],
    templeSchedule: [
      {
        period: "May–November (Kedarnath, Madmaheshwar, Tungnath, Rudranath)",
        morningAarti: "Varies per temple (4:00–6:00 AM)",
        darshan: "6:00 AM – 2:00 PM, 4:00 PM – 8:00 PM",
        eveningAarti: "6:30–8:00 PM",
      },
      {
        period: "Year-round (Kalpeshwar only)",
        morningAarti: "6:00 AM",
        darshan: "7:00 AM – 7:00 PM",
        eveningAarti: "6:30 PM",
      },
    ],
    registrationDocs: [
      "Valid government photo ID for each trekking segment",
      "Kedarnath registration mandatory (registrationandtouristcare.uk.gov.in)",
      "Forest permits for Kedarnath Wildlife Sanctuary and Nanda Devi Biosphere buffer (for Rudranath trail)",
      "Medical certificate strongly recommended for ages 55+",
    ],
    registrationPortal: "https://registrationandtouristcare.uk.gov.in",
    medicalAdvisory: [
      "This is a 15–18 day high-altitude circuit — highest fitness requirement of all Manya yatra offerings",
      "Daily trekking distances: 8–18 km per day at altitudes of 2,200–3,800 m",
      "AMS management protocol briefing mandatory before departure",
      "Medical oxygen cylinders carried by Manya support team throughout",
      "Not recommended for ages 70+, cardiac patients, or those with respiratory conditions",
    ],
    helicopterDetails:
      "Helicopter is available only for the Kedarnath segment (from Phata/Guptkashi/Sirsi). The other four temples (Madmaheshwar, Tungnath, Rudranath, Kalpeshwar) require trekking — no helicopter alternatives exist for these routes.",
    helipads: ["Phata (for Kedarnath only)", "Guptkashi (for Kedarnath only)"],
    accessibilityServices: [
      "Pony/Palki available for Kedarnath segment only",
      "For all other temples, physical trekking is required — no accessibility alternatives",
      "This yatra is not recommended for pilgrims who cannot trek independently",
    ],
    reviews: [
      {
        name: "Suresh Acharya",
        state: "Odisha",
        rating: 5,
        text: "The Panch Kedar circuit was the most transformative experience of my spiritual life. The remoteness of Rudranath, the altitude of Tungnath, the serenity of Madmaheshwar — each temple is a different world. Manya's team was incredible throughout 16 days.",
        date: "October 2023",
      },
    ],
    faqs: [
      {
        q: "What is the order of visiting the Panch Kedar?",
        a: "Traditional order: Kedarnath → Madmaheshwar → Tungnath → Rudranath → Kalpeshwar. This follows the mythological sequence of Shiva's body parts from hump to locks. Some pilgrims reverse it based on logistics.",
      },
      {
        q: "Which is the most difficult temple to reach?",
        a: "Rudranath is considered the most remote and challenging — reached after a 24 km trek through dense forest and high-altitude meadows from Sagar village. Madmaheshwar (22 km from Ransi) comes second.",
      },
      {
        q: "Is Kalpeshwar open in winter?",
        a: "Yes. Kalpeshwar (2,200 m) is the only Panch Kedar shrine open year-round, including winter. It is also the only one accessible by road up to Helang village (a short 3 km walk from the temple).",
      },
      {
        q: "Can I do the Panch Kedar without a guide?",
        a: "Not recommended. The trails to Rudranath and Madmaheshwar in particular are not well-marked and pass through wildlife sanctuaries. Manya assigns a dedicated local guide for the entire circuit.",
      },
      {
        q: "What is the minimum fitness requirement for Panch Kedar?",
        a: "You should be able to trek 15–20 km per day with a daypack (5–7 kg) at altitudes of 2,000–4,000 m. Pre-trip conditioning: 60-minute brisk walks daily for 8 weeks, plus stair climbing.",
      },
    ],
    relatedSlugs: [
      "kedarnath-yatra",
      "char-dham-yatra",
      "gangotri-gaumukh-tapovan",
    ],
  },
};

// Fallback enrichment for unknown slugs
const DEFAULT_ENRICHMENT: YatraEnrichment = {
  tagline: "A Sacred Journey Through the Himalayan Abode of the Gods",
  coverImage:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
  altitudeM: "3,000+ m",
  difficulty: "Moderate",
  highlights: [
    "Expert pilgrimage guide throughout",
    "All permits and registration handled",
    "Comfortable accommodation at each halt",
    "BKTC puja coordination",
  ],
  highlights2: [
    "Expert Guides",
    "All Permits",
    "Comfortable Stays",
    "24/7 Support",
  ],
  spiritualStory:
    "A profound spiritual journey through the sacred Himalayan region of Uttarakhand, home to some of the oldest and most revered pilgrimage sites in all of India.",
  mythologicalRef:
    "Referenced in the Skanda Purana, Mahabharata, and Shiva/Vishnu Puranas.",
  pujaDetails: [
    "Custom puja arrangements per temple",
    "BKTC-registered priests",
    "Advance booking coordinated by Manya",
  ],
  templeSchedule: [
    {
      period: "May–October",
      morningAarti: "4:30 AM",
      darshan: "6:00 AM – 8:00 PM",
      eveningAarti: "7:30 PM",
    },
  ],
  registrationDocs: [
    "Valid government photo ID",
    "Online registration at registrationandtouristcare.uk.gov.in",
    "Medical certificate for ages 60+",
  ],
  registrationPortal: "https://registrationandtouristcare.uk.gov.in",
  medicalAdvisory: [
    "Carry personal medications",
    "Acclimatize before ascending above 2,500 m",
    "AMS awareness briefing provided by Manya team",
  ],
  helicopterDetails: null,
  helipads: [],
  accessibilityServices: ["Pony/Palki services available on applicable routes"],
  reviews: [],
  faqs: [
    {
      q: "What is the best time for this yatra?",
      a: "May–June and September–October offer the best weather and trail conditions.",
    },
    {
      q: "Is registration required?",
      a: "Yes. All Char Dham pilgrims must register at the Uttarakhand Tourism portal.",
    },
  ],
  relatedSlugs: ["char-dham-yatra", "kedarnath-yatra"],
};

const SECTIONS = [
  "Overview",
  "Itinerary",
  "Spiritual",
  "Puja",
  "Timings",
  "Registration",
  "Medical",
  "Helicopter",
  "Reviews",
  "FAQ",
];

export default function YatraDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const yatra = getYatraBySlug(slug);
  const isLoading = false;
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("Overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const [navSticky, setNavSticky] = useState(false);
  const enrichmentKey =
    {
      "char-dham": "char-dham-yatra",
      kedarnath: "kedarnath-yatra",
      "do-dham-yatra": "do-dham-yatra",
    }[slug] ?? slug;
  const enrichment: YatraEnrichment = {
    ...(ENRICHMENTS[enrichmentKey] ?? DEFAULT_ENRICHMENT),
    ...(yatra?.faqs?.length
      ? { faqs: yatra.faqs }
      : {}),
    ...(yatra?.tagline ? { tagline: yatra.tagline } : {}),
    ...(yatra?.imageUrl ? { coverImage: yatra.imageUrl } : {}),
  };

  // Scroll spy for sticky nav
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const observer = new IntersectionObserver(
      ([entry]) => setNavSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-68px 0px 0px 0px" },
    );
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: string) => {
    const el = sectionRefs.current[section];
    if (el) {
      const headerOffset =
        Number.parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--site-header-offset",
          ),
          10,
        ) || 68;
      const offset = headerOffset + 52;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(section);
    }
  };

  type DayItem = {
    day: bigint;
    title: string;
    route: string;
    distance: string;
    altitudes: string;
    description: string;
    campsite: string;
    meals: string;
    difficulty: string;
    landmarks: string[];
  };
  const itinerary = (yatra as unknown as { itinerary?: DayItem[] })?.itinerary;

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          className="h-[80vh] animate-pulse"
          style={{ backgroundColor: "#F0F0F0" }}
        />
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {["w-2/3", "w-full", "w-5/6", "w-4/5"].map((w) => (
              <div
                key={w}
                className={`h-4 rounded animate-pulse ${w}`}
                style={{ backgroundColor: "#F0F0F0" }}
              />
            ))}
          </div>
          <div
            className="h-72 rounded-2xl animate-pulse"
            style={{ backgroundColor: "#F0F0F0" }}
          />
        </div>
      </div>
    );
  }

  if (!yatra) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="text-center px-4">
          <p className="text-6xl mb-6">🛕</p>
          <h1
            className="font-display text-3xl mb-3"
            style={{ color: "#1A1A1A" }}
          >
            Yatra Not Found
          </h1>
          <p className="font-body text-base mb-8" style={{ color: "#666666" }}>
            The yatra you are looking for does not exist.
          </p>
          <Link
            href="/yatra"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#F7F7F7" }}
            data-ocid="yatra.not_found_back"
          >
            View All Yatras
          </Link>
        </div>
      </div>
    );
  }

  const heroImage =
    enrichment.coverImage ||
    yatra.imageUrl ||
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80";
  const heroImages = getYatraHeroImages(yatra.slug, heroImage);
  const priceMin = Number(yatra.priceRange.minINR).toLocaleString("en-IN");
  const priceMax = Number(yatra.priceRange.maxINR).toLocaleString("en-IN");
  const faqs =
    enrichment.faqs.length > 0
      ? enrichment.faqs
      : [
          {
            q: "What is the best time?",
            a: `The ideal season is ${yatra.season}.`,
          },
          {
            q: "Is registration mandatory?",
            a:
              yatra.registrationInfo ||
              "Yes, register at the official Uttarakhand Tourism portal.",
          },
        ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <div data-hero className="relative h-[80vh] overflow-hidden">
        <HeroCarousel images={heroImages} alt={yatra.name} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 md:px-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1.5 text-xs font-body mb-5"
              style={{ color: "rgba(255,255,255,0.65)" }}
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/yatra" className="hover:text-white transition-colors">
                Yatra
              </Link>
              <span>/</span>
              <span style={{ color: "#FFE082" }}>{yatra.name}</span>
            </nav>
            {/* Tagline */}
            <p
              className="font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#FFE082" }}
            >
              Sacred Pilgrimage · Uttarakhand
            </p>
            <h1 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 max-w-3xl">
              {yatra.name}
            </h1>
            <p
              className="font-body text-base mb-8 max-w-xl"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {enrichment.tagline}
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  icon: <Clock className="w-3.5 h-3.5" />,
                  label: yatra.duration,
                },
                {
                  icon: <Calendar className="w-3.5 h-3.5" />,
                  label: yatra.season,
                },
                {
                  icon: <MapPin className="w-3.5 h-3.5" />,
                  label: enrichment.altitudeM,
                },
                {
                  icon: <Shield className="w-3.5 h-3.5" />,
                  label: enrichment.difficulty,
                },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium text-white"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {s.icon}
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky section nav ────────────────────────────── */}
      <div
        ref={navRef}
        className={`detail-section-nav hide-scrollbar overflow-x-auto ${navSticky ? "shadow-md" : ""}`}
        data-ocid="yatra.section_nav"
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E8E8E8",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex gap-2 py-2.5 min-w-max">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollToSection(s)}
                data-ocid={`yatra.nav_tab.${s.toLowerCase()}`}
                className="px-3.5 py-2 text-xs font-body font-semibold tracking-wide uppercase whitespace-nowrap bg-white"
                style={{
                  color: activeSection === s ? "#FFC107" : "#555555",
                }}
              >
                {s === "Spiritual"
                  ? "Spiritual Story"
                  : s === "Puja"
                    ? "Puja & Rituals"
                    : s === "Timings"
                      ? "Temple Timings"
                      : s === "FAQ"
                        ? "FAQs"
                        : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
        {/* LEFT */}
        <div className="space-y-16 min-w-0">
          {/* Overview */}
          <section
            ref={(el) => {
              sectionRefs.current.Overview = el;
            }}
          >
            <SectionLabel>Overview</SectionLabel>
            <h2
              className="font-display text-3xl md:text-4xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              About {yatra.name}
            </h2>
            <p
              className="font-body text-base leading-relaxed mb-8"
              style={{ color: "#666666" }}
            >
              {yatra.description}
            </p>
            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enrichment.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#FFC107" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "#1A1A1A" }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
            {/* Highlights badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {enrichment.highlights2.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold"
                  style={{ backgroundColor: "#F7F7F7", color: "#FFE082" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section
            ref={(el) => {
              sectionRefs.current.Itinerary = el;
            }}
          >
            <SectionLabel>Day-by-Day Itinerary</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Complete Journey Plan
            </h2>
            {itinerary && itinerary.length > 0 ? (
              <div className="space-y-2">
                {itinerary.map((day, idx) => (
                  <div
                    key={`day-${Number(day.day)}`}
                    style={{
                      border: "1px solid #E8E8E8",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDay(openDay === idx ? null : idx)}
                      data-ocid={`yatra.itinerary.day.${idx + 1}`}
                      className="no-retro w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                      style={{
                        backgroundColor:
                          openDay === idx ? "#F0F0F0" : "#FFFFFF",
                      }}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className="font-mono text-xs font-bold shrink-0 w-14"
                          style={{ color: "#FFD54F" }}
                        >
                          DAY {Number(day.day)}
                        </span>
                        <h3
                          className="font-display text-lg truncate"
                          style={{ color: "#1A1A1A" }}
                        >
                          {day.title}
                        </h3>
                      </div>
                      {openDay === idx ? (
                        <ChevronUp
                          className="w-4 h-4 shrink-0"
                          style={{ color: "#666666" }}
                        />
                      ) : (
                        <ChevronDown
                          className="w-4 h-4 shrink-0"
                          style={{ color: "#666666" }}
                        />
                      )}
                    </button>
                    {openDay === idx && (
                      <div
                        className="px-5 pb-5 space-y-4"
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #E8E8E8",
                        }}
                      >
                        <div
                          className="flex flex-wrap gap-4 pt-4 text-xs font-body"
                          style={{ color: "#666666" }}
                        >
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {day.route}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {day.distance}
                          </span>
                          <span className="font-mono">{day.altitudes}</span>
                        </div>
                        <p
                          className="font-body text-sm leading-relaxed"
                          style={{ color: "#666666" }}
                        >
                          {day.description}
                        </p>
                        {day.landmarks.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {day.landmarks.map((lm) => (
                              <span
                                key={lm}
                                className="px-2.5 py-1 rounded-full text-xs font-body font-medium"
                                style={{
                                  backgroundColor: "#F5F5F5",
                                  color: "#1A1A1A",
                                }}
                              >
                                {lm}
                              </span>
                            ))}
                          </div>
                        )}
                        <div
                          className="flex flex-wrap gap-5 text-xs font-body pt-2"
                          style={{
                            color: "#666666",
                            borderTop: "1px solid #E8E8E8",
                          }}
                        >
                          <span>
                            <strong style={{ color: "#1A1A1A" }}>
                              Accommodation:
                            </strong>{" "}
                            {day.campsite}
                          </span>
                          <span>
                            <strong style={{ color: "#1A1A1A" }}>Meals:</strong>{" "}
                            {day.meals}
                          </span>
                          <span>
                            <strong style={{ color: "#1A1A1A" }}>
                              Difficulty:
                            </strong>{" "}
                            {day.difficulty}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="p-8 rounded-2xl text-center"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <p className="font-body text-sm" style={{ color: "#666666" }}>
                  Detailed itinerary shared on booking confirmation. Contact us
                  to discuss the full plan.
                </p>
              </div>
            )}
          </section>

          {/* Spiritual Significance */}
          <section
            ref={(el) => {
              sectionRefs.current.Spiritual = el;
            }}
          >
            <SectionLabel>Spiritual Story</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Sacred Significance
            </h2>
            <div className="space-y-4">
              {enrichment.spiritualStory.split("\n\n").map((para) => (
                <p
                  key={para.slice(0, 30)}
                  className="font-body text-base leading-relaxed"
                  style={{ color: "#666666" }}
                >
                  {para}
                </p>
              ))}
            </div>
            {enrichment.mythologicalRef && (
              <div
                className="mt-6 pl-5 py-4"
                style={{ borderLeft: "3px solid #FFE082" }}
              >
                <p
                  className="font-body text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "#FFD54F" }}
                >
                  Source Texts
                </p>
                <p
                  className="font-body text-sm italic"
                  style={{ color: "#666666" }}
                >
                  {enrichment.mythologicalRef}
                </p>
              </div>
            )}
          </section>

          {/* Puja & Rituals */}
          <section
            ref={(el) => {
              sectionRefs.current.Puja = el;
            }}
          >
            <SectionLabel>Puja & Rituals</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Rituals, Offerings & Costs
            </h2>
            <div className="space-y-3">
              {enrichment.pujaDetails.map((puja) => (
                <div
                  key={puja.slice(0, 30)}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <Flame
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#FFD54F" }}
                  />
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "#666666" }}
                  >
                    {puja}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="mt-4 p-4 rounded-xl flex items-start gap-3"
              style={{
                backgroundColor: "#FFF8F0",
                border: "1px solid #FFE082",
              }}
            >
              <Info
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: "#FFD54F" }}
              />
              <p className="font-body text-xs" style={{ color: "#666666" }}>
                All puja bookings coordinated by TrekRoots. Book via
                BKTC online portal or let our team handle advance reservations
                for you.
              </p>
            </div>
          </section>

          {/* Temple Timings */}
          <section
            ref={(el) => {
              sectionRefs.current.Timings = el;
            }}
          >
            <SectionLabel>Temple Timings</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Opening Hours & Aarti Schedule
            </h2>
            <div
              className="overflow-x-auto rounded-2xl"
              style={{ border: "1px solid #E8E8E8" }}
            >
              <table className="w-full text-sm font-body">
                <thead>
                  <tr style={{ backgroundColor: "#F7F7F7" }}>
                    {[
                      "Season / Period",
                      "Morning Aarti",
                      "Darshan Hours",
                      "Evening Aarti",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#FFE082" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enrichment.templeSchedule.map((row, i) => (
                    <tr
                      key={row.period ?? String(i)}
                      style={{
                        backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F5F5F5",
                        borderTop: "1px solid #E8E8E8",
                      }}
                    >
                      <td
                        className="px-5 py-3.5 font-semibold"
                        style={{ color: "#1A1A1A" }}
                      >
                        {row.period}
                      </td>
                      <td
                        className="px-5 py-3.5 font-mono text-xs"
                        style={{ color: "#666666" }}
                      >
                        {row.morningAarti}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "#666666" }}>
                        {row.darshan}
                      </td>
                      <td
                        className="px-5 py-3.5 font-mono text-xs"
                        style={{ color: "#666666" }}
                      >
                        {row.eveningAarti}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-body text-xs" style={{ color: "#666666" }}>
              Temple timings are subject to change on festival days. Verify
              current timings with BKTC before travel.
            </p>
          </section>

          {/* Registration */}
          <section
            ref={(el) => {
              sectionRefs.current.Registration = el;
            }}
          >
            <SectionLabel>Registration</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Documents & Registration Requirements
            </h2>
            <div className="space-y-2.5 mb-6">
              {enrichment.registrationDocs.map((doc, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static seeded list
                <div key={`doc-${i}`} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#5A8A6A" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "#666666" }}
                  >
                    {doc}
                  </span>
                </div>
              ))}
            </div>
            <a
              href={enrichment.registrationPortal}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="yatra.registration_portal_link"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#F7F7F7" }}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Register Online (Official
              Portal)
            </a>
          </section>

          {/* Medical */}
          <section
            ref={(el) => {
              sectionRefs.current.Medical = el;
            }}
          >
            <SectionLabel>Medical Advisory</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Health, Fitness & AMS Awareness
            </h2>
            <div className="space-y-3">
              {enrichment.medicalAdvisory.map((item) => (
                <div
                  key={item.slice(0, 30)}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: "#FFF8F0",
                    border: "1px solid #F5F5F5",
                  }}
                >
                  <Heart
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#FFC107" }}
                  />
                  <p className="font-body text-sm" style={{ color: "#666666" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="mt-5 p-5 rounded-2xl"
              style={{
                backgroundColor: "#F5F5F5",
                border: "1px solid #E8E8E8",
              }}
            >
              <p
                className="font-body text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#FFD54F" }}
              >
                AMS — Acute Mountain Sickness
              </p>
              <p className="font-body text-sm" style={{ color: "#666666" }}>
                Symptoms: Headache, nausea, dizziness, loss of appetite,
                shortness of breath. If symptoms appear above 2,500 m — descend
                immediately and seek medical attention. Our team carries oxygen
                cylinders and emergency medication.
              </p>
            </div>
          </section>

          {/* Helicopter */}
          <section
            ref={(el) => {
              sectionRefs.current.Helicopter = el;
            }}
          >
            <SectionLabel>Helicopter</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Helicopter Services
            </h2>
            {enrichment.helicopterDetails ? (
              <>
                <div
                  className="p-6 rounded-2xl mb-4"
                  style={{
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #E8E8E8",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="w-6 h-6 shrink-0 mt-0.5"
                      style={{ color: "#1A1A1A" }}
                    />
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "#666666" }}
                    >
                      {enrichment.helicopterDetails}
                    </p>
                  </div>
                </div>
                {enrichment.helipads.length > 0 && (
                  <div>
                    <p
                      className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: "#666666" }}
                    >
                      Available Helipads
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {enrichment.helipads.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium"
                          style={{
                            backgroundColor: "#F0F0F0",
                            color: "#1A1A1A",
                          }}
                        >
                          <MapPin className="w-3 h-3" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  className="mt-5 p-4 rounded-xl flex items-start gap-3"
                  style={{
                    border: "1px solid #FFE082",
                    backgroundColor: "#FFFDF5",
                  }}
                >
                  <Info
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "#FFD54F" }}
                  />
                  <p className="font-body text-xs" style={{ color: "#666666" }}>
                    Book helicopter in advance — seats are limited and sell out
                    quickly during peak pilgrimage season (May–June). Manya's
                    team can arrange bookings on your behalf.
                  </p>
                </div>
              </>
            ) : (
              <div
                className="p-8 rounded-2xl text-center"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <p className="font-body text-sm" style={{ color: "#666666" }}>
                  Helicopter services are not available for this yatra route.
                  The journey requires trekking on foot.
                </p>
              </div>
            )}
            {/* Accessibility */}
            {enrichment.accessibilityServices.length > 0 && (
              <div className="mt-8">
                <p
                  className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#666666" }}
                >
                  Accessibility Services (Pony / Palki / Doli)
                </p>
                <div className="space-y-2">
                  {enrichment.accessibilityServices.map((s) => (
                    <div
                      key={s.slice(0, 30)}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E8E8E8",
                      }}
                    >
                      <HeartHandshake
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "#FFC107" }}
                      />
                      <span
                        className="font-body text-sm"
                        style={{ color: "#666666" }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Reviews */}
          <section
            ref={(el) => {
              sectionRefs.current.Reviews = el;
            }}
          >
            <SectionLabel>Reviews</SectionLabel>
            <h2
              className="font-display text-3xl mb-2"
              style={{ color: "#1A1A1A" }}
            >
              What Pilgrims Say
            </h2>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className="w-4 h-4 fill-current"
                    style={{ color: "#FFD54F" }}
                  />
                ))}
              </div>
              <span
                className="font-mono text-sm font-bold"
                style={{ color: "#1A1A1A" }}
              >
                4.9
              </span>
              <span className="font-body text-xs" style={{ color: "#666666" }}>
                Based on verified traveller reviews
              </span>
            </div>
            {enrichment.reviews.length > 0 ? (
              <div className="space-y-4">
                {enrichment.reviews.map((r, i) => (
                  <div
                    key={r.name ?? String(i)}
                    className="p-6 rounded-2xl"
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "1px solid #E8E8E8",
                    }}
                    data-ocid={`yatra.review.${i + 1}`}
                  >
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className="w-3.5 h-3.5 fill-current"
                          style={{
                            color: n <= r.rating ? "#FFD54F" : "#2A2A2A",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="font-body text-base italic mt-3 mb-4 leading-relaxed"
                      style={{ color: "#666666" }}
                    >
                      "{r.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-body text-sm font-semibold"
                          style={{ color: "#1A1A1A" }}
                        >
                          {r.name}
                        </p>
                        <p
                          className="font-body text-xs"
                          style={{ color: "#666666" }}
                        >
                          {r.state} · {r.date}
                        </p>
                      </div>
                      <span
                        className="text-xs font-body font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#F0F0F0",
                          color: "#1A1A1A",
                        }}
                      >
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="p-8 rounded-2xl text-center"
                style={{ backgroundColor: "#F5F5F5" }}
                data-ocid="yatra.reviews.empty_state"
              >
                <p className="font-body text-sm" style={{ color: "#666666" }}>
                  Be the first to share your experience.
                </p>
              </div>
            )}
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-colors"
              style={{ border: "1.5px solid #F5F5F5", color: "#1A1A1A" }}
              data-ocid="yatra.write_review_button"
            >
              <MessageCircle className="w-4 h-4" /> Write a Review
            </button>
          </section>

          {/* FAQ */}
          <section
            ref={(el) => {
              sectionRefs.current.FAQ = el;
            }}
          >
            <SectionLabel>FAQs</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  style={{
                    border: "1px solid #E8E8E8",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    data-ocid={`yatra.faq.${idx + 1}`}
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                    style={{
                      backgroundColor: openFaq === idx ? "#F0F0F0" : "#FFFFFF",
                    }}
                  >
                    <span
                      className="font-body text-sm font-semibold pr-4"
                      style={{ color: "#1A1A1A" }}
                    >
                      {faq.q}
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp
                        className="w-4 h-4 shrink-0"
                        style={{ color: "#666666" }}
                      />
                    ) : (
                      <ChevronDown
                        className="w-4 h-4 shrink-0"
                        style={{ color: "#666666" }}
                      />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div
                      className="px-5 pb-5 pt-2"
                      style={{
                        backgroundColor: "white",
                        borderTop: "1px solid #E8E8E8",
                      }}
                    >
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "#666666" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Yatras */}
          <section>
            <SectionLabel>Related</SectionLabel>
            <h2
              className="font-display text-3xl mb-6"
              style={{ color: "#1A1A1A" }}
            >
              You Might Also Consider
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto pb-2">
              {enrichment.relatedSlugs.map((relSlug) => {
                const rel = ENRICHMENTS[relSlug];
                if (!rel) return null;
                const names: Record<string, string> = {
                  "char-dham-yatra": "Char Dham Yatra",
                  "kedarnath-yatra": "Kedarnath Yatra",
                  "badrinath-yatra": "Badrinath Yatra",
                  "do-dham-yatra": "Do Dham Yatra",
                  "valley-of-flowers-hemkund-sahib":
                    "Valley of Flowers & Hemkund",
                  "gangotri-gaumukh-tapovan": "Gangotri-Gaumukh",
                  "panch-kedar-yatra": "Panch Kedar Yatra",
                };
                return (
                  <Link
                    key={relSlug}
                    href={`/yatra/${relSlug }`}
                    data-ocid={`yatra.related.${relSlug}`}
                    className="group block rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #E8E8E8" }}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <CloudinaryImage
                        src={rel.coverImage}
                        alt={names[relSlug] || relSlug}
                        width={400}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        transform={{ width: 400, height: 160, crop: "fill" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
                        }}
                      />
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#F5F5F5" }}>
                      <p
                        className="font-display text-base font-semibold"
                        style={{ color: "#1A1A1A" }}
                      >
                        {names[relSlug] || relSlug}
                      </p>
                      <p
                        className="font-body text-xs mt-1 line-clamp-2"
                        style={{ color: "#666666" }}
                      >
                        {rel.tagline}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT — sticky booking widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-[130px] space-y-4">
            {/* Price card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E8E8E8", backgroundColor: "white" }}
            >
              <div className="px-6 pt-6 pb-4">
                <p
                  className="font-body text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "#666666" }}
                >
                  Price per person
                </p>
                <p
                  className="font-mono text-3xl font-bold"
                  style={{ color: "#1A1A1A" }}
                >
                  ₹{priceMin}
                </p>
                <p className="font-mono text-sm" style={{ color: "#666666" }}>
                  – ₹{priceMax} <span className="text-xs">*GST applicable</span>
                </p>
              </div>{" "}
              <div className="px-6 pb-4">
                <TripCostCalculator
                  tripName={yatra.name || "Yatra"}
                  baseDurationDays={Number.parseInt(yatra.duration) || 7}
                  pricePerPersonBudget={
                    Math.round(Number(yatra.priceRange?.minINR) * 0.8) || 8000
                  }
                  pricePerPersonStandard={
                    Math.round(Number(yatra.priceRange?.minINR)) || 10000
                  }
                  pricePerPersonPremium={
                    Math.round(Number(yatra.priceRange?.maxINR)) || 18000
                  }
                  tripType="yatra"
                />
              </div>
              <div className="px-6 pb-6 space-y-3">
                {/* Book Now CTA */}
                <Link
                  href={`/booking/yatra-${slug}`}
                  className="block w-full text-center py-3.5 rounded-xl font-body text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#F7F7F7" }}
                  data-ocid="yatra.book_button"
                >
                  Book This Yatra
                </Link>

                {/* Convenience Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    data-ocid="yatra.wishlist_button"
                    onClick={() => alert("Added to wishlist!")}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body transition-colors"
                    style={{
                      border: "1px solid #E8E8E8",
                      color: "#1A1A1A",
                      background: "#FDFAF6",
                    }}
                  >
                    <Heart className="w-3 h-3" /> Wishlist
                  </button>
                  <button
                    type="button"
                    data-ocid="yatra.share_button"
                    onClick={async () => {
                      if (navigator.share) {
                        await navigator
                          .share({
                            title: yatra.name,
                            url: window.location.href,
                          })
                          .catch(() => {});
                      } else {
                        await navigator.clipboard.writeText(
                          window.location.href,
                        );
                        alert("Link copied!");
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body transition-colors"
                    style={{
                      border: "1px solid #E8E8E8",
                      color: "#1A1A1A",
                      background: "#FDFAF6",
                    }}
                  >
                    <MessageCircle className="w-3 h-3" /> Share
                  </button>
                  <button
                    type="button"
                    data-ocid="yatra.download_itinerary_button"
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body transition-colors"
                    style={{
                      border: "1px solid #E8E8E8",
                      color: "#1A1A1A",
                      background: "#FDFAF6",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" /> Itinerary
                  </button>
                  <a
                    href={whatsappLink(
                      `Hi! I'm interested in ${yatra.name}. Can you help me plan?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="yatra.whatsapp_button"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body text-white transition-colors"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <Phone className="w-3 h-3" /> WhatsApp
                  </a>
                </div>

                {/* Call Now */}
                <a
                  href={PHONE_HREF}
                  data-ocid="yatra.call_button"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold font-body transition-colors"
                  style={{
                    border: "1px solid #E8E8E8",
                    color: "#FFC107",
                    background: "#FDFAF6",
                  }}
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: "#FFC107" }} />
                  Call Now: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Trust Badge Grid */}
            <div
              className="p-5 rounded-2xl"
              style={{
                backgroundColor: "#F5F5F5",
                border: "1px solid #E8E8E8",
              }}
            >
              <p
                className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#666666" }}
              >
                Why Book with Manya
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    icon: (
                      <Shield
                        className="w-4 h-4"
                        style={{ color: "#FFC107" }}
                      />
                    ),
                    label: "Secure Payment",
                  },
                  {
                    icon: (
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "#FFC107" }}
                      />
                    ),
                    label: "Certified Guides",
                  },
                  {
                    icon: (
                      <Phone className="w-4 h-4" style={{ color: "#FFC107" }} />
                    ),
                    label: "24/7 Support",
                  },
                  {
                    icon: (
                      <Heart className="w-4 h-4" style={{ color: "#FFC107" }} />
                    ),
                    label: "Best Price Guarantee",
                  },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    style={{ background: "white", border: "1px solid #E8E8E8" }}
                  >
                    {icon}
                    <span
                      className="text-[10px] font-semibold font-body leading-tight"
                      style={{ color: "#1A1A1A" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick stats */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: "#F7F7F7" }}
            >
              <p
                className="font-body text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#FFE082" }}
              >
                Quick Facts
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Duration", value: yatra.duration },
                  { label: "Season", value: yatra.season },
                  { label: "Max Altitude", value: enrichment.altitudeM },
                  { label: "Difficulty", value: enrichment.difficulty },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="font-body text-xs"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-body text-xs font-semibold"
                      style={{ color: "white" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <div className="py-16" style={{ backgroundColor: "#F7F7F7" }}>
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display italic text-3xl text-white mb-2">
              Begin Your Sacred Journey
            </h2>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Let our experienced team guide every step of this transformative
              pilgrimage.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappLink(
                `Hi TrekRoots! I'd like to plan ${yatra.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm font-semibold text-white transition-colors"
              style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
              data-ocid="yatra.bottom_whatsapp_button"
            >
              <Phone className="w-4 h-4" /> WhatsApp Us
            </a>
            <Link
              href={`/booking/yatra-${slug}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#FFE082", color: "#000000" }}
              data-ocid="yatra.bottom_book_button"
            >
              Book This Yatra
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sticky book button */}
      <div className="fixed bottom-14 left-0 right-0 z-40 px-4 md:hidden flex gap-2">
        <Link
          href={`/booking/yatra-${slug}`}
          className="flex-1 block text-center py-4 rounded-xl font-body text-sm font-semibold text-black shadow-lg"
          style={{ backgroundColor: "#FFC107" }}
          data-ocid="yatra.mobile_book_button"
        >
          Book This Yatra — From ₹{priceMin}
        </Link>
        <a
          href={whatsappLink(
            `Hi! I'm interested in ${yatra.name}. Can you help me plan?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="no-retro px-4 py-4 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
          data-ocid="yatra.mobile_whatsapp_button"
          aria-label="Chat on WhatsApp"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-xs font-semibold tracking-[0.2em] uppercase mb-2"
      style={{ color: "#FFD54F" }}
    >
      {children}
    </p>
  );
}
