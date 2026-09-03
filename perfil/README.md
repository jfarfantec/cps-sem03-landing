# Perfiles de Estudiantes — Landing page

Landing page estática y responsive que presenta una grilla de **20 tarjetas** con el
nombre, los apellidos y la foto de cada estudiante.

## Estructura del proyecto

```
perfil/
├── index.html                  # Documento principal (semántico: header / main / footer)
├── README.md
└── assets/
    ├── css/
    │   └── styles.css          # Estilos: tokens, layout, tarjetas, responsive
    ├── js/
    │   └── main.js             # Menú móvil, tema claro/oscuro, búsqueda y filtros
    └── img/
        ├── favicon.svg
        └── estudiantes/        # 20 avatares SVG (01-…svg … 20-…svg)
```

## Estructura de la página

| Sección | Elemento | Contenido |
|---|---|---|
| Cabecera | `<header class="site-header">` | Logo, navegación, botón de tema y menú móvil |
| Hero | `<section class="hero">` | Título, descripción, llamadas a la acción y cifras |
| Estudiantes | `<section id="estudiantes">` | Buscador, filtros por especialidad y grilla `<ul class="cards">` con 20 `<li class="card">` |
| Pie | `<footer class="site-footer">` | Créditos y enlaces |

Cada tarjeta usa `<article>` con: imagen (`.card__photo`), código del estudiante,
nombre (`<h3>`), apellidos (`<p>`) y etiquetas de especialidad y ciclo.

## Cómo verla

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
npx serve .
# o
python -m http.server 8000
```

## Cómo cambiar los datos o las fotos

- **Datos**: edita directamente los `<li class="card">` en `index.html`. Los atributos
  `data-nombre` y `data-carrera` alimentan el buscador y los filtros — mantenlos en
  minúsculas y sin tildes.
- **Fotos reales**: reemplaza el `src` de `.card__photo` por tu imagen
  (`assets/img/estudiantes/mi-foto.jpg`). Se recomienda formato cuadrado (1:1),
  mínimo 400×400 px. Actualiza también el texto `alt`.

## Características

- HTML5 semántico y accesible (skip link, `aria-*`, etiquetas asociadas, foco visible).
- Grilla fluida con CSS Grid (`auto-fill` + `minmax`), sin frameworks ni dependencias.
- Tema claro/oscuro con persistencia en `localStorage` y respeto a la preferencia del sistema.
- Búsqueda por nombre/apellido (ignora tildes) y filtros por especialidad.
- Carga diferida de imágenes (`loading="lazy"`) y soporte de `prefers-reduced-motion`.
