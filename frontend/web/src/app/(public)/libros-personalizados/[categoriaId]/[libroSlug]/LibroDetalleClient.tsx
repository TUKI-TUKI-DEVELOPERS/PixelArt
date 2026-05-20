"use client";

import { useState } from "react";
import Link from "next/link";
import MaternalSkyBackground from "@/components/backgrounds/MaternalSkyBackground";
import WizardSection from "./WizardSection";
import BookCard from "@/components/Home/BookCard";
import type { BookCategory } from "@/components/Home/NuestrosLibrosSection";
import { getAssetUrl } from "@/lib/assetUrl";
import { useWindowSize } from "@/hooks/useWindowSize";

/* ── Miniaturas por slug ── */
const SLUG_THUMBNAIL: Record<string, string> = {
  "10-razones-por-las-que-te-amo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png",
  "mi-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png",
  "1025-dias-enamorandome-de-ti": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png",
  "nuestro-angel-de-4-patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png",
  "aventura-entre-patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Miniatura.png",
  "mi-amigo-miauravilloso": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png",
  "mi-mejor-amigo-del-mundo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png",
  "papa-mi-heroe": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png",
  "mama-mi-heroina": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
  "te-amo-abuelo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png",
  "te-amo-abuela": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png",
  "el-mejor-equipo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png",
  "la-familia": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png",
  "gracias-por-tu-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_GraciasPorTuAmor_Miniatura.png",
  "mi-angel-guardian": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
  "siempre-en-mi-corazon": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png",
  "siempre-seras-parte-de-mi": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Miniatura.png",
};

/* ── Datos de libros ── */

type LibroInfo = {
  nombre: string;
  subtitulo: string;
  tagline: string;
  descripcionCorta: string;
  bullets: string[];
  caracteristicas: { label: string; value: string }[];
  precio: { desde: string };
  reviewCount: number;
  accent: string;
};

const LIBROS_INFO: Record<string, LibroInfo> = {
  "1025-dias-enamorandome-de-ti": {
    nombre: "1025 Días Enamorándome De Ti",
    subtitulo: "Libro Personalizado de AMOR",
    tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS",
    descripcionCorta:
      "Idea de regalo lleno de amor para parejas:",
    bullets: [
      "Crea un libro de historias único para dos personas que se aman: novios, esposos o esa pareja especial.",
      "Momentos cotidianos, recuerdos inolvidables: Sigue a la pareja en escenas llenas de cariño, detalles románticos y situaciones del día a día con las que cualquiera se identifica.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 180,
    accent: "#dc4b89",
  },
  "10-razones-por-las-que-te-amo": {
    nombre: "10 o 15 Razones Por Las Que Te Amo",
    subtitulo: "Libro Personalizado de AMOR",
    tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE TÚ Y YO",
    descripcionCorta:
      "Idea de regalo lleno de amor para parejas:",
    bullets: [
      "Celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos que hacen que tu relación sea única.",
      "Cada plantilla representa un momento especial de la vida en pareja que hace que el amor crezca cada día.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 200,
    accent: "#dc4b89",
  },
  "mi-amor": {
    nombre: "Mi Amor",
    subtitulo: "Libro Personalizado de AMOR",
    tagline: "ERES MI INSPIRACIÓN INFINITA",
    descripcionCorta:
      "Idea de regalo lleno de amor para parejas:",
    bullets: [
      "Describe al ser amado de manera única y especial con metáforas visuales impactantes.",
      "Cada plantilla transforma al destinatario en un personaje poderoso, romántico o inspirador.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 150,
    accent: "#dc4b89",
  },
  "papa-mi-heroe": {
    nombre: "Papá, Mi Héroe",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE",
    descripcionCorta:
      "Crea el homenaje más hermoso para papá:",
    bullets: [
      "Un libro donde una hija celebra a su padre, reconociendo todo lo que lo hace especial.",
      "Cada página captura momentos únicos, enseñanzas y recuerdos que fortalecen el vínculo padre-hijo.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 185,
    accent: "#2b86bf",
  },
  "te-amo-abuelo": {
    nombre: "Te Amo, Abuelo",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO QUE RECORDAR",
    descripcionCorta:
      "Crea el homenaje más hermoso para el abuelo:",
    bullets: [
      "Un libro que honra el vínculo sagrado entre abuelos y nietos, capturando la sabiduría y ternura compartida.",
      "Cada plantilla recrea los mejores recuerdos junto al abuelo, desde historias hasta aventuras familiares.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 185,
    accent: "#f0b02a",
  },
  "el-mejor-equipo": {
    nombre: "El Mejor Equipo",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO",
    descripcionCorta:
      "Crea el homenaje más hermoso entre hermanos:",
    bullets: [
      "Un libro que celebra el vínculo entre hermanos, capturando las aventuras, risas y complicidad que los hacen un equipo único.",
      "Cada plantilla representa momentos especiales de la relación entre hermanos que perdurarán para siempre.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 180,
    accent: "#2b86bf",
  },
  "la-familia": {
    nombre: "La Familia",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR",
    descripcionCorta:
      "Crea el homenaje más hermoso para tu familia:",
    bullets: [
      "Un libro que celebra la unión familiar, capturando los momentos que hacen de tu familia algo único e irrepetible.",
      "Desde reuniones hasta tradiciones, cada página refleja el amor que los mantiene unidos.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 170,
    accent: "#88c343",
  },
  "te-amo-abuela": {
    nombre: "Te Amo, Abuela",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA",
    descripcionCorta:
      "Crea el homenaje más hermoso para la abuela:",
    bullets: [
      "Un libro que celebra el amor incondicional de una abuela, capturando su ternura y el calor de su presencia.",
      "Cada plantilla recrea los momentos más tiernos y las historias que solo una abuela puede contar.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 90,
    accent: "#ea6f29",
  },
  "mama-mi-heroina": {
    nombre: "Mamá, Mi Heroína",
    subtitulo: "Libro Personalizado de Familia",
    tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE",
    descripcionCorta:
      "Crea el homenaje más hermoso para mamá:",
    bullets: [
      "Un libro donde celebras a tu mamá, reconociendo su fuerza, amor y todo lo que la hace extraordinaria.",
      "Cada página es un tributo a los sacrificios, sonrisas y abrazos que hacen de mamá la mejor heroína.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 182,
    accent: "#44b9b1",
  },
  "siempre-seras-parte-de-mi": {
    nombre: "Siempre Serás Parte de Mi Corazón",
    subtitulo: "Libro Memorial Personalizado",
    tagline: "PORQUE NUESTRO VÍNCULO ES ETERNO",
    descripcionCorta:
      "El homenaje a ese lazo que ninguna distancia puede romper:",
    bullets: [
      "Un libro que celebra la complicidad, las aventuras compartidas y ese vínculo único que los une para siempre.",
      "Cada página honra los momentos que los hicieron cómplices, compañeros y el mejor equipo del mundo.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 0,
    accent: "#8b6bb1",
  },
  "siempre-en-mi-corazon": {
    nombre: "Siempre en mi Corazón",
    subtitulo: "Libro Memorial Personalizado",
    tagline: "PORQUE TU RECUERDO VIVE EN CADA LATIDO",
    descripcionCorta:
      "El homenaje más hermoso para quien siempre estará en tu corazón:",
    bullets: [
      "Un libro que honra el legado de ese ser querido que partió pero dejó una huella imborrable en tu vida.",
      "Cada página celebra sus virtudes, su sabiduría y los momentos únicos que compartieron juntos.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 0,
    accent: "#8b6bb1",
  },
  "mi-angel-guardian": {
    nombre: "Mi Ángel Guardián",
    subtitulo: "Libro Memorial Personalizado",
    tagline: "PORQUE TU LUZ SIGUE BRILLANDO EN MÍ",
    descripcionCorta:
      "El homenaje más hermoso para quien fue tu guía y tu fuerza:",
    bullets: [
      "Un libro que celebra a esa persona especial que te protegió, te guió y dejó una huella imborrable en tu corazón.",
      "Cada página honra quién fue, todo lo que significó para vos y el amor que sigue vivo en cada recuerdo.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 0,
    accent: "#8b6bb1",
  },
  "gracias-por-tu-amor": {
    nombre: "Gracias por tu amor",
    subtitulo: "Libro Memorial Personalizado",
    tagline: "PORQUE SIEMPRE SERÁS PARTE DE MÍ",
    descripcionCorta:
      "El homenaje más hermoso para quien nunca olvidarás:",
    bullets: [
      "Un libro que honra los momentos únicos que compartieron juntos: las risas, las aventuras y el amor que dejó una huella imborrable.",
      "Cada página celebra quién fue esa persona especial y lo que significó para vos.",
    ],
    caracteristicas: [
      { label: "Páginas", value: "10 a 15" },
      { label: "Tamaño", value: "29 × 20 cm" },
      { label: "Tapa", value: "Delgada / Gruesa" },
      { label: "Material", value: "Hoja couché 200 gr Gloss" },
    ],
    precio: { desde: "S/ 130" },
    reviewCount: 0,
    accent: "#8b6bb1",
  },
};

const DEFAULT_INFO: LibroInfo = {
  nombre: "Libro Personalizado",
  subtitulo: "Libro Personalizado",
  tagline: "",
  descripcionCorta: "Idea de regalo personalizado:",
  bullets: [
    "Crea un libro de historias único y especial para esa persona que más quieres.",
    "Personaliza cada detalle con tus fotos e historias.",
  ],
  caracteristicas: [
    { label: "Páginas", value: "10 a 15" },
    { label: "Tamaño", value: "29 × 20 cm" },
    { label: "Tapa", value: "Delgada / Gruesa" },
    { label: "Material", value: "Hoja couché 200 gr Gloss" },
  ],
  precio: { desde: "S/ 130" },
  reviewCount: 100,
  accent: "#dc4b89",
};

/* ── Libros relacionados por categoría ── */
const CATEGORIA_TO_BOOK_CATEGORY: Record<string, BookCategory> = {
  "libros-de-amor":                "love",
  "libros-de-mascotas":            "pets",
  "libros-de-familia":             "family",
  "libros-de-memorias-familiares": "memories",
};

type RelatedBook = { name: string; slug: string; reviews: number; tagline: string };

const RELATED_BOOKS: Record<string, RelatedBook[]> = {
  "libros-de-amor": [
    { name: "10 Razones Por Las Que Te Amo", slug: "10-razones-por-las-que-te-amo", reviews: 200, tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE" },
    { name: "Mi Amor", slug: "mi-amor", reviews: 150, tagline: "ERES MI INSPIRACIÓN INFINITA" },
    { name: "1025 Días Enamorándome De Ti", slug: "1025-dias-enamorandome-de-ti", reviews: 180, tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS" },
  ],
  "libros-de-mascotas": [
    { name: "Nuestro Ángel de 4 Patas", slug: "nuestro-angel-de-4-patas", reviews: 188, tagline: "SU HUELLA QUEDÓ PARA SIEMPRE EN TU CORAZÓN" },
    { name: "Aventura Entre Patas", slug: "aventura-entre-patas", reviews: 150, tagline: "CELEBRA TUS AVENTURAS JUNTO A TU PELUDO AMIGO" },
    { name: "Mi Amigo Miauravilloso", slug: "mi-amigo-miauravilloso", reviews: 188, tagline: "PARA TU GUARDIAN MISTICO" },
    { name: "Mi Mejor Amigo del Mundo", slug: "mi-mejor-amigo-del-mundo", reviews: 90, tagline: "ERES MI COMPAÑERO FIEL" },
  ],
  "libros-de-familia": [
    { name: "Papá, Mi Héroe", slug: "papa-mi-heroe", reviews: 185, tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE" },
    { name: "Mamá, Mi Heroína", slug: "mama-mi-heroina", reviews: 182, tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE" },
    { name: "Te Amo, Abuelo", slug: "te-amo-abuelo", reviews: 185, tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO" },
    { name: "Te Amo, Abuela", slug: "te-amo-abuela", reviews: 90, tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA" },
    { name: "La Familia", slug: "la-familia", reviews: 170, tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR" },
    { name: "El Mejor Equipo", slug: "el-mejor-equipo", reviews: 180, tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO" },
  ],
  "libros-de-memorias-familiares": [
    { name: "Gracias por tu amor", slug: "gracias-por-tu-amor", reviews: 0, tagline: "PORQUE SIEMPRE SERÁS PARTE DE MÍ" },
    { name: "Mi Ángel Guardián", slug: "mi-angel-guardian", reviews: 0, tagline: "PORQUE TU LUZ SIGUE BRILLANDO EN MÍ" },
    { name: "Siempre en mi Corazón", slug: "siempre-en-mi-corazon", reviews: 0, tagline: "PORQUE TU RECUERDO VIVE EN CADA LATIDO" },
    { name: "Siempre Serás Parte de Mi Corazón", slug: "siempre-seras-parte-de-mi", reviews: 0, tagline: "PORQUE NUESTRO VÍNCULO ES ETERNO" },
  ],
};

const RELATED_SECTION_TITLE: Record<string, string> = {
  "libros-de-amor":                "OTROS LIBROS QUE TE VAN A ENAMORAR",
  "libros-de-mascotas":            "MÁS LIBROS PARA TU PELUDO",
  "libros-de-familia":             "MÁS LIBROS PARA TU FAMILIA",
  "libros-de-memorias-familiares": "MÁS LIBROS DE MEMORIAS",
};

/* ── Wizard Steps ── */
/* ── FAQ ── */
type FaqEntry = { question: string; answer: string };

type CategoryFaq = {
  tituloBase: string;
  tituloDestacado: string;
  subtitulo: string;
  items: FaqEntry[];
};

const FAQ_BY_CATEGORY: Record<string, CategoryFaq> = {
  "libros-de-amor": {
    tituloBase: "El regalo perfecto",
    tituloDestacado: "para él o ella",
    subtitulo: "Todo lo que necesitas saber antes de sorprender a tu persona especial.",
    items: [
      {
        question: "¿Este es el único libro personalizado para dedicarle a mi pareja?",
        answer: 'No, tenemos varios modelos de libros de amor. Este es uno de los más populares, pero puedes explorar otros como "10 Razones por las que Te Amo" o "Mi Amor" en nuestra sección de Libros de Amor.',
      },
      {
        question: "¿Puedo realizar toda la personalización antes de realizar el pago?",
        answer: "Sí, puedes completar todos los pasos de personalización (subir fotos, elegir escenarios, escribir dedicatoria y elegir portada) antes de realizar cualquier pago. Solo pagas cuando estés completamente satisfecho con el resultado.",
      },
      {
        question: "¿Si pertenezco a la comunidad LGTBQ es posible dedicar un libro?",
        answer: "¡Por supuesto! En PixelArt celebramos el amor en todas sus formas. Nuestros libros personalizados están diseñados para cualquier pareja, sin importar su orientación. El amor es universal y merece ser celebrado.",
      },
    ],
  },
  "libros-de-mascotas": {
    tituloBase: "El regalo perfecto",
    tituloDestacado: "para tu mascota",
    subtitulo: "Porque su huella en tu corazón merece vivir para siempre en un libro.",
    items: [
      {
        question: "¿Puedo usar fotos de mi mascota para personalizar el libro?",
        answer: "Sí, ese es el corazón del libro. Subes las fotos de tu compañero y nuestra IA las integra en escenas únicas diseñadas especialmente para este libro. Cada página refleja su personalidad.",
      },
      {
        question: "¿El libro es solo para perros o también para gatos y otras mascotas?",
        answer: "Funciona para cualquier mascota: perros, gatos, conejos, aves y más. La IA adapta las escenas para que tu compañero se vea natural y adorable en cada página.",
      },
      {
        question: "¿Puedo dedicarlo a una mascota que ya falleció?",
        answer: "Sí, y es uno de los usos más emotivos de este libro. Si tienes fotos de tu mascota, podemos crear un tributo hermoso para honrar su memoria y mantenerla siempre presente.",
      },
    ],
  },
  "libros-de-familia": {
    tituloBase: "El regalo perfecto para",
    tituloDestacado: "compartir en familia",
    subtitulo: "Un libro que une generaciones y convierte los recuerdos en algo que dura para siempre.",
    items: [
      {
        question: "¿Puedo incluir a varios miembros de la familia en el libro?",
        answer: "Sí. Puedes subir fotos de toda la familia y el libro se construye en torno a esa historia compartida. Es ideal para celebrar reuniones, aniversarios o simplemente el amor cotidiano de estar juntos.",
      },
      {
        question: "¿Es un buen regalo para el Día de la Madre o el Día del Padre?",
        answer: "Es uno de los regalos más valorados en esas fechas. Un libro personalizado con fotos reales dice mucho más que cualquier regalo convencional. Demuestra cuánto los conoces y cuánto los quieres.",
      },
      {
        question: "¿Lo pueden disfrutar también los abuelos?",
        answer: "¡Absolutamente! Los abuelos suelen ser quienes más atesoran este tipo de regalo. Un libro con fotos de nietos, hijos y momentos familiares se convierte en uno de sus objetos más preciados.",
      },
    ],
  },
  "libros-de-memorias-familiares": {
    tituloBase: "Un homenaje eterno para quien",
    tituloDestacado: "siempre vivirá en tu corazón",
    subtitulo: "Porque algunas personas dejan una huella tan profunda que merecen ser recordadas con la misma intensidad con la que fueron amadas.",
    items: [
      {
        question: "¿Puedo dedicar el libro a alguien que ya no está?",
        answer: "Sí. Este libro nació precisamente para eso. Si tienes fotos de esa persona especial, podemos crear un homenaje lleno de amor, con escenas que capturan su esencia y mantienen su recuerdo vivo para siempre.",
      },
      {
        question: "¿Es posible incluir mensajes o dedicatorias de varios familiares?",
        answer: "Durante la personalización puedes escribir dedicatorias y textos que reflejen el amor de toda la familia. Es una forma hermosa de crear un testimonio colectivo del impacto que esa persona tuvo en sus vidas.",
      },
      {
        question: "¿Cuánto tiempo tarda en llegar después de hacer el pedido?",
        answer: "El envío se realiza en un plazo de 5 a 7 días hábiles a todo el Perú, con seguimiento en tiempo real desde nuestra planta de impresión hasta tu puerta.",
      },
    ],
  },
};


/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */

type VariantProp = { id: number; coverType: string; basePriceCents: number };
type TemplateProp = { id: number; name: string | null; previewUrl: string };
type DbIdsProp = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number } | null;

type Props = {
  categoriaSlug: string;
  libroSlug: string;
  libroNombre: string;
  backgroundUrl?: string | null;
  carouselImageUrls?: string[];
  dbIds?: DbIdsProp;
  variants?: VariantProp[];
  templates?: TemplateProp[];
};

export default function LibroDetalleClient({
  categoriaSlug,
  libroSlug,
  libroNombre,
  backgroundUrl,
  carouselImageUrls = [],
  dbIds,
  variants = [],
  templates = [],
}: Props) {
  const { isMobile, isSmallMobile } = useWindowSize();
  const info = LIBROS_INFO[libroSlug] ?? { ...DEFAULT_INFO, nombre: libroNombre };
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTapa, setSelectedTapa] = useState<"gruesa" | "premium">("gruesa");
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const isMamaHeroina = libroSlug === "mama-mi-heroina";
  const hasBg = !!backgroundUrl;
  const hasRealImages = carouselImageUrls.length > 0;

  const CATEGORIA_LABEL: Record<string, string> = {
    "libros-de-amor": "AMOR",
    "libros-de-mascotas": "MASCOTAS",
    "libros-de-familia": "FAMILIA",
    "libros-de-memorias-familiares": "MEMORIAS FAMILIARES",
  };

  const CATEGORIA_SUBTITULO_HERO: Record<string, string> = {
    "libros-de-amor": "Libro Personalizado de Amor",
    "libros-de-mascotas": "Libro Personalizado de Mascotas",
    "libros-de-familia": "Libro Personalizado de Familia",
    "libros-de-memorias-familiares": "Libro Personalizado Memorias Familiares",
  };

  return (
    <div>
      <style>{`
        @keyframes subtitleSweep {
          0%   { background-position: 100% center; }
          100% { background-position: -200% center; }
        }
        .hero-subtitle-animated {
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: subtitleSweep 6s linear infinite;
        }
        .hero-subtitle-amor {
          background-image: linear-gradient(to right, #e91e8c 25%, #ffffff 50%, #e91e8c 75%);
        }
        .hero-subtitle-mascotas {
          background-image: linear-gradient(to right, #2196f3 25%, #ffffff 50%, #2196f3 75%);
        }
        .hero-subtitle-familia {
          background-image: linear-gradient(to right, #4caf50 25%, #ffffff 50%, #4caf50 75%);
        }
        .hero-subtitle-memorias {
          background-image: linear-gradient(to right, #8b6bb1 25%, #ffffff 50%, #8b6bb1 75%);
        }
      `}</style>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: isMobile ? "24px" : "36px",
          marginBottom: isMobile ? 0 : "-120px",
        }}
      >
        {/* Background */}
        {backgroundUrl ? (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${backgroundUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 30%, #ffffff 80%)",
                pointerEvents: "none",
              }}
            />
          </>
        ) : isMamaHeroina ? (
          <MaternalSkyBackground />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(160deg, ${info.accent}12 0%, #f8f9fa 50%, ${info.accent}08 100%)`,
            }}
          />
        )}

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "32px 16px 0" : "56px 48px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "28px" : "40px",
          }}
        >

          {/* ── Cabecera de texto centrada ── */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Libro Personalizado
            </p>
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: isSmallMobile ? "22px" : isMobile ? "26px" : "36px",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "3px",
                lineHeight: 1.1,
              }}
            >
              {CATEGORIA_LABEL[categoriaSlug] ?? categoriaSlug.replace(/-/g, " ").toUpperCase()}
            </p>
            <p
              className={`hero-subtitle-animated ${{
                "libros-de-amor": "hero-subtitle-amor",
                "libros-de-mascotas": "hero-subtitle-mascotas",
                "libros-de-familia": "hero-subtitle-familia",
                "libros-de-memorias-familiares": "hero-subtitle-memorias",
              }[categoriaSlug] ?? "hero-subtitle-memorias"}`}
              style={{
                margin: 0,
                fontSize: isMobile ? "15px" : "18px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              {CATEGORIA_SUBTITULO_HERO[categoriaSlug] ?? info.subtitulo}
            </p>
          </div>

          {/* ── 3 imágenes lado a lado ── */}
          {hasRealImages && (
            <div
              style={{
                display: "flex",
                gap: isMobile ? "8px" : "16px",
                justifyContent: "center",
                alignItems: "flex-end",
                width: "100%",
                overflowX: isMobile ? "auto" : "visible",
                paddingBottom: isMobile ? "4px" : 0,
              }}
            >
              {(carouselImageUrls.length === 3
                ? [carouselImageUrls[1], carouselImageUrls[0], carouselImageUrls[2]]
                : carouselImageUrls
              ).map((url, i) => {
                const isHovered = hoveredImage === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredImage(i)}
                    onMouseLeave={() => setHoveredImage(null)}
                    style={{
                      flex: "0 0 auto",
                      width: isMobile ? "180px" : "calc(33.33% - 12px)",
                      maxWidth: "360px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: isHovered
                        ? "0 24px 56px rgba(0,0,0,0.28)"
                        : "0 8px 32px rgba(0,0,0,0.15)",
                      transform: isHovered
                        ? "perspective(800px) translateY(-10px) scale(1.04) translateZ(30px)"
                        : "perspective(800px) translateY(0) scale(1) translateZ(0)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={url}
                      alt={`${info.nombre} - vista ${i + 1}`}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Miniaturas pequeñas ── */}
          {hasRealImages && (
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", perspective: "600px" }}>
              {(carouselImageUrls.length === 3
                ? [carouselImageUrls[1], carouselImageUrls[0], carouselImageUrls[2]]
                : carouselImageUrls
              ).map((url, i) => {
                const isHovered = hoveredThumb === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredThumb(i)}
                    onMouseLeave={() => setHoveredThumb(null)}
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: isHovered
                        ? `2px solid ${info.accent}`
                        : `2px solid ${info.accent}40`,
                      boxShadow: isHovered
                        ? `0 12px 28px rgba(0,0,0,0.25), 0 0 0 1px ${info.accent}60`
                        : "0 2px 8px rgba(0,0,0,0.10)",
                      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={url}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Tarjetas: info + características ── */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center",
            }}
          >

            {/* Info card */}
            <div
              style={{
                width: "100%",
                maxWidth: "680px",
                ...(hasBg ? {
                  background: "rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
                  padding: isMobile ? "28px 24px" : "36px 40px",
                } : {
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "20px",
                  padding: isMobile ? "28px 24px" : "36px 40px",
                }),
              }}
            >
              <h1
                style={{
                  margin: "0 0 8px 0",
                  fontSize: isSmallMobile ? "24px" : isMobile ? "28px" : "36px",
                  fontWeight: isMobile ? 600 : 700,
                  color: "#111",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {info.nombre}
              </h1>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: info.accent,
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                {info.tagline}
              </div>

              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#111",
                }}
              >
                {info.descripcionCorta}
              </h3>

              <ul
                style={{
                  margin: "0 0 28px 0",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {info.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "#444",
                      paddingLeft: "28px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "1px",
                        color: info.accent,
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      ★
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => { setCurrentStep(1); document.getElementById("wizard-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    padding: "14px 40px",
                    borderRadius: "14px",
                    border: "none",
                    background: info.accent,
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    width: isMobile ? "100%" : undefined,
                  }}
                >
                  Crea tu Libro ahora
                </button>
              </div>
            </div>

            {/* Características card */}
            <div
              style={{
                width: "100%",
                maxWidth: "680px",
                ...(hasBg ? {
                  background: "rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  borderRadius: "16px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
                  padding: "24px 28px",
                } : {
                  background: "rgba(248, 245, 240, 0.8)",
                  borderRadius: "16px",
                  padding: "24px 28px",
                }),
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#4a4a4a", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px", textAlign: "center" }}>
                Características del Libro
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
                {info.caracteristicas.map((item) => (
                  <div key={item.label} style={{ fontSize: "14px", fontWeight: 500, color: "#555", lineHeight: 1.5 }}>
                    {item.label}: {item.value}
                  </div>
                ))}
              </div>
              <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", margin: "16px 0 12px" }} />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#444", letterSpacing: "0.3px" }}>
                  Desde {info.precio.desde}
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                  El precio varía según la cantidad de plantillas elegidas (10 a 15)
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══ WIZARD DE CREACIÓN — 5 pasos ═══ */}
      <div style={{ paddingTop: isMobile ? 0 : "120px" }}>

        {/* ── Divisor decorativo ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: isMobile ? "32px 24px 0" : "40px 48px 0",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #d0d0d0)" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#aaa", letterSpacing: "4px", whiteSpace: "nowrap" }}>
            ✦ ✦ ✦
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #d0d0d0)" }} />
        </div>

      <WizardSection
        accent={info.accent}
        dbIds={dbIds ?? null}
        variants={variants}
        templates={templates}
        libroNombre={info.nombre}
        categoriaSlug={categoriaSlug}
      />
      </div>

      {/* ═══ TAMBIÉN TE PODRÍA INTERESAR ═══ */}
      <section style={{ background: "#fafafa", padding: isMobile ? "48px 20px 64px" : "72px 48px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header editorial */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
            <p style={{
              margin: "0 0 12px 0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: info.accent,
            }}>
              Nuestra colección
            </p>
            <h2 style={{
              margin: "0 0 16px 0",
              fontSize: isSmallMobile ? "24px" : isMobile ? "28px" : "40px",
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}>
              {RELATED_SECTION_TITLE[categoriaSlug]?.split(" ").slice(0, -2).join(" ") ?? "También te"}{" "}
              <span style={{
                background: `linear-gradient(135deg, ${info.accent}, ${info.accent}bb)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {RELATED_SECTION_TITLE[categoriaSlug]?.split(" ").slice(-2).join(" ") ?? "podría interesar"}
              </span>
            </h2>
            <div aria-hidden="true" style={{
              width: "48px",
              height: "3px",
              borderRadius: "9999px",
              background: `linear-gradient(90deg, ${info.accent}, ${info.accent}99)`,
              margin: "0 auto 16px",
            }} />
            <p style={{
              margin: 0,
              fontSize: isMobile ? "14px" : "16px",
              color: "#666",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: "440px",
              marginInline: "auto",
            }}>
              Cada libro cuenta una historia única. Encuentra el que mejor se adapta a ese momento especial.
            </p>
          </div>

          {/* Grid de BookCards */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "48px 0" : "48px 24px",
            alignItems: "start",
          }}>
            {(RELATED_BOOKS[categoriaSlug] ?? [])
              .filter((b) => b.slug !== libroSlug)
              .map((book) => (
                <div key={book.slug} style={{ flex: isMobile ? "1 1 100%" : "0 0 calc(33.333% - 16px)" }}>
                <BookCard
                  title={book.name}
                  subtitle={book.tagline}
                  description=""
                  image={SLUG_THUMBNAIL[book.slug] ? getAssetUrl(SLUG_THUMBNAIL[book.slug]) : ""}
                  href={`/libros-personalizados/${categoriaSlug}/${book.slug}`}
                  category={CATEGORIA_TO_BOOK_CATEGORY[categoriaSlug] ?? "love"}
                  rating={book.reviews > 0 ? 5 : 4.5}
                />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ESPECÍFICO DEL PRODUCTO ═══ */}
      {(() => {
        const faq = FAQ_BY_CATEGORY[categoriaSlug] ?? FAQ_BY_CATEGORY["libros-de-amor"];
        return (
          <section
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: isMobile ? "48px 20px 64px" : "80px 48px 96px",
            }}
          >
            {/* Header editorial */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
              <p style={{
                margin: "0 0 12px 0",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: info.accent,
              }}>
                Preguntas frecuentes
              </p>
              <h2 style={{
                margin: "0 0 16px 0",
                fontSize: isSmallMobile ? "22px" : isMobile ? "26px" : "36px",
                fontWeight: 900,
                color: "#1a1a1a",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}>
                {faq.tituloBase}{" "}
                <span style={{
                  background: `linear-gradient(135deg, ${info.accent}, ${info.accent}bb)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {faq.tituloDestacado}
                </span>
              </h2>
              <div aria-hidden="true" style={{
                width: "48px",
                height: "3px",
                borderRadius: "9999px",
                background: `linear-gradient(90deg, ${info.accent}, ${info.accent}99)`,
                margin: "0 auto 16px",
              }} />
              <p style={{
                margin: 0,
                fontSize: isMobile ? "14px" : "16px",
                color: "#666",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "480px",
                marginInline: "auto",
              }}>
                {faq.subtitulo}
              </p>
            </div>

            {/* Items */}
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
            }}>
              {faq.items.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} accent={info.accent} />
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
}

/* ══════════════════════════════════════════
   Legacy Step Components (unused — wizard moved to WizardSection.tsx)
   ══════════════════════════════════════════ */

function StepInfoBasica({ accent, onNext }: { accent: string; onNext: () => void }) {
  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 24px 0" }}>
        1. Información Básica
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
            Apodo de tu pareja
          </label>
          <input
            type="text"
            placeholder="Escribe el apodo..."
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "2px solid #e0e0e0",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "12px" }}>
            Sube las fotos de tu pareja
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "600px" }}>
            {[1, 2, 3].map((n) => (
              <PhotoUploadBox key={n} number={n} accent={accent} />
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "12px" }}>
            Sube tus fotos
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "600px" }}>
            {[1, 2, 3].map((n) => (
              <PhotoUploadBox key={n} number={n} accent={accent} />
            ))}
          </div>
        </div>
      </div>

      <StepButton label="Guardar y continuar" accent={accent} onClick={onNext} />
    </div>
  );
}

function StepEscenario({ accent, onNext }: { accent: string; onNext: () => void }) {
  const [selected, setSelected] = useState(0);
  const escenarios = [
    "Paseo en la playa",
    "Cena romántica",
    "Viaje juntos",
    "Primer beso",
    "Baile bajo la luna",
    "Día de lluvia",
  ];

  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 24px 0" }}>
        2. Selecciona tu Escenario
      </h3>

      {/* Main preview */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          maxHeight: "380px",
          background: `linear-gradient(135deg, ${accent}15 0%, ${accent}08 100%)`,
          borderRadius: "20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#bbb",
          fontSize: "16px",
        }}
      >
        Vista previa: {escenarios[selected]}
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", overflowX: "auto", padding: "4px 0" }}>
        {escenarios.map((esc, i) => (
          <button
            key={esc}
            onClick={() => setSelected(i)}
            style={{
              flexShrink: 0,
              width: "120px",
              height: "72px",
              borderRadius: "10px",
              border: selected === i ? `3px solid ${accent}` : "2px solid #e0e0e0",
              background: `linear-gradient(135deg, ${accent}${selected === i ? "18" : "08"} 0%, #f5f5f5 100%)`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: selected === i ? accent : "#999",
              fontWeight: selected === i ? 700 : 400,
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {esc}
          </button>
        ))}
      </div>

      <StepButton label="Guardar y continuar" accent={accent} onClick={onNext} />
    </div>
  );
}

function StepPoemas({ accent, onNext }: { accent: string; onNext: () => void }) {
  const [mode, setMode] = useState<"inspiradoras" | "personal">("inspiradoras");

  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 8px 0" }}>
        3. Personalización de Poemas
      </h3>
      <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.6, margin: "0 0 24px 0" }}>
        Tu dedicatoria personal aparecerá en la primera página del libro para siempre
        y de forma totalmente gratuita.
      </p>

      {/* Toggle */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={() => setMode("inspiradoras")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            background: mode === "inspiradoras" ? accent : "#f0f0f0",
            color: mode === "inspiradoras" ? "#fff" : "#666",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
        >
          PixelArt dedicaciones inspiradoras
        </button>
        <button
          onClick={() => setMode("personal")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: mode === "personal" ? `2px solid ${accent}` : "2px solid #e0e0e0",
            background: "#fff",
            color: mode === "personal" ? accent : "#666",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
        >
          Dedicatorias Personales
        </button>
      </div>

      <div style={{ fontSize: "14px", color: accent, fontWeight: 500, marginBottom: "12px" }}>
        {mode === "inspiradoras"
          ? "Selecciona una de nuestras dedicatorias:"
          : "Escribe tu dedicatoria personal:"}
      </div>

      <textarea
        placeholder={
          mode === "inspiradoras"
            ? "Selecciona una dedicatoria inspiradora..."
            : "Escribe aquí tu dedicatoria personal..."
        }
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "16px",
          borderRadius: "12px",
          border: "2px solid #e0e0e0",
          fontSize: "15px",
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          marginBottom: "32px",
        }}
      />

      <StepButton label="Guardar y continuar" accent={accent} onClick={onNext} />
    </div>
  );
}

function StepPortada({
  accent,
  precios,
  selected,
  onSelect,
  onNext,
}: {
  accent: string;
  precios: { gruesa: string; premium: string };
  selected: "gruesa" | "premium";
  onSelect: (t: "gruesa" | "premium") => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 24px 0" }}>
        4. Diseño de Portada
      </h3>

      {/* Portada preview */}
      <div
        style={{
          width: "100%",
          aspectRatio: "5/2",
          maxHeight: "280px",
          background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 100%)`,
          borderRadius: "20px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#bbb",
          fontSize: "16px",
        }}
      >
        Vista previa de portada
      </div>

      {/* Tapa options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        <TapaOption
          title="TAPA GRUESA"
          highlight="INCREÍBLE!"
          precio={precios.gruesa}
          description="Rígida con un grosor especial, de alta calidad para una duración de toda la vida."
          isSelected={selected === "gruesa"}
          accent={accent}
          onClick={() => onSelect("gruesa")}
        />
        <TapaOption
          title="TAPA PREMIUM"
          highlight="EXCLUSIVA!"
          precio={precios.premium}
          description="Acabados metálicos, plastificado resistente al agua y una apariencia de lujo."
          isSelected={selected === "premium"}
          accent={accent}
          onClick={() => onSelect("premium")}
        />
      </div>

      <StepButton label="Guardar y continuar" accent={accent} onClick={onNext} />
    </div>
  );
}

function StepRevision({ accent, onNext }: { accent: string; onNext: () => void }) {
  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 8px 0" }}>
        5. Revisión y Aprobación
      </h3>
      <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.6, margin: "0 0 32px 0" }}>
        Tu libro personalizado ya está listo. Aquí tienes una vista de todo el álbum terminado.
      </p>

      {/* Preview */}
      <div
        style={{
          width: "100%",
          aspectRatio: "2/1",
          maxHeight: "400px",
          background: `linear-gradient(135deg, ${accent}10 0%, #f5f5f5 100%)`,
          borderRadius: "20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#bbb",
          fontSize: "16px",
        }}
      >
        Vista previa del libro completo
      </div>

      {/* Page thumbnails */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "32px", flexWrap: "wrap" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "80px",
              height: "50px",
              borderRadius: "8px",
              border: i === 0 ? `2px solid ${accent}` : "2px solid #e0e0e0",
              background: `${accent}${i === 0 ? "15" : "05"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#bbb",
            }}
          >
            Pág {i + 1}
          </div>
        ))}
      </div>

      <StepButton label="Guardar y continuar" accent={accent} onClick={onNext} />
    </div>
  );
}

function StepEnvio({
  accent,
  precio,
  tapa,
}: {
  accent: string;
  precio: string;
  tapa: "gruesa" | "premium";
}) {
  return (
    <div>
      <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 24px 0" }}>
        6. Envío de Producto Final
      </h3>

      {/* Resumen */}
      <div
        style={{
          background: "#fafafa",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "18px", color: "#333" }}>
            Tu libro (Tapa {tapa === "gruesa" ? "Gruesa" : "Premium"}):
          </span>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#111" }}>{precio}</span>
        </div>
        <div
          style={{
            height: "1px",
            background: "#e0e0e0",
            margin: "12px 0",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "#111" }}>Total:</span>
          <span style={{ fontSize: "24px", fontWeight: 800, color: info_accent_fallback(accent) }}>{precio}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "36px",
        }}
      >
        {[
          { icon: "🛒", label: "MEJOR REGALO" },
          { icon: "🔒", label: "PAGO RÁPIDO Y SEGURO" },
          { icon: "⭐", label: "100% FELICIDAD GARANTIZADA" },
        ].map((badge) => (
          <div
            key={badge.label}
            style={{
              textAlign: "center",
              padding: "20px 12px",
              background: "#fafafa",
              borderRadius: "14px",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>{badge.icon}</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#999", textTransform: "uppercase" }}>
              {badge.label}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "16px" }}>
        <button
          style={{
            flex: 1,
            padding: "16px 32px",
            borderRadius: "14px",
            border: "none",
            background: accent,
            color: "#fff",
            fontSize: "16px",
            fontWeight: 800,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Agregar al carrito
        </button>
        <button
          style={{
            padding: "16px 32px",
            borderRadius: "14px",
            border: `2px solid ${accent}`,
            background: "#fff",
            color: accent,
            fontSize: "16px",
            fontWeight: 800,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Editar orden
        </button>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function info_accent_fallback(accent: string) {
  return accent;
}

function StepButton({
  label,
  accent,
  onClick,
}: {
  label: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 36px",
        borderRadius: "14px",
        border: "none",
        background: accent,
        color: "#fff",
        fontSize: "16px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

function PhotoUploadBox({ number, accent }: { number: number; accent: string }) {
  return (
    <div
      style={{
        aspectRatio: "1",
        borderRadius: "16px",
        border: "2px dashed #d0d0d0",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.15s ease",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ccc"
        strokeWidth="1.5"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "8px" }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ fontSize: "10px", color: "#aaa", textAlign: "center", lineHeight: 1.3, padding: "0 8px" }}>
        Fotos claras de su rostro
      </span>
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: accent,
          color: "#fff",
          fontSize: "12px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {number}
      </span>
    </div>
  );
}

function TapaOption({
  title,
  highlight,
  precio,
  description,
  isSelected,
  accent,
  onClick,
}: {
  title: string;
  highlight: string;
  precio: string;
  description: string;
  isSelected: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "24px",
        borderRadius: "18px",
        border: isSelected ? `3px solid ${accent}` : "2px solid #e0e0e0",
        background: isSelected ? `${accent}08` : "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>
        {title}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: "#b72028", marginBottom: "8px" }}>
        {highlight}
      </div>
      <div style={{ fontSize: "14px", color: "#666", lineHeight: 1.5, marginBottom: "12px" }}>
        {description}
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#111" }}>
        Precio: {precio}
      </div>
      {/* Placeholder images */}
      <div
        style={{
          marginTop: "16px",
          height: "100px",
          background: `linear-gradient(135deg, ${accent}10 0%, #f5f5f5 100%)`,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ccc",
          fontSize: "12px",
        }}
      >
        Vista previa
      </div>
    </button>
  );
}

function FaqItem({
  question,
  answer,
  accent,
}: {
  question: string;
  answer: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "22px 28px",
          background: open ? `${accent}06` : "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          fontFamily: "inherit",
          gap: "16px",
          transition: "background 0.2s ease",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: open ? accent : "#222",
            transition: "color 0.2s ease",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? accent : "#bbb"}
          strokeWidth="2.5"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "0 28px 24px",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#666",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}
