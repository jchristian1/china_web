import { AttractionsExplorer } from "./attractions";

type TimelineItem = {
  time: string;
  title: string;
  note?: string;
  critical?: boolean;
};

type Day = {
  date: string;
  weekday: string;
  city: string;
  title: string;
  intro: string;
  tone: "shanghai" | "zhangjiajie" | "shenzhen" | "macau" | "hongkong" | "travel";
  timeline: TimelineItem[];
};

const days: Day[] = [
  {
    date: "NOV 24", weekday: "TUE", city: "New York → Shanghai", title: "The long crossing",
    intro: "New York times until takeoff. The connection details remain exactly as shown in the booked ticket.", tone: "travel",
    timeline: [
      { time: "07:30", title: "Breakfast and final document check", note: "Passports, China visas, Korean Air confirmation, insurance and five bag tags." },
      { time: "08:30", title: "Leave for JFK", note: "Private van sized for five people + five checked bags." },
      { time: "09:30", title: "Arrive JFK and check in", note: "Target a full 2½ hours before departure; confirm the terminal in the Korean Air app 48 hours prior.", critical: true },
      { time: "11:10", title: "Be at the gate", note: "No shopping after this point." },
      { time: "12:00", title: "Korean Air departs JFK", note: "Economy · one stop at Seoul Incheon · booked." },
      { time: "IN FLIGHT", title: "ICN connection per the booked confirmation", note: "Stay airside and follow the onward PVG gate. Flight numbers and connection length were not visible in the screenshot, so they are intentionally not invented." },
    ],
  },
  {
    date: "NOV 25", weekday: "WED", city: "Shanghai", title: "Arrival under the city lights",
    intro: "From this landing through Hong Kong and Macau, every time in this itinerary is on the same UTC+8 clock.", tone: "shanghai",
    timeline: [
      { time: "20:25", title: "Land at Shanghai Pudong (PVG)", note: "Scheduled arrival from the booked Korean Air itinerary." },
      { time: "20:25–21:50", title: "Immigration, bags and customs", note: "Five checked bags: keep the generous 85-minute working allowance." },
      { time: "22:00", title: "Meet pre-booked private van", note: "Driver waits in arrivals with the lead traveler’s name." },
      { time: "23:05", title: "Golden Tulip New Asia Hotel check-in", note: "Message the hotel in advance: late arrival after 23:00. Booking.com warns rooms can be released after 18:00 without notice.", critical: true },
      { time: "23:30", title: "Tea, shower, sleep", note: "No sightseeing tonight—the next morning starts gently for jet lag." },
    ],
  },
  {
    date: "NOV 26", weekday: "THU", city: "Shanghai", title: "Gardens, lanes and the Bund",
    intro: "A soft first full day that moves from old Shanghai to its cinematic riverfront.", tone: "shanghai",
    timeline: [
      { time: "08:30", title: "Breakfast near the hotel" },
      { time: "09:30", title: "Yu Garden timed entry", note: "Reserve the 09:00–11:00 window; passport may be required." },
      { time: "11:30", title: "Old City lunch", note: "Xiaolongbao and tea; avoid the busiest restaurant queue directly beside the garden." },
      { time: "13:30", title: "Former French Concession walk", note: "Wukang Road → Ferguson Lane → Anfu Road, with coffee built in." },
      { time: "16:15", title: "The Bund at golden hour", note: "Late-November sunset is early; this timing protects the best light." },
      { time: "18:00", title: "Dinner near the river" },
      { time: "20:00", title: "Huangpu River night cruise", note: "Choose a 45–60 minute sailing and arrive at the pier 30 minutes early." },
      { time: "21:30", title: "Return to hotel" },
    ],
  },
  {
    date: "NOV 27", weekday: "FRI", city: "Shanghai", title: "The modern metropolis",
    intro: "Architecture, altitude and a polished circus finale—ambitious without running all day.", tone: "shanghai",
    timeline: [
      { time: "08:30", title: "Breakfast" },
      { time: "09:30", title: "People’s Square + Shanghai Museum", note: "Reserve the museum when its November calendar opens. If unavailable, use the Shanghai Urban Planning Exhibition Center." },
      { time: "12:00", title: "Nanjing Road lunch" },
      { time: "13:30", title: "Nanjing Road promenade", note: "Unhurried shopping and architecture." },
      { time: "15:30", title: "Shanghai Tower, 118th floor", note: "Book a 15:30 slot for daylight, sunset and the first city lights." },
      { time: "17:45", title: "Early dinner in Jing’an" },
      { time: "19:30", title: "ERA2 acrobatic show", note: "Aim for mid-category seats; arrive by 19:00." },
      { time: "21:30", title: "Hotel and pack", note: "Five bags ready by the door for the early airport transfer." },
    ],
  },
  {
    date: "NOV 28", weekday: "SAT", city: "Shanghai → Zhangjiajie", title: "From skyline to stone forest",
    intro: "A protected morning flight and an easy arrival afternoon in Wulingyuan.", tone: "travel",
    timeline: [
      { time: "06:15", title: "Breakfast box and room check" },
      { time: "06:45", title: "Private van to PVG", note: "Allow 75 minutes for weekend traffic." },
      { time: "08:00", title: "PVG bag drop and security", note: "2h15 before departure for five checked bags.", critical: true },
      { time: "10:15", title: "FM7225 departs PVG", note: "Shanghai Airlines · nonstop · proposed, not booked." },
      { time: "12:25", title: "Arrive Zhangjiajie Hehua (DYG)" },
      { time: "13:10", title: "Private van to Wulingyuan", note: "Pre-book a vehicle that explicitly accepts five large suitcases." },
      { time: "14:25", title: "Hilton Garden Inn check-in" },
      { time: "15:30", title: "Xibu Street + park orientation" },
      { time: "18:00", title: "Hunan dinner" },
      { time: "20:00", title: "Early night", note: "Cold-weather layers and rain shells laid out for morning." },
    ],
  },
  {
    date: "NOV 29", weekday: "SUN", city: "Zhangjiajie", title: "The Avatar ridgelines",
    intro: "Yuanjiajie and Tianzi Mountain, sequenced to keep the walking beautiful rather than punishing.", tone: "zhangjiajie",
    timeline: [
      { time: "07:00", title: "Breakfast" },
      { time: "07:40", title: "East Gate entry", note: "Tickets and passports ready before the tour groups arrive." },
      { time: "08:00", title: "Eco-bus into the park" },
      { time: "09:00", title: "Bailong Elevator ascent" },
      { time: "10:00", title: "Yuanjiajie viewpoints", note: "Hallelujah Mountain, Enchanting Terrace and the First Bridge Under Heaven." },
      { time: "12:00", title: "Simple summit lunch" },
      { time: "13:15", title: "Tianzi Mountain ridge" },
      { time: "16:15", title: "Cableway descent + eco-bus" },
      { time: "17:30", title: "Hotel recovery hour" },
      { time: "18:30", title: "Dinner in Wulingyuan" },
      { time: "20:30", title: "Foot soak and sleep" },
    ],
  },
  {
    date: "NOV 30", weekday: "MON", city: "Zhangjiajie", title: "Glass, canyon and limestone",
    intro: "A different landscape day, with a built-in choice if the group wants less walking.", tone: "zhangjiajie",
    timeline: [
      { time: "07:30", title: "Breakfast" },
      { time: "08:15", title: "Driver to Zhangjiajie Grand Canyon" },
      { time: "09:00", title: "Glass Bridge + B-line canyon", note: "Wear grippy shoes; check wind closures before leaving the hotel." },
      { time: "12:00", title: "Lunch near the canyon" },
      { time: "13:30", title: "Choose: Yellow Dragon Cave or Baofeng Lake", note: "Cave for drama; lake for an easier afternoon." },
      { time: "16:30", title: "Return to hotel" },
      { time: "18:30", title: "Dinner" },
      { time: "20:00", title: "Optional Charming Xiangxi show", note: "Not included in the core budget; skip it if the group wants a quieter night." },
    ],
  },
  {
    date: "DEC 01", weekday: "TUE", city: "Zhangjiajie", title: "Tianmen above the clouds",
    intro: "The most weather-sensitive day. It may swap with Nov 29 or Nov 30 after checking visibility the evening before.", tone: "zhangjiajie",
    timeline: [
      { time: "06:45", title: "Breakfast" },
      { time: "07:30", title: "Private van to Zhangjiajie city" },
      { time: "08:30", title: "Tianmen ticket check" },
      { time: "09:00", title: "Cableway / Line B ascent", note: "Use the exact line printed on the ticket; operations change with weather." },
      { time: "10:00", title: "Cliff paths and glass walkway" },
      { time: "12:00", title: "Summit lunch" },
      { time: "13:00", title: "Tianmen Cave + 999 steps", note: "Escalators reduce the strain; steps are optional." },
      { time: "15:30", title: "Begin descent" },
      { time: "16:45", title: "City snack + van back" },
      { time: "18:30", title: "Dinner and pack" },
      { time: "20:00", title: "Weather-flex decision", note: "If any major mountain day was fogged out, use tomorrow morning for the best missed section." },
    ],
  },
  {
    date: "DEC 02", weekday: "WED", city: "Zhangjiajie → Shenzhen", title: "A flexible morning, then south",
    intro: "Enough spare time to rescue a misted viewpoint without threatening the evening flight.", tone: "travel",
    timeline: [
      { time: "07:30", title: "Breakfast" },
      { time: "08:30", title: "Weather-flex outing", note: "Baofeng Lake, Golden Whip Stream, or a missed viewpoint—hotel team confirms conditions." },
      { time: "11:30", title: "Lunch" },
      { time: "12:30", title: "Check out; bags held by hotel" },
      { time: "13:30", title: "Private van to Zhangjiajie city" },
      { time: "14:30", title: "72 Qilou cultural quarter + coffee" },
      { time: "16:15", title: "Early dinner" },
      { time: "17:15", title: "Arrive DYG for bags and security", note: "2h25 working buffer.", critical: true },
      { time: "19:40", title: "Y87574 departs for Shenzhen", note: "Suparna Airlines · nonstop · proposed seasonal schedule; re-check before payment." },
      { time: "21:45", title: "Arrive Shenzhen (SZX)" },
      { time: "22:30", title: "Private van to Huaqiangbei" },
      { time: "23:15", title: "Huaqiang Plaza Hotel check-in" },
    ],
  },
  {
    date: "DEC 03", weekday: "THU", city: "Shenzhen", title: "Huaqiangbei buyer’s day",
    intro: "The serious shopping day: compare first, test second, pay last.", tone: "shenzhen",
    timeline: [
      { time: "08:30", title: "Breakfast + target-price briefing", note: "Write exact GPU/RAM/drone models, U.S. street prices and acceptable warranty terms." },
      { time: "09:45", title: "Walk to SEG Electronics Market" },
      { time: "10:00", title: "SEG floors 3–6", note: "PC builders, GPUs, motherboards, RAM and components. First lap is research only." },
      { time: "12:30", title: "Lunch off-market" },
      { time: "13:30", title: "Huaqiang Electronic World" },
      { time: "15:30", title: "Yuanwang Digital Mall", note: "Phones, cameras and finished electronics; insist on sealed units and serial checks." },
      { time: "17:00", title: "Testing + receipts", note: "Run diagnostics, photograph serials, request itemized receipt/fapiao and written return terms." },
      { time: "18:30", title: "Secure purchases at hotel" },
      { time: "20:00", title: "Dinner at UpperHills / Futian" },
      { time: "22:00", title: "Warranty and customs log", note: "Record each buyer, item, value, battery Wh rating and receipt location." },
    ],
  },
  {
    date: "DEC 04", weekday: "FRI", city: "Shenzhen", title: "Drones and the innovation coast",
    intro: "Official DJI first, skyline and design afterward. No promise of an HQ tour without an invitation.", tone: "shenzhen",
    timeline: [
      { time: "08:30", title: "Breakfast" },
      { time: "09:15", title: "Private van to OCT Harbour" },
      { time: "10:00", title: "DJI official flagship store", note: "Demo, compare regional warranty, confirm app/activation and buy only after checking airline battery rules." },
      { time: "11:45", title: "OCT Harbour walk" },
      { time: "12:30", title: "Nanshan lunch" },
      { time: "14:00", title: "DJI Sky City exterior", note: "Architecture stop only. Customer-center access is conditional; there is no guaranteed public headquarters tour." },
      { time: "15:30", title: "Shenzhen Bay Park" },
      { time: "17:15", title: "Shenzhen Museum / Civic Center", note: "If museum reservations are unavailable, use the Ping An Finance Center observation deck as the paid alternative." },
      { time: "19:30", title: "Farewell Shenzhen dinner" },
      { time: "21:00", title: "Pack batteries in carry-ons", note: "No loose lithium batteries or power banks in checked bags.", critical: true },
    ],
  },
  {
    date: "DEC 05", weekday: "SAT", city: "Shenzhen → Macau", title: "Across the water to old Macau",
    intro: "Weekend 09:00 sailing, one glamorous overnight and luggage buffers on both sides.", tone: "macau",
    timeline: [
      { time: "06:15", title: "Breakfast box and checkout" },
      { time: "06:45", title: "Private van to Shekou Cruise Centre" },
      { time: "07:30", title: "Arrive for exit control + luggage", note: "90 minutes before sailing for five checked bags.", critical: true },
      { time: "09:00", title: "TurboJET Shekou → Macau Outer Harbour", note: "60 minutes · weekend sailing · proposed, not booked." },
      { time: "10:00", title: "Macau arrival formalities" },
      { time: "10:45", title: "Casa Real Hotel bag drop" },
      { time: "11:30", title: "Senado Square → St. Dominic’s → Ruins of St. Paul’s" },
      { time: "13:15", title: "Macanese lunch" },
      { time: "14:30", title: "Monte Fort and old-city lanes" },
      { time: "15:45", title: "Macau Tower observation deck" },
      { time: "17:30", title: "Taxi to Cotai + early dinner" },
      { time: "20:00", title: "House of Dancing Water", note: "Hold this slot only after the Dec 5 performance calendar opens." },
      { time: "21:45", title: "Venetian and Parisian lights" },
      { time: "23:00", title: "Hotel" },
    ],
  },
  {
    date: "DEC 06", weekday: "SUN", city: "Macau → Hong Kong", title: "Harbour to harbour",
    intro: "A calm Macau morning followed by a 12:30 ferry and Hong Kong’s iconic night view.", tone: "hongkong",
    timeline: [
      { time: "08:00", title: "Breakfast" },
      { time: "09:00", title: "Short Taipa Village food walk", note: "Return to the hotel on time; no detours after 10:15." },
      { time: "10:30", title: "Collect bags and check out" },
      { time: "10:50", title: "Taxi to Macau Outer Harbour" },
      { time: "11:15", title: "Terminal check-in + luggage", note: "75 minutes before departure.", critical: true },
      { time: "12:30", title: "TurboJET to Hong Kong Sheung Wan", note: "60 minutes · proposed, not booked." },
      { time: "13:30", title: "Hong Kong immigration" },
      { time: "14:15", title: "Private van to Dorsett Mongkok" },
      { time: "15:00", title: "Check in and reset" },
      { time: "16:30", title: "Star Ferry + Avenue of Stars" },
      { time: "18:30", title: "Tsim Sha Tsui dinner" },
      { time: "20:00", title: "Symphony of Lights", note: "Free; best viewed from the Kowloon waterfront." },
      { time: "21:00", title: "Temple Street Night Market" },
      { time: "22:15", title: "Hotel" },
    ],
  },
  {
    date: "DEC 07", weekday: "MON", city: "Hong Kong", title: "Lantau in the clouds",
    intro: "Cable car, monastery and fishing village. M+ is saved for Tuesday because it is normally closed Monday.", tone: "hongkong",
    timeline: [
      { time: "07:30", title: "Breakfast" },
      { time: "08:15", title: "MTR to Tung Chung" },
      { time: "09:15", title: "Ngong Ping 360 check-in" },
      { time: "09:30", title: "Cable car to Ngong Ping" },
      { time: "10:15", title: "Big Buddha + Po Lin Monastery" },
      { time: "12:00", title: "Vegetarian monastery lunch" },
      { time: "13:15", title: "Bus to Tai O" },
      { time: "14:00", title: "Stilt village walk + optional boat" },
      { time: "16:00", title: "Return toward Mong Kok" },
      { time: "17:30", title: "Hotel rest" },
      { time: "19:30", title: "Mong Kok food crawl", note: "Ladies’ Market, sneakers and dessert—keep purchases light before the flight." },
      { time: "22:00", title: "Hotel" },
    ],
  },
  {
    date: "DEC 08", weekday: "TUE", city: "Hong Kong", title: "Peak, ferry, art",
    intro: "Hong Kong’s signature vertical journey with a museum afternoon and final-night energy.", tone: "hongkong",
    timeline: [
      { time: "07:30", title: "Breakfast" },
      { time: "08:30", title: "Central + Mid-Levels Escalator" },
      { time: "09:15", title: "Man Mo Temple" },
      { time: "10:15", title: "Peak Tram + Sky Terrace", note: "Early entry avoids the longest queue." },
      { time: "12:30", title: "Lunch in Central" },
      { time: "13:45", title: "Star Ferry to Kowloon" },
      { time: "14:30", title: "M+ museum timed entry" },
      { time: "17:00", title: "West Kowloon sunset walk" },
      { time: "18:30", title: "Farewell Hong Kong dinner" },
      { time: "20:30", title: "Final Temple Street / Jordan stroll" },
      { time: "21:30", title: "Pack and sleep", note: "Luggage weighed; all tech receipts and lithium batteries in carry-ons." },
    ],
  },
  {
    date: "DEC 09", weekday: "WED", city: "Hong Kong → Shanghai", title: "The protected return to Shanghai",
    intro: "Flying back one day early removes the dangerous same-day connection to the New York flight.", tone: "travel",
    timeline: [
      { time: "05:45", title: "Wake, breakfast box, final sweep" },
      { time: "06:15", title: "Private van to HKG", note: "Five people + five checked bags; no MTR transfer this morning." },
      { time: "07:05", title: "HKG bag drop and exit control", note: "2h40 before departure.", critical: true },
      { time: "09:45", title: "MU724 departs HKG", note: "China Eastern · nonstop · proposed, not booked." },
      { time: "12:25", title: "Arrive Shanghai Pudong (PVG)" },
      { time: "13:20", title: "Bags + private van" },
      { time: "14:30", title: "Golden Tulip New Asia check-in" },
      { time: "15:30", title: "Final Bund / Nanjing Road walk" },
      { time: "18:30", title: "Farewell Shanghai dinner" },
      { time: "20:30", title: "Documents, receipts and luggage lock" },
      { time: "22:00", title: "Sleep" },
    ],
  },
  {
    date: "DEC 10", weekday: "THU", city: "Shanghai → New York", title: "Home, with margin",
    intro: "The final morning is intentionally quiet. Nothing is allowed to compete with the 14:00 departure.", tone: "travel",
    timeline: [
      { time: "07:30", title: "Breakfast" },
      { time: "08:30", title: "Check out + passport and bag count", note: "Five passports, five checked bags, carry-on batteries, customs purchase list." },
      { time: "09:00", title: "Private van to PVG", note: "No later departure permitted." },
      { time: "10:15", title: "Arrive PVG", note: "3h45 before the booked flight.", critical: true },
      { time: "10:30", title: "Korean Air bag drop, security and exit control" },
      { time: "12:30", title: "At the gate" },
      { time: "14:00", title: "Korean Air departs PVG", note: "One stop at ICN · booked." },
      { time: "IN FLIGHT", title: "ICN connection per confirmation", note: "Follow the booked onward JFK segment and remain airside." },
      { time: "19:30", title: "Arrive JFK the same calendar day", note: "Scheduled New York local time." },
      { time: "20:30", title: "Customs + five-bag collection" },
      { time: "21:15", title: "Pre-arranged ride home" },
    ],
  },
];

const hotels = [
  { city: "Shanghai · first stay", dates: "Nov 25–28 · 3 nights", name: "Golden Tulip New Asia Hotel — The Bund", room: "3 Standard Twin rooms · 2 twins each", why: "Late-arrival friendly location, five minutes from Tiantong Road metro and walkable to the Bund.", price: "$891", detail: "$841 shown + estimated 6% VAT", link: "https://www.booking.com/hotel/cn/jinjiang-metropolo-classiq-shanghai-xinya-bund.html?checkin=2026-11-25&checkout=2026-11-28&group_adults=5&no_rooms=3&group_children=0" },
  { city: "Zhangjiajie · Wulingyuan", dates: "Nov 28–Dec 2 · 4 nights", name: "Hilton Garden Inn Zhangjiajie Wulingyuan", room: "3 Twin Rooms · 2 twins each", why: "Modern comfort near the national-park gateway, with staff support for tickets and weather changes.", price: "$986", detail: "$930 shown + estimated 6% VAT", link: "https://www.booking.com/hotel/cn/hilton-garden-inn-zhangjiajie-wulingyuan.html?checkin=2026-11-28&checkout=2026-12-02&group_adults=5&no_rooms=3&group_children=0" },
  { city: "Shenzhen · Huaqiangbei", dates: "Dec 2–5 · 3 nights", name: "Huaqiang Plaza Hotel Shenzhen", room: "3 Superior Twin rooms · 2 twins each", why: "Directly opposite the electronics markets—the purchases can be secured in the hotel between shopping rounds.", price: "$908", detail: "$857 member rate shown + estimated 6% VAT", link: "https://www.booking.com/hotel/cn/hua-qiang-plaza.html?checkin=2026-12-02&checkout=2026-12-05&group_adults=5&no_rooms=3&group_children=0" },
  { city: "Macau", dates: "Dec 5–6 · 1 night", name: "Casa Real Hotel Macau", room: "3 Elite Twin rooms · 2 twins each", why: "Comfortable value close to Outer Harbour ferry—ideal for a one-night stay with five suitcases.", price: "$388", detail: "$369 shown + estimated 5% tax", link: "https://www.booking.com/hotel/mo/casa-real-macau.html?checkin=2026-12-05&checkout=2026-12-06&group_adults=5&no_rooms=3&group_children=0" },
  { city: "Hong Kong · Mong Kok", dates: "Dec 6–9 · 3 nights", name: "Dorsett Mongkok, Hong Kong", room: "3 Comfort Twin rooms · request 2 twins", why: "Strong value, easy Kowloon access, laundry and enough transport options for early HKG departure.", price: "$1,311", detail: "$1,273 shown + estimated 3% city tax", link: "https://www.booking.com/hotel/hk/dorsett-mongkok.html?checkin=2026-12-06&checkout=2026-12-09&group_adults=5&no_rooms=3&group_children=0" },
  { city: "Shanghai · final night", dates: "Dec 9–10 · 1 night", name: "Golden Tulip New Asia Hotel — The Bund", room: "3 Standard Twin rooms · 2 twins each", why: "Returning to the same hotel reduces friction and leaves the final flight protected by an overnight buffer.", price: "$309", detail: "$291 shown + estimated 6% VAT", link: "https://www.booking.com/hotel/cn/jinjiang-metropolo-classiq-shanghai-xinya-bund.html?checkin=2026-12-09&checkout=2026-12-10&group_adults=5&no_rooms=3&group_children=0" },
];

const transport = [
  { date: "Nov 24 → 25", route: "JFK → ICN → PVG", operator: "Korean Air · booked", time: "12:00 → 20:25 +1", duration: "19h 25m · one stop", price: "Booked · price not supplied", status: "BOOKED", note: "Screenshot-confirmed. Add exact flight numbers from the confirmation.", link: "https://www.koreanair.com/flight-status?hl=en", linkLabel: "Check Korean Air status" },
  { date: "Nov 28", route: "Shanghai PVG → Zhangjiajie DYG", operator: "Shanghai Airlines FM7225", time: "10:15 → 12:25", duration: "2h 10m · nonstop", price: "Plan $125 pp · $625 group", status: "PROPOSED", note: "Budget includes one checked bag per person; verify fare rules before paying.", link: "https://www.google.com/travel/flights?q=Flights%20from%20PVG%20to%20DYG%20on%202026-11-28", linkLabel: "Search exact-date flight" },
  { date: "Dec 2", route: "Zhangjiajie DYG → Shenzhen SZX", operator: "Suparna Airlines Y87574", time: "19:40 → 21:45", duration: "2h 05m · nonstop", price: "Plan $115 pp · $575 group", status: "PROPOSED", note: "Seasonal timetable: buy only if the Dec 2 result matches these times and includes five checked bags.", link: "https://www.google.com/travel/flights?q=Flights%20from%20DYG%20to%20SZX%20on%202026-12-02", linkLabel: "Search exact-date flight" },
  { date: "Dec 5", route: "Shenzhen Shekou → Macau Outer Harbour", operator: "TurboJET", time: "09:00 → 10:00", duration: "60m · weekend sailing", price: "CNY 220 pp + bags · ≈ $184 group", status: "PROPOSED", note: "Current schedule lists the 09:00 weekend sailing; reconfirm when December inventory opens.", link: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/", linkLabel: "Official schedule & booking" },
  { date: "Dec 6", route: "Macau Outer Harbour → Hong Kong Sheung Wan", operator: "TurboJET", time: "12:30 → 13:30", duration: "60m · direct", price: "≈ HKD 200 pp + bags · $144 group", status: "PROPOSED", note: "The schedule effective Sep 1, 2026 lists 12:30. Arrive 75 minutes early.", link: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/", linkLabel: "Official schedule & booking" },
  { date: "Dec 9", route: "Hong Kong HKG → Shanghai PVG", operator: "China Eastern MU724", time: "09:45 → 12:25", duration: "2h 40m · nonstop", price: "Plan $145 pp · $725 group", status: "PROPOSED", note: "Choose a fare with one 23kg checked bag each; an 08:00–10:00 nonstop is the acceptable fallback window.", link: "https://www.google.com/travel/flights?q=Flights%20from%20HKG%20to%20PVG%20on%202026-12-09", linkLabel: "Search exact-date flight" },
  { date: "Dec 10", route: "PVG → ICN → JFK", operator: "Korean Air · booked", time: "14:00 → 19:30", duration: "18h 30m · one stop", price: "Booked · price not supplied", status: "BOOKED", note: "Hotel departure is fixed at 09:00, giving a 3h45 airport buffer.", link: "https://www.koreanair.com/flight-status?hl=en", linkLabel: "Check Korean Air status" },
];

const trainComparisons = [
  {
    segment: "Shanghai → Zhangjiajie",
    verdict: "KEEP THE FLIGHT",
    verdictClass: "flight",
    flight: "≈ 7h40 hotel → hotel",
    train: "Fastest rail 7h15 · ≈ 9h15–11h hotel → hotel",
    cost: "HSR 2nd class ≈ $112–123 pp · planned air $125 pp",
    why: "The train saves little or no money once transfers are counted, costs a full sightseeing day and is less forgiving of five checked-size bags.",
    link: "https://us.trip.com/trains/china/route/shanghai-hongqiao-to-zhangjiajiexi-zhangjiajie-west/",
    linkLabel: "See current HSR pattern",
    backup: "https://www.klook.com/en-US/china-high-speed-rail/59-shanghai/161-zhangjiajie/",
    backupLabel: "Compare on Klook",
  },
  {
    segment: "Zhangjiajie → Shenzhen",
    verdict: "FLIGHT · TRAIN BACKUP",
    verdictClass: "backup",
    flight: "Evening flight preserves the weather-flex morning",
    train: "Fastest direct HSR 6h20 · ≈ 8h35–9h45 hotel → hotel",
    cost: "HSR 2nd class ≈ $93–106 pp · planned air $115 pp",
    why: "This is the one genuinely useful rail alternative: comfortable and potentially cheaper. Keep the flight because it protects a fogged-out mountain morning; switch only if the flight changes and every bag complies.",
    link: "https://us.trip.com/trains/china/route/zhangjiajiexi-zhangjiajie-west-to-shenzhenbei-shenzhen-north/",
    linkLabel: "See direct train options",
    backup: "https://www.12306.cn/en/",
    backupLabel: "Official China Railway",
  },
  {
    segment: "Hong Kong → Shanghai",
    verdict: "KEEP THE FLIGHT",
    verdictClass: "flight",
    flight: "Arrive at the Shanghai hotel around 14:30",
    train: "Direct HSR about 8h08 · hotel arrival around 20:30",
    cost: "Rail often competes on comfort, not useful trip time",
    why: "The direct train is impressive, but it sacrifices the protected final Shanghai afternoon and dinner before the booked New York departure.",
    link: "https://www.highspeed.mtr.com.hk/en/trip-planner.html?id=WEK2SHH",
    linkLabel: "Official MTR trip planner",
    backup: "https://us.trip.com/trains/china/route/hong-kong-west-kowloon-to-shanghai-hongqiao/",
    backupLabel: "Compare current trains",
  },
  {
    segment: "Shenzhen → Macau → Hong Kong",
    verdict: "KEEP THE FERRIES",
    verdictClass: "ferry",
    flight: "Direct harbour-to-harbour with the cleanest luggage chain",
    train: "No direct high-speed rail into Macau",
    cost: "Avoids extra Zhuhai station, road and border transfers",
    why: "The overland rail route adds handling and border complexity. Shekou → Outer Harbour → Sheung Wan remains the most efficient sequence for this itinerary.",
    link: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/",
    linkLabel: "Official ferry schedule",
    backup: "https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/transportation",
    backupLabel: "Macau transport guide",
  },
];

const experiences = [
  { city: "Shanghai", items: [
    ["Yu Garden", "CNY 40 · $6 pp", "https://us.trip.com/travel-guide/attraction/shanghai/yu-garden-75615/"],
    ["Shanghai Tower 118F", "CNY 180 · $27 pp", "https://www.klook.com/en-US/activity/4333-shanghai-tower-observation-deck-shanghai/"],
    ["Huangpu night cruise", "$16–22 pp", "https://www.klook.com/en-US/activity/3973-hangpu-river-cruise-shanghai/"],
    ["ERA2 acrobatic show", "$39–56 pp", "https://www.shcircusworld.com/era-tickets.html"],
  ] },
  { city: "Zhangjiajie", items: [
    ["National Park 4-day bundle", "$67–72 pp", "https://www.klook.com/en-US/activity/101803-zhangjiajie-national-forest-park/"],
    ["Tianmen Mountain + cableway", "≈ $40 pp", "https://www.klook.com/en-US/activity/6613-tianmen-mountain-cable-car-gallery-road-zhangjiajie/"],
    ["Grand Canyon + Glass Bridge", "$25–38 pp", "https://www.klook.com/en-US/activity/6602-grand-canyon-glass-bridge-tickets-zhangjiajie/"],
  ] },
  { city: "Shenzhen", items: [
    ["DJI OCT Harbour flagship", "Free · products extra", "https://www.dji.com/where-to-buy/flagship/cn-sz"],
    ["Huaqiangbei buyer guide", "Free", "https://www.cathaypacific.com/cx/en_US/inspiration/shopping/shenzhen-guide-huaqiangbei-electronics-market.html"],
    ["Ping An observation deck", "Optional · ≈ $30 pp", "https://www.klook.com/en-US/search/result/?query=Ping%20An%20Finance%20Center%20Shenzhen"],
  ] },
  { city: "Macau", items: [
    ["Macau Tower observation deck", "$18–21 pp", "https://www.klook.com/activity/506-macau-tower-macau/"],
    ["House of Dancing Water", "From ≈ $55 pp", "https://tickets.cityofdreamsmacau.com/hodw"],
  ] },
  { city: "Hong Kong", items: [
    ["Peak Tram Sky Pass", "HKD 182 · $23 pp", "https://www.thepeak.com.hk/en/ticket-and-booking/purchase-ticket/peak-tram-sky-pass"],
    ["Ngong Ping 360 round trip", "HKD 295 · $38 pp", "https://www.np360.com.hk/en/tickets-promotions/tickets-tours/cable-car-tickets"],
    ["M+ museum", "HKD 190 · $24 pp", "https://www.mplus.org.hk/en/get-tickets/"],
    ["Symphony of Lights", "Free · nightly 20:00", "https://www.tourism.gov.hk/symphony/english/details/details.html"],
  ] },
];

const budget = [
  ["Hotels", "$4,793", "$959", "15 nights · three twin rooms"],
  ["Regional transport", "$3,153", "$631", "3 flights, 2 ferries, vans + local rides"],
  ["Core experiences", "$2,039", "$408", "Selected attractions; optional shows excluded where noted"],
  ["Meals", "$2,750", "$550", "Blended allowance of about $37 per person/day"],
  ["Working subtotal", "$12,735", "$2,547", "Excludes the booked long-haul and tech purchases"],
  ["Recommended 10% reserve", "$1,274", "$255", "Schedule changes, weather and fare movement"],
  ["Comfortable target", "$14,009", "$2,802", "Cash/card target before international airfare + shopping"],
];

const route = [
  ["01", "Shanghai", "3 nights"], ["02", "Zhangjiajie", "4 nights"], ["03", "Shenzhen", "3 nights"],
  ["04", "Macau", "1 night"], ["05", "Hong Kong", "3 nights"], ["06", "Shanghai", "1 night"],
];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}

export default function Home() {
  return (
    <main>
      <nav className="topnav" aria-label="Itinerary sections">
        <a className="wordmark" href="#top"><span>中</span> The Grand Journey</a>
        <div className="navlinks">
          <a href="#plan">Daily plan</a><a href="#explore">50 places</a><a href="#trains">Train check</a><a href="#stays">Hotels</a><a href="#moves">Bookings</a><a href="#budget">Budget</a>
        </div>
      </nav>

      <header id="top" className="hero">
        <img className="hero-photo" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Sandstone%20spire%20forest%20Zhangjiajie%20Hunan.jpg?width=2200" alt="Sandstone pillars in Zhangjiajie National Forest Park" />
        <div className="hero-veil" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A private itinerary for five · 2026</p>
            <h1>China,<br /><em>beautifully timed.</em></h1>
            <p className="hero-deck">Shanghai · Zhangjiajie · Shenzhen · Macau · Hong Kong</p>
            <div className="hero-actions">
              <a className="button button-light" href="#plan">Open the hourly plan</a>
              <a className="button button-ghost" href="#explore">Explore 50 places</a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Trip summary">
            <div><span>Depart New York</span><strong>Nov 24 · 12:00</strong></div>
            <div><span>Land Shanghai</span><strong>Nov 25 · 20:25</strong></div>
            <div><span>Return New York</span><strong>Dec 10 · 19:30</strong></div>
            <div><span>Party</span><strong>5 travelers · 5 bags</strong></div>
            <div><span>Stay plan</span><strong>15 hotel nights</strong></div>
            <div className="hero-total"><span>Land target / person</span><strong>$2,802</strong></div>
            <small>Excludes the already-booked JFK–PVG fare and all tech shopping.</small>
          </aside>
        </div>
        <a className="photo-credit" href="https://commons.wikimedia.org/wiki/File:Sandstone_spire_forest_Zhangjiajie_Hunan.jpg" target="_blank" rel="noreferrer">Photo: Lianguanlun / Wikimedia Commons</a>
      </header>

      <section className="route-section section-shell" aria-labelledby="route-title">
        <div className="section-kicker">The route</div>
        <div className="section-head">
          <h2 id="route-title">One continuous UTC+8 clock.</h2>
          <p>Mainland China, Macau and Hong Kong use the same local time. The only date-line change happens on the two international flight days.</p>
        </div>
        <div className="route-rail">
          {route.map(([number, city, nights], index) => (
            <div className="route-stop" key={city + index}><span>{number}</span><strong>{city}</strong><small>{nights}</small></div>
          ))}
        </div>
        <div className="decision-strip">
          <div><b>Booked</b><span>Korean Air round trip</span></div>
          <div><b>Proposed</b><span>3 regional flights · 2 ferries</span></div>
          <div><b>Room logic</b><span>3 twin rooms = legal occupancy + 6 beds</span></div>
          <div><b>Safety margin</b><span>Final Shanghai overnight preserved</span></div>
        </div>
      </section>

      <section id="plan" className="plan section-shell" aria-labelledby="plan-title">
        <div className="section-kicker">Nov 24 — Dec 10</div>
        <div className="section-head wide">
          <h2 id="plan-title">The hour-by-hour journey</h2>
          <p>All daily times are local. Red markers protect a flight, ferry or late-arrival handoff; do not compress them. Tap any day to expand it.</p>
        </div>
        <div className="days">
          {days.map((day, index) => (
            <details className={"day day-" + day.tone} key={day.date} open={index < 2}>
              <summary>
                <div className="date-block"><span>{day.weekday}</span><strong>{day.date}</strong></div>
                <div className="day-heading"><small>{day.city}</small><h3>{day.title}</h3></div>
                <div className="summary-mark" aria-hidden="true">+</div>
              </summary>
              <div className="day-body">
                <p className="day-intro">{day.intro}</p>
                <ol className="timeline">
                  {day.timeline.map((item, itemIndex) => (
                    <li className={item.critical ? "critical" : ""} key={day.date + item.time + itemIndex}>
                      <time>{item.time}</time>
                      <div><strong>{item.title}</strong>{item.note && <p>{item.note}</p>}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="image-break" aria-label="Shanghai and Hong Kong at night">
        <figure>
          <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Lujiazui%20skyline%20by%20night%20from%20Bund%2C%20fully%20illuminated.jpg?width=1600" alt="Shanghai's illuminated Lujiazui skyline seen from the Bund" loading="lazy" />
          <figcaption>Shanghai · the first and final chapter <a href="https://commons.wikimedia.org/wiki/File:Lujiazui_skyline_by_night_from_Bund,_fully_illuminated.jpg" target="_blank" rel="noreferrer">Daniel Case / CC</a></figcaption>
        </figure>
        <figure>
          <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Hong%20Kong%20Harbour%20Night%202019-06-11.jpg?width=1600" alt="Hong Kong harbour and skyline on a rainy night" loading="lazy" />
          <figcaption>Hong Kong · three nights on the harbour <a href="https://commons.wikimedia.org/wiki/File:Hong_Kong_Harbour_Night_2019-06-11.jpg" target="_blank" rel="noreferrer">Benh LIEU SONG / CC</a></figcaption>
        </figure>
      </section>

      <section id="explore" className="explore section-shell" aria-labelledby="explore-title">
        <div className="section-kicker">The visual city guide</div>
        <div className="section-head wide">
          <h2 id="explore-title">Fifty places, five clear chapters.</h2>
          <p>Choose a city to see its 10 most worthwhile places. Every card has its own photo, the reason to go, realistic time, best timing, price guidance and a trusted next link.</p>
        </div>
        <AttractionsExplorer />
      </section>

      <section id="stays" className="stays section-shell" aria-labelledby="stays-title">
        <div className="section-kicker">Where you sleep</div>
        <div className="section-head wide">
          <h2 id="stays-title">Value hotels, never hostels.</h2>
          <p>The working configuration is three twin rooms in every city. That is the cleanest legal setup for five adults and guarantees six actual beds.</p>
        </div>
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <article className="hotel-card" key={hotel.city + hotel.dates}>
              <div className="hotel-meta"><span>{hotel.city}</span><span>{hotel.dates}</span></div>
              <h3>{hotel.name}</h3><p className="room-line">{hotel.room}</p><p>{hotel.why}</p>
              <div className="price-line"><strong>{hotel.price}</strong><span>group stay estimate</span></div>
              <small>{hotel.detail}. Breakfast not assumed unless selected at checkout.</small>
              <ExternalLink className="text-link" href={hotel.link}>Open exact dates & occupancy</ExternalLink>
            </article>
          ))}
        </div>
        <div className="saver-note">
          <span>Value lever</span>
          <p>In Shanghai and Zhangjiajie, a legal two-room mix (twin + triple/sofa-bed room) may save about <strong>$400–450 for the group</strong>. Keep three twin rooms in Shenzhen, Macau and Hong Kong, where the verified two-room options were unavailable or more expensive.</p>
        </div>
      </section>

      <section id="trains" className="trains section-shell" aria-labelledby="trains-title">
        <div className="section-kicker">Flight, train or ferry?</div>
        <div className="section-head wide">
          <h2 id="trains-title">The rail check, door to door.</h2>
          <p>High-speed rail is evaluated on total trip time, sightseeing lost, price and all five bags—not only the published ride. Exact Nov–Dec 2026 trains are not yet for sale.</p>
        </div>
        <div className="train-alerts">
          <div><span>Ticket window</span><strong>Usually opens 15 days before departure</strong><p>Use passport names exactly. Check 12306 first, then an established international checkout platform if needed.</p></div>
          <div className="bag-alert"><span>Five-bag warning</span><strong>20 kg per adult · 130 cm L+W+H per item</strong><p>China Railway’s high-speed limit may exclude airline-size checked bags. There is no normal checked-baggage service on these trains.</p></div>
        </div>
        <div className="train-grid">
          {trainComparisons.map((item) => (
            <article className="train-card" key={item.segment}>
              <div className="train-card-top"><span>{item.segment}</span><b className={item.verdictClass}>{item.verdict}</b></div>
              <div className="mode-compare"><div><small>Current plan</small><strong>{item.flight}</strong></div><div><small>Rail alternative</small><strong>{item.train}</strong></div></div>
              <p className="train-cost">{item.cost}</p><p>{item.why}</p>
              <div className="train-links"><ExternalLink href={item.link}>{item.linkLabel}</ExternalLink><ExternalLink href={item.backup}>{item.backupLabel}</ExternalLink></div>
            </article>
          ))}
        </div>
        <div className="train-foot">
          <p><strong>Recommendation:</strong> keep all three regional flights and both ferries. Save Zhangjiajie West → Shenzhen North as the comfort backup, then re-run the exact dates when inventory opens.</p>
          <ExternalLink className="text-link" href="https://www.12306.cn/en/faq.html">Official rail luggage FAQ</ExternalLink>
        </div>
        <p className="micro-note">Comparison checked Aug 31, 2026 using current route patterns—not a promise of the eventual Nov–Dec timetable. Re-check train numbers, fares and baggage rules when tickets open.</p>
      </section>

      <section id="moves" className="moves section-shell" aria-labelledby="moves-title">
        <div className="section-kicker">Flights, ferries & handoffs</div>
        <div className="section-head wide">
          <h2 id="moves-title">A chain built not to break.</h2>
          <p>Booked travel is separated from proposed travel. Prices are planning snapshots; the exact checkout total and baggage rules win.</p>
        </div>
        <div className="transport-list">
          {transport.map((item) => (
            <article className="transport-card" key={item.date + item.route}>
              <div className="transport-date"><span>{item.date}</span><b className={item.status === "BOOKED" ? "booked" : "proposed"}>{item.status}</b></div>
              <div className="transport-main"><h3>{item.route}</h3><p>{item.operator}</p></div>
              <div className="transport-time"><strong>{item.time}</strong><span>{item.duration}</span></div>
              <div className="transport-price"><strong>{item.price}</strong><span>{item.note}</span></div>
              <ExternalLink className="text-link" href={item.link}>{item.linkLabel}</ExternalLink>
            </article>
          ))}
        </div>
        <div className="transfer-rule">
          <strong>The five-bag rule</strong>
          <p>Use a pre-booked 7-seat van only when the listing explicitly confirms luggage capacity. A nominal “6-passenger” car may not hold five large checked bags.</p>
          <ExternalLink className="text-link" href="https://www.klook.com/en-US/airport-transfers/">Compare private transfers</ExternalLink>
        </div>
      </section>

      <section id="experiences" className="experiences section-shell" aria-labelledby="experiences-title">
        <div className="section-kicker">Tickets & trusted purchase links</div>
        <div className="section-head wide">
          <h2 id="experiences-title">The best of each city.</h2>
          <p>Official operators are preferred; established ticket platforms are used where they provide easier international checkout or clearer bundles.</p>
        </div>
        <div className="experience-grid">
          {experiences.map((group) => (
            <article className="experience-card" key={group.city}>
              <h3>{group.city}</h3>
              <ul>{group.items.map(([name, price, link]) => (
                <li key={name}><div><strong>{name}</strong><span>{price}</span></div><ExternalLink href={link}>Buy / verify</ExternalLink></li>
              ))}</ul>
            </article>
          ))}
        </div>
        <p className="micro-note">Some December attraction calendars may not yet be open. Do not substitute an unknown reseller; wait for the official or linked platform inventory.</p>
      </section>

      <section className="tech section-shell" aria-labelledby="tech-title">
        <div className="tech-copy">
          <div className="section-kicker light">Shenzhen field guide</div>
          <h2 id="tech-title">Buy the hardware.<br /><em>Keep the proof.</em></h2>
          <p>Huaqiangbei is extraordinary, but price is only one part of value. The itinerary gives you a full comparison day before the official DJI visit.</p>
        </div>
        <div className="tech-rules">
          <div><span>01</span><p><strong>GPU + RAM</strong>Buy sealed, match the exact model/VRAM, photograph serials, test before leaving and get itemized receipts.</p></div>
          <div><span>02</span><p><strong>Drones</strong>Prefer the official DJI flagship. Confirm activation region, U.S. warranty, remote ID requirements and battery Wh rating.</p></div>
          <div><span>03</span><p><strong>Lithium</strong>Spare batteries and power banks belong in carry-on only, protected against short circuit. Ask Korean Air before carrying anything over 100Wh.</p></div>
          <div><span>04</span><p><strong>Customs</strong>Declare purchases. Each eligible returning U.S. resident generally has an $800 personal exemption after a qualifying trip; verify your group’s eligibility.</p></div>
          <div><span>05</span><p><strong>Korean Air cabin</strong>Economy cabin allowance is typically one carry-on plus one personal item, 10kg total. Power banks cannot be used or charged in flight and should not be placed overhead.</p></div>
        </div>
        <div className="tech-links">
          <ExternalLink href="https://www.cbp.gov/travel/international-visitors/know-before-you-visit/customs-duty-information">U.S. Customs guidance</ExternalLink>
          <ExternalLink href="https://www.faa.gov/hazmat/packsafe/lithium-batteries">FAA battery rules</ExternalLink>
          <ExternalLink href="https://www.koreanair.com/contents/plan-your-travel/baggage/restricted-item?hl=en">Korean Air restricted items</ExternalLink>
        </div>
      </section>

      <section id="budget" className="budget section-shell" aria-labelledby="budget-title">
        <div className="section-kicker">The money picture</div>
        <div className="section-head wide">
          <h2 id="budget-title">Comfort where timing matters.</h2>
          <p>Group and per-person estimates for five adults. Technology purchases and the already-booked international airfare are intentionally excluded.</p>
        </div>
        <div className="budget-table" role="table" aria-label="Trip budget">
          <div className="budget-row budget-header" role="row"><span>Category</span><span>Group</span><span>Per person</span><span>What it covers</span></div>
          {budget.map(([category, group, person, note]) => (
            <div className={"budget-row " + (category === "Comfortable target" ? "budget-total" : "")} role="row" key={category}>
              <strong>{category}</strong><span>{group}</span><span>{person}</span><small>{note}</small>
            </div>
          ))}
        </div>
        <p className="micro-note">Price snapshot checked Aug 31, 2026. Conversions used approximately USD 1 = CNY 6.73, HKD 7.84 and MOP 8.08. Inventory, tax display and exchange rates can change.</p>
      </section>

      <section id="book-first" className="booking section-shell" aria-labelledby="booking-title">
        <div className="booking-intro">
          <div className="section-kicker light">The booking sequence</div>
          <h2 id="booking-title">Lock the chain in this order.</h2>
          <p>Nothing beyond Korean Air is booked yet. This order protects the hardest links before spending on timed attractions.</p>
        </div>
        <ol className="booking-steps">
          <li><span>Now</span><div><strong>Regional flights</strong><p>Confirm FM7225, Y87574 and MU724 on the exact dates. Buy only fares that cover one checked bag for each traveler.</p></div></li>
          <li><span>Same day</span><div><strong>Cancelable hotels</strong><p>Reserve the three-twin-room setups and send the Shanghai hotel the Nov 25 late-arrival notice.</p></div></li>
          <li><span>60–90 days</span><div><strong>Ferries + House of Dancing Water</strong><p>Book when December calendars open. Do not change the ports: Shekou → Macau Outer Harbour → Sheung Wan.</p></div></li>
          <li><span>30–45 days</span><div><strong>Mountain and city tickets</strong><p>Use passport names exactly. Hold Zhangjiajie days flexible until the short-range forecast appears.</p></div></li>
          <li><span>48 hours</span><div><strong>Reconfirm every moving part</strong><p>Flight terminals, ferry sailings, attraction closures, driver vehicle size, weather and the group’s five-bag count.</p></div></li>
        </ol>
      </section>

      <section className="nonnegotiables section-shell" aria-label="Non-negotiable timing rules">
        <div><span>01</span><p><strong>Nov 25</strong>Tell the Shanghai hotel that arrival is after 23:00.</p></div>
        <div><span>02</span><p><strong>Dec 5</strong>Be inside Shekou Cruise Centre by 07:30.</p></div>
        <div><span>03</span><p><strong>Dec 9</strong>Take the morning HKG flight; no afternoon substitute.</p></div>
        <div><span>04</span><p><strong>Dec 10</strong>Leave the Shanghai hotel at 09:00, without exception.</p></div>
      </section>

      <footer>
        <div><span className="seal">旅</span><div><strong>China · The Grand Journey</strong><p>Prepared for five travelers · Nov 24–Dec 10, 2026</p></div></div>
        <p>This is a synchronized planning document, not a reservation. Re-open every linked result before payment and save all confirmations offline.</p>
      </footer>
    </main>
  );
}
