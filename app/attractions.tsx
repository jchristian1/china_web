"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Attraction = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  time: string;
  best: string;
  price: string;
  planned: boolean;
  link: string;
  linkLabel: string;
  credit?: string;
  creditUrl?: string;
};

type CityGuide = {
  city: string;
  subtitle: string;
  countLabel: string;
  places: Attraction[];
};

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const klook = (query: string) =>
  `https://www.klook.com/en-US/search/result/?query=${encodeURIComponent(query)}`;

const commons = (query: string) =>
  `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(query)}`;

const guides: CityGuide[] = [
  {
    city: "Shanghai",
    subtitle: "Old lanes, impossible skylines and the Huangpu after dark.",
    countLabel: "10 essential places · 7 already timed",
    places: [
      {
        id: "sh-bund",
        name: "The Bund",
        image: "/attractions/sh-bund.webp",
        alt: "The historic Bund promenade and Shanghai skyline",
        description: "Shanghai’s defining contrast: grand early-20th-century façades on one bank and the futuristic Lujiazui skyline on the other. Golden hour turns it cinematic.",
        time: "1½–2 hr",
        best: "16:15 → blue hour",
        price: "Free",
        planned: true,
        link: maps("The Bund Shanghai"),
        linkLabel: "Open map",
      },
      {
        id: "sh-yu",
        name: "Yu Garden",
        image: "/attractions/sh-yu.webp",
        alt: "Classical pavilions and ponds inside Yu Garden",
        description: "A compact Ming-style world of rockeries, ponds, carved corridors and rooflines. Go early, then step into the old-city food lanes for xiaolongbao.",
        time: "1½–2 hr",
        best: "First morning slot",
        price: "CNY 40 · ≈ $6",
        planned: true,
        link: "https://us.trip.com/travel-guide/attraction/shanghai/yu-garden-75615/",
        linkLabel: "Tickets / details",
      },
      {
        id: "sh-tower",
        name: "Shanghai Tower",
        image: "/attractions/sh-tower.webp",
        alt: "Shanghai Tower rising above Lujiazui",
        description: "The 118th-floor observatory makes the scale of the city legible. The sweet spot is late afternoon: daylight, sunset and the first lights on one ticket.",
        time: "1½ hr",
        best: "15:30 timed entry",
        price: "CNY 180 · ≈ $27",
        planned: true,
        link: "https://www.klook.com/en-US/activity/4333-shanghai-tower-observation-deck-shanghai/",
        linkLabel: "Check tickets",
      },
      {
        id: "sh-french",
        name: "French Concession + Wukang Road",
        image: "/attractions/sh-french.webp",
        alt: "The historic red-brick Wukang Mansion in Shanghai",
        description: "Leafy plane trees, design stores, coffee windows and Hudec architecture make this Shanghai’s best unhurried neighborhood walk. Wukang Mansion is the visual anchor.",
        time: "2½–3 hr",
        best: "After lunch",
        price: "Free",
        planned: true,
        link: maps("Wukang Mansion Shanghai"),
        linkLabel: "Open walking area",
      },
      {
        id: "sh-museum",
        name: "Shanghai Museum",
        image: "/attractions/sh-museum.webp",
        alt: "Shanghai Museum at People's Square",
        description: "One of China’s strongest collections of bronzes, ceramics, calligraphy and painting. A focused two-hour visit beats trying to see every gallery.",
        time: "2 hr",
        best: "Opening time",
        price: "Free · reserve",
        planned: true,
        link: "https://www.shanghaimuseum.net/mu/frontend/pg/en/index",
        linkLabel: "Official museum",
      },
      {
        id: "sh-nanjing",
        name: "Nanjing Road",
        image: "/attractions/sh-nanjing.webp",
        alt: "Nanjing Road and central Shanghai seen from above",
        description: "Shanghai’s classic commercial spine mixes neon, heritage department stores and People’s Square. It works best as a promenade, not a shopping mission.",
        time: "1½–2 hr",
        best: "Lunch to late afternoon",
        price: "Free",
        planned: true,
        link: maps("Nanjing Road Pedestrian Street Shanghai"),
        linkLabel: "Open map",
      },
      {
        id: "sh-zhujiajiao",
        name: "Zhujiajiao Water Town",
        image: "/attractions/sh-zhujiajiao.webp",
        alt: "Canals and stone bridges in Zhujiajiao Water Town",
        description: "Stone bridges, canals and low whitewashed houses create the classic Jiangnan water-town scene. Beautiful, but it requires a half day outside central Shanghai.",
        time: "5–6 hr return",
        best: "Weekday morning",
        price: "Town free · tours extra",
        planned: false,
        link: klook("Zhujiajiao Water Town Shanghai"),
        linkLabel: "Compare day trips",
      },
      {
        id: "sh-jade",
        name: "Jade Buddha Temple",
        image: "/attractions/sh-jade.webp",
        alt: "Traditional hall at Shanghai's Jade Buddha Temple",
        description: "A living Buddhist temple whose quiet courtyards offer a reset from the city. The pale jade seated Buddha is the centerpiece; modest dress is best.",
        time: "1–1½ hr",
        best: "Early morning",
        price: "Low-cost · verify",
        planned: false,
        link: maps("Jade Buddha Temple Shanghai"),
        linkLabel: "Map & current hours",
      },
      {
        id: "sh-tianzifang",
        name: "Tianzifang",
        image: "/attractions/sh-tianzifang.webp",
        alt: "Narrow leafy lane in Shanghai's Tianzifang",
        description: "A photogenic maze of shikumen lanes, studios, snacks and tiny bars. It is touristy, but the layered brick alleys still feel distinctly Shanghai.",
        time: "1½ hr",
        best: "Late afternoon",
        price: "Free",
        planned: false,
        link: maps("Tianzifang Shanghai"),
        linkLabel: "Open map",
      },
      {
        id: "sh-huangpu",
        name: "Huangpu River Night Cruise",
        image: "/attractions/sh-huangpu.webp",
        alt: "The Huangpu River dividing central Shanghai",
        description: "The easiest way to see the Bund and Pudong illuminated together. Choose a straightforward 45–60 minute sailing and skip dinner-cruise upsells.",
        time: "1½ hr with boarding",
        best: "20:00 sailing",
        price: "$16–22 pp",
        planned: true,
        link: "https://www.klook.com/en-US/activity/3973-hangpu-river-cruise-shanghai/",
        linkLabel: "Check sailings",
      },
    ],
  },
  {
    city: "Zhangjiajie",
    subtitle: "Sandstone pillars, cloud roads and the mountain days worth protecting.",
    countLabel: "10 signature places · all built into the flex plan",
    places: [
      {
        id: "zjj-yuan",
        name: "Yuanjiajie + Hallelujah Mountain",
        image: "/attractions/zjj-yuan.webp",
        alt: "Sandstone pillars in Zhangjiajie National Forest Park",
        description: "The park’s headline landscape: thousands of quartz-sandstone towers, deep green ravines and the pillar associated with Avatar. Clear visibility matters more than a rigid date.",
        time: "3–4 hr",
        best: "Morning after fog lifts",
        price: "Park bundle ≈ $67–72",
        planned: true,
        link: "https://www.klook.com/en-US/activity/101803-zhangjiajie-national-forest-park/",
        linkLabel: "Park ticket bundle",
      },
      {
        id: "zjj-tianzi",
        name: "Tianzi Mountain",
        image: "/attractions/zjj-tianzi.webp",
        alt: "Misty sandstone peaks at Tianzi Mountain",
        description: "A higher, wilder panorama where vertical peaks vanish into cloud. The ridge and cableway pair naturally with Yuanjiajie in one long but elegant park day.",
        time: "2½–3 hr",
        best: "Early afternoon",
        price: "Park entry + cableway",
        planned: true,
        link: "https://www.klook.com/en-US/activity/101803-zhangjiajie-national-forest-park/",
        linkLabel: "Verify inclusions",
      },
      {
        id: "zjj-bailong",
        name: "Bailong Elevator",
        image: "/attractions/zjj-bailong.webp",
        alt: "Bailong glass elevator built against Zhangjiajie cliffs",
        description: "A spectacular glass lift bolted to the cliff face. The ride is brief; its real value is moving the group from the valley to Yuanjiajie without a punishing climb.",
        time: "30–60 min with queue",
        best: "Before tour groups",
        price: "Add-on ≈ CNY 72 one way",
        planned: true,
        link: klook("Bailong Elevator Zhangjiajie"),
        linkLabel: "Tickets / bundles",
      },
      {
        id: "zjj-golden",
        name: "Golden Whip Stream",
        image: "/attractions/zjj-golden.webp",
        alt: "A clear stream running through lush Zhangjiajie forest",
        description: "A level, forested valley walk beside clear water and below the pillars. It is the best recovery landscape after summit days and works well in light mist.",
        time: "2–3 hr segment",
        best: "Quiet morning",
        price: "Included with park entry",
        planned: true,
        link: maps("Golden Whip Stream Zhangjiajie"),
        linkLabel: "Open trail area",
        credit: "Our China Story",
        creditUrl: "https://www.ourchinastory.com/en/15025/",
      },
      {
        id: "zjj-tianmen",
        name: "Tianmen Mountain",
        image: "/attractions/zjj-tianmen.webp",
        alt: "The long stairway and natural arch at Tianmen Mountain",
        description: "One of China’s great mountain journeys: an extraordinary cableway, cliff walks, glass sections and the huge natural arch. Give it the clearest forecast of the stay.",
        time: "6–7 hr",
        best: "First clear day",
        price: "≈ $40 pp",
        planned: true,
        link: "https://www.klook.com/en-US/activity/6613-tianmen-mountain-cable-car-gallery-road-zhangjiajie/",
        linkLabel: "Check route tickets",
      },
      {
        id: "zjj-cave",
        name: "Tianmen Cave + 999 Steps",
        image: "/attractions/zjj-cave.webp",
        alt: "Road and cliffs leading toward Tianmen Cave",
        description: "The monumental opening in the mountain is the dramatic finale to Tianmen. The 999 stairs are optional—escalators reduce the strain without losing the view.",
        time: "1½–2 hr within Tianmen",
        best: "Early afternoon",
        price: "Included in route ticket",
        planned: true,
        link: "https://www.klook.com/en-US/activity/6613-tianmen-mountain-cable-car-gallery-road-zhangjiajie/",
        linkLabel: "Check route map",
      },
      {
        id: "zjj-glass",
        name: "Grand Canyon Glass Bridge",
        image: "/attractions/zjj-glass.webp",
        alt: "Glass bridge spanning Zhangjiajie Grand Canyon",
        description: "A transparent span suspended above the canyon, followed by a scenic descent if conditions permit. Wind closures happen, so verify before the driver leaves the hotel.",
        time: "3–4 hr",
        best: "09:00 entry",
        price: "$25–38 pp",
        planned: true,
        link: "https://www.klook.com/en-US/activity/6602-grand-canyon-glass-bridge-tickets-zhangjiajie/",
        linkLabel: "Check ticket types",
      },
      {
        id: "zjj-baofeng",
        name: "Baofeng Lake",
        image: "/attractions/zjj-baofeng.webp",
        alt: "Misty mountains reflected in Baofeng Lake",
        description: "A calm boat ride inside a steep green basin. This is the smart easier-afternoon choice when the group wants scenery without another demanding hike.",
        time: "2–2½ hr",
        best: "Afternoon flex slot",
        price: "≈ $16–20 pp",
        planned: true,
        link: klook("Baofeng Lake Zhangjiajie"),
        linkLabel: "Check tickets",
      },
      {
        id: "zjj-yellow",
        name: "Yellow Dragon Cave",
        image: "/attractions/zjj-yellow.webp",
        alt: "Illuminated limestone formations in Yellow Dragon Cave",
        description: "An immense karst cave of underground halls, rivers and illuminated formations. It is more theatrical than subtle, and the better wet-weather alternative.",
        time: "2½–3 hr",
        best: "Rainy afternoon",
        price: "≈ $14–18 pp",
        planned: false,
        link: klook("Yellow Dragon Cave Zhangjiajie"),
        linkLabel: "Check tickets",
      },
      {
        id: "zjj-72",
        name: "72 Qilou",
        image: "/attractions/zjj-72.webp",
        alt: "The illuminated stilt-house towers of 72 Qilou at night",
        description: "A contemporary cultural quarter built as a glowing vertical Tujia-style spectacle. Go for photographs, snacks and atmosphere—not for an untouched historic district.",
        time: "1½–2 hr",
        best: "After lights turn on",
        price: "From ≈ $13 · verify",
        planned: true,
        link: "https://www.trip.com/moments/detail/zhangjiajie-23-137644768/",
        linkLabel: "Visitor guide",
        credit: "Trip.com traveler image",
        creditUrl: "https://www.trip.com/moments/detail/zhangjiajie-23-137644768/",
      },
    ],
  },
  {
    city: "Shenzhen",
    subtitle: "The hardware hunt, then a city designed around what comes next.",
    countLabel: "10 standout places · tech first, architecture second",
    places: [
      {
        id: "sz-hqb",
        name: "Huaqiangbei + SEG",
        image: "/attractions/sz-hqb.webp",
        alt: "Huaqiangbei electronics district and Shenzhen skyline",
        description: "The world’s most concentrated electronics ecosystem: components, GPUs, RAM, phones and repair supply chains. Compare first, test second, pay last.",
        time: "Full day",
        best: "10:00–18:00",
        price: "Free · purchases extra",
        planned: true,
        link: "https://www.cathaypacific.com/cx/en_US/inspiration/shopping/shenzhen-guide-huaqiangbei-electronics-market.html",
        linkLabel: "Trusted buyer guide",
      },
      {
        id: "sz-dji",
        name: "DJI OCT Harbour Flagship",
        image: "/attractions/sz-dji.webp",
        alt: "Geometric DJI flagship store at OCT Harbour in Shenzhen",
        description: "The safest place in the city to compare drones, controllers and regional warranty terms. Confirm U.S. activation, Remote ID and battery Wh before buying.",
        time: "1½–2 hr",
        best: "Opening time",
        price: "Free · products extra",
        planned: true,
        link: "https://www.dji.com/where-to-buy/flagship/cn-sz",
        linkLabel: "Official DJI store",
        credit: "DJI official",
        creditUrl: "https://www.dji.com/where-to-buy/flagship/cn-sz",
      },
      {
        id: "sz-bay",
        name: "Shenzhen Bay Park",
        image: "/attractions/sz-bay.webp",
        alt: "Shenzhen Bay Park with the city skyline beyond",
        description: "A long waterfront park with skyline, bridge and Hong Kong views. It is the best open-air counterpoint to a day under electronics-market lights.",
        time: "1½–2 hr",
        best: "Golden hour",
        price: "Free",
        planned: true,
        link: maps("Shenzhen Bay Park"),
        linkLabel: "Open map",
      },
      {
        id: "sz-ping",
        name: "Ping An Finance Center",
        image: "/attractions/sz-ping.webp",
        alt: "Ping An Finance Center above central Shenzhen",
        description: "The Free Sky observatory puts Shenzhen’s explosive urban scale into view from the 116th floor. Use it when the museum reservation does not work.",
        time: "1½ hr",
        best: "Before sunset",
        price: "≈ $30 pp",
        planned: false,
        link: klook("Ping An Finance Center Shenzhen"),
        linkLabel: "Check tickets",
      },
      {
        id: "sz-civic",
        name: "Civic Center + Shenzhen Museum",
        image: "/attractions/sz-civic.webp",
        alt: "Shenzhen Civic Center illuminated at night",
        description: "The vast winged civic building and museum tell the story of a fishing region transformed into a technology megacity in a single generation.",
        time: "2–2½ hr",
        best: "Late afternoon",
        price: "Free · museum reserve",
        planned: true,
        link: maps("Shenzhen Museum Civic Center"),
        linkLabel: "Map & museum",
      },
      {
        id: "sz-dafen",
        name: "Dafen Oil Painting Village",
        image: "/attractions/sz-dafen.webp",
        alt: "Entrance to Dafen Oil Painting Village",
        description: "A dense district of studios, galleries and painters once famous for mass-producing reproductions. Today it is a fascinating look at art as both craft and industry.",
        time: "2–3 hr",
        best: "Mid-morning",
        price: "Free",
        planned: false,
        link: maps("Dafen Oil Painting Village Shenzhen"),
        linkLabel: "Open map",
      },
      {
        id: "sz-oct",
        name: "OCT-LOFT Creative Culture Park",
        image: "/attractions/sz-oct.webp",
        alt: "Converted industrial lanes at OCT-LOFT Shenzhen",
        description: "Former factory buildings converted into galleries, design studios, cafes and bars. It is Shenzhen’s strongest creative-neighborhood pause.",
        time: "2 hr",
        best: "Late afternoon",
        price: "Free",
        planned: false,
        link: maps("OCT Loft Shenzhen"),
        linkLabel: "Open map",
      },
      {
        id: "sz-window",
        name: "Window of the World",
        image: "/attractions/sz-window.webp",
        alt: "Eiffel Tower replica at Window of the World Shenzhen",
        description: "A cheerful, eccentric theme park of global landmarks in miniature. It is not essential history, but it reveals the playful ambition of 1990s Shenzhen.",
        time: "4–5 hr",
        best: "Weekday afternoon",
        price: "≈ $29–35 pp",
        planned: false,
        link: klook("Window of the World Shenzhen"),
        linkLabel: "Check tickets",
      },
      {
        id: "sz-sea",
        name: "Sea World Shekou",
        image: "/attractions/sz-sea.webp",
        alt: "The Minghua ship at Sea World Shekou in Shenzhen",
        description: "A landlocked cruise ship anchors a lively dining and waterfront district. It is best for a relaxed dinner after exploring the design and port side of the city.",
        time: "2–3 hr",
        best: "Dinner and evening",
        price: "Free · dining extra",
        planned: false,
        link: maps("Sea World Shekou Shenzhen"),
        linkLabel: "Open map",
      },
      {
        id: "sz-nantou",
        name: "Nantou Ancient City",
        image: "/attractions/sz-nantou.webp",
        alt: "Historic gate of Nantou Ancient City in Shenzhen",
        description: "A restored historic core that proves Shenzhen existed long before its skyscrapers. Old gates and lanes now mix with cafes, exhibitions and adaptive design.",
        time: "2–3 hr",
        best: "Late afternoon",
        price: "Free",
        planned: false,
        link: maps("Nantou Ancient City Shenzhen"),
        linkLabel: "Open map",
      },
    ],
  },
  {
    city: "Macau",
    subtitle: "Portuguese stone, Macanese flavor and one dazzling Cotai night.",
    countLabel: "10 icons · designed for one rich overnight",
    places: [
      {
        id: "mo-ruins",
        name: "Ruins of St. Paul’s",
        image: "/attractions/mo-ruins.webp",
        alt: "Stone façade of the Ruins of Saint Paul's in Macau",
        description: "Macau’s most recognizable monument: the surviving baroque façade and grand stair of a 17th-century church, backed by a small crypt and city views.",
        time: "45–60 min",
        best: "Before noon",
        price: "Free",
        planned: true,
        link: "https://www.macaotourism.gov.mo/en/sightseeing/churches/ruins-of-st-pauls",
        linkLabel: "Official visitor info",
      },
      {
        id: "mo-senado",
        name: "Senado Square",
        image: "/attractions/mo-senado.webp",
        alt: "Portuguese-era buildings and paving at Senado Square",
        description: "Wave-pattern mosaic paving and pastel civic façades form the heart of historic Macau. It is the natural start of the walk to St. Dominic’s and St. Paul’s.",
        time: "45 min",
        best: "Late morning",
        price: "Free",
        planned: true,
        link: maps("Senado Square Macau"),
        linkLabel: "Open map",
      },
      {
        id: "mo-dominic",
        name: "St. Dominic’s Church",
        image: "/attractions/mo-dominic.webp",
        alt: "Yellow façade of Saint Dominic's Church Macau",
        description: "A mustard-yellow baroque church with green shutters and a calm, ornate interior. It is directly on the old-city walking line, so there is no reason to miss it.",
        time: "20–30 min",
        best: "En route to St. Paul’s",
        price: "Free",
        planned: true,
        link: maps("St Dominic's Church Macau"),
        linkLabel: "Open map",
      },
      {
        id: "mo-monte",
        name: "Monte Fort + Macau Museum",
        image: "/attractions/mo-monte.webp",
        alt: "Fortaleza do Monte ramparts in Macau",
        description: "A hilltop Jesuit-era fortress with cannons, greenery and layered views across the city. The adjacent museum gives the best compact introduction to Macanese history.",
        time: "1½–2 hr",
        best: "Early afternoon",
        price: "Fort free · museum low-cost",
        planned: true,
        link: maps("Monte Fort Macau Museum"),
        linkLabel: "Open map",
      },
      {
        id: "mo-ama",
        name: "A-Ma Temple",
        image: "/attractions/mo-ama.webp",
        alt: "Courtyard of A-Ma Temple in Macau",
        description: "A hillside complex dedicated to the sea goddess Mazu and older than Portuguese Macau. Incense coils, rocks and small pavilions create an intimate sacred landscape.",
        time: "45–60 min",
        best: "Morning",
        price: "Free",
        planned: false,
        link: maps("A-Ma Temple Macau"),
        linkLabel: "Open map",
      },
      {
        id: "mo-tower",
        name: "Macau Tower",
        image: "/attractions/mo-tower.webp",
        alt: "Macau Tower against a blue sky",
        description: "A clean panoramic view of the peninsula, bridges and Pearl River Delta. The exterior decks and adventure activities are optional; the observatory is enough for this schedule.",
        time: "1–1½ hr",
        best: "15:45",
        price: "$18–21 pp",
        planned: true,
        link: "https://www.klook.com/activity/506-macau-tower-macau/",
        linkLabel: "Check tickets",
      },
      {
        id: "mo-taipa",
        name: "Taipa Village",
        image: "/attractions/mo-taipa.webp",
        alt: "Low-rise lanes and shops in Taipa Village Macau",
        description: "Narrow lanes, colonial houses, temples and the city’s densest snack trail. Try almond cookies, pork-chop buns and Portuguese egg tarts before the ferry.",
        time: "1½–2 hr",
        best: "Sunday morning",
        price: "Free · food extra",
        planned: true,
        link: maps("Taipa Village Macau"),
        linkLabel: "Open food walk",
      },
      {
        id: "mo-venetian",
        name: "The Venetian Macao",
        image: "/attractions/mo-venetian.webp",
        alt: "Illuminated Venetian Macao resort reflected in water",
        description: "An unapologetically enormous Venice fantasy of canals, painted skies and marble retail arcades. Treat it as theatrical architecture and a weatherproof evening walk.",
        time: "1–1½ hr",
        best: "After the show",
        price: "Free to enter",
        planned: true,
        link: "https://www.venetianmacao.com/",
        linkLabel: "Official resort",
      },
      {
        id: "mo-parisian",
        name: "The Parisian + Eiffel Tower",
        image: "/attractions/mo-parisian.webp",
        alt: "Eiffel Tower replica outside The Parisian Macao",
        description: "Cotai’s half-scale Eiffel Tower is kitsch done with commitment. The exterior light sequence gives the best view without needing another observation ticket.",
        time: "45–60 min",
        best: "After dark",
        price: "Exterior free",
        planned: true,
        link: "https://www.parisianmacao.com/",
        linkLabel: "Official resort",
      },
      {
        id: "mo-water",
        name: "House of Dancing Water",
        image: "/attractions/mo-water.webp",
        alt: "City of Dreams resort complex in Macau",
        description: "A purpose-built aquatic spectacle at City of Dreams combining diving, acrobatics and stage engineering. Keep it only when the Dec 5 performance calendar confirms the 20:00 slot.",
        time: "90 min + arrival",
        best: "20:00 performance",
        price: "From ≈ $55 pp",
        planned: true,
        link: "https://tickets.cityofdreamsmacau.com/hodw",
        linkLabel: "Official tickets",
      },
    ],
  },
  {
    city: "Hong Kong",
    subtitle: "Harbour crossings, high views, island villages and world-class culture.",
    countLabel: "10 classic experiences · all synchronized",
    places: [
      {
        id: "hk-peak",
        name: "Victoria Peak + Peak Tram",
        image: "/attractions/hk-peak.webp",
        alt: "Green Victoria Peak rising over Hong Kong",
        description: "The city’s essential vertical journey: a steep historic tram and a sweeping view across towers, harbour and Kowloon. Early entry avoids the longest queues.",
        time: "2–2½ hr",
        best: "10:15 ascent",
        price: "HKD 182 · ≈ $23",
        planned: true,
        link: "https://www.thepeak.com.hk/en/ticket-and-booking/purchase-ticket/peak-tram-sky-pass",
        linkLabel: "Official tickets",
      },
      {
        id: "hk-star",
        name: "Star Ferry",
        image: "/attractions/hk-star.webp",
        alt: "Classic green and white Star Ferry on Victoria Harbour",
        description: "Possibly the world’s best-value city ride: a breezy harbour crossing framed by two skylines. Ride once by day and once after dark if energy allows.",
        time: "20 min crossing",
        best: "Blue hour",
        price: "About HKD 5–7",
        planned: true,
        link: "https://www.starferry.com.hk/en/service",
        linkLabel: "Official service",
      },
      {
        id: "hk-avenue",
        name: "Avenue of Stars",
        image: "/attractions/hk-avenue.webp",
        alt: "Avenue of Stars promenade beside Victoria Harbour",
        description: "A polished Tsim Sha Tsui promenade celebrating Hong Kong cinema, with uninterrupted harbour views and the ideal position for the evening light show.",
        time: "1–1½ hr",
        best: "Before sunset",
        price: "Free",
        planned: true,
        link: maps("Avenue of Stars Hong Kong"),
        linkLabel: "Open promenade",
      },
      {
        id: "hk-light",
        name: "A Symphony of Lights",
        image: "/attractions/hk-light.webp",
        alt: "Colorful light show across Hong Kong's Victoria Harbour",
        description: "The skyline becomes the stage for a short synchronized light and music show. The Kowloon waterfront gives the widest, easiest view.",
        time: "10 min + position",
        best: "Nightly 20:00",
        price: "Free",
        planned: true,
        link: "https://www.tourism.gov.hk/symphony/english/details/details.html",
        linkLabel: "Official show details",
      },
      {
        id: "hk-ngong",
        name: "Ngong Ping 360",
        image: "/attractions/hk-ngong.webp",
        alt: "Ngong Ping 360 cable cars above Lantau Island",
        description: "A long cable-car flight above airport, sea and green Lantau ridges. Standard cabins offer the same landscape at better value than Crystal cabins.",
        time: "25 min each way",
        best: "First departure",
        price: "HKD 295 · ≈ $38 return",
        planned: true,
        link: "https://www.np360.com.hk/en/tickets-promotions/tickets-tours/cable-car-tickets",
        linkLabel: "Official tickets",
      },
      {
        id: "hk-buddha",
        name: "Big Buddha + Po Lin Monastery",
        image: "/attractions/hk-buddha.webp",
        alt: "Tian Tan Big Buddha above Po Lin Monastery",
        description: "A monumental bronze Buddha set against Lantau’s mountains, paired with an active monastery and vegetarian lunch. The stairs can be taken slowly.",
        time: "2–2½ hr",
        best: "Morning",
        price: "Grounds free",
        planned: true,
        link: maps("Tian Tan Buddha Po Lin Monastery"),
        linkLabel: "Open map",
      },
      {
        id: "hk-taio",
        name: "Tai O Fishing Village",
        image: "/attractions/hk-taio.webp",
        alt: "Boats and stilt houses in Tai O Hong Kong",
        description: "A salt-air village of stilt houses, shrimp paste, waterways and mountain edges. It gives Lantau cultural texture beyond the cable car and Buddha.",
        time: "2 hr",
        best: "14:00",
        price: "Free · boat optional",
        planned: true,
        link: maps("Tai O Hong Kong"),
        linkLabel: "Open village map",
      },
      {
        id: "hk-mplus",
        name: "M+",
        image: "/attractions/hk-mplus.webp",
        alt: "M+ museum building in West Kowloon Hong Kong",
        description: "Asia’s flagship museum for visual culture, design, architecture and moving image. Its building and harbour-facing public spaces are part of the experience.",
        time: "2½–3 hr",
        best: "Tuesday 14:30",
        price: "HKD 190 · ≈ $24",
        planned: true,
        link: "https://www.mplus.org.hk/en/get-tickets/",
        linkLabel: "Official tickets",
      },
      {
        id: "hk-manmo",
        name: "Man Mo Temple + Mid-Levels",
        image: "/attractions/hk-manmo.webp",
        alt: "Entrance detail at Man Mo Temple Hong Kong",
        description: "Incense coils and carved altars create a richly atmospheric pause in old Sheung Wan. Pair it with the Mid-Levels Escalator and Central’s steep lanes.",
        time: "1½–2 hr walk",
        best: "Early morning",
        price: "Free",
        planned: true,
        link: maps("Man Mo Temple Hollywood Road Hong Kong"),
        linkLabel: "Open walking area",
      },
      {
        id: "hk-temple",
        name: "Temple Street Night Market",
        image: "/attractions/hk-temple.webp",
        alt: "Traditional gate at Temple Street in Hong Kong",
        description: "A classic Kowloon evening of street food, fortune tellers, small goods and local theater. Come for atmosphere; keep electronics shopping in Shenzhen.",
        time: "1–2 hr",
        best: "20:30 onward",
        price: "Free · food extra",
        planned: true,
        link: maps("Temple Street Night Market Hong Kong"),
        linkLabel: "Open market map",
      },
    ],
  },
];

function AttractionCard({ place, index }: { place: Attraction; index: number }) {
  const credit = place.credit ?? "Wikimedia Commons";
  const creditUrl = place.creditUrl ?? commons(`${place.name} China`);

  return (
    <article className="attraction-card">
      <div className="attraction-photo">
        <img src={place.image} alt={place.alt} loading="lazy" />
        <span className={`plan-chip ${place.planned ? "is-planned" : "is-option"}`}>
          {place.planned ? "In your plan" : "Worth a swap"}
        </span>
        <a href={creditUrl} target="_blank" rel="noreferrer" className="image-credit">
          Photo: {credit} ↗
        </a>
      </div>
      <div className="attraction-copy">
        <span className="attraction-number">{String(index + 1).padStart(2, "0")}</span>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <dl className="attraction-facts">
          <div><dt>Allow</dt><dd>{place.time}</dd></div>
          <div><dt>Best</dt><dd>{place.best}</dd></div>
          <div><dt>Cost</dt><dd>{place.price}</dd></div>
        </dl>
        <a className="attraction-link" href={place.link} target="_blank" rel="noreferrer">
          {place.linkLabel}<span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </article>
  );
}

export function AttractionsExplorer() {
  return (
    <Tabs defaultValue="Shanghai" className="city-tabs">
      <div className="city-menu" id="city-menu">
        <span>Jump to a city</span>
        <TabsList variant="line" aria-label="Choose a city guide">
          {guides.map((guide) => (
            <TabsTrigger key={guide.city} value={guide.city}>{guide.city}</TabsTrigger>
          ))}
        </TabsList>
      </div>

      {guides.map((guide) => (
        <TabsContent key={guide.city} value={guide.city} className="city-panel">
          <div className="city-panel-head">
            <div><span>City field guide</span><h3>{guide.city}</h3></div>
            <div><p>{guide.subtitle}</p><small>{guide.countLabel}</small></div>
          </div>
          <div className="attraction-grid">
            {guide.places.map((place, index) => (
              <AttractionCard key={place.id} place={place} index={index} />
            ))}
          </div>
          <a href="#city-menu" className="back-to-menu">Back to city menu ↑</a>
        </TabsContent>
      ))}
    </Tabs>
  );
}
