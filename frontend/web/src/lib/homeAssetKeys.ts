/**
 * Mapa centralizado de storage_keys para todos los assets de Home.
 * Estos valores corresponden al campo `storage_key` en la tabla `assets` de la BD.
 * Son estables entre entornos (no dependen de IDs numéricos).
 */

export const HOME_ASSET_KEYS = {
  // LOGO
  logo: 'logo/Navbar/LOGO_PIXELART_NAVBAR.png',

  // HOME HERO - AI Books
  heroAIBookCarousel: 'Home/Home-hero/AI_Books/AI_book_home_hero_carousel.png',
  heroAIBookBackground: 'Home/Home-hero/AI_Books/AI_book_home_hero_background.png',
  heroAIBookSlider: 'Home/Home-hero/AI_Books/AI_book_home_hero_slider.png',

  // HOME HERO - Photobooks
  heroPhotobookBackground: 'Home/Home-hero/Photobooks/Photobook_home_hero_background.png',
  heroPhotobookSlider: 'Home/Home-hero/Photobooks/Photobook_home_hero_slider.png',
  heroPhotobookCarousel: 'Home/Home-hero/Photobooks/Photobook_home_hero_carousel.png',

  // SECTION IDENTITY
  identityBackground: 'Home/Section_Identity/Section_Profile_Background.png',

  // SECTION OUR BOOKS - Love
  ourBooksLove10Razones: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png',
  ourBooksLove1025Dias: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png',
  ourBooksLoveMiAmor: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png',

  // SECTION OUR BOOKS - Family
  ourBooksFamilyAbuelo: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png',
  ourBooksFamilyPapaHeroe: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png',

  // SECTION OUR BOOKS - Pets
  ourBooksPetsAngel: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png',
  ourBooksPetsAventuras: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Miniatura.png',
  ourBooksPetsMejorAmigo: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png',
  ourBooksPetsMiauravilloso: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png',

  // SECTION OUR BOOKS - Photobooks (miniaturas de temas)
  ourBooksPhotobooksTapaDelgada: 'Home/Section_Our_Books/Photobooks/Our_Books_Photobooks_Tapa_Delgada.png',
  ourBooksPhotobooksTapaGruesa: 'Home/Section_Our_Books/Photobooks/Our_Books_Photobooks_Tapa_Gruesa.png',
  ourBooksPhotobooksMachuPicchu: 'Photobooks/Miniaturas/Photobook_Miniatura_Machu_Picchu.png',
  ourBooksPhotobooksParis:       'Photobooks/Miniaturas/Photobook_Miniatura_Paris.png',
  ourBooksPhotobooksNuevaYork:   'Photobooks/Miniaturas/Photobook_Miniatura_New_York.png',
  ourBooksPhotobooksRoma:        'Photobooks/Miniaturas/Photobook_Miniatura_Coliseo_Romano.png',

  // SECTION OUR BOOKS - Background
  ourBooksSectionBackground: 'Home/Section_Our_Books/Section_Our_Books_Background.png',

  // SECTION PHOTOBOOKS
  photobooksSectionBackground: 'Home/Section_Photobooks/Section_Photobooks_Background.png',
  photobooksExample: 'Home/Section_Photobooks/Section_Photobooks_Photobooks_Example.png',

  // SECTION WHY CHOOSE US
  whyChooseUsImage: 'Home/Section_Why_Choose_Us/Section_Why_Choose_Us_Image.png',

  // SECTION COVER BOOKS
  bookCoverThick: 'Home/Section_Cover_Books/Section_Book_Cover_Thick.png',

  // SECTION CREATE YOUR BOOK - Register Information
  createBookBoy: 'Home/Section_Create_Your_Book/Register_Information/Section_Create_Your_Book_Boy.png',
  createBookGirl: 'Home/Section_Create_Your_Book/Register_Information/Section_Create_Your_Book_Girl.png',
  createBookStage1: 'Home/Section_Create_Your_Book/Register_Information/Section_Create_Your_Book_Stage_1.png',
  createBookStage2: 'Home/Section_Create_Your_Book/Register_Information/Section_Create_Your_Book_Stage_2.png',
  createBookResult: 'Home/Section_Create_Your_Book/Register_Information/Section_Create_Your_Book_Result.png',

  // SECTION CREATE YOUR BOOK - Personalized Poem
  createBookPoemSpace: 'Home/Section_Create_Your_Book/Personalized_Poem/Section_Create_Your_Book_Poem_Space.png',

  // SECTION CREATE YOUR BOOK - Choose Book Cover
  chooseBookCoverThick: 'Home/Section_Create_Your_Book/Choose_Book_Cover/Section_Choose_Book_Cover_Thick.png',
  chooseBookCoverPremium: 'Home/Section_Create_Your_Book/Choose_Book_Cover/Section_Choose_Book_Cover_Premium.png',

  // SECTION CREATE YOUR BOOK - Previsualized Results
  previsualizedResultsCouple: 'Home/Section_Create_Your_Book/Previsualized_Results/Section_Previsualized_Results_Couple.png',

  // SECTION OUR CLIENTS
  ourClients1: 'Home/Section_Our_Clients/Section_Our_Clients_1.png',
  ourClients2: 'Home/Section_Our_Clients/Section_Our_Clients_2.png',
  ourClients3: 'Home/Section_Our_Clients/Section_Our_Clients_3.png',
  ourClients4: 'Home/Section_Our_Clients/Section_Our_Clients_4.png',
  ourClientsBackground: 'Home/Section_Our_Clients/Section_Our_Clients_Background.png',

  // FOOTER
  footerBackground: 'Home/Footer/Footer_Background.png',
} as const;

export type HomeAssetKey = keyof typeof HOME_ASSET_KEYS;
