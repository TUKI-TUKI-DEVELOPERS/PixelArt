"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { CheckCircle2 } from "lucide-react";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";
import WizardBackground from "@/components/backgrounds/WizardBackground";

const API_BASE = "";

// ── Types ─────────────────────────────────────────────────────────────────────

type ActivePromo = { label: string; targetType: string; targetId: number | null; discountType: string; discountValue: number };
type VariantProp = { id: number; coverType: string; basePriceCents: number };
type TemplateProp = { id: number; name: string | null; previewUrl: string };
type DbIdsProp = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number } | null;
type GenderDirection = "HE_TO_SHE" | "SHE_TO_HE" | "HE_TO_HE" | "SHE_TO_SHE" | "";

type Props = {
  accent: string;
  dbIds: DbIdsProp;
  variants: VariantProp[];
  templates: TemplateProp[];
  libroNombre: string;
  categoriaSlug: string;
};

// ── Dedication options por libro ───────────────────────────────────────────────
type DedicationOption = { label: string; HE_TO_SHE: string; SHE_TO_HE: string };

const DEDICATION_OPTIONS: Record<string, DedicationOption[]> = {
  "10 o 15 Razones Por Las Que Te Amo": [
    {
      label: "Romántica",
      HE_TO_SHE:
        "Para {recipientNickname}, cada día contigo descubro nuevas razones para amarte. " +
        "Este libro guarda solo algunas de las miles de razones por las que eres el amor de mi vida. " +
        "Te amo infinitamente. - {dedicatorName}",
      SHE_TO_HE:
        "Para {recipientNickname}, cada día contigo descubro nuevas razones para amarte. " +
        "Este libro guarda solo algunas de las miles de razones por las que eres el amor de mi vida. " +
        "Te amo infinitamente. - {dedicatorName}",
    },
    {
      label: "Nostálgica",
      HE_TO_SHE:
        "{recipientNickname}, desde que llegaste a mi vida todo tiene más sentido. " +
        "Estas páginas cuentan las razones por las que te elegí y te sigo eligiendo cada día. " +
        "Gracias por ser mi hogar. Con amor, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, desde que llegaste a mi vida todo tiene más sentido. " +
        "Estas páginas cuentan las razones por las que te elegí y te sigo eligiendo cada día. " +
        "Gracias por ser mi hogar. Con amor, {dedicatorName}",
    },
    {
      label: "Divertida",
      HE_TO_SHE:
        "Para mi {recipientNickname}, porque amarte es la mejor aventura. " +
        "Aquí están algunas razones por las que eres mi persona favorita y mi cómplice de vida. " +
        "Te amo, bebesita. - {dedicatorName}",
      SHE_TO_HE:
        "Para mi {recipientNickname}, porque amarte es la mejor aventura. " +
        "Aquí están algunas razones por las que eres mi persona favorita y mi cómplice de vida. " +
        "Te amo, bebesito. - {dedicatorName}",
    },
  ],
  "1025 Días Enamorándome De Ti": [
    {
      label: "Romántica",
      HE_TO_SHE:
        "{recipientNickname}, han pasado {daysCount} días desde que comenzó nuestra historia, " +
        "y cada uno de ellos me he enamorado más de ti. " +
        "Este libro celebra nuestro tiempo juntos y todo lo que aún nos falta por vivir. " +
        "Te amo hoy y siempre. - {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, han pasado {daysCount} días desde que comenzó nuestra historia, " +
        "y cada uno de ellos me he enamorado más de ti. " +
        "Este libro celebra nuestro tiempo juntos y todo lo que aún nos falta por vivir. " +
        "Te amo hoy y siempre. - {dedicatorName}",
    },
    {
      label: "Nostálgica",
      HE_TO_SHE:
        "{daysCount} días a tu lado, {recipientNickname}, y cada uno ha sido un regalo. " +
        "Desde el {startDate} mi vida cambió para siempre. " +
        "Gracias por cada momento, cada risa, cada abrazo. Aquí está nuestra historia. " +
        "Con todo mi amor, {dedicatorName}",
      SHE_TO_HE:
        "{daysCount} días a tu lado, {recipientNickname}, y cada uno ha sido un regalo. " +
        "Desde el {startDate} mi vida cambió para siempre. " +
        "Gracias por cada momento, cada risa, cada abrazo. Aquí está nuestra historia. " +
        "Con todo mi amor, {dedicatorName}",
    },
    {
      label: "Poética",
      HE_TO_SHE:
        "{daysCount} días no son suficientes, {recipientNickname}. " +
        "Necesito mil vidas más para amarte como mereces. " +
        "Este libro es solo el comienzo de nuestra eternidad. Tuya siempre, {dedicatorName}",
      SHE_TO_HE:
        "{daysCount} días no son suficientes, {recipientNickname}. " +
        "Necesito mil vidas más para amarte como mereces. " +
        "Este libro es solo el comienzo de nuestra eternidad. Tuyo siempre, {dedicatorName}",
    },
  ],
  "Mi Amor": [
    {
      label: "Romántica",
      HE_TO_SHE:
        "Para {recipientNickname}, eres todas estas heroínas y más. " +
        "Eres mi inspiración, mi reina, mi todo. " +
        "Este libro celebra cada faceta de tu ser que me hace enamorarme más cada día. " +
        "Con todo mi amor, {dedicatorName}",
      SHE_TO_HE:
        "Para {recipientNickname}, eres todos estos personajes y más. " +
        "Eres mi héroe, mi rey, mi todo. " +
        "Este libro celebra cada faceta de tu ser que me hace enamorarme más cada día. " +
        "Con todo mi amor, {dedicatorName}",
    },
    {
      label: "Creativa",
      HE_TO_SHE:
        "Para mi {recipientNickname}, superheroína, princesa, guerrera… " +
        "eres todo lo que siempre soñé y más. " +
        "Aquí están todas las razones por las que eres mi personaje favorita en esta historia llamada vida. " +
        "Tuyo siempre, {dedicatorName}",
      SHE_TO_HE:
        "Para mi {recipientNickname}, superhéroe, príncipe, guerrero… " +
        "eres todo lo que siempre soñé y más. " +
        "Aquí están todas las razones por las que eres mi personaje favorito en esta historia llamada vida. " +
        "Tuya siempre, {dedicatorName}",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, en cada página de este libro verás reflejado lo que eres para mí: " +
        "extraordinaria, poderosa, mágica. " +
        "Gracias por ser mi amor y mi inspiración. Para siempre tuyo, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, en cada página de este libro verás reflejado lo que eres para mí: " +
        "extraordinario, poderoso, mágico. " +
        "Gracias por ser mi amor y mi inspiración. Para siempre tuya, {dedicatorName}",
    },
  ],
  "Papá, Mi Héroe": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, desde que era niño supiste enseñarme a levantarme cada vez que caía. " +
        "Este libro celebra todo lo que haces por mí: tu protección, tus consejos y ese vínculo único entre padre e hijo. " +
        "Te amo, papá. Tu hijo, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, fuiste mi primer héroe y el hombre que me enseñó cuánto vale ser tratada con amor y respeto. " +
        "Este libro celebra todo lo que haces por mí: tu protección, tus abrazos y ese vínculo único entre padre e hija. " +
        "Te amo, papá. Tu hija, {dedicatorName}",
    },
    {
      label: "Admiración",
      HE_TO_SHE:
        "Papá, siempre creíste en mí cuando yo dudaba. Me enseñaste a ser fuerte, a no rendirme y a valorar lo que importa. " +
        "{recipientNickname}, eres y serás siempre mi superhéroe personal. " +
        "Con todo mi orgullo y mi amor, tu hijo {dedicatorName}",
      SHE_TO_HE:
        "Papá, siempre me hiciste sentir especial y protegida. Me enseñaste a ser valiente y nunca me dejaste sola. " +
        "{recipientNickname}, eres y serás siempre mi superhéroe personal. " +
        "Con todo mi orgullo y mi amor, tu hija {dedicatorName}",
    },
    {
      label: "Nostálgica",
      HE_TO_SHE:
        "Desde que me llevabas en tus hombros hasta hoy, siempre has sido mi héroe. " +
        "Este libro recuerda nuestras aventuras juntos, tus enseñanzas y cada abrazo que me dio fuerza cuando más lo necesitaba. " +
        "Gracias por todo, {recipientNickname}. Tu hijo, {dedicatorName}",
      SHE_TO_HE:
        "Desde que me cargabas en tus hombros hasta hoy, siempre has sido mi héroe. " +
        "Este libro recuerda nuestras citas de padre e hija, tus intentos de peinarme y cada momento que compartimos. " +
        "Gracias por todo, {recipientNickname}. Tu hija, {dedicatorName}",
    },
  ],
  "Mamá, Mi Heroína": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "Mamá, desde el primer día me protegiste, me cuidaste y me amaste sin condiciones. " +
        "Este libro es mi forma de decirte lo que las palabras no alcanzan: eres mi heroína, mi ejemplo y mi mayor orgullo. " +
        "Tu hijo, {dedicatorName}",
      SHE_TO_HE:
        "Mamá, desde el primer día me protegiste, me cuidaste y me amaste sin condiciones. " +
        "Este libro es mi forma de decirte lo que las palabras no alcanzan: eres mi heroína, mi ejemplo y mi mayor orgullo. " +
        "Tu hija, {dedicatorName}",
    },
    {
      label: "Homenaje",
      HE_TO_SHE:
        "{recipientNickname}, me diste la vida y cada día la haces más bella. " +
        "Fuiste mi refugio cuando tenía miedo, mi fuerza cuando yo no la encontraba, mi superheroína en cada momento difícil. " +
        "Este libro es para que nunca olvides cuánto te admiro. Con todo mi amor, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, me diste la vida y cada día la haces más bella. " +
        "Fuiste mi refugio cuando tenía miedo, mi fuerza cuando yo no la encontraba, mi superheroína en cada momento difícil. " +
        "Este libro es para que nunca olvides cuánto te admiro. Con todo mi amor, {dedicatorName}",
    },
    {
      label: "Gratitud",
      HE_TO_SHE:
        "{recipientNickname}, gracias por cada madrugada, cada sacrificio y cada vez que pusiste mis sueños antes que los tuyos. " +
        "Este libro no alcanza para devolverlo todo, pero sí para decirte que lo veo, lo siento y lo llevo conmigo siempre. " +
        "Te amo, mamá. {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, gracias por cada madrugada, cada sacrificio y cada vez que pusiste mis sueños antes que los tuyos. " +
        "Este libro no alcanza para devolverlo todo, pero sí para decirte que lo veo, lo siento y lo llevo conmigo siempre. " +
        "Te amo, mamá. {dedicatorName}",
    },
  ],
  "Te Amo, Abuela": [
    {
      label: "Cariñosa",
      HE_TO_SHE:
        "Abuela, hay personas que dejan huella para siempre, y tú eres una de ellas. " +
        "Contigo todo era mejor: tus abrazos, tus historias antes de dormir, esos secretos que solo éramos nosotros. " +
        "{recipientNickname}, este libro es para decirte cuánto te quiero. Tu nieto, {dedicatorName}",
      SHE_TO_HE:
        "Abuela, hay personas que dejan huella para siempre, y tú eres una de ellas. " +
        "Contigo todo era mejor: tus abrazos, tus historias antes de dormir, esos secretos que solo éramos nosotras. " +
        "{recipientNickname}, este libro es para decirte cuánto te quiero. Tu nieta, {dedicatorName}",
    },
    {
      label: "Nostálgica",
      HE_TO_SHE:
        "{recipientNickname}, de niño aprendí que contigo todo era especial: las tardes en tu casa, " +
        "tu cocina, tus consejos y esa calidez que nadie más puede dar. " +
        "Gracias por cada uno de esos momentos. Con todo mi amor, tu nieto {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, de niña aprendí que contigo todo era especial: las tardes en tu casa, " +
        "tu cocina, tus consejos y esa calidez que nadie más puede dar. " +
        "Gracias por cada uno de esos momentos. Con todo mi amor, tu nieta {dedicatorName}",
    },
    {
      label: "Con orgullo",
      HE_TO_SHE:
        "{recipientNickname}, lo que eres para mí no cabe en palabras, pero este libro lo intenta. " +
        "Tu sabiduría, tu ternura y ese amor sin condiciones que llevas en cada gesto " +
        "son parte de quién soy hoy. Te amo, abuela. {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, lo que eres para mí no cabe en palabras, pero este libro lo intenta. " +
        "Tu sabiduría, tu ternura y ese amor sin condiciones que llevas en cada gesto " +
        "son parte de quién soy hoy. Te amo, abuela. {dedicatorName}",
    },
  ],
  "Te Amo, Abuelo": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, desde chico supe que eras especial. " +
        "Tus aventuras, tu forma de ver el mundo y esa sabiduría que compartiste conmigo " +
        "son parte de quién soy hoy. Gracias por ser mi héroe y mi cómplice. Tu nieto, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, desde chica supe que eras especial. " +
        "Tus aventuras, tu forma de ver el mundo y esa sabiduría que compartiste conmigo " +
        "son parte de quién soy hoy. Gracias por ser mi héroe y mi cómplice. Tu nieta, {dedicatorName}",
    },
    {
      label: "Con admiración",
      HE_TO_SHE:
        "{recipientNickname}, me enseñaste que la verdadera fuerza no hace ruido. " +
        "En cada consejo, en cada momento que estuviste presente cuando más te necesitaba, " +
        "demostraste lo que significa ser un abuelo de verdad. Con orgullo, tu nieto {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, me enseñaste que la verdadera fuerza no hace ruido. " +
        "En cada consejo, en cada momento que estuviste presente cuando más te necesitaba, " +
        "demostraste lo que significa ser un abuelo de verdad. Con orgullo, tu nieta {dedicatorName}",
    },
    {
      label: "Gratitud",
      HE_TO_SHE:
        "{recipientNickname}, hay cosas que nunca te dije pero que llevo siempre en el corazón. " +
        "Gracias por tu paciencia, por tu ejemplo y por ese amor de abuelo que es único e irremplazable. " +
        "Te amo mucho. Tu nieto, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, hay cosas que nunca te dije pero que llevo siempre en el corazón. " +
        "Gracias por tu paciencia, por tu ejemplo y por ese amor de abuelo que es único e irremplazable. " +
        "Te amo mucho. Tu nieta, {dedicatorName}",
    },
  ],
  // ── Memorias Familiares — HE_TO_SHE = fallecido hombre | SHE_TO_HE = fallecida mujer ──────────
  "Siempre en mi Corazón": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, aunque ya no estés con nosotros, tu presencia sigue viva en cada rincón de esta familia. " +
        "Tu risa, tus consejos y tu forma de querernos son parte de quiénes somos. " +
        "Este libro es nuestro homenaje a todo lo que fuiste y todo lo que seguirás siendo. Siempre en nuestro corazón.",
      SHE_TO_HE:
        "{recipientNickname}, aunque ya no estés con nosotros, tu presencia sigue viva en cada rincón de esta familia. " +
        "Tu risa, tus consejos y tu forma de querernos son parte de quiénes somos. " +
        "Este libro es nuestro homenaje a todo lo que fuiste y todo lo que seguirás siendo. Siempre en nuestro corazón.",
    },
    {
      label: "Legado",
      HE_TO_SHE:
        "Honrar tu memoria es seguir contando tu historia, {recipientNickname}. " +
        "Este libro nació del amor que te tenemos como familia, para que nadie olvide quién fuiste: " +
        "un hombre que nos iluminó, nos cuidó y nos dejó una huella que ninguno de nosotros podrá borrar jamás.",
      SHE_TO_HE:
        "Honrar tu memoria es seguir contando tu historia, {recipientNickname}. " +
        "Este libro nació del amor que te tenemos como familia, para que nadie olvide quién fuiste: " +
        "una mujer que nos iluminó, nos cuidó y nos dejó una huella que ninguno de nosotros podrá borrar jamás.",
    },
    {
      label: "Sanadora",
      HE_TO_SHE:
        "Aprender a caminar sin verte duele, {recipientNickname}. " +
        "Pero cada vez que abrimos este libro, sentimos que sigues aquí, cuidándonos desde donde estés. " +
        "Gracias por cada abrazo, cada palabra y cada momento que nos regalaste. Te extrañamos cada día.",
      SHE_TO_HE:
        "Aprender a caminar sin verte duele, {recipientNickname}. " +
        "Pero cada vez que abrimos este libro, sentimos que sigues aquí, cuidándonos desde donde estés. " +
        "Gracias por cada abrazo, cada palabra y cada momento que nos regalaste. Te extrañamos cada día.",
    },
  ],
  "Mi Ángel Guardián": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, aunque ya no podamos escuchar tu voz, sentimos tu presencia en cada paso que damos juntos. " +
        "Este libro es nuestra forma de decirte que tu amor no se fue, que sigue vivo en cada uno de nosotros. " +
        "Eres y serás siempre nuestro ángel guardián.",
      SHE_TO_HE:
        "{recipientNickname}, aunque ya no podamos escuchar tu voz, sentimos tu presencia en cada paso que damos juntos. " +
        "Este libro es nuestra forma de decirte que tu amor no se fue, que sigue vivo en cada uno de nosotros. " +
        "Eres y serás siempre nuestra ángel guardián.",
    },
    {
      label: "Legado",
      HE_TO_SHE:
        "{recipientNickname}, honrar tu memoria es seguir adelante con la fuerza que nos enseñaste. " +
        "Este libro nació del amor que te tenemos, para que todos sepan quién fuiste: " +
        "un hombre extraordinario que nos lo dio todo sin pedir nada a cambio. Tu legado vive en nosotros.",
      SHE_TO_HE:
        "{recipientNickname}, honrar tu memoria es seguir adelante con la fuerza que nos enseñaste. " +
        "Este libro nació del amor que te tenemos, para que todos sepan quién fuiste: " +
        "una mujer extraordinaria que nos lo dio todo sin pedir nada a cambio. Tu legado vive en nosotros.",
    },
    {
      label: "Sanadora",
      HE_TO_SHE:
        "Hay días que duele más que otros, {recipientNickname}. " +
        "Pero abrir este libro nos recuerda todo lo hermoso que vivimos juntos como familia: tu risa, tu abrazo, tu forma única de cuidarnos. " +
        "Gracias por haber sido nuestro ángel, aquí y desde el cielo.",
      SHE_TO_HE:
        "Hay días que duele más que otros, {recipientNickname}. " +
        "Pero abrir este libro nos recuerda todo lo hermoso que vivimos juntos como familia: tu risa, tu abrazo, tu forma única de cuidarnos. " +
        "Gracias por haber sido nuestra ángel, aquí y desde el cielo.",
    },
  ],
  "Siempre Serás Parte de Mi Corazón": [
    {
      label: "Cómplices",
      HE_TO_SHE:
        "{recipientNickname}, crecimos juntos inventando mundos, haciendo locuras y prometiéndonos que siempre estaríamos el uno para el otro. " +
        "Este libro es nuestra promesa cumplida: tu historia, tu risa y tu espíritu viven aquí, en cada uno de nosotros, para siempre.",
      SHE_TO_HE:
        "{recipientNickname}, crecimos juntas inventando mundos, haciendo locuras y prometiéndonos que siempre estaríamos la una para la otra. " +
        "Este libro es nuestra promesa cumplida: tu historia, tu risa y tu espíritu viven aquí, en cada uno de nosotros, para siempre.",
    },
    {
      label: "Lealtad",
      HE_TO_SHE:
        "Nadie nos conocía como tú, {recipientNickname}. " +
        "Compartiste nuestros miedos, nuestros secretos y los mejores momentos de esta familia sin juzgarnos nunca. " +
        "Este libro es un tributo a tu lealtad, a tu compañía y a ese lazo que ni el tiempo puede romper.",
      SHE_TO_HE:
        "Nadie nos conocía como tú, {recipientNickname}. " +
        "Compartiste nuestros miedos, nuestros secretos y los mejores momentos de esta familia sin juzgarnos nunca. " +
        "Este libro es un tributo a tu lealtad, a tu compañía y a ese lazo que ni el tiempo puede romper.",
    },
    {
      label: "Sanadora",
      HE_TO_SHE:
        "Caminar sin ti nos enseñó lo mucho que valías, {recipientNickname}. " +
        "Pero cada vez que abrimos estas páginas, volvemos a escuchar tu voz y sentir que sigues cuidando a esta familia desde donde estés. " +
        "Siempre serás parte de nosotros, hermano.",
      SHE_TO_HE:
        "Caminar sin ti nos enseñó lo mucho que valías, {recipientNickname}. " +
        "Pero cada vez que abrimos estas páginas, volvemos a escuchar tu voz y sentir que sigues cuidando a esta familia desde donde estés. " +
        "Siempre serás parte de nosotros, hermana.",
    },
  ],
  "Gracias por tu amor": [
    {
      label: "El alma",
      HE_TO_SHE:
        "{recipientNickname}, las reuniones ya no son las mismas sin ti. " +
        "Eras el alma de esta familia: el que hacía reír a todos, el que unía, el que hacía sentir que todo estaba bien con solo estar presente. " +
        "Este libro es para que nadie te olvide.",
      SHE_TO_HE:
        "{recipientNickname}, las reuniones ya no son las mismas sin ti. " +
        "Eras el alma de esta familia: la que hacía reír a todos, la que unía, la que hacía sentir que todo estaba bien con solo estar presente. " +
        "Este libro es para que nadie te olvide.",
    },
    {
      label: "Gratitud",
      HE_TO_SHE:
        "Gracias por tu amor, {recipientNickname}. " +
        "Por cada abrazo en las reuniones, cada consejo en los momentos difíciles y cada vez que nos hiciste sentir que esta familia tenía algo especial. " +
        "Tu amor nos marcó para siempre y este libro es nuestro homenaje.",
      SHE_TO_HE:
        "Gracias por tu amor, {recipientNickname}. " +
        "Por cada abrazo en las reuniones, cada consejo en los momentos difíciles y cada vez que nos hiciste sentir que esta familia tenía algo especial. " +
        "Tu amor nos marcó para siempre y este libro es nuestro homenaje.",
    },
    {
      label: "Legado",
      HE_TO_SHE:
        "Tu partida dejó un silencio que todos sentimos, {recipientNickname}. " +
        "Pero también dejaste algo que nadie puede quitarnos: el recuerdo de cómo se sentía tenerte cerca, tu calor, tu generosidad y ese amor de familia que regalabas sin reservas. " +
        "Este libro guarda todo eso para siempre.",
      SHE_TO_HE:
        "Tu partida dejó un silencio que todos sentimos, {recipientNickname}. " +
        "Pero también dejaste algo que nadie puede quitarnos: el recuerdo de cómo se sentía tenerte cerca, tu calor, tu generosidad y ese amor de familia que regalabas sin reservas. " +
        "Este libro guarda todo eso para siempre.",
    },
  ],
  "Recuerdos Familiares": [
    {
      label: "Con amor",
      HE_TO_SHE:
        "{recipientNickname}, este libro nació del deseo de esta familia de guardar todo lo que fuiste para nosotros. " +
        "Cada foto y cada página son el abrazo colectivo que queremos darte. " +
        "Gracias por haber sido parte de nuestras vidas. Te amamos y te recordamos siempre.",
      SHE_TO_HE:
        "{recipientNickname}, este libro nació del deseo de esta familia de guardar todo lo que fuiste para nosotros. " +
        "Cada foto y cada página son el abrazo colectivo que queremos darte. " +
        "Gracias por haber sido parte de nuestras vidas. Te amamos y te recordamos siempre.",
    },
    {
      label: "Legado",
      HE_TO_SHE:
        "Tu historia merece ser contada y esta familia se encarga de contarla, {recipientNickname}. " +
        "Este libro es nuestro tributo conjunto a tu legado: " +
        "a los valores que nos dejaste, a los momentos que compartimos y al amor que nos une más allá de tu partida.",
      SHE_TO_HE:
        "Tu historia merece ser contada y esta familia se encarga de contarla, {recipientNickname}. " +
        "Este libro es nuestro tributo conjunto a tu legado: " +
        "a los valores que nos dejaste, a los momentos que compartimos y al amor que nos une más allá de tu partida.",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "Hay personas que dejan una huella tan grande que su ausencia se siente en todo, {recipientNickname}. " +
        "Tú eres una de ellas. " +
        "Este libro es nuestra forma de decirte, juntos como familia, que siempre estarás con nosotros. Que nunca te olvidaremos.",
      SHE_TO_HE:
        "Hay personas que dejan una huella tan grande que su ausencia se siente en todo, {recipientNickname}. " +
        "Tú eres una de ellas. " +
        "Este libro es nuestra forma de decirte, juntos como familia, que siempre estarás con nosotros. Que nunca te olvidaremos.",
    },
  ],
  // ── Mascotas ─────────────────────────────────────────────────────────────────
  // Mascotas: HE_TO_SHE = mascota macho | SHE_TO_HE = mascota hembra
  "Mi Mejor Amigo del Mundo": [
    {
      label: "Emotiva",
      HE_TO_SHE:
        "Para {recipientNickname}, quien convierte cada día en una aventura llena de amor, lealtad y alegría. " +
        "Gracias por ser mi mejor amigo incondicional. — {dedicatorName}",
      SHE_TO_HE:
        "Para {recipientNickname}, quien convierte cada día en una aventura llena de amor, lealtad y alegría. " +
        "Gracias por ser mi mejor amiga incondicional. — {dedicatorName}",
    },
    {
      label: "Cariñosa",
      HE_TO_SHE:
        "{recipientNickname}, el compañero más especial del mundo. " +
        "Este libro es un pequeño homenaje a todo el amor que me das cada día. " +
        "Con todo mi cariño, {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, la compañera más especial del mundo. " +
        "Este libro es un pequeño homenaje a todo el amor que me das cada día. " +
        "Con todo mi cariño, {dedicatorName}",
    },
    {
      label: "Divertida",
      HE_TO_SHE:
        "Para {recipientNickname}, mi cómplice de travesuras, mi guardián fiel y mi compañero inseparable. " +
        "Este libro es mío, tuyo y de nadie más. " +
        "Te quiero infinito. — {dedicatorName}",
      SHE_TO_HE:
        "Para {recipientNickname}, mi cómplice de travesuras, mi guardiana fiel y mi compañera inseparable. " +
        "Este libro es mío, tuyo y de nadie más. " +
        "Te quiero infinito. — {dedicatorName}",
    },
  ],
  "Mi Amigo Miauravilloso": [
    {
      label: "Misteriosa",
      HE_TO_SHE:
        "{recipientNickname}, ningún otro ser en el mundo mezcla tanto misterio con tanta ternura como tú. " +
        "Eres mi guardián silencioso, mi compañía perfecta y mi mayor alegría felina. " +
        "— {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, ningún otro ser en el mundo mezcla tanto misterio con tanta ternura como tú. " +
        "Eres mi guardiana silenciosa, mi compañía perfecta y mi mayor alegría felina. " +
        "— {dedicatorName}",
    },
    {
      label: "Divertida",
      HE_TO_SHE:
        "Para {recipientNickname}, que me ignora hasta que abro la comida, tira cosas de la mesa " +
        "y ronronea cuando menos lo espero. " +
        "Este libro celebra todas las razones por las que te amo (cuando tú quieres). — {dedicatorName}",
      SHE_TO_HE:
        "Para {recipientNickname}, que me ignora hasta que abro la comida, tira cosas de la mesa " +
        "y ronronea cuando menos lo espero. " +
        "Este libro celebra todas las razones por las que te amo (cuando tú quieres). — {dedicatorName}",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "{recipientNickname}, hay algo mágico en la forma en que me elegiste. " +
        "No sé si fui yo quien te adoptó o fue al revés, " +
        "pero sé que no querría que fuera de otra manera. Te amo, minino. — {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, hay algo mágico en la forma en que me elegiste. " +
        "No sé si fui yo quien te adoptó o fue al revés, " +
        "pero sé que no querría que fuera de otra manera. Te amo, minina. — {dedicatorName}",
    },
  ],
  "Nuestro Ángel de 4 Patas": [
    {
      label: "Homenaje",
      HE_TO_SHE:
        "{recipientNickname}, gracias por cada lamida, cada juego y cada momento de amor puro que me diste. " +
        "Tu huella en mi corazón no tiene fecha de vencimiento. " +
        "Te extraño y te llevo siempre conmigo. — {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, gracias por cada lamida, cada juego y cada momento de amor puro que me diste. " +
        "Tu huella en mi corazón no tiene fecha de vencimiento. " +
        "Te extraño y te llevo siempre conmigo. — {dedicatorName}",
    },
    {
      label: "Reconfortante",
      HE_TO_SHE:
        "Este libro es para ti, {recipientNickname}. " +
        "Para recordar todo lo que vivimos juntos: las aventuras, las travesuras " +
        "y ese amor incondicional que solo tú sabías dar. " +
        "Tu amor cruzó el puente arcoíris, pero nunca dejó mi corazón.",
      SHE_TO_HE:
        "Este libro es para ti, {recipientNickname}. " +
        "Para recordar todo lo que vivimos juntos: las aventuras, las travesuras " +
        "y ese amor incondicional que solo tú sabías dar. " +
        "Tu amor cruzó el puente arcoíris, pero nunca dejó mi corazón.",
    },
    {
      label: "Gratitud",
      HE_TO_SHE:
        "{recipientNickname}, me diste algo que pocas cosas en la vida pueden dar: " +
        "amor sin condiciones, lealtad sin dudas y alegría en cada momento. " +
        "Este libro es mi forma de decirte gracias, siempre. — {dedicatorName}",
      SHE_TO_HE:
        "{recipientNickname}, me diste algo que pocas cosas en la vida pueden dar: " +
        "amor sin condiciones, lealtad sin dudas y alegría en cada momento. " +
        "Este libro es mi forma de decirte gracias, siempre. — {dedicatorName}",
    },
  ],
  "Aventura Entre Patas": [
    {
      label: "Aventurera",
      HE_TO_SHE:
        "Porque las mejores aventuras siempre son las que vivimos juntos. " +
        "Este libro celebra cada locura, cada risa y cada momento que {recipientNickname} y los pequeños de la familia compartieron. " +
        "Nada mejor que crecer con un amigo peludo al lado.",
      SHE_TO_HE:
        "Porque las mejores aventuras siempre son las que vivimos juntos. " +
        "Este libro celebra cada locura, cada risa y cada momento que {recipientNickname} y los pequeños de la familia compartieron. " +
        "Nada mejor que crecer con un amigo peludo al lado.",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "Hay algo mágico en ver a {recipientNickname} y a los niños juntos: " +
        "los secretos que comparten, las carreras que inventan, los abrazos que no terminan. " +
        "Este libro guarda esos momentos para siempre.",
      SHE_TO_HE:
        "Hay algo mágico en ver a {recipientNickname} y a los niños juntos: " +
        "los secretos que comparten, las carreras que inventan, los abrazos que no terminan. " +
        "Este libro guarda esos momentos para siempre.",
    },
    {
      label: "Familiar",
      HE_TO_SHE:
        "{recipientNickname} llegó a esta familia y la hizo más completa. " +
        "Este libro es para recordar que los mejores recuerdos siempre tienen patas, risas y mucho amor.",
      SHE_TO_HE:
        "{recipientNickname} llegó a esta familia y la hizo más completa. " +
        "Este libro es para recordar que los mejores recuerdos siempre tienen patas, risas y mucho amor.",
    },
  ],
  // ── Hermanos ──────────────────────────────────────────────────────────────────
  "El Mejor Equipo": [
    {
      label: "Épica",
      HE_TO_SHE:
        "Porque ser hermanos es la mejor aventura del mundo. " +
        "Este libro celebra cada momento que compartimos, cada locura inventada, cada risa que no pudimos parar. " +
        "Juntos somos invencibles. Somos el mejor equipo.",
      SHE_TO_HE:
        "Porque ser hermanos es la mejor aventura del mundo. " +
        "Este libro celebra cada momento que compartimos, cada locura inventada, cada risa que no pudimos parar. " +
        "Juntos somos invencibles. Somos el mejor equipo.",
    },
    {
      label: "Divertida",
      HE_TO_SHE:
        "Inventamos juegos imposibles, construimos castillos de cojines e hicimos travesuras que nadie más entendería. " +
        "Eso es lo que nos hace el mejor equipo. " +
        "Este libro es nuestro. Cada página, una razón para ser hermanos.",
      SHE_TO_HE:
        "Inventamos juegos imposibles, construimos castillos de cojines e hicimos travesuras que nadie más entendería. " +
        "Eso es lo que nos hace el mejor equipo. " +
        "Este libro es nuestro. Cada página, una razón para ser hermanos.",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "Quizás peleamos por el control remoto. Quizás nos robamos la ropa. " +
        "Pero cuando algo importa de verdad, siempre estamos el uno para el otro. " +
        "Porque más que hermanos, somos el mejor equipo.",
      SHE_TO_HE:
        "Quizás peleamos por el control remoto. Quizás nos robamos la ropa. " +
        "Pero cuando algo importa de verdad, siempre estamos el uno para el otro. " +
        "Porque más que hermanos, somos el mejor equipo.",
    },
  ],
  "La Familia": [
    {
      label: "Con amor",
      HE_TO_SHE:
        "Los {familyName} somos nuestro lugar favorito en el mundo. " +
        "En estas páginas están los momentos, las risas y las aventuras que nos definen. " +
        "Este libro es para cada uno de nosotros: para recordarnos siempre cuánto nos amamos.",
      SHE_TO_HE:
        "Los {familyName} somos nuestro lugar favorito en el mundo. " +
        "En estas páginas están los momentos, las risas y las aventuras que nos definen. " +
        "Este libro es para cada uno de nosotros: para recordarnos siempre cuánto nos amamos.",
    },
    {
      label: "Emotiva",
      HE_TO_SHE:
        "No necesitamos ser astronautas ni piratas para vivir una aventura. Nos basta con estar juntos. " +
        "Este libro es un abrazo para toda la familia {familyName}: " +
        "por todo lo que fuimos, lo que somos y lo que seguiremos siendo.",
      SHE_TO_HE:
        "No necesitamos ser astronautas ni piratas para vivir una aventura. Nos basta con estar juntos. " +
        "Este libro es un abrazo para toda la familia {familyName}: " +
        "por todo lo que fuimos, lo que somos y lo que seguiremos siendo.",
    },
    {
      label: "Nuestra historia",
      HE_TO_SHE:
        "Cada familia tiene su propia magia. La de los {familyName} está en las cenas ruidosas, " +
        "los planes imposibles y ese amor que crece cada día. " +
        "Este libro es nuestra historia, y la mejor parte es que todavía nos falta mucho por escribir.",
      SHE_TO_HE:
        "Cada familia tiene su propia magia. La de los {familyName} está en las cenas ruidosas, " +
        "los planes imposibles y ese amor que crece cada día. " +
        "Este libro es nuestra historia, y la mejor parte es que todavía nos falta mucho por escribir.",
    },
  ],
};

function resolveDedicationText(
  text: string,
  recipientName: string,
  recipientNickname: string,
  dedicatorName: string,
  daysCount: string,
  startDate: string,
  familyName: string,
): string {
  return text
    .replace(/\{recipientNickname\}/g, recipientNickname || recipientName || "amor")
    .replace(/\{recipientName\}/g, recipientName || "amor")
    .replace(/\{dedicatorName\}/g, dedicatorName || "")
    .replace(/\{daysCount\}/g, daysCount || "___")
    .replace(/\{startDate\}/g, startDate || "___")
    .replace(/\{familyName\}/g, familyName || "nuestra familia");
}

function getDedicationOptions(libroNombre: string): DedicationOption[] {
  return DEDICATION_OPTIONS[libroNombre] ?? DEDICATION_OPTIONS["10 o 15 Razones Por Las Que Te Amo"];
}

// HE_TO_HE usa template HE_TO_SHE, SHE_TO_SHE usa template SHE_TO_HE

// ── Wizard mode ───────────────────────────────────────────────────────────────

type WizardMode = "amor" | "mascotas" | "familia" | "familia-grupo" | "hermanos" | "memorial";

function getWizardMode(categoriaSlug: string, libroNombre: string): WizardMode {
  if (categoriaSlug === "libros-de-amor") return "amor";
  if (categoriaSlug === "libros-de-mascotas") return "mascotas";
  if (categoriaSlug === "libros-de-memorias-familiares") return "memorial";
  if (categoriaSlug === "libros-de-familia") {
    if (libroNombre === "La Familia" || libroNombre === "Mi Familia") return "familia-grupo";
    if (libroNombre === "El Mejor Equipo") return "hermanos";
    return "familia";
  }
  return "amor";
}

// Para "familia" el destinatario está implícito en el nombre del libro
function getFamiliaRecipientGender(libroNombre: string): "M" | "F" {
  return ["Mamá, Mi Heroína", "Te Amo, Abuela"].includes(libroNombre) ? "F" : "M";
}

type PhotoConfig = { recipient: number; dedicator: number };
const PHOTO_CONFIG: Record<WizardMode, PhotoConfig> = {
  "amor":          { recipient: 2, dedicator: 2 },
  "mascotas":      { recipient: 3, dedicator: 3 },
  "memorial":      { recipient: 3, dedicator: 3 },
  "familia":       { recipient: 2, dedicator: 2 },
  "familia-grupo": { recipient: 10, dedicator: 0 },
  "hermanos":      { recipient: 6, dedicator: 0 },
};

// ── Wizard steps ──────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { number: 1, title: "Tipo" },
  { number: 2, title: "Para quién" },
  { number: 3, title: "De quién" },
  { number: 4, title: "Escenarios" },
  { number: 5, title: "Tapa" },
  { number: 6, title: "Dedicatoria" },
  { number: 7, title: "Tus Datos" },
  { number: 8, title: "Resumen" },
  { number: 9, title: "Enviar" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function applyBestPromo(priceCents: number, promos: ActivePromo[], catalogBookId?: number): number | undefined {
  const applicable = promos.filter(
    (p) =>
      p.targetType === "all" ||
      (p.targetType === "model" && catalogBookId !== undefined && p.targetId === catalogBookId),
  );
  if (!applicable.length) return undefined;
  let best = priceCents;
  for (const p of applicable) {
    const result =
      p.discountType === "percent"
        ? Math.round(priceCents * (1 - p.discountValue / 100))
        : Math.max(0, priceCents - p.discountValue);
    if (result < best) best = result;
  }
  return best < priceCents ? best : undefined;
}

function formatPrice(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}


// ── MemberSection — zona de carga por integrante (familia-grupo / hermanos) ────
// Definido fuera del componente principal para que React no lo desmonte en cada render.

function MemberSection({
  label, svgIcon, name, setName, upload, accent, isMobile,
}: {
  label: string;
  svgIcon: React.ReactNode;
  name: string;
  setName: (v: string) => void;
  upload: ReturnType<typeof usePhotoUpload>;
  accent: string;
  isMobile: boolean;
}) {
  const atLimit = upload.photos.length >= 2;
  function openPicker() {
    if (atLimit) return;
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.multiple = true; input.style.display = "none";
    document.body.appendChild(input);
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) upload.uploadFiles(Array.from(files).slice(0, 2 - upload.photos.length));
      input.remove();
    };
    input.click();
  }
  return (
    <div style={{ borderRadius: "16px", border: `1.5px solid ${accent}20`, background: "#fafafa", overflow: "hidden", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: `${accent}06`, borderBottom: `1px solid ${accent}15` }}>
        {svgIcon}
        <span style={{ fontSize: "15px", fontWeight: 700, color: accent }}>{label}</span>
        <span style={{ marginLeft: "auto", fontSize: "12px", color: "#999" }}>{upload.photos.length}/2 fotos</span>
      </div>
      <div style={{ padding: "14px 18px", display: "flex", gap: "16px", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Nombre *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Nombre de ${label.toLowerCase()}`}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Fotos (hasta 2) *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            {upload.photos.map((p) => (
              <div key={p.id} style={{ position: "relative", width: "52px", height: "52px", borderRadius: "10px", overflow: "hidden", border: `2px solid ${accent}40` }}>
                <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => upload.removePhoto(p.id)} style={{ position: "absolute", top: "2px", right: "2px", width: "16px", height: "16px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
            {!atLimit && (
              <button onClick={openPicker} style={{ width: "52px", height: "52px", borderRadius: "10px", border: `2px dashed ${accent}40`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span style={{ fontSize: "8px", fontWeight: 700, color: accent }}>FOTO</span>
              </button>
            )}
            {upload.uploading && (
              <div style={{ width: "52px", height: "52px", borderRadius: "10px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", color: "#999" }}>{upload.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function WizardSection({ accent, dbIds, variants, templates, libroNombre, categoriaSlug }: Props) {
  const { isMobile, isSmallMobile } = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [promos, setPromos] = useState<ActivePromo[]>([]);

  // Wizard mode — derivado de categoría y libro
  const wizardMode = getWizardMode(categoriaSlug, libroNombre);
  const photoConfig = PHOTO_CONFIG[wizardMode];
  // Para familia-grupo y hermanos, el step 3 no existe; se salta del 2 al 4
  const nextAfterRecipient = (wizardMode === "familia-grupo" || wizardMode === "hermanos") ? 4 : 3;

  // Step 1 — gender direction
  const [genderDirection, setGenderDirection] = useState<GenderDirection>("");
  const [dedicatorGender, setDedicatorGender] = useState<"M" | "F" | "">("");
  const [recipientGender, setRecipientGender] = useState<"M" | "F" | "">("");

  // Step 2 — recipient
  const [recipientName, setRecipientName] = useState("");
  const [recipientNickname, setRecipientNickname] = useState("");
  const recipientUpload = usePhotoUpload("uploads/customers");

  // Step 3 — dedicator
  const [dedicatorName, setDedicatorName] = useState("");
  const dedicatorUpload = usePhotoUpload("uploads/customers");

  // Aventura Entre Patas — múltiples dueños
  const [numOwners, setNumOwners] = useState<1 | 2 | 3>(1);
  // Siempre Serás Parte de Mi Corazón — múltiples hermanos (reusa owner2/owner3)
  const [numSiblings, setNumSiblings] = useState<2 | 3>(2);
  const [owner2Name, setOwner2Name] = useState("");
  const [owner3Name, setOwner3Name] = useState("");
  const owner2Upload = usePhotoUpload("uploads/customers");
  const owner3Upload = usePhotoUpload("uploads/customers");
  const isAventuraEntrePatas = libroNombre === "Aventura Entre Patas";

  // Familia-grupo — nombre de la familia y miembros
  const [familyName, setFamilyName] = useState("");
  const [numHijos, setNumHijos] = useState<1 | 2 | 3>(1);
  const familiaGrupoTotalPhotos = 4 + numHijos * 2;
  const [papaName, setPapaName] = useState("");
  const [mamaName, setMamaName] = useState("");
  const [hijo1Name, setHijo1Name] = useState("");
  const [hijo2Name, setHijo2Name] = useState("");
  const [hijo3Name, setHijo3Name] = useState("");
  const papaUpload = usePhotoUpload("uploads/customers");
  const mamaUpload = usePhotoUpload("uploads/customers");
  const hijo1Upload = usePhotoUpload("uploads/customers");
  const hijo2Upload = usePhotoUpload("uploads/customers");
  const hijo3Upload = usePhotoUpload("uploads/customers");

  // Hermanos — número de hermanos y género por integrante
  const [numHermanos, setNumHermanos] = useState<2 | 3>(2);
  const [hermano1Gender, setHermano1Gender] = useState<"M" | "F" | "">("");
  const [hermano2Gender, setHermano2Gender] = useState<"M" | "F" | "">("");
  const [hermano3Gender, setHermano3Gender] = useState<"M" | "F" | "">("");
  // (reusa hijo1/2/3Name y hijo1/2/3Upload — los modos son mutuamente excluyentes)

  // Step 4 — templates
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

  // Step 5 — cover & package
  const [selectedVariantId, setSelectedVariantId] = useState<number>(variants[0]?.id ?? 0);
  const [selectedPackage, setSelectedPackage] = useState<"STANDARD" | "PREMIUM">("STANDARD");
  const [wantsRush, setWantsRush] = useState(false);
  const EXTRA_PLANTILLAS_CENTS = 4000;
  const RUSH_FEE_CENTS = 2500;
  const MIN_NORMAL_DAYS = 4;
  const MIN_RUSH_DAYS = 2;

  // Step 6 — dedication
  const [selectedDedicationIdx, setSelectedDedicationIdx] = useState<number | null>(0);
  const [customDedication, setCustomDedication] = useState("");
  const [relationshipStartDate, setRelationshipStartDate] = useState("");

  // Step 7 — contact & shipping
  const [form, setForm] = useState({
    customerFullName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "",
    shippingRegion: "",
    shippingReference: "",
    messageOptional: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Step animation
  const [animKey, setAnimKey] = useState(0);
  const [animDir, setAnimDir] = useState<"forward" | "backward">("forward");
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    fetch(`${API_BASE}/api/promotions/active`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setPromos)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      setAnimDir(currentStep > prevStepRef.current ? "forward" : "backward");
      setAnimKey((k) => k + 1);
      prevStepRef.current = currentStep;
    }
  }, [currentStep]);

  useEffect(() => {
    if (dedicatorGender && recipientGender) {
      if (dedicatorGender === "M" && recipientGender === "F") setGenderDirection("HE_TO_SHE");
      else if (dedicatorGender === "F" && recipientGender === "M") setGenderDirection("SHE_TO_HE");
      else if (dedicatorGender === "M" && recipientGender === "M") setGenderDirection("HE_TO_HE");
      else setGenderDirection("SHE_TO_SHE");
    } else {
      setGenderDirection("");
    }
  }, [dedicatorGender, recipientGender]);

  const activeGlobalPromo = promos.find(
    (p) =>
      p.targetType === "all" ||
      (p.targetType === "model" && dbIds !== null && p.targetId === dbIds.catalogBookId),
  );
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  function updateForm(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleTemplate(id: number) {
    setSelectedTemplates((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  const isSheToHe = genderDirection === "SHE_TO_HE" || genderDirection === "SHE_TO_SHE";
  const daysCount = (() => {
    if (!relationshipStartDate) return "";
    const diff = Math.floor((Date.now() - new Date(relationshipStartDate + "T00:00:00").getTime()) / 86400000);
    return diff > 0 ? diff.toString() : "";
  })();
  const startDateFormatted = (() => {
    if (!relationshipStartDate) return "";
    return new Date(relationshipStartDate + "T00:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
  })();
  const dedicationOptions = getDedicationOptions(libroNombre);
  // Para mascotas: template varía por género de la mascota.
  // Para memorial: template varía por género del fallecido (recipientGender).
  // Para el resto: varía por género del dedicante (isSheToHe).
  const usePetFemaleTemplate = wizardMode === "mascotas" && recipientGender === "F";
  const useMemorialFemaleTemplate = wizardMode === "memorial" && recipientGender === "F";
  const useFemaleDedicatorTemplate = wizardMode !== "mascotas" && wizardMode !== "memorial" && isSheToHe;
  const useAlternateTemplate = usePetFemaleTemplate || useMemorialFemaleTemplate || useFemaleDedicatorTemplate;
  const resolvedOptions = dedicationOptions.map((opt) =>
    resolveDedicationText(
      useAlternateTemplate ? opt.SHE_TO_HE : opt.HE_TO_SHE,
      recipientName, recipientNickname, dedicatorName, daysCount, startDateFormatted, familyName,
    )
  );
  const dedicationText = selectedDedicationIdx !== null
    ? (resolvedOptions[selectedDedicationIdx] ?? "")
    : customDedication;

  const step7Valid =
    !!form.customerFullName &&
    !!form.customerEmail &&
    !!form.customerPhone &&
    !!form.shippingAddressLine1;

  async function handleSubmit() {
    if (!dbIds) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const finalDedication = dedicationText;
      const allAssetIds = wizardMode === "familia-grupo"
        ? [
            ...papaUpload.photos.map((p) => p.id),
            ...mamaUpload.photos.map((p) => p.id),
            ...hijo1Upload.photos.map((p) => p.id),
            ...(numHijos >= 2 ? hijo2Upload.photos.map((p) => p.id) : []),
            ...(numHijos >= 3 ? hijo3Upload.photos.map((p) => p.id) : []),
          ]
        : wizardMode === "hermanos"
        ? [
            ...hijo1Upload.photos.map((p) => p.id),
            ...hijo2Upload.photos.map((p) => p.id),
            ...(numHermanos >= 3 ? hijo3Upload.photos.map((p) => p.id) : []),
          ]
        : isAventuraEntrePatas
        ? [
            ...recipientUpload.photos.map((p) => p.id),
            ...dedicatorUpload.photos.map((p) => p.id),
            ...(numOwners >= 2 ? owner2Upload.photos.map((p) => p.id) : []),
            ...(numOwners >= 3 ? owner3Upload.photos.map((p) => p.id) : []),
          ]
        : wizardMode === "memorial" && libroNombre === "Siempre Serás Parte de Mi Corazón"
        ? [
            ...recipientUpload.photos.map((p) => p.id),
            ...dedicatorUpload.photos.map((p) => p.id),
            ...(numSiblings >= 3 ? owner2Upload.photos.map((p) => p.id) : []),
          ]
        : [
            ...recipientUpload.photos.map((p) => p.id),
            ...dedicatorUpload.photos.map((p) => p.id),
          ];
      const res = await fetch(`${API_BASE}/api/demo/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogBookId: dbIds.catalogBookId,
          catalogBookVariantId: selectedVariantId,
          personalizedCategoryId: dbIds.personalizedCategoryId,
          personalizedModelId: dbIds.personalizedModelId,
          customerFullName: form.customerFullName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          shippingAddressLine1: form.shippingAddressLine1,
          shippingAddressLine2: form.shippingAddressLine2 || null,
          shippingCity: form.shippingCity || null,
          shippingRegion: form.shippingRegion || null,
          shippingReference: form.shippingReference || null,
          wantsRush,
          packagePreference: selectedPackage,
          wantsCustomDedication: selectedDedicationIdx === null,
          dedicationText: finalDedication || null,
          messageOptional: form.messageOptional || null,
          templateIds: selectedTemplates,
          assetIds: allAssetIds,
          recipientName: wizardMode === "familia-grupo" || wizardMode === "hermanos" ? null : recipientName || null,
          recipientNickname: wizardMode === "familia-grupo" || wizardMode === "hermanos" ? null : recipientNickname || null,
          dedicatorName: wizardMode === "familia-grupo" || wizardMode === "hermanos" ? null : dedicatorName || null,
          genderDirection: wizardMode === "familia-grupo" || wizardMode === "hermanos" ? null : genderDirection || null,
          characterMeta: wizardMode === "familia-grupo"
            ? {
                mode: "familia-grupo",
                familyName: familyName || null,
                papa: { name: papaName, assetIds: papaUpload.photos.map((p) => p.id) },
                mama: { name: mamaName, assetIds: mamaUpload.photos.map((p) => p.id) },
                hijos: [
                  { name: hijo1Name, assetIds: hijo1Upload.photos.map((p) => p.id) },
                  ...(numHijos >= 2 ? [{ name: hijo2Name, assetIds: hijo2Upload.photos.map((p) => p.id) }] : []),
                  ...(numHijos >= 3 ? [{ name: hijo3Name, assetIds: hijo3Upload.photos.map((p) => p.id) }] : []),
                ],
              }
            : wizardMode === "hermanos"
            ? {
                mode: "hermanos",
                hermanos: [
                  { name: hijo1Name, gender: hermano1Gender, assetIds: hijo1Upload.photos.map((p) => p.id) },
                  { name: hijo2Name, gender: hermano2Gender, assetIds: hijo2Upload.photos.map((p) => p.id) },
                  ...(numHermanos >= 3 ? [{ name: hijo3Name, gender: hermano3Gender, assetIds: hijo3Upload.photos.map((p) => p.id) }] : []),
                ],
              }
            : wizardMode === "memorial" && libroNombre === "Siempre Serás Parte de Mi Corazón"
            ? {
                mode: "memorial-hermanos",
                totalSiblings: numSiblings,
                recipient: { name: recipientName, nickname: recipientNickname || null, gender: recipientGender, assetIds: recipientUpload.photos.map((p) => p.id) },
                livingSiblings: [
                  { name: dedicatorName, assetIds: dedicatorUpload.photos.map((p) => p.id) },
                  ...(numSiblings >= 3 ? [{ name: owner2Name, assetIds: owner2Upload.photos.map((p) => p.id) }] : []),
                ],
              }
            : wizardMode === "memorial" && libroNombre === "Gracias por tu amor"
            ? {
                mode: "memorial-familia",
                recipient: { name: recipientName, nickname: recipientNickname || null, gender: recipientGender, assetIds: recipientUpload.photos.map((p) => p.id) },
                familyPhotos: dedicatorUpload.photos.map((p) => p.id),
              }
            : isAventuraEntrePatas
            ? {
                mode: "mascotas-aventura",
                pet: { name: recipientName, nickname: recipientNickname || null, gender: recipientGender, assetIds: recipientUpload.photos.map((p) => p.id) },
                owners: [
                  { name: dedicatorName, gender: dedicatorGender, assetIds: dedicatorUpload.photos.map((p) => p.id) },
                  ...(numOwners >= 2 ? [{ name: owner2Name, assetIds: owner2Upload.photos.map((p) => p.id) }] : []),
                  ...(numOwners >= 3 ? [{ name: owner3Name, assetIds: owner3Upload.photos.map((p) => p.id) }] : []),
                ],
              }
            : {
                mode: wizardMode,
                recipient: { name: recipientName, nickname: recipientNickname || null, assetIds: recipientUpload.photos.map((p) => p.id) },
                ...(photoConfig.dedicator > 0 ? { dedicator: { name: dedicatorName, assetIds: dedicatorUpload.photos.map((p) => p.id) } } : {}),
              },
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error al enviar" }));
        throw new Error(err.message);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSubmitting(false);
    }
  }

  const navBtn = (label: string, onClick: () => void, primary = false, disabled = false) => (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "12px 28px",
        borderRadius: "10px",
        border: primary ? "none" : `1px solid ${accent}`,
        background: primary ? (disabled ? "#e0e0e0" : accent) : "#fff",
        color: primary ? (disabled ? "#999" : "#fff") : accent,
        fontSize: "15px",
        fontWeight: primary ? 700 : 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );

  return (
    <section
      id="wizard-section"
      style={{ width: "100%", position: "relative", overflow: "hidden", background: "#ffffff" }}
    >
      <WizardBackground accent={accent} />
      <style>{`
        @keyframes wzSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wzSlideBack {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile ? "40px 16px" : "80px 48px",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${accent}12`,
              border: `1px solid ${accent}30`,
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "16px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill={accent}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px" }}>
              Proceso guiado
            </span>
          </div>
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: isSmallMobile ? "24px" : isMobile ? "28px" : "40px",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.5px",
            }}
          >
            Crea tu libro personalizado
          </h2>
          <p style={{ margin: 0, fontSize: "16px", color: "#666", lineHeight: 1.5 }}>
            Un proceso simple, guiado paso a paso. Nosotros hacemos el resto.
          </p>
        </div>

        {/* ── Step indicators ── */}
        {!submitted && currentStep > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "40px",
              overflowX: "auto",
              paddingBottom: "4px",
              gap: 0,
            }}
          >
            {WIZARD_STEPS.map((step, idx) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const circleSize = isMobile ? "26px" : "36px";
              return (
                <div key={step.number} style={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <button
                      onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                      style={{
                        width: circleSize,
                        height: circleSize,
                        borderRadius: "50%",
                        border: "none",
                        background: isActive || isCompleted ? accent : "#e5e7eb",
                        cursor: step.number <= currentStep ? "pointer" : "default",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive ? `0 0 0 3px ${accent}28` : "none",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: isActive || isCompleted ? "#fff" : "#aaa" }}>
                        {isCompleted ? "✓" : step.number}
                      </span>
                    </button>
                    {!isMobile && (
                      <span style={{ fontSize: "8px", fontWeight: 600, color: isActive ? accent : isCompleted ? accent : "#ccc", textTransform: "uppercase", letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
                        {step.title}
                      </span>
                    )}
                  </div>
                  {idx < WIZARD_STEPS.length - 1 && (
                    <div
                      style={{
                        width: isMobile ? "10px" : "20px",
                        height: "2px",
                        marginTop: isMobile ? "12px" : "17px",
                        flexShrink: 0,
                        background: "#e5e7eb",
                        position: "relative",
                        overflow: "hidden",
                        marginInline: isMobile ? "2px" : "4px",
                      }}
                    >
                      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: isCompleted ? "100%" : "0%", background: accent, transition: "width 0.4s ease" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Content area ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid #ebebeb",
            padding: isMobile ? "24px 16px" : "48px",
            minHeight: "350px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div key={animKey} style={{ animation: `${animDir === "forward" ? "wzSlideIn" : "wzSlideBack"} 0.3s cubic-bezier(0.4,0,0.2,1) both` }}>

          {/* ── Step 0: Intro ── */}
          {currentStep === 0 && (
            <div style={{ textAlign: "center", padding: isMobile ? "16px 0 24px" : "24px 0 40px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                  gap: "12px",
                  marginBottom: "36px",
                }}
              >
                {(
                  [
                    { label: "Elige el tipo de libro", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
                    { label: "Carga las fotos del personaje", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                    { label: "Elige escenarios y tapa", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
                    { label: "Personaliza la dedicatoria", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                  ] as { label: string; icon: React.ReactNode }[]
                ).map((s, i) => (
                  <div
                    key={i}
                    style={{ background: "#fafafa", borderRadius: "16px", padding: "20px 12px", border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
                  >
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {s.icon}
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", lineHeight: 1.4, textAlign: "center" }}>{s.label}</span>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${accent}18`, fontSize: "11px", fontWeight: 700, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  </div>
                ))}
              </div>

              {activeGlobalPromo && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "12px", padding: "10px 20px", marginBottom: "20px", fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/></svg>
                  {activeGlobalPromo.label} — {activeGlobalPromo.discountType === "percent" ? `${activeGlobalPromo.discountValue}% OFF` : `S/ ${(activeGlobalPromo.discountValue / 100).toFixed(2)} de descuento`} aplicado
                </div>
              )}

              <button
                onClick={() => setCurrentStep(1)}
                style={{ padding: "15px 44px", borderRadius: "14px", border: "none", background: accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 6px 24px ${accent}40` }}
              >
                Crear mi libro
              </button>
            </div>
          )}

          {/* ── Step 1: Configuración inicial (varía por modo) ── */}
          {currentStep === 1 && (() => {
            // ── Helper: tarjeta de género reutilizable ──
            const GenderCard = ({ id, g, isSelected, onClick, label }: { id: string; g: "M"|"F"; isSelected: boolean; onClick: () => void; label?: string }) => {
              const color = isSelected ? accent : "#bbb";
              return (
                <button key={id} type="button" onClick={onClick} style={{ padding: isMobile ? "18px 12px" : "22px 16px", borderRadius: "16px", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", transition: "all 0.2s ease", boxShadow: isSelected ? `0 4px 20px ${accent}20` : "none" }}>
                  {g === "M" ? (
                    <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
                      <circle cx="24" cy="13" r="10" stroke={color} strokeWidth="2"/>
                      <path d="M4 56 C4 34 44 34 44 56" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
                      <circle cx="24" cy="13" r="10" stroke={color} strokeWidth="2"/>
                      <path d="M8 60L24 30L40 60" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="8" y1="47" x2="40" y2="47" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span style={{ fontSize: "17px", fontWeight: 700, color: isSelected ? accent : "#444" }}>{label ?? (g === "M" ? "Él" : "Ella")}</span>
                  {isSelected && (
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                  )}
                </button>
              );
            };

            const summaryBox = (text: string) => (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 18px", borderRadius: "12px", background: `${accent}08`, border: `1px solid ${accent}25`, marginBottom: "28px", animation: "wzSlideIn 0.3s cubic-bezier(0.4,0,0.2,1) both" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={accent}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span style={{ fontSize: "14px", fontWeight: 600, color: accent }}>{text}</span>
              </div>
            );

            // ── AMOR ──
            if (wizardMode === "amor") {
              const step1Valid = dedicatorGender !== "" && recipientGender !== "";
              return (
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>Personalicemos la dedicatoria</h3>
                  <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>Cuéntanos quién regala y quién recibe el libro.</p>
                  <div style={{ marginBottom: "24px" }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Quién dedica el libro?</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {(["M", "F"] as const).map((g) => <GenderCard key={`ded-${g}`} id={`ded-${g}`} g={g} isSelected={dedicatorGender === g} onClick={() => setDedicatorGender(g)} />)}
                    </div>
                  </div>
                  {dedicatorGender !== "" && (
                    <div style={{ marginBottom: "28px", animation: "wzSlideIn 0.3s cubic-bezier(0.4,0,0.2,1) both" }}>
                      <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿A quién va dedicado?</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {(["M", "F"] as const).map((g) => <GenderCard key={`rec-${g}`} id={`rec-${g}`} g={g} isSelected={recipientGender === g} onClick={() => setRecipientGender(g)} />)}
                      </div>
                    </div>
                  )}
                  {step1Valid && summaryBox(`${dedicatorGender === "M" ? "Él" : "Ella"} le dedica el libro a ${recipientGender === "M" ? "él" : "ella"}`)}
                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                    {navBtn("Anterior", () => setCurrentStep(0))}
                    {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                  </div>
                </div>
              );
            }

            // ── MASCOTAS ──
            if (wizardMode === "mascotas") {
              const petGenderBtn = (g: "M" | "F", label: string) => (
                <button type="button" onClick={() => setRecipientGender(g)} style={{ padding: isMobile ? "18px 12px" : "22px 16px", borderRadius: "16px", border: recipientGender === g ? `2px solid ${accent}` : "2px solid #e5e7eb", background: recipientGender === g ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", transition: "all 0.2s ease", boxShadow: recipientGender === g ? `0 4px 20px ${accent}20` : "none" }}>
                  <span style={{ fontSize: "32px" }}>🐾</span>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: recipientGender === g ? accent : "#444" }}>{label}</span>
                  {recipientGender === g && <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>}
                </button>
              );

              // Aventura Entre Patas — sin pregunta de género del dueño, con selector de cantidad
              if (isAventuraEntrePatas) {
                const step1Valid = recipientGender !== "";
                return (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>Personalicemos el libro</h3>
                    <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>Cuéntanos un poco sobre la mascota y cuántos dueños participan.</p>
                    <div style={{ marginBottom: "24px" }}>
                      <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Tu mascota es...?</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {petGenderBtn("M", "Macho")}
                        {petGenderBtn("F", "Hembra")}
                      </div>
                    </div>
                    {recipientGender !== "" && (
                      <div style={{ marginBottom: "28px", animation: "wzSlideIn 0.3s cubic-bezier(0.4,0,0.2,1) both" }}>
                        <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Cuántos dueños tiene la mascota?</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                          {([1, 2, 3] as const).map((n) => (
                            <button key={n} type="button" onClick={() => setNumOwners(n)} style={{ padding: "12px 8px", borderRadius: "12px", border: numOwners === n ? `2px solid ${accent}` : "2px solid #e5e7eb", background: numOwners === n ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "15px", color: numOwners === n ? accent : "#555", transition: "all 0.2s ease" }}>
                              {n} {n === 1 ? "dueño" : "dueños"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step1Valid && summaryBox(`Mascota ${recipientGender === "M" ? "macho" : "hembra"} — ${numOwners} ${numOwners === 1 ? "dueño" : "dueños"}`)}
                    <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                      {navBtn("Anterior", () => setCurrentStep(0))}
                      {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                    </div>
                  </div>
                );
              }

              // Resto de libros de mascotas
              const step1Valid = dedicatorGender !== "" && recipientGender !== "";
              return (
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>Personalicemos la dedicatoria</h3>
                  <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>Cuéntanos un poco sobre la mascota y quién regala el libro.</p>
                  <div style={{ marginBottom: "24px" }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Tu mascota es...?</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {petGenderBtn("M", "Macho")}
                      {petGenderBtn("F", "Hembra")}
                    </div>
                  </div>
                  {recipientGender !== "" && (
                    <div style={{ marginBottom: "28px", animation: "wzSlideIn 0.3s cubic-bezier(0.4,0,0.2,1) both" }}>
                      <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Quién le regala el libro?</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {(["M", "F"] as const).map((g) => <GenderCard key={`ded-${g}`} id={`ded-${g}`} g={g} isSelected={dedicatorGender === g} onClick={() => setDedicatorGender(g)} />)}
                      </div>
                    </div>
                  )}
                  {step1Valid && summaryBox(`${dedicatorGender === "M" ? "Él" : "Ella"} le dedica el libro a su mascota (${recipientGender === "M" ? "macho" : "hembra"})`)}
                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                    {navBtn("Anterior", () => setCurrentStep(0))}
                    {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                  </div>
                </div>
              );
            }

            // ── MEMORIAL ──
            if (wizardMode === "memorial") {
              const step1Valid = recipientGender !== "";
              return (
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>Personalicemos el libro</h3>
                  <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>¿A quién está dedicado este libro?</p>
                  <div style={{ marginBottom: "28px" }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>La persona que quieres recordar era...</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {(["M", "F"] as const).map((g) => <GenderCard key={`rec-${g}`} id={`rec-${g}`} g={g} isSelected={recipientGender === g} onClick={() => setRecipientGender(g)} />)}
                    </div>
                  </div>
                  {step1Valid && summaryBox(`Un libro dedicado a ${recipientGender === "M" ? "él" : "ella"}, siempre en tu corazón`)}
                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                    {navBtn("Anterior", () => setCurrentStep(0))}
                    {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                  </div>
                </div>
              );
            }

            // ── FAMILIA ──
            if (wizardMode === "familia") {
              const recipientG = getFamiliaRecipientGender(libroNombre);
              const recipientLabel = libroNombre === "Papá, Mi Héroe" ? "papá"
                : libroNombre === "Mamá, Mi Heroína" ? "mamá"
                : libroNombre === "Te Amo, Abuelo" ? "abuelo"
                : libroNombre === "Te Amo, Abuela" ? "abuela"
                : recipientG === "M" ? "él" : "ella";
              const step1Valid = dedicatorGender !== "";
              return (
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>Personalicemos la dedicatoria</h3>
                  <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>Este libro es un regalo para <strong>{libroNombre.toLowerCase().replace(",", "")}</strong>. ¿Quién lo dedica?</p>
                  <div style={{ marginBottom: "28px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {(() => {
                        const isAbuelo = libroNombre === "Te Amo, Abuelo" || libroNombre === "Te Amo, Abuela";
                        return (["M", "F"] as const).map((g) => (
                          <GenderCard key={`ded-${g}`} id={`ded-${g}`} g={g}
                            label={g === "M" ? (isAbuelo ? "Nieto" : "Hijo") : (isAbuelo ? "Nieta" : "Hija")}
                            isSelected={dedicatorGender === g}
                            onClick={() => { setDedicatorGender(g); setRecipientGender(recipientG); }}
                          />
                        ));
                      })()}
                    </div>
                  </div>
                  {(() => {
                    const isAbuelo = libroNombre === "Te Amo, Abuelo" || libroNombre === "Te Amo, Abuela";
                    const dedicantLabel = dedicatorGender === "M" ? (isAbuelo ? "Nieto" : "Hijo") : (isAbuelo ? "Nieta" : "Hija");
                    return step1Valid && summaryBox(`${dedicantLabel} le dedica el libro a ${recipientLabel}`);
                  })()}
                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                    {navBtn("Anterior", () => setCurrentStep(0))}
                    {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                  </div>
                </div>
              );
            }

            // ── FAMILIA GRUPO ──
            if (wizardMode === "familia-grupo") {
            const MaleSVG = ({ color }: { color: string }) => (
              <svg width="40" height="50" viewBox="0 0 48 60" fill="none">
                <circle cx="24" cy="13" r="10" stroke={color} strokeWidth="2"/>
                <path d="M4 56 C4 34 44 34 44 56" stroke={color} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            );
            const FemaleSVG = ({ color }: { color: string }) => (
              <svg width="40" height="50" viewBox="0 0 48 60" fill="none">
                <circle cx="24" cy="13" r="10" stroke={color} strokeWidth="2"/>
                <path d="M8 60L24 30L40 60" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="47" x2="40" y2="47" stroke={color} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            );
            const ChildSVG = ({ color, isFemale = false }: { color: string; isFemale?: boolean }) => (
              <svg width="30" height="40" viewBox="0 0 36 48" fill="none">
                <circle cx="18" cy="10" r="8" stroke={color} strokeWidth="2"/>
                {isFemale ? (
                  <>
                    <path d="M6 46L18 24L30 46" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="37" x2="30" y2="37" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                  </>
                ) : (
                  <path d="M2 44 C2 26 34 26 34 44" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                )}
              </svg>
            );

            const familyCardStyle = (active = true): React.CSSProperties => ({
              padding: "16px 12px", borderRadius: "16px",
              border: `1.5px solid ${active ? accent + "40" : "#e5e7eb"}`,
              background: active ? `${accent}06` : "#fafafa",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            });

            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>¡Creemos el libro de tu familia!</h3>
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Dinos cuántos hijos tiene la familia para calcular las fotos necesarias.</p>

                {/* Papá + Mamá — siempre fijos */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div style={familyCardStyle()}>
                    <MaleSVG color={accent} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: accent }}>Papá</span>
                    <span style={{ fontSize: "12px", color: "#888" }}>2 fotos</span>
                  </div>
                  <div style={familyCardStyle()}>
                    <FemaleSVG color={accent} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: accent }}>Mamá</span>
                    <span style={{ fontSize: "12px", color: "#888" }}>2 fotos</span>
                  </div>
                </div>

                {/* Selector de hijos */}
                <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Cuántos hijos tiene la familia?</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
                  {([1, 2, 3] as const).map((n) => (
                    <button key={n} type="button" onClick={() => setNumHijos(n)} style={{ padding: "12px 8px", borderRadius: "12px", border: numHijos === n ? `2px solid ${accent}` : "2px solid #e5e7eb", background: numHijos === n ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "15px", color: numHijos === n ? accent : "#555", transition: "all 0.2s ease" }}>
                      {n} {n === 1 ? "hijo" : "hijos"}
                    </button>
                  ))}
                </div>

                {/* Hijos dinámicos */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${numHijos}, 1fr)`, gap: "12px", marginBottom: "24px" }}>
                  {Array.from({ length: numHijos }, (_, i) => (
                    <div key={i} style={familyCardStyle()}>
                      <div style={{ display: "flex", gap: "4px", alignItems: "flex-end" }}>
                        <ChildSVG color={accent} />
                        <ChildSVG color={accent} isFemale />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: accent }}>Hijo {i + 1}</span>
                      <span style={{ fontSize: "12px", color: "#888" }}>2 fotos</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 18px", borderRadius: "12px", background: `${accent}08`, border: `1px solid ${accent}25`, marginBottom: "28px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={accent}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: accent }}>
                    Total: {familiaGrupoTotalPhotos} fotos — Papá, Mamá y {numHijos === 1 ? "1 hijo" : `${numHijos} hijos`}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(0))}
                  {navBtn("Siguiente", () => setCurrentStep(2), true)}
                </div>
              </div>
            );
          }

          // ── HERMANOS ──
          if (wizardMode === "hermanos") {
            const hermanoGenders = [hermano1Gender, hermano2Gender, hermano3Gender].slice(0, numHermanos);
            const step1Valid = hermanoGenders.every((g) => g !== "");
            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>¡Creemos el libro de los hermanos!</h3>
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Dinos cuántos hermanos hay y el género de cada uno.</p>

                {/* Selector de cantidad */}
                <p style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Cuántos hermanos hay?</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                  {([2, 3] as const).map((n) => (
                    <button key={n} type="button" onClick={() => setNumHermanos(n)} style={{ padding: "13px 8px", borderRadius: "12px", border: numHermanos === n ? `2px solid ${accent}` : "2px solid #e5e7eb", background: numHermanos === n ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "15px", color: numHermanos === n ? accent : "#555", transition: "all 0.2s ease" }}>
                      {n} hermanos
                    </button>
                  ))}
                </div>

                {/* Gender picker por hermano */}
                {Array.from({ length: numHermanos }, (_, i) => {
                  const currentG = [hermano1Gender, hermano2Gender, hermano3Gender][i];
                  const setG = [setHermano1Gender, setHermano2Gender, setHermano3Gender][i];
                  return (
                    <div key={i} style={{ marginBottom: "20px" }}>
                      <p style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>Hermano/Hermana {i + 1}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {(["M", "F"] as const).map((g) => (
                          <GenderCard key={`herm${i}-${g}`} id={`herm${i}-${g}`} g={g} isSelected={currentG === g} onClick={() => setG(g)} />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {step1Valid && summaryBox(`${numHermanos} hermanos: ${hermanoGenders.map((g, i) => (g === "F" ? `Hermana ${i + 1}` : `Hermano ${i + 1}`)).join(", ")}`)}

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(0))}
                  {navBtn("Siguiente", () => setCurrentStep(2), true, !step1Valid)}
                </div>
              </div>
            );
          }
          return null;
        })()}

          {/* ── Step 2: Fotos ── */}
          {currentStep === 2 && wizardMode === "hermanos" ? (() => {
            const genderSvg = (g: "M" | "F" | "") => g === "F"
              ? <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M8 60L24 30L40 60" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="47" x2="40" y2="47" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>
              : <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M4 56 C4 34 44 34 44 56" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;

            const labels = [
              hermano1Gender === "F" ? "Hermana 1" : "Hermano 1",
              hermano2Gender === "F" ? "Hermana 2" : "Hermano 2",
              hermano3Gender === "F" ? "Hermana 3" : "Hermano 3",
            ];
            const uploads = [hijo1Upload, hijo2Upload, hijo3Upload];
            const names = [hijo1Name, hijo2Name, hijo3Name];
            const setNames = [setHijo1Name, setHijo2Name, setHijo3Name];
            const genders = [hermano1Gender, hermano2Gender, hermano3Gender];

            const hermanosValid =
              !!hijo1Name.trim() && hijo1Upload.photos.length >= 1 &&
              !!hijo2Name.trim() && hijo2Upload.photos.length >= 1 &&
              (numHermanos < 3 || (!!hijo3Name.trim() && hijo3Upload.photos.length >= 1));

            return (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>Fotos de los hermanos</h3>
                <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Sube hasta 2 fotos por cada hermano. Rostro completo, bien iluminado, sin filtros.</p>

                {Array.from({ length: numHermanos }, (_, i) => (
                  <MemberSection
                    key={i}
                    label={labels[i]}
                    svgIcon={genderSvg(genders[i])}
                    name={names[i]}
                    setName={setNames[i]}
                    upload={uploads[i]}
                    accent={accent}
                    isMobile={isMobile}
                  />
                ))}

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", marginTop: "8px" }}>
                  {navBtn("Anterior", () => setCurrentStep(1))}
                  {navBtn("Siguiente", () => setCurrentStep(4), true, !hermanosValid)}
                </div>
              </div>
            );
          })() : currentStep === 2 && wizardMode === "familia-grupo" ? (() => {
            const familiaGrupoValid =
              !!papaName.trim() && papaUpload.photos.length >= 1 &&
              !!mamaName.trim() && mamaUpload.photos.length >= 1 &&
              !!hijo1Name.trim() && hijo1Upload.photos.length >= 1 &&
              (numHijos < 2 || (!!hijo2Name.trim() && hijo2Upload.photos.length >= 1)) &&
              (numHijos < 3 || (!!hijo3Name.trim() && hijo3Upload.photos.length >= 1));

            const maleSvgSm = <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M4 56 C4 34 44 34 44 56" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;
            const femaleSvgSm = <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M8 60L24 30L40 60" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="47" x2="40" y2="47" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;
            const childSvgSm = <svg width="22" height="28" viewBox="0 0 36 48" fill="none"><circle cx="18" cy="10" r="8" stroke={accent} strokeWidth="2.5"/><path d="M2 44 C2 26 34 26 34 44" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;

            return (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>Fotos de la familia</h3>
                <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Sube 2 fotos por cada integrante. Rostro completo, bien iluminado, sin filtros.</p>

                {/* Nombre de la familia */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#555", display: "block", marginBottom: "8px" }}>
                    Nombre de la familia <span style={{ color: "#999", fontWeight: 400 }}>(ej: los González, los Pérez)</span>
                  </label>
                  <input
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="los García"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1.5px solid ${familyName ? accent : "#e5e7eb"}`, fontSize: "15px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease" }}
                  />
                </div>

                <MemberSection label="Papá" svgIcon={maleSvgSm} name={papaName} setName={setPapaName} upload={papaUpload} accent={accent} isMobile={isMobile} />
                <MemberSection label="Mamá" svgIcon={femaleSvgSm} name={mamaName} setName={setMamaName} upload={mamaUpload} accent={accent} isMobile={isMobile} />
                <MemberSection label="Hijo 1" svgIcon={childSvgSm} name={hijo1Name} setName={setHijo1Name} upload={hijo1Upload} accent={accent} isMobile={isMobile} />
                {numHijos >= 2 && <MemberSection label="Hijo 2" svgIcon={childSvgSm} name={hijo2Name} setName={setHijo2Name} upload={hijo2Upload} accent={accent} isMobile={isMobile} />}
                {numHijos >= 3 && <MemberSection label="Hijo 3" svgIcon={childSvgSm} name={hijo3Name} setName={setHijo3Name} upload={hijo3Upload} accent={accent} isMobile={isMobile} />}

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", marginTop: "8px" }}>
                  {navBtn("Anterior", () => setCurrentStep(1))}
                  {navBtn("Siguiente", () => setCurrentStep(4), true, !familiaGrupoValid)}
                </div>
              </div>
            );
          })() : currentStep === 2 ? (
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>
                {wizardMode === "mascotas" ? `Datos de tu mascota (${recipientGender === "F" ? "hembra" : "macho"})`
                  : wizardMode === "memorial" ? (recipientGender === "F" ? "Datos en memoria de ella" : "Datos en memoria de él")
                  : wizardMode === "familia" ? (
                      libroNombre === "Papá, Mi Héroe" ? "Datos del papá"
                      : libroNombre === "Mamá, Mi Heroína" ? "Datos de la mamá"
                      : libroNombre === "Te Amo, Abuelo" ? "Datos del abuelo"
                      : libroNombre === "Te Amo, Abuela" ? "Datos de la abuela"
                      : recipientGender === "F" ? "Datos de ella" : "Datos de él"
                    )
                  : recipientGender === "F" ? "Datos de ella" : "Datos de él"}
              </h3>
              <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>
                {wizardMode === "mascotas" ? "La mascota protagonista del libro."
                  : wizardMode === "memorial" ? "La persona que siempre estará en tu corazón."
                  : "La persona que recibirá el libro como regalo."}
              </p>

              <CharacterCard
                role="recipient"
                name={recipientName}
                nickname={recipientNickname}
                onNameChange={setRecipientName}
                onNicknameChange={setRecipientNickname}
                upload={recipientUpload}
                maxPhotos={photoConfig.recipient}
                accent={accent}
                isMobile={isMobile}
                namePlaceholder={wizardMode === "mascotas" ? "Nombre de la mascota" : "Nombre del personaje"}
              />

              {/* AI disclaimer */}
              <div style={{ padding: "14px 16px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fde68a", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#92400e", marginBottom: "4px" }}>Sobre las ilustraciones con inteligencia artificial</div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#78350f", lineHeight: 1.6 }}>
                      Las imágenes son generadas por IA a partir de las fotos. Los resultados pueden variar en exactitud de rasgos. Para mejores resultados: fotos individuales, bien iluminadas, rostro completo y visible, sin filtros. PixelArt no garantiza una reproducción exacta.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(1))}
                {navBtn("Siguiente", () => setCurrentStep(nextAfterRecipient), true, !recipientName.trim() || recipientUpload.photos.length < 1)}
              </div>
            </div>
          ) : null}

          {/* ── Step 3: Dedicator character card (no aplica en familia-grupo ni hermanos) ── */}
          {currentStep === 3 && wizardMode !== "familia-grupo" && wizardMode !== "hermanos" && (() => {
            // ── Siempre Serás Parte de Mi Corazón — hermanos sobrevivientes ──
            // numSiblings = total de hermanos (incluyendo el fallecido ya subido en step 2)
            // Hermanos a subir aquí = numSiblings - 1
            if (wizardMode === "memorial" && libroNombre === "Siempre Serás Parte de Mi Corazón") {
              const sibSvg = <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M4 56 C4 34 44 34 44 56" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;
              const livingCount = numSiblings - 1;
              const siblingsValid =
                !!dedicatorName.trim() && dedicatorUpload.photos.length >= 1 &&
                (livingCount < 2 || (!!owner2Name.trim() && owner2Upload.photos.length >= 1));
              return (
                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>Fotos de los hermanos</h3>
                  <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>
                    Las fotos del hermano que se fue ya las subiste. Ahora cuéntanos cuántos hermanos eran en total.
                  </p>

                  <p style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#333" }}>¿Cuántos hermanos eran en total?</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                    {([2, 3] as const).map((n) => (
                      <button key={n} type="button" onClick={() => setNumSiblings(n)} style={{ padding: "12px 8px", borderRadius: "12px", border: numSiblings === n ? `2px solid ${accent}` : "2px solid #e5e7eb", background: numSiblings === n ? `${accent}08` : "#fafafa", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "15px", color: numSiblings === n ? accent : "#555", transition: "all 0.2s ease" }}>
                        {n} hermanos
                      </button>
                    ))}
                  </div>

                  <MemberSection label={livingCount >= 2 ? "Hermano 1" : "Hermano"} svgIcon={sibSvg} name={dedicatorName} setName={setDedicatorName} upload={dedicatorUpload} accent={accent} isMobile={isMobile} />
                  {livingCount >= 2 && <MemberSection label="Hermano 2" svgIcon={sibSvg} name={owner2Name} setName={setOwner2Name} upload={owner2Upload} accent={accent} isMobile={isMobile} />}

                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", marginTop: "8px" }}>
                    {navBtn("Anterior", () => setCurrentStep(2))}
                    {navBtn("Siguiente", () => setCurrentStep(4), true, !siblingsValid)}
                  </div>
                </div>
              );
            }

            // ── Gracias por tu amor — fotos familiares grupales ──
            if (wizardMode === "memorial" && libroNombre === "Gracias por tu amor") {
              const maxGroupPhotos = 3;
              const atLimit = dedicatorUpload.photos.length >= maxGroupPhotos;
              function openGroupPicker() {
                if (atLimit) return;
                const input = document.createElement("input");
                input.type = "file"; input.accept = "image/*"; input.multiple = true; input.style.display = "none";
                document.body.appendChild(input);
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) dedicatorUpload.uploadFiles(Array.from(files).slice(0, maxGroupPhotos - dedicatorUpload.photos.length));
                  input.remove();
                };
                input.click();
              }
              return (
                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>Fotos familiares</h3>
                  <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>
                    Sube hasta 3 fotos grupales — reuniones, momentos compartidos con la persona que recuerdan.
                  </p>

                  <div style={{ borderRadius: "16px", border: `1.5px solid ${accent}20`, background: "#fafafa", padding: "20px" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {dedicatorUpload.photos.map((p) => (
                        <div key={p.id} style={{ position: "relative", width: "100px", height: "100px", borderRadius: "12px", overflow: "hidden", border: `2px solid ${accent}40` }}>
                          <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <button onClick={() => dedicatorUpload.removePhoto(p.id)} style={{ position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      ))}
                      {dedicatorUpload.uploading && (
                        <div style={{ width: "100px", height: "100px", borderRadius: "12px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "12px", color: "#999" }}>{dedicatorUpload.progress}%</span>
                        </div>
                      )}
                      {!atLimit && (
                        <button onClick={openGroupPicker} style={{ width: "100px", height: "100px", borderRadius: "12px", border: `2px dashed ${accent}40`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: accent }}>AGREGAR</span>
                        </button>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{dedicatorUpload.photos.length}/{maxGroupPhotos} fotos grupales</p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", marginTop: "24px" }}>
                    {navBtn("Anterior", () => setCurrentStep(2))}
                    {navBtn("Siguiente", () => setCurrentStep(4), true, dedicatorUpload.photos.length < 1)}
                  </div>
                </div>
              );
            }

            // ── Aventura Entre Patas — múltiples dueños ──
            if (isAventuraEntrePatas) {
              const ownerSvg = <svg width="28" height="34" viewBox="0 0 48 60" fill="none"><circle cx="24" cy="13" r="10" stroke={accent} strokeWidth="2.5"/><path d="M4 56 C4 34 44 34 44 56" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></svg>;
              const aventuraValid =
                !!dedicatorName.trim() && dedicatorUpload.photos.length >= 1 &&
                (numOwners < 2 || (!!owner2Name.trim() && owner2Upload.photos.length >= 1)) &&
                (numOwners < 3 || (!!owner3Name.trim() && owner3Upload.photos.length >= 1));
              return (
                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>Datos de los dueños</h3>
                  <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Las personas que comparten aventuras con la mascota.</p>

                  <MemberSection label="Dueño 1" svgIcon={ownerSvg} name={dedicatorName} setName={setDedicatorName} upload={dedicatorUpload} accent={accent} isMobile={isMobile} />
                  {numOwners >= 2 && <MemberSection label="Dueño 2" svgIcon={ownerSvg} name={owner2Name} setName={setOwner2Name} upload={owner2Upload} accent={accent} isMobile={isMobile} />}
                  {numOwners >= 3 && <MemberSection label="Dueño 3" svgIcon={ownerSvg} name={owner3Name} setName={setOwner3Name} upload={owner3Upload} accent={accent} isMobile={isMobile} />}

                  <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", marginTop: "8px" }}>
                    {navBtn("Anterior", () => setCurrentStep(2))}
                    {navBtn("Siguiente", () => setCurrentStep(4), true, !aventuraValid)}
                  </div>
                </div>
              );
            }

            // ── Resto de modos — dueño único ──
            return (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>
                  {wizardMode === "mascotas" ? (dedicatorGender === "M" ? "Datos del dueño" : "Datos de la dueña")
                    : wizardMode === "memorial" ? "¿Quién dedica este libro?"
                    : wizardMode === "familia" ? (() => {
                      const isAbuelo = libroNombre === "Te Amo, Abuelo" || libroNombre === "Te Amo, Abuela";
                      return dedicatorGender === "M"
                        ? (isAbuelo ? "Datos del nieto" : "Datos del hijo")
                        : (isAbuelo ? "Datos de la nieta" : "Datos de la hija");
                    })()
                    : dedicatorGender === "M" ? "Datos de él" : "Datos de ella"}
                </h3>
                <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>
                  {wizardMode === "memorial"
                    ? "La persona que hace este homenaje."
                    : "La persona que hace el regalo — quien dedica el libro."}
                </p>

                <CharacterCard
                  role="dedicator"
                  name={dedicatorName}
                  nickname=""
                  onNameChange={setDedicatorName}
                  onNicknameChange={() => {}}
                  upload={dedicatorUpload}
                  maxPhotos={photoConfig.dedicator}
                  accent={accent}
                  isMobile={isMobile}
                  showNickname={false}
                />

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(2))}
                  {navBtn("Siguiente", () => setCurrentStep(4), true,
                    !dedicatorName.trim() || (photoConfig.dedicator > 0 && dedicatorUpload.photos.length < 1)
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── Step 4: Templates ── */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700 }}>4. Elige 3 escenarios</h3>
              <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#666" }}>
                Hojea el libro y haz clic en las páginas para seleccionar hasta 3 escenarios.
              </p>
              <div style={{ fontSize: "13px", color: selectedTemplates.length === 3 ? "#22c55e" : "#888", fontWeight: selectedTemplates.length === 3 ? 600 : 400, marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
                {selectedTemplates.length === 3 && <CheckCircle2 size={16} />}
                {selectedTemplates.length}/3 seleccionadas{selectedTemplates.length === 3 && " — Listo"}
              </div>
              <TemplateBook templates={templates} selectedIds={selectedTemplates} maxSelections={3} accent={accent} onToggle={toggleTemplate} />
              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", justifyContent: "center", marginTop: "28px" }}>
                {navBtn("Anterior", () => setCurrentStep((wizardMode === "familia-grupo" || wizardMode === "hermanos") ? 2 : 3))}
                {navBtn("Siguiente", () => setCurrentStep(5), true, selectedTemplates.length < 3)}
              </div>
            </div>
          )}

          {/* ── Step 5: Cover type only ── */}
          {currentStep === 5 && (() => {
            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>5. Tipo de tapa</h3>
                <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>
                  Elige cómo quieres que sea la tapa de tu libro.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${variants.length}, 1fr)`, gap: "16px", marginBottom: "32px" }}>
                  {variants.map((v) => {
                    const isSelected = selectedVariantId === v.id;
                    const vPromo = applyBestPromo(v.basePriceCents, promos, dbIds?.catalogBookId);
                    const displayPrice = vPromo ?? v.basePriceCents;
                    const isSoft = v.coverType === "TAPA_DELGADA";
                    return (
                      <button
                        key={v.id} type="button" onClick={() => setSelectedVariantId(v.id)}
                        style={{ borderRadius: "20px", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}06` : "#fff", cursor: "pointer", fontFamily: "inherit", overflow: "hidden", transition: "all 0.25s ease", boxShadow: isSelected ? `0 8px 32px ${accent}22` : "0 2px 8px rgba(0,0,0,0.04)", padding: 0, textAlign: "left" }}
                      >
                        {/* Visual area */}
                        <div style={{ width: "100%", height: "200px", background: isSoft ? "linear-gradient(160deg, #f5eeff 0%, #ede0ff 100%)" : `linear-gradient(160deg, ${accent}20 0%, ${accent}0a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          {/* Book mockup */}
                          <div style={{ position: "relative", width: isSoft ? "90px" : "100px", height: isSoft ? "120px" : "132px" }}>
                            {/* Spine */}
                            <div style={{ position: "absolute", left: 0, top: 0, width: "12px", height: "100%", background: isSelected ? `${accent}cc` : "#c4a0e8", borderRadius: "3px 0 0 3px", boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)" }} />
                            {/* Cover */}
                            <div style={{ position: "absolute", left: "12px", top: 0, right: 0, height: "100%", background: isSelected ? accent : "#c4a0e8", borderRadius: "0 6px 6px 0", boxShadow: isSoft ? "3px 3px 12px rgba(0,0,0,0.18)" : "4px 4px 16px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}>
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                              </svg>
                            </div>
                            {/* Hard cover extra thickness */}
                            {!isSoft && (
                              <div style={{ position: "absolute", left: "6px", top: "4px", width: "6px", height: "calc(100% - 8px)", background: isSelected ? `${accent}88` : "#b090d8", borderRadius: "2px" }} />
                            )}
                          </div>
                          {/* Selected check */}
                          {isSelected && (
                            <div style={{ position: "absolute", top: "14px", right: "14px", width: "30px", height: "30px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 10px ${accent}50` }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                          )}
                          {/* Label chip */}
                          <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.9)", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: isSelected ? accent : "#555", whiteSpace: "nowrap", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                            {isSoft ? "Tapa Blanda" : "Tapa Dura"}
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: "18px 20px 20px" }}>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: isSelected ? accent : "#222", marginBottom: "4px" }}>
                            {isSoft ? "Tapa Blanda" : "Tapa Dura"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#888", marginBottom: "14px", lineHeight: 1.5 }}>
                            {isSoft ? "Cartulina estándar · Liviana y compacta" : "Cubierta rígida · Acabado premium y duradero"}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                            {vPromo !== undefined && (
                              <span style={{ fontSize: "12px", color: "#bbb", textDecoration: "line-through" }}>{formatPrice(v.basePriceCents)}</span>
                            )}
                            <span style={{ fontSize: "28px", fontWeight: 900, color: accent, lineHeight: 1 }}>{formatPrice(displayPrice)}</span>
                          </div>
                          <div style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>Precio base del libro</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(4))}
                  {navBtn("Siguiente", () => setCurrentStep(6), true)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 6: Dedication ── */}
          {currentStep === 6 && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700 }}>6. Dedicatoria</h3>
              <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Esta dedicatoria aparecerá en las primeras páginas de tu libro.</p>

              {libroNombre === "1025 Días Enamorándome De Ti" && (
                <div style={{ marginBottom: "24px", padding: "16px", borderRadius: "12px", background: `${accent}06`, border: `1px solid ${accent}20` }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>¿Cuándo comenzó su historia?</div>
                  <input
                    type="date"
                    value={relationshipStartDate}
                    onChange={(e) => setRelationshipStartDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", color: "#333" }}
                  />
                  {daysCount && (
                    <div style={{ marginTop: "8px", fontSize: "13px", color: accent, fontWeight: 600 }}>
                      {daysCount} días juntos ✦
                    </div>
                  )}
                </div>
              )}

              {/* Tabs de opciones */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                {dedicationOptions.map((opt, idx) => {
                  const isSelected = selectedDedicationIdx === idx;
                  return (
                    <button key={idx} type="button" onClick={() => setSelectedDedicationIdx(idx)}
                      style={{ padding: "8px 16px", borderRadius: "20px", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? accent : "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 700, color: isSelected ? "#fff" : "#666", transition: "all 0.2s ease" }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
                <button type="button" onClick={() => setSelectedDedicationIdx(null)}
                  style={{ padding: "8px 16px", borderRadius: "20px", border: selectedDedicationIdx === null ? `2px solid ${accent}` : "2px solid #e5e7eb", background: selectedDedicationIdx === null ? accent : "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 700, color: selectedDedicationIdx === null ? "#fff" : "#666", transition: "all 0.2s ease" }}
                >
                  Personalizada
                </button>
              </div>

              {selectedDedicationIdx !== null ? (
                <div style={{ padding: "24px 28px", borderRadius: "16px", background: `${accent}06`, border: `1px solid ${accent}20` }}>
                  <div style={{ fontSize: "36px", color: accent, lineHeight: 1, marginBottom: "8px", opacity: 0.2 }}>"</div>
                  <p style={{ margin: 0, fontSize: "15px", color: "#333", lineHeight: 1.9, fontStyle: "italic" }}>{resolvedOptions[selectedDedicationIdx]}</p>
                  <div style={{ fontSize: "36px", color: accent, lineHeight: 1, marginTop: "4px", opacity: 0.2, textAlign: "right" }}>"</div>
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "#888", padding: "6px 10px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    Los nombres se completaron automáticamente desde los pasos anteriores.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>
                    Puedes usar <strong>{recipientNickname || recipientName}</strong> y <strong>{dedicatorName}</strong> para personalizar tu mensaje.
                  </div>
                  <textarea value={customDedication} onChange={(e) => setCustomDedication(e.target.value)} placeholder="Escribe tu dedicatoria personalizada..." rows={5}
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(5))}
                {navBtn("Siguiente", () => setCurrentStep(7), true, selectedDedicationIdx === null && !customDedication.trim())}
              </div>
            </div>
          )}

          {/* ── Step 7: Package + Delivery + Contact ── */}
          {currentStep === 7 && (() => {
            const baseCents = selectedVariant?.basePriceCents ?? 0;
            const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
            const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
            const totalCents = (promoBase ?? baseCents) + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>7. Tus datos</h3>
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Elige las opciones de producción y completa tus datos de envío.</p>

                {/* Package */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Cantidad de plantillas</div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                    {(["STANDARD", "PREMIUM"] as const).map((pkg) => {
                      const isSelected = selectedPackage === pkg;
                      const pkgPrice = (promoBase ?? baseCents) + (pkg === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0);
                      return (
                        <button key={pkg} type="button" onClick={() => setSelectedPackage(pkg)}
                          style={{ padding: "14px 16px", borderRadius: "12px", textAlign: "left", cursor: "pointer", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "12px" }}
                        >
                          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: isSelected ? `${accent}18` : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "18px" }}>{pkg === "STANDARD" ? "📖" : "✨"}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? accent : "#333" }}>{pkg === "STANDARD" ? "10 plantillas" : "15 plantillas"}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{pkg === "STANDARD" ? "Paquete base" : "5 escenarios adicionales"}</div>
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: accent }}>{formatPrice(pkgPrice)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Tipo de entrega</div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                    {[
                      { rush: false, label: "Normal", emoji: "📦", detail: `${MIN_NORMAL_DAYS} días hábiles · Sin recargo` },
                      { rush: true, label: "Express", emoji: "⚡", detail: `${MIN_RUSH_DAYS} días hábiles · +${formatPrice(RUSH_FEE_CENTS)}` },
                    ].map((opt) => {
                      const isSelected = wantsRush === opt.rush;
                      return (
                        <button key={String(opt.rush)} type="button" onClick={() => setWantsRush(opt.rush)}
                          style={{ padding: "14px 16px", borderRadius: "12px", textAlign: "left", cursor: "pointer", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "12px" }}
                        >
                          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: isSelected ? `${accent}18` : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "18px" }}>{opt.emoji}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? accent : "#333" }}>{opt.label}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{opt.detail}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.6px" }}>Datos de contacto y envío</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <FormField label="Nombre completo *" value={form.customerFullName} onChange={(v) => updateForm("customerFullName", v)} isMobile={isMobile} />
                  <FormField label="Email *" value={form.customerEmail} onChange={(v) => updateForm("customerEmail", v)} type="email" isMobile={isMobile} />
                  <FormField label="Teléfono *" value={form.customerPhone} onChange={(v) => updateForm("customerPhone", v)} type="tel" isMobile={isMobile} />
                  <FormField label="Dirección *" value={form.shippingAddressLine1} onChange={(v) => updateForm("shippingAddressLine1", v)} fullWidth isMobile={isMobile} />
                  <FormField label="Dirección línea 2" value={form.shippingAddressLine2} onChange={(v) => updateForm("shippingAddressLine2", v)} isMobile={isMobile} />
                  <FormField label="Ciudad" value={form.shippingCity} onChange={(v) => updateForm("shippingCity", v)} isMobile={isMobile} />
                  <FormField label="Región" value={form.shippingRegion} onChange={(v) => updateForm("shippingRegion", v)} isMobile={isMobile} />
                  <FormField label="Referencia" value={form.shippingReference} onChange={(v) => updateForm("shippingReference", v)} fullWidth isMobile={isMobile} />
                  <FormField label="Mensaje adicional (opcional)" value={form.messageOptional} onChange={(v) => updateForm("messageOptional", v)} fullWidth isMobile={isMobile} />
                </div>

                {/* Total preview */}
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: `${accent}06`, border: `1px solid ${accent}20`, marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#666" }}>Total estimado</span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: accent }}>{formatPrice(totalCents)}</span>
                </div>

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(6))}
                  {navBtn("Siguiente", () => setCurrentStep(8), true, !step7Valid)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 8: Summary ── */}
          {currentStep === 8 && (() => {
            const baseCents = selectedVariant?.basePriceCents ?? 0;
            const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
            const effectiveBase = promoBase ?? baseCents;
            const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
            const totalCents = effectiveBase + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            const originalTotal = baseCents + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            return (
              <div>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: 700 }}>8. Resumen de tu solicitud</h3>
                <div style={{ borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "24px" }}>
                  <SummaryRow label="Libro" value={libroNombre} />
                  <SummaryRow label="Para" value={`${recipientNickname}${recipientNickname ? ` (${recipientNickname})` : ""}`} />
                  <SummaryRow label="De" value={dedicatorName} />
                  <SummaryRow label="Fotos" value={`${recipientUpload.photos.length + dedicatorUpload.photos.length} fotos subidas`} />
                  <SummaryRow label="Escenarios" value={selectedTemplates.map((id) => templates.find((t) => t.id === id)?.name ?? `#${id}`).join(", ")} />
                  <SummaryRow label="Tapa" value={selectedVariant?.coverType.replace("TAPA_", "Tapa ") ?? "—"} />
                  <SummaryRow label="Plantillas" value={selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"} />
                  <SummaryRow label="Entrega" value={wantsRush ? `Express (${MIN_RUSH_DAYS} días hábiles)` : `Normal (${MIN_NORMAL_DAYS} días hábiles)`} />
                  <SummaryRow label="Dedicatoria" value={selectedDedicationIdx !== null ? dedicationOptions[selectedDedicationIdx]?.label ?? "Sugerida" : "Personalizada"} />
                  <SummaryRow label="Cliente" value={form.customerFullName} />
                  <SummaryRow label="Email" value={form.customerEmail} />
                  <SummaryRow label="Teléfono" value={form.customerPhone} />
                  <SummaryRow label="Dirección" value={`${form.shippingAddressLine1}${form.shippingCity ? `, ${form.shippingCity}` : ""}`} />
                </div>
                <div style={{ padding: "20px 24px", borderRadius: "14px", border: `2px solid ${accent}40`, background: `${accent}06`, marginBottom: "24px" }}>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Precio total</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                      <span>{selectedVariant?.coverType.replace("TAPA_", "Tapa ")} · {selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"}</span>
                      <span>{formatPrice(effectiveBase + extraCents)}</span>
                    </div>
                    {wantsRush && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                        <span>Entrega express</span><span>+{formatPrice(RUSH_FEE_CENTS)}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: `1px solid ${accent}20`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>Total estimado</span>
                    <div style={{ textAlign: "right" }}>
                      {promoBase !== undefined && <div style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through" }}>{formatPrice(originalTotal)}</div>}
                      <div style={{ fontSize: "28px", fontWeight: 900, color: accent }}>{formatPrice(totalCents)}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(7))}
                  {navBtn("Confirmar y Enviar", () => setCurrentStep(9), true)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 9: Submit ── */}
          {currentStep === 9 && !submitted && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px" }}>¿Listo para enviar tu solicitud?</h3>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
                Tu solicitud será revisada por nuestro equipo y recibirás las propuestas en tu correo.
              </p>
              {submitError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px", color: "#991b1b", fontSize: "14px", marginBottom: "16px" }}>{submitError}</div>
              )}
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Volver", () => setCurrentStep(8))}
                <button disabled={submitting} onClick={handleSubmit}
                  style={{ padding: "14px 36px", borderRadius: "10px", border: "none", background: submitting ? "#ccc" : accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
                  {submitting ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </div>
          )}

          {/* ── Success ── */}
          {submitted && (
            <div ref={successRef} style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Solicitud enviada!</h3>
              <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", margin: "0 auto" }}>
                Tu solicitud fue enviada correctamente. Nuestro equipo preparará las propuestas y las recibirás en <strong>{form.customerEmail}</strong>.
              </p>
            </div>
          )}
          </div>{/* end animated wrapper */}
        </div>
      </div>
    </section>
  );
}

// ── Character Card ─────────────────────────────────────────────────────────────

function CharacterCard({
  role, name, nickname, onNameChange, onNicknameChange, upload, maxPhotos, accent, isMobile, showNickname = true, namePlaceholder = "Nombre del personaje",
}: {
  role: "recipient" | "dedicator";
  name: string;
  nickname: string;
  onNameChange: (v: string) => void;
  onNicknameChange: (v: string) => void;
  upload: ReturnType<typeof usePhotoUpload>;
  maxPhotos: number;
  accent: string;
  isMobile?: boolean;
  showNickname?: boolean;
  namePlaceholder?: string;
}) {
  const { photos, uploading, progress, uploadFiles, removePhoto } = upload;
  const primaryPhoto = photos[0];
  const atLimit = photos.length >= maxPhotos;
  const remaining = maxPhotos - photos.length;

  function openPicker(multiple = true) {
    if (atLimit) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = multiple;
    input.style.display = "none";
    document.body.appendChild(input);
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) uploadFiles(Array.from(files).slice(0, remaining));
      document.body.removeChild(input);
    };
    input.click();
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: `1px solid ${accent}18`,
        overflow: "hidden",
        boxShadow: `0 8px 40px ${accent}12, 0 2px 8px rgba(0,0,0,0.04)`,
        marginBottom: "20px",
      }}
    >
      {/* ── Card header ── */}
      <div
        style={{
          background: `linear-gradient(160deg, ${accent}18 0%, ${accent}06 100%)`,
          padding: isMobile ? "28px 20px 24px" : "36px 32px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Avatar circle */}
        <div
          onClick={() => openPicker(false)}
          style={{
            width: isMobile ? "88px" : "104px",
            height: isMobile ? "88px" : "104px",
            borderRadius: "50%",
            border: primaryPhoto ? `3px solid ${accent}` : "3px dashed #ccc",
            overflow: "hidden",
            cursor: atLimit && !primaryPhoto ? "default" : "pointer",
            background: "#fff",
            position: "relative",
            boxShadow: primaryPhoto ? `0 4px 20px ${accent}35` : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          {primaryPhoto ? (
            <>
              <img src={primaryPhoto.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div
                style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0)"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0, transition: "opacity 0.2s" }} className="avatar-edit-icon">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
            </>
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
              <span style={{ fontSize: "9px", color: "#ccc", fontWeight: 700, letterSpacing: "0.5px" }}>FOTO</span>
            </div>
          )}
        </div>

        {/* Live name preview */}
        <div style={{ textAlign: "center", minHeight: "48px" }}>
          <div
            style={{
              fontSize: name ? (isMobile ? "20px" : "24px") : "15px",
              fontWeight: 800,
              color: name ? "#111" : "#bbb",
              transition: "all 0.25s ease",
              lineHeight: 1.2,
              letterSpacing: name ? "-0.3px" : "0",
            }}
          >
            {name || namePlaceholder}
          </div>
          {nickname && (
            <div style={{ fontSize: "13px", color: "#999", marginTop: "4px", fontStyle: "italic" }}>
              &ldquo;{nickname}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* ── Form section ── */}
      <div style={{ padding: isMobile ? "20px 16px" : "28px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
          <FormField
            label="Nombre *"
            value={name}
            onChange={onNameChange}
            isMobile={isMobile}
          />
          {showNickname && (
            <FormField
              label="Apodo / cómo le llamas (opcional)"
              value={nickname}
              onChange={onNicknameChange}
              isMobile={isMobile}
            />
          )}
        </div>

        {/* Photos strip */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "18px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "4px" }}>
            Fotos (hasta {maxPhotos}) *
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>
            La primera foto se usará como avatar. Rostro completo, sin filtros, bien iluminada.
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Add button */}
            {!atLimit && (
              <div
                onClick={() => openPicker(true)}
                style={{
                  width: "60px", height: "60px", borderRadius: "12px",
                  border: "2px dashed #d0d0d0", background: "#fafafa",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "2px", cursor: "pointer", flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "20px", color: "#bbb", lineHeight: 1 }}>+</span>
                <span style={{ fontSize: "9px", color: "#bbb", fontWeight: 600 }}>FOTO</span>
              </div>
            )}

            {/* Uploaded photos */}
            {photos.map((p, idx) => (
              <div
                key={p.contentHash}
                style={{ position: "relative", width: "60px", height: "60px", borderRadius: "12px", overflow: "hidden", border: idx === 0 ? `2px solid ${accent}` : "1px solid #eee", flexShrink: 0 }}
              >
                <img src={p.preview} alt={p.originalFilename} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={(e) => { e.stopPropagation(); removePhoto(p.uid); }}
                  style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                >×</button>
                {idx === 0 && (
                  <div style={{ position: "absolute", bottom: "2px", left: "2px", background: accent, borderRadius: "4px", padding: "1px 5px", fontSize: "8px", color: "#fff", fontWeight: 700 }}>
                    PRINCIPAL
                  </div>
                )}
              </div>
            ))}
          </div>

          {uploading && (
            <div style={{ marginTop: "10px" }}>
              <div style={{ height: "3px", borderRadius: "2px", background: "#eee", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: accent, transition: "width 0.3s ease" }} />
              </div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "3px" }}>Subiendo... {progress}%</div>
            </div>
          )}

          <div style={{ fontSize: "11px", color: atLimit ? "#22c55e" : "#999", marginTop: "8px", fontWeight: atLimit ? 600 : 400 }}>
            {photos.length}/{maxPhotos} fotos{atLimit ? " — máximo alcanzado" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function FormField({
  label, value, onChange, type = "text", fullWidth, isMobile, min, max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  fullWidth?: boolean;
  isMobile?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <div style={{ gridColumn: fullWidth && !isMobile ? "span 2" : undefined }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #f3f4f6", background: "#fff" }}>
      <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111", textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}
