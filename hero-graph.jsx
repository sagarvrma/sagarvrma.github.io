// hero-graph.jsx — three.js node-graph hero.
// A "data pipeline as constellation" — nodes labeled with the actual stack
// (Kafka, Spark, Airflow, BigQuery, …) wired together. Soft physics, drag,
// parallax. Honors prefers-reduced-motion + an `intensity` prop from tweaks.

const HERO_NODES = [
  { id: "kafka",    label: "kafka",     group: "stream" },
  { id: "spark",    label: "spark",     group: "stream" },
  { id: "airflow",  label: "airflow",   group: "orch"   },
  { id: "dbt",      label: "dbt",       group: "orch"   },
  { id: "bigquery", label: "bigquery",  group: "store"  },
  { id: "postgres", label: "postgres",  group: "store"  },
  { id: "azure",    label: "azure",     group: "cloud"  },
  { id: "openai",   label: "openai",    group: "ml"     },
  { id: "langchain",label: "langchain", group: "ml"     },
  { id: "fastapi",  label: "fastapi",   group: "edge"   },
  { id: "react",    label: "react",     group: "edge"   },
  { id: "docker",   label: "docker",    group: "cloud"  },
  { id: "s3",       label: "s3",        group: "store"  },
  { id: "bicep",    label: "bicep",     group: "cloud"  },
];

const HERO_EDGES = [
  ["kafka","spark"], ["spark","bigquery"], ["airflow","dbt"], ["dbt","bigquery"],
  ["bigquery","fastapi"], ["fastapi","react"], ["azure","openai"],
  ["openai","langchain"], ["langchain","fastapi"], ["postgres","fastapi"],
  ["docker","fastapi"], ["bicep","azure"], ["s3","spark"], ["airflow","bigquery"],
  ["kafka","fastapi"], ["spark","langchain"],
];

function HeroGraph({ intensity = "subtle", variant = "graph" }) {
  const mountRef = React.useRef(null);
  const reduce = React.useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  React.useEffect(() => {
    if (!mountRef.current || !window.THREE) return;
    const THREE = window.THREE;
    const mount = mountRef.current;
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    const W = () => mount.clientWidth || window.innerWidth;
    const H = () => mount.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W()/H(), 0.1, 1000);
    camera.position.set(0, 0, 28);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W(), H());
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const inkColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
      return new THREE.Color(v || "#1a2238");
    };
    const rustColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--rust").trim();
      return new THREE.Color(v || "#c8553d");
    };

    // ---- node positions ---------------------------------------------------
    const nodes = HERO_NODES.map((n, i) => {
      const a = (i / HERO_NODES.length) * Math.PI * 2;
      const r = 9 + (i % 3) * 1.6;
      return {
        ...n,
        pos: new THREE.Vector3(
          Math.cos(a) * r + (Math.random()-0.5)*2,
          Math.sin(a) * r * 0.55 + (Math.random()-0.5)*2,
          (Math.random()-0.5) * 4
        ),
        vel: new THREE.Vector3(),
        home: null,
      };
    });
    nodes.forEach(n => { n.home = n.pos.clone(); });

    const lookup = Object.fromEntries(nodes.map(n => [n.id, n]));

    // ---- edges (lines) ----------------------------------------------------
    const edgeGeo = new THREE.BufferGeometry();
    const edgePositions = new Float32Array(HERO_EDGES.length * 2 * 3);
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: inkColor(),
      transparent: true,
      opacity: 0.18,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // ---- node points ------------------------------------------------------
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(nodes.length * 3);
    const dotCol = new Float32Array(nodes.length * 3);
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    dotGeo.setAttribute("color", new THREE.BufferAttribute(dotCol, 3));
    const dotMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(dotGeo, dotMat);
    scene.add(points);

    // ---- labels via sprite canvas ----------------------------------------
    const labelGroup = new THREE.Group();
    scene.add(labelGroup);
    const labelSprites = nodes.map((n) => {
      const c = document.createElement("canvas");
      c.width = 256; c.height = 64;
      const ctx = c.getContext("2d");
      ctx.font = "500 22px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(26,34,56,0.78)";
      ctx.textBaseline = "middle";
      ctx.fillText(n.label, 16, 32);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.0 });
      const sp = new THREE.Sprite(mat);
      sp.scale.set(3.4, 0.85, 1);
      labelGroup.add(sp);
      return { sprite: sp, mat, ctx, canvas: c, tex };
    });

    // packets streaming along edges (tiny rust dots)
    const PKT_COUNT = HERO_EDGES.length;
    const pktGeo = new THREE.BufferGeometry();
    const pktPos = new Float32Array(PKT_COUNT * 3);
    pktGeo.setAttribute("position", new THREE.BufferAttribute(pktPos, 3));
    const pktMat = new THREE.PointsMaterial({
      color: rustColor(),
      size: 0.18,
      transparent: true,
      opacity: 0.9,
    });
    const packets = new THREE.Points(pktGeo, pktMat);
    scene.add(packets);
    const pktT = HERO_EDGES.map(() => Math.random());
    const pktSpeed = HERO_EDGES.map(() => 0.0035 + Math.random()*0.005);

    // ---- mouse / drag -----------------------------------------------------
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    let dragging = null;
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.6;

    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -((e.clientY - r.top) / r.height) * 2 + 1;
      target.set(x, y);
      if (dragging) {
        // unproject to world plane
        const v = new THREE.Vector3(x, y, 0.5).unproject(camera);
        const dir = v.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        const wp = camera.position.clone().add(dir.multiplyScalar(dist));
        dragging.pos.copy(wp);
        dragging.vel.set(0,0,0);
      }
    };
    const onDown = (e) => {
      const r = mount.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -((e.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera({x, y}, camera);
      const hit = raycaster.intersectObject(points);
      if (hit.length) {
        dragging = nodes[hit[0].index];
        mount.style.cursor = "grabbing";
      }
    };
    const onUp = () => { dragging = null; mount.style.cursor = ""; };

    mount.addEventListener("mousemove", onMove);
    mount.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const onResize = () => {
      camera.aspect = W()/H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);

    // ---- animation loop ---------------------------------------------------
    let raf;
    let t = 0;
    const intensityMul = intensity === "off" ? 0 : intensity === "full" ? 1.4 : intensity === "subtle" ? 0.7 : 1;

    const tick = () => {
      t += 0.005 * (reduce ? 0.2 : 1) * intensityMul;
      // spring nodes back to home
      nodes.forEach((n) => {
        if (n === dragging) return;
        const dx = n.home.x - n.pos.x;
        const dy = n.home.y - n.pos.y;
        const dz = n.home.z - n.pos.z;
        n.vel.x += dx * 0.0025;
        n.vel.y += dy * 0.0025;
        n.vel.z += dz * 0.0025;
        n.vel.multiplyScalar(0.94);
        // wander
        if (!reduce) {
          n.vel.x += Math.sin(t + n.pos.y) * 0.0015 * intensityMul;
          n.vel.y += Math.cos(t + n.pos.x) * 0.0015 * intensityMul;
        }
        n.pos.add(n.vel);
      });

      // write dot positions + colors
      const ink = inkColor();
      const rust = rustColor();
      nodes.forEach((n, i) => {
        dotPos[i*3]   = n.pos.x;
        dotPos[i*3+1] = n.pos.y;
        dotPos[i*3+2] = n.pos.z;
        const isHover = (dragging && dragging.id === n.id);
        const c = isHover ? rust : ink;
        dotCol[i*3]   = c.r;
        dotCol[i*3+1] = c.g;
        dotCol[i*3+2] = c.b;
      });
      dotGeo.attributes.position.needsUpdate = true;
      dotGeo.attributes.color.needsUpdate = true;

      // labels — project to screen, fade in near cursor
      labelSprites.forEach((ls, i) => {
        const n = nodes[i];
        ls.sprite.position.set(n.pos.x + 1.4, n.pos.y + 0.5, n.pos.z);
        const screen = n.pos.clone().project(camera);
        const dx = screen.x - target.x;
        const dy = screen.y - target.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        const op = Math.max(0, 1 - d * 2.2);
        ls.mat.opacity = op * 0.95 + (dragging && dragging.id === n.id ? 0.4 : 0);
      });

      // edges
      HERO_EDGES.forEach(([a,b], i) => {
        const A = lookup[a].pos, B = lookup[b].pos;
        edgePositions[i*6]   = A.x; edgePositions[i*6+1] = A.y; edgePositions[i*6+2] = A.z;
        edgePositions[i*6+3] = B.x; edgePositions[i*6+4] = B.y; edgePositions[i*6+5] = B.z;
      });
      edgeGeo.attributes.position.needsUpdate = true;
      edgeMat.color = ink;

      // packets
      HERO_EDGES.forEach(([a,b], i) => {
        pktT[i] += pktSpeed[i] * (reduce ? 0.2 : 1) * intensityMul;
        if (pktT[i] > 1) pktT[i] = 0;
        const A = lookup[a].pos, B = lookup[b].pos;
        pktPos[i*3]   = A.x + (B.x - A.x) * pktT[i];
        pktPos[i*3+1] = A.y + (B.y - A.y) * pktT[i];
        pktPos[i*3+2] = A.z + (B.z - A.z) * pktT[i];
      });
      pktGeo.attributes.position.needsUpdate = true;
      pktMat.color = rust;

      // gentle parallax of the whole scene with mouse
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      scene.rotation.y = mouse.x * 0.18 * intensityMul;
      scene.rotation.x = -mouse.y * 0.12 * intensityMul;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("mousemove", onMove);
      mount.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      dotGeo.dispose(); dotMat.dispose();
      edgeGeo.dispose(); edgeMat.dispose();
      pktGeo.dispose(); pktMat.dispose();
      labelSprites.forEach(ls => { ls.tex.dispose(); ls.mat.dispose(); });
    };
  }, [intensity, variant]);

  return (
    <div
      ref={mountRef}
      className="hero-canvas"
      role="img"
      aria-label="Interactive constellation of data-engineering tools — drag a node to move it."
    />
  );
}

window.HeroGraph = HeroGraph;
