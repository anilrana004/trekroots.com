"use client";

import type { BlogPost } from "@/data";
import { getAllBlogPosts, getBlogPostBySlug } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { catalogLinksForBlog } from "@/lib/related";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Copy,
  Facebook,
  Link2,
  Twitter,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

// Rich mock content keyed by slug
const MOCK_CONTENT: Record<string, string> = {
  "valley-of-flowers-photo-guide": `## The Window of Wonder\n\nThe Valley of Flowers opens its gates every year between mid-July and mid-September. This narrow window is not merely a calendar entry — it is a covenant between cloud and alpine soil. Arrive too early and the meadows will show you brown grass; too late and the first frosts will have claimed the petals.\n\n> “Golden hour at 3,700 metres is unlike anything you will encounter at sea level. The atmosphere is thinner, the light travels further, and every colour is saturated ten stops beyond what your histogram expects.” — Arjun Mehta, TrekRoots\n\n## Choosing Your Lens\n\nFor the sweeping panoramas that define Valley of Flowers photography, a wide-angle lens in the 16–24 mm range gives you the most natural perspective without distorting the foreground flowers. However, macro photographers will find extraordinary rewards in the Brahmakamal (Saussurea obvallata) and Himalayan blue poppy (Meconopsis aculeata), which demand a 90–105 mm macro lens.\n\n## The Golden-Hour Ritual\n\nBreak camp before 5:30 AM. Walk south along the meadow's edge where the valley floor curves toward the Pushpawati River. The light first catches the far ridgeline at roughly 6:15 AM, dropping clean shafts across the mist-laden valley. This forty-minute window is the single most valuable shooting session of any Valley of Flowers trip.\n\n## Ethics on the Trail\n\nThe valley is a UNESCO World Heritage Site and a notified National Park. No photography beyond sunset near the ranger stations, no entry off the marked trails, and absolutely no picking of flowers. Your lens should be the only instrument that touches the landscape.`,

  "kedarnath-yatra-complete-guide": `## Kedarnath: Where the Himalayas Hold Their Breath\n\nAt 3,583 metres above sea level, the Kedarnath temple sits in a granite bowl carved by the Mandakini glacier. It is one of the twelve Jyotirlingas and the holiest Shiva shrine in the Himalayas. Every year, roughly half a million devotees make the journey between the temple's opening in May and its closing after Diwali in November.\n\n> “The last kilometre of the Kedarnath trek, with the temple illuminated against the black peaks at dawn, is the most moving sight I have witnessed in twenty years of Himalayan travel.” — Priya Sharma\n\n## Getting to Gaurikund\n\nThe trek begins at Gaurikund (1,982 m), reached by road from Rishikesh (210 km). The drive via Rudraprayag and Sonprayag takes 7–8 hours. Sonprayag is the last point private vehicles can access; shared jeeps run to Gaurikund from there.\n\n## The Trek: 16 Kilometres Each Way\n\nThe trail gains 1,600 metres over 16 km. Stages: Gaurikund → Jungle Chatti (4 km) → Bheembali (7 km) → Lincholi (10 km) → Kedarnath (16 km). Allow 6–8 hours going up for first-time trekkers.\n\n## Helicopter Option\n\nHelicopter services operate from Phata, Guptkashi, and Sirsi to Kedarnath helipad (3,600 m). The fare is \u20b97,000–10,000 per person one-way. Book through the official IRCTC portal or authorised operators at least 30 days in advance during peak season.\n\n## Registration and Biometric\n\nAll Char Dham Yatris must register online at registrationandtouristcare.uk.gov.in and carry their registration slip. Biometric is done at Haridwar, Rishikesh, or district registration points.`,

  "best-treks-uttarakhand": `## Uttarakhand: The Trekker's Treasury\n\nThe state of Uttarakhand contains more trekking terrain per square kilometre than virtually any other region in the world. From the sub-alpine meadows of Bedni Bugyal to the stark moraines below Nanda Devi, the range of experiences is extraordinary.\n\n## 1. Valley of Flowers (Easy, 7 days)\n\nThe gentlest introduction to high-altitude trekking. Maximum altitude 3,800 m. Best in August. Combined with Hemkund Sahib for a full spiritual-adventure week.\n\n## 2. Roopkund (Moderate-Hard, 8 days)\n\nThe Skeleton Lake trek. Maximum altitude 5,029 m. Passes through the oak forests of Lohajung, the grand Bedni Bugyal, and the eerie Ali Bugyal before reaching the glaciated rim above the lake.\n\n> “The moment you crest the ridge above Roopkund and the emerald lake appears — with human bones still visible in the shallows — is one of those rare instances where history and landscape collide in genuinely unsettling beauty.” — Vikram Nair\n\n## 3. Brahmatal (Easy-Moderate, 6 days)\n\nThe finest winter trek in Uttarakhand. Maximum altitude 3,850 m. Offers extraordinary frozen-lake reflections of Trishul and Mt. Nanda Ghunti in December–February.\n\n## 4. Kedarkantha (Easy, 6 days)\n\nThe quintessential winter introduction. Maximum altitude 3,810 m. Conical summit with a 360\u00b0 Himalayan panorama. Best in December–March.\n\n## 5. Har Ki Dun (Easy-Moderate, 7 days)\n\nThe Valley of Gods. Ancient stone villages, mythological associations with the Pandavas, and clear views of Swargarohini. Maximum altitude 3,510 m.`,

  "char-dham-yatra-planning":
    "## The Sacred Circuit: An Overview\n\nThe Char Dham — Yamunotri, Gangotri, Kedarnath, and Badrinath — are the four holiest shrines in the Garhwal Himalaya. The traditional circuit follows the prescribed anticlockwise sequence: Yamunotri (source of Yamuna), Gangotri (source of Ganga), Kedarnath (Jyotirlinga), and Badrinath (Vishnu).\n\n> “Completing the Char Dham is considered to wash away all sins accumulated over a lifetime. For many devotees, it is the journey they have prepared for since childhood.” — Sunita Rawat\n\n## Best Time to Go\n\nThe shrines open in late April or early May (exact dates follow the Hindu calendar, announced on Akshaya Tritiya) and close after Diwali. The sweet spot is early May and September–October: post-monsoon skies are clear, temperatures are moderate, and crowds are manageable.\n\n## Route and Duration\n\nA comprehensive circuit requires a minimum of 12–15 days from Delhi. The standard route: Delhi → Haridwar → Barkot (Yamunotri base) → Uttarkashi (Gangotri base) → Guptkashi/Sonprayag (Kedarnath base) → Joshimath/Badrinath → Rishikesh → Delhi.\n\n## Registration\n\nMandatory registration at registrationandtouristcare.uk.gov.in. Carry registration slip, government-issued ID, and a medical fitness certificate if over 55 years of age.",

  "himalayan-photography-tips":
    "## Light at Altitude\n\nAbove 3,500 metres, the atmosphere scatters less blue light. Dawn and dusk are shorter, sharper, and far more intense than at sea level. A six-minute window of alpenglow can illuminate an entire range in crimson — but it vanishes before most photographers have found their composition.\n\n> “Leave nothing to chance at altitude. Scout your position the evening before. Set three alarms. And accept that the mountain will decide whether you get the light.” — Arjun Mehta\n\n## Dynamic Range Challenges\n\nOn a clear day in the Himalaya, the difference between a sunlit snowfield and a shaded valley floor can exceed 14 stops. Use graduated ND filters for landscape work, or bracket and blend in post. RAW is non-negotiable.\n\n## Shooting at Sacred Sites\n\nTemple authorities at Kedarnath, Badrinath, and Hemkund Sahib permit photography in most public areas but prohibit tripods inside the sanctum. Always ask permission before photographing pilgrims. Many devotees are deeply uncomfortable with cameras, particularly during personal puja.\n\n## Gear That Survives the Mountains\n\nMonsoon trekking means your gear will be wet. Camera bags rated IPX4 or above, silica gel pouches in every compartment, and a reliable rain cover are not optional extras. Lens caps corrode in monsoon humidity; keep them dry.",

  "roopkund-trek-solo-guide":
    "## Roopkund: The Honest Assessment\n\nRoopkund is not a trek for the unprepared. At 5,029 metres, it sits above the death zone for anyone without adequate acclimatisation. Three trekkers died on its slopes in 2023 due to acute mountain sickness and poor weather management. That said, with proper preparation, it is achievable without a guide.\n\n> “I have led forty-seven Roopkund expeditions. I have never sent anyone to the summit without first refusing them when they arrived unprepared. The mountain is non-negotiable.” — Vikram Nair, Senior Trek Leader\n\n## Permits\n\nForest permit required (\u20b9600 per person) from the Nanda Devi Biosphere Reserve office at Lohajung. Carry three passport photographs, a government ID, and the permit at all times on trail.\n\n## Acclimatisation Schedule\n\nDo not attempt Roopkund without a minimum of two full acclimatisation days. The recommended schedule: Day 1 Lohajung (2,350 m), Day 2 Didna (2,800 m) acclimatise, Day 3 Ali Bugyal (3,350 m), Day 4 Bedni Bugyal (3,450 m) rest, Day 5 Patar Nauchni (3,680 m), Day 6 Bhagwabasa (4,100 m), Day 7 Roopkund (5,029 m) and back to Bhagwabasa, Day 8 Bedni, Day 9 Lohajung.\n\n## The Lake Itself\n\nRoopkund holds a mystery: the skeletons of roughly 800 individuals, dated to the 9th century CE. Modern DNA analysis (2019, Nature Communications) identified three distinct ancestral groups, suggesting a catastrophic hailstorm struck multiple pilgrimage parties simultaneously.",
};

const FALLBACK_CONTENT = [
  "## Setting the Scene",
  "The Himalayas have always drawn those who seek something beyond the ordinary — whether it is the physical challenge of altitude, the spiritual pull of a jyotirlinga, or simply the silence that sits above 3,000 metres where the sky feels close enough to touch.",
  '> "The mountains teach patience. Every trail, every weather window, every step above 4,000 metres is a lesson in accepting what you cannot control." — TrekRoots Team',
  "## The Journey Begins",
  "No Himalayan journey starts at the trailhead. It begins weeks earlier, with permits gathered, fitness built, and gear tested. The preparation is itself a form of devotion — an acknowledgement that the mountains deserve respect.",
  "## On the Trail",
  "Each day on a Himalayan trek or yatra unfolds with a rhythm that city life rarely allows: rise before dawn, cover ground in the cool morning air, rest during the intense afternoon sun, and arrive at camp with enough light to watch the alpenglow paint the peaks.",
  "## Coming Home",
  "Every journey into the Himalaya changes you in ways that are difficult to articulate. You return to the plains with different eyes — more patient, more grateful, more aware of how small and how vast the world truly is.",
].join("\n\n");

const MOCK_POSTS: Omit<BlogPost, "content">[] = [
  {
    id: 1,
    title: "Valley of Flowers: The Ultimate Photography Guide",
    readTimeMin: 8,
    readTime: 8,
    slug: "valley-of-flowers-photo-guide",
    authorName: "Arjun Mehta",
    publishedAt: new Date("2025-07-15").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    excerpt:
      "Discover the finest vantage points, golden-hour windows, and lens choices for capturing the riot of colours that bloom each monsoon in this UNESCO World Heritage valley.",
    category: "Photography",
  },
  {
    id: 2,
    title: "Kedarnath Yatra 2025: The Complete Pilgrim's Handbook",
    readTimeMin: 12,
    readTime: 12,
    slug: "kedarnath-yatra-complete-guide",
    authorName: "Priya Sharma",
    publishedAt: new Date("2025-06-01").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    excerpt:
      "From Gaurikund to the sacred Jyotirlinga — everything a first-time devotee needs to plan a safe, spiritually enriching Kedarnath Yatra.",
    category: "Yatras",
  },
  {
    id: 3,
    title: "10 Best Treks in Uttarakhand for Every Level",
    readTimeMin: 10,
    readTime: 10,
    slug: "best-treks-uttarakhand",
    authorName: "Vikram Nair",
    publishedAt: new Date("2025-05-20").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    excerpt:
      "From the beginner-friendly meadows of Chopta to the technical ridges of Roopkund, we rank the finest trails across Garhwal and Kumaon.",
    category: "Treks",
  },
  {
    id: 4,
    title: "Char Dham Yatra: Planning Your Sacred Circuit in 2025",
    readTimeMin: 14,
    readTime: 14,
    slug: "char-dham-yatra-planning",
    authorName: "Sunita Rawat",
    publishedAt: new Date("2025-04-10").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1598977052854-f09a61d8b671?w=1200&q=80",
    excerpt:
      "An authoritative guide to covering Yamunotri, Gangotri, Kedarnath, and Badrinath in a single journey.",
    category: "Yatras",
  },
  {
    id: 5,
    title: "Himalayan Photography: Light, Composition & Ethics",
    readTimeMin: 9,
    readTime: 9,
    slug: "himalayan-photography-tips",
    authorName: "Arjun Mehta",
    publishedAt: new Date("2025-03-28").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    excerpt:
      "Professional field notes on shooting at altitude — managing dynamic range above 4,000 m and respecting local customs at sacred sites.",
    category: "Photography",
  },
  {
    id: 6,
    title: "Roopkund Trek Solo Guide: Is It Possible?",
    readTimeMin: 11,
    readTime: 11,
    slug: "roopkund-trek-solo-guide",
    authorName: "Vikram Nair",
    publishedAt: new Date("2025-02-14").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&q=80",
    excerpt:
      "The Skeleton Lake trek demands respect. Permits, porter logistics, acclimatisation schedules, and the honest risk assessment every solo trekker must read.",
    category: "Treks",
  },
];

const AUTHOR_BIOS: Record<string, string> = {
  "Arjun Mehta":
    "Senior trek photographer and expedition leader with over 200 Himalayan days. Arjun has contributed to National Geographic India and leads TrekRoots's high-altitude photography workshops.",
  "Priya Sharma":
    "Yatra specialist and cultural writer. Priya has completed the Char Dham circuit fourteen times and writes authoritatively on the spiritual geography of the Uttarakhand Himalayas.",
  "Vikram Nair":
    "Lead trek guide and author of the TrekRoots field manuals. Vikram has summited Kedarkantha, Roopkund, and Brahmatal collectively over forty times.",
  "Sunita Rawat":
    "Born in Uttarkashi, Sunita brings deep insider knowledge of Garhwal's pilgrimage routes. She is TrekRoots's resident Char Dham Yatra advisor.",
};

function formatDate(ts: number): string {
  try {
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    Photography: "bg-amber-50 text-amber-700 border-amber-200",
    Treks: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Yatras: "bg-orange-50 text-orange-700 border-orange-200",
    Culture: "bg-purple-50 text-purple-700 border-purple-200",
    Packages: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const cls =
    colorMap[category] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-body font-semibold uppercase tracking-wider rounded-full border ${cls}`}
    >
      {category}
    </span>
  );
}

// Parse markdown-ish content into JSX
function ArticleBody({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-5">
      {paragraphs.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              // biome-ignore lint/suspicious/noArrayIndexKey: stable render order
              key={i}
              className="font-display text-2xl md:text-3xl font-bold mt-8 mb-2"
              style={{ color: "var(--color-black-bean)" }}
            >
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <blockquote
              // biome-ignore lint/suspicious/noArrayIndexKey: static parsed content
              key={i}
              className="border-l-4 pl-6 py-2 my-6 font-display text-xl italic leading-relaxed"
              style={{
                borderColor: "var(--color-mahogany)",
                color: "var(--color-mahogany)",
              }}
            >
              {block.slice(2)}
            </blockquote>
          );
        }
        return (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: static parsed content
            key={i}
            className="font-body text-base leading-[1.85] text-foreground/90"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2" data-ocid="blog.share_buttons">
      <span className="text-xs font-body text-muted-foreground uppercase tracking-wider mr-1">
        Share:
      </span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="blog.share.whatsapp"
        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        style={{ background: "#25D366", color: "#fff" }}
        aria-label="Share on WhatsApp"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="sr-only">Share on WhatsApp</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="blog.share.twitter"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/70 transition-colors"
        aria-label="Share on X"
      >
        <Twitter size={13} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="blog.share.facebook"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/70 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={13} />
      </a>
      <button
        type="button"
        data-ocid="blog.share.copy_link"
        onClick={copyLink}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/70 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Link2 size={13} className="text-green-600" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}

function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n\n")
    .filter((b) => b.startsWith("## "))
    .map((b) => b.slice(3));
  if (headings.length === 0) return null;
  return (
    <nav
      className="hidden lg:block sticky top-28 p-5 rounded-xl border border-border bg-card"
      data-ocid="blog.toc"
    >
      <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        In This Article
      </p>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable static content
          <li key={i}>
            <span className="font-body text-sm leading-snug text-foreground/70 hover:text-foreground cursor-default block">
              {h}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const backendPost = getBlogPostBySlug(slug);
  const isLoading = false;
  const allBackendPosts = getAllBlogPosts();

  // Resolve current post: backend first, then mock
  const post: BlogPost | null = useMemo(() => {
    if (backendPost) return backendPost;
    const mock = MOCK_POSTS.find((p) => p.slug === slug);
    if (!mock) return null;
    return { ...mock, content: MOCK_CONTENT[slug] ?? FALLBACK_CONTENT };
  }, [backendPost, slug]);

  // Related posts: 3 posts with same category, excluding current
  const relatedPosts = useMemo(() => {
    const backendSlugs = new Set(allBackendPosts.map((p) => p.slug));
    const allMocks = MOCK_POSTS.filter((p) => !backendSlugs.has(p.slug));
    const pool = [
      ...allBackendPosts.map((p) => ({ ...p })),
      ...allMocks.map((p) => ({
        ...p,
        content: MOCK_CONTENT[p.slug] ?? FALLBACK_CONTENT,
      })),
    ];
    return pool
      .filter((p) => p.slug !== slug && p.category === (post?.category ?? ""))
      .slice(0, 3);
  }, [allBackendPosts, slug, post]);

  const catalogLinks = useMemo(
    () => (post ? catalogLinksForBlog(post) : { treks: [], yatras: [] }),
    [post],
  );
  const readTimeNum = post ? Number(post.readTimeMin || post.readTime) : 0;
  const articleContent = post?.content?.trim()
    ? post.content
    : (MOCK_CONTENT[slug] ?? FALLBACK_CONTENT);
  const authorBio = post
    ? (AUTHOR_BIOS[post.authorName ?? ""] ??
      `${post.authorName ?? "Author"} is a travel writer and guide at TrekRoots.`)
    : "";

  if (isLoading && !post) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-display text-3xl text-foreground mb-4">
          Story not found
        </p>
        <Link href="/blog">
          <Button type="button" variant="outline" className="font-body">
            <ArrowLeft size={14} className="mr-2" /> Back to Journal
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-4 pb-2 max-w-4xl">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
      </div>
      {/* Hero */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden">
        <CloudinaryImage
          src={post.imageUrl}
          alt={post.title}
          width={1600}
          height={900}
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
          transform={{
            width: 1600,
            height: 900,
            crop: "fill",
            quality: "auto:good",
            format: "auto",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-3">
              <CategoryBadge category={post.category} />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white mb-4 max-w-3xl">
              {post.title}
            </h1>
            <div
              className="flex flex-wrap items-center gap-5 text-sm font-body"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.authorName}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {readTimeNum} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb + Share (desktop top bar) */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 max-w-5xl py-3 flex items-center justify-between gap-4">
          <nav
            className="flex items-center gap-2 text-xs font-body text-muted-foreground"
            data-ocid="blog.breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              The Journal
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1 max-w-[200px]">
              {post.title}
            </span>
          </nav>
          <div className="hidden md:block">
            <ShareButtons title={post.title} />
          </div>
        </div>
      </div>

      {/* Article Layout */}
      <div className="container mx-auto px-4 max-w-5xl py-10 md:py-14">
        <div className="flex gap-10">
          {/* Sidebar TOC */}
          <aside className="w-56 shrink-0">
            <TableOfContents content={articleContent} />
          </aside>

          {/* Article Body */}
          <article className="flex-1 min-w-0">
            {/* Lead / excerpt */}
            <p
              className="font-body text-lg leading-relaxed mb-8 pb-8 border-b border-border"
              style={{ color: "var(--color-black-bean)" }}
            >
              {post.excerpt}
            </p>

            <ArticleBody content={articleContent} />

            {/* Tags */}
            <div
              className="mt-10 pt-8 border-t border-border flex flex-wrap items-center gap-2"
              data-ocid="blog.tags"
            >
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider mr-2">
                Tags:
              </span>
              {[post.category, "Uttarakhand", "Himalaya", "India Travel"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-muted text-muted-foreground font-body text-xs"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            {/* Mobile Share */}
            <div className="mt-6 md:hidden">
              <ShareButtons title={post.title} />
            </div>

            {/* Author Bio */}
            {(catalogLinks.treks.length > 0 || catalogLinks.yatras.length > 0) && (
              <aside
                className="mt-10 p-5 rounded-2xl border border-border bg-muted/30"
                data-ocid="blog.catalog_links"
              >
                <h2 className="font-display text-lg font-bold mb-3 text-foreground">
                  Plan this trip with TrekRoots
                </h2>
                <ul className="space-y-2">
                  {catalogLinks.treks.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/treks/${t.slug}`}
                        className="font-body text-sm font-medium underline underline-offset-2"
                      >
                        {t.name}
                      </Link>
                      <span className="font-body text-xs text-muted-foreground">
                        {" "}
                        — {t.durationDays} days · {t.difficulty}
                      </span>
                    </li>
                  ))}
                  {catalogLinks.yatras.map((y) => (
                    <li key={y.slug}>
                      <Link
                        href={`/yatra/${y.slug}`}
                        className="font-body text-sm font-medium underline underline-offset-2"
                      >
                        {y.name}
                      </Link>
                      <span className="font-body text-xs text-muted-foreground">
                        {" "}
                        — {y.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div
              className="mt-10 p-6 rounded-2xl border border-border bg-card flex gap-4"
              data-ocid="blog.author_bio"
            >
              <div
                className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-display text-xl font-bold"
                style={{ background: "var(--color-mahogany)" }}
              >
                {(post.authorName ?? "T").charAt(0)}
              </div>
              <div>
                <p
                  className="font-display text-lg font-bold mb-1"
                  style={{ color: "var(--color-black-bean)" }}
                >
                  {post.authorName}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {authorBio}
                </p>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link href="/blog" data-ocid="blog.back_link">
                <Button
                  type="button"
                  variant="outline"
                  className="font-body gap-2"
                >
                  <ArrowLeft size={14} /> Back to The Journal
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section
          className="border-t border-border"
          style={{ background: "var(--bg-secondary, #F5F5F5)" }}
        >
          <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] mb-2"
              style={{ color: "var(--color-mahogany)" }}
            >
              Continue Reading
            </p>
            <h2
              className="font-display text-3xl font-bold mb-8"
              style={{ color: "var(--color-black-bean)" }}
            >
              Related Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <Link
                  key={String(rp.id)}
                  href={`/blog/${rp.slug }`}
                  data-ocid={`blog.related.item.${i + 1}`}
                  className="group block rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <CloudinaryImage
                      src={rp.imageUrl}
                      alt={rp.title}
                      width={640}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      transform={{
                        width: 640,
                        height: 400,
                        crop: "fill",
                        quality: "auto:eco",
                        format: "auto",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <CategoryBadge category={rp.category} />
                    </div>
                    <h3
                      className="font-display text-lg font-bold leading-snug line-clamp-2 group-hover:opacity-75 transition-opacity"
                      style={{ color: "var(--color-black-bean)" }}
                    >
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs font-body text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {rp.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {Number(rp.readTimeMin || rp.readTime)} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
