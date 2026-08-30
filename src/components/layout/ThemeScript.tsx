/**
 * Runs before paint so the correct theme class is on <html> from the first
 * frame — no flash of the wrong palette. It also marks the document as
 * JavaScript-capable, which is what gates the scroll-reveal hidden states in
 * `globals.css`: with JS off, nothing is hidden in the first place.
 *
 * Kept tiny and dependency-free. Storage access is wrapped separately because
 * private browsing can throw on it, and the `js` marker must be set regardless.
 */
const script = `(function(){var e=document.documentElement;e.classList.add('js');var t='light';try{var s=localStorage.getItem('theme');t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(x){try{t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(y){}}e.classList.toggle('dark',t==='dark');e.style.colorScheme=t;})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
