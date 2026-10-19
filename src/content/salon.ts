export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  width: number;
  height: number;
  credit?: {
    name: string;
    url: string;
  };
  sample: boolean;
};

export const salon = {
  name: "Alejandra Peinados",
  monogram: "AP",
  location: {
    street: "Av. 20 de Junio 467",
    postalCode: "S2252",
    city: "Gálvez",
    province: "Santa Fe",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.%2020%20de%20Junio%20467%2C%20S2252%2C%20G%C3%A1lvez%2C%20Santa%20Fe%2C%20Argentina",
  },
  instagramUrl: "https://www.instagram.com/alecesanopelu/",
  whatsappNumber: "5493404500495",
  whatsappConfirmed: true,
  heroImage: {
    src: "/images/hero-hair.jpg",
    alt: "Fotografía de muestra de una mujer con cabello largo y rubio en un salón.",
    width: 1800,
    height: 2700,
    credit: {
      name: "Joseilson De lima",
      url: "https://www.pexels.com/photo/smiling-woman-with-long-blonde-hair-in-salon-36784893/",
    },
    sample: true,
  },
} as const;

export const services = [
  { id: "cortes", name: "Cortes" },
  { id: "coloracion", name: "Coloración" },
  { id: "mechas", name: "Mechas" },
  { id: "peinados-eventos", name: "Peinados para eventos" },
  { id: "tratamientos", name: "Tratamientos" },
  { id: "iluminaciones", name: "Iluminaciones" },
  { id: "nutricion", name: "Nutrición" },
  { id: "pdo", name: "PDO" },
  { id: "alisados", name: "Alisados" },
] as const;

export const galleryImages: GalleryImage[] = [
  {
    id: "coloracion",
    src: "/images/gallery-01.jpg",
    alt: "Fotografía de muestra de una colorista aplicando color en el cabello de una clienta.",
    title: "Coloración",
    category: "Coloración",
    width: 1200,
    height: 1800,
    credit: {
      name: "cottonbro studio",
      url: "https://www.pexels.com/photo/woman-getting-her-hair-color-3993324/",
    },
    sample: true,
  },
  {
    id: "corte-en-capas",
    src: "/images/gallery-02.jpg",
    alt: "Fotografía de muestra de una mujer con un corte largo en capas, en un salón.",
    title: "Corte en capas",
    category: "Cortes",
    width: 1200,
    height: 1800,
    credit: {
      name: "TONI&GUY PONDICHERRY",
      url: "https://www.pexels.com/photo/young-woman-with-a-layered-haircut-sitting-in-a-hair-salon-18367694/",
    },
    sample: true,
  },
  {
    id: "peinados",
    src: "/images/gallery-03.jpg",
    alt: "Fotografía de muestra de una estilista trabajando el cabello de una clienta en el salón.",
    title: "Peinados",
    category: "Peinados para eventos",
    width: 1200,
    height: 1500,
    credit: {
      name: "Critical Smith",
      url: "https://www.pexels.com/photo/woman-getting-hair-styled-at-salon-36587244/",
    },
    sample: true,
  },
  {
    id: "iluminaciones",
    src: "/images/gallery-04.jpg",
    alt: "Fotografía de muestra de una estilista aplicando color y mechas en el cabello.",
    title: "Mechas e iluminaciones",
    category: "Mechas",
    width: 1200,
    height: 1800,
    credit: {
      name: "Nataliya Vaitkevich",
      url: "https://www.pexels.com/photo/a-woman-having-her-hair-dyed-8468038/",
    },
    sample: true,
  },
  {
    id: "cabello-largo",
    src: "/images/gallery-05.jpg",
    alt: "Fotografía de muestra de una mujer con cabello largo y oscuro en un salón.",
    title: "Cabello largo",
    category: "Peinados",
    width: 1200,
    height: 1800,
    credit: {
      name: "TONI&GUY PONDICHERRY",
      url: "https://www.pexels.com/photo/smiling-brunette-woman-17163935/",
    },
    sample: true,
  },
];

export function getWhatsAppUrl(
  message = "Hola, Alejandra. Quisiera consultar por un turno.",
): string {
  const url = new URL(`https://wa.me/${salon.whatsappNumber}`);
  url.searchParams.set("text", message);
  return url.toString();
}
