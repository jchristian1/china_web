export type CityId = "shanghai" | "zhangjiajie" | "shenzhen" | "macau" | "hongkong";
export type EvidenceStatus = "VERIFICADO" | "ESTIMADO" | "NO_PUBLICADO" | "VARIABLE";
export type BookingState = "RESERVADO" | "LISTO" | "ESPERANDO" | "OPCIONAL";

export const TRAVELERS = 5;
export const TRIP_DAYS = 16;
export const TOTAL_NIGHTS = 15;
export const UPDATED_AT = "1 sep 2026";

export const cities: Array<{ id: CityId; name: string; dates: string; nights: number }> = [
  { id: "shanghai", name: "Shanghái", dates: "25–28 nov + 9–10 dic", nights: 4 },
  { id: "zhangjiajie", name: "Zhangjiajie", dates: "28 nov–2 dic", nights: 4 },
  { id: "shenzhen", name: "Shenzhen", dates: "2–5 dic", nights: 3 },
  { id: "macau", name: "Macao", dates: "5–6 dic", nights: 1 },
  { id: "hongkong", name: "Hong Kong", dates: "6–9 dic", nights: 3 },
];

export const DEFAULT_NIGHTS: Record<CityId, number> = Object.fromEntries(cities.map((city) => [city.id, city.nights])) as Record<CityId, number>;

export const cityName = (id: CityId) => cities.find((city) => city.id === id)?.name ?? id;

export interface HotelOption {
  id: string;
  city: CityId;
  name: string;
  tier: "Económico" | "Valor" | "Confort" | "Premium";
  image: string;
  photoSource: string;
  area: string;
  roomConfig: string;
  total: number;
  priceNote: string;
  status: EvidenceStatus;
  amenities: string[];
  pros: string[];
  cons: string[];
  bookingUrl: string;
  sourceUrl: string;
}

const baseHotels: HotelOption[] = [
  {
    id: "sh-dayin", city: "shanghai", name: "Dayin International Youth Hostel", tier: "Económico",
    image: "/hotels/sh-dayin.webp", photoSource: "https://us.trip.com/hotels/shanghai-hotel-detail-83645195/dayin-international-youth-hostel/",
    area: "Centro / acceso a metro", roomConfig: "1 habitación privada cuádruple + 1 doble; confirmar baño y aforo exactos antes de pagar.", total: 590,
    priceNote: "Presupuesto para las dos estancias (4 noches); tarifa exacta aún variable.", status: "ESTIMADO",
    amenities: ["Wi‑Fi", "Lavandería", "Espacios comunes"], pros: ["Ahorro fuerte", "Habitaciones privadas disponibles"], cons: ["Dos habitaciones", "Menos espacio para 5 maletas"],
    bookingUrl: "https://www.booking.com/hotel/cn/shang-hai-ku-bo-jiu-dian.html", sourceUrl: "https://us.trip.com/hotels/shanghai-hotel-detail-83645195/dayin-international-youth-hostel/",
  },
  {
    id: "sh-campanile", city: "shanghai", name: "Campanile Shanghai Bund", tier: "Valor",
    image: "/hotels/sh-campanile.webp", photoSource: "https://campanile-bund.shanghaicityhotels.com/en/",
    area: "Huangpu, entre Yu Garden y el Bund", roomConfig: "3 habitaciones Twin (6 camas individuales).", total: 1050,
    priceNote: "Estimación: 3 Twin × 4 noches con impuestos variables.", status: "ESTIMADO",
    amenities: ["Baño privado", "Restaurante", "Recepción 24 h"], pros: ["Ubicación útil", "Configuración simple"], cons: ["Habitaciones compactas", "Dos reservas separadas"],
    bookingUrl: "https://www.booking.com/hotel/cn/campanile-shanghai-bund.html", sourceUrl: "https://www.booking.com/hotel/cn/campanile-shanghai-bund.html",
  },
  {
    id: "sh-golden", city: "shanghai", name: "Golden Tulip Bund New Asia", tier: "Confort",
    image: "/hotels/sh-golden.webp", photoSource: "https://bund-new-asia.goldentulip.com/en-us/",
    area: "Tiantong Road / norte del Bund", roomConfig: "3 Standard Twin (6 camas); reservar 25–28 nov y 9–10 dic por separado.", total: 1200,
    priceNote: "$891 + $309, incluidos presupuestos de IVA; desayuno no asumido.", status: "ESTIMADO",
    amenities: ["Gimnasio", "Restaurante", "Metro cercano"], pros: ["Hotel del itinerario actual", "Mismo hotel al volver"], cons: ["Llegada muy tarde el día 25", "Avisar al hotel para no liberar habitaciones"],
    bookingUrl: "https://www.booking.com/hotel/cn/jinjiang-metropolo-classiq-shanghai-xinya-bund.html", sourceUrl: "https://bund-new-asia.goldentulip.com/en-us/",
  },
  {
    id: "sh-ssaw", city: "shanghai", name: "SSAW Boutique Hotel Shanghai Bund", tier: "Confort",
    image: "/hotels/sh-ssaw.webp", photoSource: "https://www.expobeds.com/hotels/ssaw-boutique-hotel-shanghai-chengman-huangpu-rive-1160397",
    area: "Huangpu / Yu Garden", roomConfig: "Family Quint si aparece para las fechas; plan B: Family Triple + Twin.", total: 1540,
    priceNote: "Presupuesto con la configuración alternativa de 2 habitaciones.", status: "ESTIMADO",
    amenities: ["Desayuno disponible", "Lavandería", "Terraza"], pros: ["Más espacio familiar", "Muy céntrico"], cons: ["Family Quint escasa", "Confirmar aforo de 5 adultos"],
    bookingUrl: "https://www.booking.com/hotel/cn/zhong-xing-jun-ting.html", sourceUrl: "https://us.trip.com/hotels/shanghai-hotel-detail-375479/ssaw-boutique-hotel-shanghai-bund/",
  },
  {
    id: "sh-edition", city: "shanghai", name: "The Shanghai EDITION", tier: "Premium",
    image: "/hotels/sh-edition.webp", photoSource: "https://www.editionhotels.com/shanghai/",
    area: "Nanjing Road East / Bund", roomConfig: "2 habitaciones Deluxe Double; validar ocupación total de 5 en la tarifa elegida.", total: 3240,
    priceNote: "Estimación basada en tarifas públicas observadas; impuestos y desayuno pueden cambiar.", status: "ESTIMADO",
    amenities: ["Piscina", "Spa", "Vistas al Bund", "Restaurantes"], pros: ["Ubicación excepcional", "Mejor experiencia de hotel"], cons: ["Costo muy alto", "No ahorra traslados suficientes para compensar"],
    bookingUrl: "https://www.booking.com/hotel/cn/the-shanghai-edition.html", sourceUrl: "https://www.editionhotels.com/shanghai/",
  },

  {
    id: "zjj-destination", city: "zhangjiajie", name: "Destination Youth Hostel", tier: "Económico",
    image: "/hotels/zjj-destination.webp", photoSource: "https://www.booking.com/hotel/cn/zhang-jia-jie-mu-de-di-ren-wen-ke-zhan.en-gb.html",
    area: "Wulingyuan, a unos 5 min a pie de la entrada este", roomConfig: "1 cuádruple privada + 1 Twin/Double privada.", total: 520,
    priceNote: "Estimación de 4 noches; elegir solo habitaciones privadas.", status: "ESTIMADO",
    amenities: ["Lavandería", "Cocina común", "Venta de entradas"], pros: ["A pie del parque", "Gran ahorro"], cons: ["Sin nivel de resort", "Reparto en dos habitaciones"],
    bookingUrl: "https://www.booking.com/hotel/cn/zhang-jia-jie-mu-de-di-ren-wen-ke-zhan.html", sourceUrl: "https://www.booking.com/hotel/cn/zhang-jia-jie-mu-de-di-ren-wen-ke-zhan.en-gb.html",
  },
  {
    id: "zjj-hampton", city: "zhangjiajie", name: "Hampton by Hilton Zhangjiajie National Forest Park", tier: "Valor",
    image: "/hotels/zjj-hampton.webp", photoSource: "https://www.hilton.com/en/hotels/dygzjhx-hampton-zhangjiajie-national-forest-park/",
    area: "Wulingyuan / acceso al parque", roomConfig: "3 Twin; confirmar que la tarifa muestre 2 camas por habitación.", total: 1030,
    priceNote: "Estimación de 4 noches; desayuno caliente aparece como incluido en la ficha oficial.", status: "ESTIMADO",
    amenities: ["Desayuno", "Gimnasio", "Wi‑Fi"], pros: ["Producto nuevo", "Buen punto de partida"], cons: ["Precio exacto aún variable", "Tres habitaciones"],
    bookingUrl: "https://www.hilton.com/en/hotels/dygzjhx-hampton-zhangjiajie-national-forest-park/", sourceUrl: "https://www.hilton.com/en/hotels/dygzjhx-hampton-zhangjiajie-national-forest-park/",
  },
  {
    id: "zjj-hilton", city: "zhangjiajie", name: "Hilton Garden Inn Zhangjiajie Wulingyuan", tier: "Confort",
    image: "/hotels/zjj-hilton.webp", photoSource: "https://www.klook.com/zh-TW/hotels/detail/2007144-hilton-garden-inn-zhangjiajie-wulingyuan/",
    area: "Baofeng Road, Wulingyuan", roomConfig: "3 Twin (6 camas individuales).", total: 986,
    priceNote: "$930 mostrado + reserva de 6% de impuestos; desayuno no asumido.", status: "ESTIMADO",
    amenities: ["Restaurante", "Gimnasio", "Piscina estacional"], pros: ["Hotel del itinerario actual", "Confort después del parque"], cons: ["No está literalmente en la puerta", "Traslados al aeropuerto largos"],
    bookingUrl: "https://www.booking.com/hotel/cn/hilton-garden-inn-zhangjiajie-wulingyuan.html", sourceUrl: "https://www.hilton.com/en/hotels/dyggigi-hilton-garden-inn-zhangjiajie-wulingyuan/",
  },
  {
    id: "zjj-pullman", city: "zhangjiajie", name: "Pullman Zhangjiajie", tier: "Confort",
    image: "/hotels/zjj-pullman.webp", photoSource: "https://www.expedia.com/Zhangjiajie-Hotels-Pullman-Zhangjiajie.h3633242.Hotel-Information",
    area: "Wulingyuan, cerca de la entrada este", roomConfig: "3 Superior Twin.", total: 1280,
    priceNote: "Presupuesto de 4 noches; precio final depende del plan de desayuno/cancelación.", status: "ESTIMADO",
    amenities: ["Piscina estacional", "Gimnasio", "3 restaurantes"], pros: ["Muy cerca del parque", "Más servicios"], cons: ["Más caro", "Piscina puede no operar en invierno"],
    bookingUrl: "https://www.booking.com/hotel/cn/pullman-zhangjiajie.html", sourceUrl: "https://all.accor.com/hotel/7934/index.en.shtml",
  },
  {
    id: "zjj-neodalle", city: "zhangjiajie", name: "Howard Johnson Neodalle Resort Zhangjiajie", tier: "Premium",
    image: "/hotels/zjj-neodalle.webp", photoSource: "https://www.wyndhamhotels.com/hojo/zhangjiajie-china/howard-johnson-zhangjiajie-neodalle-resort/overview",
    area: "Wulingyuan Scenic Area", roomConfig: "3 habitaciones con 2 camas; confirmar denominación exacta al reservar.", total: 1550,
    priceNote: "Estimación prudente de 4 noches por variación fuerte entre plataformas.", status: "ESTIMADO",
    amenities: ["Spa", "Piscinas", "Desayuno", "3 restaurantes"], pros: ["Resort completo", "Buen descanso"], cons: ["La tarifa observada varía mucho", "No reduce el tiempo en carretera"],
    bookingUrl: "https://www.wyndhamhotels.com/hojo/zhangjiajie-china/howard-johnson-zhangjiajie-neodalle-resort/overview", sourceUrl: "https://www.wyndhamhotels.com/hojo/zhangjiajie-china/howard-johnson-zhangjiajie-neodalle-resort/overview",
  },

  {
    id: "sz-maker", city: "shenzhen", name: "Maker Hotel Huaqiangbei", tier: "Económico",
    image: "/hotels/sz-maker.webp", photoSource: "https://www.klook.com/en-US/hotels/detail/1925417-maker-hotel/",
    area: "Huaqiang South / mercados de electrónica", roomConfig: "3 Twin; verificar ventana y superficie en cada tarifa.", total: 440,
    priceNote: "Estimación de 3 noches a partir de tarifas públicas desde ~US$34 por habitación.", status: "ESTIMADO",
    amenities: ["Wi‑Fi", "Recepción 24 h", "Metro cercano"], pros: ["Barato y práctico", "Cerca de Huaqiangbei"], cons: ["Producto básico", "Menos espacio para compras"],
    bookingUrl: "https://us.trip.com/hotels/shenzhen-hotel-detail-6398678/quchuang-hotel/", sourceUrl: "https://us.trip.com/hotels/shenzhen-hotel-detail-6398678/quchuang-hotel/",
  },
  {
    id: "sz-difu", city: "shenzhen", name: "Shenzhen Futian Difu Hotel", tier: "Valor",
    image: "/hotels/sz-difu.webp", photoSource: "https://difuhotelshenzhen.cn/",
    area: "Futian / Huaqiangbei", roomConfig: "3 habitaciones con 2 camas dobles o Twin, según inventario.", total: 525,
    priceNote: "Estimación de 3 noches; confirmar el tipo de cama antes de pagar.", status: "ESTIMADO",
    amenities: ["Metro cercano", "Consigna", "Recepción 24 h"], pros: ["Más espacio que un hotel cápsula", "Zona de compras"], cons: ["Información oficial limitada", "Revisar política de cancelación"],
    bookingUrl: "https://us.trip.com/hotels/shenzhen-hotel-detail-6742479/shenzhen-futian-difu-hotel/", sourceUrl: "https://us.trip.com/hotels/shenzhen-hotel-detail-6742479/shenzhen-futian-difu-hotel/",
  },
  {
    id: "sz-huaqiang", city: "shenzhen", name: "Huaqiang Plaza Hotel Shenzhen", tier: "Confort",
    image: "/hotels/sz-huaqiang.webp", photoSource: "https://www.agoda.com/huaqiang-plaza-hotel/hotel/shenzhen-cn.html",
    area: "Sobre Huaqiang North", roomConfig: "3 Superior Twin (6 camas).", total: 908,
    priceNote: "$857 de tarifa mostrada + reserva de 6% de impuestos; desayuno no asumido.", status: "ESTIMADO",
    amenities: ["Gimnasio", "Restaurante", "Metro", "Consigna"], pros: ["Hotel del itinerario actual", "Se pueden dejar compras entre rondas"], cons: ["Zona muy intensa", "Tres habitaciones"],
    bookingUrl: "https://www.booking.com/hotel/cn/hua-qiang-plaza.html", sourceUrl: "https://www.booking.com/hotel/cn/hua-qiang-plaza.html",
  },
  {
    id: "sz-atour", city: "shenzhen", name: "Atour Hotel Shenzhen Futian Huaqiangbei", tier: "Confort",
    image: "/hotels/sz-atour.webp", photoSource: "https://www.booking.com/hotel/cn/atour-shenzhen-huaqiangbei-commercial-center.html",
    area: "Huaqiangbei Commercial Center", roomConfig: "3 Jimu Twin con 2 camas dobles.", total: 820,
    priceNote: "Estimación de 3 noches; las tarifas de Atour varían por canal.", status: "ESTIMADO",
    amenities: ["Lavandería", "Gimnasio", "Biblioteca", "Metro"], pros: ["Buen producto local", "Útil para ropa y electrónica"], cons: ["Reserva oficial menos sencilla en inglés", "Confirmar desayuno"],
    bookingUrl: "https://www.booking.com/hotel/cn/atour-shenzhen-huaqiangbei-commercial-center.html", sourceUrl: "https://www.booking.com/hotel/cn/atour-shenzhen-huaqiangbei-commercial-center.html",
  },
  {
    id: "sz-langham", city: "shenzhen", name: "The Langham, Shenzhen", tier: "Premium",
    image: "/hotels/sz-langham.webp", photoSource: "https://langham.hotels-in-shenzhen.com/en/",
    area: "Futian / Chegongmiao", roomConfig: "2 Deluxe Twin/Double; confirmar máximo de 3 huéspedes en una habitación.", total: 1560,
    priceNote: "Estimación de 3 noches, 2 habitaciones, sin asumir desayuno.", status: "ESTIMADO",
    amenities: ["Piscinas", "Spa", "Gimnasio", "Centro comercial conectado"], pros: ["Lujo real", "Excelente descanso"], cons: ["Más lejos de Huaqiangbei", "Costo alto"],
    bookingUrl: "https://www.booking.com/hotel/cn/shenzhen-langham.html", sourceUrl: "https://www.langhamhotels.com/en/the-langham/shenzhen/",
  },

  {
    id: "mo-city", city: "macau", name: "City Inn Macau", tier: "Económico",
    image: "/hotels/mo-city.webp", photoSource: "https://www.hoteles.com/en/ho2983173600/city-inn-macau-macau-macau-sar/",
    area: "Península / cerca del centro histórico", roomConfig: "2 habitaciones (Triple + Twin), sujeto a inventario.", total: 240,
    priceNote: "Estimación de 1 noche; confirmar la combinación para 5 adultos.", status: "ESTIMADO",
    amenities: ["Wi‑Fi", "Recepción", "Ubicación histórica"], pros: ["Ahorro para una noche", "Se llega caminando a parte del centro"], cons: ["Sin resort", "Traslado adicional al ferry"],
    bookingUrl: "https://www.hotels.com/ho2983173600/city-inn-macau-macau-macau-sar/", sourceUrl: "https://www.hotels.com/ho2983173600/city-inn-macau-macau-macau-sar/",
  },
  {
    id: "mo-casa", city: "macau", name: "Casa Real Hotel Macau", tier: "Valor",
    image: "/hotels/mo-casa.webp", photoSource: "https://www.agoda.com/ja-jp/casa-real-hotel/hotel/macau-mo.html",
    area: "Península / Outer Harbour", roomConfig: "3 Elite Twin (6 camas).", total: 388,
    priceNote: "$369 mostrado + reserva de 5% de impuesto; desayuno no asumido.", status: "ESTIMADO",
    amenities: ["Piscina interior", "Gimnasio", "2 restaurantes"], pros: ["Hotel del itinerario actual", "Muy práctico para ferry de Outer Harbour"], cons: ["No está en Cotai", "Tres habitaciones para una noche"],
    bookingUrl: "https://www.booking.com/hotel/mo/casa-real-macau.html", sourceUrl: "https://www.booking.com/hotel/mo/casa-real-macau.html",
  },
  {
    id: "mo-harbour", city: "macau", name: "Harbourview Hotel Macau", tier: "Confort",
    image: "/hotels/mo-harbour.webp", photoSource: "https://harbourview.best-hotels-in-macau.com/en/",
    area: "Macau Fisherman's Wharf / Outer Harbour", roomConfig: "3 Deluxe Twin o una suite familiar + Twin; comparar ambas.", total: 425,
    priceNote: "Estimación de 1 noche; impuestos y desayuno variables.", status: "ESTIMADO",
    amenities: ["Piscina interior", "Gimnasio", "Restaurante"], pros: ["Sin casino dentro", "Cerca del ferry"], cons: ["Lejos de Cotai", "Configuración familiar depende del inventario"],
    bookingUrl: "https://www.booking.com/hotel/mo/harbourview-macau.html", sourceUrl: "https://www.booking.com/hotel/mo/harbourview-macau.html",
  },
  {
    id: "mo-lisboa", city: "macau", name: "Hotel Lisboa", tier: "Confort",
    image: "/hotels/mo-lisboa.webp", photoSource: "https://hotels.his-j.com/HotelDetail/MFM00006.aspx",
    area: "Avenida de Lisboa / centro", roomConfig: "3 Twin; pedir habitaciones en ala operativa y sin ruido de obra.", total: 510,
    priceNote: "Estimación de 1 noche; hay remodelación parcial de largo plazo reportada.", status: "ESTIMADO",
    amenities: ["Piscina", "Restaurantes", "Ubicación central"], pros: ["Icono de Macao", "Buena base para casco histórico"], cons: ["Casino y ambiente adulto", "Confirmar impacto de remodelación"],
    bookingUrl: "https://www.booking.com/hotel/mo/po-hotel-lisboa-macau-centre.html", sourceUrl: "https://www.booking.com/hotel/mo/po-hotel-lisboa-macau-centre.html",
  },
  {
    id: "mo-parisian", city: "macau", name: "The Parisian Macao", tier: "Premium",
    image: "/hotels/mo-parisian.webp", photoSource: "https://www.il.kayak.com/Macau-Hotels-The-Parisian-Macao.2639679.ksp",
    area: "Cotai Strip", roomConfig: "2 Deluxe Double (2 camas dobles por habitación) o Famille + Double.", total: 620,
    priceNote: "Estimación de 1 noche; verificar ocupación y depósito al reservar.", status: "ESTIMADO",
    amenities: ["Piscina", "Compras", "Restaurantes", "Shuttle"], pros: ["El upgrade de Macao más visible", "Al lado de teamLab y espectáculos de Cotai"], cons: ["Peor para ferry de Outer Harbour", "Más tiempo hacia el centro histórico"],
    bookingUrl: "https://www.parisianmacao.com/parisian-hotel.html", sourceUrl: "https://www.parisianmacao.com/",
  },

  {
    id: "hk-meiho", city: "hongkong", name: "YHA Mei Ho House Youth Hostel", tier: "Económico",
    image: "/hotels/hk-meiho.webp", photoSource: "https://yhameihohouseyouthhostel.hotelsofhongkong.com/en/",
    area: "Sham Shui Po", roomConfig: "1 Family (queen + 2 individuales, 4 plazas) + 1 Single/Double privada.", total: 850,
    priceNote: "Estimación de 3 noches; puede exigir membresía YHA o tarifa asociada.", status: "ESTIMADO",
    amenities: ["Lavandería", "Cocina común", "Museo", "Baño privado en habitaciones familiares"], pros: ["Ahorro grande", "Barrio excelente para comida y electrónica"], cons: ["Dos habitaciones", "Más traslados a Central/Tsim Sha Tsui"],
    bookingUrl: "https://www.yha.org.hk/en/hostel/yha-mei-ho-house-youth-hostel/", sourceUrl: "https://www.yha.org.hk/en/hostel/yha-mei-ho-house-youth-hostel/",
  },
  {
    id: "hk-eaton", city: "hongkong", name: "Eaton HK", tier: "Valor",
    image: "/hotels/hk-eaton.webp", photoSource: "https://www.klook.com/hotels/detail/249740-eaton-hk/",
    area: "Jordan / Nathan Road", roomConfig: "Family Room + Twin/Double para la quinta persona.", total: 1200,
    priceNote: "Estimación de 3 noches; confirmar ocupación adulta de la habitación familiar.", status: "ESTIMADO",
    amenities: ["Piscina", "Gimnasio", "Food Hall", "Metro cercano"], pros: ["Muy buena zona para moverse", "Comida y mercados cerca"], cons: ["Habitaciones compactas", "Configuración de 2 habitaciones"],
    bookingUrl: "https://www.eatonworkshop.com/en-us/hong-kong/", sourceUrl: "https://www.eatonworkshop.com/en-us/hong-kong/",
  },
  {
    id: "hk-dorsett", city: "hongkong", name: "Dorsett Mongkok, Hong Kong", tier: "Confort",
    image: "/hotels/hk-dorsett.webp", photoSource: "https://www.expedia.com/Kowloon-Hotels-Dorsett-Mongkok.h2434366.Hotel-Information",
    area: "Tai Kok Tsui / Mong Kok", roomConfig: "3 Comfort Twin; solicitar 2 camas por habitación.", total: 1311,
    priceNote: "$1,273 mostrado + reserva de 3% de impuesto; desayuno no asumido.", status: "ESTIMADO",
    amenities: ["Gimnasio", "Shuttle local", "Wi‑Fi"], pros: ["Hotel del itinerario actual", "Valor sólido en Kowloon"], cons: ["Habitaciones pequeñas", "No está junto al Airport Express"],
    bookingUrl: "https://www.booking.com/hotel/hk/dorsett-mongkok-hong-kong.html", sourceUrl: "https://www.mongkok.dorsetthotels.com/",
  },
  {
    id: "hk-salisbury", city: "hongkong", name: "The Salisbury – YMCA of Hong Kong", tier: "Confort",
    image: "/hotels/hk-salisbury.webp", photoSource: "https://ymca-of-hong-kong-hotel.hotel-ds.com/en/",
    area: "Tsim Sha Tsui / paseo marítimo", roomConfig: "Family Suite (máx. 4 según ficha) + Single; no meter 5 en una sola suite.", total: 1750,
    priceNote: "Estimación de 3 noches; reservar directo o comparar tarifa en Booking.", status: "ESTIMADO",
    amenities: ["Piscina interior", "Gimnasio", "Vistas opcionales"], pros: ["Ubicación extraordinaria", "A pie de M+ ferry y Space Museum"], cons: ["Suite + habitación individual", "Sube bastante el presupuesto"],
    bookingUrl: "https://book-directonline.com/properties/thesalisburyymcadirect", sourceUrl: "https://ymcahk.org.hk/thesalisbury/en/accommodation/family_suite/index.html",
  },
  {
    id: "hk-icon", city: "hongkong", name: "Hotel ICON", tier: "Premium",
    image: "/hotels/hk-icon.webp", photoSource: "https://www.klook.com/zh-TW/hotels/detail/403711-hotel-icon/",
    area: "Tsim Sha Tsui East", roomConfig: "2 habitaciones con dos camas/king; confirmar ocupación de 3 en una.", total: 2400,
    priceNote: "Estimación de 3 noches, 2 habitaciones, sin desayuno.", status: "ESTIMADO",
    amenities: ["Piscina con vistas", "Spa", "Minibar", "Shuttle"], pros: ["Excelente experiencia familiar", "Cerca del waterfront"], cons: ["Costo alto", "No está sobre una estación MTR principal"],
    bookingUrl: "https://www.hotel-icon.com/offers/stay", sourceUrl: "https://www.hotel-icon.com/",
  },
];

type ExtraHotelSeed = {
  id: string;
  city: CityId;
  name: string;
  tier: HotelOption["tier"];
  image: string;
  area: string;
  snapshotUsd: number;
  source: string;
  goodFor: string;
  caution: string;
  rooms?: 2 | 3;
};

const extraHotelSeeds: ExtraHotelSeed[] = [
  // Shanghai: public snapshots observed on 1 Sep 2026. The four-night total
  // still represents two separate stays and must be searched separately.
  { id: "sh-chalet", city: "shanghai", name: "Hotel Chalet Shanghai", tier: "Valor", image: "https://ak-d.tripcdn.com/images/0205u120008jdki160C1F.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Hankou Road / People's Square", snapshotUsd: 71, source: "https://us.trip.com/hotels/shanghai-hotel-detail-72926277/hotel-chalet-shanghai/", goodFor: "Centro y Nanjing Road", caution: "Confirmar tamaño real de las tres habitaciones" },
  { id: "sh-yitel", city: "shanghai", name: "Yitel Premium · People's Square", tier: "Valor", image: "https://ak-d.tripcdn.com/images/02053120008whtqp29D16.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Zhejiang Middle Road / Nanjing Road", snapshotUsd: 72, source: "https://us.trip.com/hotels/shanghai-hotel-detail-16197084/yitel-premium/", goodFor: "Moverse a pie y en metro", caution: "Recepción en planta alta; revisar acceso con equipaje" },
  { id: "sh-treasury", city: "shanghai", name: "Treasury Hotel Nanjing East Road", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc2q12000f1p82wxAFF3.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Hankou Road / People's Square", snapshotUsd: 77, source: "https://us.trip.com/hotels/shanghai-hotel-detail-122358729/shanghai-people-s-square-nanjing-east-road-pedestrian-street-treasury-hotel/", goodFor: "Centro compacto", caution: "Inventario familiar sin confirmar" },
  { id: "sh-crowne-nanjing", city: "shanghai", name: "Crowne Plaza Shanghai Nanjing Road", tier: "Confort", image: "https://ak-d.tripcdn.com/images/0200o120008yfc49wAE8B.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Nanjing East Road / Huangpu", snapshotUsd: 91, source: "https://us.trip.com/hotels/shanghai-hotel-detail-375528/crowne-plaza-shanghai-nanjing-road-by-ihg/", goodFor: "Ubicación muy céntrica", caution: "Tres habitaciones elevan el total" },
  { id: "sh-mercure-yu", city: "shanghai", name: "Mercure Shanghai Yu Garden On the Bund", tier: "Confort", image: "https://ak-d.tripcdn.com/images/200s1e000001f2q4e86C8.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Fuxing East Road / Yu Garden", snapshotUsd: 81, source: "https://us.trip.com/hotels/shanghai-hotel-detail-429722/mercure-hotel-shanghai-yu-garden/", goodFor: "Yu Garden y casco histórico", caution: "Menos directo para Lingang" },
  { id: "sh-radisson-new-world", city: "shanghai", name: "Radisson Blu Hotel Shanghai New World", tier: "Confort", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/341074449.jpg?k=b20ff0d90fc89c336079c4ec188a5b3aed4cf3ac6a768ec347d44569edc5535e&o=", area: "People's Square / Nanjing West Road", snapshotUsd: 137.3, source: "https://www.booking.com/hotel/cn/radisson-new-world-shanghai.html", goodFor: "Metro y piscina interior", caution: "Muestra para 2 adultos, no para el grupo" },
  { id: "sh-marriott-marquis", city: "shanghai", name: "Shanghai Marriott Marquis City Centre", tier: "Premium", image: "https://marriott-city-centre.shanghaicityhotels.com/data/Photos/OriginalPhoto/16725/1672578/1672578998.JPEG", area: "People's Square / Nanjing Road", snapshotUsd: 173, source: "https://www.booking.com/searchresults.html?ss=Shanghai+Marriott+Marquis+City+Centre", goodFor: "Servicios completos y base central", caution: "Precio alto con tres habitaciones" },
  { id: "sh-radisson-hyland", city: "shanghai", name: "Radisson Collection Hyland Shanghai", tier: "Confort", image: "https://aw-d.tripcdn.com/images/0204u120008ycpmg69D2B.jpg", area: "Nanjing East Road", snapshotUsd: 112, source: "https://us.trip.com/hotels/shanghai-hotel-detail-375477/radisson-collection-hyland-shanghai/", goodFor: "Compras y Bund", caution: "Zona peatonal complica recogidas puerta a puerta" },
  { id: "sh-pullman-jingan", city: "shanghai", name: "Pullman Shanghai Jing'an", tier: "Confort", image: "https://pullman-shanghai-jingan-hotel.at-hotels.com/data/Pics/OriginalPhoto/12774/1277438/1277438665/pic-pullman-jingan-hotel-shanghai-21.JPEG", area: "Jing'an / Shanghai Railway Station", snapshotUsd: 118, source: "https://www.booking.com/searchresults.html?ss=Pullman+Shanghai+Jingan", goodFor: "Metro y Natural History Museum", caution: "Más lejos del Bund que Huangpu" },
  { id: "sh-holiday-nanjing", city: "shanghai", name: "Holiday Inn Shanghai Nanjing Road", tier: "Confort", image: "https://howard-johnson-plaza.shanghaicityhotels.com/data/Pics/OriginalPhoto/12854/1285405/1285405057/holiday-inn-shanghai-nanjing-road-by-ihg-shanghai-pic-12.JPEG", area: "Jiujiang Road / Nanjing East", snapshotUsd: 110, source: "https://www.booking.com/searchresults.html?ss=Holiday+Inn+Shanghai+Nanjing+Road", goodFor: "Centro y marca internacional", caution: "Confirmar si desayuno está incluido" },

  // Zhangjiajie: the cheaper snapshots are real single-room public rates, not
  // a promise that three suitable rooms will remain available in late 2026.
  { id: "zjj-hampton-tianmen", city: "zhangjiajie", name: "Hampton by Hilton Zhangjiajie Tianmen Mountain", tier: "Valor", image: "https://ak-d.tripcdn.com/images/020641200078gu8hw19FD.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Yongding / Tianmen Mountain", snapshotUsd: 54, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-63335949/tianmenshan-hilton-huanpeng-hotel/", goodFor: "Tianmen y estación de bus", caution: "Traslado largo al parque de Wulingyuan" },
  { id: "zjj-jinyuanshan", city: "zhangjiajie", name: "Jinyuanshan Meisu Hotel", tier: "Económico", image: "https://ak-d.tripcdn.com/images/0202t1200097t0yaqCBD2.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Yongding / Tianmen cableway", snapshotUsd: 22, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-5911443/muyi-inn-zhangjiajie-tianmen-mountain/", goodFor: "Ahorro cerca de Tianmen", caution: "No está en Wulingyuan" },
  { id: "zjj-wyndham-tianmen", city: "zhangjiajie", name: "Wyndham Garden Zhangjiajie Tianmen Mountain", tier: "Confort", image: "https://ak-d.tripcdn.com/images/1mc6s12000gpkq1ehB7C8.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Yongding / Central Bus Station", snapshotUsd: 68, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-123308210/wyndham-garden-zhangjiajie-tianmen-mountain/", goodFor: "Llegadas y Tianmen", caution: "Base menos eficiente para varios días de parque" },
  { id: "zjj-shile", city: "zhangjiajie", name: "Shile Minsu · Tianmen Cableway", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc5o12000row0q2p705E.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Guanliping / Yongding", snapshotUsd: 13, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-121998595/shile-minsu/", goodFor: "Presupuesto mínimo", caution: "Tarifa muy baja: revisar baño, cancelación y aforo" },
  { id: "zjj-atour-tianmen", city: "zhangjiajie", name: "Atour Hotel Tianmen Cableway Station", tier: "Valor", image: "https://ak-d.tripcdn.com/images/0202v120009a3dxh3CB71.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Guanliping / Yongding", snapshotUsd: 46, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-85569672/atour-hotel/", goodFor: "Producto local moderno", caution: "No está junto a la entrada este del parque" },
  { id: "zjj-thousand", city: "zhangjiajie", name: "Thousand Hotel Zhangjiajie", tier: "Valor", image: "https://ak-d.tripcdn.com/images/0203j120008hm3dssE330.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Yongding / Guanliping", snapshotUsd: 41, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-72113918/thousand-hotel/", goodFor: "Tianmen y transporte", caution: "Tres traslados largos si se prioriza Wulingyuan" },
  { id: "zjj-yunmei", city: "zhangjiajie", name: "Yunmei Bieyuan Hotel", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc3n12000r6vuref716D.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Nanzhuangping / Yongding", snapshotUsd: 34, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-43132880/yunmei-bieyuan-hotel/", goodFor: "Ahorro en ciudad", caution: "Ubicación menos directa para ambas montañas" },
  { id: "zjj-lifeng", city: "zhangjiajie", name: "Lifeng Hotel · National Forest Park", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc2j12000t3p2j0m6745.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Wulingyuan / Yellow Dragon Cave", snapshotUsd: 22, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-134936426/lifeng-hotel/", goodFor: "Cueva y Wulingyuan", caution: "No está en la puerta este; confirmar traslado" },
  { id: "zjj-manju", city: "zhangjiajie", name: "Zhangjiajie Manju Inn", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc0r12000r6e483rE78D.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Shadi / Yongding", snapshotUsd: 11, source: "https://us.trip.com/hotels/zhangjiajie-hotel-detail-122379918/zhangjiajie-manju-inn/", goodFor: "Costo mínimo", caution: "No reservar sin verificar reseñas recientes y camas" },
  { id: "zjj-no5", city: "zhangjiajie", name: "No.5 Valley Lodge", tier: "Premium", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261522494.jpg?k=867255ae5b4ed0a5f97448209ee80a13cd3e292f62c7015d75c6e390cfb7e733&o=", area: "Valle cerca del parque nacional", snapshotUsd: 175, source: "https://www.booking.com/hotel/cn/wu-hao-shan-gu-shan-xiang-ke-zhan.html", goodFor: "Retiro de naturaleza", caution: "Aislado: confirmar shuttle y tiempos reales" },

  { id: "sz-ranz-dongmen", city: "shenzhen", name: "RANZ Lanzi Hotel Dongmen", tier: "Económico", image: "https://ak-d.tripcdn.com/images/0204g120008iip5wgD541.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Dongmen / Luohu", snapshotUsd: 37, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-1596525/oyo/", goodFor: "Ropa económica y metro", caution: "Lejos del museo de Guangming" },
  { id: "sz-tourism-trend", city: "shenzhen", name: "Tourism Trend Hotel Huaqiangbei", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc3r12000s3ymyt59C42.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Huaqiangbei / Yannan", snapshotUsd: 21, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-452674/tourism-trend-hotel/", goodFor: "Componentes y SEG", caution: "Producto básico; revisar ruido y superficie" },
  { id: "sz-hampton-hqb", city: "shenzhen", name: "Hampton by Hilton Shenzhen Futian Huaqiangbei", tier: "Confort", image: "https://ak-d.tripcdn.com/images/1mc2h12000cndco9w55DA.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Huaqiangbei / Futian", snapshotUsd: 94, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-114658239/hampton-by-hilton-shenzhen-futian-huaqiangbei/", goodFor: "Compras tecnológicas con más confort", caution: "Tres habitaciones pueden superar opciones Atour" },
  { id: "sz-weizhan", city: "shenzhen", name: "Weizhan Bay Hotel", tier: "Económico", image: "https://ak-d.tripcdn.com/images/0201r12000anc3jet56A0.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Bao'an / Convention Center", snapshotUsd: 23, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-105001585/weizhan-bay-hotel/", goodFor: "Precio bajo en Bao'an", caution: "Demasiado lejos de Huaqiangbei para el plan base" },
  { id: "sz-yuanyi-airport", city: "shenzhen", name: "Yuanyi Hotel Bao'an Airport T3", tier: "Económico", image: "https://ak-d.tripcdn.com/images/1mc1r12000qmuaz1x2A4D.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Bao'an / aeropuerto", snapshotUsd: 19, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-120245074/yuan-yi-jiu-dian/", goodFor: "Vuelo temprano o tardío", caution: "No sirve como base turística central" },
  { id: "sz-langhua-residence", city: "shenzhen", name: "Langhua Skyline City·View Residence", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc3f12000cjhoqfi0445.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Gangxia / Futian", snapshotUsd: 42, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-115996086/langhua-audio-video-high-altitude-skyline-cityscape-cityview-residence/", goodFor: "Futian y vistas", caution: "Residencia: comprobar recepción y consigna" },
  { id: "sz-bailai", city: "shenzhen", name: "Bai Lai Ya Ju · Gangxia", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc5c12000fqrkzt2C9FB.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Gangxia / Convention Center", snapshotUsd: 38, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-117752561/bai-lai-ya-ju/", goodFor: "Centro de Futian", caution: "Apart-hotel; confirmar limpieza diaria" },
  { id: "sz-aoki-mixc", city: "shenzhen", name: "Aoki City·View Residence MixC", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc1e12000m78qjhd13DB.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Luohu / MixC", snapshotUsd: 33, source: "https://us.trip.com/hotels/shenzhen-hotel-detail-423089/aoki-audiovisual-aestheticdesigner-light-luxury-residence/", goodFor: "Luohu y compras", caution: "Confirmar licencia, recepción y depósito" },
  { id: "sz-hilton-futian", city: "shenzhen", name: "Hilton Shenzhen Futian", tier: "Premium", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/857106787.jpg?k=30d7fdcb7018854fdac9df804d15ec386554eff04633f3b34707250ccb366758&o=", area: "Futian CBD", snapshotUsd: 120, source: "https://www.booking.com/searchresults.html?ss=Hilton+Shenzhen+Futian", goodFor: "Confort y centro de Futian", caution: "Precio muestra, no cotización familiar" },
  { id: "sz-hyatt-dongmen", city: "shenzhen", name: "Hyatt Place Shenzhen Dongmen", tier: "Confort", image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2014/09/21/1540/SZXZS-P017-Exterior.jpg/SZXZS-P017-Exterior.16x9.jpg", area: "Dongmen / Laojie metro", snapshotUsd: 89.27, source: "https://www.booking.com/searchresults.html?ss=Hyatt+Place+Shenzhen+Dongmen", goodFor: "Ropa, comida y metro", caution: "Más lejos de Huaqiangbei que Futian" },

  { id: "mo-grand-lisboa-palace", city: "macau", name: "Grand Lisboa Palace Macau", tier: "Premium", image: "https://ak-d.tripcdn.com/images/1mc3o12000ejeli426E02.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Cotai", snapshotUsd: 174, source: "https://us.trip.com/hotels/macau-hotel-detail-72223499/grand-lisboa-palace-macau/", goodFor: "Resort y Cotai", caution: "Peor para el centro histórico y Outer Harbour" },
  { id: "mo-yoho-roosevelt", city: "macau", name: "YOHO Hollywood Roosevelt Hotel", tier: "Valor", image: "https://ak-d.tripcdn.com/images/200f180000013ldn51AF5.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Taipa", snapshotUsd: 49, source: "https://us.trip.com/hotels/macau-hotel-detail-8074538/yoho-hollywood-roosevelt-hotel/", goodFor: "Precio contenido en Taipa", caution: "Requiere taxi/shuttle para gran parte del plan" },
  { id: "mo-londoner-grand", city: "macau", name: "Londoner Grand Macao", tier: "Premium", image: "https://ak-d.tripcdn.com/images/1mc1k12000hs99kb084CB.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Cotai / The Londoner", snapshotUsd: 134, source: "https://us.trip.com/hotels/macau-hotel-detail-125363396/londoner-grand-a-luxury-collection-hotel-macao/", goodFor: "Shows y resorts de Cotai", caution: "Traslado al centro histórico" },
  { id: "mo-holiday-express", city: "macau", name: "Holiday Inn Express Macau City Centre", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc3s12000eg120h3701A.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Península / centro", snapshotUsd: 48, source: "https://us.trip.com/hotels/macau-hotel-detail-53806543/holiday-inn-express-macau-city-centre-by-ihg/", goodFor: "Valor y desayuno si aparece incluido", caution: "Tres habitaciones para una sola noche" },
  { id: "mo-golden-dragon", city: "macau", name: "Hotel Golden Dragon", tier: "Valor", image: "https://ak-d.tripcdn.com/images/0586r12000csp12jj3848.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Península / Outer Harbour", snapshotUsd: 44, source: "https://us.trip.com/hotels/macau-hotel-detail-345757/hotel-golden-dragon/", goodFor: "Ferry y Grand Prix Museum", caution: "Ambiente de casino; revisar habitaciones no fumador" },
  { id: "mo-studio-city", city: "macau", name: "Studio City Hotel", tier: "Confort", image: "https://ak-d.tripcdn.com/images/1mc6s12000c9s9hjbA727.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Cotai", snapshotUsd: 98, source: "https://us.trip.com/hotels/macau-hotel-detail-2572033/studio-city-hotel/", goodFor: "Entretenimiento familiar", caution: "No es práctico para Outer Harbour" },
  { id: "mo-venetian", city: "macau", name: "The Venetian Macao", tier: "Premium", image: "https://ak-d.tripcdn.com/images/1mc6e12000cnug1pnC787.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Cotai / teamLab", snapshotUsd: 161, source: "https://us.trip.com/hotels/macau-hotel-detail-344977/the-venetian-macao-resort-hotel/", goodFor: "teamLab y habitaciones amplias", caution: "Complejo enorme y muy concurrido" },
  { id: "mo-broadway", city: "macau", name: "Broadway Hotel", tier: "Confort", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/772668805.jpg?k=8a12219ec848d101665c177cd04161051d81a6af1119f129224672bbb967138f&o=", area: "Cotai / Broadway Food Street", snapshotUsd: 108.71, source: "https://www.booking.com/searchresults.html?ss=Broadway+Hotel+Macau", goodFor: "Comida y acceso a Galaxy", caution: "Cotai añade traslado al centro" },
  { id: "mo-sofitel", city: "macau", name: "Sofitel Macau At Ponte 16", tier: "Confort", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/764577904.jpg?k=ee8f6544a6e92b7381ef36f04b61e34b80b367f5229e48a3a7c962b597f88b18&o=", area: "Península / Inner Harbour", snapshotUsd: 99.6, source: "https://www.booking.com/searchresults.html?ss=Sofitel+Macau+At+Ponte+16", goodFor: "Centro histórico", caution: "Más lejos de los espectáculos de Cotai" },
  { id: "mo-artyzen", city: "macau", name: "Artyzen Grand Lapa Macau", tier: "Premium", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/358490347.jpg?k=5148eb7a4d14da4d40ace53e6c91fc83495cedc68616d365c7d4c3a159b5b784&o=", area: "Península / Outer Harbour", snapshotUsd: 176, source: "https://www.booking.com/searchresults.html?ss=Artyzen+Grand+Lapa+Macau", goodFor: "Resort sin ir a Cotai", caution: "Costo alto para una noche" },

  { id: "hk-regal-airport", city: "hongkong", name: "Regal Airport Hotel", tier: "Confort", image: "https://ak-d.tripcdn.com/images/0225t12000849sd7h7DF1.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Chek Lap Kok / aeropuerto", snapshotUsd: 93, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-436519/regal-airport-hotel/", goodFor: "Salida muy temprana", caution: "No sirve para tres días de turismo en Kowloon" },
  { id: "hk-cozi-harbour", city: "hongkong", name: "Hotel COZI Harbour View", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc5i12000f0tpyqz3209.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Kwun Tong", snapshotUsd: 45, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-433361/hotel-cozi-harbour-view/", goodFor: "Ahorro con MTR", caution: "Lejos de Tsim Sha Tsui y Central" },
  { id: "hk-panda", city: "hongkong", name: "Panda Hotel", tier: "Valor", image: "https://ak-d.tripcdn.com/images/1mc1b12000rbyibcgD242.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Tsuen Wan", snapshotUsd: 50, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-436870/panda-hotel/", goodFor: "Habitaciones de valor", caution: "Más tiempo diario en MTR" },
  { id: "hk-regala-skycity", city: "hongkong", name: "Regala Skycity Hotel", tier: "Confort", image: "https://ak-d.tripcdn.com/images/02051120009ggq56q1F83.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Airport Expo / Chek Lap Kok", snapshotUsd: 83, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-92764015/regala-skycity-hotel-by-regal-hotels/", goodFor: "Aeropuerto y AsiaWorld-Expo", caution: "Mala base para compras y museos urbanos" },
  { id: "hk-ramada-harbour", city: "hongkong", name: "Ramada Hong Kong Harbour View", tier: "Valor", image: "https://ak-d.tripcdn.com/images/200c10000000q7f661F51.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Sai Ying Pun / Hong Kong Island", snapshotUsd: 52, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-425090/ramada-hong-kong-harbour-view/", goodFor: "Isla y MTR", caution: "Habitaciones conocidas por ser compactas; confirmar superficie" },
  { id: "hk-cozi-resort", city: "hongkong", name: "Hotel COZi Resort", tier: "Valor", image: "https://ak-d.tripcdn.com/images/0201w1200088an2bi1900.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Tuen Mun", snapshotUsd: 47, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-30936520/hotel-cozi-resort/", goodFor: "Precio bajo", caution: "Demasiado alejado para el itinerario base" },
  { id: "hk-best-western-cwb", city: "hongkong", name: "Best Western Hotel Causeway Bay", tier: "Valor", image: "https://ak-d.tripcdn.com/images/22031g000001h6kc61CA5.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Causeway Bay / Wan Chai", snapshotUsd: 42, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-354040/best-western-hotel-causeway-bay/", goodFor: "Compras en la isla", caution: "Confirmar tamaño: varias categorías son muy pequeñas" },
  { id: "hk-kowloon", city: "hongkong", name: "The Kowloon Hotel", tier: "Confort", image: "https://ak-d.tripcdn.com/images/200q1a0000019rkcyE590.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Tsim Sha Tsui / Nathan Road", snapshotUsd: 93, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-425085/the-kowloon-hotel/", goodFor: "Waterfront, museos y MTR", caution: "Habitaciones compactas" },
  { id: "hk-ramada-tst", city: "hongkong", name: "Ramada Grand Tsim Sha Tsui", tier: "Valor", image: "https://ak-d.tripcdn.com/images/220s0v000000jx3q9A183.jpg?proc=resize/m_r,w_700,h_448,8688", area: "Tsim Sha Tsui / Austin", snapshotUsd: 42, source: "https://us.trip.com/hotels/hong-kong-hotel-detail-426251/ramada-grand-tsim-sha-tsui/", goodFor: "Ubicación a precio bajo", caution: "Tres habitaciones pequeñas y poco espacio para maletas" },
  { id: "hk-royal-plaza", city: "hongkong", name: "Royal Plaza Hotel", tier: "Premium", image: "https://cf.bstatic.com/xdata/images/hotel/270x270/138495392.jpg?k=5250a0ac4cec83ddde1ecadcb6bdd93b6fa7d927bd56b0498e2e89e0543c7199&o=", area: "Mong Kok East", snapshotUsd: 186, source: "https://www.booking.com/searchresults.html?ss=Royal+Plaza+Hotel+Hong+Kong", goodFor: "Habitaciones familiares y compras", caution: "La tarifa de muestra no confirma una habitación para 5" },
];

const extraHotels: HotelOption[] = extraHotelSeeds.map((seed) => {
  const rooms = seed.rooms ?? 3;
  const groupNight = Math.round(seed.snapshotUsd * rooms);
  const nights = DEFAULT_NIGHTS[seed.city];
  return {
    id: seed.id,
    city: seed.city,
    name: seed.name,
    tier: seed.tier,
    image: `/hotels/${seed.id}.jpg`,
    photoSource: seed.source,
    area: seed.area,
    roomConfig: `${rooms} habitaciones Twin/Double como presupuesto conservador; buscar Triple + Twin solo si el hotel confirma por escrito capacidad total para 5.`,
    total: groupNight * nights,
    priceNote: `Muestra pública observada 1 sep 2026: ${seed.snapshotUsd.toLocaleString("en-US", { style: "currency", currency: "USD" })} por habitación/1 noche/2 adultos. Presupuesto para el grupo: ${rooms} habitaciones × noches elegidas; impuestos, desayuno y tarifa de nov/dic 2026 deben verificarse.`,
    status: "ESTIMADO",
    amenities: ["Servicios: ver ficha", "Camas: confirmar", "Tarifa 2026: verificar"],
    pros: [seed.goodFor, "Hotel y enlace comprobados"],
    cons: [seed.caution, "La muestra no garantiza disponibilidad futura"],
    bookingUrl: seed.source,
    sourceUrl: seed.source,
  };
});

export const hotels: HotelOption[] = [...baseHotels, ...extraHotels];

export interface TransportOption {
  id: string;
  mode: "Vuelo" | "Tren" | "Ferry" | "Autobús";
  name: string;
  schedule: string;
  doorToDoor: string;
  groupPrice: number;
  priceNote: string;
  status: EvidenceStatus;
  statusNote: string;
  luggage: string;
  comfort: string;
  pros: string[];
  cons: string[];
  bookingUrl: string;
  sourceUrl: string;
  recommended?: boolean;
}

export interface TransportSegment {
  id: string;
  date: string;
  from: string;
  to: string;
  why: string;
  options: TransportOption[];
}

export const transportSegments: TransportSegment[] = [
  {
    id: "sh-zjj", date: "28 nov", from: "Shanghái", to: "Zhangjiajie",
    why: "El vuelo ahorra el cambio de estación y deja la tarde para instalarse; el tren solo gana si se prioriza evitar aeropuertos.",
    options: [
      { id: "sh-zjj-flight", mode: "Vuelo", name: "Shanghai Airlines FM7225 · PVG→DYG", schedule: "Patrón vigente: 10:15–12:25", doorToDoor: "≈7 h 40 min hotel→hotel", groupPrice: 625, priceNote: "$125 p/p de presupuesto; tarifa exacta variable.", status: "VARIABLE", statusNote: "Número y hora observados en el patrón actual; confirmar el 28 nov antes de pagar.", luggage: "La franquicia depende de la tarifa. No asumir maleta hasta verla en el checkout.", comfort: "3/5", pros: ["Más rápido puerta a puerta", "Llegada con luz"], cons: ["PVG lejos del centro", "Seguridad y equipaje"], bookingUrl: "https://www.google.com/travel/flights?q=Flights%20from%20PVG%20to%20DYG%20on%202026-11-28", sourceUrl: "https://www.flight.info/FM7225", recommended: true },
      { id: "sh-zjj-train", mode: "Tren", name: "HSR Shanghai Hongqiao→Zhangjiajie West", schedule: "Trenes actuales desde 7 h 15; horario del 28 nov no publicado", doorToDoor: "≈9 h 15–11 h hotel→hotel", groupPrice: 590, priceNote: "¥800–880 p/p observado, según tren/clase; presupuesto convertido.", status: "NO_PUBLICADO", statusNote: "12306 vende normalmente 15 días antes; no seleccionar un número de tren todavía.", luggage: "20 kg por adulto; suma de dimensiones ≤130 cm; sin facturación de equipaje.", comfort: "4/5", pros: ["Centro a centro parcial", "Más movimiento durante el viaje"], cons: ["Día casi completo", "5 maletas pasan control y estaciones"], bookingUrl: "https://www.12306.cn/en/", sourceUrl: "https://us.trip.com/trains/china/route/shanghai-hongqiao-to-zhangjiajiexi-zhangjiajie-west/" },
    ],
  },
  {
    id: "zjj-sz", date: "2 dic", from: "Zhangjiajie", to: "Shenzhen",
    why: "El vuelo nocturno conserva una mañana de respaldo por niebla o lluvia. El tren es cómodo, pero consume casi todo el día.",
    options: [
      { id: "zjj-sz-flight", mode: "Vuelo", name: "Suparna Y87574 · DYG→SZX", schedule: "Patrón vigente mié/vie/dom: 19:40–21:45", doorToDoor: "≈6 h hotel→hotel", groupPrice: 575, priceNote: "$115 p/p de presupuesto; tarifa y equipaje variables.", status: "VARIABLE", statusNote: "Opera con patrón mié/vie/dom en la fuente vigente; al mover noches hay que comprobar que la nueva fecha coincida y reconfirmar operación.", luggage: "Fuentes comerciales indican franquicia Economy, pero no hay tabla oficial accesible: verificar en la tarifa.", comfort: "3/5", pros: ["Protege la mañana", "Ahorra 2–4 horas"], cons: ["Llegada tarde", "Operador con menos frecuencias"], bookingUrl: "https://www.google.com/travel/flights?q=Flights%20from%20DYG%20to%20SZX%20on%202026-12-02", sourceUrl: "https://www.wego.com/schedules/dyg/szx/flight-schedules-from-zhangjiajie-to-shenzhen", recommended: true },
      { id: "zjj-sz-train", mode: "Tren", name: "HSR Zhangjiajie West→Shenzhen North", schedule: "Trenes actuales desde 6 h 20; horario del 2 dic no publicado", doorToDoor: "≈8 h 35–9 h 45 hotel→hotel", groupPrice: 500, priceNote: "¥665–760 p/p observado; presupuesto convertido.", status: "NO_PUBLICADO", statusNote: "Comprar en 12306 cuando se abra la ventana; no hay número verificable aún.", luggage: "20 kg por adulto y 130 cm lineales; cada viajero maneja su maleta.", comfort: "4/5", pros: ["Más fiable con equipaje incluido", "Asientos amplios"], cons: ["Pierde la mañana flexible", "Traslado largo a Zhangjiajie West"], bookingUrl: "https://www.12306.cn/en/", sourceUrl: "https://us.trip.com/trains/china/route/zhangjiajiexi-zhangjiajie-west-to-shenzhenbei-shenzhen-north/" },
    ],
  },
  {
    id: "sz-mo", date: "5 dic", from: "Shenzhen", to: "Macao",
    why: "El ferry directo evita dos pasos terrestres y es especialmente lógico con Casa Real/Harbourview. El tren puede servir si el mar se suspende.",
    options: [
      { id: "sz-mo-ferry", mode: "Ferry", name: "TurboJET / operador asociado · Shekou→Outer Harbour", schedule: "Horario vigente desde 24 mar: 09:00, 11:00, 16:30; 18:30 fines de semana", doorToDoor: "≈3 h 15 hotel→hotel", groupPrice: 122, priceNote: "Presupuesto de 5 Economy; tarifa exacta para dic pendiente de checkout.", status: "NO_PUBLICADO", statusNote: "El servicio existe; venta/ajustes para el 5 dic todavía deben confirmarse.", luggage: "Equipaje sujeto a condiciones del operador; llegar con 45–60 min y declarar piezas grandes.", comfort: "4/5", pros: ["Directo", "Llega junto a hoteles de la península"], cons: ["Puede cambiar por mar/operación", "Límite de equipaje a confirmar"], bookingUrl: "https://www2.turbojet.com.hk/", sourceUrl: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/", recommended: true },
      { id: "sz-mo-train", mode: "Tren", name: "HSR Shenzhen North→Zhuhai + cruce Gongbei", schedule: "Conexiones actuales vía Guangzhou South; horario del 5 dic no publicado", doorToDoor: "≈4–5 h hotel→hotel", groupPrice: 105, priceNote: "Presupuesto de tren + transporte local; no es billete directo único.", status: "NO_PUBLICADO", statusNote: "Comprar tramos en 12306 15 días antes.", luggage: "20 kg por adulto en tren; más escaleras, transbordo y control fronterizo.", comfort: "2/5", pros: ["Plan terrestre si se cancela el ferry", "Frecuencias ferroviarias altas"], cons: ["Transbordo", "Mala opción con 5 maletas"], bookingUrl: "https://www.12306.cn/en/", sourceUrl: "https://www.12306.cn/en/" },
    ],
  },
  {
    id: "mo-hk", date: "6 dic", from: "Macao", to: "Hong Kong",
    why: "Outer Harbour→Sheung Wan minimiza movimientos si se mantiene Casa Real. Cotai Water Jet mejora si se hace el upgrade al Parisian.",
    options: [
      { id: "mo-hk-turbo", mode: "Ferry", name: "TurboJET · Outer Harbour→Sheung Wan", schedule: "Horario vigente desde 1 sep incluye 12:30, 13:00, 14:00…", doorToDoor: "≈3 h hotel→hotel", groupPrice: 124, priceNote: "HKD194 p/p de día de fin de semana, presupuesto convertido.", status: "VARIABLE", statusNote: "Tabla vigente cubre la fecha, pero el operador advierte ajustes; reconfirmar.", luggage: "Equipaje grande puede requerir check-in y cargo; no llegar al último minuto.", comfort: "4/5", pros: ["Mejor con hotel en la península", "Llega a Central"], cons: ["Mar y equipaje", "Formalidades en ambas terminales"], bookingUrl: "https://www2.turbojet.com.hk/", sourceUrl: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/", recommended: true },
      { id: "mo-hk-cotai", mode: "Ferry", name: "Cotai Water Jet · Taipa→Sheung Wan", schedule: "Horario vigente con salidas diurnas; elegir 12:30/13:30 según inventario", doorToDoor: "≈3 h 30 desde península; ≈2 h 45 desde Cotai", groupPrice: 150, priceNote: "HKD209 p/p fin de semana + reserva para equipaje facturado.", status: "VARIABLE", statusNote: "Servicio y precio vigentes; confirmar asiento del 6 dic.", luggage: "1 pieza de mano ≤20 kg y 56×36×23 cm; hasta 2 facturadas con reserva previa y cargo desde HKD25.", comfort: "4/5", pros: ["Ideal con Parisian", "Regla de equipaje publicada"], cons: ["Peor desde Casa Real", "Reservar maletas antes de las 16:00 del día previo"], bookingUrl: "https://www.cotaiwaterjet.com/ferry-schedule/hongkong-macau-taipa.html", sourceUrl: "https://www.cotaiwaterjet.com/ferry-schedule/hongkong-macau-taipa.html" },
      { id: "mo-hk-bus", mode: "Autobús", name: "HZMB Shuttle Bus · puertos Macao↔Hong Kong", schedule: "24 h; cada 5–10 min gran parte del día", doorToDoor: "≈3–4 h hotel→hotel", groupPrice: 122, priceNote: "MOP65 p/p + presupuesto para taxi/metro en ambos extremos.", status: "VERIFICADO", statusNote: "Frecuencia y tarifa diurna publicadas por el operador.", luggage: "Más tolerante que el ferry, pero hay que descargar y cruzar controles con las 5 maletas.", comfort: "3/5", pros: ["No depende del mar", "Mucha frecuencia"], cons: ["No es centro a centro", "Dos conexiones locales"], bookingUrl: "https://www.hzmbus.com/en/", sourceUrl: "https://www.hzmbus.com/en/message.html?tab=1" },
    ],
  },
  {
    id: "hk-sh", date: "9 dic", from: "Hong Kong", to: "Shanghái",
    why: "El vuelo conserva la tarde final y deja una noche de margen antes del JFK. El tren de día llega demasiado tarde para aprovechar Shanghái.",
    options: [
      { id: "hk-sh-flight", mode: "Vuelo", name: "China Eastern MU724 · HKG→PVG", schedule: "Patrón vigente: 09:45–12:25", doorToDoor: "≈6 h 40 hotel→hotel", groupPrice: 650, priceNote: "$130 p/p de presupuesto; tarifa exacta variable.", status: "VARIABLE", statusNote: "Número y hora observados actualmente; confirmar el 9 dic en el enlace.", luggage: "China Eastern publica 2×23 kg para Economy no branded en varias rutas, pero Basic depende del billete: leer el checkout.", comfort: "3/5", pros: ["Conserva la tarde", "Protege el vuelo internacional del día siguiente"], cons: ["Aeropuertos lejanos", "La franquicia depende de tarifa"], bookingUrl: "https://www.google.com/travel/flights?q=Flights%20from%20HKG%20to%20PVG%20on%202026-12-09", sourceUrl: "https://www.flight.info/MU724", recommended: true },
      { id: "hk-sh-train", mode: "Tren", name: "HSR West Kowloon→Shanghai Hongqiao", schedule: "Servicio diurno actual ≈8 h 08; horario del 9 dic no publicado", doorToDoor: "≈10 h 15 hotel→hotel", groupPrice: 625, priceNote: "Presupuesto de 2ª clase a partir de tarifas actuales.", status: "NO_PUBLICADO", statusNote: "La venta abre normalmente 15 días antes; confirmar requisitos migratorios de West Kowloon.", luggage: "20 kg por adulto, 130 cm lineales, sin facturación.", comfort: "4/5", pros: ["Evita vuelo", "Asiento amplio"], cons: ["Pierde la última tarde", "Llegada nocturna antes del JFK"], bookingUrl: "https://www.12306.cn/en/", sourceUrl: "https://www.highspeed.mtr.com.hk/en/ticket/ticket-purchase-channels.html" },
    ],
  },
];

export type AttractionCategory = "Tecnología" | "Ciencia" | "Espectáculo" | "Naturaleza" | "Cultura" | "Comida" | "Vistas" | "Parque";

export interface Attraction {
  id: string;
  city: CityId;
  day: string;
  time: string;
  name: string;
  category: AttractionCategory;
  image: string;
  description: string;
  duration: number;
  pricePerPerson: number;
  priceLabel: string;
  status: EvidenceStatus;
  booking: string;
  recommendation: "Imprescindible" | "Muy recomendable" | "Opcional";
  bookingUrl: string;
  sourceUrl: string;
}

const baseAttractions: Attraction[] = [
  { id: "sh-astronomy", city: "shanghai", day: "2026-11-26", time: "09:30", name: "Museo de Astronomía de Shanghái", category: "Ciencia", image: "/attractions/sh-astronomy.jpg", description: "Planetario, instrumentos, meteoritos y salas inmersivas; es una experiencia científica real, no una parada fotográfica. Está en Lingang: reservar media jornada y transporte.", duration: 4.5, pricePerPerson: 4.2, priceLabel: "CNY30 adulto", status: "VERIFICADO", booking: "Reserva nominal; las entradas suelen liberarse pocos días antes en canales oficiales.", recommendation: "Imprescindible", bookingUrl: "https://en.sstm.org.cn/news/74367009/81", sourceUrl: "https://www.meet-in-shanghai.net/en/news/shanghai-astronomy-museum-releases-prices-920442/" },
  { id: "sh-teamlab", city: "shanghai", day: "2026-11-27", time: "10:30", name: "teamLab Borderless Shanghai", category: "Tecnología", image: "/attractions/sh-teamlab.jpg", description: "Recorrido libre por salas digitales que reaccionan al movimiento; conviene dejar al menos dos horas y ropa cómoda.", duration: 2.5, pricePerPerson: 32, priceLabel: "CNY229 de referencia; revisar tarifa 2026", status: "VARIABLE", booking: "Compra anticipada recomendada; viernes actual 10:30–18:00, última entrada 17:00.", recommendation: "Imprescindible", bookingUrl: "https://www.teamlab.art/e/borderless-shanghai/", sourceUrl: "https://www.teamlab.art/e/borderless-shanghai/" },
  { id: "sh-era", city: "shanghai", day: "2026-11-27", time: "19:30", name: "ERA2 · Shanghai Circus World", category: "Espectáculo", image: "/attractions/sh-era.webp", description: "Acrobacia china con motocicletas, aéreos, agua y multimedia. Es uno de los espectáculos fuertes del viaje.", duration: 2, pricePerPerson: 50.5, priceLabel: "Desde CNY361 en programación actual", status: "VARIABLE", booking: "El calendario publicado llega al 30 nov 2026; el 27 nov entra en esa ventana, pero hay que escoger asiento.", recommendation: "Imprescindible", bookingUrl: "https://www.shcircusworld.com/era-tickets.html", sourceUrl: "https://www.shcircusworld.com/" },
  { id: "sh-tower", city: "shanghai", day: "2026-11-26", time: "17:00", name: "Shanghai Tower · observatorio", category: "Vistas", image: "/attractions/sh-tower.webp", description: "Ascensor de alta velocidad y vistas urbanas desde uno de los observatorios más altos del mundo; ir cerca del atardecer si el cielo está despejado.", duration: 1.5, pricePerPerson: 25.2, priceLabel: "CNY180 adulto", status: "VERIFICADO", booking: "Franja horaria; mover si hay niebla.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/en-US/activity/4333-shanghai-tower-observation-deck-shanghai/", sourceUrl: "https://en.shanghaitower.com/shagnhai.html" },
  { id: "sh-cruise", city: "shanghai", day: "2026-11-26", time: "19:30", name: "Crucero nocturno por el Huangpu", category: "Vistas", image: "/attractions/sh-huangpu.webp", description: "Recorrido de aproximadamente 45–60 min entre el Bund y Pudong; sirve para ver el contraste de ambas orillas sin otra caminata larga.", duration: 1.3, pricePerPerson: 16, priceLabel: "Desde ~US$16; precio cambia por barco", status: "ESTIMADO", booking: "Reservar después de confirmar clima y muelle exacto.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/en-US/activity/3973-hangpu-river-cruise-shanghai/", sourceUrl: "https://www.klook.com/en-US/activity/3973-hangpu-river-cruise-shanghai/" },
  { id: "sh-yu", city: "shanghai", day: "2026-12-09", time: "16:00", name: "Yu Garden y mercado", category: "Cultura", image: "/attractions/sh-yu.webp", description: "Jardín clásico con pabellones y rocas; combinar con comida en el bazar y compras finales, no dedicarle el día completo.", duration: 2, pricePerPerson: 5.6, priceLabel: "CNY40 temporada alta; confirmar temporada", status: "VARIABLE", booking: "Entrada nominal; puede comprarse en plataforma cuando abra inventario.", recommendation: "Opcional", bookingUrl: "https://www.trip.com/travel-guide/attraction/shanghai/yu-garden-75626/", sourceUrl: "https://www.trip.com/travel-guide/attraction/shanghai/yu-garden-75626/" },

  { id: "zjj-park", city: "zhangjiajie", day: "2026-11-29", time: "07:30", name: "Parque Forestal Nacional de Zhangjiajie", category: "Naturaleza", image: "/attractions/zjj-yuan.webp", description: "Día completo entre Yuanjiajie, pilares de arenisca y miradores. El billete suele cubrir varios días; ascensores y teleféricos pueden cobrarse aparte.", duration: 8, pricePerPerson: 34.8, priceLabel: "Desde ~US$34.79 adulto", status: "VARIABLE", booking: "Reserva de pasaporte y franja; llevar el documento original.", recommendation: "Imprescindible", bookingUrl: "https://www.klook.com/en-US/activity/101803-zhangjiajie-national-forest-park/", sourceUrl: "https://www.klook.com/en-US/activity/101803-zhangjiajie-national-forest-park/" },
  { id: "zjj-bailong", city: "zhangjiajie", day: "2026-11-29", time: "10:00", name: "Bailong Elevator", category: "Tecnología", image: "/attractions/zjj-bailong.webp", description: "Ascensor panorámico excavado en la montaña que evita una subida larga; se usa dentro del recorrido de Yuanjiajie.", duration: 0.5, pricePerPerson: 9.1, priceLabel: "CNY65 por trayecto de referencia", status: "VARIABLE", booking: "Se compra como complemento; confirmar si el paquete del parque ya lo incluye.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/en-US/activity/114367-bailong-ladder/", sourceUrl: "https://www.klook.com/en-US/activity/114367-bailong-ladder/" },
  { id: "zjj-glass", city: "zhangjiajie", day: "2026-11-30", time: "09:00", name: "Grand Canyon + Glass Bridge", category: "Naturaleza", image: "/attractions/zjj-glass.webp", description: "Puente de vidrio y recorrido por el cañón. No es solo una foto: incluye senderos, desnivel y controles de acceso.", duration: 5, pricePerPerson: 24.6, priceLabel: "Temporada baja desde CNY128 / ~US$24.55 según paquete", status: "VARIABLE", booking: "Franja horaria y pasaporte; revisar qué elementos incluye cada opción.", recommendation: "Imprescindible", bookingUrl: "https://www.klook.com/en-US/activity/6602-grand-canyon-glass-bridge-tickets-zhangjiajie/", sourceUrl: "https://www.zhangjiajieguide.com/attractions/grand-canyon/" },
  { id: "zjj-tianmen", city: "zhangjiajie", day: "2026-12-01", time: "08:00", name: "Tianmen Mountain + teleférico", category: "Naturaleza", image: "/attractions/zjj-tianmen.webp", description: "Teleférico largo, pasarelas, escaleras de Heaven's Gate y vistas de montaña. Está junto a la ciudad, no junto al hotel de Wulingyuan.", duration: 7, pricePerPerson: 39.9, priceLabel: "Desde ~US$39.85 adulto", status: "VARIABLE", booking: "Elegir línea A/B/C y horario; reservar con pasaporte.", recommendation: "Imprescindible", bookingUrl: "https://www.klook.com/en-US/activity/6613-tianmen-mountain-cable-car-gallery-road-zhangjiajie/", sourceUrl: "https://www.klook.com/en-US/activity/6613-tianmen-mountain-cable-car-gallery-road-zhangjiajie/" },
  { id: "zjj-show", city: "zhangjiajie", day: "2026-11-30", time: "19:30", name: "Charming Xiangxi Show", category: "Espectáculo", image: "/attractions/zjj-golden.webp", description: "Danza, música y acrobacia inspiradas en culturas de Hunan; buena actividad nocturna después de volver al hotel.", duration: 1.7, pricePerPerson: 25, priceLabel: "Desde ~US$24.96", status: "VARIABLE", booking: "El horario de invierno exacto debe confirmarse; patrón habitual cercano a 19:20.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/en-US/activity/6687-charming-xiangxi-show-admission-ticket-zhangjiajie/", sourceUrl: "https://www.klook.com/en-US/activity/6687-charming-xiangxi-show-admission-ticket-zhangjiajie/" },
  { id: "zjj-cave", city: "zhangjiajie", day: "2026-12-02", time: "09:00", name: "Yellow Dragon Cave", category: "Naturaleza", image: "/attractions/zjj-cave.webp", description: "Cueva kárstica con recorrido interior y barca; opción resistente a la lluvia antes del vuelo nocturno.", duration: 3, pricePerPerson: 16, priceLabel: "Presupuesto ~CNY115", status: "ESTIMADO", booking: "Comprar solo si el pronóstico hace inviable otra mañana al aire libre.", recommendation: "Opcional", bookingUrl: "https://us.trip.com/travel-guide/attraction/zhangjiajie/huanglong-cave-75851/", sourceUrl: "https://us.trip.com/travel-guide/attraction/zhangjiajie/huanglong-cave-75851/" },

  { id: "sz-science", city: "shenzhen", day: "2026-12-04", time: "09:30", name: "Museo de Ciencia y Tecnología de Shenzhen", category: "Ciencia", image: "/attractions/sz-science.jpg", description: "Nuevo complejo interactivo en Guangming con IA, cine científico y réplicas espaciales; reservar media jornada por la distancia desde Futian.", duration: 4.5, pricePerPerson: 7, priceLabel: "CNY50 adulto reportado; áreas públicas 1–2 gratuitas", status: "VARIABLE", booking: "Entradas para 3 días adelante liberadas a las 20:00 en el mini‑programa oficial; cerrado lunes.", recommendation: "Imprescindible", bookingUrl: "https://www.eyeshenzhen.com/content/2025-05/14/content_31567292.htm", sourceUrl: "https://www.eyeshenzhen.com/content/2025-05/14/content_31567292.htm" },
  { id: "sz-dji", city: "shenzhen", day: "2026-12-04", time: "15:30", name: "DJI Flagship Store · OCT Harbour", category: "Tecnología", image: "/attractions/sz-dji.webp", description: "Tienda oficial con demostraciones y soporte. Probar modelos, comparar garantía regional y no comprar hasta confirmar compatibilidad y batería.", duration: 1.5, pricePerPerson: 0, priceLabel: "Entrada gratuita; compras aparte", status: "VERIFICADO", booking: "Sin entrada; viernes abre 10:00–22:30 según ficha oficial.", recommendation: "Imprescindible", bookingUrl: "https://www.dji.com/where-to-buy/flagship/cn-sz", sourceUrl: "https://www.dji.com/where-to-buy/flagship/cn-sz" },
  { id: "sz-hqb", city: "shenzhen", day: "2026-12-03", time: "10:00", name: "Huaqiangbei · circuito de compra tecnológica", category: "Tecnología", image: "/attractions/sz-hqb.webp", description: "Comparar componentes y electrónica por la mañana, anotar precios y volver solo a vendedores que permitan probar, facturar y documentar garantía.", duration: 5, pricePerPerson: 0, priceLabel: "Acceso gratuito; compras aparte", status: "VERIFICADO", booking: "No requiere entrada. Reservar presupuesto y lista de modelos antes del viaje.", recommendation: "Imprescindible", bookingUrl: "https://www.eyeshenzhen.com/content/2025-07/03/content_31595461.htm", sourceUrl: "https://www.eyeshenzhen.com/content/2025-07/03/content_31595461.htm" },
  { id: "sz-ping", city: "shenzhen", day: "2026-12-03", time: "17:30", name: "Free Sky · Ping An Finance Center", category: "Vistas", image: "/attractions/sz-ping.webp", description: "Observatorio en Futian para entender la escala tecnológica de Shenzhen; ir solo con visibilidad razonable.", duration: 1.5, pricePerPerson: 28, priceLabel: "Presupuesto CNY200 adulto", status: "ESTIMADO", booking: "Franja horaria; comprar más cerca según clima.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/en-US/activity/11442-ping-an-finance-center-free-sky-shenzhen/", sourceUrl: "https://www.klook.com/en-US/activity/11442-ping-an-finance-center-free-sky-shenzhen/" },
  { id: "sz-window", city: "shenzhen", day: "2026-12-04", time: "14:00", name: "Window of the World", category: "Parque", image: "/attractions/sz-window.webp", description: "Parque temático de miniaturas con espectáculos; funciona como opción familiar si se prefiere entretenimiento a otra tarde de compras.", duration: 5, pricePerPerson: 31, priceLabel: "Entrada publicada CNY220; promociones pueden bajar", status: "VARIABLE", booking: "Comprar solo después de decidir entre este parque y Splendid China.", recommendation: "Opcional", bookingUrl: "https://www.klook.com/en-US/activity/9352-window-of-the-world-ticket-guangdong/", sourceUrl: "https://www.ctgii.com/en/scenic/theme_park/62" },
  { id: "sz-splendid", city: "shenzhen", day: "2026-12-04", time: "14:00", name: "Splendid China Folk Village", category: "Cultura", image: "/attractions/sz-oct.webp", description: "Parque cultural con pueblos, artes escénicas y espectáculos. Es alternativa, no complemento, a Window of the World el mismo día.", duration: 5, pricePerPerson: 31, priceLabel: "Entrada publicada CNY220; promociones variables", status: "VARIABLE", booking: "Elegir uno de los dos parques; horario oficial habitual 10:00–21:00.", recommendation: "Opcional", bookingUrl: "https://www.klook.com/en-US/activity/9338-splendid-china-folk-village-ticket-guangdong/", sourceUrl: "https://www.ctgii.com/en/scenic/theme_park/63" },

  { id: "mo-old", city: "macau", day: "2026-12-05", time: "12:00", name: "Centro histórico: Senado + Ruinas de San Pablo", category: "Cultura", image: "/attractions/mo-ruins.webp", description: "Ruta compacta por Senado, St. Dominic's y San Pablo, con parada para probar comida macaense; limitar la caminata a 2–3 horas.", duration: 2.5, pricePerPerson: 0, priceLabel: "Gratuito", status: "VERIFICADO", booking: "Sin reserva. Museo/cripta tiene horario limitado; la fachada es exterior.", recommendation: "Muy recomendable", bookingUrl: "https://www.macaotourism.gov.mo/en/sightseeing/unesco-world-heritage", sourceUrl: "https://www.macaotourism.gov.mo/en/sightseeing/unesco-world-heritage" },
  { id: "mo-tower", city: "macau", day: "2026-12-05", time: "15:30", name: "Macau Tower · observatorio", category: "Vistas", image: "/attractions/mo-tower.webp", description: "Vistas de la península y el delta; se puede ver el Skywalk sin pagar la actividad extrema.", duration: 1.5, pricePerPerson: 26, priceLabel: "Presupuesto MOP208 adulto", status: "ESTIMADO", booking: "Comprar entrada simple; actividades AJ Hackett se cotizan aparte.", recommendation: "Muy recomendable", bookingUrl: "https://www.klook.com/activity/506-macau-tower-macau/", sourceUrl: "https://www.macautower.com.mo/" },
  { id: "mo-water", city: "macau", day: "2026-12-05", time: "19:30", name: "The House of Dancing Water", category: "Espectáculo", image: "/attractions/mo-water-show.jpg", description: "Producción acuática de 90 minutos con acrobacia, plataformas móviles y tecnología escénica; el gran espectáculo de Macao.", duration: 1.5, pricePerPerson: 87, priceLabel: "Desde MOP698 oficial; promos desde MOP558", status: "VARIABLE", booking: "Sábados actuales 16:30/19:30; la plataforma muestra plan de asientos válido hasta mar 2027, pero confirmar inventario del 5 dic.", recommendation: "Imprescindible", bookingUrl: "https://www.cityofdreamsmacau.com/en/house-of-dancing-water", sourceUrl: "https://www.cityofdreamsmacau.com/en/house-of-dancing-water" },
  { id: "mo-teamlab", city: "macau", day: "2026-12-06", time: "11:00", name: "teamLab SuperNature Macao", category: "Tecnología", image: "/attractions/mo-teamlab.jpg", description: "Instalaciones digitales interactivas de gran escala dentro de The Venetian; funciona especialmente bien con hotel en Cotai.", duration: 2, pricePerPerson: 36, priceLabel: "MOP/HKD288 adulto", status: "VERIFICADO", booking: "Domingo abierto; horario publicado desde septiembre 11:00–19:00, última entrada 18:15.", recommendation: "Muy recomendable", bookingUrl: "https://www.cotaiticketing.com/shows/teamlab.html", sourceUrl: "https://www.teamlab.art/e/macao/" },
  { id: "mo-science", city: "macau", day: "2026-12-06", time: "09:30", name: "Macao Science Center", category: "Ciencia", image: "/attractions/mo-science.jpg", description: "Galerías interactivas y planetario en un edificio de I. M. Pei; alternativa sensata si se duerme en la península.", duration: 2.5, pricePerPerson: 3.1, priceLabel: "Presupuesto MOP25 para galerías; planetario aparte", status: "ESTIMADO", booking: "Confirmar horario dominical y sesión de planetario cerca de la fecha.", recommendation: "Opcional", bookingUrl: "https://www.msc.org.mo/en/", sourceUrl: "https://www.msc.org.mo/en/article-detail/57/about-msc" },

  { id: "hk-symphony", city: "hongkong", day: "2026-12-06", time: "20:00", name: "A Symphony of Lights", category: "Espectáculo", image: "/attractions/hk-light.webp", description: "Show coordinado de luces sobre Victoria Harbour; verlo desde el paseo de Kowloon y no pagar un tour específico.", duration: 0.4, pricePerPerson: 0, priceLabel: "Gratuito", status: "VERIFICADO", booking: "Todos los días a las 20:00 salvo cancelación por clima.", recommendation: "Muy recomendable", bookingUrl: "https://www.tourism.gov.hk/symphony/english/details/details.html", sourceUrl: "https://www.tourism.gov.hk/symphony/english/details/details.html" },
  { id: "hk-peak", city: "hongkong", day: "2026-12-07", time: "09:00", name: "Peak Tram + Sky Terrace 428", category: "Vistas", image: "/attractions/hk-peak.webp", description: "Subida en funicular y mirador; primera hora para reducir filas. Bajar en bus si se quiere variar la experiencia.", duration: 2.5, pricePerPerson: 23.3, priceLabel: "HKD182 adulto ida/vuelta + Sky Terrace", status: "VERIFICADO", booking: "Comprar franja temprana en la web oficial.", recommendation: "Imprescindible", bookingUrl: "https://www.thepeak.com.hk/en/ticket-and-booking/purchase-ticket/peak-tram-sky-pass", sourceUrl: "https://www.thepeak.com.hk/en/ticket-and-booking/purchase-ticket/peak-tram-sky-pass" },
  { id: "hk-mplus", city: "hongkong", day: "2026-12-08", time: "10:00", name: "M+", category: "Tecnología", image: "/attractions/hk-mplus-real.jpg", description: "Museo de cultura visual con diseño, imagen en movimiento y arte contemporáneo; priorizar galerías digitales y exposiciones temporales.", duration: 3, pricePerPerson: 24.3, priceLabel: "HKD190 entrada general", status: "VERIFICADO", booking: "M+ cierra los lunes. El martes 8 es una alternativa a Ngong Ping o Disneyland, no una actividad adicional.", recommendation: "Muy recomendable", bookingUrl: "https://www.mplus.org.hk/en/admission-tickets/", sourceUrl: "https://www.mplus.org.hk/en/plan-your-visit/" },
  { id: "hk-space", city: "hongkong", day: "2026-12-07", time: "14:00", name: "Hong Kong Space Museum", category: "Ciencia", image: "/attractions/hk-space.jpg", description: "Salas de astronomía y ciencias espaciales en Tsim Sha Tsui; combinar con un show del planetario si encaja.", duration: 2, pricePerPerson: 1.3, priceLabel: "HKD10 salas; shows aparte", status: "VERIFICADO", booking: "Lunes abre 13:00–21:00; comprar show aparte si interesa.", recommendation: "Muy recomendable", bookingUrl: "https://hk.space.museum/en/web/spm/visit-and-facilities.html", sourceUrl: "https://hk.space.museum/en/web/spm/visit-and-facilities.html" },
  { id: "hk-ngong", city: "hongkong", day: "2026-12-08", time: "09:30", name: "Ngong Ping 360 + Big Buddha", category: "Naturaleza", image: "/attractions/hk-ngong.webp", description: "Teleférico, senderos y monasterio en Lantau. Elegir cabina estándar para valor o Crystal como upgrade, no ambas.", duration: 6, pricePerPerson: 37.8, priceLabel: "HKD295 adulto ida/vuelta estándar", status: "VERIFICADO", booking: "Reservar horario; operación sujeta a viento y mantenimiento.", recommendation: "Imprescindible", bookingUrl: "https://www.np360.com.hk/en/tickets-promotions/tickets-tours/cable-car-tickets", sourceUrl: "https://www.np360.com.hk/en/tickets-promotions/tickets-tours/cable-car-tickets" },
  { id: "hk-aqualuna", city: "hongkong", day: "2026-12-08", time: "19:30", name: "Aqua Luna · velero tradicional", category: "Vistas", image: "/attractions/hk-star.webp", description: "Navegación de unos 45 min en junco rojo por Victoria Harbour; pagar por la experiencia de barco, no por repetir Symphony of Lights.", duration: 1, pricePerPerson: 42, priceLabel: "Presupuesto HKD330 para salida nocturna", status: "ESTIMADO", booking: "Elegir muelle y hora exactos; llegar 15 min antes.", recommendation: "Opcional", bookingUrl: "https://aqualuna.com.hk/", sourceUrl: "https://aqualuna.com.hk/" },
  { id: "hk-palace", city: "hongkong", day: "2026-12-07", time: "14:00", name: "Hong Kong Palace Museum", category: "Cultura", image: "/attractions/hk-palace.jpg", description: "Arte y objetos imperiales en West Kowloon; alternativa al Space Museum si la familia prefiere historia y artes decorativas.", duration: 3, pricePerPerson: 9, priceLabel: "Presupuesto HKD70 entrada general", status: "ESTIMADO", booking: "Abre los lunes y cierra los martes. Elegir este museo o Space Museum para no saturar la tarde.", recommendation: "Opcional", bookingUrl: "https://www.hkpm.org.hk/en/visit/ticket", sourceUrl: "https://www.hkpm.org.hk/en/visit/ticket" },
  { id: "hk-disney", city: "hongkong", day: "2026-12-08", time: "09:30", name: "Hong Kong Disneyland", category: "Parque", image: "/attractions/hk-disney.jpg", description: "Día completo de parque; sustituye Ngong Ping y el crucero, no se debe apilar encima. Útil solo si es prioridad familiar.", duration: 10, pricePerPerson: 98.5, priceLabel: "Desde HKD769; tier del 8 dic aún por confirmar", status: "NO_PUBLICADO", booking: "Precio/calendario específico del 8 dic pendiente; requiere reserva de visita según el tipo de entrada.", recommendation: "Opcional", bookingUrl: "https://www.hongkongdisneyland.com/new-day-calendar/", sourceUrl: "https://www.hongkongdisneyland.com/new-day-calendar/" },

  { id: "sh-natural", city: "shanghai", day: "2026-11-26", time: "09:30", name: "Shanghai Natural History Museum", category: "Ciencia", image: "https://ak-d.tripcdn.com/images/0104012000erfslc677F3.jpg", description: "Cinco plantas con fósiles, esqueletos de dinosaurio, evolución y hábitats. Es una alternativa central al largo viaje hasta el Astronomy Museum, especialmente si se reduce Shanghái.", duration: 3, pricePerPerson: 4.2, priceLabel: "CNY30 adulto; descuentos infantiles dependen de edad/altura", status: "VERIFICADO", booking: "Cierra los lunes; la reserva se gestiona en el canal oficial y puede requerir pasaporte.", recommendation: "Muy recomendable", bookingUrl: "https://www.snhm.org.cn/", sourceUrl: "https://www.snhm.org.cn/cgfw_eg/cgzx.htm" },
  { id: "sh-museum-east", city: "shanghai", day: "2026-11-27", time: "10:00", name: "Shanghai Museum East", category: "Cultura", image: "https://images.smartshanghai.com.cn/uploads/compressed/2024/04/09/6cd83223-d6cc-4d48-9d5b-a87bb179593a.jpg.680.0.jpg", description: "Gran sede de Pudong para bronces, cerámica, caligrafía y arte chino. La visita funciona mejor escogiendo tres galerías, no intentando completar todo el edificio.", duration: 3, pricePerPerson: 0, priceLabel: "Colección permanente gratuita; especiales pueden cobrar", status: "VERIFICADO", booking: "Entrada individual sin reserva en la política vigente; llevar pasaporte físico y revisar exposiciones especiales.", recommendation: "Muy recomendable", bookingUrl: "https://www.shanghaimuseum.net/mu/frontend/pg/en/service/visit-east", sourceUrl: "https://www.shanghaimuseum.net/mu/frontend/pg/en/service/visit-east" },
  { id: "sh-maglev", city: "shanghai", day: "2026-12-09", time: "15:30", name: "Shanghai Maglev · viaje + museo", category: "Tecnología", image: "https://elsouvenir.com/wp-content/uploads/2021/06/Shanghai-Maglev-portada.-Foto.-Davids-Been-Here-1024x576.jpg", description: "Viaje real de levitación magnética entre Longyang Road y PVG, con pequeña exposición técnica en Longyang. Solo añadirlo si la hora del vuelo y el equipaje permiten el desvío.", duration: 2, pricePerPerson: 11.2, priceLabel: "CNY80 ida/vuelta Economy publicado", status: "VERIFICADO", booking: "No necesita una franja turística; comprar en estación y verificar horario/velocidad operativa del día.", recommendation: "Muy recomendable", bookingUrl: "https://www.smtdc.com/en/jszl.html", sourceUrl: "https://www.smtdc.com/en/jszl.html" },

  { id: "zjj-72", city: "zhangjiajie", day: "2026-12-01", time: "19:00", name: "72 Qilou · torres y shows nocturnos", category: "Espectáculo", image: "https://ak-d.tripcdn.com/images/1mi6m224x96cs3nwkA8B3_W_640_0_R5_Q80.jpg?proc=source%2Ftrip", description: "Complejo nocturno con arquitectura Tujia, música, danza, puestos de comida y proyecciones. Tiene más contenido activo que una simple parada fotográfica.", duration: 3, pricePerPerson: 12.3, priceLabel: "CNY88 pase nocturno 2026; tarifa diurna distinta", status: "VARIABLE", booking: "Comprar el tipo correcto según hora de entrada; confirmar programación de actuaciones de invierno.", recommendation: "Muy recomendable", bookingUrl: "https://us.trip.com/travel-guide/attraction/zhangjiajie/72-wonder-tower-135452452/", sourceUrl: "https://www.travelchinaguide.com/attraction/hunan/zhangjiajie/72-strange-buildings.htm" },
  { id: "zjj-baofeng-combo", city: "zhangjiajie", day: "2026-12-02", time: "08:30", name: "Baofeng Lake + Yellow Dragon Cave", category: "Naturaleza", image: "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cms/baefong-lake-1511252232-735X412.jpg", description: "Combo de barca entre picos y recorrido por cueva kárstica. Sirve como alternativa de clima a otra mañana de miradores, pero no debe sumarse encima de Yellow Dragon Cave por separado.", duration: 5.5, pricePerPerson: 28.25, priceLabel: "US$28.25 combo observado en Klook; puede cambiar", status: "VARIABLE", booking: "Elegir paquete que nombre expresamente lago, barca y cueva; revisar hora del vuelo/tren antes de comprar.", recommendation: "Opcional", bookingUrl: "https://www.klook.com/en-US/activity/6722-baofeng-lake-boat-ride-zhangjiajie/", sourceUrl: "https://www.klook.com/en-US/activity/6722-baofeng-lake-boat-ride-zhangjiajie/" },

  { id: "sz-seaworld-art", city: "shenzhen", day: "2026-12-04", time: "15:30", name: "Sea World Culture and Arts Center", category: "Cultura", image: "https://ak-d.tripcdn.com/images/100k16000000zpgy325B0.jpg", description: "Centro de diseño frente al mar con galerías, exposiciones digitales, teatro y espacios educativos. Conviene revisar qué muestra temporal estará abierta en diciembre.", duration: 3, pricePerPerson: 0, priceLabel: "Acceso al edificio gratuito; exposiciones temporales aparte", status: "VARIABLE", booking: "No comprar hasta ver la exposición de diciembre; el acceso general no requiere entrada.", recommendation: "Muy recomendable", bookingUrl: "https://www.eyeshenzhen.com/content/2023-05/12/content_30192680.htm", sourceUrl: "https://www.eyeshenzhen.com/content/2023-05/12/content_30192680.htm" },
  { id: "sz-dafen", city: "shenzhen", day: "2026-12-04", time: "14:00", name: "Dafen Oil Painting Village", category: "Cultura", image: "https://ak-d.tripcdn.com/images/1mh1012000m2r9y1t918F.webp", description: "Barrio-taller donde se observa el proceso de pintura, se puede encargar un retrato o comprar obra local. Priorizar talleres que permitan ver autor, materiales y precio final.", duration: 3, pricePerPerson: 0, priceLabel: "Acceso gratuito; talleres y encargos se cotizan", status: "VERIFICADO", booking: "Sin entrada general; negociar por escrito tamaño, técnica, plazo y embalaje antes de encargar.", recommendation: "Opcional", bookingUrl: "https://www.trip.com/travel-guide/attraction/shenzhen/dafen-oil-painting-village-83239/", sourceUrl: "https://www.trip.com/travel-guide/attraction/shenzhen/dafen-oil-painting-village-83239/" },

  { id: "mo-grand-prix", city: "macau", day: "2026-12-06", time: "10:00", name: "Macao Grand Prix Museum", category: "Tecnología", image: "https://www.flyhigh.travel/_next/image?q=75&url=https%3A%2F%2Fcmsflyhigh.s3.ap-south-1.amazonaws.com%2Fimages%2F1714561123533-GPM.jpg&w=640", description: "Cuatro plantas de autos y motos con simuladores, proyección 3D e instalaciones sobre ingeniería y la carrera urbana de Macao.", duration: 2.5, pricePerPerson: 9.9, priceLabel: "MOP80 adulto no residente; concesiones oficiales", status: "VERIFICADO", booking: "Comprar franja oficial; cierra los martes y puede aplicar control de aforo.", recommendation: "Imprescindible", bookingUrl: "https://mgpm.macaotourism.gov.mo/en/about/ticketing", sourceUrl: "https://mgpm.macaotourism.gov.mo/en/about/ticketing" },
  { id: "mo-2049", city: "macau", day: "2026-12-05", time: "15:00", name: "Macau 2049 · MGM Theater", category: "Espectáculo", image: "https://n.sinaimg.cn/sinakd20241216s/213/w2048h1365/20241216/fc37-240f7013cd5dc2ecc8eec6144039c1aa.jpg", description: "Show de Zhang Yimou que combina patrimonio cultural intangible, danza, sonido y tecnología de escenario. Es alternativa a House of Dancing Water si se prefiere cultura futurista.", duration: 1.4, pricePerPerson: 35.7, priceLabel: "MOP/HKD288 zona C oficial; categorías superiores cuestan más", status: "VARIABLE", booking: "La programación vigente muestra sesiones de miércoles a domingo; confirmar específicamente diciembre antes de pagar.", recommendation: "Muy recomendable", bookingUrl: "https://www.tickets.mgm.mo/macau2049", sourceUrl: "https://macau2049.mgm.mo/" },
  { id: "mo-lord-stow", city: "macau", day: "2026-12-06", time: "09:30", name: "Coloane + degustación en Lord Stow's", category: "Comida", image: "https://livingnomads.com/wp-content/uploads/2017/09/04/Lord-Stows-Bakery-in-Coloane.jpg", description: "Salida breve a Coloane para probar tartas de huevo en la panadería original y recorrer el pueblo. Es una experiencia de comida, no una excursión de compras.", duration: 2.5, pricePerPerson: 6, priceLabel: "Presupuesto de degustación; no es una entrada", status: "ESTIMADO", booking: "No requiere reserva; verificar horario de la sucursal original y pagar consumo aparte.", recommendation: "Muy recomendable", bookingUrl: "https://www.lordstow.com/", sourceUrl: "https://www.taipavillagemacau.com/directory/lordstowsbakery/" },

  { id: "hk-ocean-park", city: "hongkong", day: "2026-12-08", time: "09:30", name: "Ocean Park Hong Kong", category: "Parque", image: "https://image.kkday.com/v2/image/get/c_fit%2Cq_55%2Ct_webp%2Cw_960/s1.kkday.com/product_18071/20201217045912_kJNfi/jpg", description: "Día completo con cable car sobre la costa, acuario, animales y atracciones. Sustituye Disneyland o Ngong Ping; no se apila con ellos.", duration: 9, pricePerPerson: 61.88, priceLabel: "US$61.88 observado; tarifa oficial de la fecha pendiente", status: "NO_PUBLICADO", booking: "Comprar solo en web oficial o canal autorizado cuando aparezca el calendario del 8 dic.", recommendation: "Muy recomendable", bookingUrl: "https://www.oceanpark.com.hk/en/ticket-offer", sourceUrl: "https://www.oceanpark.com.hk/en" },
  { id: "hk-star-ferry", city: "hongkong", day: "2026-12-07", time: "17:30", name: "Star Ferry · Tsim Sha Tsui–Central", category: "Vistas", image: "https://images.unsplash.com/photo-1734780564557-34a380aa0d3c?auto=format&fit=crop&fm=jpg&q=80&w=1600", description: "Cruce corto en el ferry clásico para vivir el puerto desde el agua. Es transporte público real y una experiencia distintiva; no requiere un crucero caro.", duration: 0.5, pricePerPerson: 0.85, priceLabel: "HKD5 laborable / HKD6.5 fin de semana adulto", status: "VERIFICADO", booking: "Sin reserva; pagar en terminal y revisar la ruta operativa del día.", recommendation: "Imprescindible", bookingUrl: "https://www.starferry.com.hk/en/service", sourceUrl: "https://www.starferry.com.hk/en/service" },
  { id: "hk-temple-street", city: "hongkong", day: "2026-12-07", time: "19:00", name: "Temple Street · mercado nocturno y cena", category: "Comida", image: "https://media.timeout.com/images/105643791/1024/768/image.jpg", description: "Cena en puestos o restaurantes cercanos, mercado, artesanía y ambiente nocturno de Kowloon. Comparar precios y evitar artículos de marca dudosa.", duration: 2.5, pricePerPerson: 18, priceLabel: "Presupuesto de cena y snacks; acceso gratuito", status: "ESTIMADO", booking: "Sin reserva general; elegir restaurantes con precios visibles y pagar compras por separado.", recommendation: "Muy recomendable", bookingUrl: "https://www.discoverhongkong.com/eng/shopping/snag-the-best-bargain-souvenirs-at-hong-kong-s-street-markets.html", sourceUrl: "https://www.discoverhongkong.com/eng/shopping/snag-the-best-bargain-souvenirs-at-hong-kong-s-street-markets.html" },
];

export const attractions: Attraction[] = baseAttractions.map((item) => ({
  ...item,
  image: item.image.startsWith("https://") ? `/attractions/${item.id}.jpg` : item.image,
}));

export interface LocalPlan {
  id: string;
  city: CityId;
  name: string;
  groupPrice: number;
  status: EvidenceStatus;
  bestFor: string;
  details: string;
  luggage: string;
  sourceUrl: string;
}

export const localPlans: LocalPlan[] = [
  { id: "sh-public", city: "shanghai", name: "Metro + Maglev/airport bus", groupPrice: 65, status: "ESTIMADO", bestFor: "Presupuesto mínimo", details: "Transporte público casi todo el tiempo; más cambios y caminatas.", luggage: "No recomendado al llegar a las 20:25 con 5 maletas.", sourceUrl: "https://service.shmetro.com/en/" },
  { id: "sh-mix", city: "shanghai", name: "Van aeropuerto + metro/Didi", groupPrice: 120, status: "ESTIMADO", bestFor: "Mejor equilibrio", details: "Van en llegadas y al aeropuerto; metro para recorridos centrales y 2 Didi si llueve.", luggage: "Reservar vehículo que confirme 5 pasajeros + 5 maletas.", sourceUrl: "https://service.shmetro.com/en/" },
  { id: "sh-private", city: "shanghai", name: "Van privada en traslados y días", groupPrice: 310, status: "ESTIMADO", bestFor: "Máxima comodidad", details: "Van para aeropuerto y bloques principales; tráfico puede borrar la ventaja.", luggage: "Cómodo si el proveedor confirma volumen de maletero.", sourceUrl: "https://www.shairport.com/ensh/gdjt/index.html" },
  { id: "zjj-public", city: "zhangjiajie", name: "Buses + shuttles de los parques", groupPrice: 95, status: "ESTIMADO", bestFor: "Ahorro", details: "Bus entre Wulingyuan/ciudad y shuttles internos; requiere paciencia.", luggage: "Usar taxi/van solo los días de llegada y salida.", sourceUrl: "https://www.zhangjiajieguide.com/attractions/zhangjiajie-national-forest-park/getting-here.html" },
  { id: "zjj-mix", city: "zhangjiajie", name: "Van en traslados + shuttles oficiales", groupPrice: 280, status: "ESTIMADO", bestFor: "Recomendado", details: "Van DYG/hotel y Tianmen; transporte interno oficial dentro de parques.", luggage: "La van resuelve las 5 maletas en días críticos.", sourceUrl: "https://www.klook.com/en-US/destination/c161-zhangjiajie/4-transport/" },
  { id: "zjj-private", city: "zhangjiajie", name: "Van/chofer los 4 días", groupPrice: 520, status: "ESTIMADO", bestFor: "Flexibilidad por clima", details: "Chofer espera fuera de las zonas peatonales; no sustituye shuttles internos.", luggage: "Muy cómodo; pedir modelo y capacidad por escrito.", sourceUrl: "https://www.zhangjiajieguide.com/car-rental/" },
  { id: "sz-public", city: "shenzhen", name: "Metro", groupPrice: 45, status: "ESTIMADO", bestFor: "Compras ligeras", details: "Metro para Futian, Guangming y OCT; barato y rápido.", luggage: "No ideal en hora punta con compras grandes.", sourceUrl: "https://www.szmc.net/szmc_en" },
  { id: "sz-mix", city: "shenzhen", name: "Metro + 2 Didi para equipaje", groupPrice: 80, status: "ESTIMADO", bestFor: "Recomendado", details: "Metro durante el día; dos coches/6-seater para aeropuerto y cajas.", luggage: "Un coche normal no lleva 5 personas + 5 maletas.", sourceUrl: "https://www.szmc.net/szmc_en" },
  { id: "sz-private", city: "shenzhen", name: "Van privada", groupPrice: 260, status: "ESTIMADO", bestFor: "Compras voluminosas", details: "Útil al final del día de Huaqiangbei y hacia Shekou.", luggage: "Confirmar si se permiten cajas/electrónica grande.", sourceUrl: "https://www.szmc.net/szmc_en" },
  { id: "mo-public", city: "macau", name: "Bus + shuttles de hotel", groupPrice: 25, status: "VERIFICADO", bestFor: "Ahorro", details: "Bus público MOP6 por trayecto en efectivo; shuttles donde sean operativos.", luggage: "Difícil en bus con 5 maletas; usar taxi al hotel.", sourceUrl: "https://www.macaotourism.gov.mo/es/article/before-you-travel/local-transportation" },
  { id: "mo-mix", city: "macau", name: "Taxi + bus/shuttle", groupPrice: 55, status: "ESTIMADO", bestFor: "Recomendado", details: "Taxis para terminal/hotel y Cotai; bus o shuttle para tramos sin equipaje.", luggage: "Probablemente 2 taxis; no asumir que uno acepta todo.", sourceUrl: "https://www.macaotourism.gov.mo/es/article/before-you-travel/local-transportation" },
  { id: "mo-private", city: "macau", name: "Van privada 2 h + taxis", groupPrice: 160, status: "ESTIMADO", bestFor: "Una noche sin fricción", details: "Van reservada para terminal y ruta principal; resto en taxi.", luggage: "Pedir capacidad de maletero y zona de recogida exacta.", sourceUrl: "https://www2.turbojet.com.hk/bespoke-services/" },
  { id: "hk-public", city: "hongkong", name: "MTR + bus + Star Ferry", groupPrice: 95, status: "ESTIMADO", bestFor: "Ahorro", details: "Octopus/contactless en red pública; taxi solo en emergencia.", luggage: "Válido sin maletas; duro en transbordos de llegada/salida.", sourceUrl: "https://www.discoverhongkong.com/eng/travel-guide/traveller-essentials/getting-around.html" },
  { id: "hk-mix", city: "hongkong", name: "MTR/ferry + 2 taxis con maletas", groupPrice: 130, status: "ESTIMADO", bestFor: "Recomendado", details: "Transporte público para turismo; dos taxis en terminal y aeropuerto.", luggage: "Taxi urbano cobra HKD6 por pieza en maletero; presupuestado como reserva.", sourceUrl: "https://www.mtr.com.hk/en/customer/tickets/tf_index.html" },
  { id: "hk-private", city: "hongkong", name: "Van privada + MTR puntual", groupPrice: 340, status: "ESTIMADO", bestFor: "Confort", details: "Van en llegada/salida y un bloque de día; MTR cuando sea más rápido.", luggage: "Reservar 7/8 plazas con capacidad explícita para 5 maletas.", sourceUrl: "https://www.discoverhongkong.com/eng/travel-guide/traveller-essentials/getting-around.html" },
];

export interface TripDay {
  date: string;
  label: string;
  city: CityId | "transito";
  title: string;
  baseEvents: Array<{ time: string; title: string; note?: string; critical?: boolean }>;
}

export const tripDays: TripDay[] = [
  { date: "2026-11-24", label: "Mar 24 nov", city: "transito", title: "Salida de Nueva York", baseEvents: [{ time: "08:30", title: "Llegar a JFK", note: "Korean Air; vuelo comprado. Número y costo no aportados." }, { time: "12:00", title: "Salida JFK→Shanghái", note: "Con conexión según la reserva existente; no inventar número de vuelo." }] },
  { date: "2026-11-25", label: "Mié 25 nov", city: "shanghai", title: "Llegada y descanso", baseEvents: [{ time: "20:25", title: "Llegada a PVG", note: "Inmigración y 5 maletas: reservar 90 min." }, { time: "22:00", title: "Traslado al hotel", note: "Usar el plan local seleccionado." }, { time: "23:15", title: "Check‑in tardío", note: "Avisar por escrito al hotel y guardar confirmación.", critical: true }] },
  { date: "2026-11-26", label: "Jue 26 nov", city: "shanghai", title: "Ciencia y skyline", baseEvents: [{ time: "08:00", title: "Desayuno cerca del hotel" }, { time: "13:45", title: "Almuerzo en Lingang o Pudong" }, { time: "21:00", title: "Cena simple y regreso" }] },
  { date: "2026-11-27", label: "Vie 27 nov", city: "shanghai", title: "Arte digital y espectáculo", baseEvents: [{ time: "08:30", title: "Desayuno" }, { time: "13:30", title: "Almuerzo + descanso" }, { time: "17:30", title: "Cena temprana cerca de Circus World" }] },
  { date: "2026-11-28", label: "Sáb 28 nov", city: "zhangjiajie", title: "Traslado a Wulingyuan", baseEvents: [{ time: "07:15", title: "Salida del hotel", note: "La hora cambia si se elige tren." }, { time: "14:30", title: "Check‑in en Wulingyuan" }, { time: "18:00", title: "Cena de Hunan + preparar capas" }] },
  { date: "2026-11-29", label: "Dom 29 nov", city: "zhangjiajie", title: "Pilares de arenisca", baseEvents: [{ time: "06:45", title: "Desayuno y salida" }, { time: "12:30", title: "Almuerzo dentro del parque" }, { time: "18:30", title: "Cena y recuperación" }] },
  { date: "2026-11-30", label: "Lun 30 nov", city: "zhangjiajie", title: "Cañón y show", baseEvents: [{ time: "07:30", title: "Desayuno" }, { time: "14:30", title: "Regreso / descanso" }, { time: "17:45", title: "Cena temprana" }] },
  { date: "2026-12-01", label: "Mar 1 dic", city: "zhangjiajie", title: "Tianmen Mountain", baseEvents: [{ time: "06:30", title: "Salida Wulingyuan→ciudad" }, { time: "13:00", title: "Almuerzo según ruta" }, { time: "18:30", title: "Cena y hacer maletas" }] },
  { date: "2026-12-02", label: "Mié 2 dic", city: "shenzhen", title: "Mañana flexible y traslado", baseEvents: [{ time: "08:00", title: "Desayuno y check‑out" }, { time: "13:00", title: "Almuerzo + recoger equipaje" }, { time: "23:15", title: "Check‑in en Shenzhen", note: "Con vuelo; el tren cambia toda la secuencia." }] },
  { date: "2026-12-03", label: "Jue 3 dic", city: "shenzhen", title: "Día de compra tecnológica", baseEvents: [{ time: "08:30", title: "Desayuno + lista cerrada de modelos" }, { time: "13:00", title: "Almuerzo; no comprar impulsivamente" }, { time: "19:30", title: "Cena y registrar recibos/series" }] },
  { date: "2026-12-04", label: "Vie 4 dic", city: "shenzhen", title: "Ciencia, DJI o parque", baseEvents: [{ time: "08:00", title: "Desayuno" }, { time: "13:30", title: "Almuerzo y traslado" }, { time: "20:00", title: "Cena y cerrar equipaje" }] },
  { date: "2026-12-05", label: "Sáb 5 dic", city: "macau", title: "Macao: cultura y gran show", baseEvents: [{ time: "07:30", title: "Check‑out y traslado a Shekou" }, { time: "10:00", title: "Ferry/cruce seleccionado", note: "La hora exacta depende de la venta de diciembre." }, { time: "13:30", title: "Almuerzo macaense" }, { time: "17:30", title: "Check‑in/descanso y cena temprana" }] },
  { date: "2026-12-06", label: "Dom 6 dic", city: "hongkong", title: "Macao breve y llegada a Hong Kong", baseEvents: [{ time: "08:30", title: "Desayuno y check‑out" }, { time: "13:30", title: "Cruce a Hong Kong", note: "Ajustar según la actividad matutina y terminal." }, { time: "17:30", title: "Cena en Kowloon" }] },
  { date: "2026-12-07", label: "Lun 7 dic", city: "hongkong", title: "Vistas y ciencia", baseEvents: [{ time: "08:00", title: "Desayuno" }, { time: "12:00", title: "Dim sum" }, { time: "18:30", title: "Cena" }] },
  { date: "2026-12-08", label: "Mar 8 dic", city: "hongkong", title: "Lantau o Disneyland", baseEvents: [{ time: "08:00", title: "Desayuno" }, { time: "13:00", title: "Almuerzo según opción" }, { time: "21:00", title: "Volver y pesar maletas", critical: true }] },
  { date: "2026-12-09", label: "Mié 9 dic", city: "shanghai", title: "Regreso a Shanghái", baseEvents: [{ time: "06:15", title: "Salida del hotel con 5 maletas" }, { time: "14:30", title: "Check‑in final en Shanghái" }, { time: "18:30", title: "Cena de despedida" }, { time: "21:00", title: "Documentos y maletas cerradas", critical: true }] },
  { date: "2026-12-10", label: "Jue 10 dic", city: "transito", title: "Vuelo de regreso", baseEvents: [{ time: "09:00", title: "Desayuno y check‑out" }, { time: "10:00", title: "Salida hacia PVG", note: "Margen amplio para vuelo internacional." }, { time: "14:00", title: "PVG→JFK" }, { time: "19:30", title: "Llegada programada a JFK", note: "Mismo día por cambio horario." }] },
];

export const shoppingGuide = [
  { category: "Electrónica y componentes", bestCity: "Shenzhen · Huaqiangbei", when: "3 dic", action: "Comparar por la mañana, probar por la tarde y pedir factura con modelo/serie. Evitar accesorios sin certificación.", warning: "La garantía puede ser solo China; confirmar idioma, bandas, enchufe y devolución.", source: "https://www.eyeshenzhen.com/content/2025-07/03/content_31595461.htm" },
  { category: "Drones y cámaras DJI", bestCity: "Shenzhen · tienda oficial DJI", when: "4 dic", action: "Comprar solo en tienda oficial/autorizada si el precio y garantía regional convienen. Guardar batería y repuestos en cabina.", warning: "Baterías sueltas van en equipaje de mano; ≤100 Wh normalmente permitido. No volar el dron sin revisar reglas locales.", source: "https://www.dji.com/where-to-buy/flagship/cn-sz" },
  { category: "Moda accesible", bestCity: "Hong Kong · Sham Shui Po/Mong Kok o Shenzhen · Dongmen", when: "7–8 dic", action: "Dejar prendas voluminosas para Hong Kong, al final. En Shenzhen solo comprar si hay ventaja clara de talla/precio.", warning: "Probar tallas; políticas de devolución en mercados pueden ser limitadas.", source: "https://www.discoverhongkong.com/eng/explore/shopping.html" },
  { category: "Diseñador auténtico", bestCity: "Hong Kong · tiendas oficiales/outlets", when: "7–8 dic", action: "Usar boutiques o distribuidores autorizados y conservar recibos para aduana.", warning: "Comparar precio final con EE. UU.; no asumir ventaja fiscal.", source: "https://www.discoverhongkong.com/eng/explore/shopping.html" },
  { category: "Réplicas / falsificaciones", bestCity: "No recomendado", when: "—", action: "No comprar. Sustituir por marcas locales, segunda mano autenticada o diseño sin logotipo falso.", warning: "CBP puede incautar falsificaciones; la exención personal es limitada y no elimina el riesgo.", source: "https://www.cbp.gov/trade/fakegoodsrealdangers" },
  { category: "Souvenirs y comida envasada", bestCity: "Macao + Shanghái final", when: "5 y 9 dic", action: "Comprar piezas específicas de Macao allí; dejar regalos genéricos y empaquetado final para Shanghái.", warning: "Declarar alimentos; evitar carne, fruta fresca y productos sin etiqueta.", source: "https://www.cbp.gov/travel/us-citizens/know-before-you-go/prohibited-and-restricted-items" },
];

export const shoppingPlaces: Array<{
  city: CityId;
  name: string;
  specialty: string;
  area: string;
  buy: string;
  verify: string;
  timing: string;
  status: EvidenceStatus;
  source: string;
}> = [
  { city: "shenzhen", name: "SEG Electronics Market", specialty: "PC, RAM, SSD, placas, periféricos", area: "SEG Plaza · Huaqiangbei", buy: "Usar como primera ronda para comparar componentes nuevos con caja sellada; anotar modelo exacto, velocidad, capacidad y vendedor.", verify: "Probar RAM/SSD o exigir política de DOA por escrito. No asumir garantía internacional ni autenticidad por el empaque.", timing: "Primera mañana de Shenzhen", status: "VERIFICADO", source: "https://www.szft.gov.cn/en/life/shopping/content/post_12765323.html" },
  { city: "shenzhen", name: "Huaqiang Electronics World", specialty: "Chips, placas, conectores, reparación y piezas", area: "Huaqiang North Road", buy: "Mejor para componentes especializados, cables, herramientas y prototipado; llevar fotos y números de parte.", verify: "No es la mejor opción para un portátil terminado. Comparar tres vendedores y pedir factura con modelo/serie.", timing: "Después de SEG, mismo día", status: "VERIFICADO", source: "https://www.szft.gov.cn/en/life/shopping/content/post_12765323.html" },
  { city: "shenzhen", name: "DJI Flagship Store · OCT Harbour", specialty: "Drones, cámaras, baterías y repuestos DJI", area: "OCT Harbour / Nanshan", buy: "Comprar solo si la tienda confirma región de garantía, idioma de la app, activación y contenido exacto del combo.", verify: "Baterías sueltas van en cabina. Comparar el precio final con EE. UU. y revisar restricciones de vuelo en casa.", timing: "Última tarde tecnológica", status: "VERIFICADO", source: "https://www.dji.com/where-to-buy/flagship/cn-sz" },
  { city: "shenzhen", name: "Sundan · The MixC", specialty: "Electrónica de consumo con factura y tax refund", area: "The MixC / Luohu", buy: "Usar para teléfonos, audio y productos de marcas chinas cuando se prefiera una tienda formal a un puesto de mercado.", verify: "Confirmar que el artículo sea elegible para devolución de impuestos y que pueda salir de China sin uso dentro del plazo.", timing: "Segunda ronda, después de comparar", status: "VERIFICADO", source: "https://www.eyeshenzhen.com/content/2025-06/19/content_31604187.htm" },
  { city: "shenzhen", name: "Dongmen Market + Clothing City", specialty: "Ropa económica, zapatos, maletas y accesorios", area: "Dongmen Pedestrian Street / Luohu", buy: "Buscar prendas sin logotipos falsos, probar tallas y comparar dentro de Baima, Foreign Trade Clothing City y Junma.", verify: "La calidad y devolución varían por puesto. Revisar costuras, cremalleras y composición antes de pagar.", timing: "Tarde/noche; solo lo que tenga ventaja clara", status: "VERIFICADO", source: "https://www.eyeshenzhen.com/content/2016-09/20/content_13883055.htm" },
  { city: "shanghai", name: "Qipu Road Clothing Wholesale Market", specialty: "Moda económica y mayorista", area: "Qipu Road / Tiantong Road", buy: "Solo para una búsqueda dirigida de ropa barata sin marca. Comparar calidad y precio con Dongmen antes de cargar más equipaje.", verify: "Opiniones recientes son mixtas y hay riesgo de falsificaciones; retirarse ante presión de venta y no comprar marcas copiadas.", timing: "Solo si sobra tiempo el 9 dic", status: "VARIABLE", source: "https://goshopshanghai.com/sever-pu-road-197.html" },
  { city: "shanghai", name: "Nanjing East Road", specialty: "Marcas oficiales, grandes almacenes y regalos", area: "Nanjing East Road / People's Square", buy: "Útil para compras finales con recibo, tallas previsibles y empaquetado; no asumir que será más barato que EE. UU.", verify: "Comparar precio final, devolución y garantía. Priorizar tiendas oficiales.", timing: "Última tarde en Shanghái", status: "VERIFICADO", source: "https://www.meet-in-shanghai.net/en/huangpu-district/nanjing-road-856210/" },
  { city: "hongkong", name: "Golden Computer Centre & Arcade", specialty: "RAM, SSD, PC, gaming, software y periféricos", area: "Sham Shui Po · Fuk Wa Street", buy: "Buena segunda referencia después de Shenzhen para componentes con precios visibles y más tiendas establecidas.", verify: "Confirmar si el producto es distribución Hong Kong, garantía, voltaje y política por fallo al llegar.", timing: "Al final del viaje, antes de cerrar maletas", status: "VERIFICADO", source: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-golden-computer-centre-and-arcade.html" },
  { city: "hongkong", name: "Apliu Street", specialty: "Accesorios, cámaras usadas, audio, cables y piezas", area: "Sham Shui Po", buy: "Ideal para artículos pequeños, repuestos y segunda mano que se puedan inspeccionar en el momento.", verify: "No pagar precio de producto nuevo por equipo usado; probarlo y evitar baterías sin marca o sin Wh impreso.", timing: "Combinar con Golden Computer", status: "VERIFICADO", source: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-apliu-street.html" },
  { city: "hongkong", name: "Mong Kok Computer Centre", specialty: "Ordenadores, cámaras, almacenamiento y accesorios", area: "Nelson Street / Mong Kok", buy: "Alternativa compacta si el hotel está en Mong Kok y no se quiere ir a Sham Shui Po.", verify: "Comparar con Golden y tiendas oficiales; pedir recibo y número de serie.", timing: "Noche de Mong Kok", status: "VERIFICADO", source: "https://www.expedia.com/Mong-Kok-Computer-Centre-Mong-Kok.d6124677.Vacation-Attraction" },
  { city: "hongkong", name: "Citygate Outlets", specialty: "Ropa deportiva, infantil y diseñador con descuento", area: "Tung Chung · junto a MTR", buy: "La mejor parada de ropa de marca al final; hay más de 150 marcas y se combina con Ngong Ping o el aeropuerto.", verify: "Comprobar talla, condición outlet y política de cambio. No asumir 30–70% en cada artículo.", timing: "Día de Lantau, después del teleférico", status: "VERIFICADO", source: "https://www.citygateoutlets.com.hk/en/" },
  { city: "hongkong", name: "Sneakers Street · Fa Yuen Street", specialty: "Zapatillas y ropa deportiva", area: "Mong Kok", buy: "Comparar tiendas autorizadas para modelos actuales y ediciones especiales; se combina con Ladies' Market.", verify: "Pedir recibo, revisar ambas zapatillas y talla antes de salir. Evitar vendedores sin local para marcas caras.", timing: "Última noche de compras", status: "VERIFICADO", source: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-sneakers-street.html" },
  { city: "hongkong", name: "Ladies' Market", specialty: "Ropa barata, accesorios y souvenirs", area: "Tung Choi Street / Mong Kok", buy: "Útil para prendas sin marca y recuerdos pequeños; comparar varios puestos y negociar con calma.", verify: "Evitar logotipos falsos y revisar calidad. La devolución normalmente no existe.", timing: "Después de cenar en Kowloon", status: "VERIFICADO", source: "https://www.discoverhongkong.com/eng/shopping/snag-the-best-bargain-souvenirs-at-hong-kong-s-street-markets.html" },
  { city: "hongkong", name: "Temple Street Night Market", specialty: "Souvenirs, camisetas, artesanía y accesorios", area: "Jordan / Yau Ma Tei", buy: "Mejor como experiencia de cena y mercado que como destino de tecnología seria.", verify: "Comparar puestos, negociar y no comprar electrónica de alto valor ni marca dudosa.", timing: "Noche, al final del viaje", status: "VERIFICADO", source: "https://www.discoverhongkong.com/eng/shopping/snag-the-best-bargain-souvenirs-at-hong-kong-s-street-markets.html" },
  { city: "macau", name: "Lord Stow's Bakery", specialty: "Tartas de huevo y recuerdos gastronómicos", area: "Coloane / Taipa / Venetian", buy: "Comprar para consumir durante el viaje; la sucursal original de Coloane es la experiencia más distintiva.", verify: "No asumir que pastelería fresca puede entrar a EE. UU.; consumir antes del vuelo o revisar reglas de CBP.", timing: "Durante Macao, no como compra final", status: "VERIFICADO", source: "https://www.lordstow.com/" },
  { city: "zhangjiajie", name: "Wulingyuan · tiendas locales", specialty: "Té, bordados Tujia y recuerdos del parque", area: "Alrededor de la entrada este", buy: "Comprar solo una pieza específica con origen y precio claros; no cargar artesanía genérica durante el resto del viaje.", verify: "No se verificó una tienda única que justifique recomendarla. Comparar y evitar supuestas antigüedades o productos medicinales.", timing: "Última noche en Wulingyuan", status: "VARIABLE", source: "https://us.trip.com/moments/theme/destination-zhangjiajie-23-souvenirs-1005652/" },
];

export const luggageRules = [
  { mode: "Korean Air · JFK", rule: "Economy Saver: 1×23 kg; otras Economy hacia/desde Américas: 2×23 kg. Cabina: 1 pieza + objeto personal, 10 kg total.", action: "Revisar la clase tarifaria del billete comprado; no asumir 2 piezas si dice Saver.", source: "https://www.koreanair.com/contents/plan-your-travel/baggage/checked-baggage/free-baggage?hl=en" },
  { mode: "Trenes 12306", rule: "Adulto: 20 kg; cada pieza con suma de dimensiones ≤130 cm. No hay servicio de facturación en HSR.", action: "Cada persona debe poder mover su propia maleta por controles y andenes.", source: "https://www.highspeed.mtr.com.hk/en/guide/carriage-of-luggage.html" },
  { mode: "China Eastern", rule: "La tabla oficial ofrece 2×23 kg para Economy no branded en ciertas rutas; Basic depende del billete. Cabina máx. 55×40×20 cm.", action: "Leer la franquicia del vuelo HKG→PVG antes de pagar; usar la reserva de equipaje si no está incluida.", source: "https://www.ceair.com/global/en_USD/Announcement/BaggageService/FreeBaggageAllowanceandSpecifications/" },
  { mode: "Cotai Water Jet", rule: "1 pieza de mano ≤20 kg y 56×36×23 cm; hasta 2 facturadas con reserva antes de las 16:00 del día previo y cargo desde HKD25.", action: "Reservar las 5 maletas al comprar si se elige este ferry.", source: "https://www.cotaiwaterjet.com/ferry-schedule/hongkong-macau-taipa.html" },
  { mode: "Baterías / drones", rule: "Baterías de litio sueltas y power banks van solo en cabina; TSA admite normalmente hasta 100 Wh por batería.", action: "Proteger terminales, conservar etiqueta Wh y repartir baterías entre equipajes de mano.", source: "https://www.tsa.gov/travel/security-screening/whatcanibring/items/lithium-batteries-100-watt-hours-or-less-device" },
  { mode: "Compras al volver a EE. UU.", rule: "La exención personal habitual puede ser US$800; los artículos deben declararse y cumplir condiciones.", action: "Guardar recibos, sumar compras por persona y declarar si hay duda.", source: "https://www.cbp.gov/travel/us-citizens/know-before-you-go/know-you-go-traveling-abroad" },
];

export interface PackagePreset {
  id: "economy" | "value" | "comfort" | "premium";
  name: string;
  tagline: string;
  hotelIds: Record<CityId, string>;
  transportIds: Record<string, string>;
  localIds: Record<CityId, string>;
  attractionIds: string[];
  foodPerPersonDay: number;
  baggageReserve: number;
  gain: string;
  lose: string;
}

export const packages: PackagePreset[] = [
  {
    id: "economy", name: "Economy", tagline: "Dormir privado, moverse ligero y conservar los imprescindibles.",
    hotelIds: { shanghai: "sh-dayin", zhangjiajie: "zjj-destination", shenzhen: "sz-maker", macau: "mo-city", hongkong: "hk-meiho" },
    transportIds: { "sh-zjj": "sh-zjj-train", "zjj-sz": "zjj-sz-train", "sz-mo": "sz-mo-train", "mo-hk": "mo-hk-bus", "hk-sh": "hk-sh-train" },
    localIds: { shanghai: "sh-public", zhangjiajie: "zjj-public", shenzhen: "sz-public", macau: "mo-public", hongkong: "hk-public" },
    attractionIds: ["sh-astronomy", "sh-teamlab", "sh-cruise", "zjj-park", "zjj-bailong", "zjj-glass", "zjj-tianmen", "zjj-show", "sz-science", "sz-dji", "sz-hqb", "mo-old", "mo-tower", "hk-symphony", "hk-peak", "hk-space", "hk-ngong"],
    foodPerPersonDay: 28, baggageReserve: 350, gain: "Ahorro principal en alojamiento, trenes y transporte público.", lose: "Más traslados, habitaciones sencillas y se omiten ERA2, el show acuático y M+.",
  },
  {
    id: "value", name: "Value", tagline: "El mejor equilibrio para cinco personas y cinco maletas.",
    hotelIds: { shanghai: "sh-campanile", zhangjiajie: "zjj-hampton", shenzhen: "sz-atour", macau: "mo-casa", hongkong: "hk-eaton" },
    transportIds: { "sh-zjj": "sh-zjj-flight", "zjj-sz": "zjj-sz-flight", "sz-mo": "sz-mo-ferry", "mo-hk": "mo-hk-turbo", "hk-sh": "hk-sh-flight" },
    localIds: { shanghai: "sh-mix", zhangjiajie: "zjj-mix", shenzhen: "sz-mix", macau: "mo-mix", hongkong: "hk-mix" },
    attractionIds: ["sh-astronomy", "sh-teamlab", "sh-era", "sh-tower", "sh-cruise", "zjj-park", "zjj-bailong", "zjj-glass", "zjj-tianmen", "zjj-show", "sz-science", "sz-dji", "sz-hqb", "sz-ping", "mo-old", "mo-tower", "mo-water", "hk-symphony", "hk-peak", "hk-space", "hk-ngong", "hk-aqualuna"],
    foodPerPersonDay: 38, baggageReserve: 350, gain: "Vuelos donde ahorran tiempo, traslados mixtos y casi todas las experiencias fuertes.", lose: "Hoteles sin gran lujo y teamLab Macao/M+ quedan fuera.",
  },
  {
    id: "comfort", name: "Comfort", tagline: "Más espacio y experiencias, sin convertir cada traslado en una van.",
    hotelIds: { shanghai: "sh-ssaw", zhangjiajie: "zjj-pullman", shenzhen: "sz-huaqiang", macau: "mo-harbour", hongkong: "hk-salisbury" },
    transportIds: { "sh-zjj": "sh-zjj-flight", "zjj-sz": "zjj-sz-flight", "sz-mo": "sz-mo-ferry", "mo-hk": "mo-hk-turbo", "hk-sh": "hk-sh-flight" },
    localIds: { shanghai: "sh-mix", zhangjiajie: "zjj-private", shenzhen: "sz-mix", macau: "mo-mix", hongkong: "hk-mix" },
    attractionIds: ["sh-astronomy", "sh-teamlab", "sh-era", "sh-tower", "sh-cruise", "sh-yu", "zjj-park", "zjj-bailong", "zjj-glass", "zjj-tianmen", "zjj-show", "sz-science", "sz-dji", "sz-hqb", "sz-ping", "mo-old", "mo-tower", "mo-water", "mo-teamlab", "hk-symphony", "hk-peak", "hk-space", "hk-ngong", "hk-aqualuna"],
    foodPerPersonDay: 50, baggageReserve: 300, gain: "Mejores ubicaciones, más flexibilidad en Zhangjiajie y todas las experiencias prioritarias.", lose: "Sigue usando transporte público cuando es más rápido; no es lujo pleno.",
  },
  {
    id: "premium", name: "Premium", tagline: "Punto de partida: el itinerario actual, mejor organizado y verificable.",
    hotelIds: { shanghai: "sh-golden", zhangjiajie: "zjj-hilton", shenzhen: "sz-huaqiang", macau: "mo-casa", hongkong: "hk-dorsett" },
    transportIds: { "sh-zjj": "sh-zjj-flight", "zjj-sz": "zjj-sz-flight", "sz-mo": "sz-mo-ferry", "mo-hk": "mo-hk-turbo", "hk-sh": "hk-sh-flight" },
    localIds: { shanghai: "sh-private", zhangjiajie: "zjj-private", shenzhen: "sz-private", macau: "mo-private", hongkong: "hk-private" },
    attractionIds: ["sh-astronomy", "sh-teamlab", "sh-era", "sh-tower", "sh-cruise", "sh-yu", "zjj-park", "zjj-bailong", "zjj-glass", "zjj-tianmen", "zjj-show", "sz-science", "sz-dji", "sz-hqb", "sz-ping", "mo-old", "mo-tower", "mo-water", "mo-teamlab", "hk-symphony", "hk-peak", "hk-space", "hk-ngong", "hk-aqualuna"],
    foodPerPersonDay: 65, baggageReserve: 300, gain: "Menos fricción, traslados privados y presupuesto amplio de comida.", lose: "Paga vans incluso donde metro/ferry es más eficiente; los hoteles actuales no son los más lujosos de cada ciudad.",
  },
];

export const defaultPackage = packages.find((item) => item.id === "premium")!;

export const importantSources = [
  { label: "12306 · trenes oficiales", url: "https://www.12306.cn/en/" },
  { label: "MTR · equipaje HSR", url: "https://www.highspeed.mtr.com.hk/en/guide/carriage-of-luggage.html" },
  { label: "TurboJET · horarios", url: "https://www2.turbojet.com.hk/travel-with-us-sea-ferry/" },
  { label: "Cotai Water Jet", url: "https://www.cotaiwaterjet.com/ferry-schedule/hongkong-macau-taipa.html" },
  { label: "China Eastern · equipaje", url: "https://www.ceair.com/global/en_USD/Announcement/BaggageService/FreeBaggageAllowanceandSpecifications/" },
  { label: "Korean Air · equipaje", url: "https://www.koreanair.com/contents/plan-your-travel/baggage/checked-baggage/free-baggage?hl=en" },
];
