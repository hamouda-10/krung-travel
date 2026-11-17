import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  Film,
  Globe,
  Heart,
  MapPin,
  Menu,
  Minus,
  Plus,
  Send,
  Ship,
  Star,
  User,
  Users,
  Wifi,
  Wine,
  X,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Types & Exact Data
// -----------------------------------------------------------------------------

interface HeroSlide {
  id: number;
  photo: string;
  photoPos: string;
  titleLines: string[];
  titleClass: string;
  captionTitle: string;
  captionDesc: string;
}

interface RailThumb {
  id: number;
  slideIndex: number;
  label: string;
  image: string;
}

interface StayProperty {
  id: number;
  name: string;
  area: string;
  price: number;
  priceFormatted: string;
  photo700: string;
  photo1400: string;
  rating: string;
}

const CLOUD_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_6590354a-216c-40a2-9f84-93abe97dc7b1.png&w=2400&q=85';

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    photo:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005348_d02f5076-330a-4062-960b-b000a310d6e4.png&w=2400&q=85',
    photoPos: 'center 62%',
    titleLines: ['WELCOME TO BANGKOK'],
    titleClass: 'hero-title-1',
    captionTitle: 'Discover Bangkok',
    captionDesc:
      "Discover Bangkok's best places to stay and visit. Find suitable ones for you and your family",
  },
  {
    id: 1,
    photo:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_2a7781a6-ffd1-48f1-bb19-051b67063047.png&w=2400&q=85',
    photoPos: 'center 55%',
    titleLines: ['FIND PLACE TO STAY'],
    titleClass: 'hero-title-2',
    captionTitle: 'Places to stay',
    captionDesc:
      'Riverside teak houses, sky-high suites and quiet garden villas picked for you',
  },
  {
    id: 2,
    photo:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_73725010-6ca6-46d8-a732-fc33275a02e0.png&w=2400&q=85',
    photoPos: 'center 40%',
    titleLines: ['EXPLORE', 'BANGKOK'],
    titleClass: 'hero-title-3',
    captionTitle: 'Places to go',
    captionDesc: "Explore through the eyes of Bangkok's best Thai adventures",
  },
];

// Order top-to-bottom in the rail:
// Top -> tuk-tuk (lit on slide 3, index 2)
// Middle -> floating market (lit on slide 2, index 1)
// Bottom -> Wat Arun (lit on slide 1, index 0)
const RAIL_THUMBS: RailThumb[] = [
  {
    id: 0,
    slideIndex: 2,
    label: 'Tuk-tuk in Bangkok',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_2697af01-b81b-4c9e-bb4f-7200cb1aa1e8.png&w=400&q=85',
  },
  {
    id: 1,
    slideIndex: 1,
    label: 'Floating market',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_e2768ec3-714b-47bc-b03e-4fc6794d5dd9.png&w=400&q=85',
  },
  {
    id: 2,
    slideIndex: 0,
    label: 'Wat Arun with longtail boat',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_c5667173-fd6e-4dcb-9547-6c4518e19388.png&w=400&q=85',
  },
];

const STAYS: StayProperty[] = [
  {
    id: 1,
    name: 'Riverside Teak Villa',
    area: 'Khlong San, Bangkok',
    price: 1300,
    priceFormatted: '$1,300',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_d7535a9a-29c3-4714-9c2a-4b8934ed1df2.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_d7535a9a-29c3-4714-9c2a-4b8934ed1df2.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 2,
    name: 'Baan Suan Teak House',
    area: 'Thonburi, Bangkok',
    price: 1200,
    priceFormatted: '$1,200',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005405_6867b7fa-e6ec-4c5c-a810-aea29a94cce4.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005405_6867b7fa-e6ec-4c5c-a810-aea29a94cce4.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 3,
    name: 'Sathorn Sky Condo',
    area: 'Sathorn, Bangkok',
    price: 170,
    priceFormatted: '$170',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_78f07613-5823-4ef1-94a9-cbf8977e5c38.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_78f07613-5823-4ef1-94a9-cbf8977e5c38.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 4,
    name: 'Velvet Night Suite',
    area: 'Silom, Bangkok',
    price: 120,
    priceFormatted: '$120',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_816e6775-3733-4270-8e1f-bbf270fe3fff.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_816e6775-3733-4270-8e1f-bbf270fe3fff.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 5,
    name: 'Lantern Deck House',
    area: 'Bang Rak, Bangkok',
    price: 70,
    priceFormatted: '$70',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_bf9bfa74-cb9c-4055-a632-b725670fdc9d.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_bf9bfa74-cb9c-4055-a632-b725670fdc9d.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 6,
    name: 'Skyline Pool Cabana',
    area: 'Sukhumvit, Bangkok',
    price: 105,
    priceFormatted: '$105',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005413_84e12590-d5b2-4676-9600-c31c6cd0b0f4.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005413_84e12590-d5b2-4676-9600-c31c6cd0b0f4.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 7,
    name: 'Grand River Residence',
    area: 'Charoen Krung, Bangkok',
    price: 1300,
    priceFormatted: '$1,300',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005414_da006178-018e-4ed8-b340-f6a70f18f1bc.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005414_da006178-018e-4ed8-b340-f6a70f18f1bc.png&w=1400&q=85',
    rating: '4,8',
  },
  {
    id: 8,
    name: 'Palm Court Resort',
    area: 'Bang Na, Bangkok',
    price: 1200,
    priceFormatted: '$1,200',
    photo700:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005417_3c7632ad-341c-4e40-b370-db3c3aaf479e.png&w=700&q=85',
    photo1400:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005417_3c7632ad-341c-4e40-b370-db3c3aaf479e.png&w=1400&q=85',
    rating: '4,8',
  },
];

const INTERIOR_THUMBS = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005420_531ca3bc-da2a-48a8-9506-30b46f6725a5.png&w=500&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005422_3d48e291-6d44-46fa-a18e-ab2f7c791839.png&w=500&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005426_0b8053b2-b0af-4629-85b1-5800d8f100d0.png&w=500&q=85',
];

const AVATARS = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_2bc44540-0fec-4b94-9f47-722c00c851dd.png&w=120&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_fee8e948-a5dc-4e86-9ecc-dc8dbce6b660.png&w=120&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_ce259660-2765-42ee-a5b0-3afee70b11aa.png&w=120&q=85',
];

const BANGKOK_AREAS = [
  'All Bangkok',
  'Khlong San',
  'Thonburi',
  'Sathorn',
  'Silom',
  'Bang Rak',
  'Sukhumvit',
  'Charoen Krung',
  'Bang Na',
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatShortDate(d: Date): string {
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function formatFullDate(d: Date): string {
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayTimestamp(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

// -----------------------------------------------------------------------------
// Custom Cursor Component
// -----------------------------------------------------------------------------

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isRec = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('rec');
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest(
        'a, button, [role="button"], input, select, [data-clickable="true"]',
      );
      setHovering(Boolean(clickable));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  const classes = [
    'krung-cursor',
    isRec ? 'is-rec' : '',
    hovering ? 'is-hover' : '',
    pressed ? 'is-pressed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={classes}
      style={{
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Stay Card Component (reused in Recommended & Similar sections)
// -----------------------------------------------------------------------------

interface StayCardProps {
  stay: StayProperty;
  index: number;
  liked: boolean;
  onToggleLike: (id: number) => void;
  onOpen: (stay: StayProperty, imgEl: HTMLImageElement | null) => void;
  immediate?: boolean;
}

function StayCard({
  stay,
  index,
  liked,
  onToggleLike,
  onOpen,
  immediate = false,
}: StayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [revealed, setRevealed] = useState(immediate);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (immediate) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate]);

  const colDelay = (index % 4) * 90;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike(stay.id);
    setPopping(false);
    requestAnimationFrame(() => setPopping(true));
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      data-clickable="true"
      onClick={() => onOpen(stay, imgRef.current)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(stay, imgRef.current);
        }
      }}
      className="group relative w-full overflow-hidden text-left focus:outline-none"
      style={{
        aspectRatio: '203 / 268',
        borderRadius: '12px',
        boxShadow: '0 12px 30px rgba(110,60,50,0.16)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${colDelay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${colDelay}ms, box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)`,
      }}
      onMouseEnter={(e) => {
        if (revealed) {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 22px 46px rgba(95,48,40,0.24)';
        }
      }}
      onMouseLeave={(e) => {
        if (revealed) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(110,60,50,0.16)';
        }
      }}
    >
      <img
        ref={imgRef}
        src={stay.photo700}
        alt={`${stay.name} in ${stay.area}`}
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
      />

      {/* Bottom darkening gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,14,16,0.02) 38%, rgba(20,14,16,0.32) 66%, rgba(16,11,13,0.78) 100%)',
        }}
      />

      {/* Top-left price pill */}
      <div
        className="absolute top-3 left-3 flex items-baseline px-2.5 py-1 text-[#1d1a1c]"
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '6px',
          fontSize: '11.5px',
          fontWeight: 600,
        }}
      >
        <span className="tabular-nums">{stay.priceFormatted}</span>
        <span className="font-normal text-[#1d1a1c]/60">/night</span>
      </div>

      {/* Top-right 30px white heart button */}
      <button
        type="button"
        aria-label={liked ? `Remove ${stay.name} from saved` : `Save ${stay.name}`}
        onClick={handleHeartClick}
        className={`absolute top-3 right-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:scale-105 ${
          popping ? 'heart-pop' : ''
        }`}
        onAnimationEnd={() => setPopping(false)}
      >
        <Heart
          size={15}
          strokeWidth={1.9}
          className={liked ? 'fill-[#ff4d5e] text-[#ff4d5e]' : 'text-[#1d1a1c]'}
        />
      </button>

      {/* Bottom-left metadata */}
      <div className="absolute right-3.5 bottom-3.5 left-3.5 text-white">
        <div
          className="truncate font-semibold leading-tight tracking-[-0.01em]"
          style={{ fontSize: '15.5px' }}
        >
          {stay.name}
        </div>
        <div className="mt-1 flex items-center gap-1 text-[12px] text-white/85">
          <MapPin size={11.5} strokeWidth={1.8} className="shrink-0" />
          <span className="truncate">{stay.area}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((starIdx) => (
              <Star
                key={starIdx}
                size={11}
                className="fill-[#f7c325] text-[#f7c325]"
              />
            ))}
          </div>
          <span className="text-[11.5px] font-medium text-white/95 tabular-nums">
            {stay.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main App
// -----------------------------------------------------------------------------

export default function App() {
  // Viewport & scroll state
  const [vw, setVw] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440,
  );
  const [vh, setVh] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900,
  );
  const [navSolid, setNavSolid] = useState(false);

  // Intro state
  const [introTitlesReady, setIntroTitlesReady] = useState(false);
  const [introThumbsReady, setIntroThumbsReady] = useState(false);
  const [introSearchReady, setIntroSearchReady] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);

  // Hero slider & wipe state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState<{
    from: number;
    to: number;
    progress: number; // eased 0..1
    rawProgress: number; // linear 0..1
  } | null>(null);
  const transitionRafRef = useRef<number | null>(null);
  const slideStartTimeRef = useRef<number>(
    typeof performance !== 'undefined' ? performance.now() : 0,
  );
  const captionTimerRef = useRef<number | null>(null);

  // Refs for scroll choreography & Ken Burns + pointer parallax (60fps, zero React re-renders)
  const slideStackRef = useRef<HTMLDivElement>(null);
  const bottomCloudRef = useRef<HTMLDivElement>(null);
  const topCloudRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const slidePhotoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });

  // Search bar state
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const [raisedField, setRaisedField] = useState<
    'destination' | 'checkin' | 'checkout' | 'visitors'
  >('checkin');
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<
    'destination' | 'calendar' | 'visitors' | null
  >(null);
  const [selectedArea, setSelectedArea] = useState<string>('Bangkok');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState<{ year: number; month: number }>({
    year: 2026,
    month: 11, // December 2026 (0-indexed)
  });
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  // Nav UI popovers
  const [visitorTypeOpen, setVisitorTypeOpen] = useState(false);
  const [visitorMode, setVisitorMode] = useState('Visitors');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currencyLabel, setCurrencyLabel] = useState('USD ($)');
  const [hostNotice, setHostNotice] = useState(false);

  // Stays section state
  const [likedIds, setLikedIds] = useState<number[]>([2]);
  const [showAllFiltered, setShowAllFiltered] = useState(false);

  // Detail page + shared-element flight state
  const [detailStay, setDetailStay] = useState<StayProperty | null>(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [detailFlightActive, setDetailFlightActive] = useState(false);
  const [detailMainVisible, setDetailMainVisible] = useState(false);
  const [detailBlocksVisible, setDetailBlocksVisible] = useState(false);
  const [detailCheckIn, setDetailCheckIn] = useState<Date>(
    new Date(2026, 11, 22),
  );
  const [detailCheckOut, setDetailCheckOut] = useState<Date>(
    new Date(2026, 11, 27),
  );
  const [detailGuests, setDetailGuests] = useState<number>(2);
  const [booked, setBooked] = useState(false);
  const [userRated, setUserRated] = useState<number | null>(null);
  const [activeInteriorIdx, setActiveInteriorIdx] = useState<number | null>(null);

  const detailScrollRef = useRef<HTMLDivElement>(null);
  const detailMainPhotoRef = useRef<HTMLDivElement>(null);
  const flyingCloneRef = useRef<HTMLImageElement | null>(null);

  // ---------------------------------------------------------------------------
  // Resize & Intro Orchestration
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => setIntroTitlesReady(true), 250);
    const t2 = window.setTimeout(() => setIntroThumbsReady(true), 350);
    const t3 = window.setTimeout(() => setIntroSearchReady(true), 380);
    const t4 = window.setTimeout(() => setCaptionVisible(true), 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Scroll Choreography + Navbar Solid Threshold
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      rafId = null;
      const sy = window.scrollY;
      const curVh = window.innerHeight || 900;

      setNavSolid(sy > curVh * 0.3);

      if (slideStackRef.current) {
        slideStackRef.current.style.transform = `translate3d(0, ${0.42 * sy}px, 0)`;
      }
      if (bottomCloudRef.current) {
        const cloudScale = 1 + (0.35 * sy) / curVh;
        bottomCloudRef.current.style.transform = `translate3d(0, ${-0.38 * sy}px, 0) scale(${cloudScale})`;
      }
      if (topCloudRef.current) {
        const topOp = clamp(sy / (0.45 * curVh), 0, 1);
        topCloudRef.current.style.opacity = String(topOp);
        topCloudRef.current.style.transform = `translate3d(0, ${-0.24 * sy}px, 0)`;
      }
      if (railRef.current) {
        const railOp = clamp(1 - sy / (0.5 * curVh), 0, 1);
        railRef.current.style.transform = `translate3d(0, ${0.2 * sy}px, 0)`;
        railRef.current.style.opacity = String(railOp);
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Pointer Parallax + Ken Burns Loop for Live Hero Photo
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const onPointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / (window.innerWidth || 1) - 0.5) * 2; // -1..1
      const ny = (e.clientY / (window.innerHeight || 1) - 0.5) * 2; // -1..1
      pointerTargetRef.current = { x: -nx * 0.6, y: -ny * 0.5 };
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    let kbRaf: number;
    const tick = (now: number) => {
      // Smooth lerp pointer parallax
      pointerCurrentRef.current.x +=
        (pointerTargetRef.current.x - pointerCurrentRef.current.x) * 0.06;
      pointerCurrentRef.current.y +=
        (pointerTargetRef.current.y - pointerCurrentRef.current.y) * 0.06;

      if (!transition) {
        const activePhotoEl = slidePhotoRefs.current[currentSlide];
        if (activePhotoEl) {
          const elapsedSec = Math.max(0, (now - slideStartTimeRef.current) / 1000);
          const kbScale = 1.04 + Math.min(elapsedSec, 12) * 0.0035;
          activePhotoEl.style.transform = `translate3d(${pointerCurrentRef.current.x.toFixed(
            3,
          )}%, ${pointerCurrentRef.current.y.toFixed(3)}%, 0) scale(${kbScale.toFixed(5)})`;
        }
      }
      kbRaf = requestAnimationFrame(tick);
    };
    kbRaf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(kbRaf);
    };
  }, [currentSlide, transition]);

  // ---------------------------------------------------------------------------
  // Slide Wipe Transition (1.25s easeInOutCubic via requestAnimationFrame)
  // ---------------------------------------------------------------------------

  const startSlideWipe = useCallback(
    (targetIdx: number) => {
      if (targetIdx === currentSlide && !transition) return;
      const fromIdx = transition ? transition.to : currentSlide;
      if (targetIdx === fromIdx) return;

      if (transitionRafRef.current) {
        cancelAnimationFrame(transitionRafRef.current);
      }
      if (captionTimerRef.current) {
        window.clearTimeout(captionTimerRef.current);
      }

      // Hide connector and caption immediately when wipe starts
      setCaptionVisible(false);
      captionTimerRef.current = window.setTimeout(() => {
        setCaptionVisible(true);
      }, 650);

      const duration = 1250;
      const startTime = performance.now();

      const step = (now: number) => {
        const raw = clamp((now - startTime) / duration, 0, 1);
        const eased = easeInOutCubic(raw);

        setTransition({
          from: fromIdx,
          to: targetIdx,
          progress: eased,
          rawProgress: raw,
        });

        // Update incoming & outgoing photo transforms smoothly during wipe
        const fromEl = slidePhotoRefs.current[fromIdx];
        const toEl = slidePhotoRefs.current[targetIdx];
        if (fromEl) {
          const outScale = 1.04 + eased * 0.05; // 1.04 -> 1.09
          const outX = -2 * eased; // 0 -> -2%
          fromEl.style.transform = `translate3d(${outX}%, 0, 0) scale(${outScale})`;
        }
        if (toEl) {
          const inScale = 1.12 - eased * 0.08; // 1.12 -> 1.04
          const inX = 2 * (1 - eased); // +2% -> 0
          toEl.style.transform = `translate3d(${inX}%, 0, 0) scale(${inScale})`;
        }

        if (raw < 1) {
          transitionRafRef.current = requestAnimationFrame(step);
        } else {
          transitionRafRef.current = null;
          slideStartTimeRef.current = performance.now();
          setCurrentSlide(targetIdx);
          setTransition(null);
        }
      };

      transitionRafRef.current = requestAnimationFrame(step);
    },
    [currentSlide, transition],
  );

  // Auto-advance every 5.2s
  useEffect(() => {
    if (detailStay) return;
    const timer = window.setInterval(() => {
      if (!transition) {
        startSlideWipe((currentSlide + 1) % HERO_SLIDES.length);
      }
    }, 5200);
    return () => window.clearInterval(timer);
  }, [currentSlide, transition, detailStay, startSlideWipe]);

  // ---------------------------------------------------------------------------
  // Close Search Popovers on Outside Click
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchWrapRef.current && !searchWrapRef.current.contains(target)) {
        setOpenPopover(null);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  // ---------------------------------------------------------------------------
  // Rail Geometry Calculations
  // ---------------------------------------------------------------------------

  const heroHeight = Math.max(vh, 680);
  const activeThumbSize = clamp(0.113 * vw, 96, 190);
  const inactiveThumbSize = clamp(0.054 * vw, 46, 92);
  const railGap = Math.max(8, 0.009 * vw);
  const railStartY = 74 + 0.085 * heroHeight;
  const railCenterX = 0.855 * vw;

  const activeSlideIndex = transition ? transition.to : currentSlide;

  // Compute y and size for all 3 rail items
  const railLayout = useMemo(() => {
    let curY = railStartY;
    return RAIL_THUMBS.map((thumb) => {
      const isLit = thumb.slideIndex === activeSlideIndex;
      const size = isLit ? activeThumbSize : inactiveThumbSize;
      const y = curY;
      const x = railCenterX - size / 2;
      curY += size + railGap;
      return { thumb, isLit, size, x, y, cy: y + size / 2 };
    });
  }, [railStartY, activeSlideIndex, activeThumbSize, inactiveThumbSize, railGap, railCenterX]);

  const activeRailItem = railLayout.find((r) => r.isLit) || railLayout[2];
  const innerRingRadius = activeThumbSize / 2 + 0.05 * vw;
  const outerRingRadius = activeThumbSize / 2 + 0.108 * vw;
  const connectorLength = Math.max(40, 0.047 * vw);
  const connectorRight = railCenterX - activeThumbSize / 2 - 0.008 * vw;
  const connectorLeft = connectorRight - connectorLength;
  const captionRightEdge = vw - (connectorLeft - Math.max(16, 0.015 * vw));
  const verticalBarHeight = Math.max(84, 0.065 * vw);

  // ---------------------------------------------------------------------------
  // Calendar Helper & Date Selection
  // ---------------------------------------------------------------------------

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(calMonth.year, calMonth.month, 1);
    // Monday first: Mon=0 .. Sun=6
    const startWeekday = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(calMonth.year, calMonth.month, d));
    }
    return cells;
  }, [calMonth]);

  const handleCalendarDayClick = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
      setRaisedField('checkout');
    } else {
      const tIn = dayTimestamp(checkInDate);
      const tCur = dayTimestamp(date);
      if (tCur <= tIn) {
        return; // Disabled days before/on check-in
      }
      setCheckOutDate(date);
      setRaisedField('visitors');
      window.setTimeout(() => {
        setOpenPopover('visitors');
      }, 120);
    }
  };

  const totalGuests = adults + childrenCount;

  // ---------------------------------------------------------------------------
  // Filtered / Visible Stays
  // ---------------------------------------------------------------------------

  const visibleStays = useMemo(() => {
    if (selectedArea === 'Bangkok' || selectedArea === 'All Bangkok' || showAllFiltered) {
      return STAYS;
    }
    const matches = STAYS.filter((s) =>
      s.area.toLowerCase().includes(selectedArea.toLowerCase()),
    );
    return matches.length > 0 ? matches : STAYS;
  }, [selectedArea, showAllFiltered]);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  // ---------------------------------------------------------------------------
  // Shared-Element Flight: Card -> Detail Page
  // ---------------------------------------------------------------------------

  const handleOpenDetail = useCallback(
    (stay: StayProperty, sourceImgEl: HTMLImageElement | null) => {
      // Remove any existing clone
      if (flyingCloneRef.current) {
        flyingCloneRef.current.remove();
        flyingCloneRef.current = null;
      }

      const startRect = sourceImgEl?.getBoundingClientRect() ?? null;

      // Sync detail booking defaults from hero search if chosen, else Dec 22 & Dec 27, 2026
      setDetailCheckIn(checkInDate ?? new Date(2026, 11, 22));
      setDetailCheckOut(checkOutDate ?? new Date(2026, 11, 27));
      setDetailGuests(totalGuests > 0 ? totalGuests : 2);
      setBooked(false);
      setUserRated(null);
      setActiveInteriorIdx(null);
      setDetailClosing(false);
      setDetailStay(stay);
      setDetailMainVisible(false);
      setDetailBlocksVisible(false);

      if (detailScrollRef.current) {
        detailScrollRef.current.scrollTop = 0;
      }

      // Stagger detail blocks 250ms after open
      window.setTimeout(() => {
        setDetailBlocksVisible(true);
      }, 250);

      if (!startRect) {
        setDetailMainVisible(true);
        return;
      }

      setDetailFlightActive(true);

      // Measure target photo rect on next frame after detail layout mounts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetBox = detailMainPhotoRef.current;
          if (!targetBox) {
            setDetailMainVisible(true);
            setDetailFlightActive(false);
            return;
          }
          const endRect = targetBox.getBoundingClientRect();

          const clone = document.createElement('img');
          clone.src = stay.photo700;
          clone.alt = '';
          clone.referrerPolicy = 'no-referrer';
          clone.style.position = 'fixed';
          clone.style.left = `${startRect.left}px`;
          clone.style.top = `${startRect.top}px`;
          clone.style.width = `${startRect.width}px`;
          clone.style.height = `${startRect.height}px`;
          clone.style.objectFit = 'cover';
          clone.style.borderRadius = '12px';
          clone.style.zIndex = '48';
          clone.style.pointerEvents = 'none';
          clone.style.boxShadow = '0 18px 46px rgba(60,30,30,0.22)';
          document.body.appendChild(clone);
          flyingCloneRef.current = clone;

          const flightDuration = 900;
          const flightStart = performance.now();

          const animateFlight = (now: number) => {
            const raw = clamp((now - flightStart) / flightDuration, 0, 1);
            const t = easeInOutCubic(raw);

            const curLeft = startRect.left + (endRect.left - startRect.left) * t;
            const curTop = startRect.top + (endRect.top - startRect.top) * t;
            const curW = startRect.width + (endRect.width - startRect.width) * t;
            const curH = startRect.height + (endRect.height - startRect.height) * t;
            const curRad = 12 + (10 - 12) * t;

            clone.style.left = `${curLeft}px`;
            clone.style.top = `${curTop}px`;
            clone.style.width = `${curW}px`;
            clone.style.height = `${curH}px`;
            clone.style.borderRadius = `${curRad}px`;

            if (raw < 1) {
              requestAnimationFrame(animateFlight);
            } else {
              setDetailMainVisible(true);
              setDetailFlightActive(false);
              window.setTimeout(() => {
                clone.remove();
                if (flyingCloneRef.current === clone) {
                  flyingCloneRef.current = null;
                }
              }, 80);
            }
          };

          requestAnimationFrame(animateFlight);
        });
      });
    },
    [checkInDate, checkOutDate, totalGuests],
  );

  const handleCloseDetail = useCallback(() => {
    if (!detailStay) return;
    setDetailClosing(true);
    if (flyingCloneRef.current) {
      flyingCloneRef.current.remove();
      flyingCloneRef.current = null;
    }
    window.setTimeout(() => {
      setDetailStay(null);
      setDetailClosing(false);
      setDetailFlightActive(false);
      setDetailMainVisible(false);
      setDetailBlocksVisible(false);
    }, 480);
  }, [detailStay]);

  const scrollToStays = useCallback(() => {
    if (detailStay) {
      handleCloseDetail();
      window.setTimeout(() => {
        document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [detailStay, handleCloseDetail]);

  const scrollToHome = useCallback(() => {
    if (detailStay) {
      handleCloseDetail();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [detailStay, handleCloseDetail]);

  const similarStays = useMemo(() => {
    if (!detailStay) return [];
    return STAYS.filter((s) => s.id !== detailStay.id).slice(0, 4);
  }, [detailStay]);

  const isNavSolid = navSolid || Boolean(detailStay);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#1d1a1c]">
      <CustomCursor />

      {/* ------------------------------------------------------------------- */}
      {/* 3. Navigation Bar                                                   */}
      {/* ------------------------------------------------------------------- */}
      <header
        className="krung-pad-x fixed top-0 right-0 left-0 z-50 flex h-[74px] items-center justify-between transition-[background-color,color,border-color,backdrop-filter] duration-500"
        style={{
          backgroundColor: isNavSolid
            ? 'rgba(247,217,198,0.86)'
            : 'transparent',
          backdropFilter: isNavSolid ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: isNavSolid ? 'blur(14px)' : 'none',
          color: isNavSolid ? '#1d1a1c' : 'rgba(255,255,255,0.92)',
          borderBottom: isNavSolid
            ? '1px solid rgba(29,26,28,0.08)'
            : '1px solid rgba(255,255,255,0.28)',
        }}
      >
        {/* Left side: Logo, 1x42 divider, Visitors */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={scrollToHome}
            className="whitespace-nowrap font-light tracking-[-0.015em] transition-opacity hover:opacity-80"
            style={{ fontSize: '26px', fontWeight: 300 }}
          >
            Krung Travel
          </button>

          {/* Divider + Visitors hidden <= 640px */}
          <div className="hidden items-center sm:flex">
            <span
              aria-hidden="true"
              className="mx-[28px] inline-block h-[42px] w-[1px]"
              style={{ backgroundColor: 'currentColor', opacity: 0.45 }}
            />
            <div className="relative">
              <button
                type="button"
                onClick={() => setVisitorTypeOpen((v) => !v)}
                className="flex items-center gap-1.5 whitespace-nowrap font-medium tracking-[0.01em] transition-opacity hover:opacity-80"
                style={{ fontSize: '12.5px' }}
              >
                <span>{visitorMode}</span>
                <ChevronDown size={12} strokeWidth={1.8} />
              </button>

              {visitorTypeOpen && (
                <div
                  className="popover-drop absolute top-8 left-0 z-50 w-40 rounded-xl bg-white py-1.5 text-[#1d1a1c] shadow-[0_14px_36px_rgba(60,30,30,0.18)]"
                  onMouseLeave={() => setVisitorTypeOpen(false)}
                >
                  {['Visitors', 'Residents', 'Concierge'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setVisitorMode(mode);
                        setVisitorTypeOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#fdf0e7] ${
                        visitorMode === mode ? 'font-semibold' : 'font-normal'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center links: hidden <= 1000px */}
        <nav className="hidden items-center gap-[44px] min-[1001px]:flex">
          <button
            type="button"
            onClick={scrollToStays}
            className="nav-wipe-link whitespace-nowrap font-normal"
            style={{ fontSize: '14.5px' }}
          >
            Apartments
          </button>
          <button
            type="button"
            onClick={() => {
              if (detailStay) handleCloseDetail();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              startSlideWipe(2);
            }}
            className="nav-wipe-link whitespace-nowrap font-normal"
            style={{ fontSize: '14.5px' }}
          >
            Where to go
          </button>
          <button
            type="button"
            onClick={() => {
              if (detailStay) handleCloseDetail();
              window.setTimeout(() => {
                document
                  .getElementById('footer-contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, detailStay ? 500 : 0);
            }}
            className="nav-wipe-link whitespace-nowrap font-normal"
            style={{ fontSize: '14.5px' }}
          >
            Contact Us
          </button>
        </nav>

        {/* Right side: Become a host (hidden <= 1000px), Globe, Pill button */}
        <div className="relative flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => setHostNotice((h) => !h)}
            className="hidden whitespace-nowrap font-normal transition-opacity hover:opacity-75 min-[1001px]:inline-block"
            style={{ fontSize: '14px' }}
          >
            Become a host
          </button>

          <button
            type="button"
            aria-label="Change currency"
            onClick={() =>
              setCurrencyLabel((c) => (c === 'USD ($)' ? 'THB (฿)' : 'USD ($)'))
            }
            className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-75"
            title={currencyLabel}
          >
            <Globe size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((m) => !m)}
            className="flex items-center gap-2 px-2.5 py-1.5 transition-opacity hover:opacity-85"
            style={{
              border: '1.5px solid currentColor',
              borderRadius: '9px',
            }}
          >
            <Menu size={15} strokeWidth={1.7} />
            <span
              className="flex h-[22px] w-[22px] items-center justify-center rounded-full"
              style={{
                backgroundColor: isNavSolid
                  ? '#1d1a1c'
                  : 'rgba(255,255,255,0.92)',
                color: isNavSolid ? '#f7d9c6' : '#3a2c31',
              }}
            >
              <User size={13} strokeWidth={2} />
            </span>
          </button>

          {/* Compact host / menu popover */}
          {(menuOpen || hostNotice) && (
            <div className="popover-drop absolute top-12 right-0 z-50 w-64 rounded-2xl bg-white p-4 text-[#1d1a1c] shadow-[0_20px_50px_rgba(60,30,30,0.2)]">
              <div className="flex items-center justify-between border-b border-black/8 pb-2.5">
                <span className="text-[13px] font-semibold">
                  {hostNotice ? 'Host with Krung Travel' : 'Krung Travel Menu'}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => {
                    setMenuOpen(false);
                    setHostNotice(false);
                  }}
                  className="rounded-full p-1 text-[#5c5156] hover:bg-[#fdf0e7]"
                >
                  <X size={14} />
                </button>
              </div>
              {hostNotice ? (
                <div className="pt-3 text-[13px] leading-relaxed text-[#5c5156]">
                  List your riverside teak house or Bangkok suite with our curated
                  Thonburi & Silom concierge team.
                  <button
                    type="button"
                    onClick={() => {
                      setHostNotice(false);
                      scrollToStays();
                    }}
                    className="mt-3 w-full rounded-full bg-[#1d1a1c] py-2 text-[12.5px] font-medium text-white"
                  >
                    Explore Current Stays
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1 pt-2 text-[14px]">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToStays();
                    }}
                    className="rounded-lg px-2.5 py-2 text-left hover:bg-[#fdf0e7]"
                  >
                    Apartments
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      startSlideWipe(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-lg px-2.5 py-2 text-left hover:bg-[#fdf0e7]"
                  >
                    Where to go
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setHostNotice(true);
                    }}
                    className="rounded-lg px-2.5 py-2 text-left hover:bg-[#fdf0e7]"
                  >
                    Become a host
                  </button>
                  <div className="mt-1 flex items-center justify-between border-t border-black/8 px-2.5 pt-2.5 text-[12px] text-[#8a7f83]">
                    <span>Currency</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrencyLabel((c) =>
                          c === 'USD ($)' ? 'THB (฿)' : 'USD ($)',
                        )
                      }
                      className="font-semibold text-[#1d1a1c]"
                    >
                      {currencyLabel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* 4. Hero Section (100vh, min-height 680px, overflow hidden)           */}
      {/* ------------------------------------------------------------------- */}
      <section
        aria-label="Welcome to Bangkok"
        className="relative h-screen min-h-[680px] w-full overflow-hidden"
      >
        {/* 4.1 Stacked Slides (lag on scroll: translateY +0.42 * scrollY) */}
        <div
          ref={slideStackRef}
          className="absolute inset-0 will-change-transform"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isIncoming = transition?.to === idx;
            const isOutgoing = transition?.from === idx;
            const isActiveIdle = !transition && currentSlide === idx;
            const isVisible = isIncoming || isOutgoing || isActiveIdle;

            if (!isVisible) return null;

            let zIndex = 1;
            let maskStyle: React.CSSProperties = {};

            if (isIncoming && transition) {
              zIndex = 3;
              const p = transition.progress;
              const a = p * 135 - 35;
              const m = p * 135 - 17.5;
              const b = p * 135;
              const grad = `linear-gradient(to left, rgba(0,0,0,1) ${a}%, rgba(0,0,0,0.6) ${m}%, rgba(0,0,0,0) ${b}%)`;
              maskStyle = {
                maskImage: grad,
                WebkitMaskImage: grad,
              };
            } else if (isOutgoing) {
              zIndex = 2;
            } else if (isActiveIdle) {
              zIndex = 2;
            }

            // Compute word stagger across lines
            let wordCounter = 0;

            return (
              <div
                key={slide.id}
                className="absolute inset-0"
                style={{
                  zIndex,
                  ...maskStyle,
                }}
              >
                {/* Photo layer: inset -3%, base scale 1.04 */}
                <div
                  ref={(el) => {
                    slidePhotoRefs.current[idx] = el;
                  }}
                  className="absolute will-change-transform"
                  style={{
                    inset: '-3%',
                    backgroundImage: `url("${slide.photo}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: slide.photoPos,
                    transform: 'scale(1.04)',
                  }}
                />

                {/* Top mauve band tint */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(84,64,74,0.42) 0%, rgba(84,64,74,0.08) 26%, transparent 46%)',
                  }}
                />

                {/* Giant Title inside slide so wipe reveals title + photo together */}
                <h1
                  className={`pointer-events-none absolute font-bold uppercase select-none ${slide.titleClass}`}
                  style={{ fontWeight: 700 }}
                >
                  {slide.titleLines.map((line, lineIdx) => (
                    <span key={lineIdx} className="block">
                      {line.split(' ').map((word, wIdx) => {
                        const myIndex = wordCounter++;
                        const isFirstSlideIntro = idx === 0 && !transition;
                        const wordDelay = isFirstSlideIntro ? myIndex * 90 : 0;
                        const shown =
                          idx === 0 ? introTitlesReady : true;

                        return (
                          <span
                            key={`${lineIdx}-${wIdx}`}
                            className="mr-[0.22em] inline-block overflow-hidden align-top last:mr-0"
                          >
                            <span
                              className="hero-word-clip inline-block will-change-transform"
                              style={{
                                transform: shown
                                  ? 'translateY(0%)'
                                  : 'translateY(105%)',
                                transition: `transform 1.15s cubic-bezier(0.16,1,0.3,1) ${wordDelay}ms`,
                              }}
                            >
                              {word}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </h1>
              </div>
            );
          })}

          {/* Mist band riding along the soft wipe edge */}
          {transition && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 z-[5]"
              style={{
                width: '34vw',
                right: `calc(${transition.progress * 135 - 17.5}% - 17vw)`,
                background:
                  'radial-gradient(ellipse at center, rgba(255,236,226,0.75) 0%, rgba(255,236,226,0.35) 45%, transparent 72%)',
                filter: 'blur(10px)',
                opacity: Math.sin(Math.PI * transition.rawProgress) * 0.95,
              }}
            />
          )}
        </div>

        {/* 4.2 Volumetric Clouds */}
        {/* Bottom cloud bank: left/right -4%, bottom -6%, 78% height, z-index 7 */}
        <div
          ref={bottomCloudRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-[-4%] bottom-[-6%] left-[-4%] z-[7] h-[78%] origin-bottom will-change-transform"
          style={{ mixBlendMode: 'screen' }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            referrerPolicy="no-referrer"
            className="cloud-front cloud-mask-bottom absolute inset-0 h-full w-full object-cover object-bottom"
          />
          <img
            src={CLOUD_IMAGE}
            alt=""
            referrerPolicy="no-referrer"
            className="cloud-back cloud-mask-bottom absolute inset-0 h-full w-full object-cover object-bottom"
          />
        </div>

        {/* Top cloud layer: flipped vertically, -30% to 50% height, fades in on scroll */}
        <div
          ref={topCloudRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-[-30%] right-[-4%] left-[-4%] z-[8] h-[80%] opacity-0 will-change-transform"
          style={{ mixBlendMode: 'screen' }}
        >
          <div className="cloud-mask-top h-full w-full">
            <img
              src={CLOUD_IMAGE}
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full scale-y-[-1] object-cover object-bottom"
            />
          </div>
        </div>

        {/* Bottom fade over lowest 46% melting into #f7d9c6 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-[9] h-[46%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(247,217,198,0) 0%, rgba(247,217,198,0.45) 45%, rgba(247,217,198,0.92) 82%, #f7d9c6 100%)',
          }}
        />

        {/* 4.3 Right Rail: Thumbnails on Concentric Rings */}
        <div
          ref={railRef}
          className="pointer-events-none absolute inset-0 z-[12] will-change-transform"
        >
          {/* Two thin concentric rings centered on active thumbnail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              left: railCenterX - innerRingRadius,
              top: activeRailItem.cy - innerRingRadius,
              width: innerRingRadius * 2,
              height: innerRingRadius * 2,
              border: '1.6px solid rgba(255,255,255,0.5)',
              opacity: introThumbsReady ? 1 : 0,
              transition:
                'top 0.9s cubic-bezier(0.65,0,0.35,1), left 0.9s cubic-bezier(0.65,0,0.35,1), width 0.9s cubic-bezier(0.65,0,0.35,1), height 0.9s cubic-bezier(0.65,0,0.35,1), opacity 1.1s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              left: railCenterX - outerRingRadius,
              top: activeRailItem.cy - outerRingRadius,
              width: outerRingRadius * 2,
              height: outerRingRadius * 2,
              border: '1.6px solid rgba(255,255,255,0.5)',
              opacity: introThumbsReady ? 1 : 0,
              transition:
                'top 0.9s cubic-bezier(0.65,0,0.35,1), left 0.9s cubic-bezier(0.65,0,0.35,1), width 0.9s cubic-bezier(0.65,0,0.35,1), height 0.9s cubic-bezier(0.65,0,0.35,1), opacity 1.3s cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          {/* Three round thumbnails */}
          {railLayout.map((item, idx) => {
            const thumbDelay = idx * 140;
            return (
              <button
                key={item.thumb.id}
                type="button"
                aria-label={item.thumb.label}
                onClick={() => startSlideWipe(item.thumb.slideIndex)}
                className="group pointer-events-auto absolute rounded-full focus:outline-none"
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.size,
                  height: item.size,
                  border: '3px solid rgba(255,255,255,0.92)',
                  boxShadow: '0 10px 26px rgba(60,30,30,0.28)',
                  transform: introThumbsReady ? 'scale(1)' : 'scale(0)',
                  transition: [
                    'top 0.9s cubic-bezier(0.65,0,0.35,1)',
                    'left 0.9s cubic-bezier(0.65,0,0.35,1)',
                    'width 0.9s cubic-bezier(0.65,0,0.35,1)',
                    'height 0.9s cubic-bezier(0.65,0,0.35,1)',
                    `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${
                      introThumbsReady ? 0 : thumbDelay
                    }ms`,
                    'box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)',
                  ].join(', '),
                }}
                onMouseEnter={(e) => {
                  if (introThumbsReady) {
                    e.currentTarget.style.transform = 'scale(1.07)';
                    e.currentTarget.style.boxShadow =
                      '0 18px 38px rgba(45,20,25,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (introThumbsReady) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 26px rgba(60,30,30,0.28)';
                  }
                }}
              >
                <span className="block h-full w-full overflow-hidden rounded-full">
                  <img
                    src={item.thumb.image}
                    alt={item.thumb.label}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </span>
                {/* Halo ring 9px outside active thumbnail */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    inset: '-12px',
                    border: '1.5px solid rgba(255,255,255,0.55)',
                    opacity: item.isLit ? 1 : 0,
                    transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </button>
            );
          })}

          {/* Horizontal connector line (hidden <= 640px) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden h-[3px] rounded-full bg-white sm:block"
            style={{
              left: connectorLeft,
              top: activeRailItem.cy - 1.5,
              width: connectorLength,
              transformOrigin: 'right center',
              transform: captionVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition:
                'top 0.9s cubic-bezier(0.65,0,0.35,1), left 0.9s cubic-bezier(0.65,0,0.35,1), width 0.9s cubic-bezier(0.65,0,0.35,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          {/* Caption block (hidden <= 640px) */}
          <div
            className="pointer-events-none absolute hidden items-center gap-4 sm:flex"
            style={{
              right: captionRightEdge,
              top: activeRailItem.cy,
              transform: 'translateY(-50%)',
              transition:
                'top 0.9s cubic-bezier(0.65,0,0.35,1), right 0.9s cubic-bezier(0.65,0,0.35,1)',
            }}
          >
            {/* 3px vertical white bar growing from top */}
            <div
              aria-hidden="true"
              className="w-[3px] shrink-0 rounded-full bg-white"
              style={{
                height: verticalBarHeight,
                transformOrigin: 'top center',
                transform: captionVisible ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            />

            {/* Heading + description revealing left-to-right via clip-path */}
            <div
              className="text-white"
              style={{
                clipPath: captionVisible
                  ? 'inset(0 0% 0 0)'
                  : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div
                className="font-light tracking-[-0.01em]"
                style={{
                  fontSize: 'clamp(26px, 2.75vw, 40px)',
                  fontWeight: 300,
                  lineHeight: 1.12,
                  textShadow: '0 4px 20px rgba(40,20,25,0.28)',
                }}
              >
                {HERO_SLIDES[activeSlideIndex].captionTitle}
              </div>
              <p
                className="mt-2 max-w-[250px] leading-[1.45] text-white/88"
                style={{
                  fontSize: 'clamp(12px, 1vw, 14.5px)',
                  textShadow: '0 2px 12px rgba(40,20,25,0.28)',
                }}
              >
                {HERO_SLIDES[activeSlideIndex].captionDesc}
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 5. Search Bar (centered, z-index 20 above clouds)                  */}
        {/* ----------------------------------------------------------------- */}
        <div
          ref={searchWrapRef}
          className="hero-search-wrap absolute right-0 left-0 z-20 mx-auto"
        >
          <div
            style={{
              opacity: introSearchReady ? 1 : 0,
              transform: introSearchReady
                ? 'translateY(0px)'
                : 'translateY(30px)',
              transition:
                'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div
              className="relative grid grid-cols-2 items-center gap-1.5 px-3 py-2.5 sm:flex sm:h-[90px] sm:gap-1 sm:px-3.5 sm:py-0"
              style={{
                background: 'rgba(255,255,255,0.93)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '26px',
                boxShadow: '0 18px 60px rgba(120,70,60,0.16)',
              }}
            >
              {/* Field 1: Bangkok / Choose the destination (1.35x wider on desktop) */}
              <button
                type="button"
                onClick={() => {
                  setRaisedField('destination');
                  setOpenPopover((p) =>
                    p === 'destination' ? null : 'destination',
                  );
                }}
                onMouseEnter={() => setHoveredField('destination')}
                onMouseLeave={() => setHoveredField(null)}
                className="flex h-[68px] flex-col justify-center px-4 text-left transition-all duration-200 sm:h-[72px] sm:flex-[1.35] sm:px-5"
                style={{
                  borderRadius: '14px',
                  backgroundColor:
                    raisedField === 'destination' ||
                    hoveredField === 'destination' ||
                    openPopover === 'destination'
                      ? '#ffffff'
                      : 'transparent',
                  boxShadow:
                    raisedField === 'destination' ||
                    hoveredField === 'destination' ||
                    openPopover === 'destination'
                      ? '0 8px 24px rgba(120,80,70,0.14)'
                      : 'none',
                }}
              >
                <div className="flex items-center gap-2 text-[#1d1a1c]">
                  <MapPin size={16} strokeWidth={1.6} className="shrink-0" />
                  <span
                    className="truncate font-medium"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                  >
                    {selectedArea === 'All Bangkok' ? 'Bangkok' : selectedArea}
                  </span>
                </div>
                <div className="mt-0.5 truncate pl-6 text-[13px] text-[#8a7f83]">
                  {selectedArea === 'Bangkok' || selectedArea === 'All Bangkok'
                    ? 'Choose the destination'
                    : 'Bangkok, Thailand'}
                </div>
              </button>

              {/* Field 2: Check in */}
              <button
                type="button"
                onClick={() => {
                  setRaisedField('checkin');
                  setOpenPopover('calendar');
                }}
                onMouseEnter={() => setHoveredField('checkin')}
                onMouseLeave={() => setHoveredField(null)}
                className="flex h-[68px] flex-col justify-center px-4 text-left transition-all duration-200 sm:h-[72px] sm:flex-1 sm:px-5"
                style={{
                  borderRadius: '14px',
                  backgroundColor:
                    raisedField === 'checkin' ||
                    hoveredField === 'checkin' ||
                    (openPopover === 'calendar' && !checkInDate)
                      ? '#ffffff'
                      : 'transparent',
                  boxShadow:
                    raisedField === 'checkin' ||
                    hoveredField === 'checkin' ||
                    (openPopover === 'calendar' && !checkInDate)
                      ? '0 8px 24px rgba(120,80,70,0.14)'
                      : 'none',
                }}
              >
                <div className="flex items-center gap-2 text-[#1d1a1c]">
                  <Calendar size={16} strokeWidth={1.6} className="shrink-0" />
                  <span
                    className="truncate font-medium"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                  >
                    Check in
                  </span>
                </div>
                <div className="mt-0.5 truncate pl-6 text-[13px] text-[#8a7f83]">
                  {checkInDate ? formatShortDate(checkInDate) : 'Add date'}
                </div>
              </button>

              {/* Field 3: Check out */}
              <button
                type="button"
                onClick={() => {
                  setRaisedField('checkout');
                  setOpenPopover('calendar');
                }}
                onMouseEnter={() => setHoveredField('checkout')}
                onMouseLeave={() => setHoveredField(null)}
                className="flex h-[68px] flex-col justify-center px-4 text-left transition-all duration-200 sm:h-[72px] sm:flex-1 sm:px-5"
                style={{
                  borderRadius: '14px',
                  backgroundColor:
                    raisedField === 'checkout' ||
                    hoveredField === 'checkout' ||
                    (openPopover === 'calendar' && Boolean(checkInDate))
                      ? '#ffffff'
                      : 'transparent',
                  boxShadow:
                    raisedField === 'checkout' ||
                    hoveredField === 'checkout' ||
                    (openPopover === 'calendar' && Boolean(checkInDate))
                      ? '0 8px 24px rgba(120,80,70,0.14)'
                      : 'none',
                }}
              >
                <div className="flex items-center gap-2 text-[#1d1a1c]">
                  <Calendar size={16} strokeWidth={1.6} className="shrink-0" />
                  <span
                    className="truncate font-medium"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                  >
                    Check out
                  </span>
                </div>
                <div className="mt-0.5 truncate pl-6 text-[13px] text-[#8a7f83]">
                  {checkOutDate ? formatShortDate(checkOutDate) : 'Add date'}
                </div>
              </button>

              {/* Field 4: Visitors */}
              <button
                type="button"
                onClick={() => {
                  setRaisedField('visitors');
                  setOpenPopover((p) =>
                    p === 'visitors' ? null : 'visitors',
                  );
                }}
                onMouseEnter={() => setHoveredField('visitors')}
                onMouseLeave={() => setHoveredField(null)}
                className="flex h-[68px] flex-col justify-center px-4 text-left transition-all duration-200 sm:h-[72px] sm:flex-1 sm:px-5"
                style={{
                  borderRadius: '14px',
                  backgroundColor:
                    raisedField === 'visitors' ||
                    hoveredField === 'visitors' ||
                    openPopover === 'visitors'
                      ? '#ffffff'
                      : 'transparent',
                  boxShadow:
                    raisedField === 'visitors' ||
                    hoveredField === 'visitors' ||
                    openPopover === 'visitors'
                      ? '0 8px 24px rgba(120,80,70,0.14)'
                      : 'none',
                }}
              >
                <div className="flex items-center gap-2 text-[#1d1a1c]">
                  <Users size={16} strokeWidth={1.6} className="shrink-0" />
                  <span
                    className="truncate font-medium"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                  >
                    Visitors
                  </span>
                </div>
                <div className="mt-0.5 truncate pl-6 text-[13px] text-[#8a7f83]">
                  {totalGuests === 2 && !openPopover && childrenCount === 0
                    ? 'Add guests'
                    : `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`}
                </div>
              </button>

              {/* Send Button (40px black square on desktop, full-width below on <= 640px) */}
              <button
                type="button"
                aria-label="Search stays"
                onClick={() => {
                  setOpenPopover(null);
                  scrollToStays();
                }}
                className="col-span-2 mt-1 flex h-11 w-full items-center justify-center bg-[#1d1a1c] text-white transition-transform duration-200 hover:scale-[1.03] sm:col-span-1 sm:mr-3 sm:mt-0 sm:ml-2 sm:h-[40px] sm:w-[40px] sm:shrink-0 sm:hover:[transform:scale(1.1)_rotate(-8deg)]"
                style={{ borderRadius: '11px' }}
              >
                <Send size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Destination Popover */}
          {openPopover === 'destination' && (
            <div
              className="popover-drop absolute top-[calc(100%+12px)] left-0 z-30 w-[260px] bg-white p-3 text-[#1d1a1c]"
              style={{
                borderRadius: '18px',
                boxShadow: '0 22px 60px rgba(70,35,30,0.22)',
              }}
            >
              <div className="px-2.5 pb-1.5 text-[11.5px] font-semibold tracking-wide text-[#8a7f83] uppercase">
                Bangkok Districts
              </div>
              <div className="grid grid-cols-1 gap-0.5">
                {BANGKOK_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setSelectedArea(area);
                      setShowAllFiltered(false);
                      setOpenPopover('calendar');
                      setRaisedField('checkin');
                    }}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-[#fdf0e7] ${
                      selectedArea === area ? 'bg-[#fbe7da] font-semibold' : ''
                    }`}
                  >
                    <span>{area}</span>
                    <MapPin size={13} className="text-[#8a7f83]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Popover */}
          {openPopover === 'calendar' && (
            <div
              className="popover-drop absolute top-[calc(100%+12px)] left-1/2 z-30 w-[294px] -translate-x-1/2 bg-white p-5 text-[#1d1a1c]"
              style={{
                borderRadius: '18px',
                boxShadow: '0 22px 60px rgba(70,35,30,0.22)',
              }}
            >
              {/* Month Header */}
              <div className="mb-3.5 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() =>
                    setCalMonth((prev) =>
                      prev.month === 0
                        ? { year: prev.year - 1, month: 11 }
                        : { year: prev.year, month: prev.month - 1 },
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#1d1a1c] transition-colors hover:bg-[#fbe7da]"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[14.5px] font-semibold">
                  {MONTH_NAMES[calMonth.month]} {calMonth.year}
                </span>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() =>
                    setCalMonth((prev) =>
                      prev.month === 11
                        ? { year: prev.year + 1, month: 0 }
                        : { year: prev.year, month: prev.month + 1 },
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#1d1a1c] transition-colors hover:bg-[#fbe7da]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Weekday Labels (Monday first) */}
              <div className="mb-1.5 grid grid-cols-7 text-center text-[11px] font-medium text-[#8a7f83]">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((wd) => (
                  <div key={wd} className="flex h-7 items-center justify-center">
                    {wd}
                  </div>
                ))}
              </div>

              {/* 7 columns x 34px cells */}
              <div className="grid grid-cols-7 gap-y-1">
                {calendarDays.map((dateObj, idx) => {
                  if (!dateObj) {
                    return <div key={`empty-${idx}`} className="h-[34px] w-[34px]" />;
                  }

                  const isStart = isSameDay(dateObj, checkInDate);
                  const isEnd = isSameDay(dateObj, checkOutDate);
                  const tCur = dayTimestamp(dateObj);
                  const tStart = checkInDate ? dayTimestamp(checkInDate) : null;
                  const tEnd = checkOutDate ? dayTimestamp(checkOutDate) : null;

                  const isInRange =
                    tStart !== null &&
                    tEnd !== null &&
                    tCur > tStart &&
                    tCur < tEnd;

                  const isDisabled =
                    Boolean(checkInDate && !checkOutDate) &&
                    tStart !== null &&
                    tCur <= tStart;

                  return (
                    <div
                      key={dateObj.toISOString()}
                      className="flex h-[34px] items-center justify-center"
                      style={{
                        background:
                          isStart && checkOutDate
                            ? 'linear-gradient(90deg, transparent 50%, #fbe7da 50%)'
                            : isEnd && checkInDate
                              ? 'linear-gradient(90deg, #fbe7da 50%, transparent 50%)'
                              : isInRange
                                ? '#fbe7da'
                                : undefined,
                      }}
                    >
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleCalendarDayClick(dateObj)}
                        className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-[12.5px] font-medium tabular-nums transition-colors ${
                          isStart || isEnd
                            ? 'bg-[#1d1a1c] text-white'
                            : isDisabled
                              ? 'pointer-events-none text-[#8a7f83]/35'
                              : 'text-[#1d1a1c] hover:bg-[#f7d9c6]'
                        }`}
                      >
                        {dateObj.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Visitors Popover */}
          {openPopover === 'visitors' && (
            <div
              className="popover-drop absolute top-[calc(100%+12px)] right-0 z-30 w-[275px] bg-white p-5 text-[#1d1a1c] sm:right-14"
              style={{
                borderRadius: '18px',
                boxShadow: '0 22px 60px rgba(70,35,30,0.22)',
              }}
            >
              {/* Adults row */}
              <div className="flex items-center justify-between pb-4">
                <div>
                  <div className="text-[14px] font-semibold">Adults</div>
                  <div className="text-[12px] text-[#8a7f83]">Ages 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease adults"
                    onClick={() => setAdults((a) => Math.max(1, a - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-4 text-center text-[14px] font-medium tabular-nums">
                    {adults}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase adults"
                    onClick={() => setAdults((a) => Math.min(12, a + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Children row */}
              <div className="flex items-center justify-between border-t border-black/8 pt-4">
                <div>
                  <div className="text-[14px] font-semibold">Children</div>
                  <div className="text-[12px] text-[#8a7f83]">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease children"
                    onClick={() => setChildrenCount((c) => Math.max(0, c - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-4 text-center text-[14px] font-medium tabular-nums">
                    {childrenCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase children"
                    onClick={() => setChildrenCount((c) => Math.min(8, c + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 6. "Recomended Places to Stay" Section                              */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="stays"
        className="stays-section-offset krung-pad-x relative z-[15] pb-24"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            className="font-serif-display font-normal text-[#1d1a1c]"
            style={{ fontSize: 'clamp(26px, 2.45vw, 36px)' }}
          >
            Recomended Places to Stay
          </h2>

          <button
            type="button"
            onClick={() => {
              setSelectedArea('Bangkok');
              setShowAllFiltered((s) => !s);
            }}
            className="shrink-0 px-5 py-2 text-[13.5px] font-medium text-[#1d1a1c] transition-colors duration-200 hover:bg-[#1d1a1c] hover:text-white"
            style={{
              border: '1.4px solid #1d1a1c',
              borderRadius: '20px',
            }}
          >
            See All
          </button>
        </div>

        <div className="stays-grid">
          {visibleStays.map((stay, index) => (
            <StayCard
              key={stay.id}
              stay={stay}
              index={index}
              liked={likedIds.includes(stay.id)}
              onToggleLike={toggleLike}
              onOpen={handleOpenDetail}
            />
          ))}
        </div>
      </section>

      {/* Quiet Footer */}
      <footer
        id="footer-contact"
        className="krung-pad-x border-t border-[#1d1a1c]/10 py-10 text-[13px] text-[#5c5156]"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-light text-[#1d1a1c]" style={{ fontSize: '20px' }}>
              Krung Travel
            </span>
            <span aria-hidden="true">·</span>
            <span>Bangkok, Thailand</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>concierge@krungtravel.th</span>
            <span>+66 2 018 4420</span>
            <span>© 2026 Krung Travel</span>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------------- */}
      {/* 7. Property Detail Page (Shared-Element Flight Overlay)             */}
      {/* ------------------------------------------------------------------- */}
      {detailStay && (
        <div
          ref={detailScrollRef}
          role="dialog"
          aria-modal="true"
          aria-label={detailStay.name}
          className="fixed inset-0 z-40 overflow-y-auto"
          style={{
            background:
              'linear-gradient(180deg, #f7d9c6 0px, #f7d9c6 290px, #ffffff 290px, #ffffff 100%)',
            opacity: detailClosing ? 0 : 1,
            transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="krung-pad-x pt-[102px] pb-20">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center gap-2 text-[12.5px] text-[#5c5156]"
              style={{
                opacity: detailBlocksVisible ? 1 : 0,
                transform: detailBlocksVisible
                  ? 'translateY(0px)'
                  : 'translateY(26px)',
                transition:
                  'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0ms',
              }}
            >
              <button
                type="button"
                onClick={handleCloseDetail}
                className="font-medium text-[#1d1a1c] hover:underline"
              >
                Home
              </button>
              <span aria-hidden="true">›</span>
              <span>Type of places to stay</span>
              <span aria-hidden="true">›</span>
              <span>Villas</span>
              <span aria-hidden="true">›</span>
              <span className="text-[#8a7f83]">
                {detailStay.name}, {detailStay.area}
              </span>
            </nav>

            {/* Two-column Detail Content */}
            <div className="detail-columns">
              {/* Left Column: Main Photo + 3 Interior Thumbnails */}
              <div>
                <div
                  ref={detailMainPhotoRef}
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: '512 / 445',
                    borderRadius: '10px',
                    opacity: detailMainVisible || !detailFlightActive ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    boxShadow: '0 18px 46px rgba(80,45,35,0.14)',
                  }}
                >
                  {/* Cached w=700 base layer */}
                  <img
                    src={
                      activeInteriorIdx !== null
                        ? INTERIOR_THUMBS[activeInteriorIdx]
                        : detailStay.photo700
                    }
                    alt={`${detailStay.name} main view`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* w=1400 crisp layer stacked over w=700 */}
                  {activeInteriorIdx === null && (
                    <img
                      src={detailStay.photo1400}
                      alt={`${detailStay.name} high resolution`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  {/* Heart button on main photo */}
                  <button
                    type="button"
                    aria-label="Save property"
                    onClick={() => toggleLike(detailStay.id)}
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md transition-transform hover:scale-105"
                  >
                    <Heart
                      size={17}
                      strokeWidth={1.9}
                      className={
                        likedIds.includes(detailStay.id)
                          ? 'fill-[#ff4d5e] text-[#ff4d5e]'
                          : 'text-[#1d1a1c]'
                      }
                    />
                  </button>
                </div>

                {/* Three square interior thumbnails (16px gap) */}
                <div
                  className="mt-4 grid grid-cols-3 gap-4"
                  style={{
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 70ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 70ms',
                  }}
                >
                  {INTERIOR_THUMBS.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setActiveInteriorIdx((cur) => (cur === idx ? null : idx))
                      }
                      className="group relative aspect-square w-full overflow-hidden rounded-[10px] transition-transform duration-300 hover:-translate-y-1 focus:outline-none"
                    >
                      <img
                        src={thumbUrl}
                        alt={`Interior view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {idx === 2 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1d1a1c]/55 text-[22px] font-medium text-white backdrop-blur-[1px]">
                          +9
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Title, Host, About, Booking Card, Ratings, Amenities */}
              <div>
                {/* Title & Host */}
                <div
                  style={{
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 140ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 140ms',
                  }}
                >
                  <h1
                    className="font-serif-display font-normal text-[#1d1a1c]"
                    style={{ fontSize: 'clamp(30px, 3vw, 38px)', lineHeight: 1.15 }}
                  >
                    {detailStay.name}
                  </h1>
                  <div className="mt-2.5 flex items-center gap-2 text-[13.5px] text-[#5c5156]">
                    <span>Hosted by</span>
                    <img
                      src={AVATARS[0]}
                      alt="Ploy Sirikul"
                      referrerPolicy="no-referrer"
                      className="h-[20px] w-[20px] rounded-full object-cover"
                    />
                    <span className="font-medium text-[#1d1a1c]">
                      Ploy Sirikul
                    </span>
                  </div>
                </div>

                {/* About Section */}
                <div
                  className="mt-7"
                  style={{
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 210ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 210ms',
                  }}
                >
                  <h2 className="font-serif-display text-[22px] font-normal text-[#1d1a1c]">
                    About {detailStay.name}
                  </h2>
                  <p className="mt-2.5 text-[14.5px] leading-[1.68] text-[#5c5156]">
                    Tucked along the peaceful bends near Thonburi, this private
                    retreat places you minutes from the gilded spires of the
                    Grand Palace and Wat Arun. Morning longtail ferries glide
                    across the Chao Phraya straight to Chinatown&apos;s famed
                    street food stalls, before returning at dusk to unwind on a
                    lantern-lit teak terrace over the water.
                  </p>
                </div>

                {/* Booking Card */}
                <div
                  className="mt-7 bg-white p-6"
                  style={{
                    borderRadius: '18px',
                    boxShadow: '0 18px 50px rgba(90,50,45,0.12)',
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 280ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 280ms',
                  }}
                >
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-semibold text-[#1d1a1c] tabular-nums"
                      style={{ fontSize: '26px' }}
                    >
                      {detailStay.priceFormatted}
                    </span>
                    <span className="text-[14px] text-[#8a7f83]">/night</span>
                  </div>

                  {/* Pale grey Check In / Check Out box */}
                  <div className="mt-4 grid grid-cols-2 divide-x divide-[#1d1a1c]/10 rounded-[12px] bg-[#f6f4f5] p-3.5">
                    <div className="pr-3">
                      <div className="text-[11px] font-medium tracking-wide text-[#8a7f83] uppercase">
                        Check In
                      </div>
                      <div className="mt-1 text-[14px] font-medium text-[#1d1a1c]">
                        {formatShortDate(detailCheckIn)}
                      </div>
                    </div>
                    <div className="pl-4">
                      <div className="text-[11px] font-medium tracking-wide text-[#8a7f83] uppercase">
                        Check Out
                      </div>
                      <div className="mt-1 text-[14px] font-medium text-[#1d1a1c]">
                        {formatFullDate(detailCheckOut)}
                      </div>
                    </div>
                  </div>

                  {/* Guests Row */}
                  <div className="mt-4 flex items-center justify-between px-1">
                    <div>
                      <div className="text-[13.5px] font-medium text-[#1d1a1c]">
                        Guests
                      </div>
                      <div className="text-[12px] text-[#8a7f83]">
                        {detailGuests} {detailGuests === 1 ? 'guest' : 'guests'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Decrease booking guests"
                        onClick={() =>
                          setDetailGuests((g) => Math.max(1, g - 1))
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-[14.5px] font-medium tabular-nums">
                        {detailGuests}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase booking guests"
                        onClick={() =>
                          setDetailGuests((g) => Math.min(12, g + 1))
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1d1a1c]/20 text-[#1d1a1c] transition-colors hover:border-[#1d1a1c]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Book Now / Booked ✓ pill */}
                  <button
                    type="button"
                    onClick={() => setBooked((b) => !b)}
                    className="mt-5 w-full rounded-full py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:brightness-105"
                    style={{
                      backgroundColor: booked ? '#1e9e5a' : '#f39419',
                    }}
                  >
                    {booked ? 'Booked ✓' : 'Book Now'}
                  </button>
                </div>

                {/* Rating Row between hairlines */}
                <div
                  className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-[#1d1a1c]/10 py-5"
                  style={{
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 350ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 350ms',
                  }}
                >
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[22px] font-semibold text-[#1d1a1c] tabular-nums">
                        4.8
                      </span>
                      <span className="text-[13px] text-[#8a7f83]">
                        (128 reviews)
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <Star
                          key={idx}
                          size={13}
                          className="fill-[#ff4d5e] text-[#ff4d5e]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center -space-x-2.5">
                    {AVATARS.map((av, idx) => (
                      <img
                        key={idx}
                        src={av}
                        alt={`Reviewer ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="h-[38px] w-[38px] rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setUserRated((r) => (r ? null : 5))}
                    className="rounded-full border border-[#1d1a1c] px-4 py-2 text-[13px] font-medium text-[#1d1a1c] transition-colors hover:bg-[#1d1a1c] hover:text-white"
                  >
                    {userRated ? 'Rated 5 ★' : 'Rate Now'}
                  </button>
                </div>

                {/* Amenities 3x2 grid */}
                <div
                  className="mt-7"
                  style={{
                    opacity: detailBlocksVisible ? 1 : 0,
                    transform: detailBlocksVisible
                      ? 'translateY(0px)'
                      : 'translateY(26px)',
                    transition:
                      'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 420ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 420ms',
                  }}
                >
                  <h2 className="font-serif-display text-[22px] font-normal text-[#1d1a1c]">
                    Amenities
                  </h2>
                  <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5">
                    {[
                      { icon: Wifi, label: 'Wi-Fi' },
                      { icon: Wine, label: 'Personal Bar' },
                      { icon: Ship, label: 'Private Pier' },
                      { icon: Award, label: 'Superhost' },
                      { icon: Film, label: 'Own Cinema' },
                      { icon: ConciergeBell, label: 'Room Service' },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 text-[13.5px] text-[#5c5156]"
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="shrink-0 text-[#1d1a1c]"
                        />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Places to Stay */}
            <div
              className="mt-20"
              style={{
                opacity: detailBlocksVisible ? 1 : 0,
                transform: detailBlocksVisible
                  ? 'translateY(0px)'
                  : 'translateY(26px)',
                transition:
                  'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 490ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 490ms',
              }}
            >
              <h2
                className="font-serif-display mb-7 font-normal text-[#1d1a1c]"
                style={{ fontSize: 'clamp(24px, 2.2vw, 32px)' }}
              >
                Similar Places to Stay
              </h2>
              <div className="stays-grid">
                {similarStays.map((stay, idx) => (
                  <StayCard
                    key={stay.id}
                    stay={stay}
                    index={idx}
                    liked={likedIds.includes(stay.id)}
                    onToggleLike={toggleLike}
                    onOpen={handleOpenDetail}
                    immediate
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
