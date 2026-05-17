// sections.jsx — about, experience, projects, skills, education

function Hero({ intensity, variant }) {
  const id = PORTFOLIO.identity;
  return (
    <header className="hero" id="hero" data-screen-label="Hero">
      <HeroGraph intensity={intensity} variant={variant} />
      <div className="graph-hint" aria-hidden="true">
        <b>drag a node →</b><br/>
        14 tools · 16 edges<br/>
        live packet flow
      </div>
      <div className="hero-content">
        <div className="h-eyebrow">
          <span className="dot" aria-hidden="true"></span>
          <span>Data engineer · {id.based} · open to roles</span>
        </div>
        <h1 className="h-name">
          Sagar<br/>
          <em>Varma.</em>
        </h1>
        <p className="h-blurb">
          I build data pipelines. Python, SQL, Spark, Kafka, Airflow, dbt — usually on Azure or AWS. Currently at <em>Bausch Health</em>, previously at Bausch &amp; Lomb and Rutgers.
        </p>
        <div className="h-cta">
          <a className="cta-primary" href="./Sagar-Varma-Resume.pdf" download>
            <span>Download resume</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a className="cta-secondary" href={`mailto:${id.email}`}>
            <span>Get in touch</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="h-meta">
          <div>
            <small>Currently</small>
            <strong>Bausch Health · 2025—</strong>
          </div>
          <div>
            <small>Studying</small>
            <strong>OMSCS · Georgia Tech</strong>
          </div>
          <div>
            <small>Reach</small>
            <strong>{id.email}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section data-screen-label="01 About" id="about">
      <div className="s-head">
        <div className="s-num">§ 01 / about</div>
        <h2 className="s-title">About.</h2>
      </div>
      <div className="about-grid">
        <div className="label">Summary</div>
        <div className="about-prose">
          {PORTFOLIO.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = React.useState(0);
  return (
    <section data-screen-label="02 Experience" id="experience">
      <div className="s-head">
        <div className="s-num">§ 02 / experience</div>
        <h2 className="s-title">Experience.</h2>
      </div>
      <ol className="xp-list" role="list">
        {PORTFOLIO.experience.map((x, i) => (
          <li
            key={i}
            className="xp-row"
            data-open={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
            tabIndex="0"
            role="button"
            aria-expanded={open === i}
            aria-label={`${x.role} at ${x.company}, ${x.when}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(open === i ? -1 : i);
              }
            }}
          >
            <div className="xp-when">{x.when}</div>
            <div>
              <div className="xp-role">{x.role}</div>
              <div className="xp-co">{x.company} · {x.where}</div>
            </div>
            <div>
              <div className="xp-stack">
                {x.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
            <div className="xp-detail" aria-hidden={open !== i}>
              <ul>
                {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section data-screen-label="03 Projects" id="projects">
      <div className="s-head">
        <div className="s-num">§ 03 / projects</div>
        <h2 className="s-title">Projects.</h2>
      </div>
      <ol className="proj-list" role="list">
        {PORTFOLIO.projects.map((p, i) => (
          <li key={i} className="proj-row">
            <div className="proj-no">{p.no}</div>
            <div className="proj-main">
              <div className="proj-head">
                <h3 className="proj-name">{p.name}</h3>
                {p.link
                  ? <a className="proj-link" href={`https://${p.link}`} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name} on GitHub`}>github ↗</a>
                  : <span className="proj-link muted">private</span>}
              </div>
              <p className="proj-tagline">{p.tagline}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section data-screen-label="04 Skills" id="skills">
      <div className="s-head">
        <div className="s-num">§ 04 / stack</div>
        <h2 className="s-title">Stack.</h2>
      </div>
      <div className="skills-grid">
        {PORTFOLIO.skills.map((col) => (
          <div key={col.head} className="skill-col">
            <h3>{col.head}</h3>
            <ul>
              {col.items.map((s) => (
                <li key={s.name} className={s.primary ? "" : "dim"}>{s.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section data-screen-label="05 Education" id="education">
      <div className="s-head">
        <div className="s-num">§ 05 / education</div>
        <h2 className="s-title">Education.</h2>
      </div>
      <div className="edu-grid">
        {PORTFOLIO.education.map((e, i) => (
          <div key={i} className="edu">
            <div className="edu-when">{e.when}</div>
            <h3 className="edu-school">{e.school}</h3>
            <p className="edu-degree">{e.degree}</p>
            <div className="edu-note">— {e.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Colophon() {
  const id = PORTFOLIO.identity;
  return (
    <footer className="colophon" data-screen-label="Colophon">
      <div>
        <h5>type</h5>
        <div>Roboto · Roboto Serif · Roboto Mono</div>
        <div>three.js for the hero</div>
        <div>linen · clay accent</div>
      </div>
      <div>
        <h5>contact</h5>
        <div><a href={`mailto:${id.email}`}>{id.email}</a></div>
        <div><a href={`https://${id.github}`}>{id.github}</a></div>
        <div><a href={`https://${id.linkedin}`}>{id.linkedin}</a></div>
      </div>
      <div>
        <h5>signature</h5>
        <div className="signature">Sagar Varma · 2026</div>
        <div style={{marginTop: 8}}>↑ ↑ ↓ ↓ ← → ← → B A</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, About, Experience, Projects, Skills, Education, Colophon });
