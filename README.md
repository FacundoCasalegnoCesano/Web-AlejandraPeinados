# Alejandra Peinados

Sitio de presentación para la peluquería de Alejandra. Reúne servicios, fotos de muestra, ubicación y enlaces de contacto. Las consultas sobre turnos y precios se hacen por WhatsApp.

## Desarrollo

Requiere Node.js y npm.

```bash
npm ci
npm run dev
```

Comandos disponibles:

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm run typecheck` | Revisa los tipos de TypeScript. |
| `npm run build` | Genera la versión estática del sitio en `out/`. |

La carpeta `out/` contiene archivos estáticos que se pueden servir desde un hosting estático.

## Actualizar el contenido

- Editá `src/content/salon.ts` para cambiar el nombre, la dirección, Instagram, WhatsApp y la lista de servicios.
- Reemplazá `public/images/hero-hair.jpg` y `public/images/gallery-01.jpg` a `gallery-05.jpg` por imágenes propias autorizadas. Actualizá sus textos `alt`, dimensiones y créditos en `src/content/salon.ts` y `docs/asset-credits.md`. Cuando una imagen deje de ser una muestra, cambiá su propiedad `sample` a `false` para ocultar el aviso correspondiente.
- `AP` es un monograma provisional; reemplazalo cuando Alejandra elija o proporcione su identidad visual.

## Pendiente antes de publicar

El número de WhatsApp `5493404500495` está confirmado para consultas y turnos. Las fotos actuales son imágenes de muestra de Pexels y no representan trabajos reales del salón; están identificadas en `docs/asset-credits.md`. Reemplazalas por material propio con autorización antes de presentar la galería como portfolio.
