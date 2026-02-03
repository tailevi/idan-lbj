import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/gallery/ProductCard';
import ProductModal from '../components/gallery/ProductModal';
import GalleryFilters from '../components/gallery/GalleryFilters';
import ParticleField from '../components/effects/ParticleField';
import { Slider } from '@/components/ui/slider';

// Product data from /products folder
const mockProducts = [
  {
    id: '1',
    title: 'A Gentle Touch of Serenity',
    image_url: '/products/A_Gentle_Touch_of_Serenity_.webp',
    price: 3450,
    categories: ['wildlife', 'landscapes'],
    description: 'יצירה מרהיבה המשדרת שלווה ורוגע, לכידת רגע של שקט מוחלט בטבע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3450 },
      { dimensions: '50×70 ס"מ', price: 5175 },
      { dimensions: '70×100 ס"מ', price: 6900 },
      { dimensions: '100×150 ס"מ', price: 10350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '2',
    title: 'A Lingering Glance in the Grass',
    image_url: '/products/A_Lingering_Glance_in_the_Grass_.webp',
    price: 7820,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט חודר מבעד לעשבים הגבוהים, רגע של קשר עמוק עם הטבע הפראי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7820 },
      { dimensions: '50×70 ס"מ', price: 11730 },
      { dimensions: '70×100 ס"מ', price: 15640 },
      { dimensions: '100×150 ס"מ', price: 23460 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '3',
    title: 'A Moment of Gentle Grace',
    image_url: '/products/A_Moment_of_Gentle_Grace_.webp',
    price: 2190,
    categories: ['wildlife', 'landscapes'],
    description: 'רגע של חן עדין ויופי טבעי, המגלם את האלגנטיות של החיים הפראיים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 2190 },
      { dimensions: '50×70 ס"מ', price: 3285 },
      { dimensions: '70×100 ס"מ', price: 4380 },
      { dimensions: '100×150 ס"מ', price: 6570 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '4',
    title: 'A Strategy in the Shadows',
    image_url: '/products/A_Strategy_in_the_Shadows_.webp',
    price: 5670,
    categories: ['wildlife', 'landscapes'],
    description: 'תכנון אסטרטגי בצללי הטבע, לכידת רגע של ריכוז וחישוב מדויק',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5670 },
      { dimensions: '50×70 ס"מ', price: 8505 },
      { dimensions: '70×100 ס"מ', price: 11340 },
      { dimensions: '100×150 ס"מ', price: 17010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '5',
    title: 'A Stride Toward Discovery',
    image_url: '/products/A_Stride_Toward_Discovery_.webp',
    price: 4230,
    categories: ['wildlife', 'landscapes'],
    description: 'צעד אל עבר גילויים חדשים, המסמל את המסע המתמיד של החיים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4230 },
      { dimensions: '50×70 ס"מ', price: 6345 },
      { dimensions: '70×100 ס"מ', price: 8460 },
      { dimensions: '100×150 ס"מ', price: 12690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '6',
    title: 'A Whimsical Shift of Perspective',
    image_url: '/products/A_Whimsical_Shift_of_Perspective.webp',
    price: 8940,
    categories: ['wildlife', 'landscapes'],
    description: 'שינוי משעשע של נקודת מבט, יצירה שמזמינה להסתכל על העולם אחרת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8940 },
      { dimensions: '50×70 ס"מ', price: 13410 },
      { dimensions: '70×100 ס"מ', price: 17880 },
      { dimensions: '100×150 ס"מ', price: 26820 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '7',
    title: 'Ascending with Grace',
    image_url: '/products/Ascending_with_Grace_.webp',
    price: 1560,
    categories: ['wildlife', 'landscapes'],
    description: 'עלייה מלאת חן, המתארת את היופי שבתנועה ובשאיפה לגבהים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 1560 },
      { dimensions: '50×70 ס"מ', price: 2340 },
      { dimensions: '70×100 ס"מ', price: 3120 },
      { dimensions: '100×150 ס"מ', price: 4680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '8',
    title: 'Aspiring to the Peak',
    image_url: '/products/Aspiring_to_the_Peak_.webp',
    price: 6780,
    categories: ['landscapes', 'wildlife'],
    description: 'שאיפה לפסגה, יצירה המסמלת את המאמץ והנחישות להגיע לשיאים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6780 },
      { dimensions: '50×70 ס"מ', price: 10170 },
      { dimensions: '70×100 ס"מ', price: 13560 },
      { dimensions: '100×150 ס"מ', price: 20340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '9',
    title: 'Burst of Vitality',
    image_url: '/products/Burst_of_Vitality_.webp',
    price: 3890,
    categories: ['wildlife', 'landscapes'],
    description: 'פרץ של חיוניות ואנרגיה, לכידת רגע של עוצמה וחיים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3890 },
      { dimensions: '50×70 ס"מ', price: 5835 },
      { dimensions: '70×100 ס"מ', price: 7780 },
      { dimensions: '100×150 ס"מ', price: 11670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '10',
    title: 'Celestial Alignment',
    image_url: '/products/Celestial_Alignment_.webp',
    price: 9450,
    categories: ['landscapes', 'wildlife'],
    description: 'יישור שמימי מושלם, רגע נדיר של הרמוניה בין שמיים וארץ',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9450 },
      { dimensions: '50×70 ס"מ', price: 14175 },
      { dimensions: '70×100 ס"מ', price: 18900 },
      { dimensions: '100×150 ס"מ', price: 28350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '11',
    title: 'Celestial Halo of Majesty',
    image_url: '/products/Celestial_Halo_of_Majesty_.webp',
    price: 7120,
    categories: ['wildlife', 'landscapes'],
    description: 'הילה שמימית של הוד והדר, יצירה המשלבת אור ונוכחות מלכותית',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7120 },
      { dimensions: '50×70 ס"מ', price: 10680 },
      { dimensions: '70×100 ס"מ', price: 14240 },
      { dimensions: '100×150 ס"מ', price: 21360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '12',
    title: 'Deep Satisfaction',
    image_url: '/products/Deep_Satisfaction_.webp',
    price: 2670,
    categories: ['wildlife', 'landscapes'],
    description: 'סיפוק עמוק ומלא, רגע של שלמות והנאה טהורה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 2670 },
      { dimensions: '50×70 ס"מ', price: 4005 },
      { dimensions: '70×100 ס"מ', price: 5340 },
      { dimensions: '100×150 ס"מ', price: 8010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '13',
    title: 'Desert Curiosity',
    image_url: '/products/Desert_Curiosity_.webp',
    price: 4560,
    categories: ['wildlife', 'landscapes'],
    description: 'סקרנות מדברית, מבט חוקר של יצור המדבר על עולמו',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4560 },
      { dimensions: '50×70 ס"מ', price: 6840 },
      { dimensions: '70×100 ס"מ', price: 9120 },
      { dimensions: '100×150 ס"מ', price: 13680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '14',
    title: 'Echoes of a Timeless Earth',
    image_url: '/products/Echoes_of_a_Timeless_Earth_.webp',
    price: 8230,
    categories: ['landscapes', 'tribes'],
    description: 'הדים של אדמה נצחית, יצירה המחברת בין עבר והווה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8230 },
      { dimensions: '50×70 ס"מ', price: 12345 },
      { dimensions: '70×100 ס"מ', price: 16460 },
      { dimensions: '100×150 ס"מ', price: 24690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '15',
    title: 'Eyes of Hidden Intent',
    image_url: '/products/Eyes_of_Hidden_Intent_.webp',
    price: 5340,
    categories: ['wildlife', 'landscapes'],
    description: 'עיניים של כוונה נסתרת, מבט חודר המגלה עומק ומסתורין',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5340 },
      { dimensions: '50×70 ס"מ', price: 8010 },
      { dimensions: '70×100 ס"מ', price: 10680 },
      { dimensions: '100×150 ס"מ', price: 16020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '16',
    title: 'Harmony of Color and Form',
    image_url: '/products/Harmony_of_Color_and_Form_.webp',
    price: 6890,
    categories: ['wildlife', 'landscapes'],
    description: 'הרמוניה של צבע וצורה, שילוב מושלם של אלמנטים ויזואליים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6890 },
      { dimensions: '50×70 ס"מ', price: 10335 },
      { dimensions: '70×100 ס"מ', price: 13780 },
      { dimensions: '100×150 ס"מ', price: 20670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '17',
    title: 'Harmony of Flight',
    image_url: '/products/Harmony_of_Flight_.webp',
    price: 3120,
    categories: ['wildlife', 'landscapes'],
    description: 'הרמוניה של טיסה, יופי התנועה החופשית באוויר',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3120 },
      { dimensions: '50×70 ס"מ', price: 4680 },
      { dimensions: '70×100 ס"מ', price: 6240 },
      { dimensions: '100×150 ס"מ', price: 9360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '18',
    title: 'Inspiration of Light and Shadow',
    image_url: '/products/Inspiration_of_Light_and_Shadow_.webp',
    price: 7450,
    categories: ['landscapes', 'wildlife'],
    description: 'השראה של אור וצל, משחק דרמטי בין בהירות לחשכה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7450 },
      { dimensions: '50×70 ס"מ', price: 11175 },
      { dimensions: '70×100 ס"מ', price: 14900 },
      { dimensions: '100×150 ס"מ', price: 22350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '19',
    title: 'Investigative Gaze into the Unknown',
    image_url: '/products/Investigative_Gaze_into_the_Unknown_.webp',
    price: 4890,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט חוקר אל הלא נודע, סקרנות טבעית וחיפוש אחר גילויים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4890 },
      { dimensions: '50×70 ס"מ', price: 7335 },
      { dimensions: '70×100 ס"מ', price: 9780 },
      { dimensions: '100×150 ס"מ', price: 14670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '20',
    title: 'Leadership in Shared Steps',
    image_url: '/products/Leadership_in_Shared_Steps_.webp',
    price: 5780,
    categories: ['wildlife', 'landscapes'],
    description: 'מנהיגות בצעדים משותפים, כוח של אחדות ושיתוף פעולה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5780 },
      { dimensions: '50×70 ס"מ', price: 8670 },
      { dimensions: '70×100 ס"מ', price: 11560 },
      { dimensions: '100×150 ס"מ', price: 17340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '21',
    title: "Midnight's Silent Mirror",
    image_url: "/products/Midnight’s_Silent_Mirror_.webp",
    price: 8670,
    categories: ['landscapes', 'wildlife'],
    description: 'מראה שקטה של חצות, השתקפות מושלמת בשעות הלילה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8670 },
      { dimensions: '50×70 ס"מ', price: 13005 },
      { dimensions: '70×100 ס"מ', price: 17340 },
      { dimensions: '100×150 ס"מ', price: 26010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '22',
    title: 'Mystery of the Dunes',
    image_url: '/products/Mystery_of_the_Dunes_.webp',
    price: 6230,
    categories: ['landscapes', 'wildlife'],
    description: 'מסתורין הדיונות, נוף מדברי מרהיב ומלא קסם',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6230 },
      { dimensions: '50×70 ס"מ', price: 9345 },
      { dimensions: '70×100 ס"מ', price: 12460 },
      { dimensions: '100×150 ס"מ', price: 18690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '23',
    title: "Radiance at Journey's End",
    image_url: '/products/Radiance_at_Journey_s_End_.webp',
    price: 9120,
    categories: ['landscapes', 'wildlife'],
    description: 'זוהר בסיום המסע, רגע של הגשמה ואור פנימי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9120 },
      { dimensions: '50×70 ס"מ', price: 13680 },
      { dimensions: '70×100 ס"מ', price: 18240 },
      { dimensions: '100×150 ס"מ', price: 27360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '24',
    title: 'Reflections of a Quiet Soul',
    image_url: '/products/Reflections_of_a_Quiet_Soul_.webp',
    price: 4120,
    categories: ['wildlife', 'landscapes'],
    description: 'השתקפויות של נשמה שקטה, עומק פנימי ושלווה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4120 },
      { dimensions: '50×70 ס"מ', price: 6180 },
      { dimensions: '70×100 ס"מ', price: 8240 },
      { dimensions: '100×150 ס"מ', price: 12360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '25',
    title: 'Ripples of Inquiry',
    image_url: '/products/Ripples_of_Inquiry_.webp',
    price: 2890,
    categories: ['wildlife', 'landscapes'],
    description: 'גלים של חקירה, סקרנות המתפשטת כמו אדוות במים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 2890 },
      { dimensions: '50×70 ס"מ', price: 4335 },
      { dimensions: '70×100 ס"מ', price: 5780 },
      { dimensions: '100×150 ס"מ', price: 8670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '26',
    title: 'Serene Vigil in the Autumn Woods',
    image_url: '/products/Serene_Vigil_in_the_Autumn_Woods_.webp',
    price: 7340,
    categories: ['wildlife', 'landscapes'],
    description: 'משמרת שלווה ביער הסתווי, רוגע בין עלי השלכת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7340 },
      { dimensions: '50×70 ס"מ', price: 11010 },
      { dimensions: '70×100 ס"מ', price: 14680 },
      { dimensions: '100×150 ס"מ', price: 22020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '27',
    title: 'Serenity at the Edge of Day',
    image_url: '/products/Serenity_at_the_Edge_of_Day.webp',
    price: 5120,
    categories: ['landscapes', 'wildlife'],
    description: 'שלווה בקצה היום, רגע מושלם של מעבר בין אור לחשכה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5120 },
      { dimensions: '50×70 ס"מ', price: 7680 },
      { dimensions: '70×100 ס"מ', price: 10240 },
      { dimensions: '100×150 ס"מ', price: 15360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '28',
    title: 'Shadow of the Triumphant Catch',
    image_url: '/products/Shadow_of_the_Triumphant_Catch_.webp',
    price: 6450,
    categories: ['wildlife', 'landscapes'],
    description: 'צל של לכידה מנצחת, רגע של הצלחה בציד',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6450 },
      { dimensions: '50×70 ס"מ', price: 9675 },
      { dimensions: '70×100 ס"מ', price: 12900 },
      { dimensions: '100×150 ס"מ', price: 19350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '29',
    title: 'Silent Alertness in the Wild',
    image_url: '/products/Silent_Alertness_in_the_Wild_.webp',
    price: 3780,
    categories: ['wildlife', 'landscapes'],
    description: 'עירנות שקטה בטבע הפראי, ריכוז מוחלט וחושים מחודדים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3780 },
      { dimensions: '50×70 ס"מ', price: 5670 },
      { dimensions: '70×100 ס"מ', price: 7560 },
      { dimensions: '100×150 ס"מ', price: 11340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '30',
    title: 'Silent Focus in the Depths',
    image_url: '/products/Silent_Focus_in_the_Depths_.webp',
    price: 8890,
    categories: ['wildlife', 'landscapes'],
    description: 'ריכוז שקט במעמקים, התמקדות מוחלטת בעולם התת-מימי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8890 },
      { dimensions: '50×70 ס"מ', price: 13335 },
      { dimensions: '70×100 ס"מ', price: 17780 },
      { dimensions: '100×150 ס"מ', price: 26670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '31',
    title: 'Sovereign of the Silent Heights',
    image_url: '/products/Sovereign_of_the_Silent_Heights_.webp',
    price: 7890,
    categories: ['wildlife', 'landscapes'],
    description: 'ריבון הגבהים השקטים, נוכחות מלכותית בפסגות',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7890 },
      { dimensions: '50×70 ס"מ', price: 11835 },
      { dimensions: '70×100 ס"מ', price: 15780 },
      { dimensions: '100×150 ס"מ', price: 23670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '32',
    title: 'Sovereignty of the Wild',
    image_url: '/products/Sovereignty_of_the_Wild_.webp',
    price: 9670,
    categories: ['wildlife', 'landscapes'],
    description: 'ריבונות הטבע הפראי, עוצמה ושליטה מוחלטת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9670 },
      { dimensions: '50×70 ס"מ', price: 14505 },
      { dimensions: '70×100 ס"מ', price: 19340 },
      { dimensions: '100×150 ס"מ', price: 29010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '33',
    title: 'Stillness on the Mirror',
    image_url: '/products/Stillness_on_the_Mirror_.webp',
    price: 4670,
    categories: ['wildlife', 'landscapes'],
    description: 'דממה על פני המראה, רגע קפוא של שלווה מושלמת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4670 },
      { dimensions: '50×70 ס"מ', price: 7005 },
      { dimensions: '70×100 ס"מ', price: 9340 },
      { dimensions: '100×150 ס"מ', price: 14010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '34',
    title: 'Strength in Unity',
    image_url: '/products/Strength_in_Unity_.webp',
    price: 5890,
    categories: ['wildlife', 'landscapes'],
    description: 'כוח באחדות, עוצמת הקבוצה והשייכות המשותפת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5890 },
      { dimensions: '50×70 ס"מ', price: 8835 },
      { dimensions: '70×100 ס"מ', price: 11780 },
      { dimensions: '100×150 ס"מ', price: 17670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '35',
    title: 'Stride of Survival',
    image_url: '/products/Stride_of_Survival_.webp',
    price: 3230,
    categories: ['wildlife', 'landscapes'],
    description: 'צעד ההישרדות, נחישות ועוצמה במאבק על החיים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3230 },
      { dimensions: '50×70 ס"מ', price: 4845 },
      { dimensions: '70×100 ס"מ', price: 6460 },
      { dimensions: '100×150 ס"מ', price: 9690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '36',
    title: 'Symphony in Gold',
    image_url: '/products/Symphony_in_Gold_.webp',
    price: 8120,
    categories: ['wildlife', 'landscapes'],
    description: 'סימפוניה בזהב, הרמוניה של צבעים חמים ומרהיבים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8120 },
      { dimensions: '50×70 ס"מ', price: 12180 },
      { dimensions: '70×100 ס"מ', price: 16240 },
      { dimensions: '100×150 ס"מ', price: 24360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '37',
    title: 'Tales of Ancestral Roots',
    image_url: '/products/Tales_of_Ancestral_Roots_.webp',
    price: 6780,
    categories: ['tribes', 'landscapes'],
    description: 'סיפורי שורשים קדומים, מורשת וחיבור לעבר',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6780 },
      { dimensions: '50×70 ס"מ', price: 10170 },
      { dimensions: '70×100 ס"מ', price: 13560 },
      { dimensions: '100×150 ס"מ', price: 20340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '38',
    title: 'The Amber Mirror of Instinct',
    image_url: '/products/The_Amber_Mirror_of_Instinct_.webp',
    price: 4450,
    categories: ['wildlife', 'landscapes'],
    description: 'מראה הענבר של האינסטינקט, חושים חדים ותגובה מיידית',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4450 },
      { dimensions: '50×70 ס"מ', price: 6675 },
      { dimensions: '70×100 ס"מ', price: 8900 },
      { dimensions: '100×150 ס"מ', price: 13350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '39',
    title: 'The Ancient Titan of the North',
    image_url: '/products/The_Ancient_Titan_of_the_North_.webp',
    price: 9230,
    categories: ['wildlife', 'landscapes'],
    description: 'הטיטאן הקדום של הצפון, עוצמה ונוכחות היסטורית',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9230 },
      { dimensions: '50×70 ס"מ', price: 13845 },
      { dimensions: '70×100 ס"מ', price: 18460 },
      { dimensions: '100×150 ס"מ', price: 27690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '40',
    title: 'The Apex of the Hunt (1)',
    image_url: '/products/The_Apex_of_the_Hunt_(1).webp',
    price: 7560,
    categories: ['wildlife', 'landscapes'],
    description: 'שיא הציד, רגע של מצוינות ודיוק מושלם',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7560 },
      { dimensions: '50×70 ס"מ', price: 11340 },
      { dimensions: '70×100 ס"מ', price: 15120 },
      { dimensions: '100×150 ס"מ', price: 22680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '41',
    title: 'The Apex of the Hunt',
    image_url: '/products/The_Apex_of_the_Hunt_.webp',
    price: 5670,
    categories: ['wildlife', 'landscapes'],
    description: 'פסגת הציד, שליטה מוחלטת ברגע המכריע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5670 },
      { dimensions: '50×70 ס"מ', price: 8505 },
      { dimensions: '70×100 ס"מ', price: 11340 },
      { dimensions: '100×150 ס"מ', price: 17010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '42',
    title: 'The Boundless Pursuit of Youth',
    image_url: '/products/The_Boundless_Pursuit_of_Youth_.webp',
    price: 3890,
    categories: ['wildlife', 'landscapes'],
    description: 'המרדף הבלתי נגמר של הנעורים, אנרגיה וחיוניות',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3890 },
      { dimensions: '50×70 ס"מ', price: 5835 },
      { dimensions: '70×100 ס"מ', price: 7780 },
      { dimensions: '100×150 ס"מ', price: 11670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '43',
    title: 'The Calculated Stride',
    image_url: '/products/The_Calculated_Stride_.webp',
    price: 6340,
    categories: ['wildlife', 'landscapes'],
    description: 'הצעד המחושב, תכנון מדויק ותנועה מושלמת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6340 },
      { dimensions: '50×70 ס"מ', price: 9510 },
      { dimensions: '70×100 ס"מ', price: 12680 },
      { dimensions: '100×150 ס"מ', price: 19020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '44',
    title: "The Chukar's Dust Storm Reveal",
    image_url: '/products/The_Chukar_s_Dust_Storm_Reveal_.webp',
    price: 4780,
    categories: ['wildlife', 'landscapes'],
    description: 'חשיפת סערת האבק של החוגלה, דרמה טבעית מרהיבה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4780 },
      { dimensions: '50×70 ס"מ', price: 7170 },
      { dimensions: '70×100 ס"מ', price: 9560 },
      { dimensions: '100×150 ס"מ', price: 14340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '45',
    title: 'The Dark Conquest of the Deep',
    image_url: '/products/The_Dark_Conquest_of_the_Deep_.webp',
    price: 8450,
    categories: ['wildlife', 'landscapes'],
    description: 'כיבוש החושך במעמקים, שליטה בעולם התת-מימי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8450 },
      { dimensions: '50×70 ס"מ', price: 12675 },
      { dimensions: '70×100 ס"מ', price: 16900 },
      { dimensions: '100×150 ס"מ', price: 25350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '46',
    title: "The Desert's Golden Gaze",
    image_url: "/products/The_Desert’s_Golden_Gaze.webp",
    price: 5230,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט הזהב המדברי, עיניים חודרות בלב החולות',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5230 },
      { dimensions: '50×70 ס"מ', price: 7845 },
      { dimensions: '70×100 ס"מ', price: 10460 },
      { dimensions: '100×150 ס"מ', price: 15690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '47',
    title: "The Desert's Last Sentinel",
    image_url: "/products/The_Desert’s_Last_Sentinel_.webp",
    price: 7120,
    categories: ['wildlife', 'landscapes'],
    description: 'הזקיף האחרון של המדבר, שומר בודד על הארץ היבשה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7120 },
      { dimensions: '50×70 ס"מ', price: 10680 },
      { dimensions: '70×100 ס"מ', price: 14240 },
      { dimensions: '100×150 ס"מ', price: 21360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '48',
    title: 'The Earthbound Legacy of the Himba',
    image_url: '/products/The_Earthbound_Legacy_of_the_Himba_.webp',
    price: 9560,
    categories: ['tribes', 'landscapes'],
    description: 'המורשת הארצית של ההימבה, חיבור עמוק לאדמה ולמסורת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9560 },
      { dimensions: '50×70 ס"מ', price: 14340 },
      { dimensions: '70×100 ס"מ', price: 19120 },
      { dimensions: '100×150 ס"מ', price: 28680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '49',
    title: 'The Emerald Ancestor of the Wild',
    image_url: '/products/The_Emerald_Ancestor_of_the_Wild_.webp',
    price: 6890,
    categories: ['wildlife', 'landscapes'],
    description: 'האב הקדמון האזמרגדי של הטבע, חוכמה עתיקה בגוון ירוק',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6890 },
      { dimensions: '50×70 ס"מ', price: 10335 },
      { dimensions: '70×100 ס"מ', price: 13780 },
      { dimensions: '100×150 ס"מ', price: 20670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '50',
    title: 'The Emerald Prism',
    image_url: '/products/The_Emerald_Prism_.webp',
    price: 4120,
    categories: ['wildlife', 'landscapes'],
    description: 'הפריזמה האזמרגדית, שבירת אור ביופי הטבעי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4120 },
      { dimensions: '50×70 ס"מ', price: 6180 },
      { dimensions: '70×100 ס"מ', price: 8240 },
      { dimensions: '100×150 ס"מ', price: 12360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '51',
    title: 'The Final Encounter',
    image_url: '/products/The_Final_Encounter_.webp',
    price: 8780,
    categories: ['wildlife', 'landscapes'],
    description: 'המפגש האחרון, רגע דרמטי ומכריע בטבע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8780 },
      { dimensions: '50×70 ס"מ', price: 13170 },
      { dimensions: '70×100 ס"מ', price: 17560 },
      { dimensions: '100×150 ס"מ', price: 26340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '52',
    title: 'The Gaze of Ancient Wisdom',
    image_url: '/products/The_Gaze_of_Ancient_Wisdom_.webp',
    price: 7340,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט החוכמה הקדומה, עיניים המספרות אלף סיפורים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7340 },
      { dimensions: '50×70 ס"מ', price: 11010 },
      { dimensions: '70×100 ס"מ', price: 14680 },
      { dimensions: '100×150 ס"מ', price: 22020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '53',
    title: 'The Gaze of Pure Innocence',
    image_url: '/products/The_Gaze_of_Pure_Innocence_.webp',
    price: 2780,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט התמימות הטהורה, עיניים מלאות תום ופליאה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 2780 },
      { dimensions: '50×70 ס"מ', price: 4170 },
      { dimensions: '70×100 ס"מ', price: 5560 },
      { dimensions: '100×150 ס"מ', price: 8340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '54',
    title: 'The Gaze of the Golden King',
    image_url: '/products/The_Gaze_of_the_Golden_King.webp',
    price: 9890,
    categories: ['wildlife', 'landscapes'],
    description: 'מבט המלך הזהוב, עוצמה ומלכותיות בכל פרט',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9890 },
      { dimensions: '50×70 ס"מ', price: 14835 },
      { dimensions: '70×100 ס"מ', price: 19780 },
      { dimensions: '100×150 ס"מ', price: 29670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '55',
    title: 'The Gilded Echo of Sustenance',
    image_url: '/products/The_Gilded_Echo_of_Sustenance_.webp',
    price: 5450,
    categories: ['wildlife', 'landscapes'],
    description: 'ההד המוזהב של הקיום, מחזור החיים והטבע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5450 },
      { dimensions: '50×70 ס"מ', price: 8175 },
      { dimensions: '70×100 ס"מ', price: 10900 },
      { dimensions: '100×150 ס"מ', price: 16350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '56',
    title: 'The Gilded Roar',
    image_url: '/products/The_Gilded_Roar_.webp',
    price: 8230,
    categories: ['wildlife', 'landscapes'],
    description: 'השאגה המוזהבת, קול העוצמה מהדהד בסביבה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8230 },
      { dimensions: '50×70 ס"מ', price: 12345 },
      { dimensions: '70×100 ס"מ', price: 16460 },
      { dimensions: '100×150 ס"מ', price: 24690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '57',
    title: 'The Gilded Sip of Survival',
    image_url: '/products/The_Gilded_Sip_of_Survival_.webp',
    price: 4670,
    categories: ['wildlife', 'landscapes'],
    description: 'לגימת ההישרדות המוזהבת, רגע של התחדשות',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4670 },
      { dimensions: '50×70 ס"מ', price: 7005 },
      { dimensions: '70×100 ס"מ', price: 9340 },
      { dimensions: '100×150 ס"מ', price: 14010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '58',
    title: 'The Golden Majesty of the Savannah',
    image_url: '/products/The_Golden_Majesty_of_the_Savannah_.webp',
    price: 9120,
    categories: ['wildlife', 'landscapes'],
    description: 'הוד הזהב של הסוואנה, מלכות בלב אפריקה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9120 },
      { dimensions: '50×70 ס"מ', price: 13680 },
      { dimensions: '70×100 ס"מ', price: 18240 },
      { dimensions: '100×150 ס"מ', price: 27360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '59',
    title: 'The Golden Streak of Speed',
    image_url: '/products/The_Golden_Streak_of_Speed_.webp',
    price: 6560,
    categories: ['wildlife', 'landscapes'],
    description: 'פס הזהב של המהירות, תנועה בזק במרחבי הטבע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6560 },
      { dimensions: '50×70 ס"מ', price: 9840 },
      { dimensions: '70×100 ס"מ', price: 13120 },
      { dimensions: '100×150 ס"מ', price: 19680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '60',
    title: "The Guardian's Silent Watch",
    image_url: "/products/The_Guardian’s_Silent_Watch_.webp",
    price: 7890,
    categories: ['wildlife', 'landscapes'],
    description: 'משמרת השומר השקטה, ערנות מתמדת בשתיקה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7890 },
      { dimensions: '50×70 ס"מ', price: 11835 },
      { dimensions: '70×100 ס"מ', price: 15780 },
      { dimensions: '100×150 ס"מ', price: 23670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '61',
    title: "The Huntress's Quiet Resolve",
    image_url: "/products/The_Huntress’s_Quiet_Resolve.webp",
    price: 5780,
    categories: ['wildlife', 'landscapes'],
    description: 'הנחישות השקטה של הציידת, ריכוז לפני הפעולה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5780 },
      { dimensions: '50×70 ס"מ', price: 8670 },
      { dimensions: '70×100 ס"מ', price: 11560 },
      { dimensions: '100×150 ס"מ', price: 17340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '62',
    title: "The Hyena's Golden Devotion",
    image_url: '/products/The_Hyena_s_Golden_Devotion_.webp',
    price: 3450,
    categories: ['wildlife', 'landscapes'],
    description: 'המסירות הזהובה של הצבוע, נאמנות למשפחה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3450 },
      { dimensions: '50×70 ס"מ', price: 5175 },
      { dimensions: '70×100 ס"מ', price: 6900 },
      { dimensions: '100×150 ס"מ', price: 10350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '63',
    title: 'The Instant Challenge',
    image_url: '/products/The_Instant_Challenge_.webp',
    price: 6120,
    categories: ['wildlife', 'landscapes'],
    description: 'האתגר המיידי, עימות פתאומי בעולם החי',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6120 },
      { dimensions: '50×70 ס"מ', price: 9180 },
      { dimensions: '70×100 ס"מ', price: 12240 },
      { dimensions: '100×150 ס"מ', price: 18360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '64',
    title: 'The Invisible Watcher of the Night',
    image_url: '/products/The_Invisible_Watcher_of_the_Night_.webp',
    price: 8340,
    categories: ['wildlife', 'landscapes'],
    description: 'הצופה הבלתי נראה של הלילה, נוכחות סמויה בחשכה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8340 },
      { dimensions: '50×70 ס"מ', price: 12510 },
      { dimensions: '70×100 ס"מ', price: 16680 },
      { dimensions: '100×150 ס"מ', price: 25020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '65',
    title: "The Lynx's Intuition",
    image_url: '/products/The_Lynx_s_Intuition_.webp',
    price: 4890,
    categories: ['wildlife', 'landscapes'],
    description: 'האינטואיציה של השונר, חושים מחודדים ותפיסה עמוקה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4890 },
      { dimensions: '50×70 ס"מ', price: 7335 },
      { dimensions: '70×100 ס"מ', price: 9780 },
      { dimensions: '100×150 ס"מ', price: 14670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '66',
    title: "The Lynx's Calculating Gaze",
    image_url: "/products/The_Lynx’s_Calculating_Gaze_.webp",
    price: 7230,
    categories: ['wildlife', 'landscapes'],
    description: 'המבט המחשב של השונר, תכנון קר ומדויק',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7230 },
      { dimensions: '50×70 ס"מ', price: 10845 },
      { dimensions: '70×100 ס"מ', price: 14460 },
      { dimensions: '100×150 ס"מ', price: 21690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '67',
    title: 'The Monolithic Mirror of Night',
    image_url: '/products/The_Monolithic_Mirror_of_Night_.webp',
    price: 9450,
    categories: ['landscapes', 'wildlife'],
    description: 'המראה המונוליתית של הלילה, השתקפות אינסופית בחשכה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9450 },
      { dimensions: '50×70 ס"מ', price: 14175 },
      { dimensions: '70×100 ס"מ', price: 18900 },
      { dimensions: '100×150 ס"מ', price: 28350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '68',
    title: "The Night's Golden Sentinel",
    image_url: "/products/The_Night’s_Golden_Sentinel_(1).webp",
    price: 5670,
    categories: ['wildlife', 'landscapes'],
    description: 'הזקיף הזהוב של הלילה, שמירה בשעות החשכה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5670 },
      { dimensions: '50×70 ס"מ', price: 8505 },
      { dimensions: '70×100 ס"מ', price: 11340 },
      { dimensions: '100×150 ס"מ', price: 17010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '69',
    title: "The Night's Golden Sentinel",
    image_url: "/products/The_Night’s_Golden_Sentinel_(2).webp",
    price: 6340,
    categories: ['wildlife', 'landscapes'],
    description: 'השומר הזהוב בליל, נוכחות מרשימה באור הירח',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6340 },
      { dimensions: '50×70 ס"מ', price: 9510 },
      { dimensions: '70×100 ס"מ', price: 12680 },
      { dimensions: '100×150 ס"מ', price: 19020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '70',
    title: "The Night's Golden Sentinel",
    image_url: "/products/The_Night’s_Golden_Sentinel_.webp",
    price: 7890,
    categories: ['wildlife', 'landscapes'],
    description: 'שומר הזהב של הלילה, מלכותיות בשעות האפלה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7890 },
      { dimensions: '50×70 ס"מ', price: 11835 },
      { dimensions: '70×100 ס"מ', price: 15780 },
      { dimensions: '100×150 ס"מ', price: 23670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '71',
    title: 'The Obsidian Voyager',
    image_url: '/products/The_Obsidian_Voyager_.webp',
    price: 8120,
    categories: ['wildlife', 'landscapes'],
    description: 'המטייל השחור, מסע דרך עולמות אפלים ומסתוריים',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8120 },
      { dimensions: '50×70 ס"מ', price: 12180 },
      { dimensions: '70×100 ס"מ', price: 16240 },
      { dimensions: '100×150 ס"מ', price: 24360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '72',
    title: 'The Precision of the Descent',
    image_url: '/products/The_Precision_of_the_Descent_.webp',
    price: 4560,
    categories: ['wildlife', 'landscapes'],
    description: 'דיוק הירידה, שליטה מושלמת בכל תנועה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4560 },
      { dimensions: '50×70 ס"מ', price: 6840 },
      { dimensions: '70×100 ס"מ', price: 9120 },
      { dimensions: '100×150 ס"מ', price: 13680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '73',
    title: 'The Precision Strike',
    image_url: '/products/The_Precision_Strike_.webp',
    price: 6780,
    categories: ['wildlife', 'landscapes'],
    description: 'המכה המדויקת, רגע של שליטה מוחלטת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6780 },
      { dimensions: '50×70 ס"מ', price: 10170 },
      { dimensions: '70×100 ס"מ', price: 13560 },
      { dimensions: '100×150 ס"מ', price: 20340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '74',
    title: 'The Pulse of Instinct',
    image_url: '/products/The_Pulse_of_Instinct.webp',
    price: 5340,
    categories: ['wildlife', 'landscapes'],
    description: 'פעימת האינסטינקט, תגובה מיידית ובלתי מודעת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5340 },
      { dimensions: '50×70 ס"מ', price: 8010 },
      { dimensions: '70×100 ס"מ', price: 10680 },
      { dimensions: '100×150 ס"מ', price: 16020 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '75',
    title: 'The Resilience of the Shadows',
    image_url: '/products/The_Resilience_of_the_Shadows_.webp',
    price: 7120,
    categories: ['wildlife', 'landscapes'],
    description: 'החוסן של הצללים, עוצמה בלתי נראית',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7120 },
      { dimensions: '50×70 ס"מ', price: 10680 },
      { dimensions: '70×100 ס"מ', price: 14240 },
      { dimensions: '100×150 ס"מ', price: 21360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '76',
    title: 'The Sculpted Heritage of Himba',
    image_url: '/products/The_Sculpted_Heritage_of_Himba_.webp',
    price: 8670,
    categories: ['tribes', 'landscapes'],
    description: 'המורשת המפוסלת של ההימבה, יופי מסורתי ועתיק',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8670 },
      { dimensions: '50×70 ס"מ', price: 13005 },
      { dimensions: '70×100 ס"מ', price: 17340 },
      { dimensions: '100×150 ס"מ', price: 26010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '77',
    title: 'The Shadowed Sentinel',
    image_url: '/products/The_Shadowed_Sentinel_.webp',
    price: 4230,
    categories: ['wildlife', 'landscapes'],
    description: 'הזקיף בצל, שמירה מוסתרת על הטריטוריה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4230 },
      { dimensions: '50×70 ס"מ', price: 6345 },
      { dimensions: '70×100 ס"מ', price: 8460 },
      { dimensions: '100×150 ס"מ', price: 12690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '78',
    title: "The Soul's Unwavering Gaze",
    image_url: "/products/The_Soul’s_Unwavering_Gaze_.webp",
    price: 9230,
    categories: ['wildlife', 'landscapes'],
    description: 'המבט הבלתי מתפשר של הנשמה, עוצמה פנימית מוחלטת',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9230 },
      { dimensions: '50×70 ס"מ', price: 13845 },
      { dimensions: '70×100 ס"מ', price: 18460 },
      { dimensions: '100×150 ס"מ', price: 27690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '79',
    title: 'The Sovereign Stride',
    image_url: '/products/The_Sovereign_Stride_.webp',
    price: 6890,
    categories: ['wildlife', 'landscapes'],
    description: 'הצעד הריבוני, הליכה מלכותית ובטוחה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6890 },
      { dimensions: '50×70 ס"מ', price: 10335 },
      { dimensions: '70×100 ס"מ', price: 13780 },
      { dimensions: '100×150 ס"מ', price: 20670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '80',
    title: "The Sovereign's Roar",
    image_url: '/products/The_Sovereign_s_Roar_.webp',
    price: 7560,
    categories: ['wildlife', 'landscapes'],
    description: 'שאגת הריבון, קול העוצמה שמהדהד במרחב',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7560 },
      { dimensions: '50×70 ס"מ', price: 11340 },
      { dimensions: '70×100 ס"מ', price: 15120 },
      { dimensions: '100×150 ס"מ', price: 22680 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '81',
    title: "The Sovereign's Descent",
    image_url: "/products/The_Sovereign’s_Descent.webp",
    price: 5120,
    categories: ['wildlife', 'landscapes'],
    description: 'ירידת הריבון, תנועה חינית מלאת עוצמה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5120 },
      { dimensions: '50×70 ס"מ', price: 7680 },
      { dimensions: '70×100 ס"מ', price: 10240 },
      { dimensions: '100×150 ס"מ', price: 15360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '82',
    title: 'The Storm of Success',
    image_url: '/products/The_Storm_of_Success_.webp',
    price: 8450,
    categories: ['wildlife', 'landscapes'],
    description: 'סערת ההצלחה, רגע של ניצחון מוחלט',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 8450 },
      { dimensions: '50×70 ס"מ', price: 12675 },
      { dimensions: '70×100 ס"מ', price: 16900 },
      { dimensions: '100×150 ס"מ', price: 25350 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '83',
    title: 'The Strike of Destiny',
    image_url: '/products/The_Strike_of_Destiny_.webp',
    price: 6120,
    categories: ['wildlife', 'landscapes'],
    description: 'מכת הגורל, רגע מכריע שמשנה הכל',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 6120 },
      { dimensions: '50×70 ס"מ', price: 9180 },
      { dimensions: '70×100 ס"מ', price: 12240 },
      { dimensions: '100×150 ס"מ', price: 18360 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '84',
    title: "The Sun's Final Greeting",
    image_url: "/products/The_Sun’s_Final_Greeting_.webp",
    price: 3780,
    categories: ['landscapes', 'wildlife'],
    description: 'ברכת השמש האחרונה, פרידה זהובה מהיום',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 3780 },
      { dimensions: '50×70 ס"מ', price: 5670 },
      { dimensions: '70×100 ס"מ', price: 7560 },
      { dimensions: '100×150 ס"מ', price: 11340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '85',
    title: 'The Torrent of the Catch',
    image_url: '/products/The_Torrent_of_the_Catch_.webp',
    price: 7230,
    categories: ['wildlife', 'landscapes'],
    description: 'מפל הלכידה, דרמה של מים ותנועה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 7230 },
      { dimensions: '50×70 ס"מ', price: 10845 },
      { dimensions: '70×100 ס"מ', price: 14460 },
      { dimensions: '100×150 ס"מ', price: 21690 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '86',
    title: 'The Wild Grin of Kinship',
    image_url: '/products/The_Wild_Grin_of_Kinship_.webp',
    price: 4670,
    categories: ['wildlife', 'landscapes'],
    description: 'החיוך הפראי של הקרבה, קשר משפחתי בטבע',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 4670 },
      { dimensions: '50×70 ס"מ', price: 7005 },
      { dimensions: '70×100 ס"מ', price: 9340 },
      { dimensions: '100×150 ס"מ', price: 14010 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '87',
    title: 'Uncompromising Persistence',
    image_url: '/products/Uncompromising_Persistence.webp',
    price: 5890,
    categories: ['wildlife', 'landscapes'],
    description: 'התמדה בלתי מתפשרת, נחישות שאינה יודעת כניעה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 5890 },
      { dimensions: '50×70 ס"מ', price: 8835 },
      { dimensions: '70×100 ס"מ', price: 11780 },
      { dimensions: '100×150 ס"מ', price: 17670 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  },
  {
    id: '88',
    title: 'Vision Beyond the Horizon',
    image_url: '/products/Vision_Beyond_the_Horizon_.webp',
    price: 9780,
    categories: ['wildlife', 'landscapes'],
    description: 'חזון מעבר לאופק, מבט לעתיד רחוק ומלא תקווה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 9780 },
      { dimensions: '50×70 ס"מ', price: 14670 },
      { dimensions: '70×100 ס"מ', price: 19560 },
      { dimensions: '100×150 ס"מ', price: 29340 }
    ],
    materials: [
      { type: 'קנבס קלאסי', priceModifier: 1 },
      { type: 'קנבס פרימיום', priceModifier: 1.3 },
      { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
    ]
  }
];

export default function Gallery() {
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 10000
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Get category from URL and load products
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.category === 'all' || product.categories.includes(filters.category);
    const priceMatch = product.price <= filters.maxPrice;
    return categoryMatch && priceMatch;
  });

  const handleAddToCart = (product) => {
    // This will be handled by the layout's cart context
    const event = new CustomEvent('addToCart', { detail: product });
    window.dispatchEvent(event);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCartFromModal = (productWithSize) => {
    const event = new CustomEvent('addToCart', { detail: productWithSize });
    window.dispatchEvent(event);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <ParticleField className="absolute inset-0 opacity-50" interactive={false} density={20} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            dir="rtl"
          >
            <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
              הגלריה
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-[#f5f5f0] mt-4">
              כל היצירות
            </h1>
            <p className="text-[#8b7355] mt-4 max-w-md mx-auto">
              גלה את אוסף היצירות המלא שלנו ובחר את הקנבס המושלם לבית שלך
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"
        />
      </section>

      {/* Mobile Filter Button & Drawer - Always rendered */}
      <GalleryFilters
        filters={filters}
        onFilterChange={setFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Gallery Section */}
      <section className="py-12 pb-32">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop Only (renders desktop version) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <GalleryFilters
                filters={filters}
                onFilterChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                desktopOnly
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Price Range Filter - Above Pictures */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-[#0d0d0d]/60 backdrop-blur-xl rounded-2xl border border-[#1a1a1a] p-4"
                dir="rtl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <h4 className="text-[#8b7355] text-sm whitespace-nowrap">טווח מחירים:</h4>
                    <span className="text-[#d4af37] text-sm whitespace-nowrap sm:hidden">עד ₪{(filters.maxPrice || 10000).toLocaleString()}</span>
                  </div>
                  <div className="flex-1 px-2">
                    <Slider
                      defaultValue={[filters.maxPrice || 10000]}
                      max={10000}
                      min={500}
                      step={100}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, maxPrice: value[0] }))}
                      className="[&_[role=slider]]:bg-[#d4af37] [&_[role=slider]]:border-none [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_.relative]:bg-[#2a2a2a] [&_[data-orientation=horizontal]>.bg-primary]:bg-[#d4af37]"
                    />
                  </div>
                  <span className="text-[#d4af37] text-sm whitespace-nowrap hidden sm:block">עד ₪{(filters.maxPrice || 10000).toLocaleString()}</span>
                </div>
              </motion.div>

              {/* Mobile Active Category Filter */}
              {filters.category && filters.category !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:hidden mb-4 flex items-center gap-2"
                  dir="rtl"
                >
                  <span className="text-[#8b7355] text-sm">מסונן לפי:</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4af37]/20 text-[#d4af37] text-sm rounded-full border border-[#d4af37]/30">
                    {filters.category === 'wildlife' && 'חיות'}
                    {filters.category === 'landscapes' && 'נופים'}
                    {filters.category === 'Authenticity' && 'אותנטיות'}
                    {filters.category === 'Drama' && 'דרמה'}
                    {filters.category === 'Vision' && 'חזון'}
                    {filters.category === 'Fear' && 'חשש'}
                    {filters.category === 'Naturalness' && 'טבעיות'}
                    {filters.category === 'Focus' && 'מיקוד'}
                    {filters.category === 'Determination' && 'נחישות'}
                    {filters.category === 'Curiosity' && 'סקרנות'}
                    {filters.category === 'Power' && 'עוצמה'}
                    {filters.category === 'Peace' && 'שלווה'}
                    {filters.category === 'Wholeness' && 'שלמות'}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </motion.div>
              )}

              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 flex items-center justify-between"
                dir="rtl"
              >
                <p className="text-[#8b7355]">
                  <motion.span
                    key={filteredProducts.length}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#d4af37] font-medium"
                  >
                    {filteredProducts.length}
                  </motion.span>
                  {' '}תוצאות נמצאו
                </p>
              </motion.div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-32">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-8 h-8 text-[#d4af37]" />
                  </motion.div>
                </div>
              )}

              {/* Products */}
              {!isLoading && (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard
                          product={product}
                          onQuickView={handleQuickView}
                          onAddToCart={handleAddToCart}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Empty State */}
              {!isLoading && filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32"
                  dir="rtl"
                >
                  <p className="text-[#8b7355] text-lg">לא נמצאו תוצאות</p>
                  <p className="text-[#5a5a5a] text-sm mt-2">נסו לשנות את הפילטרים</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCartFromModal}
      />
    </div>
  );
}