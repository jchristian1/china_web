export type CityId = "shanghai" | "zhangjiajie" | "shenzhen" | "macau" | "hongkong";
export type EvidenceStatus = "VERIFICADO" | "ESTIMADO" | "NO_PUBLICADO" | "VARIABLE";
export type BookingState = "RESERVADO" | "LISTO" | "ESPERANDO" | "OPCIONAL";

export const TRAVELERS = 5;
export const TRIP_DAYS = 16;
export const UPDATED_AT = "31 ago 2026";

export const cities: Array<{ id: CityId; name: string; dates: string; nights: number }> = [
  { id: "shanghai", name: "Shanghái", dates: "25–28 nov + 9–10 dic", nights: 4 },
  { id: "zhangjiajie", name: "Zhangjiajie", dates: "28 nov–2 dic", nights: 4 },
  { id: "shenzhen", name: "Shenzhen", dates: "2–5 dic", nights: 3 },
  { id: "macau", name: "Macao", dates: "5–6 dic", nights: 1 },
  { id: "hongkong", name: "Hong Kong", dates: "6–9 dic", nights: 3 },
];

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

export const hotels: HotelOption[] = [
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
      { id: "zjj-sz-flight", mode: "Vuelo", name: "Suparna Y87574 · DYG→SZX", schedule: "Patrón vigente mié/vie/dom: 19:40–21:45", doorToDoor: "≈6 h hotel→hotel", groupPrice: 575, priceNote: "$115 p/p de presupuesto; tarifa y equipaje variables.", status: "VARIABLE", statusNote: "El 2 dic 2026 cae miércoles y coincide con el patrón actual; reconfirmar operación.", luggage: "Fuentes comerciales indican franquicia Economy, pero no hay tabla oficial accesible: verificar en la tarifa.", comfort: "3/5", pros: ["Protege la mañana", "Ahorra 2–4 horas"], cons: ["Llegada tarde", "Operador con menos frecuencias"], bookingUrl: "https://www.google.com/travel/flights?q=Flights%20from%20DYG%20to%20SZX%20on%202026-12-02", sourceUrl: "https://www.wego.com/schedules/dyg/szx/flight-schedules-from-zhangjiajie-to-shenzhen", recommended: true },
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

export const attractions: Attraction[] = [
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
];

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
