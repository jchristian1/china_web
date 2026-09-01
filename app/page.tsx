"use client";

import {
  AlertTriangle, ArrowRight, BadgeCheck, BedDouble, BookOpenCheck,
  BriefcaseBusiness, Bus, CalendarDays, Check, CircleDollarSign, Clock3,
  ExternalLink, Filter, Hotel, Info, Luggage, Map, MapPin, Menu, Minus,
  PackageCheck, Plane, Plus, RotateCcw, Search, Settings2, Ship, ShoppingBag,
  Sparkles, Star, TicketCheck, TrainFront, Utensils, WalletCards, X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BookingState, CityId, EvidenceStatus, PackagePreset, TRAVELERS, TRIP_DAYS,
  UPDATED_AT, attractions, cities, cityName, defaultPackage, hotels,
  importantSources, localPlans, luggageRules, packages, shoppingGuide,
  transportSegments, tripDays,
} from "@/lib/trip-data";

type PageId = "inicio" | "itinerario" | "atracciones" | "transporte" | "hoteles" | "paquetes" | "arma" | "resumen" | "reservas" | "compras" | "equipaje";

interface PlannerState {
  hotelIds: Record<CityId, string>;
  transportIds: Record<string, string>;
  localIds: Record<CityId, string>;
  attractionIds: string[];
  foodPerPersonDay: number;
  baggageReserve: number;
  internationalFlights: number;
  insurance: number;
  visa: number;
  other: number;
  shoppingWeightKg: number;
  bookingStates: Record<string, BookingState>;
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

const STORAGE_KEY = "china-familia-2026-v3";

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
  hotelIds: { ...defaultPackage.hotelIds },
  transportIds: { ...defaultPackage.transportIds },
  localIds: { ...defaultPackage.localIds },
  attractionIds: [...defaultPackage.attractionIds],
  foodPerPersonDay: defaultPackage.foodPerPersonDay,
  baggageReserve: defaultPackage.baggageReserve,
  internationalFlights: 0,
  insurance: 0,
  visa: 0,
  other: 0,
  shoppingWeightKg: 25,
  bookingStates: { "intl-flight": "RESERVADO" },
});

const usd = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money = (value: number) => usd.format(Math.round(value));
const round = (value: number) => Math.round(value);

const statusText: Record<EvidenceStatus, string> = {
  VERIFICADO: "Verificado", ESTIMADO: "Estimado", NO_PUBLICADO: "Horario no publicado", VARIABLE: "Precio/horario variable",
};
const bookingText: Record<BookingState, string> = {
  RESERVADO: "Reservado", LISTO: "Listo para reservar", ESPERANDO: "Esperando horario", OPCIONAL: "Opcional",
};

type TimelineEvent = { time: string; title: string; note?: string; critical?: boolean };

const travelEventsByOption: Record<string, TimelineEvent[]> = {
  "sh-zjj-flight": [
    { time: "07:15", title: "Check-out y traslado a PVG", note: "Hora de planificación basada en el patrón actual; ajustar cuando el billete 2026 esté emitido." },
    { time: "08:15", title: "Facturación, seguridad y 5 maletas" },
    { time: "10:15", title: "FM7225 PVG→DYG", note: "Patrón actual, no horario confirmado para el 28 nov 2026.", critical: true },
    { time: "12:25", title: "Llegada patrón a DYG + recogida" },
    { time: "14:30", title: "Traslado y check-in en Wulingyuan" },
    { time: "18:00", title: "Cena de Hunan + preparar capas" },
  ],
  "sh-zjj-train": [
    { time: "≈06:00", title: "Bloquear una salida temprana hacia Hongqiao", note: "Ventana estimada: 12306 todavía no ha publicado el tren del 28 nov.", critical: true },
    { time: "≈08:00", title: "HSR Shanghai Hongqiao→Zhangjiajie West", note: "Hora exacta y número de tren pendientes; reservar 9–11 h puerta a puerta." },
    { time: "≈17:00", title: "Ventana estimada de llegada y check-in", note: "No fijar una actividad con entrada esa tarde hasta tener el billete." },
    { time: "≈19:00", title: "Cena cerca del hotel" },
  ],
  "zjj-sz-flight": [
    { time: "08:00", title: "Desayuno, check-out y guardar equipaje" },
    { time: "13:00", title: "Almuerzo + recoger las 5 maletas" },
    { time: "16:30", title: "Van Wulingyuan→DYG", note: "Margen de planificación; confirmar recogida al emitir el billete." },
    { time: "17:30", title: "Facturación y seguridad" },
    { time: "19:40", title: "Y87574 DYG→SZX", note: "Patrón mié/vie/dom actual; operación del 2 dic 2026 aún no confirmada.", critical: true },
    { time: "21:45", title: "Llegada patrón a SZX + equipaje" },
    { time: "23:15", title: "Check-in en Shenzhen" },
  ],
  "zjj-sz-train": [
    { time: "≈06:00", title: "Bloquear el día para llegar a Zhangjiajie West", note: "12306 aún no publica salida ni número de tren.", critical: true },
    { time: "≈08:00", title: "HSR Zhangjiajie West→Shenzhen North", note: "Duración ferroviaria actual desde 6 h 20; no reservar una actividad matutina." },
    { time: "≈18:00", title: "Ventana estimada de llegada a Shenzhen", note: "La hora final dependerá del tren disponible y del traslado al hotel." },
  ],
  "sz-mo-ferry": [
    { time: "07:00", title: "Check-out y traslado a Shekou" },
    { time: "08:00", title: "Facturación, inmigración y equipaje" },
    { time: "09:00", title: "Shekou→Macao Outer Harbour", note: "Salida del horario vigente; reconfirmar venta para el 5 dic 2026.", critical: true },
    { time: "≈10:30", title: "Ventana estimada de llegada al hotel", note: "Incluye inmigración y recogida de equipaje." },
    { time: "13:30", title: "Almuerzo macaense" },
  ],
  "sz-mo-train": [
    { time: "≈06:30", title: "Salida hacia Shenzhen North", note: "Horario exacto pendiente de 12306.", critical: true },
    { time: "≈08:00", title: "HSR vía Guangzhou South + Zhuhai", note: "No existe un billete directo único; habrá transbordo y cruce en Gongbei." },
    { time: "≈13:00", title: "Ventana estimada de llegada a Macao", note: "No reservar una entrada antes de las 14:00 hasta tener los trenes." },
  ],
  "mo-hk-turbo": [
    { time: "08:30", title: "Desayuno, check-out y consigna" },
    { time: "≈13:30", title: "Ventana de ferry Outer Harbour→Sheung Wan", note: "Elegir salida con al menos 75 min desde la actividad matutina; horario definitivo por confirmar.", critical: true },
    { time: "17:30", title: "Check-in y cena temprana en Kowloon" },
  ],
  "mo-hk-cotai": [
    { time: "08:30", title: "Desayuno, check-out y consigna" },
    { time: "≈13:30", title: "Ventana de ferry Taipa→Sheung Wan", note: "Con teamLab, elegir una salida posterior y reservar las 5 maletas el día anterior.", critical: true },
    { time: "17:30", title: "Check-in y cena temprana en Kowloon" },
  ],
  "mo-hk-bus": [
    { time: "08:30", title: "Desayuno, check-out y consigna" },
    { time: "≈13:30", title: "Salida flexible hacia el puerto HZMB", note: "Cruce operativo 24 h; sumar taxis/metro en ambos extremos." },
    { time: "17:30", title: "Check-in y cena temprana en Kowloon" },
  ],
  "hk-sh-flight": [
    { time: "06:15", title: "Check-out con 5 maletas" },
    { time: "07:15", title: "Llegada a HKG, facturación y seguridad" },
    { time: "09:45", title: "MU724 HKG→PVG", note: "Patrón actual, no horario confirmado para el 9 dic 2026.", critical: true },
    { time: "12:25", title: "Llegada patrón a PVG + equipaje" },
    { time: "14:30", title: "Check-in final en Shanghái" },
    { time: "18:30", title: "Cena de despedida" },
  ],
  "hk-sh-train": [
    { time: "≈09:00", title: "Bloquear el día para West Kowloon", note: "12306 todavía no publica el servicio del 9 dic.", critical: true },
    { time: "≈11:00", title: "HSR West Kowloon→Shanghai Hongqiao", note: "Ventana estimada, no horario: el servicio actual tarda unas 8 h 08." },
    { time: "≈21:00", title: "Llegada nocturna estimada y check-in", note: "No añadir Yu Garden ni otra entrada esa tarde." },
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

function selectedTransportOption(segmentId: string, optionId: string) {
  return transportSegments.find((segment) => segment.id === segmentId)?.options.find((option) => option.id === optionId);
}

function costForSelections(hotelIds: Record<CityId, string>, transportIds: Record<string, string>, localIds: Record<CityId, string>, attractionIds: string[], foodPerPersonDay: number, baggageReserve: number) {
  const hotelCost = Object.values(hotelIds).reduce((sum, id) => sum + (hotels.find((hotel) => hotel.id === id)?.total ?? 0), 0);
  const transportCost = Object.entries(transportIds).reduce((sum, [segmentId, optionId]) => sum + (selectedTransportOption(segmentId, optionId)?.groupPrice ?? 0), 0);
  const localCost = Object.values(localIds).reduce((sum, id) => sum + (localPlans.find((plan) => plan.id === id)?.groupPrice ?? 0), 0);
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

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Map }) {
  return <div className="metric-card"><Icon size={19} aria-hidden="true" /><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = max ? Math.min(100, (value / max) * 100) : 0;
  return <span className="mini-progress" aria-label={`${value} de ${max}`}><i style={{ width: `${percentage}%` }} /></span>;
}

export default function Home() {
  const [state, setState] = useState<PlannerState>(initialState);
  const [page, setPage] = useState<PageId>("inicio");
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setState({ ...initialState(), ...JSON.parse(stored) });
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
  const baseCosts = useMemo(() => costForSelections(state.hotelIds, state.transportIds, state.localIds, state.attractionIds, state.foodPerPersonDay, state.baggageReserve), [state]);
  const extras = state.internationalFlights + state.insurance + state.visa + state.other;
  const total = Object.values(baseCosts).reduce((sum, value) => sum + value, 0) + extras;
  const hasIntlPrice = state.internationalFlights > 0;

  const bookingRows = useMemo<BookingRow[]>(() => {
    const rows: BookingRow[] = [{ key: "intl-flight", type: "Vuelo", date: "24 nov / 10 dic", name: "Korean Air · JFK↔PVG (comprado)", cost: state.internationalFlights, link: "https://www.koreanair.com/", initialState: "RESERVADO", note: state.internationalFlights ? "Importe incluido en el total." : "Añadir el importe pagado en Resumen." }];
    const shanghaiHotel = hotels.find((hotel) => hotel.id === state.hotelIds.shanghai);
    if (shanghaiHotel) rows.push(
      { key: "hotel-shanghai-1", type: "Hotel", date: "25–28 nov", name: `${shanghaiHotel.name} · primera estancia`, cost: round(shanghaiHotel.total * 0.75), link: shanghaiHotel.bookingUrl, initialState: "LISTO", note: "3 noches · 5 adultos" },
      { key: "hotel-shanghai-2", type: "Hotel", date: "9–10 dic", name: `${shanghaiHotel.name} · noche final`, cost: round(shanghaiHotel.total * 0.25), link: shanghaiHotel.bookingUrl, initialState: "LISTO", note: "Reserva separada · 1 noche" },
    );
    cities.filter((city) => city.id !== "shanghai").forEach((city) => {
      const hotel = hotels.find((item) => item.id === state.hotelIds[city.id]);
      if (hotel) rows.push({ key: `hotel-${city.id}`, type: "Hotel", date: city.dates, name: hotel.name, cost: hotel.total, link: hotel.bookingUrl, initialState: "LISTO", note: hotel.roomConfig });
    });
    transportSegments.forEach((segment) => {
      const option = selectedTransportOption(segment.id, state.transportIds[segment.id]);
      if (option) rows.push({ key: `transport-${segment.id}`, type: option.mode, date: segment.date, name: option.name, cost: option.groupPrice, link: option.bookingUrl, initialState: option.status === "NO_PUBLICADO" ? "ESPERANDO" : "LISTO", note: option.statusNote });
    });
    selectedAttractions.forEach((attraction) => {
      const isFree = attraction.pricePerPerson === 0;
      rows.push({ key: `attraction-${attraction.id}`, type: "Atracción", date: attraction.day.slice(5).split("-").reverse().join("/"), name: attraction.name, cost: round(attraction.pricePerPerson * TRAVELERS), link: attraction.bookingUrl, initialState: attraction.status === "NO_PUBLICADO" ? "ESPERANDO" : isFree ? "OPCIONAL" : "LISTO", note: attraction.booking });
    });
    return rows;
  }, [selectedAttractions, state.hotelIds, state.internationalFlights, state.transportIds]);

  const bookedCount = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "RESERVADO").length;
  const waitingCount = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "ESPERANDO").length;
  const go = (next: PageId) => { setPage(next); setMenuOpen(false); };

  const applyPackage = (preset: PackagePreset) => {
    setState((current) => ({ ...current, hotelIds: { ...preset.hotelIds }, transportIds: { ...preset.transportIds }, localIds: { ...preset.localIds }, attractionIds: [...preset.attractionIds], foodPerPersonDay: preset.foodPerPersonDay, baggageReserve: preset.baggageReserve, bookingStates: { "intl-flight": current.bookingStates["intl-flight"] ?? "RESERVADO" } }));
    setNotice(`Paquete ${preset.name} aplicado. Puedes cambiar cualquier elección.`);
  };

  const toggleAttraction = (id: string) => setState((current) => ({ ...current, attractionIds: current.attractionIds.includes(id) ? current.attractionIds.filter((item) => item !== id) : [...current.attractionIds, id], bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => key !== `attraction-${id}`)) }));
  const reset = () => { if (!window.confirm("¿Restablecer todas las decisiones al paquete Premium inicial?")) return; setState(initialState()); setNotice("Decisiones restablecidas."); };
  const common = { state, setState, go, toggleAttraction, total, baseCosts, bookingRows, bookedCount, waitingCount };

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
        {page === "paquetes" && <PackagesPage {...common} applyPackage={applyPackage} />}
        {page === "arma" && <BuilderPage {...common} />}
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
};

function Dashboard({ state, go, total, baseCosts, bookingRows, bookedCount, waitingCount, hasIntlPrice, reset }: CommonProps & { hasIntlPrice: boolean; reset: () => void }) {
  const selectedHotelNames = cities.map((city) => hotels.find((hotel) => hotel.id === state.hotelIds[city.id])?.name).filter(Boolean);
  return <>
    <section className="hero"><img src="/attractions/zjj-tianzi.webp" alt="Pilares de arenisca de Zhangjiajie" /><div className="hero-shade" /><div className="hero-content"><span className="eyebrow light">24 noviembre — 10 diciembre 2026</span><h1>Decidir el viaje,<br />no solo mirarlo.</h1><p>Compara opciones reales para 5, elige una y ve al instante qué cambia en la ruta, el presupuesto y las compras pendientes.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => go("arma")}>Armar nuestro viaje <ArrowRight size={18} /></button><button className="ghost-button" type="button" onClick={() => go("resumen")}>Ver total actual</button></div></div><div className="hero-facts"><div><strong>16</strong><span>días</span></div><div><strong>5</strong><span>viajeros</span></div><div><strong>5</strong><span>destinos</span></div><div><strong>15</strong><span>noches</span></div></div></section>
    <section className="content-section dashboard-section">
      <div className="status-callout warning"><AlertTriangle size={21} /><div><strong>El plan es utilizable, pero no todo se puede comprar hoy.</strong><p>12306 todavía no publica los trenes de finales de noviembre/diciembre y varios ferries deben reconfirmarse. La app los marca como “Esperando horario” en vez de inventar servicios.</p></div><button type="button" onClick={() => go("reservas")}>Ver {waitingCount} pendientes</button></div>
      <div className="section-title-row"><div><span className="eyebrow">Panel de decisiones</span><h2>Así está el viaje ahora</h2></div><button type="button" className="quiet-button" onClick={reset}><RotateCcw size={15} /> Restablecer Premium</button></div>
      <div className="metrics-grid"><Metric icon={WalletCards} label={hasIntlPrice ? "Total para 5" : "Total parcial para 5"} value={money(total)} note={`${money(total / TRAVELERS)} por persona`} /><Metric icon={Hotel} label="Hoteles" value={money(baseCosts.hotelCost)} note="5 destinos · 6 reservas" /><Metric icon={TicketCheck} label="Experiencias" value={String(state.attractionIds.length)} note={`${money(baseCosts.attractionCost)} para 5`} /><Metric icon={BookOpenCheck} label="Compras completadas" value={`${bookedCount}/${bookingRows.length}`} note={`${waitingCount} esperan horario`} /></div>
      {!hasIntlPrice && <button type="button" className="missing-cost" onClick={() => go("resumen")}><Info size={18} /><span><strong>Falta el importe de los vuelos internacionales comprados.</strong> El total mostrado es parcial; añádelo para obtener el costo real final.</span><ArrowRight size={17} /></button>}
      <div className="decision-grid"><article className="decision-card"><span className="card-icon"><Hotel /></span><div><small>Selección actual</small><h3>Hoteles</h3><p>{selectedHotelNames.join(" · ")}</p></div><button type="button" onClick={() => go("hoteles")}>Comparar</button></article><article className="decision-card"><span className="card-icon"><TrainFront /></span><div><small>5 tramos</small><h3>Transporte interurbano</h3><p>3 vuelos · 2 ferries en el punto de partida Premium.</p></div><button type="button" onClick={() => go("transporte")}>Comparar</button></article><article className="decision-card"><span className="card-icon"><Settings2 /></span><div><small>Todo mezclable</small><h3>Arma tu viaje</h3><p>Sube Macao, ahorra en Zhangjiajie o cambia un vuelo por tren.</p></div><button type="button" onClick={() => go("arma")}>Personalizar</button></article></div>
      <div className="route-strip" aria-label="Ruta del viaje">{cities.map((city, index) => <div key={city.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{city.name}</strong><small>{city.nights} {city.nights === 1 ? "noche" : "noches"}</small>{index < cities.length - 1 && <ArrowRight />}</div>)}</div>
    </section>
  </>;
}

function ItineraryPage({ state, go, baseCosts }: CommonProps) {
  const transportByIsoDate: Record<string, string> = { "2026-11-28": "sh-zjj", "2026-12-02": "zjj-sz", "2026-12-05": "sz-mo", "2026-12-06": "mo-hk", "2026-12-09": "hk-sh" };
  const selectedAttractions = attractions.filter((item) => state.attractionIds.includes(item.id));
  return <section className="content-section"><PageHeader eyebrow="Día por día" title="Itinerario que responde a tus decisiones" text="Cada tarjeta toma el hotel, transporte y experiencias seleccionados. Las horas con ≈ son ventanas estimadas, nunca horarios publicados; si cargas demasiado un día, aparece una advertencia." /><div className="itinerary-summary"><div><Utensils /><span>Comida diaria para 5</span><strong>{money(state.foodPerPersonDay * TRAVELERS)}</strong></div><div><CircleDollarSign /><span>Comida total</span><strong>{money(baseCosts.foodCost)}</strong></div><div><Luggage /><span>Reserva de equipaje</span><strong>{money(state.baggageReserve)}</strong></div></div><div className="timeline">{tripDays.map((day) => {
    const dayAttractions = selectedAttractions.filter((item) => item.day === day.date).sort((a, b) => a.time.localeCompare(b.time));
    const duration = dayAttractions.reduce((sum, item) => sum + item.duration, 0);
    const segmentId = transportByIsoDate[day.date]; const segment = segmentId ? transportSegments.find((item) => item.id === segmentId) : undefined;
    const transport = segment ? selectedTransportOption(segment.id, state.transportIds[segment.id]) : undefined;
    const hotel = day.city !== "transito" ? hotels.find((item) => item.id === state.hotelIds[day.city]) : undefined;
    const travelConflict = (transport?.id === "zjj-sz-train" && dayAttractions.length > 0) || (transport?.id === "sz-mo-train" && dayAttractions.some((item) => item.time < "14:00")) || (transport?.id === "hk-sh-train" && dayAttractions.length > 0);
    const overloaded = duration > 8.5 || attractionsOverlap(dayAttractions) || travelConflict || (day.date === "2026-12-04" && dayAttractions.some((item) => item.id === "sz-window") && dayAttractions.some((item) => item.id === "sz-science")) || (day.date === "2026-12-08" && dayAttractions.filter((item) => ["hk-ngong", "hk-disney", "hk-mplus"].includes(item.id)).length > 1);
    const rawBaseEvents = transport ? travelEventsByOption[transport.id] ?? day.baseEvents : day.baseEvents;
    const baseEvents = day.date === "2026-12-06" && dayAttractions.some((item) => item.id === "mo-teamlab")
      ? rawBaseEvents.map((event) => event.title.startsWith("Ventana de ferry") ? { ...event, time: "≈14:30", note: "teamLab termina cerca de las 13:00: elegir una salida que deje al menos 75 min; horario definitivo por confirmar." } : event)
      : rawBaseEvents;
    const events = [...baseEvents.map((event) => ({ ...event, attraction: undefined as typeof attractions[number] | undefined })), ...dayAttractions.map((item) => ({ time: item.time, title: item.name, note: `${item.duration} h · ${item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) + " para 5" : "gratuito"}`, critical: false, attraction: item }))].sort((a, b) => sortableTime(a.time) - sortableTime(b.time));
    return <article className="day-card" key={day.date}><div className="day-marker"><span>{day.label.split(" ")[0]}</span><strong>{day.label.split(" ").slice(1, 3).join(" ")}</strong></div><div className="day-content"><header><div><small>{day.city === "transito" ? "En tránsito" : cityName(day.city)}</small><h2>{day.title}</h2></div><div className={`load-badge ${overloaded ? "overloaded" : ""}`}><Clock3 size={14} />{duration ? `${duration.toLocaleString("es", { maximumFractionDigits: 1 })} h de actividades` : "Día de traslado"}</div></header>{overloaded && <div className="day-warning"><AlertTriangle size={16} /><span>Selecciones incompatibles o demasiado cargadas. Quita una opción alternativa en Atracciones.</span><button type="button" onClick={() => go("atracciones")}>Corregir</button></div>}{transport && <div className="selected-transport"><span className="mode-icon">{transport.mode === "Vuelo" ? <Plane /> : transport.mode === "Ferry" ? <Ship /> : transport.mode === "Autobús" ? <Bus /> : <TrainFront />}</span><div><small>Traslado seleccionado</small><strong>{transport.name}</strong><p>{transport.schedule} · {transport.doorToDoor}</p></div><b>{money(transport.groupPrice)}</b></div>}<ol className="events-list">{events.map((event, index) => <li key={`${event.time}-${event.title}-${index}`} className={event.critical ? "critical" : ""}><time>{event.time}</time><span /><div><strong>{event.title}</strong>{event.note && <p>{event.note}</p>}{event.attraction && <SourceLink href={event.attraction.bookingUrl} label="Entrada" />}</div></li>)}</ol>{hotel && <div className="night-stay"><BedDouble size={18} /><span>Noche en <strong>{hotel.name}</strong></span><small>{hotel.roomConfig}</small></div>}{day.date === "2026-12-10" ? <div className="day-food"><Utensils size={15} /> Comidas del vuelo: confirmar lo incluido; <strong>no se suma un día 17</strong> al presupuesto.</div> : <div className="day-food"><Utensils size={15} /> Comidas del día: <strong>{money(state.foodPerPersonDay * TRAVELERS)}</strong> para 5 (presupuesto, no reserva).</div>}</div></article>;
  })}</div></section>;
}

function AttractionsPage({ state, toggleAttraction }: CommonProps) {
  const [cityFilter, setCityFilter] = useState<CityId | "all">("all"); const [category, setCategory] = useState("all"); const [onlySelected, setOnlySelected] = useState(false); const [query, setQuery] = useState("");
  const categories = Array.from(new Set(attractions.map((item) => item.category)));
  const filtered = attractions.filter((item) => (cityFilter === "all" || item.city === cityFilter) && (category === "all" || item.category === category) && (!onlySelected || state.attractionIds.includes(item.id)) && item.name.toLowerCase().includes(query.toLowerCase()));
  const selectedCost = attractions.filter((item) => state.attractionIds.includes(item.id)).reduce((sum, item) => sum + item.pricePerPerson * TRAVELERS, 0);
  return <section className="content-section"><PageHeader eyebrow="Experiencias reales" title="Atracciones que valen tiempo de viaje" text="Priorizamos tecnología inmersiva, ciencia, espectáculos, naturaleza y experiencias activas. Cada precio muestra su nivel de certeza y el costo calculado para 5." /><div className="sticky-tools"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar experiencia" aria-label="Buscar experiencia" /></div><select value={cityFilter} onChange={(event) => setCityFilter(event.target.value as CityId | "all")} aria-label="Filtrar por ciudad"><option value="all">Todas las ciudades</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrar por categoría"><option value="all">Todas las categorías</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><label className="check-filter"><input type="checkbox" checked={onlySelected} onChange={(event) => setOnlySelected(event.target.checked)} /> Solo elegidas</label><div className="selection-total"><strong>{state.attractionIds.length}</strong><span>elegidas<br />{money(selectedCost)}</span></div></div><div className="cards-grid attraction-grid">{filtered.map((item) => {
    const selected = state.attractionIds.includes(item.id);
    return <article className={`attraction-card ${selected ? "is-selected" : ""}`} key={item.id}><div className="card-image"><img src={item.image} alt={item.name} loading="lazy" /><div className="image-badges"><span>{cityName(item.city)}</span><span>{item.category}</span></div>{item.recommendation === "Imprescindible" && <div className="recommend-badge"><Star size={13} fill="currentColor" /> Imprescindible</div>}</div><div className="card-body"><div className="card-title-line"><h2>{item.name}</h2><EvidenceBadge status={item.status} /></div><p>{item.description}</p><div className="facts-row"><span><Clock3 /> {item.duration} h</span><span><CalendarDays /> {item.day.slice(5).split("-").reverse().join("/")}</span></div><div className="price-panel"><div><small>Por persona</small><strong>{item.pricePerPerson ? money(item.pricePerPerson) : "Gratis"}</strong></div><div><small>Para 5</small><strong>{item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) : "Gratis"}</strong></div><p>{item.priceLabel}</p></div><div className="booking-note"><TicketCheck size={16} /><span>{item.booking}</span></div><div className="card-actions"><SelectButton selected={selected} onClick={() => toggleAttraction(item.id)} label={selected ? "Quitar del viaje" : "Añadir al viaje"} /><SourceLink href={item.bookingUrl} label="Reservar" /><SourceLink href={item.sourceUrl} /></div></div></article>;
  })}</div>{!filtered.length && <div className="empty-state"><Filter /><h3>No hay resultados</h3><p>Cambia los filtros para ver más experiencias.</p></div>}</section>;
}

function TransportPage({ state, setState }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="Puerta a puerta" title="Comparar el viaje completo, no solo la duración del asiento" text="Los tiempos incluyen traslados, margen de seguridad, controles y recogida de equipaje. Los números de vuelo se muestran solo donde existe un patrón actual verificable." /><div className="method-note"><Info size={18} /><p><strong>Regla de decisión:</strong> el vuelo gana solo cuando reduce el tiempo hotel→hotel o protege una mañana importante. Los trenes de diciembre aparecen como “Horario no publicado” porque 12306 todavía no los vende.</p></div><div className="transport-list">{transportSegments.map((segment) => <section className="segment" key={segment.id}><header className="segment-header"><div><span>{segment.date}</span><h2>{segment.from} <ArrowRight /> {segment.to}</h2><p>{segment.why}</p></div><div className="segment-choice">Elegido<strong>{selectedTransportOption(segment.id, state.transportIds[segment.id])?.mode}</strong></div></header><div className={`transport-options columns-${segment.options.length}`}>{segment.options.map((option) => {
    const selected = state.transportIds[segment.id] === option.id; const ModeIcon = option.mode === "Vuelo" ? Plane : option.mode === "Ferry" ? Ship : option.mode === "Autobús" ? Bus : TrainFront;
    return <article className={`transport-card ${selected ? "is-selected" : ""}`} key={option.id}>{option.recommended && <span className="recommended-ribbon"><BadgeCheck size={14} /> Recomendado</span>}<div className="transport-mode"><ModeIcon /><span>{option.mode}</span><EvidenceBadge status={option.status} /></div><h3>{option.name}</h3><p className="schedule">{option.schedule}</p><div className="transport-price"><strong>{money(option.groupPrice)}</strong><span>para 5<br />{option.priceNote}</span></div><dl><div><dt>Puerta a puerta</dt><dd>{option.doorToDoor}</dd></div><div><dt>Comodidad</dt><dd>{option.comfort}</dd></div><div><dt>Equipaje</dt><dd>{option.luggage}</dd></div></dl><div className="pros-cons"><div><strong>A favor</strong>{option.pros.map((item) => <p key={item}><Plus size={13} />{item}</p>)}</div><div><strong>En contra</strong>{option.cons.map((item) => <p key={item}><Minus size={13} />{item}</p>)}</div></div><p className="verification-note"><AlertTriangle size={15} />{option.statusNote}</p><div className="card-actions"><SelectButton selected={selected} label={selected ? "Opción elegida" : "Elegir esta opción"} onClick={() => setState((current) => ({ ...current, transportIds: { ...current.transportIds, [segment.id]: option.id }, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => key !== `transport-${segment.id}`)) }))} /><SourceLink href={option.bookingUrl} label="Buscar/comprar" /><SourceLink href={option.sourceUrl} /></div></article>;
  })}</div></section>)}</div></section>;
}

function HotelsPage({ state, setState }: CommonProps) {
  const [city, setCity] = useState<CityId>("shanghai"); const [tier, setTier] = useState("all"); const options = hotels.filter((hotel) => hotel.city === city && (tier === "all" || hotel.tier === tier));
  return <section className="content-section"><PageHeader eyebrow="25 opciones reales" title="Un hotel para cada destino" text="Hay cinco opciones por ciudad y diferentes niveles de gasto. El precio es un presupuesto dinámico para las fechas y configuración indicada; la disponibilidad final se confirma en el enlace." /><div className="city-tabs" role="tablist">{cities.map((item) => <button type="button" key={item.id} className={city === item.id ? "is-active" : ""} onClick={() => setCity(item.id)}>{item.name}<small>{item.nights}n</small></button>)}</div><div className="hotel-tools"><div><Filter size={16} /> Nivel</div>{["all", "Económico", "Valor", "Confort", "Premium"].map((item) => <button key={item} type="button" className={tier === item ? "is-active" : ""} onClick={() => setTier(item)}>{item === "all" ? "Todos" : item}</button>)}</div><div className="cards-grid hotel-grid">{options.map((hotel) => {
    const selected = state.hotelIds[hotel.city] === hotel.id;
    return <article className={`hotel-card ${selected ? "is-selected" : ""}`} key={hotel.id}><div className="card-image"><img src={hotel.image} alt={hotel.name} loading="lazy" /><div className="hotel-tier">{hotel.tier}</div><a className="photo-credit" href={hotel.photoSource} target="_blank" rel="noreferrer">Foto ↗</a></div><div className="card-body"><div className="card-title-line"><div><small>{hotel.area}</small><h2>{hotel.name}</h2></div><EvidenceBadge status={hotel.status} /></div><div className="room-config"><BedDouble size={18} /><span><strong>Configuración para 5</strong>{hotel.roomConfig}</span></div><div className="hotel-price"><span>Total de la estancia</span><strong>{money(hotel.total)}</strong><small>{money(hotel.total / TRAVELERS)} por persona · {cities.find((item) => item.id === hotel.city)?.nights} noches</small><p>{hotel.priceNote}</p></div><div className="amenities">{hotel.amenities.map((item) => <span key={item}>{item}</span>)}</div><div className="pros-cons"><div><strong>A favor</strong>{hotel.pros.map((item) => <p key={item}><Plus size={13} />{item}</p>)}</div><div><strong>En contra</strong>{hotel.cons.map((item) => <p key={item}><Minus size={13} />{item}</p>)}</div></div><div className="card-actions"><SelectButton selected={selected} label={selected ? "Hotel elegido" : "Elegir hotel"} onClick={() => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [hotel.city]: hotel.id }, bookingStates: Object.fromEntries(Object.entries(current.bookingStates).filter(([key]) => !key.startsWith(`hotel-${hotel.city}`))) }))} /><SourceLink href={hotel.bookingUrl} label="Ver fechas" /><SourceLink href={hotel.sourceUrl} /></div></div></article>;
  })}</div></section>;
}

function PackagesPage({ applyPackage, state }: CommonProps & { applyPackage: (preset: PackagePreset) => void }) {
  return <section className="content-section"><PageHeader eyebrow="Misma ruta, cuatro niveles" title="Ahorrar sin cambiar de viaje" text="Las cuatro versiones conservan las ciudades y la mayoría de experiencias importantes. La diferencia viene sobre todo de hoteles, transporte, traslados y mejoras opcionales." /><div className="package-note"><Star /><p><strong>Premium parte del itinerario actual.</strong> No significa “el hotel más caro en cada ciudad”: mantiene Golden Tulip, Hilton Garden Inn, Huaqiang Plaza, Casa Real y Dorsett, y añade organización y traslados amplios.</p></div><div className="packages-grid">{packages.map((preset) => {
    const costs = costForSelections(preset.hotelIds, preset.transportIds, preset.localIds, preset.attractionIds, preset.foodPerPersonDay, preset.baggageReserve); const packageTotal = Object.values(costs).reduce((sum, value) => sum + value, 0) + state.internationalFlights + state.insurance + state.visa + state.other; const active = JSON.stringify(state.hotelIds) === JSON.stringify(preset.hotelIds) && JSON.stringify(state.transportIds) === JSON.stringify(preset.transportIds) && JSON.stringify(state.localIds) === JSON.stringify(preset.localIds) && JSON.stringify([...state.attractionIds].sort()) === JSON.stringify([...preset.attractionIds].sort()) && state.foodPerPersonDay === preset.foodPerPersonDay && state.baggageReserve === preset.baggageReserve;
    return <article className={`package-card package-${preset.id} ${active ? "is-active" : ""}`} key={preset.id}><header><span>{preset.name}</span>{preset.id === "value" && <b>Mejor equilibrio</b>}{preset.id === "premium" && <b>Punto de partida</b>}</header><h2>{money(packageTotal)}</h2><p className="per-person">{money(packageTotal / TRAVELERS)} por persona {state.internationalFlights ? "con vuelos internacionales" : "sin vuelos internacionales"}</p><p>{preset.tagline}</p><div className="package-breakdown"><span>Hoteles <b>{money(costs.hotelCost)}</b></span><span>Interurbano <b>{money(costs.transportCost)}</b></span><span>Local <b>{money(costs.localCost)}</b></span><span>Atracciones <b>{money(costs.attractionCost)}</b></span><span>Comida <b>{money(costs.foodCost)}</b></span><span>Equipaje <b>{money(costs.baggageCost)}</b></span></div><div className="gain-lose"><p><Plus /><span><strong>Ganas</strong>{preset.gain}</span></p><p><Minus /><span><strong>Pierdes</strong>{preset.lose}</span></p></div><button type="button" className="primary-button" onClick={() => applyPackage(preset)}>{active ? <Check /> : <Settings2 />}{active ? "Aplicado" : `Usar ${preset.name}`}</button></article>;
  })}</div><div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Qué cambia</th>{packages.map((preset) => <th key={preset.id}>{preset.name}</th>)}</tr></thead><tbody><tr><td>Comida p/p/día</td>{packages.map((preset) => <td key={preset.id}>{money(preset.foodPerPersonDay)}</td>)}</tr><tr><td>Experiencias</td>{packages.map((preset) => <td key={preset.id}>{preset.attractionIds.length}</td>)}</tr><tr><td>Traslado local</td><td>Público</td><td>Mixto</td><td>Mixto + van ZJJ</td><td>Privado frecuente</td></tr><tr><td>Interurbano</td><td>Tren/terrestre</td><td>Vuelos/ferry</td><td>Vuelos/ferry</td><td>Vuelos/ferry</td></tr></tbody></table></div></section>;
}

function BuilderPage({ state, setState, total, go, toggleAttraction }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="Mezcla sin límites" title="Arma tu propio viaje" text="Todas las decisiones usan el mismo modelo. Puedes subir Macao, ahorrar en Zhangjiajie, tomar un tren y conservar los espectáculos; el total se recalcula sin cambiar de página." /><div className="builder-total"><div><span>Total actual para 5</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></div><button type="button" onClick={() => go("resumen")}>Ver desglose <ArrowRight /></button></div><div className="builder-sections">
    <section className="builder-block"><header><Hotel /><div><span>Paso 1</span><h2>Elegir hotel por destino</h2></div></header><div className="builder-grid">{cities.map((city) => <label key={city.id}><span>{city.name}<small>{city.dates}</small></span><select value={state.hotelIds[city.id]} onChange={(event) => setState((current) => ({ ...current, hotelIds: { ...current.hotelIds, [city.id]: event.target.value } }))}>{hotels.filter((hotel) => hotel.city === city.id).map((hotel) => <option key={hotel.id} value={hotel.id}>{hotel.name} · {money(hotel.total)}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><TrainFront /><div><span>Paso 2</span><h2>Elegir cada tramo</h2></div></header><div className="builder-grid">{transportSegments.map((segment) => <label key={segment.id}><span>{segment.from} → {segment.to}<small>{segment.date}</small></span><select value={state.transportIds[segment.id]} onChange={(event) => setState((current) => ({ ...current, transportIds: { ...current.transportIds, [segment.id]: event.target.value } }))}>{segment.options.map((option) => <option key={option.id} value={option.id}>{option.mode} · {option.name} · {money(option.groupPrice)}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><Bus /><div><span>Paso 3</span><h2>Transporte local por ciudad</h2></div></header><div className="builder-grid">{cities.map((city) => <label key={city.id}><span>{city.name}<small>5 personas + 5 maletas</small></span><select value={state.localIds[city.id]} onChange={(event) => setState((current) => ({ ...current, localIds: { ...current.localIds, [city.id]: event.target.value } }))}>{localPlans.filter((plan) => plan.city === city.id).map((plan) => <option key={plan.id} value={plan.id}>{plan.name} · {money(plan.groupPrice)}</option>)}</select></label>)}</div></section>
    <section className="builder-block"><header><TicketCheck /><div><span>Paso 4</span><h2>Añadir o quitar experiencias</h2></div></header>{cities.map((city) => <div className="builder-attraction-city" key={city.id}><h3>{city.name}</h3><div>{attractions.filter((item) => item.city === city.id).map((item) => <label key={item.id} className={state.attractionIds.includes(item.id) ? "checked" : ""}><input type="checkbox" checked={state.attractionIds.includes(item.id)} onChange={() => toggleAttraction(item.id)} /><span><strong>{item.name}</strong><small>{item.category} · {item.pricePerPerson ? money(item.pricePerPerson * TRAVELERS) + " para 5" : "gratis"}</small></span></label>)}</div></div>)}</section>
    <section className="builder-block"><header><Utensils /><div><span>Paso 5</span><h2>Presupuestos ajustables</h2></div></header><div className="range-grid"><label><span>Comida por persona/día <strong>{money(state.foodPerPersonDay)}</strong></span><input type="range" min="20" max="100" step="5" value={state.foodPerPersonDay} onChange={(event) => setState((current) => ({ ...current, foodPerPersonDay: Number(event.target.value) }))} /><small>Total comida: {money(state.foodPerPersonDay * TRAVELERS * TRIP_DAYS)}</small></label><label><span>Reserva de equipaje <strong>{money(state.baggageReserve)}</strong></span><input type="range" min="0" max="1200" step="50" value={state.baggageReserve} onChange={(event) => setState((current) => ({ ...current, baggageReserve: Number(event.target.value) }))} /><small>Se usa solo si las tarifas no incluyen 5 maletas.</small></label><label><span>Peso de compras previsto <strong>{state.shoppingWeightKg} kg</strong></span><input type="range" min="0" max="75" step="5" value={state.shoppingWeightKg} onChange={(event) => setState((current) => ({ ...current, shoppingWeightKg: Number(event.target.value) }))} /><small>{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg adicionales por persona si se reparte.</small></label></div></section>
  </div></section>;
}

function SummaryPage({ state, setState, total, baseCosts, go, bookingRows, bookedCount, waitingCount, hasIntlPrice }: CommonProps & { hasIntlPrice: boolean }) {
  const custom = state.internationalFlights + state.insurance + state.visa + state.other;
  const rows = [{ label: "Hoteles", value: baseCosts.hotelCost, icon: Hotel }, { label: "Transporte interurbano", value: baseCosts.transportCost, icon: TrainFront }, { label: "Transporte local", value: baseCosts.localCost, icon: Bus }, { label: "Atracciones y tours", value: baseCosts.attractionCost, icon: TicketCheck }, { label: "Comida estimada", value: baseCosts.foodCost, icon: Utensils }, { label: "Equipaje", value: baseCosts.baggageCost, icon: Luggage }, { label: "Vuelos internacionales + otros", value: custom, icon: BriefcaseBusiness }]; const max = Math.max(...rows.map((row) => row.value));
  return <section className="content-section"><PageHeader eyebrow="Costo de las decisiones" title="Resumen del viaje" text="Este es el resultado actual para 5. Los importes de hoteles, billetes y experiencias siguen marcados como estimados cuando el proveedor todavía puede cambiar precio o inventario." /><div className="summary-hero"><div><span>{hasIntlPrice ? "Total completo" : "Total parcial"}</span><strong>{money(total)}</strong><small>{money(total / TRAVELERS)} por persona</small></div><div className="summary-status"><p><Check /> 5 hoteles elegidos</p><p><Check /> 5 tramos elegidos</p><p><TicketCheck /> {state.attractionIds.length} experiencias</p><p><BookOpenCheck /> {bookedCount}/{bookingRows.length} reservado</p><p><AlertTriangle /> {waitingCount} esperan horario</p></div></div>{!hasIntlPrice && <div className="status-callout warning"><AlertTriangle /><div><strong>El total todavía no incluye el vuelo JFK↔PVG.</strong><p>El itinerario dice que está comprado, pero el importe no estaba en la app original. Añádelo abajo; no hemos inventado un precio.</p></div></div>}<div className="budget-layout"><div className="budget-bars">{rows.map((row) => { const Icon = row.icon; return <div className="budget-row" key={row.label}><Icon /><span>{row.label}</span><div><i style={{ width: `${max ? row.value / max * 100 : 0}%` }} /></div><strong>{money(row.value)}</strong></div>; })}</div><aside className="custom-costs"><h2>Importes que solo tú conoces</h2><p>Se guardan en este navegador.</p><label>Vuelos internacionales comprados<input type="number" min="0" value={state.internationalFlights || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, internationalFlights: Math.max(0, Number(event.target.value)) }))} /></label><label>Seguro de viaje<input type="number" min="0" value={state.insurance || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, insurance: Math.max(0, Number(event.target.value)) }))} /></label><label>Visas / trámites<input type="number" min="0" value={state.visa || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, visa: Math.max(0, Number(event.target.value)) }))} /></label><label>Otros costos<input type="number" min="0" value={state.other || ""} placeholder="0" onChange={(event) => setState((current) => ({ ...current, other: Math.max(0, Number(event.target.value)) }))} /></label></aside></div><div className="selected-summary"><section><h2><Hotel /> Hoteles elegidos</h2>{cities.map((city) => { const hotel = hotels.find((item) => item.id === state.hotelIds[city.id]); return <button type="button" key={city.id} onClick={() => go("hoteles")}><span>{city.name}</span><strong>{hotel?.name}</strong><b>{money(hotel?.total ?? 0)}</b></button>; })}</section><section><h2><TrainFront /> Tramos elegidos</h2>{transportSegments.map((segment) => { const option = selectedTransportOption(segment.id, state.transportIds[segment.id]); return <button type="button" key={segment.id} onClick={() => go("transporte")}><span>{segment.from} → {segment.to}</span><strong>{option?.mode} · {option?.name}</strong><b>{money(option?.groupPrice ?? 0)}</b></button>; })}</section></div></section>;
}

function BookingsPage({ state, setState, bookingRows, bookedCount, waitingCount, total }: CommonProps) {
  const [filter, setFilter] = useState<BookingState | "TODOS">("TODOS"); const rows = bookingRows.filter((row) => filter === "TODOS" || (state.bookingStates[row.key] ?? row.initialState) === filter); const bookedCost = bookingRows.filter((row) => (state.bookingStates[row.key] ?? row.initialState) === "RESERVADO").reduce((sum, row) => sum + row.cost, 0);
  return <section className="content-section"><PageHeader eyebrow="De decidir a comprar" title="Lista de reservas" text="La lista se genera sola a partir de tus hoteles, tramos y atracciones. Cambiar una selección reemplaza el artículo correspondiente y devuelve su estado a la fase correcta." /><div className="booking-metrics"><Metric icon={BookOpenCheck} label="Reservado" value={`${bookedCount}/${bookingRows.length}`} note={money(bookedCost)} /><Metric icon={AlertTriangle} label="Esperando horario" value={String(waitingCount)} note="No comprar todavía" /><Metric icon={WalletCards} label="Total planificado" value={money(total)} note="Incluye estimaciones" /></div><div className="booking-filters">{(["TODOS", "RESERVADO", "LISTO", "ESPERANDO", "OPCIONAL"] as const).map((item) => <button type="button" key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item === "TODOS" ? "Todos" : bookingText[item]}</button>)}</div><div className="booking-table-wrap"><table className="booking-table"><thead><tr><th>Fecha / tipo</th><th>Selección</th><th>Costo para 5</th><th>Estado</th><th>Comprar</th></tr></thead><tbody>{rows.map((row) => { const current = state.bookingStates[row.key] ?? row.initialState; return <tr key={row.key}><td><strong>{row.date}</strong><span>{row.type}</span></td><td><strong>{row.name}</strong><small>{row.note}</small></td><td>{row.cost ? money(row.cost) : "Añadir importe"}</td><td><select className={`booking-select state-${current.toLowerCase()}`} value={current} onChange={(event) => setState((previous) => ({ ...previous, bookingStates: { ...previous.bookingStates, [row.key]: event.target.value as BookingState } }))}>{Object.entries(bookingText).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td><a className="buy-button" href={row.link} target="_blank" rel="noreferrer">Abrir <ExternalLink size={14} /></a></td></tr>; })}</tbody></table></div>{!rows.length && <div className="empty-state"><BookOpenCheck /><h3>No hay elementos con este estado</h3><p>Elige otro filtro.</p></div>}</section>;
}

function ShoppingPage({ state }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="Comprar sin cargar de más" title="Estrategia de compras" text="Shenzhen conserva la ventaja clara para electrónica; la ropa y regalos genéricos se dejan para el final. La estrategia evita réplicas, sorpresas de garantía y baterías mal empacadas." /><div className="shopping-weight"><ShoppingBag /><div><span>Peso adicional previsto</span><strong>{state.shoppingWeightKg} kg</strong><small>≈{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg por persona si se reparte entre 5</small></div><p>Empacar una bolsa plegable y dejar al menos este margen en la franquicia del vuelo HKG→PVG y del regreso a JFK.</p></div><div className="shopping-grid">{shoppingGuide.map((item) => <article key={item.category}><header><ShoppingBag /><div><small>Mejor lugar · {item.when}</small><h2>{item.category}</h2></div></header><div className="best-city"><MapPin />{item.bestCity}</div><p>{item.action}</p><div className="warning-line"><AlertTriangle />{item.warning}</div><SourceLink href={item.source} /></article>)}</div><div className="shopping-timeline"><h2>Orden recomendado</h2><div><span><b>3 dic</b><strong>Comparar</strong><small>Huaqiangbei: precios, modelos y vendedores.</small></span><ArrowRight /><span><b>4 dic</b><strong>Comprar tecnología</strong><small>DJI oficial y regreso selectivo a Huaqiangbei.</small></span><ArrowRight /><span><b>5 dic</b><strong>Solo Macao</strong><small>Comida envasada y recuerdos específicos.</small></span><ArrowRight /><span><b>7–9 dic</b><strong>Compras finales</strong><small>Moda, regalos y empaquetado definitivo.</small></span></div></div></section>;
}

function LuggagePage({ state, setState, baseCosts }: CommonProps) {
  return <section className="content-section"><PageHeader eyebrow="5 viajeros · 5 maletas" title="Equipaje y transporte local" text="No recomendamos vans por costumbre. La opción correcta depende de si hay maletas, tráfico, transbordos y cinco asientos reales. Las baterías y límites publicados aparecen por separado." /><div className="luggage-dashboard"><div><Luggage /><span>Maletas facturadas previstas</span><strong>5</strong><small>Una por viajero</small></div><div><ShoppingBag /><span>Compras previstas</span><strong>{state.shoppingWeightKg} kg</strong><small>{Math.ceil(state.shoppingWeightKg / TRAVELERS)} kg p/p</small></div><div><CircleDollarSign /><span>Reserva de tasas</span><strong>{money(state.baggageReserve)}</strong><small>No es una tasa confirmada</small></div><div><Bus /><span>Transporte local</span><strong>{money(baseCosts.localCost)}</strong><small>5 ciudades</small></div></div><section className="rules-section"><h2>Reglas que condicionan el plan</h2><div className="rules-grid">{luggageRules.map((rule) => <article key={rule.mode}><header><Luggage /><h3>{rule.mode}</h3></header><p>{rule.rule}</p><div><Check />{rule.action}</div><SourceLink href={rule.source} /></article>)}</div></section><section className="local-section"><div className="section-title-row"><div><span className="eyebrow">Comparación por ciudad</span><h2>Público, mixto o privado</h2></div><strong>{money(baseCosts.localCost)} para 5</strong></div>{cities.map((city) => <div className="local-city" key={city.id}><header><div><MapPin /><h3>{city.name}</h3></div><span>{city.dates}</span></header><div className="local-options">{localPlans.filter((plan) => plan.city === city.id).map((plan) => { const selected = state.localIds[city.id] === plan.id; return <article key={plan.id} className={selected ? "is-selected" : ""}><div><h4>{plan.name}</h4><EvidenceBadge status={plan.status} /></div><strong>{money(plan.groupPrice)}</strong><small>{plan.bestFor}</small><p>{plan.details}</p><div className="luggage-fit"><Luggage />{plan.luggage}</div><div className="card-actions"><SelectButton selected={selected} onClick={() => setState((current) => ({ ...current, localIds: { ...current.localIds, [city.id]: plan.id } }))} /><SourceLink href={plan.sourceUrl} /></div></article>; })}</div></div>)}</section></section>;
}
