// data.jsx — content. Faithful to resume.

const PORTFOLIO = {
  identity: {
    name: "Sagar Varma",
    role: "Data Engineer",
    based: "New Jersey",
    email: "sagar.varma.2003@gmail.com",
    phone: "732-890-5745",
    github: "github.com/sagarvrma",
    linkedin: "linkedin.com/in/sagarvarma",
  },

  about: [
    "Data engineer based in New Jersey. Currently at Bausch Health building biomedical data infrastructure across PubMed, OpenAlex, and internal corpora.",
    "Comfortable across the stack — Python, C#, SQL, Spark, Kafka, Airflow, dbt, Azure, AWS. Most of what I do is moving data reliably between systems and making sure it stays correct when it gets there.",
    "Graduated from Rutgers in 2025, now in the OMSCS program at Georgia Tech.",
  ],

  experience: [
    {
      when: "May 2025 — present",
      role: "Data Engineer",
      company: "Bausch Health",
      where: "Bridgewater, NJ",
      stack: ["Python", "C#", "SQL", "Azure", "OpenAI", "Redshift"],
      bullets: [
        "Designed and maintained REST API ingestion pipelines aggregating data spanning 5M+ biomedical articles.",
        "Engineered market access reconciliation pipelines to surface discrepancies across rebate and contract datasets.",
        "Built Python and C# services for pipeline health monitoring, failure detection, and incident reduction.",
        "Built a scalable RAG pipeline enabling semantic retrieval and excerpt extraction across PubMed and OpenAlex.",
        "Provisioned Azure data infrastructure via Bicep IaC with Key Vault, VNet endpoints, and App Insights observability.",
        "Delivered a unified research platform reducing manual literature review by 40% for R&D teams.",
      ],
    },
    {
      when: "May — Aug 2024",
      role: "Data Engineering Intern",
      company: "Bausch & Lomb",
      where: "Bridgewater, NJ",
      stack: ["Python", "SQL", "Selenium", "ML", "OpenAI"],
      bullets: [
        "Built Python ingestion and transformation pipelines processing 100k+ device log records for downstream analysis.",
        "Automated Lansweeper data extraction via headless Selenium, refreshing device inventory datasets hourly.",
        "Developed anomaly detection pipeline using Isolation Forest to flag highest-frequency device error patterns.",
        "Built clustering pipeline grouping devices by shared failure signatures using k-means for root cause analysis.",
        "Integrated OpenAI layer to auto-diagnose clustered device failures and surface recommended remediation steps.",
        "Filtered 100k+ records to critical assets, enabling proactive user outreach ahead of ticket submission.",
      ],
    },
    {
      when: "May — Sep 2023",
      role: "Data Engineer Intern",
      company: "Rutgers University",
      where: "Piscataway, NJ",
      stack: ["Python", "SQL", "ETL", "Tableau"],
      bullets: [
        "Built Python and SQL ETL pipelines processing multi-year institutional datasets for scheduled reporting systems.",
        "Automated data validation, transformation, and scheduled refresh jobs across recurring reporting workflows.",
        "Optimized pipeline logic and query performance, reducing end-to-end processing time by approximately 30%.",
      ],
    },
    {
      when: "May — Aug 2023",
      role: "Data Analyst Intern",
      company: "Tyger Fit Lab",
      where: "Caldwell, NJ",
      stack: ["SQL", "Power BI"],
      bullets: [
        "Built SQL reporting workflows tracking transactions, inventory trends, and KPIs for e-commerce operations.",
        "Developed Power BI dashboards visualizing sales performance and inventory metrics for stakeholder review.",
      ],
    },
  ],

  // Eight most data-engineering-relevant projects.
  projects: [
    {
      no: "01",
      name: "Dark Pool Activity Detection",
      tagline: "Real-time market surveillance pipeline.",
      desc: "Ingests simulated equity trade streams through Kafka; Spark Structured Streaming runs windowed aggregations and anomaly detection to flag volume spikes, block trades, and routing irregularities; FastAPI WebSockets push alerts to a React terminal-style dashboard. Containerized end-to-end with Docker.",
      stack: ["Kafka", "Spark Structured Streaming", "FastAPI", "React", "Docker"],
      link: "github.com/sagarvrma/darkpooldetector",
    },
    {
      no: "02",
      name: "Financial Market Pipeline (finflow)",
      tagline: "Production AWS batch pipeline on a medallion architecture.",
      desc: "Ingests real equity market data from Polygon.io through a bronze → silver → gold S3 data lake, provisioned via Terraform. AWS Glue crawlers handle schema detection; Redshift Spectrum enables zero-copy querying. dbt models answer a specific question — which equities show pre-earnings volume anomalies consistent with informed trading. Great Expectations enforces quality at the bronze→silver boundary. Five Airflow DAGs orchestrate ingestion, validation, transformation, and dashboard refresh.",
      stack: ["Python", "Airflow", "dbt", "AWS S3", "Redshift", "Glue", "Terraform", "Great Expectations"],
      link: "github.com/sagarvrma/finflow",
    },
    {
      no: "03",
      name: "Developer Activity Data Pipeline (eventstream)",
      tagline: "End-to-end platform on GitHub's public event stream.",
      desc: "Scheduled Airflow DAGs ingest GitHub events into BigQuery with incremental loads. A multi-layer dbt pipeline (staging → facts/dims → marts) builds a dimensional warehouse (fact_repo_activity, dim_repo, dim_language) with partitioned tables, data quality tests, and auto-generated lineage docs. A FastAPI + React dashboard surfaces trending repos, weekly language growth, and global activity heatmaps.",
      stack: ["Python", "Airflow", "dbt", "BigQuery", "GCS", "FastAPI", "React"],
      link: "github.com/sagarvrma/eventstream",
    },
    {
      no: "04",
      name: "Stock & Sentiment Monitoring (marketpulse)",
      tagline: "Spring Boot backend + FastAPI microservice for price/news correlation.",
      desc: "Integrates Twelve Data for live equity prices and runs scheduled tasks that pair price drops with negative news sentiment to fire alerts. Stores results via JPA entities (StockPrice, NewsArticle, Alert) and exposes REST endpoints. The Python microservice scores headlines with VADER and returns average + per-headline sentiment.",
      stack: ["Spring Boot", "FastAPI", "JPA", "VADER", "Twelve Data API"],
      link: "github.com/sagarvrma/marketpulse",
    },
    {
      no: "05",
      name: "Schema Contract CLI",
      tagline: "Production-grade Go CLI for JSON Schema contracts.",
      desc: "Schema validation, version control, breaking-change detection, and auto-generated documentation. S3 for remote storage; Docker for CI/CD integration in microservice environments. Focus on developer experience — clean error messages, structured logging, comprehensive test coverage.",
      stack: ["Go", "AWS S3", "Docker", "JSON Schema"],
      link: "github.com/sagarvrma/schema-contract-cli",
    },
    {
      no: "06",
      name: "IoT Fleet Management",
      tagline: "Event-driven real-time vehicle tracking.",
      desc: "Microservice platform tracking fleet movement across locations. Event-driven architecture handles sensor streams; WebSockets push updates to a live dashboard; MongoDB stores telemetry. Designed for logistics and supply-chain use cases — exercise in distributed backend systems and real-time infrastructure.",
      stack: ["Microservices", "WebSockets", "MongoDB", "Event-driven"],
      link: null,
    },
    {
      no: "07",
      name: "Tactical Backend System",
      tagline: "Spring Boot telemetry backend with WebSocket updates.",
      desc: "Exposes telemetry CRUD APIs with database persistence via JPA/Hibernate. Real-time telemetry updates via STOMP WebSocket messaging for live situational awareness. Clean Controller–Service–Repository layering for extensibility.",
      stack: ["Spring Boot", "WebSocket", "JPA", "PostgreSQL"],
      link: null,
    },
    {
      no: "08",
      name: "Stock Data Feed Interface",
      tagline: "JPMorgan Software Engineering virtual experience.",
      desc: "Interface for real-time stock price data feeds in Python and Java. Structured pipeline to process and display live market data for traders, with error handling, efficient parsing, and integration with existing APIs — simulating financial-engineering workflows for reliable data delivery in high-stakes trading environments.",
      stack: ["Python", "Java", "REST APIs"],
      link: null,
    },
  ],

  skills: [
    {
      head: "Languages",
      items: [
        { name: "Python", primary: true },
        { name: "SQL", primary: true },
        { name: "C#", primary: true },
        { name: "Go", primary: true },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Bash" },
      ],
    },
    {
      head: "Data Engineering",
      items: [
        { name: "Spark", primary: true },
        { name: "Kafka", primary: true },
        { name: "Airflow", primary: true },
        { name: "dbt", primary: true },
        { name: "BigQuery" },
        { name: "Redshift" },
        { name: "Pandas / NumPy" },
        { name: "ETL / ELT" },
        { name: "REST APIs" },
      ],
    },
    {
      head: "Databases",
      items: [
        { name: "PostgreSQL", primary: true },
        { name: "Redshift", primary: true },
        { name: "BigQuery" },
        { name: "MongoDB" },
        { name: "SQLite" },
        { name: "Oracle PL/SQL" },
      ],
    },
    {
      head: "Cloud / DevOps",
      items: [
        { name: "Azure", primary: true },
        { name: "AWS S3", primary: true },
        { name: "GCS" },
        { name: "Docker", primary: true },
        { name: "Terraform" },
        { name: "Bicep" },
        { name: "Git / CI/CD" },
        { name: "Linux" },
      ],
    },
    {
      head: "AI / ML",
      items: [
        { name: "LangChain", primary: true },
        { name: "LangGraph" },
        { name: "Azure OpenAI", primary: true },
        { name: "RAG Pipelines", primary: true },
        { name: "Isolation Forest" },
        { name: "k-means" },
      ],
    },
  ],

  education: [
    {
      when: "2025 — May 2028 (expected)",
      school: "Georgia Institute of Technology",
      degree: "M.S. Computer Science — OMSCS",
      note: "in progress",
    },
    {
      when: "Sep 2021 — May 2025",
      school: "Rutgers University, New Brunswick",
      degree: "B.S. Computer Science · Minor in Data Science · GPA 3.5",
      note: "Dean's List · multiple semesters",
    },
  ],

  photos: [
    { caption: "rooftop · jersey city · 35mm", hue: 32, sat: 0.04 },
    { caption: "morning fog · highline", hue: 210, sat: 0.02 },
    { caption: "subway grid · 14th", hue: 18, sat: 0.05 },
    { caption: "coastline · long branch", hue: 220, sat: 0.03 },
    { caption: "alley window · NB", hue: 28, sat: 0.06 },
    { caption: "concrete & sky", hue: 200, sat: 0.02 },
  ],

  margins: {
    films: [
      { t: "Whiplash", note: "2014 · Chazelle" },
      { t: "Parasite", note: "2019 · Bong" },
      { t: "The Social Network", note: "2010 · Fincher" },
      { t: "Interstellar", note: "2014 · Nolan" },
      { t: "La La Land", note: "2016 · Chazelle" },
    ],
    shows: [
      { t: "Severance", note: "Apple TV+" },
      { t: "Succession", note: "HBO" },
      { t: "Better Call Saul", note: "AMC" },
      { t: "The Bear", note: "FX" },
      { t: "Atlanta", note: "FX" },
    ],
    albums: [
      { t: "Channel Orange", note: "Frank Ocean · 2012" },
      { t: "DAMN.", note: "Kendrick Lamar · 2017" },
      { t: "In Rainbows", note: "Radiohead · 2007" },
      { t: "Currents", note: "Tame Impala · 2015" },
      { t: "Igor", note: "Tyler, The Creator · 2019" },
    ],
    games: [
      { t: "Outer Wilds", note: "exploration" },
      { t: "Hades", note: "rogue-like" },
      { t: "Disco Elysium", note: "RPG" },
      { t: "Celeste", note: "platformer" },
      { t: "Inside", note: "puzzle" },
    ],
  },
};

window.PORTFOLIO = PORTFOLIO;
