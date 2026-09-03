/* =========================================================
   Perfiles de Estudiantes - Logica de interfaz
   Modulos: menu movil, tema claro/oscuro, busqueda y filtros
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Referencias del DOM ---------- */
  const nav = document.getElementById('nav-principal');
  const navToggle = document.getElementById('nav-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('[data-theme-icon]') : null;
  const buscador = document.getElementById('buscador');
  const chips = Array.from(document.querySelectorAll('.chip'));
  const tarjetas = Array.from(document.querySelectorAll('#grilla-estudiantes .card'));
  const contador = document.getElementById('contador');
  const sinResultados = document.getElementById('sin-resultados');

  let filtroActivo = 'todos';

  /* ---------- 1. Menu movil ---------- */
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const abierto = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(abierto));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.matches('.nav__link')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. Tema claro / oscuro ---------- */
  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(tema === 'dark'));
    if (themeIcon) themeIcon.textContent = tema === 'dark' ? '☀' : '☽';
    try { localStorage.setItem('tema-perfiles', tema); } catch (e) { /* modo privado */ }
  }

  let temaGuardado = null;
  try { temaGuardado = localStorage.getItem('tema-perfiles'); } catch (e) { /* modo privado */ }

  const prefiereOscuro = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  aplicarTema(temaGuardado || (prefiereOscuro ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const actual = document.documentElement.getAttribute('data-theme');
      aplicarTema(actual === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 3. Normalizacion de texto (ignora tildes) ---------- */
  function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  /* ---------- 4. Busqueda + filtros ---------- */
  function renderizar() {
    const termino = normalizar(buscador ? buscador.value : '');
    let visibles = 0;

    tarjetas.forEach(function (card) {
      const nombre = normalizar(card.dataset.nombre || '');
      const carrera = card.dataset.carrera || '';

      const coincideTexto = termino === '' || nombre.indexOf(termino) !== -1;
      const coincideFiltro = filtroActivo === 'todos' || carrera === filtroActivo;
      const mostrar = coincideTexto && coincideFiltro;

      card.classList.toggle('is-hidden', !mostrar);
      if (mostrar) visibles++;
    });

    if (contador) contador.textContent = String(visibles);
    if (sinResultados) sinResultados.classList.toggle('is-visible', visibles === 0);
  }

  if (buscador) buscador.addEventListener('input', renderizar);

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filtroActivo = chip.dataset.filtro;
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      renderizar();
    });
  });

  renderizar();
})();
