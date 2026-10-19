# Diseño de la presentación

## Propósito y alcance

La primera versión presenta Alejandra Peinados para que posibles clientas conozcan los servicios y contacten al salón. La página reúne una portada, servicios, galería y datos de contacto y ubicación. Las consultas sobre turnos y precios continúan por WhatsApp.

La demo no incorpora administración, precios publicados ni un sistema propio de reservas. El contenido se mantiene en código para que Alejandra pueda actualizarse con ayuda técnica.

## Dirección visual

La composición usa tonos marfil y carbón, títulos serif y texto sans serif, con `AP` como monograma provisional. Las transiciones son breves y apoyan la navegación sin sustituir el contenido. Motion aporta la animación React; Kokonut UI sirve como referencia visual, no como fuente de identidad o contenido.

- [Motion para React](https://motion.dev/docs/react)
- [Kokonut UI](https://kokonutui.com/)

## Contenido y límites

La lista de servicios conserva los nombres proporcionados: Cortes, Coloración, Mechas, Peinados para eventos, Tratamientos, Iluminaciones, Nutrición, PDO y Alisados. No se agregan explicaciones técnicas para PDO, afirmaciones de experiencia, testimonios ni horarios sin datos confirmados.

Las imágenes actuales son muestras con licencia de Pexels y están marcadas con `sample`. No muestran trabajos conocidos de Alejandra ni clientas del salón. Al reemplazarlas por fotos autorizadas, se actualizan alt, dimensiones y créditos y se cambia `sample` a `false` para retirar el aviso de muestra.

El número `5493404500495` está confirmado para consultas y turnos por WhatsApp. `AP` sigue siendo un monograma provisional.

## Implementación

La presentación se construye con Next.js App Router, React, TypeScript, Tailwind CSS 4 y Motion. El resultado es una exportación estática en `out/`, sin API propia, base de datos ni operación de reservas.
