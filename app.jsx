// app.jsx — root assembly + tweaks + scroll-spy

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "density": "regular",
  "intensity": "subtle",
  "heroVariant": "graph"
}/*EDITMODE-END*/;

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

function Rail({ active }) {
  const items = [
    ["hero", "Top"],
    ["about", "01 About"],
    ["experience", "02 Experience"],
    ["projects", "03 Projects"],
    ["skills", "04 Stack"],
    ["education", "05 Education"],
    ["margins", "06 Photos"],
  ];
  return (
    <nav className="rail" aria-label="Section navigation">
      {items.map(([id, label]) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : "false"}>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function TopBar({ onPalette }) {
  return (
    <div className="stage top">
      <div className="brand">Sagar Varma · sv.0426</div>
      <div className="meta">
        <a href="./Sagar-Varma-Resume.pdf" download aria-label="Download resume PDF">
          resume<span aria-hidden="true" style={{marginLeft:6}}>↓</span>
        </a>
        <button onClick={onPalette} aria-label="Open command palette">
          search<kbd>⌘ K</kbd>
        </button>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { paletteOpen, setPaletteOpen, konami, setKonami } = useGlobalKeys();

  // apply theme + density
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.setAttribute("data-density", t.density);
  }, [t.theme, t.density]);

  const active = useScrollSpy([
    "hero", "about", "experience", "projects", "skills", "education", "margins"
  ]);

  return (
    <>
      <TopBar onPalette={() => setPaletteOpen(true)} />
      <Rail active={active} />
      <main id="main" className="stage">
        <Hero intensity={t.intensity} variant={t.heroVariant} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Margins />
        <Colophon />
      </main>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Konami active={konami} onClose={() => setKonami(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Surface" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={[
            { value: "default", label: "linen" },
            { value: "sage",    label: "sage" },
            { value: "night",   label: "night" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "roomy"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakSection label="Hero / 3D" />
        <TweakRadio
          label="Intensity"
          value={t.intensity}
          options={["off", "subtle", "full"]}
          onChange={(v) => setTweak("intensity", v)}
        />
        <TweakSection label="Try" />
        <TweakButton label="Open command palette (⌘K)"
                     onClick={() => setPaletteOpen(true)} />
        <TweakButton label="Trigger easter egg"
                     secondary
                     onClick={() => setKonami(true)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
