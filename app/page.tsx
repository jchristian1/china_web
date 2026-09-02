"use client";

import {
  AlertTriangle, ArrowRight, BadgeCheck, BedDouble, BookOpenCheck, ChevronLeft, ChevronRight,
  BriefcaseBusiness, Bus, CalendarDays, Check, CircleDollarSign, Clock3,
  ExternalLink, Filter, Hotel, Info, Luggage, Map, MapPin, Menu, Minus,
  PackageCheck, Plane, Plus, RotateCcw, Search, Settings2, Ship, ShoppingBag,
  Sparkles, Star, TicketCheck, TrainFront, Utensils, WalletCards, X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BookingState, CityId, EvidenceStatus, PackagePreset, TRAVELERS, TRIP_DAYS,
  TOTAL_NIGHTS, UPDATED_AT, DEFAULT_NIGHTS, attractions, cities, cityName, defaultPackage, hotels,
  importantSources, localPlans, luggageRules, packages, shoppingGuide,
  shoppingPlaces, transportSegments, tripDays,
} from "@/lib/trip-data";

type PageId = "inicio" | "itinerario" | "atracciones" | "transporte" | "hoteles" | "paquetes" | "arma" | "resumen" | "reservas" | "compras" | "equipaje";

interface SavedCustomTrip {
  stayNights: Record<CityId, number>;
  hotelIds: Record<CityId, string>;
  transportIds: Record<string, string>;
  localIds: Record<CityId, string>;
  attractionIds: string[];
  dayPlans: Record<CityId, string[][]>;
  foodPerPersonDay: number;
  baggageReserve: number;
  shoppingWeightKg: number;
}

interface PlannerState {
  stayNights: Record<CityId, number>;
  hotelIds: Record<CityId, string>;
  transportIds: Record<string, string>;
  localIds: Record<CityId, string>;
  attractionIds: string[];
  dayPlans: Record<CityId, string[][]>;
  foodPerPersonDay: number;
  baggageReserve: number;
  internationalFlights: number;
  insurance: number;
  visa: number;
  other: number;
  shoppingWeightKg: number;
  bookingStates: Record<string, BookingState>;
  savedCustomTrip: SavedCustomTrip | null;
}

interface BookingRow {
  key: string;
  type: string;
  date: string;
  name: string;
  cost: number;
  link: string;
  initialState: BookingState;
  note: string;
}

const STORAGE_KEY = "china-familia-2026-v7";

const navItems: Array<{ id: PageId; label: string; short: string; icon: typeof Map }> = [
  { id: "inicio", label: "Inicio", short: "Inicio", icon: Map },
  { id: "itinerario", label: "Itinerario", short: "Ruta", icon: CalendarDays },
  { id: "atracciones", label: "Atracciones", short: "Planes", icon: Sparkles },
  { id: "transporte", label: "Transporte", short: "Moverse", icon: TrainFront },
  { id: "hoteles", label: "Hoteles", short: "Dormir", icon: Hotel },
  { id: "paquetes", label: "Paquetes", short: "Paquetes", icon: PackageCheck },
  { id: "arma", label: "Arma tu viaje", short: "Armar", icon: Settings2 },
  { id: "resumen", label: "Resumen", short: "Total", icon: WalletCards },
  { id: "reservas", label: "Reservas", short: "Reservar", icon: BookOpenCheck },
  { id: "compras", label: "Compras", short: "Compras", icon: ShoppingBag },
  { id: "equipaje", label: "Equipaje + local", short: "Maletas", icon: Luggage },
];

const initialState = (): PlannerState => ({
  stayNights: { ...DEFAULT_NIGHTS },
  hotelIds: { ...defaultPackage.hotelIds },
  transportIds: { ...defaultPackage.transportIds },
  localIds: { ...defaultPackage.localIds },
  attractionIds: [...defaultPackage.attractionIds],
  dayPlans: autoDayPlans(defaultPackage.attractionIds, DEFAULT_NIGHTS),
  foodPerPersonDay: defaultPackage.foodPerPersonDay,
  baggageReserve: defaultPackage.baggageReserve,
  internationalFlights: 0,
  insurance: 0,
  visa: 0,
  other: 0,
  shoppingWeightKg: 25,
  bookingStates: { "intl-flight": "RESERVADO" },
  savedCustomTrip: null,
});

const usd = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money = (value: number) => usd.format(Math.round(value));
const round = (value: number) => Math.round(value);

function autoDayPlans(attractionIds: string[], stayNights: Record<CityId, number>) {
  const result = {} as Record<CityId, string[][]>;
  cities.forEach((city) => {
    const days = Array.from({ length: Math.max(1, stayNights[city.id]) }, () => [] as string[]);
    const hours = days.map(() => 0);
    const areas = days.map(() => new Set<string>());
    const items = attractions.filter((item) => item.city === city.id && attractionIds.includes(item.id)).sort((a, b) => {
      const priority = (item: typeof a) => item.recommendation === "Imprescindible" ? 0 : item.recommendation === "Muy recomendable" ? 1 : 2;
      return priority(a) - priority(b) || b.duration - a.duration || a.time.localeCompare(b.time);
    });
    items.forEach((item) => {
      const area = (item.area ?? city.name).split("/")[0].trim();
      const candidate = days.map((_, index) => ({ index, score: hours[index] + (areas[index].size && !areas[index].has(area) ? 3.5 : 0) + (hours[index] + item.duration > 8 ? 50 : 0) })).sort((a, b) => a.score - b.score)[0].index;
      days[candidate].push(item.id); hours[candidate] += item.duration; areas[candidate].add(area);
    });
    days.forEach((day) => day.sort((a, b) => (attractions.find((item) => item.id === a)?.time ?? "").localeCompare(attractions.find((item) => item.id === b)?.time ?? "")));
    result[city.id] = days;
  });
  return result;
}

const statusText: Record<EvidenceStatus, string> = {
  VERIFICADO: "Verificado", ESTIMADO: "Estimado", NO_PUBLICADO: "Horario no publicado", VARIABLE: "Precio/horario variable",
};
const bookingText: Record<BookingState, string> = {
  RESERVADO: "Reservado", LISTO: "Listo para reservar", ESPERANDO: "Esperando horario", OPCIONAL: "Opcional",
};

type TimelineEvent = { time: string; title: string; note?: string; critical?: boolean };

const travelEventsByOption: Record<string, TimelineEvent[]> = {
  "sh-zjj-flight": [
    { time: "≈06:30", title: "Check-out y traslado al aeropuerto", note: "Elegir una salida matutina real; ajustar cuando se emita el billete." },
    { time: "≈08:00", title: "Facturación, seguridad y 5 maletas" },
    { time: "≈10:00", title: "Vuelo directo Shanghái→DYG", note: "Ventana recomendada, no número de vuelo confirmado.", critical: true },
    { time: "≈12:30", title: "Llegada a DYG + recogida" },
    { time: "≈14:30", title: "Traslado y check-in en Wulingyuan" },
    { time: "18:00", title: "Cena de Hunan + preparar capas" },
  ],
  "sh-zjj-train": [
    { time: "≈06:00", title: "Bloquear una salida temprana hacia Hongqiao", note: "Ventana estimada: 12306 todavía no ha publicado el tren del 28 nov.", critical: true },
    { time: "≈08:00", title: "HSR Shanghai Hongqiao→Zhangjiajie West", note: "Hora exacta y número de tren pendientes; reservar 9–11 h puerta a puerta." },
    { time: "≈17:00", title: "Ventana estimada de llegada y check-in", note: "No fijar una actividad con entrada esa tarde hasta tener el billete." },
    { time: "≈19:00", title: "Cena cerca del hotel" },
  ],
  "zjj-hk-train": [
    { time: "11:45", title: "Check-out y van Wulingyuan→Zhangjiajie West", note: "Dejar margen para tráfico, pasaportes y las 5 maletas." },
    { time: "14:10", title: "Control y embarque ferroviario" },
    { time: "≈15:10", title: "HSR directo Zhangjiajie West→West Kowloon", note: "Patrón actual; el tren exacto del 2 dic todavía no está a la venta.", critical: true },
    { time: "≈21:51", title: "Llegada a Hong Kong + controles" },
    { time: "≈22:45", title: "Check-in tardío en Hong Kong" },
  ],
  "zjj-hk-flight": [
    { time: "Confirmar", title: "Vuelo DYG→HKG no publicado para diciembre", note: "Greater Bay Airlines no muestra resultados para noviembre; no bloquear una hora hasta que exista inventario.", critical: true },
  ],
  "hk-mo-ferry": [
    { time: "08:00", title: "Desayuno, check-out y consigna" },
    { time: "14:15", title: "Recoger equipaje y llegar a Sheung Wan" },
    { time: "14:45", title: "Facturar las 5 maletas" },
    { time: "≈15:30", title: "TurboJET Sheung Wan→Outer Harbour", note: "Salida del horario vigente; reconfirmar el 5 dic.", critical: true },
    { time: "≈18:00", title: "Check-in y cena en Macao" },
  ],
  "hk-mo-bus": [
    { time: "13:00", title: "Check-out y traslado al puerto HZMB de Hong Kong" },
    { time: "≈14:30", title: "Bus HZMB + controles fronterizos", note: "Servicio 24 h; mover las 5 maletas en inmigración." },
    { time: "≈17:30", title: "Llegada al hotel en Macao" },
  ],
  "mo-sz-ferry": [
    { time: "08:00", title: "Desayuno, check-out y consigna" },
    { time: "09:00", title: "Bloque corto de patrimonio o Cotai" },
    { time: "16:30", title: "Recoger equipaje y llegar a Outer Harbour" },
    { time: "17:15", title: "Documentos y facturación de 5 maletas" },
    { time: "18:00", title: "Ferry Outer Harbour→Shekou", note: "Horario vigente desde 5 sep; confirmar venta del 6 dic.", critical: true },
    { time: "≈20:30", title: "Check-in en Shenzhen" },
  ],
  "mo-sz-train": [
    { time: "≈11:00", title: "Salida hacia Gongbei", note: "Ventana estimada hasta que 12306 publique conexiones." },
    { time: "≈13:00", title: "Cruce fronterizo + Zhuhai→Guangzhou South→Shenzhen North", note: "No existe un billete directo único; requiere transbordo.", critical: true },
    { time: "≈18:30", title: "Llegada estimada al hotel en Shenzhen" },
  ],
  "sz-sh-flight": [
    { time: "06:30", title: "Check-out con 5 maletas y compras" },
    { time: "07:30", title: "Llegada a SZX, facturación y seguridad" },
    { time: "≈09:30", title: "Vuelo directo SZX→SHA preferido", note: "Elegir el vuelo real del 9 dic dentro de la ventana 08:00–10:30.", critical: true },
    { time: "≈12:00", title: "Llegada a Hongqiao + equipaje" },
    { time: "≈13:30", title: "Check-in final en Shanghái" },
    { time: "18:30", title: "Cena de despedida" },
  ],
  "sz-sh-train": [
    { time: "≈06:00", title: "Salida hacia Shenzhen North", note: "12306 todavía no vende el 9 dic.", critical: true },
    { time: "≈07:30", title: "HSR Shenzhen North→Shanghai Hongqiao", note: "El servicio más rápido actual tarda unas 6 h 34; la hora exacta puede cambiar." },
    { time: "≈16:00", title: "Ventana estimada de check-in en Shanghái" },
  ],
};

function attractionsOverlap(items: typeof attractions) {
  let latestEnd = -1;
  // Bailong is a timed add-on inside the full-day forest-park route, not a
  // second simultaneous excursion.
  return items.filter((item) => item.id !== "zjj-bailong").sort((a, b) => a.time.localeCompare(b.time)).some((item) => {
    const [hours, minutes] = item.time.split(":").map(Number);
    const start = hours * 60 + minutes;
    const overlaps = start < latestEnd;
    latestEnd = Math.max(latestEnd, start + item.duration * 60);
    return overlaps;
  });
}

function sortableTime(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 24 * 60;
}

function attractionDateAlert(itemId: string, date: string) {
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  const closedDays: Record<string, number[]> = {
    "sh-natural": [1],
    "sh-museum-east": [2],
    "mo-grand-prix": [2],
    "mo-2049": [1, 2],
    "hk-mplus": [1],
    "hk-space": [2],
    "hk-palace": [2],
  };
  if (closedDays[itemId]?.includes(weekday)) return "La fecha recalculada coincide con un día de cierre del horario vigente. Mueve o quita esta experiencia.";
  return "";
}

function transportDateAlert(optionId: string, date: string) {
  if (optionId === "zjj-hk-flight" && date >= "2026-11-01") return "Greater Bay Airlines no muestra resultados para noviembre de 2026. Mantén esta opción en espera hasta que aparezca inventario oficial.";
  return "";
}

const iso = (date: Date) => date.toISOString().slice(0, 10);
const addDays = (date: Date, count: number) => new Date(date.getTime() + count * 86_400_000);
const dayLabel = (date: Date) => new Intl.DateTimeFormat("es-ES", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(date).replace(".", "");
const shortDate = (value: string) => new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`)).replace(".", "");

type DynamicSchedule = ReturnType<typeof buildDynamicSchedule>;

function buildDynamicSchedule(stayNights: Record<CityId, number>) {
  const template = (date: string) => tripDays.find((day) => day.date === date)!;
  const cityDates = Object.fromEntries(cities.map((city) => [city.id, [] as string[]])) as Record<CityId, string[]>;
  const days: typeof tripDays = [template("2026-11-24")];
  const segmentDates: Record<string, string> = {};
  let cursor = new Date("2026-11-25T12:00:00Z");

  const pushDay = (city: CityId, sourceDate: string | undefined, title: string) => {
    const date = iso(cursor);
    const source = sourceDate ? template(sourceDate) : undefined;
    days.push({
      date,
      label: dayLabel(cursor),
      city,
      title: source?.title ?? title,
      baseEvents: source?.baseEvents ?? [
        { time: "09:00", title: "Día flexible en la ciudad", note: "Añade experiencias desde Atracciones o úsalo como margen de descanso, clima y compras." },
        { time: "13:00", title: "Almuerzo" },
        { time: "19:00", title: "Cena y revisión del día siguiente" },
      ],
    });
    cityDates[city].push(date);
    cursor = addDays(cursor, 1);
    return date;
  };

  const firstShanghaiNights = Math.max(1, stayNights.shanghai - 1);
  const shTemplates = ["2026-11-25", "2026-11-26", "2026-11-27"];
  for (let index = 0; index < firstShanghaiNights; index += 1) pushDay("shanghai", shTemplates[index], "Día adicional en Shanghái");

  const cityBlocks: Array<{ city: CityId; segment: string; templates: string[]; extraTitle: string }> = [
    { city: "zhangjiajie", segment: "sh-zjj", templates: ["2026-11-28", "2026-11-29", "2026-11-30", "2026-12-01"], extraTitle: "Día flexible en Zhangjiajie" },
    { city: "hongkong", segment: "zjj-hk", templates: ["2026-12-02", "2026-12-03", "2026-12-04"], extraTitle: "Día adicional en Hong Kong" },
    { city: "macau", segment: "hk-mo", templates: ["2026-12-05"], extraTitle: "Día adicional en Macao" },
    { city: "shenzhen", segment: "mo-sz", templates: ["2026-12-06", "2026-12-07", "2026-12-08"], extraTitle: "Día adicional en Shenzhen" },
  ];
  for (const block of cityBlocks) {
    for (let index = 0; index < stayNights[block.city]; index += 1) {
      const date = pushDay(block.city, block.templates[index], block.extraTitle);
      if (index === 0) segmentDates[block.segment] = date;
    }
  }

  segmentDates["sz-sh"] = pushDay("shanghai", "2026-12-09", "Regreso final a Shanghái");
  const departureTemplate = template("2026-12-10");
  days.push({ ...departureTemplate, date: iso(cursor), label: dayLabel(cursor) });

  const cityDateLabels = Object.fromEntries(cities.map((city) => {
    const dates = cityDates[city.id];
    const first = dates[0];
    const last = dates[dates.length - 1];
    const label = city.id === "shanghai" && dates.length > 1
      ? `${shortDate(first)}–${shortDate(dates[dates.length - 2])} + ${shortDate(last)}`
      : first === last ? shortDate(first) : `${shortDate(first)}–${shortDate(last)}`;
    return [city.id, label];
  })) as Record<CityId, string>;

  const defaultAttractionDates: Record<CityId, string[]> = {
    shanghai: ["2026-11-25", "2026-11-26", "2026-11-27", "2026-12-09"],
    zhangjiajie: ["2026-11-29", "2026-11-30", "2026-12-01", "2026-12-02"],
    hongkong: ["2026-12-03", "2026-12-04", "2026-12-05"],
    macau: ["2026-12-05", "2026-12-06"],
    shenzhen: ["2026-12-07", "2026-12-08", "2026-12-09"],
  };
  const attractionCandidates: Record<CityId, string[]> = {
    shanghai: cityDates.shanghai,
    zhangjiajie: cityDates.zhangjiajie.slice(1).length ? cityDates.zhangjiajie.slice(1) : cityDates.zhangjiajie,
    hongkong: cityDates.hongkong.slice(1).length ? cityDates.hongkong.slice(1) : cityDates.hongkong,
    macau: [...cityDates.macau, segmentDates["mo-sz"]].filter(Boolean),
    shenzhen: cityDates.shenzhen.slice(1).length ? cityDates.shenzhen.slice(1) : cityDates.shenzhen,
  };
  const attractionDates = Object.fromEntries(attractions.map((item) => {
    const originalIndex = Math.max(0, defaultAttractionDates[item.city].indexOf(item.day));
    const candidates = attractionCandidates[item.city];
    return [item.id, candidates[Math.min(originalIndex, candidates.length - 1)] ?? cityDates[item.city][0]];
  })) as Record<string, string>;

  return { days, cityDates, cityDateLabels, segmentDates, attractionDates, departureDate: iso(cursor) };
}

function attractionPlannedDate(state: PlannerState, schedule: DynamicSchedule, itemId: string) {
  const item = attractions.find((candidate) => candidate.id === itemId);
  if (!item) return schedule.attractionDates[itemId];
  const plannedDay = (state.dayPlans[item.city] ?? []).findIndex((ids) => ids.includes(itemId));
  return plannedDay >= 0 ? (schedule.cityDates[item.city][Math.min(plannedDay, schedule.cityDates[item.city].length - 1)] ?? schedule.attractionDates[itemId]) : schedule.attractionDates[itemId];
}

function selectedTransportOption(segmentId: string, optionId: string) {
  return transportSegments.find((segment) => segment.id === segmentId)?.options.find((option) => option.id === optionId);
}

function transportBookingUrl(option: NonNullable<ReturnType<typeof selectedTransportOption>>, date: string) {
  if (!option.bookingUrl.includes("google.com/travel/flights")) return option.bookingUrl;
  return option.bookingUrl.replace(/on%20\d{4}-\d{2}-\d{2}/, `on%20${date}`);
}

function hotelStayPrice(hotel: (typeof hotels)[number] | undefined, nights: number) {
  if (!hotel) return 0;
  return round((hotel.total / DEFAULT_NIGHTS[hotel.city]) * nights);
}

function localPlanPrice(plan: (typeof localPlans)[number] | undefined, nights: number) {
  if (!plan) return 0;
  return round((plan.groupPrice / DEFAULT_NIGHTS[plan.city]) * nights);
}

function costForSelections(hotelIds: Record<CityId, string>, transportIds: Record<string, string>, localIds: Record<CityId, string>, attractionIds: string[], foodPerPersonDay: number, baggageReserve: number, stayNights: Record<CityId, number>) {
  const hotelCost = Object.entries(hotelIds).reduce((sum, [cityId, id]) => sum + hotelStayPrice(hotels.find((hotel) => hotel.id === id), stayNights[cityId as CityId]), 0);
  const transportCost = Object.entries(transportIds).reduce((sum, [segmentId, optionId]) => sum + (selectedTransportOption(segmentId, optionId)?.groupPrice ?? 0), 0);
  const localCost = Object.entries(localIds).reduce((sum, [cityId, id]) => sum + localPlanPrice(localPlans.find((plan) => plan.id === id), stayNights[cityId as CityId]), 0);
  const attractionCost = attractionIds.reduce((sum, id) => sum + (attractions.find((item) => item.id === id)?.pricePerPerson ?? 0) * TRAVELERS, 0);
  const foodCost = foodPerPersonDay * TRAVELERS * TRIP_DAYS;
  return { hotelCost, transportCost, localCost, attractionCost, foodCost, baggageCost: baggageReserve };
}

function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return <span className={`evidence evidence-${status.toLowerCase()}`}>{statusText[status]}</span>;
}

function SourceLink({ href, label = "Fuente" }: { href: string; label?: string }) {
  return <a className="source-link" href={href} target="_blank" rel="noreferrer">{label}<ExternalLink size={13} aria-hidden="true" /></a>;
}

function SelectButton({ selected, onClick, label }: { selected: boolean; onClick: () => void; label?: string }) {
  return <button type="button" className={`select-button ${selected ? "is-selected" : ""}`} onClick={onClick}>{selected ? <Check size={17} /> : <Plus size={17} />}{label ?? (selected ? "Seleccionado" : "Elegir")}</button>;
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>;
}

function DetailModal({ title, images, onClose, children }: { title: string; images: string[]; onClose: () => void; children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState(0);
  const safeImages = Array.from(new Set(images));
  const moveImage = (direction: number) => setActiveImage((current) => (current + direction + safeImages.length) % safeImages.length);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (safeImages.length > 1 && event.key === "ArrowLeft") setActiveImage((current) => (current - 1 + safeImages.length) % safeImages.length);
      if (safeImages.length > 1 && event.key === "ArrowRight") setActiveImage((current) => (current + 1) % safeImages.length);
    };
    document.addEventListener("keydown", keyboard);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", keyboard); document.body.style.overflow = ""; };
  }, [onClose, safeImages.length]);
  return <div className="detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><section className="detail-modal" role="dialog" aria-modal="true" aria-label={title}><button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar detalle"><X /></button><div className="detail-gallery"><img src={safeImages[activeImage]} alt={`${title} · foto ${activeImage + 1}`} />{safeImages.length > 1 && <><button type="button" className="gallery-arrow gallery-previous" onClick={() => moveImage(-1)} aria-label="Foto anterior"><ChevronLeft /></button><button type="button" className="gallery-arrow gallery-next" onClick={() => moveImage(1)} aria-label="Foto siguiente"><ChevronRight /></button></>}<div>{safeImages.map((image, index) => <button type="button" key={`${image}-${index}`} className={index === activeImage ? "is-active" : ""} onClick={() => setActiveImage(index)} aria-label={`Ver foto ${index + 1}`}><img src={image} alt="" /></button>)}</div><span>{activeImage + 1}/{safeImages.length} {safeImages.length === 1 ? "foto verificada" : "fotos"}</span></div><div className="detail-content"><span className="eyebrow">Ficha práctica</span><h2>{title}</h2>{children}</div></section></div>;
}

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Map }) {
  return <div className="metric-card"><Icon size={19} aria-hidden="true" /><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = max ? Math.min(100, (value / max) * 100) : 0;
  return <span className="mini-progress" aria-label={`${value} de ${max}`}><i style={{ width: `${percentage}%` }} /></span>;
}

function compatibleTransportIds(candidate?: Record<string, string>) {
  return Object.fromEntries(transportSegments.map((segment) => {
    const selected = candidate?.[segment.id];
    const valid = segment.options.some((option) => option.id === selected);
    return [segment.id, valid ? selected : defaultPackage.transportIds[segment.id]];
  })) as Record<string, string>;
}

export default function Home() {
  const [state, setState] = useState<PlannerState>(initialState);
  const [page, setPage] = useState<PageId>("inicio");
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
        ?? window.localStorage.getItem("china-familia-2026-v6")
        ?? window.localStorage.getItem("china-familia-2026-v5")
        ?? window.localStorage.getItem("china-familia-2026-v4")
        ?? window.localStorage.getItem("china-familia-2026-v3")
        ?? window.localStorage.getItem("china-familia-2026-v2");
      if (stored) {
        const parsed = JSON.parse(stored);
        const savedCustomTrip = parsed.savedCustomTrip ? { ...parsed.savedCustomTrip, transportIds: compatibleTransportIds(parsed.savedCustomTrip.transportIds) } : null;
        setState({ ...initialState(), ...parsed, transportIds: compatibleTransportIds(parsed.transportIds), dayPlans: { ...initialState().dayPlans, ...(parsed.dayPlans ?? {}) }, savedCustomTrip });
      }
      const hash = window.location.hash.replace("#", "") as PageId;
      if (navItems.some((item) => item.id === hash)) setPage(hash);
    } catch { /* localStorage can be blocked; keep in-memory state. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* keep working in memory */ }
  }, [ready, state]);

  useEffect(() => {
    if (!ready) return;
    window.history.replaceState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, ready]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const selectedHotels = useMemo(() => cities.map((city) => hotels.find((hotel) => hotel.id === state.hotelIds[city.id])).filter(Boolean), [state.hotelIds]);
  const selectedAttractions = useMemo(() => attractions.filter((attraction) => state.attractionIds.includes(attraction.id)), [state.attractionIds]);
  const schedule = useMemo(() => buildDynamicSchedule(state.stayNights), [state.stayNights]);
  const baseCosts = useMemo(() => costForSelections(state.hotelIds, state.transportIds, state.localIds, state.attractionIds, state.foodPerPersonDay, state.baggageReserve, state.stayNights), [state]);
  const extras = state.internationalFlights + state.insurance + state.visa + state.other;
  const total = Object.values(baseCosts).reduce((sum, value) => sum + value, 0) + extras;
  const hasIntlPrice = state.internationalFlights > 0;

  const bookingRows = useMemo<BookingRow[]>(() => {
    const rows: BookingRow[] = [{ key: "intl-flight", type: "Vuelo", date: "24 nov / 10 dic", name: "Korean Air · JFK↔PVG (comprado)", cost: state.internationalFlights, link: "https://www.koreanair.com/", initialState: "RESERVADO", note: state.internationalFlights ? "Importe incluido en el total." : "Añadir el importe pagado en Resumen." }];
    const shanghaiHotel = hotels.find((hotel) => hotel.id === state.hotelIds.shanghai);
    if (shanghaiHotel) {
      const firstNights = Math.max(1, state.stayNights.shanghai - 1);
      const groupNight = shanghaiHotel.total / DEFAULT_NIGHTS.shanghai;
      rows.push(
        { key: "hotel-shanghai-1", type: "Hotel", date: `${shortDate(schedule.cityDates.shanghai[0])} · ${firstNights}n`, name: `${shanghaiHotel.name} · primera estancia`, cost: round(groupNight * firstNights), link: shanghaiHotel.bookingUrl, initialState: "LISTO", note: `${firstNights} noches · configuración para 5` },
        { key: "hotel-shanghai-2", type: "Hotel", date: `${shortDate(schedule.segmentDates["sz-sh"])} · 1n`, name: `${shanghaiHotel.name} · noche final`, cost: round(groupNight), link: shanghaiHotel.bookingUrl, initialState: "LISTO", note: "Reserva separada · 1 noche" },
      );
    }
    cities.filter((city) => city.id !== "shanghai").forEach((city) => {
      const hotel = hotels.find((item) => item.id === state.hotelIds[city.id]);
      if (hotel) rows.push({ key: `hotel-${city.id}`, type: "Hotel", date: schedule.cityDateLabels[city.id], name: hotel.name, cost: hotelStayPrice(hotel, state.stayNights[city.id]), link: hotel.bookingUrl, initialState: "LISTO", note: hotel.roomConfig });
    });
    transportSegments.forEach((segment) => {
      const option = selectedTransportOption(segment.id, state.transportIds[segment.id]);
      if (option) { const dateAlert = transportDateAlert(option.id, schedule.segmentDates[segment.id]); rows.push({ key: `transport-${segment.id}`, type: option.mode, date: shortDate(schedule.segmentDates[segment.id]), name: option.name, cost: option.groupPrice, link: transportBookingUrl(option, schedule.segmentDates[segment.id]), initialState: option.status === "NO_PUBLICADO" || dateAlert ? "ESPERANDO" : "LISTO", note: dateAlert || option.statusNote }); }
    });
    selectedAttractions.forEach((attraction) => {
      const isFree = attraction.pricePerPerson === 0;
      const plannedDate = attractionPlannedDate(state, schedule, attraction.id);
      const dateAlert = attractionDateAlert(attraction.id, plannedDate);
      rows.push({ key: `attraction-${attraction.id}`, type: "Atracción", date: shortDate(plannedDate), name: attraction.name, cost: round(attraction.pricePerPerson * TRAVELERS), link: attraction.bookingUrl, initialState: attraction.status === "NO_PUBLICADO" || dateAlert ? "ESPERANDO" : isFree ? "OPCIONAL" : "LISTO", note: dateAlert || attraction.booking });
    });
    return rows;
  }, [schedule, selectedAttractions, state]);

  const bookedCount = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "RESERVADO").length;
  const waitingCount = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "ESPERANDO").length;
  const go = (next: PageId) => { setPage(next); setMenuOpen(false); };

  const applyPackage = (preset: PackagePreset) => {
    setState((current) => ({ ...current, stayNights: { ...DEFAULT_NIGHTS }, hotelIds: { ...preset.hotelIds }, transportIds: { ...preset.transportIds }, localIds: { ...preset.localIds }, attractionIds: [...preset.attractionIds], dayPlans: autoDayPlans(preset.attractionIds, DEFAULT_NIGHTS), foodPerPersonDay: preset.foodPerPersonDay, baggageReserve: preset.baggageReserve, bookingStates: { "intl-flight": current.bookingStates["intl-flight"] ?? "RESERVADO" } }));
    setNotice(`Paquete ${preset.name} aplicado. Puedes cambiar cualquier elección.`);
  };

  const saveCustomTrip = () => {
    setState((current) => ({
      ...current,
      savedCustomTrip: {
        stayNights: { ...current.stayNights }, hotelIds: { ...current.hotelIds }, transportIds: { ...current.transportIds },
        localIds: { ...current.localIds }, attractionIds: [...current.attractionIds],
        dayPlans: Object.fromEntries(Object.entries(current.dayPlans).map(([city, days]) => [city, days.map((day) => [...day])])) as Record<CityId, string[][]>,
        foodPerPersonDay: current.foodPerPersonDay, baggageReserve: current.baggageReserve, shoppingWeightKg: current.shoppingWeightKg,
      },
    }));
    setNotice("Tu viaje personalizado quedó guardado en Paquetes.");
  };

  const applyCustomTrip = () => {
    setState((current) => current.savedCustomTrip ? {
      ...current,
      ...current.savedCustomTrip,
      stayNights: { ...current.savedCustomTrip.stayNights }, hotelIds: { ...current.savedCustomTrip.hotelIds },
      transportIds: { ...current.savedCustomTrip.transportIds }, localIds: { ...current.savedCustomTrip.localIds },
      attractionIds: [...current.savedCustomTrip.attractionIds],
      dayPlans: Object.fromEntries(Object.entries(current.savedCustomTrip.dayPlans).map(([city, days]) => [city, days.map((day) => [...day])])) as Record<CityId, string[][]>,
      bookingStates: { "intl-flight": current.bookingStates["intl-flight"] ?? "RESERVADO" },
    } : current);
    setNotice("Viaje personalizado aplicado.");
  };

  const toggleAttraction = (id: string) => setState((current) => {
    const removing = current.attractionIds.includes(id);
    const dayPlans = removing ? Object.fromEntries(Object.entries(current.dayPlans).map(([city, days]) => [city, days.map((ids) => ids.filter((item) => item !== id))])) as Record<CityId, string[][]> : current.dayPlans;
    return { ...current, attractionIds: removing ? current.attractionIds.filter((item) => item !== id) : [...current.attractionIds, id], dayPlans, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => key !== `attraction-${id}`)) };
  });
  const reset = () => { if (!window.confirm("¿Restablecer todas las decisiones al paquete Premium inicial?")) return; setState(initialState()); setNotice("Decisiones restablecidas."); };
  const common = { state, setState, go, toggleAttraction, total, baseCosts, bookingRows, bookedCount, waitingCount, schedule };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => go("inicio")} aria-label="Ir al inicio"><span className="brand-seal">中</span><span><strong>CHINA · 2026</strong><small>Plan familiar · 5 viajeros</small></span></button>
        <div className="topbar-total"><span>{hasIntlPrice ? "Total completo" : "Total parcial"}</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></div>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Secciones del planificador">
        {navItems.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} className={page === item.id ? "is-active" : ""} onClick={() => go(item.id)}><Icon size={16} /><span>{item.label}</span></button>; })}
      </nav>
      <div className="progress-ribbon">
        <div><BedDouble size={15} /><span>Hoteles</span><strong>{selectedHotels.length}/5</strong><ProgressBar value={selectedHotels.length} max={5} /></div>
        <div><TrainFront size={15} /><span>Tramos</span><strong>{Object.keys(state.transportIds).length}/5</strong><ProgressBar value={Object.keys(state.transportIds).length} max={5} /></div>
        <div><TicketCheck size={15} /><span>Atracciones</span><strong>{selectedAttractions.length}</strong><ProgressBar value={selectedAttractions.length} max={attractions.length} /></div>
        <div><BookOpenCheck size={15} /><span>Reservado</span><strong>{bookedCount}/{bookingRows.length}</strong><ProgressBar value={bookedCount} max={bookingRows.length} /></div>
      </div>
      <main>
        {page === "inicio" && <Dashboard {...common} hasIntlPrice={hasIntlPrice} reset={reset} />}
        {page === "itinerario" && <ItineraryPage {...common} />}
        {page === "atracciones" && <AttractionsPage {...common} />}
        {page === "transporte" && <TransportPage {...common} />}
        {page === "hoteles" && <HotelsPage {...common} />}
        {page === "paquetes" && <PackagesPage {...common} applyPackage={applyPackage} saveCustomTrip={saveCustomTrip} applyCustomTrip={applyCustomTrip} />}
        {page === "arma" && <BuilderPage {...common} saveCustomTrip={saveCustomTrip} />}
        {page === "resumen" && <SummaryPage {...common} hasIntlPrice={hasIntlPrice} />}
        {page === "reservas" && <BookingsPage {...common} />}
        {page === "compras" && <ShoppingPage {...common} />}
        {page === "equipaje" && <LuggagePage {...common} />}
      </main>
      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navItems.slice(0, 5).map((item) => { const Icon = item.icon; return <button key={item.id} type="button" className={page === item.id ? "is-active" : ""} onClick={() => go(item.id)}><Icon size={20} /><span>{item.short}</span></button>; })}
        <button type="button" className={navItems.slice(5).some((item) => item.id === page) ? "is-active" : ""} onClick={() => setMenuOpen(true)}><Menu size={20} /><span>Más</span></button>
      </nav>
      <footer className="site-footer"><div><span className="brand-seal">中</span><p><strong>China 2026 · plan familiar</strong><br />Datos revisados el {UPDATED_AT}. Todos los importes son para 5 adultos salvo indicación.</p></div><div className="footer-links">{importantSources.map((source) => <SourceLink key={source.url} href={source.url} label={source.label} />)}</div></footer>
      {notice && <div className="toast" role="status"><Check size={18} />{notice}</div>}
      {!ready && <div className="loading-cover">Cargando decisiones…</div>}
    </div>
  );
}

type CommonProps = {
  state: PlannerState;
  setState: React.Dispatch<React.SetStateAction<PlannerState>>;
  go: (page: PageId) => void;
  toggleAttraction: (id: string) => void;
  total: number;
  baseCosts: ReturnType<typeof costForSelections>;
  bookingRows: BookingRow[];
  bookedCount: number;
  waitingCount: number;
  schedule: DynamicSchedule;
};

function Dashboard({ state, go, total, baseCosts, bookingRows, bookedCount, waitingCount, hasIntlPrice, reset }: CommonProps & { hasIntlPrice: boolean; reset: () => void }) {
  const selectedHotelNames = cities.map((city) => hotels.find((hotel) => hotel.id === state.hotelIds[city.id])?.name).filter(Boolean);
  return <>
    <section className="hero"><img src="/attractions/hero-china.webp" alt="Pilares de arenisca de Zhangjiajie entre nubes al amanecer" /><div className="hero-shade" /><div className="hero-content"><span className="eyebrow light">24 noviembre — 10 diciembre 2026</span><h1>Decidir el viaje,<br />no solo mirarlo.</h1><p>Compara opciones reales para 5, elige una y ve al instante qué cambia en la ruta, el presupuesto y las compras pendientes.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => go("arma")}>Armar nuestro viaje <ArrowRight size={18} /></button><button className="ghost-button" type="button" onClick={() => go("resumen")}>Ver total actual</button></div></div><div className="hero-facts"><div><strong>16</strong><span>días</span></div><div><strong>5</strong><span>viajeros</span></div><div><strong>5</strong><span>destinos</span></div><div><strong>15</strong><span>noches</span></div></div></section>
    <section className="content-section dashboard-section">
      <div className="status-callout warning"><AlertTriangle size={21} /><div><strong>El plan es utilizable, pero no todo se puede comprar hoy.</strong><p>12306 todavía no publica los trenes de finales de noviembre/diciembre y varios ferries deben reconfirmarse. La app los marca como “Esperando horario” en vez de inventar servicios.</p></div><button type="button" onClick={() => go("reservas")}>Ver {waitingCount} pendientes</button></div>
      <div className="section-title-row"><div><span className="eyebrow">Panel de decisiones</span><h2>Así está el viaje ahora</h2></div><button type="button" className="quiet-button" onClick={reset}><RotateCcw size={15} /> Restablecer Premium</button></div>
      <div className="metrics-grid"><Metric icon={WalletCards} label={hasIntlPrice ? "Total para 5" : "Total parcial para 5"} value={money(total)} note={`${money(total / TRAVELERS)} por persona`} /><Metric icon={Hotel} label="Hoteles" value={money(baseCosts.hotelCost)} note="5 destinos · 6 reservas" /><Metric icon={TicketCheck} label="Experiencias" value={String(state.attractionIds.length)} note={`${money(baseCosts.attractionCost)} para 5`} /><Metric icon={BookOpenCheck} label="Compras completadas" value={`${bookedCount}/${bookingRows.length}`} note={`${waitingCount} esperan horario`} /></div>
      {!hasIntlPrice && <button type="button" className="missing-cost" onClick={() => go("resumen")}><Info size={18} /><span><strong>Falta el importe de los vuelos internacionales comprados.</strong> El total mostrado es parcial; añádelo para obtener el costo real final.</span><ArrowRight size={17} /></button>}
      <div className="decision-grid"><article className="decision-card"><span className="card-icon"><Hotel /></span><div><small>Selección actual</small><h3>Hoteles</h3><p>{selectedHotelNames.join(" · ")}</p></div><button type="button" onClick={() => go("hoteles")}>Comparar</button></article><article className="decision-card"><span className="card-icon"><TrainFront /></span><div><small>5 tramos</small><h3>Transporte interurbano</h3><p>2 vuelos · 1 tren directo · 2 ferries en el punto de partida Premium.</p></div><button type="button" onClick={() => go("transporte")}>Comparar</button></article><article className="decision-card"><span className="card-icon"><Settings2 /></span><div><small>Todo mezclable</small><h3>Arma tu viaje</h3><p>Sube Macao, ahorra en Zhangjiajie o cambia un vuelo por tren.</p></div><button type="button" onClick={() => go("arma")}>Personalizar</button></article></div>
      <div className="route-strip" aria-label="Ruta del viaje">{cities.map((city, index) => <div key={city.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{city.name}</strong><small>{state.stayNights[city.id]} {state.stayNights[city.id] === 1 ? "noche" : "noches"}</small><ArrowRight /></div>)}<div><span>06</span><strong>Shanghái</strong><small>Noche final</small></div></div>
    </section>
  </>;
}

function ItineraryPage({ state, go, baseCosts, schedule }: CommonProps) {
  const transportByIsoDate = Object.fromEntries(Object.entries(schedule.segmentDates).map(([segmentId, date]) => [date, segmentId])) as Record<string, string>;
  const selectedAttractions = attractions.filter((item) => state.attractionIds.includes(item.id));
  return <section className="content-section"><PageHeader eyebrow="Día por día · duración flexible" title="Itinerario que responde a tus decisiones" text="Cada tarjeta toma las noches, hotel, transporte y experiencias seleccionados. Mover una noche reasigna fechas y puede concentrar actividades: las advertencias muestran qué debes quitar o mover." /><div className="itinerary-summary"><div><Utensils /><span>Comida diaria para 5</span><strong>{money(state.foodPerPersonDay * TRAVELERS)}</strong></div><div><CircleDollarSign /><span>Comida total</span><strong>{money(baseCosts.foodCost)}</strong></div><div><Luggage /><span>Reserva de equipaje</span><strong>{money(state.baggageReserve)}</strong></div></div><div className="timeline">{schedule.days.map((day) => {
    const dayAttractions = selectedAttractions.filter((item) => attractionPlannedDate(state, schedule, item.id) === day.date).sort((a, b) => a.time.localeCompare(b.time));
    const duration = dayAttractions.reduce((sum, item) => sum + item.duration, 0);
    const segmentId = transportByIsoDate[day.date]; const segment = segmentId ? transportSegments.find((item) => item.id === segmentId) : undefined;
    const transport = segment ? selectedTransportOption(segment.id, state.transportIds[segment.id]) : undefined;
    const dayCity = day.city === "transito" ? undefined : day.city as CityId;
    const hotel = dayCity ? hotels.find((item) => item.id === state.hotelIds[dayCity]) : undefined;
    const travelConflict = (["hk-mo-ferry", "hk-mo-bus"].includes(transport?.id ?? "") && dayAttractions.some((item) => item.time < "19:00"))
      || (transport?.id === "sz-sh-train" && dayAttractions.length > 0)
      || (transport?.id === "sz-sh-flight" && dayAttractions.some((item) => item.time < "15:00"));
    const dateConflict = dayAttractions.some((item) => Boolean(attractionDateAlert(item.id, day.date))) || Boolean(transport && transportDateAlert(transport.id, day.date));
    const overloaded = duration > 8.5 || attractionsOverlap(dayAttractions) || travelConflict || dateConflict || (dayAttractions.some((item) => item.id === "sz-window") && dayAttractions.some((item) => item.id === "sz-science")) || (dayAttractions.filter((item) => ["hk-ngong", "hk-disney", "hk-mplus", "hk-ocean-park"].includes(item.id)).length > 1);
    const rawBaseEvents = transport ? travelEventsByOption[transport.id] ?? day.baseEvents : day.baseEvents;
    const baseEvents = dayAttractions.some((item) => item.id === "mo-teamlab")
      ? rawBaseEvents.map((event) => event.title.startsWith("Ventana de ferry") ? { ...event, time: "≈14:30", note: "teamLab termina cerca de las 13:00: elegir una salida que deje al menos 75 min; horario definitivo por confirmar." } : event)
      : rawBaseEvents;
    const events = [...baseEvents.map((event) => ({ ...event, attraction: undefined as typeof attractions[number] | undefined })), ...dayAttractions.map((item) => ({ time: item.time, title: item.name, note: `${item.duration} h · ${item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) + " para 5" : "gratuito"}`, critical: false, attraction: item }))].sort((a, b) => sortableTime(a.time) - sortableTime(b.time));
    return <article className="day-card" key={day.date}><div className="day-marker"><span>{day.label.split(" ")[0]}</span><strong>{day.label.split(" ").slice(1, 3).join(" ")}</strong></div><div className="day-content"><header><div><small>{day.city === "transito" ? "En tránsito" : cityName(day.city)}</small><h2>{day.title}</h2></div><div className={`load-badge ${overloaded ? "overloaded" : ""}`}><Clock3 size={14} />{duration ? `${duration.toLocaleString("es", { maximumFractionDigits: 1 })} h de actividades` : "Día de traslado o flexible"}</div></header>{overloaded && <div className="day-warning"><AlertTriangle size={16} /><span>Selecciones incompatibles o demasiado cargadas después del cambio de noches. Quita o mueve una opción.</span><button type="button" onClick={() => go("atracciones")}>Corregir</button></div>}{transport && <div className="selected-transport"><span className="mode-icon">{transport.mode === "Vuelo" ? <Plane /> : transport.mode === "Ferry" ? <Ship /> : transport.mode === "Autobús" ? <Bus /> : <TrainFront />}</span><div><small>Traslado seleccionado · {shortDate(day.date)}</small><strong>{transport.name}</strong><p>{transport.schedule} · {transport.doorToDoor}</p></div><b>{money(transport.groupPrice)}</b></div>}<ol className="events-list">{events.map((event, index) => <li key={`${event.time}-${event.title}-${index}`} className={event.critical ? "critical" : ""}><time>{event.time}</time><span /><div><strong>{event.title}</strong>{event.note && <p>{event.note}</p>}{event.attraction && <SourceLink href={event.attraction.bookingUrl} label="Entrada" />}</div></li>)}</ol>{hotel && <div className="night-stay"><BedDouble size={18} /><span>Noche en <strong>{hotel.name}</strong></span><small>{hotel.roomConfig}</small></div>}{day.date === schedule.departureDate ? <div className="day-food"><Utensils size={15} /> Comidas del vuelo: confirmar lo incluido; <strong>no se suma un día 17</strong> al presupuesto.</div> : <div className="day-food"><Utensils size={15} /> Comidas del día: <strong>{money(state.foodPerPersonDay * TRAVELERS)}</strong> para 5 (presupuesto, no reserva).</div>}</div></article>;
  })}</div></section>;
}

function AttractionsPage({ state, toggleAttraction, schedule }: CommonProps) {
  const [cityFilter, setCityFilter] = useState<CityId | "all">("all"); const [category, setCategory] = useState("all"); const [onlySelected, setOnlySelected] = useState(false); const [query, setQuery] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);
  const categories = Array.from(new Set(attractions.map((item) => item.category)));
  const filtered = attractions.filter((item) => (cityFilter === "all" || item.city === cityFilter) && (category === "all" || item.category === category) && (!onlySelected || state.attractionIds.includes(item.id)) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
  const selectedCost = attractions.filter((item) => state.attractionIds.includes(item.id)).reduce((sum, item) => sum + item.pricePerPerson * TRAVELERS, 0);
  return <section className="content-section"><PageHeader eyebrow="Experiencias reales" title="Atracciones que valen tiempo de viaje" text="Priorizamos tecnología inmersiva, ciencia, espectáculos, naturaleza y experiencias activas. Cada precio muestra su nivel de certeza y el costo calculado para 5." /><div className="sticky-tools"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar experiencia" aria-label="Buscar experiencia" /></div><select value={cityFilter} onChange={(event) => setCityFilter(event.target.value as CityId | "all")} aria-label="Filtrar por ciudad"><option value="all">Todas las ciudades</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrar por categoría"><option value="all">Todas las categorías</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><label className="check-filter"><input type="checkbox" checked={onlySelected} onChange={(event) => setOnlySelected(event.target.checked)} /> Solo elegidas</label><div className="selection-total"><strong>{state.attractionIds.length}</strong><span>elegidas<br />{money(selectedCost)}</span></div></div><div className="cards-grid attraction-grid">{filtered.map((item) => {
    const selected = state.attractionIds.includes(item.id);
    const plannedDate = attractionPlannedDate(state, schedule, item.id);
    const dateAlert = attractionDateAlert(item.id, plannedDate);
    return <article className={`attraction-card ${selected ? "is-selected" : ""}`} key={item.id}><div className="card-image"><img src={item.image} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/favicon.svg"; }} /><div className="image-badges"><span>{cityName(item.city)}</span><span>{item.category}</span></div>{item.recommendation === "Imprescindible" && <div className="recommend-badge"><Star size={13} fill="currentColor" /> Imprescindible</div>}</div><div className="card-body"><div className="card-title-line"><h2>{item.name}</h2><EvidenceBadge status={item.status} /></div><p>{item.description}</p><div className="facts-row"><span><MapPin /> {item.area}</span><span><Clock3 /> {item.duration} h</span><span><CalendarDays /> {shortDate(plannedDate)}</span></div>{dateAlert && <div className="date-alert"><AlertTriangle />{dateAlert}</div>}<div className="price-panel"><div><small>Por persona</small><strong>{item.pricePerPerson ? money(item.pricePerPerson) : "Gratis"}</strong></div><div><small>Para 5</small><strong>{item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) : "Gratis"}</strong></div><p>{item.priceLabel}</p></div><div className="booking-note"><TicketCheck size={16} /><span>{item.booking}</span></div><div className="card-actions"><SelectButton selected={selected} onClick={() => toggleAttraction(item.id)} label={selected ? "Quitar del viaje" : "Añadir al viaje"} /><button type="button" className="detail-button" onClick={() => setDetailId(item.id)}>Ver detalle y fotos</button><SourceLink href={item.bookingUrl} label="Reservar" /><SourceLink href={item.sourceUrl} /></div></div></article>;
  })}</div>{!filtered.length && <div className="empty-state"><Filter /><h3>No hay resultados</h3><p>Cambia los filtros para ver más experiencias.</p></div>}{detailId && (() => { const item = attractions.find((candidate) => candidate.id === detailId)!; const selected = state.attractionIds.includes(item.id); return <DetailModal title={item.name} images={item.images ?? [item.image]} onClose={() => setDetailId(null)}><div className="detail-meta"><span><MapPin />{item.area}</span><span><Clock3 />{item.duration} h</span><span><CalendarDays />{item.recommendedTime}</span><span>{item.category}</span></div><p className="detail-description">{item.description}</p><div className="detail-price"><div><small>Por persona</small><strong>{item.pricePerPerson ? money(item.pricePerPerson) : "Gratis"}</strong></div><div><small>Para 5</small><strong>{item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) : "Gratis"}</strong></div></div><p className="detail-ticket"><TicketCheck />{item.booking}<br /><small>{item.priceLabel}</small></p><div className="card-actions"><SelectButton selected={selected} onClick={() => toggleAttraction(item.id)} label={selected ? "Quitar del viaje" : "Añadir al viaje"} /><SourceLink href={item.bookingUrl} label="Abrir reserva" /><SourceLink href={item.sourceUrl} label="Fuente" /></div></DetailModal>; })()}</section>;
}

function TransportPage({ state, setState, schedule }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="Puerta a puerta" title="Comparar el viaje completo, no solo la duración del asiento" text="Los tiempos incluyen traslados, margen de seguridad, controles y recogida de equipaje. Las fechas cambian automáticamente cuando mueves noches entre ciudades." /><div className="method-note"><Info size={18} /><p><strong>Regla de decisión:</strong> el vuelo gana solo cuando reduce el tiempo hotel→hotel o protege una mañana importante. Los trenes siguen “Horario no publicado” hasta que 12306 abra su ventana de venta.</p></div><div className="transport-list">{transportSegments.map((segment) => <section className="segment" key={segment.id}><header className="segment-header"><div><span>{shortDate(schedule.segmentDates[segment.id])}</span><h2>{segment.from} <ArrowRight /> {segment.to}</h2><p>{segment.why}</p></div><div className="segment-choice">Elegido<strong>{selectedTransportOption(segment.id, state.transportIds[segment.id])?.mode}</strong></div></header><div className={`transport-options columns-${segment.options.length}`}>{segment.options.map((option) => {
    const selected = state.transportIds[segment.id] === option.id; const ModeIcon = option.mode === "Vuelo" ? Plane : option.mode === "Ferry" ? Ship : option.mode === "Autobús" ? Bus : TrainFront;
    const dateAlert = transportDateAlert(option.id, schedule.segmentDates[segment.id]);
    return <article className={`transport-card ${selected ? "is-selected" : ""}`} key={option.id}>{option.recommended && <span className="recommended-ribbon"><BadgeCheck size={14} /> Recomendado</span>}<div className="transport-mode"><ModeIcon /><span>{option.mode}</span><EvidenceBadge status={option.status} /></div><h3>{option.name}</h3><p className="schedule">{option.schedule}</p>{dateAlert && <div className="date-alert"><AlertTriangle />{dateAlert}</div>}<div className="transport-price"><strong>{money(option.groupPrice)}</strong><span>para 5<br />{option.priceNote}</span></div><dl><div><dt>Puerta a puerta</dt><dd>{option.doorToDoor}</dd></div><div><dt>Comodidad</dt><dd>{option.comfort}</dd></div><div><dt>Equipaje</dt><dd>{option.luggage}</dd></div></dl><div className="pros-cons"><div><strong>A favor</strong>{option.pros.map((item) => <p key={item}><Plus size={13} />{item}</p>)}</div><div><strong>En contra</strong>{option.cons.map((item) => <p key={item}><Minus size={13} />{item}</p>)}</div></div><p className="verification-note"><AlertTriangle size={15} />{option.statusNote}</p><div className="card-actions"><SelectButton selected={selected} label={selected ? "Opción elegida" : "Elegir esta opción"} onClick={() => setState((current) => ({ ...current, transportIds: { ...current.transportIds, [segment.id]: option.id }, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => key !== `transport-${segment.id}`)) }))} /><SourceLink href={transportBookingUrl(option, schedule.segmentDates[segment.id])} label="Buscar/comprar" /><SourceLink href={option.sourceUrl} /></div></article>;
  })}</div></section>)}</div></section>;
}

function HotelsPage({ state, setState, schedule }: CommonProps) {
  const [city, setCity] = useState<CityId>("shanghai"); const [tier, setTier] = useState("all"); const [query, setQuery] = useState(""); const [sort, setSort] = useState<"recommended" | "low" | "high">("recommended");
  const [detailId, setDetailId] = useState<string | null>(null);
  const options = hotels.filter((hotel) => hotel.city === city && (tier === "all" || hotel.tier === tier) && `${hotel.name} ${hotel.area}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "low" ? hotelStayPrice(a, state.stayNights[city]) - hotelStayPrice(b, state.stayNights[city]) : sort === "high" ? hotelStayPrice(b, state.stayNights[city]) - hotelStayPrice(a, state.stayNights[city]) : 0);
  return <section className="content-section"><PageHeader eyebrow={`${hotels.length} opciones reales · ${hotels.filter((hotel) => hotel.city === city).length} en ${cityName(city)}`} title="Comparar alojamiento para cinco" text="Hay al menos 15 hoteles por ciudad. Las nuevas tarifas muestran la muestra observada y calculan tres habitaciones por las noches elegidas; noviembre/diciembre 2026 sigue marcado como estimado hasta el checkout." /><div className="city-tabs" role="tablist">{cities.map((item) => <button type="button" key={item.id} className={city === item.id ? "is-active" : ""} onClick={() => setCity(item.id)}>{item.name}<small>{state.stayNights[item.id]}n</small></button>)}</div><div className="hotel-tools expanded"><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hotel o zona" aria-label="Buscar hotel" /></div><div className="tier-buttons"><Filter size={16} />{["all", "Económico", "Valor", "Confort", "Premium"].map((item) => <button key={item} type="button" className={tier === item ? "is-active" : ""} onClick={() => setTier(item)}>{item === "all" ? "Todos" : item}</button>)}</div><select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Ordenar hoteles"><option value="recommended">Orden original</option><option value="low">Precio: menor primero</option><option value="high">Precio: mayor primero</option></select></div><div className="hotel-rate-note"><Info size={17} /><span><strong>{state.stayNights[city]} noches · {schedule.cityDateLabels[city]}.</strong> El total se recalcula al mover noches. Shanghái se reserva en dos estancias separadas.</span></div><div className="cards-grid hotel-grid">{options.map((hotel) => {
    const selected = state.hotelIds[hotel.city] === hotel.id;
    const stayTotal = hotelStayPrice(hotel, state.stayNights[hotel.city]);
    return <article className={`hotel-card ${selected ? "is-selected" : ""}`} key={hotel.id}><div className="card-image"><img src={hotel.image} alt={hotel.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/favicon.svg"; }} /><div className="hotel-tier">{hotel.tier}</div><a className="photo-credit" href={hotel.photoSource} target="_blank" rel="noreferrer">Foto ↗</a></div><div className="card-body"><div className="card-title-line"><div><small>{hotel.area}</small><h2>{hotel.name}</h2></div><EvidenceBadge status={hotel.status} /></div><p>{hotel.description}</p><div className="room-config"><BedDouble size={18} /><span><strong>Configuración para 5</strong>{hotel.roomConfig}</span></div><div className="hotel-price"><span>Total calculado</span><strong>{money(stayTotal)}</strong><small>{money(stayTotal / TRAVELERS)} por persona · {state.stayNights[hotel.city]} noches</small><p>{hotel.priceNote}</p></div><div className="amenities">{hotel.amenities.map((item) => <span key={item}>{item}</span>)}</div><div className="pros-cons"><div><strong>A favor</strong>{hotel.pros.map((item) => <p key={item}><Plus size={13} />{item}</p>)}</div><div><strong>En contra</strong>{hotel.cons.map((item) => <p key={item}><Minus size={13} />{item}</p>)}</div></div><div className="card-actions"><SelectButton selected={selected} label={selected ? "Hotel elegido" : "Elegir hotel"} onClick={() => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [hotel.city]: hotel.id }, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => !key.startsWith(`hotel-${hotel.city}`))) }))} /><button type="button" className="detail-button" onClick={() => setDetailId(hotel.id)}>Ver detalle y fotos</button><SourceLink href={hotel.bookingUrl} label="Ver fechas" /><SourceLink href={hotel.sourceUrl} /></div></div></article>;
  })}</div>{!options.length && <div className="empty-state"><Hotel /><h3>No hay coincidencias</h3><p>Quita un filtro o busca otra zona.</p></div>}{detailId && (() => { const hotel = hotels.find((candidate) => candidate.id === detailId)!; const selected = state.hotelIds[hotel.city] === hotel.id; const stayTotal = hotelStayPrice(hotel, state.stayNights[hotel.city]); return <DetailModal title={hotel.name} images={hotel.images ?? [hotel.image]} onClose={() => setDetailId(null)}><div className="detail-meta"><span><MapPin />{hotel.area}</span><span><BedDouble />{hotel.tier}</span><span><CalendarDays />{state.stayNights[hotel.city]} noches</span></div><p className="detail-description">{hotel.description}</p><div className="detail-price"><div><small>Total para 5</small><strong>{money(stayTotal)}</strong></div><div><small>Por persona</small><strong>{money(stayTotal / TRAVELERS)}</strong></div></div><div className="room-config"><BedDouble /><span><strong>Habitaciones necesarias</strong>{hotel.roomConfig}</span></div><h3>Cerca de</h3><div className="amenities">{hotel.nearby?.map((item) => <span key={item}>{item}</span>)}</div><h3>Servicios principales</h3><div className="amenities">{hotel.amenities.map((item) => <span key={item}>{item}</span>)}</div><p className="detail-ticket"><Info />{hotel.priceNote}</p><div className="card-actions"><SelectButton selected={selected} label={selected ? "Hotel elegido" : "Elegir hotel"} onClick={() => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [hotel.city]: hotel.id } }))} /><SourceLink href={hotel.bookingUrl} label="Ver fechas" /><SourceLink href={hotel.sourceUrl} label="Fuente" /></div></DetailModal>; })()}</section>;
}

function PackagesPage({ applyPackage, saveCustomTrip, applyCustomTrip, state, go }: CommonProps & { applyPackage: (preset: PackagePreset) => void; saveCustomTrip: () => void; applyCustomTrip: () => void }) {
  const saved = state.savedCustomTrip;
  const extraCosts = state.internationalFlights + state.insurance + state.visa + state.other;
  const customCosts = saved ? costForSelections(saved.hotelIds, saved.transportIds, saved.localIds, saved.attractionIds, saved.foodPerPersonDay, saved.baggageReserve, saved.stayNights) : null;
  const customSubtotal = customCosts ? Object.values(customCosts).reduce((sum, value) => sum + value, 0) : 0;
  const customActive = !!saved && JSON.stringify(state.stayNights) === JSON.stringify(saved.stayNights) && JSON.stringify(state.hotelIds) === JSON.stringify(saved.hotelIds) && JSON.stringify(state.transportIds) === JSON.stringify(saved.transportIds) && JSON.stringify(state.localIds) === JSON.stringify(saved.localIds) && JSON.stringify([...state.attractionIds].sort()) === JSON.stringify([...saved.attractionIds].sort());
  return <section className="content-section"><PageHeader eyebrow="Cuatro paquetes + tu viaje guardado" title="Todos los paquetes bajo US$3,100 por persona" text="El límite se aplica al subtotal planificado dentro de China. Los vuelos internacionales, seguro, visa y otros importes personales se muestran aparte porque no se pueden inventar." /><div className="package-note"><Star /><p><strong>Cada paquete usa opciones reales del mismo motor.</strong> Puedes aplicar uno, modificarlo en “Arma tu viaje” y guardar esa mezcla como “Mi viaje” para recuperarla después.</p></div><div className="packages-grid">{packages.map((preset) => {
    const costs = costForSelections(preset.hotelIds, preset.transportIds, preset.localIds, preset.attractionIds, preset.foodPerPersonDay, preset.baggageReserve, DEFAULT_NIGHTS); const packageSubtotal = Object.values(costs).reduce((sum, value) => sum + value, 0); const packageWithExtras = packageSubtotal + extraCosts; const active = JSON.stringify(state.stayNights) === JSON.stringify(DEFAULT_NIGHTS) && JSON.stringify(state.hotelIds) === JSON.stringify(preset.hotelIds) && JSON.stringify(state.transportIds) === JSON.stringify(preset.transportIds) && JSON.stringify(state.localIds) === JSON.stringify(preset.localIds) && JSON.stringify([...state.attractionIds].sort()) === JSON.stringify([...preset.attractionIds].sort()) && state.foodPerPersonDay === preset.foodPerPersonDay && state.baggageReserve === preset.baggageReserve;
    return <article className={`package-card package-${preset.id} ${active ? "is-active" : ""}`} key={preset.id}><header><span>{preset.name}</span>{preset.id === "comfort" && <b>Recomendado</b>}{preset.id === "premium" && <b>Tope respetado</b>}</header><h2>{money(packageSubtotal)}</h2><p className="per-person">{money(packageSubtotal / TRAVELERS)} por persona · subtotal en China</p><div className="package-cap"><Check /> Bajo el límite de US$3,100 p/p</div>{extraCosts > 0 && <p className="package-extras">Con vuelos internacionales y otros importes: <strong>{money(packageWithExtras)}</strong> · {money(packageWithExtras / TRAVELERS)} p/p</p>}<p>{preset.tagline}</p><div className="package-breakdown"><span>Hoteles <b>{money(costs.hotelCost)}</b></span><span>Interurbano <b>{money(costs.transportCost)}</b></span><span>Local <b>{money(costs.localCost)}</b></span><span>Atracciones <b>{money(costs.attractionCost)}</b></span><span>Comida <b>{money(costs.foodCost)}</b></span><span>Equipaje <b>{money(costs.baggageCost)}</b></span></div><div className="package-route-preview"><strong>Hoteles</strong>{cities.map((city) => <span key={city.id}><b>{city.name}</b>{hotels.find((hotel) => hotel.id === preset.hotelIds[city.id])?.name}</span>)}</div><div className="package-route-preview compact"><strong>Traslados y salida recomendada</strong>{transportSegments.map((segment) => { const option = selectedTransportOption(segment.id, preset.transportIds[segment.id]); return <span key={segment.id}><b>{segment.from}→{segment.to}</b>{option?.mode} · {travelEventsByOption[option?.id ?? ""]?.[0]?.time ?? "confirmar"}</span>; })}</div><div className="package-day-sample"><strong>Plan de días</strong>{cities.map((city) => <p key={city.id}><b>{city.name}</b>{preset.attractionIds.map((id) => attractions.find((item) => item.id === id)).filter((item) => item?.city === city.id).slice(0, 3).map((item) => item?.name).join(" · ")}</p>)}</div><div className="gain-lose"><p><Plus /><span><strong>Ganas</strong>{preset.gain}</span></p><p><Minus /><span><strong>Pierdes</strong>{preset.lose}</span></p></div><button type="button" className="primary-button" onClick={() => applyPackage(preset)}>{active ? <Check /> : <Settings2 />}{active ? "Aplicado" : `Usar ${preset.name}`}</button></article>;
  })}{saved && customCosts ? <article className={`package-card package-custom ${customActive ? "is-active" : ""}`}><header><span>Mi viaje</span><b>Guardado</b></header><h2>{money(customSubtotal)}</h2><p className="per-person">{money(customSubtotal / TRAVELERS)} por persona · subtotal personalizado</p><div className={`package-cap ${customSubtotal / TRAVELERS >= 3100 ? "is-over" : ""}`}>{customSubtotal / TRAVELERS < 3100 ? <Check /> : <AlertTriangle />}{customSubtotal / TRAVELERS < 3100 ? "Dentro del límite de US$3,100 p/p" : "Supera el límite; ajusta hotel, transporte o actividades"}</div>{extraCosts > 0 && <p className="package-extras">Con vuelos internacionales y otros importes: <strong>{money(customSubtotal + extraCosts)}</strong></p>}<p>Tu combinación guardada de noches, hoteles, transportes y planes diarios. Puedes aplicar otro paquete y regresar a esta versión cuando quieras.</p><div className="package-breakdown"><span>Hoteles <b>{money(customCosts.hotelCost)}</b></span><span>Interurbano <b>{money(customCosts.transportCost)}</b></span><span>Local <b>{money(customCosts.localCost)}</b></span><span>Atracciones <b>{money(customCosts.attractionCost)}</b></span><span>Comida <b>{money(customCosts.foodCost)}</b></span><span>Equipaje <b>{money(customCosts.baggageCost)}</b></span></div><div className="package-route-preview"><strong>Hoteles guardados</strong>{cities.map((city) => <span key={city.id}><b>{city.name}</b>{hotels.find((hotel) => hotel.id === saved.hotelIds[city.id])?.name}</span>)}</div><div className="custom-package-actions"><button type="button" className="primary-button" onClick={applyCustomTrip}>{customActive ? <Check /> : <Settings2 />}{customActive ? "Mi viaje aplicado" : "Usar Mi viaje"}</button><button type="button" className="quiet-button" onClick={saveCustomTrip}>Actualizar con el viaje actual</button></div></article> : <article className="package-card package-custom package-empty"><PackageCheck /><header><span>Mi viaje</span><b>Personalizado</b></header><h2>Guarda tu mezcla</h2><p>Elige días, hoteles y atracciones en el constructor. Después guarda esa combinación aquí para compararla y recuperarla aunque pruebes otro paquete.</p><button type="button" className="primary-button" onClick={() => go("arma")}>Armar Mi viaje <ArrowRight /></button><button type="button" className="quiet-button" onClick={saveCustomTrip}>Guardar la selección actual</button></article>}</div><div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Qué cambia</th>{packages.map((preset) => <th key={preset.id}>{preset.name}</th>)}</tr></thead><tbody><tr><td>Comida p/p/día</td>{packages.map((preset) => <td key={preset.id}>{money(preset.foodPerPersonDay)}</td>)}</tr><tr><td>Experiencias</td>{packages.map((preset) => <td key={preset.id}>{preset.attractionIds.length}</td>)}</tr><tr><td>Traslado local</td><td>Público</td><td>Mixto</td><td>Mixto + van ZJJ</td><td>Mixto optimizado</td></tr><tr><td>Interurbano</td><td>Tren/terrestre</td><td>Vuelo/tren/ferry</td><td>Vuelo/tren/ferry</td><td>Vuelo/tren/ferry</td></tr></tbody></table></div></section>;
}

function LegacyBuilderPage({ state, setState, total, go, toggleAttraction, schedule }: CommonProps) {
  const moveNight = (from: CityId, to: CityId) => {
    const minimum = from === "shanghai" ? 2 : 1;
    if (from === to || state.stayNights[from] <= minimum) return;
    setState((current) => ({
      ...current,
      stayNights: { ...current.stayNights, [from]: current.stayNights[from] - 1, [to]: current.stayNights[to] + 1 },
      bookingStates: { "intl-flight": current.bookingStates["intl-flight"] ?? "RESERVADO" },
    }));
  };
  return <section className="content-section"><PageHeader eyebrow="Mezcla sin límites" title="Arma tu propio viaje" text="Mueve noches, mezcla hoteles, transportes y experiencias. El viaje conserva 15 noches y las fechas, el itinerario, los precios y la lista de reservas se recalculan al instante." /><div className="builder-total"><div><span>Total actual para 5</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></div><button type="button" onClick={() => go("resumen")}>Ver desglose <ArrowRight /></button></div><div className="builder-sections">
    <section className="builder-block"><header><CalendarDays /><div><span>Paso 1</span><h2>Distribuir las {TOTAL_NIGHTS} noches</h2></div></header><div className="night-editor"><div className="night-city-grid">{cities.map((city) => <article key={city.id}><span>{city.name}</span><strong>{state.stayNights[city.id]}</strong><small>{state.stayNights[city.id] === 1 ? "noche" : "noches"} · {schedule.cityDateLabels[city.id]}</small></article>)}</div><div className="night-move"><p><Info /> Elige de dónde quitar una noche y dónde añadirla. Shanghái mantiene mínimo 2 noches porque incluye la llegada y la noche final.</p><select id="night-from" defaultValue="hongkong" aria-label="Quitar una noche de"><option value="">Quitar de…</option>{cities.map((city) => <option key={city.id} value={city.id} disabled={state.stayNights[city.id] <= (city.id === "shanghai" ? 2 : 1)}>{city.name} ({state.stayNights[city.id]}n)</option>)}</select><ArrowRight /><select id="night-to" defaultValue="shenzhen" aria-label="Añadir una noche a"><option value="">Añadir a…</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select><button type="button" onClick={() => { const from = (document.getElementById("night-from") as HTMLSelectElement).value as CityId; const to = (document.getElementById("night-to") as HTMLSelectElement).value as CityId; if (from && to) moveNight(from, to); }}>Mover 1 noche</button></div></div></section>
    <section className="builder-block"><header><Hotel /><div><span>Paso 2</span><h2>Elegir hotel por destino</h2></div></header><div className="builder-grid">{cities.map((city) => <label key={city.id}><span>{city.name}<small>{schedule.cityDateLabels[city.id]}</small></span><select value={state.hotelIds[city.id]} onChange={(event) => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [city.id]: event.target.value } }))}>{hotels.filter((hotel) => hotel.city === city.id).map((hotel) => <option key={hotel.id} value={hotel.id}>{hotel.name} · {money(hotelStayPrice(hotel, state.stayNights[city.id]))}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><TrainFront /><div><span>Paso 3</span><h2>Elegir cada tramo</h2></div></header><div className="builder-grid">{transportSegments.map((segment) => <label key={segment.id}><span>{segment.from} → {segment.to}<small>{shortDate(schedule.segmentDates[segment.id])}</small></span><select value={state.transportIds[segment.id]} onChange={(event) => setState((current) => ({ ...current, transportIds: { ...current.transportIds, [segment.id]: event.target.value } }))}>{segment.options.map((option) => <option key={option.id} value={option.id}>{option.mode} · {option.name} · {money(option.groupPrice)}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><Bus /><div><span>Paso 4</span><h2>Transporte local por ciudad</h2></div></header><div className="builder-grid">{cities.map((city) => <label key={city.id}><span>{city.name}<small>5 personas + 5 maletas · {state.stayNights[city.id]}n</small></span><select value={state.localIds[city.id]} onChange={(event) => setState((current) => ({ ...current, localIds: { ...current.localIds, [city.id]: event.target.value } }))}>{localPlans.filter((plan) => plan.city === city.id).map((plan) => <option key={plan.id} value={plan.id}>{plan.name} · {money(localPlanPrice(plan, state.stayNights[city.id]))}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><TicketCheck /><div><span>Paso 5</span><h2>Añadir o quitar experiencias</h2></div></header>{cities.map((city) => <div className="builder-attraction-city" key={city.id}><h3>{city.name}</h3><div>{attractions.filter((item) => item.city === city.id).map((item) => <label key={item.id} className={state.attractionIds.includes(item.id) ? "checked" : ""}><input type="checkbox" checked={state.attractionIds.includes(item.id)} onChange={() => toggleAttraction(item.id)} /><span><strong>{item.name}</strong><small>{item.category} · {item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) + " para 5" : "gratis"}</small></span></label>)}</div></div>)}</section>
    <section className="builder-block"><header><Utensils /><div><span>Paso 6</span><h2>Presupuestos ajustables</h2></div></header><div className="range-grid"><label><span>Comida por persona/día <strong>{money(state.foodPerPersonDay)}</strong></span><input type="range" min="20" max="100" step="5" value={state.foodPerPersonDay} onChange={(event) => setState((current) => ({ ...current, foodPerPersonDay: Number(event.target.value) }))} /><small>Total comida: {money(state.foodPerPersonDay * TRAVELERS * TRIP_DAYS)}</small></label><label><span>Reserva de equipaje <strong>{money(state.baggageReserve)}</strong></span><input type="range" min="0" max="1200" step="50" value={state.baggageReserve} onChange={(event) => setState((current) => ({ ...current, baggageReserve: Number(event.target.value) }))} /><small>Se usa solo si las tarifas no incluyen 5 maletas.</small></label><label><span>Peso de compras previsto <strong>{state.shoppingWeightKg} kg</strong></span><input type="range" min="0" max="75" step="5" value={state.shoppingWeightKg} onChange={(event) => setState((current) => ({ ...current, shoppingWeightKg: Number(event.target.value) }))} /><small>{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg adicionales por persona si se reparte.</small></label></div></section>
  </div></section>;
}

function BuilderPage({ state, setState, total, go, schedule, bookingRows, saveCustomTrip }: CommonProps & { saveCustomTrip: () => void }) {
  const [cityIndex, setCityIndex] = useState(0);
  const [phase, setPhase] = useState<"days" | "hotel" | "plan" | "transport">("days");
  const [activeDay, setActiveDay] = useState(0);
  const [attractionQuery, setAttractionQuery] = useState("");
  const city = cities[cityIndex];
  const nextCity = cities[cityIndex + 1];
  const segment = transportSegments[cityIndex];
  const finalTransfer = !nextCity && Boolean(segment);
  const destinationName = nextCity?.name ?? "Shanghái · noche final";
  const dayCount = Math.max(1, state.stayNights[city.id]);
  const cityPlans = Array.from({ length: dayCount }, (_, index) => state.dayPlans[city.id]?.[index] ?? []);
  const assignedToday = cityPlans[activeDay] ?? [];
  const selectedHotel = hotels.find((hotel) => hotel.id === state.hotelIds[city.id]);
  const cityAttractions = attractions.filter((item) => item.city === city.id);
  const visibleCityAttractions = cityAttractions.filter((item) => `${item.name} ${item.area} ${item.category}`.toLowerCase().includes(attractionQuery.toLowerCase()));
  const allAssigned = new Set(cityPlans.flat());
  const plannedItems = assignedToday.map((id) => attractions.find((item) => item.id === id)).filter(Boolean) as typeof attractions;
  const plannedHours = plannedItems.reduce((sum, item) => sum + item.duration, 0);
  const areaRoots = new Set(plannedItems.map((item) => (item.area ?? "").split("/")[0].trim()).filter(Boolean));
  const overloaded = plannedHours > 8 || areaRoots.size > 2 || attractionsOverlap(plannedItems);
  const completedDays = cityPlans.filter((day) => day.length > 0).length;
  const tripPlannedDays = cities.reduce((sum, item) => sum + (state.dayPlans[item.id] ?? []).filter((day) => day.length > 0).length, 0);
  const remainingDays = TOTAL_NIGHTS - tripPlannedDays;
  const missingBookings = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) !== "RESERVADO").length;

  const resizeCity = (delta: number) => {
    const minimum = city.id === "shanghai" ? 2 : 1;
    if (delta < 0 && state.stayNights[city.id] <= minimum) return;
    const candidates = cities.filter((item) => item.id !== city.id && state.stayNights[item.id] > (item.id === "shanghai" ? 2 : 1));
    const donor = candidates.sort((a, b) => state.stayNights[b.id] - state.stayNights[a.id])[0];
    const receiver = nextCity ?? cities[Math.max(0, cityIndex - 1)];
    if (delta > 0 && !donor) return;
    setState((current) => {
      const stayNights = { ...current.stayNights };
      if (delta > 0) { stayNights[donor.id] -= 1; stayNights[city.id] += 1; }
      else { stayNights[city.id] -= 1; stayNights[receiver.id] += 1; }
      const dayPlans = { ...current.dayPlans, [city.id]: (current.dayPlans[city.id] ?? []).slice(0, stayNights[city.id]) };
      return { ...current, stayNights, dayPlans, bookingStates: { "intl-flight": current.bookingStates["intl-flight"] ?? "RESERVADO" } };
    });
    setActiveDay((day) => Math.min(day, dayCount - 1));
  };

  const assignAttraction = (id: string) => {
    setState((current) => {
      const plans = { ...current.dayPlans };
      const currentCityPlans = Array.from({ length: current.stayNights[city.id] }, (_, index) => [...(plans[city.id]?.[index] ?? [])]);
      const alreadyToday = currentCityPlans[activeDay]?.includes(id);
      currentCityPlans.forEach((day, index) => { currentCityPlans[index] = day.filter((item) => item !== id); });
      if (!alreadyToday) currentCityPlans[activeDay] = [...currentCityPlans[activeDay], id];
      plans[city.id] = currentCityPlans;
      const usedAnywhere = Object.values(plans).some((days) => days.some((day) => day.includes(id)));
      const attractionIds = usedAnywhere ? Array.from(new Set([...current.attractionIds, id])) : current.attractionIds.filter((item) => item !== id);
      return { ...current, dayPlans: plans, attractionIds, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => key !== `attraction-${id}`)) };
    });
  };

  const recommendDay = () => {
    const unused = cityAttractions.filter((item) => !allAssigned.has(item.id));
    const areaScores = new globalThis.Map<string, number>();
    unused.forEach((item) => { const area = (item.area ?? city.name).split("/")[0].trim(); areaScores.set(area, (areaScores.get(area) ?? 0) + (item.recommendation === "Imprescindible" ? 3 : item.recommendation === "Muy recomendable" ? 2 : 1)); });
    const targetArea = [...areaScores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    const ranked = unused.sort((a, b) => (a.recommendation === "Imprescindible" ? -2 : a.recommendation === "Muy recomendable" ? -1 : 0) - (b.recommendation === "Imprescindible" ? -2 : b.recommendation === "Muy recomendable" ? -1 : 0));
    const chosen: string[] = []; let hours = 0;
    ranked.filter((item) => (item.area ?? "").startsWith(targetArea ?? "")).forEach((item) => { if (hours + item.duration <= 7.5) { chosen.push(item.id); hours += item.duration; } });
    if (!chosen.length) ranked.slice(0, 2).forEach((item) => chosen.push(item.id));
    setState((current) => {
      const plans = { ...current.dayPlans, [city.id]: Array.from({ length: current.stayNights[city.id] }, (_, index) => [...(current.dayPlans[city.id]?.[index] ?? [])]) };
      plans[city.id][activeDay] = chosen;
      return { ...current, dayPlans: plans, attractionIds: Array.from(new Set([...current.attractionIds.filter((id) => !cityPlans.flat().includes(id)), ...cityPlans.flat().filter((id) => !assignedToday.includes(id)), ...chosen])) };
    });
  };

  const nextPhase = () => {
    if (phase === "days") setPhase("hotel");
    else if (phase === "hotel") setPhase("plan");
    else if (phase === "plan") setPhase(segment ? "transport" : "days");
    else if (finalTransfer) go("resumen");
    else if (nextCity) { setCityIndex((index) => index + 1); setActiveDay(0); setPhase("days"); }
  };

  const previousPhase = () => {
    if (phase === "transport") setPhase("plan");
    else if (phase === "plan") setPhase("hotel");
    else if (phase === "hotel") setPhase("days");
    else if (cityIndex > 0) { setCityIndex((index) => index - 1); setActiveDay(0); setPhase("transport"); }
  };

  const hotelChoices = hotels.filter((hotel) => hotel.city === city.id).sort((a, b) => hotelStayPrice(a, dayCount) - hotelStayPrice(b, dayCount));

  return <section className="content-section guided-builder-page"><PageHeader eyebrow="Constructor guiado · guardado automático" title="Arma tu viaje ciudad por ciudad" text="Decide cuántos días, dónde dormir, qué hacer cada día y cómo llegar al siguiente destino. La app agrupa zonas, calcula carga real y mantiene un resumen visible." />
    <div className="builder-city-rail">{cities.map((item, index) => <button type="button" key={item.id} className={`${index === cityIndex ? "is-active" : ""} ${index < cityIndex ? "is-done" : ""}`} onClick={() => { setCityIndex(index); setActiveDay(0); setPhase("days"); }}><span>{index < cityIndex ? <Check /> : index + 1}</span><strong>{item.name}</strong><small>{state.stayNights[item.id]} noches · {(state.dayPlans[item.id] ?? []).filter((day) => day.length).length} días armados</small></button>)}</div>
    <div className="guided-layout"><main className="guided-workspace"><header className="guided-city-header"><div><span className="eyebrow">Ciudad {cityIndex + 1} de {cities.length}</span><h2>{city.name}</h2><p>{schedule.cityDateLabels[city.id]} · {city.id === "shanghai" ? "incluye la noche final de regreso" : `siguiente: ${destinationName}`}</p></div><div className="phase-pills">{(["days", "hotel", "plan", "transport"] as const).filter((item) => item !== "transport" || segment).map((item, index) => <button type="button" key={item} className={phase === item ? "is-active" : ""} onClick={() => setPhase(item)}>{index + 1}. {item === "days" ? "Días" : item === "hotel" ? "Hotel" : item === "plan" ? "Itinerario" : "Traslado"}</button>)}</div></header>

      {phase === "days" && <section className="guided-panel days-choice"><div className="panel-intro"><CalendarDays /><div><span>Paso 1</span><h3>¿Cuántos días quieren en {city.name}?</h3><p>El viaje mantiene {TOTAL_NIGHTS} noches. Al añadir una aquí, la app toma una noche de la ciudad con más margen; al quitarla, la pasa al siguiente destino.</p></div></div><div className="day-counter"><button type="button" onClick={() => resizeCity(-1)} disabled={state.stayNights[city.id] <= (city.id === "shanghai" ? 2 : 1)}><Minus /></button><strong>{state.stayNights[city.id]}</strong><span>{state.stayNights[city.id] === 1 ? "noche / día de plan" : "noches / días de plan"}<small>{schedule.cityDateLabels[city.id]}</small></span><button type="button" onClick={() => resizeCity(1)}><Plus /></button></div><div className="smart-recommendation"><Sparkles /><div><strong>Recomendación práctica</strong><p>{city.id === "shanghai" ? "4 noches permiten centro, Pudong, una experiencia de ciencia y la noche final." : city.id === "zhangjiajie" ? "4 noches protegen el plan contra niebla y separan parque, cañón y Tianmen." : city.id === "shenzhen" ? "3 noches alcanzan para tecnología, museo y una tarde de diseño/comida." : city.id === "macau" ? "1 noche obliga a escoger; 2 permiten patrimonio, Cotai y descanso sin correr." : "3 noches permiten isla, Kowloon y un día completo en Lantau u Ocean Park."}</p></div></div></section>}

      {phase === "hotel" && <section className="guided-panel"><div className="panel-intro"><Hotel /><div><span>Paso 2</span><h3>Elige hotel en {city.name}</h3><p>Se muestran las {hotelChoices.length} opciones, ordenadas por total para cinco. El cálculo ya usa {dayCount} noches y la configuración conservadora de habitaciones.</p></div></div><div className="builder-list-count"><Hotel /> {hotelChoices.length} hoteles disponibles · desplázate para compararlos todos</div><div className="builder-hotel-choice">{hotelChoices.map((hotel) => { const selected = state.hotelIds[city.id] === hotel.id; return <button type="button" className={selected ? "is-selected" : ""} key={hotel.id} onClick={() => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [city.id]: hotel.id } }))}><img src={hotel.image} alt="" /><span><small>{hotel.tier} · {hotel.area}</small><strong>{hotel.name}</strong><em>{money(hotelStayPrice(hotel, dayCount))} para 5</em><p>{hotel.description}</p></span>{selected && <Check />}</button>; })}</div><button type="button" className="quiet-button" onClick={() => go("hoteles")}>Abrir comparador completo y galerías <ArrowRight /></button><div className="local-inline"><Bus /><label><span>Transporte local recomendado para 5 + maletas</span><select value={state.localIds[city.id]} onChange={(event) => setState((current) => ({ ...current, localIds: { ...current.localIds, [city.id]: event.target.value } }))}>{localPlans.filter((plan) => plan.city === city.id).map((plan) => <option key={plan.id} value={plan.id}>{plan.name} · {money(localPlanPrice(plan, dayCount))}</option>)}</select></label></div></section>}

      {phase === "plan" && <section className="guided-panel planner-panel"><div className="panel-intro"><TicketCheck /><div><span>Paso 3</span><h3>Construye cada día sin cruzar la ciudad</h3><p>Elige un día, añade experiencias y revisa la carga. Las tarjetas muestran zona, momento recomendado y duración real.</p></div></div><div className="day-tabs">{cityPlans.map((ids, index) => <button type="button" key={index} className={activeDay === index ? "is-active" : ""} onClick={() => setActiveDay(index)}><span>Día {index + 1}</span><strong>{ids.length ? `${ids.length} planes` : "Vacío"}</strong></button>)}</div><div className={`day-load ${overloaded ? "is-overloaded" : ""}`}><div><Clock3 /><span><strong>{plannedHours.toLocaleString("es", { maximumFractionDigits: 1 })} h</strong> · {areaRoots.size || 0} zona(s)</span></div><p>{overloaded ? "Este día no es realista: supera 8 horas, cruza más de dos zonas o tiene horarios que se pisan." : assignedToday.length ? "Carga razonable. Deja margen para comida, metro, filas y cambios de clima." : "Empieza con una recomendación por zona o elige manualmente."}</p><button type="button" onClick={recommendDay}><Sparkles /> Recomendar este día</button></div>{plannedItems.length > 0 && <div className="planned-timeline">{plannedItems.sort((a, b) => a.time.localeCompare(b.time)).map((item) => <article key={item.id}><time>{item.time}</time><span /><div><strong>{item.name}</strong><small>{item.recommendedTime} · {item.duration} h · {item.area}</small></div><button type="button" onClick={() => assignAttraction(item.id)} aria-label={`Quitar ${item.name}`}><X /></button></article>)}</div>}<div className="builder-browser-tools"><div className="search-box"><Search /><input value={attractionQuery} onChange={(event) => setAttractionQuery(event.target.value)} placeholder="Buscar atracción, zona o categoría" aria-label="Buscar atracciones dentro del constructor" /></div><span>{visibleCityAttractions.length} de {cityAttractions.length} atracciones visibles</span></div><div className="builder-attraction-browser">{visibleCityAttractions.sort((a, b) => (a.area ?? "").localeCompare(b.area ?? "") || a.time.localeCompare(b.time)).map((item) => { const today = assignedToday.includes(item.id); const anotherDay = allAssigned.has(item.id) && !today; return <article key={item.id} className={`${today ? "is-selected" : ""} ${anotherDay ? "is-other-day" : ""}`}><img src={item.image} alt="" /><div><small>{item.area} · {item.category}</small><h4>{item.name}</h4><p>{item.description}</p><span><Clock3 /> {item.recommendedTime} · {item.duration} h</span><strong>{item.pricePerPerson ? `${money(item.pricePerPerson * TRAVELERS)} para 5` : "Gratis"}</strong></div><button type="button" onClick={() => assignAttraction(item.id)} disabled={anotherDay}>{today ? <><Check /> En día {activeDay + 1}</> : anotherDay ? "Ya está en otro día" : <><Plus /> Añadir</>}</button></article>; })}</div></section>}

      {phase === "transport" && segment && <section className="guided-panel"><div className="panel-intro"><TrainFront /><div><span>Paso 4</span><h3>¿Cómo van de {city.name} a {destinationName}?</h3><p>Fecha calculada: {shortDate(schedule.segmentDates[segment.id])}. Comparamos hotel a hotel, equipaje y tiempo perdido, no solo horas de vuelo.</p></div></div><div className="builder-transport-choice">{segment.options.map((option) => { const selected = state.transportIds[segment.id] === option.id; return <button type="button" key={option.id} className={selected ? "is-selected" : ""} onClick={() => setState((current) => ({ ...current, transportIds: { ...current.transportIds, [segment.id]: option.id } }))}><span className="mode-icon">{option.mode === "Vuelo" ? <Plane /> : option.mode === "Ferry" ? <Ship /> : option.mode === "Autobús" ? <Bus /> : <TrainFront />}</span><div><small>{option.mode} · {option.recommended ? "Recomendado" : "Alternativa"}</small><strong>{option.name}</strong><p>{option.doorToDoor} · {option.schedule}</p><span>{option.luggage}</span></div><b>{money(option.groupPrice)}<small>para 5</small></b>{selected && <Check />}</button>; })}</div>{(() => { const option = selectedTransportOption(segment.id, state.transportIds[segment.id]); return option ? <div className="departure-advice"><Clock3 /><div><strong>Hora de salida recomendada</strong><p>{travelEventsByOption[option.id]?.[0]?.time ?? "Confirmar"} desde el hotel. {option.status === "NO_PUBLICADO" ? "El horario exacto todavía no está publicado; bloquea el día sin inventar un tren." : option.statusNote}</p></div><SourceLink href={transportBookingUrl(option, schedule.segmentDates[segment.id])} label="Buscar/comprar" /></div> : null; })()}</section>}

      <footer className="builder-navigation"><button type="button" onClick={previousPhase} disabled={phase === "days" && cityIndex === 0}><ArrowRight className="back-arrow" /> Atrás</button><span>{phase === "plan" ? `${completedDays}/${dayCount} días con plan` : selectedHotel?.name}</span>{finalTransfer && phase === "transport" ? <button type="button" className="primary-button" onClick={() => go("resumen")}>Terminar y ver resumen <ArrowRight /></button> : <button type="button" className="primary-button" onClick={nextPhase}>Continuar <ArrowRight /></button>}</footer></main>

      <aside className="builder-live-summary"><header><span>Tu viaje en vivo</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></header><div className="summary-progress"><span><i style={{ width: `${Math.min(100, tripPlannedDays / TOTAL_NIGHTS * 100)}%` }} /></span><p>{tripPlannedDays} días armados · {Math.max(0, remainingDays)} por completar</p></div><ol>{cities.map((item, index) => { const hotel = hotels.find((candidate) => candidate.id === state.hotelIds[item.id]); const count = (state.dayPlans[item.id] ?? []).flat().length; return <li key={item.id} className={index === cityIndex ? "is-active" : ""}><span>{index + 1}</span><div><strong>{item.name} · {state.stayNights[item.id]}n</strong><small>{hotel?.name ?? "Hotel pendiente"}</small><em>{count} atracciones asignadas</em></div></li>; })}</ol><div className="summary-missing"><AlertTriangle /><div><strong>{missingBookings} reservas aún no marcadas como compradas</strong><p>Incluye opciones listas, horarios pendientes y actividades gratuitas opcionales.</p></div></div><button type="button" className="save-custom-trip" onClick={saveCustomTrip}><PackageCheck /> Guardar como “Mi viaje”</button><button type="button" onClick={() => go("reservas")}>Ver qué falta comprar <ArrowRight /></button></aside></div>
  </section>;
}

function SummaryPage({ state, setState, total, baseCosts, go, bookingRows, bookedCount, waitingCount, hasIntlPrice, schedule }: CommonProps & { hasIntlPrice: boolean }) {
  const custom = state.internationalFlights + state.insurance + state.visa + state.other;
  const rows = [{ label: "Hoteles", value: baseCosts.hotelCost, icon: Hotel }, { label: "Transporte interurbano", value: baseCosts.transportCost, icon: TrainFront }, { label: "Transporte local", value: baseCosts.localCost, icon: Bus }, { label: "Atracciones y tours", value: baseCosts.attractionCost, icon: TicketCheck }, { label: "Comida estimada", value: baseCosts.foodCost, icon: Utensils }, { label: "Equipaje", value: baseCosts.baggageCost, icon: Luggage }, { label: "Vuelos internacionales + otros", value: custom, icon: BriefcaseBusiness }]; const max = Math.max(...rows.map((row) => row.value));
  return <section className="content-section"><PageHeader eyebrow="Costo de las decisiones" title="Resumen del viaje" text="Este es el resultado actual para 5 y 15 noches redistribuibles. Los importes siguen marcados como estimados cuando el proveedor todavía puede cambiar precio o inventario." /><div className="summary-hero"><div><span>{hasIntlPrice ? "Total completo" : "Total parcial"}</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></div><div className="summary-status"><p><Check /> 5 hoteles elegidos</p><p><CalendarDays /> {TOTAL_NIGHTS} noches distribuidas</p><p><Check /> 5 tramos elegidos</p><p><TicketCheck /> {state.attractionIds.length} experiencias</p><p><BookOpenCheck /> {bookedCount}/{bookingRows.length} reservado</p><p><AlertTriangle /> {waitingCount} esperan horario</p></div></div>{!hasIntlPrice && <div className="status-callout warning"><AlertTriangle /><div><strong>El total todavía no incluye el vuelo JFK↔PVG.</strong><p>El itinerario dice que está comprado, pero el importe no estaba en la app original. Añádelo abajo; no hemos inventado un precio.</p></div></div>}<div className="budget-layout"><div className="budget-bars">{rows.map((row) => { const Icon = row.icon; return <div className="budget-row" key={row.label}><Icon /><span>{row.label}</span><div><i style={{ width: `${max ? row.value / max * 100 : 0}%` }} /></div><strong>{money(row.value)}</strong></div>; })}</div><aside className="custom-costs"><h2>Importes que solo tú conoces</h2><p>Se guardan en este navegador.</p><label>Vuelos internacionales comprados<input type="number" min="0" value={state.internationalFlights || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, internationalFlights: Math.max(0, Number(event.target.value)) }))} /></label><label>Seguro de viaje<input type="number" min="0" value={state.insurance || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, insurance: Math.max(0, Number(event.target.value)) }))} /></label><label>Visas / trámites<input type="number" min="0" value={state.visa || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, visa: Math.max(0, Number(event.target.value)) }))} /></label><label>Otros costos<input type="number" min="0" value={state.other || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, other: Math.max(0, Number(event.target.value)) }))} /></label></aside></div><div className="selected-summary"><section><h2><Hotel /> Hoteles elegidos</h2>{cities.map((city) => { const hotel = hotels.find((item) => item.id === state.hotelIds[city.id]); return <button type="button" key={city.id} onClick={() => go("hoteles")}><span>{city.name} · {schedule.cityDateLabels[city.id]}</span><strong>{hotel?.name}</strong><b>{money(hotelStayPrice(hotel, state.stayNights[city.id]))}</b></button>; })}</section><section><h2><TrainFront /> Tramos elegidos</h2>{transportSegments.map((segment) => { const option = selectedTransportOption(segment.id, state.transportIds[segment.id]); return <button type="button" key={segment.id} onClick={() => go("transporte")}><span>{shortDate(schedule.segmentDates[segment.id])} · {segment.from} → {segment.to}</span><strong>{option?.mode} · {option?.name}</strong><b>{money(option?.groupPrice ?? 0)}</b></button>; })}</section></div></section>;
}

function BookingsPage({ state, setState, bookingRows, bookedCount, waitingCount, total }: CommonProps) {
  const [filter, setFilter] = useState<BookingState | "TODOS">("TODOS"); const rows = bookingRows.filter((row) => filter === "TODOS" || (state.bookingStates[row.key] ?? row.initialState) === filter); const bookedCost = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "RESERVADO").reduce((sum, row) => sum + row.cost, 0);
  return <section className="content-section"><PageHeader eyebrow="De decidir a comprar" title="Lista de reservas" text="La lista se genera sola a partir de tus hoteles, tramos y atracciones. Cambiar una selección reemplaza el artículo correspondiente y devuelve su estado a la fase correcta." /><div className="booking-metrics"><Metric icon={BookOpenCheck} label="Reservado" value={`${bookedCount}/${bookingRows.length}`} note={money(bookedCost)} /><Metric icon={AlertTriangle} label="Esperando horario" value={String(waitingCount)} note="No comprar todavía" /><Metric icon={WalletCards} label="Total planificado" value={money(total)} note="Incluye estimaciones" /></div><div className="booking-filters">{(["TODOS", "RESERVADO", "LISTO", "ESPERANDO", "OPCIONAL"] as const).map((item) => <button type="button" key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item === "TODOS" ? "Todos" : bookingText[item]}</button>)}</div><div className="booking-table-wrap"><table className="booking-table"><thead><tr><th>Fecha / tipo</th><th>Selección</th><th>Costo para 5</th><th>Estado</th><th>Comprar</th></tr></thead><tbody>{rows.map((row) => { const current = state.bookingStates[row.key] ?? row.initialState; return <tr key={row.key}><td><strong>{row.date}</strong><span>{row.type}</span></td><td><strong>{row.name}</strong><small>{row.note}</small></td><td>{row.cost ? money(row.cost) : "Añadir importe"}</td><td><select className={`booking-select state-${current.toLowerCase()}`} value={current} onChange={(event) => setState((previous) => ({ ...previous, bookingStates: { ...previous.bookingStates, [row.key]: event.target.value as BookingState } }))}>{Object.entries(bookingText).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td><a className="buy-button" href={row.link} target="_blank" rel="noreferrer">Abrir <ExternalLink size={14} /></a></td></tr>; })}</tbody></table></div>{!rows.length && <div className="empty-state"><BookOpenCheck /><h3>No hay elementos con este estado</h3><p>Elige otro filtro.</p></div>}</section>;
}

function ShoppingPage({ state, schedule }: CommonProps) {
  const [cityFilter, setCityFilter] = useState<CityId | "all">("all");
  const [query, setQuery] = useState("");
  const filteredPlaces = shoppingPlaces.filter((place) => (cityFilter === "all" || place.city === cityFilter) && `${place.name} ${place.specialty} ${place.area} ${place.buy}`.toLowerCase().includes(query.toLowerCase()));
  const dynamicWhen = (item: (typeof shoppingGuide)[number]) => item.bestCity.startsWith("Shenzhen") ? schedule.cityDateLabels.shenzhen : item.bestCity.startsWith("Hong Kong") ? schedule.cityDateLabels.hongkong : item.bestCity.startsWith("Macao") ? schedule.cityDateLabels.macau : item.bestCity.startsWith("Shanghái") ? schedule.cityDateLabels.shanghai : "No comprar";
  return <section className="content-section"><PageHeader eyebrow="Tiendas y mercados investigados" title="Tecnología, PC, drones, ropa y compras finales" text="Hong Kong sirve para comparar precios primero; Shenzhen queda casi al final y concentra las compras principales de electrónica, drones y ropa económica. Cada lugar explica qué comprar, qué comprobar y la fuente utilizada." /><div className="shopping-weight"><ShoppingBag /><div><span>Peso adicional previsto</span><strong>{state.shoppingWeightKg} kg</strong><small>≈{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg por persona si se reparte entre 5</small></div><p>Empacar una bolsa plegable y dejar este margen en la franquicia del vuelo SZX→SHA y del regreso a JFK. Las baterías sueltas y power banks van en cabina.</p></div><div className="shopping-grid">{shoppingGuide.map((item) => <article key={item.category}><header><ShoppingBag /><div><small>Ventana actual · {dynamicWhen(item)}</small><h2>{item.category}</h2></div></header><div className="best-city"><MapPin />{item.bestCity}</div><p>{item.action}</p><div className="warning-line"><AlertTriangle />{item.warning}</div><SourceLink href={item.source} /></article>)}</div><section className="shopping-directory"><div className="section-title-row"><div><span className="eyebrow">Directorio práctico</span><h2>{shoppingPlaces.length} lugares verificados o señalados como variables</h2></div><span>{filteredPlaces.length} visibles</span></div><div className="shopping-filters"><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="RAM, SSD, drones, ropa…" aria-label="Buscar tiendas o productos" /></div><select value={cityFilter} onChange={(event) => setCityFilter(event.target.value as CityId | "all")} aria-label="Filtrar tiendas por ciudad"><option value="all">Todas las ciudades</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select></div><div className="shopping-place-grid">{filteredPlaces.map((place) => <article key={`${place.city}-${place.name}`}><header><div><small>{cityName(place.city)} · {place.area}</small><h3>{place.name}</h3></div><EvidenceBadge status={place.status} /></header><strong>{place.specialty}</strong><dl><div><dt>Qué hacer</dt><dd>{place.buy}</dd></div><div><dt>Comprobar</dt><dd>{place.verify}</dd></div><div><dt>Momento</dt><dd>{place.timing} · estancia {schedule.cityDateLabels[place.city]}</dd></div></dl><SourceLink href={place.source} label="Abrir fuente/lugar" /></article>)}</div>{!filteredPlaces.length && <div className="empty-state"><ShoppingBag /><h3>No hay coincidencias</h3><p>Prueba otra ciudad o producto.</p></div>}</section><div className="shopping-timeline"><h2>Orden recomendado con fechas flexibles</h2><div><span><b>{schedule.cityDateLabels.hongkong}</b><strong>Comparar y comprar solo ventajas claras</strong><small>Golden Computer y marcas oficiales; evitar cargar compras voluminosas.</small></span><ArrowRight /><span><b>{schedule.cityDateLabels.macau}</b><strong>Recuerdos específicos</strong><small>Comida para consumir durante el viaje y productos propios de Macao.</small></span><ArrowRight /><span><b>{schedule.cityDateLabels.shenzhen}</b><strong>Compra principal</strong><small>SEG/Huaqiangbei, DJI oficial y Dongmen; probar, facturar y pesar.</small></span><ArrowRight /><span><b>{schedule.cityDateLabels.shanghai}</b><strong>Empaquetado final</strong><small>Solo regalos faltantes y reorganizar maletas antes de JFK.</small></span></div></div></section>;
}

function LuggagePage({ state, setState, baseCosts, schedule }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="5 viajeros · 5 maletas" title="Equipaje y transporte local" text="No recomendamos vans por costumbre. La opción correcta depende de si hay maletas, tráfico, transbordos y cinco asientos reales. Los costos locales se adaptan al número de noches elegido." /><div className="luggage-dashboard"><div><Luggage /><span>Maletas facturadas previstas</span><strong>5</strong><small>Una por viajero</small></div><div><ShoppingBag /><span>Compras previstas</span><strong>{state.shoppingWeightKg} kg</strong><small>{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg p/p</small></div><div><CircleDollarSign /><span>Reserva de tasas</span><strong>{money(state.baggageReserve)}</strong><small>No es una tasa confirmada</small></div><div><Bus /><span>Transporte local</span><strong>{money(baseCosts.localCost)}</strong><small>5 ciudades · {TOTAL_NIGHTS} noches</small></div></div><section className="rules-section"><h2>Reglas que condicionan el plan</h2><div className="rules-grid">{luggageRules.map((rule) => <article key={rule.mode}><header><Luggage /><h3>{rule.mode}</h3></header><p>{rule.rule}</p><div><Check />{rule.action}</div><SourceLink href={rule.source} /></article>)}</div></section><section className="local-section"><div className="section-title-row"><div><span className="eyebrow">Comparación por ciudad</span><h2>Público, mixto o privado</h2></div><strong>{money(baseCosts.localCost)} para 5</strong></div>{cities.map((city) => <div className="local-city" key={city.id}><header><div><MapPin /><h3>{city.name}</h3></div><span>{schedule.cityDateLabels[city.id]} · {state.stayNights[city.id]}n</span></header><div className="local-options">{localPlans.filter((plan) => plan.city === city.id).map((plan) => { const selected = state.localIds[city.id] === plan.id; return <article key={plan.id} className={selected ? "is-selected" : ""}><div><h4>{plan.name}</h4><EvidenceBadge status={plan.status} /></div><strong>{money(localPlanPrice(plan, state.stayNights[city.id]))}</strong><small>{plan.bestFor}</small><p>{plan.details}</p><div className="luggage-fit"><Luggage />{plan.luggage}</div><div className="card-actions"><SelectButton selected={selected} onClick={() => setState((current) => ({ ...current, localIds: { ...current.localIds, [city.id]: plan.id } }))} /><SourceLink href={plan.sourceUrl} /></div></article>; })}</div></div>)}</section></section>;
}
