export type BlogPost = {
  slug: string;
  eyebrow: string;
  title: string;
  teaser: string;
  image: string; // MinIO asset key
  date: string;
  readTime: string;
  bookTitle: string;
  bookHref: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "libro-para-papa",
    eyebrow: "Libro de Familia",
    title: "Libro Personalizado para mi héroe",
    teaser:
      'Alondra se acercó en puntitas con el libro entre las manos, como si cargara un tesoro. "Es para ti, papá". Javier lo tomó despacio, leyó el título y se quedó en silencio un segundo. Sonrió sin poder evitarlo; los ojos se le humedecieron. La abrazó fuerte, con el libro pegado al pecho, como si acabara de recibir algo que no sabía que le faltaba.',
    image: "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_2.png",
    date: "15 de marzo, 2025",
    readTime: "3 min",
    bookTitle: "Papá, Mi Héroe",
    bookHref: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    content: [
      'Alondra tenía ocho años cuando decidió que quería darle algo "de verdad" a su papá. No un dibujo más para el refrigerador, no un muñequito de plastilina. Algo que él pudiera abrir, leer, y guardar para siempre.',
      'Fue con su mamá al sitio de PIXELART, eligieron el libro "Papá, Mi Héroe" y subieron las fotos que tenían: una del parque, otra del cumpleaños, una borrosa de cuando él la llevó al colegio el primer día. La inteligencia artificial hizo el resto, integrando cada imagen en escenas llenas de color y emoción.',
      'El día del regalo, Javier llegó cansado del trabajo. Alondra lo esperaba sentada en el sillón, con el libro envuelto en papel plateado. "Es para ti, papá", dijo, y se lo entregó antes de que él pudiera siquiera dejar las llaves.',
      'Javier lo tomó despacio. Leyó el título en la tapa. Se quedó en silencio un segundo —ese silencio que vale más que cualquier discurso— y sonrió sin poder evitarlo. Los ojos se le humedecieron un poco. La abrazó fuerte, con el libro pegado al pecho, como si acabara de recibir algo que no sabía que le faltaba.',
      '"Esto es lo más lindo que me han dado en la vida", dijo. Y lo decía en serio.',
      'El libro sigue en el velador de Javier. Lo abre de vez en cuando, no para leerlo completo, sino para mirar una página al azar y sonreír. Alondra lo sabe. Y eso, para ella, es suficiente.',
    ],
  },
  {
    slug: "recuerdo-de-rocky",
    eyebrow: "Libro de Mascotas",
    title: "Un recuerdo de mi mejor amigo",
    teaser:
      'En cuanto abrieron el libro, los dos se juntaron más, hombro con hombro. "Mira… es Rocky", dijo uno, señalando una escena donde parecía estar corriendo con ellos otra vez. Se rieron bajito, y luego se quedaron mirando con esa mezcla de nostalgia y calma. "Aquí está con nosotros", susurró la niña, apretando la página con cuidado, como si pudiera sentir sus patitas en cada recuerdo.',
    image: "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1.png",
    date: "22 de enero, 2025",
    readTime: "4 min",
    bookTitle: "Nuestro Angel de 4 patas",
    bookHref: "/libros-personalizados/libros-de-mascotas/nuestro-angel-de-4-patas",
    content: [
      'Rocky llegó a la familia García cuando los niños tenían cinco y siete años. Un labrador color miel que aprendió rápido que su misión en la vida era correr detrás de una pelota hasta que le temblaran las patas.',
      'Durante nueve años fue la constante de todos los veranos, todos los cumpleaños, todas las tardes de lluvia tirado junto al sofá. Cuando se fue, el silencio que dejó era del tamaño de todo eso.',
      'La mamá buscó una forma de que los niños pudieran despedirse de verdad. Reunió las fotos que tenían —en el parque, en la playa, durmiendo encima de los zapatos del papá— y creó con ellas el libro "Nuestro Ángel de 4 Patas" en PIXELART.',
      'Lo abrieron juntos un domingo por la mañana. En cuanto vieron la primera página los dos se juntaron más, hombro con hombro. "Mira… es Rocky", dijo el mayor, señalando una escena donde el perro parecía estar corriendo con ellos otra vez. Se rieron bajito, y luego se quedaron mirando en silencio.',
      '"Aquí está con nosotros", susurró la niña, apretando la página con cuidado, como si pudiera sentir sus patitas en cada recuerdo.',
      'El libro vive ahora en el estante de los niños, entre sus cuentos favoritos. Lo sacan seguido. No para llorar, sino para recordar con cariño. Y eso, dice la mamá, era exactamente lo que necesitaban.',
    ],
  },
  {
    slug: "la-propuesta",
    eyebrow: "Libro de Amor",
    title: "La propuesta más inesperada",
    teaser:
      'La cena iba tranquila hasta que él sacó el libro, nervioso y sonriendo. Ella lo abrió y empezó a pasar páginas: recuerdos, momentos, pequeñas "razones" que la hicieron reír y luego respirar hondo. Cuando levantó la mirada, él ya estaba de rodillas. Ella se llevó la mano al pecho, incrédula, con lágrimas bonitas. No hizo falta decir mucho: se abrazaron, y el libro quedó entre los dos como la prueba de una historia que recién empezaba.',
    image: "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_3.png",
    date: "10 de febrero, 2025",
    readTime: "3 min",
    bookTitle: "10 Razones por las que Te Amo",
    bookHref: "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
    content: [
      'Sebastián y Camila llevaban cuatro años juntos cuando él decidió que era hora. Pero quería algo diferente, algo que ella no olvidara aunque pasaran cincuenta años.',
      'Eligió el libro "10 Razones por las que Te Amo" de PIXELART. Subió las fotos de sus viajes, de las noches de película, de la vez que ella se cayó de la bicicleta y se rió más fuerte que nadie. La IA construyó cada escena como si hubiera estado ahí.',
      'La noche de la propuesta reservó su restaurante favorito de siempre —no el más caro, sino el más suyo, donde pidieron el mismo plato la primera vez que salieron. Guardó el libro en una bolsa debajo de la mesa.',
      'La cena iba tranquila, con esa comodidad que da conocer a alguien de verdad. Cuando llegaron los postres, él lo sacó, nervioso y sonriendo. "Esto es para vos".',
      'Camila lo abrió. Empezó a pasar páginas: recuerdos, momentos, pequeñas razones escritas con sus palabras y sus fotos. Se rió en la primera página. Respiró hondo en la tercera. Para la séptima ya tenía los ojos brillantes.',
      'Cuando levantó la mirada, él ya estaba de rodillas.',
      'Ella se llevó la mano al pecho, incrédula, con esas lágrimas que no son de tristeza sino de algo mucho más grande. Dijo que sí antes de que él terminara la pregunta.',
      'No hizo falta decir mucho más. Se abrazaron, y el libro quedó entre los dos sobre la mesa, como la prueba de una historia que recién empezaba.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
