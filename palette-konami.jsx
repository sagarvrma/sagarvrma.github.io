// palette-konami.jsx — command palette (⌘K) + konami easter egg.

function CommandPalette({ open, onClose }) {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);

  const cmds = React.useMemo(() => [
    { name: "Jump · Hero",        hint: "G H", run: () => loc("hero") },
    { name: "Jump · About",       hint: "G A", run: () => loc("about") },
    { name: "Jump · Experience",  hint: "G E", run: () => loc("experience") },
    { name: "Jump · Projects",    hint: "G P", run: () => loc("projects") },
    { name: "Jump · Skills",      hint: "G S", run: () => loc("skills") },
    { name: "Jump · Education",   hint: "G D", run: () => loc("education") },
    { name: "Jump · Photos",      hint: "G M", run: () => loc("margins") },
    { name: "Download resume",   hint: "↓",   run: () => { const a = document.createElement("a"); a.href = "./Sagar-Varma-Resume.pdf"; a.download = ""; a.click(); onClose(); } },
    { name: "Email Sagar",        hint: "↵",   run: () => window.location.href = "mailto:sagar.varma.2003@gmail.com" },
    { name: "GitHub",             hint: "↗",   run: () => window.open("https://github.com/sagarvarma", "_blank") },
    { name: "LinkedIn",           hint: "↗",   run: () => window.open("https://linkedin.com/in/sagarvarma", "_blank") },
    { name: "Toggle theme",       hint: "T",   run: () => toggleTheme() },
    { name: "Print / Save PDF",   hint: "⌘P",  run: () => window.print() },
    { name: "Hint: try the Konami code", hint: "↑↑↓↓", run: () => {} },
  ], []);

  function loc(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    onClose();
  }
  function toggleTheme() {
    const root = document.documentElement;
    const order = ["default", "sage", "night"];
    const cur = root.getAttribute("data-theme") || "default";
    const next = order[(order.indexOf(cur) + 1) % order.length];
    root.setAttribute("data-theme", next);
    onClose();
  }

  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (open) { setQ(""); setIdx(0); }
  }, [open]);

  if (!open) return null;
  const filtered = cmds.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="cmd-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cmd" role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a command, or a section name…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
            else if (e.key === "Enter") { e.preventDefault(); filtered[idx]?.run(); }
            else if (e.key === "Escape") { e.preventDefault(); onClose(); }
          }}
          aria-label="Command input"
        />
        {filtered.length === 0 ? (
          <div className="cmd-empty">no matches</div>
        ) : (
          <ul role="listbox">
            {filtered.map((c, i) => (
              <li key={c.name}
                  data-active={i === idx}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => c.run()}
                  role="option"
                  aria-selected={i === idx}>
                <span>{c.name}</span>
                <span className="cmd-hint">{c.hint}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Konami({ active, onClose }) {
  if (!active) return null;
  return (
    <div className="konami" role="dialog" aria-label="Off the record">
      <small>off the record</small>
      <h1>You found it.</h1>
      <p>
        A small thing, like a margin note. Most people who land here scroll, skim, and bounce. You went out of your way. That tells me something — and I appreciate it.
      </p>
      <p style={{fontFamily: "var(--mono)", fontSize: 12, color: "rgba(255,255,255,0.5)"}}>
        ↑ ↑ ↓ ↓ ← → ← → B A
      </p>
      <button onClick={onClose}>back to the page</button>
    </div>
  );
}

// hook: detect ⌘K / ctrl-K, and Konami sequence
function useGlobalKeys() {
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [konami, setKonami] = React.useState(false);
  const seqRef = React.useRef([]);
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      // konami
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seqRef.current = [...seqRef.current, k].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        setKonami(true);
        seqRef.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { paletteOpen, setPaletteOpen, konami, setKonami };
}

Object.assign(window, { CommandPalette, Konami, useGlobalKeys });
