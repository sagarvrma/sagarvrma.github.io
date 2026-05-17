// margins.jsx — photography only. Reads photos/photos.json at runtime so
// updating is just: drop file in /photos, add one entry to the manifest.

function PhotoPlaceholder({ seed = 0, hue = 30, sat = 0.04 }) {
  const lights = [0.94, 0.78, 0.62, 0.46, 0.32, 0.20];
  const bg = `oklch(${lights[seed % lights.length]} ${sat} ${hue})`;
  const fg = `oklch(${Math.max(0.08, lights[seed % lights.length] - 0.5)} ${sat} ${hue})`;
  const accent = `oklch(0.55 ${Math.min(sat + 0.02, 0.06)} ${hue + 20})`;
  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="100" height="130" fill={bg} />
      {[20, 40, 60, 80, 100].map((y, i) => (
        <line key={y} x1="0" y1={y + (seed % 7)} x2="100" y2={y + (seed % 7) - 4}
              stroke={fg} strokeWidth="0.25" opacity={0.18 + (i % 2) * 0.1} />
      ))}
      {seed % 3 === 0 && <rect x={15 + seed % 8} y={50 + seed % 12} width="40" height="55" fill={fg} opacity="0.35" />}
      {seed % 3 === 1 && <circle cx={50 + (seed % 10) - 5} cy={40 + seed % 8} r={14 + seed % 4} fill={accent} opacity="0.55" />}
      {seed % 3 === 2 && <polygon points={`${20+seed%5},90 ${50},${30+seed%10} ${80-seed%6},90`} fill={fg} opacity="0.45" />}
    </svg>
  );
}

function Margins() {
  const [photos, setPhotos] = React.useState(null);

  React.useEffect(() => {
    fetch("./photos/photos.json", { cache: "no-cache" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setPhotos(Array.isArray(data) ? data : data.photos || []))
      .catch(() => setPhotos([])); // fall back to placeholders
  }, []);

  const list = (photos && photos.length > 0)
    ? photos
    : PORTFOLIO.photos.map((p, i) => ({ caption: p.caption, _placeholder: true, hue: p.hue, sat: p.sat, seed: i + 1 }));

  return (
    <section data-screen-label="06 Photography" id="margins">
      <div className="s-head">
        <div className="s-num">§ 06 / photography</div>
        <h2 className="s-title">Photography.</h2>
      </div>
      <p className="margins-intro">A few frames from weekends and walks. Updated whenever I shoot something I like.</p>
      <div className="photo-strip" role="list" aria-label="Photography">
        {list.map((p, i) => (
          <figure key={p.file || i} role="listitem" tabIndex="0">
            {p._placeholder
              ? <PhotoPlaceholder seed={p.seed} hue={p.hue} sat={p.sat} />
              : <img src={`./photos/${p.file}`} alt={p.caption || ""} loading="lazy" />}
            {p.caption && <figcaption>{String(i + 1).padStart(2, "0")} · {p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

window.Margins = Margins;
