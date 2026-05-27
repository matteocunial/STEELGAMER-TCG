# STEELGAMER TCG Website

Sito ufficiale one-page per `STEELGAMER TCG`, progettato per essere veloce, visivamente distintivo e pronto alla pubblicazione.

## Struttura progetto

- `index.html` - markup principale e SEO metadata
- `styles.css` - design system, animazioni e responsive
- `main.js` - interazioni (reveal, navbar, tilt, cursor, particle system)
- `assets/` - logo e immagini delle carte
- `robots.txt` - indicazioni crawler
- `sitemap.xml` - mappa URL

## Avvio locale

Da root progetto:

```bash
python3 -m http.server 4173
```

Apri `http://localhost:4173`.

## Pubblicazione rapida

### Netlify / Cloudflare Pages / Vercel (consigliato)

1. Carica l'intera cartella del progetto.
2. Build command: *(vuoto)*
3. Output directory: `.`
4. Pubblica.

### GitHub Pages

1. Crea un repository e carica tutti i file.
2. Vai in **Settings > Pages**.
3. Source: branch `main`, folder `/root`.
4. Salva e attendi la pubblicazione.

## TODO prima del go-live

- Sostituire `https://steelgamer-tcg.it/` con il dominio reale in:
  - `index.html` (`canonical`, `og:url`)
  - `robots.txt`
  - `sitemap.xml`
- Inserire gli orari ufficiali in sezione Contatti (`index.html`).
