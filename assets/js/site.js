(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* Metric counters */
  const metrics = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.getAttribute("data-count") || 0);
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && metrics.length) {
    const mio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            mio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    metrics.forEach((m) => mio.observe(m));
  }

  /* i18n */
  const dict = {
    es: {
      "brand.tag": "Tu developer de confianza",
      "nav.services": "Servicios",
      "nav.work": "Trabajos",
      "nav.process": "Proceso",
      "nav.pricing": "Precios",
      "nav.faq": "FAQ",
      "nav.contact": "Contacto",
      "nav.cta": "Hablar por WhatsApp",
      "hero.eyebrow": "Para negocios locales",
      "hero.title": "Tu negocio también merece existir en internet",
      "hero.lead":
        "Landing pages, automatizaciones y software a medida. Transparencia, personalización y precios justos — sin renunciar a la calidad. Tu developer de confianza.",
      "hero.cta1": "Empezar desde 199€",
      "hero.cta2": "Ver trabajos reales",
      "hero.pill1": "Sin letra pequeña",
      "hero.pill2": "Trato directo contigo",
      "hero.pill3": "Entrega clara y rápida",
      "hero.role": "CEO · Hermanos Solé",
      "hero.priceLabel": "Landing page desde",
      "hero.priceNote": "Menos de lo que cuesta quedarte fuera del mapa digital",
      "values.v1.title": "Transparencia",
      "values.v1.text": "Sabes qué pagas, qué incluye y cuándo lo tienes. Sin sorpresas.",
      "values.v2.title": "Personalización",
      "values.v2.text": "Hecho para tu negocio, no una plantilla genérica con tu logo.",
      "values.v3.title": "Precios justos",
      "values.v3.text": "Calidad profesional a precio de pymes. Accesible de verdad.",
      "services.eyebrow": "Servicios",
      "services.title": "Lo que necesitas para entrar (y crecer) online",
      "services.lead":
        "Da igual si tienes un estudio de tatuajes, una panadería o un gimnasio: si no estás en internet, estás dejando clientes en la mesa.",
      "services.s1.title": "Landing pages",
      "services.s1.text":
        "Una página clara que explica quién eres, qué ofreces y cómo contactarte. Ideal para captar clientes por WhatsApp o llamada.",
      "services.s1.from": "Desde 199€",
      "services.s2.title": "Webs de negocio",
      "services.s2.text":
        "Sitio con varias secciones, carta/servicios, fotos y contacto. Tu escaparate digital abierto 24/7.",
      "services.s2.from": "Desde 449€",
      "services.s3.title": "Automatizaciones",
      "services.s3.text":
        "Reservas, avisos, formularios y flujos que te ahorran horas cada semana. Menos papeleo, más negocio.",
      "services.s3.from": "Desde 299€",
      "services.s4.title": "Software a medida",
      "services.s4.text":
        "Gestión, control de aforo, apps internas… cuando tu negocio necesita una herramienta propia, no un Excel eterno.",
      "services.s4.from": "Presupuesto",
      "work.eyebrow": "Casos reales",
      "work.title": "Productos entregados a clientes",
      "work.lead": "No demos de laboratorio: proyectos profesionales en uso.",
      "work.m1": "Proyectos entregados",
      "work.m2": "Clientes satisfechos",
      "work.m3": "Entrega media landing",
      "work.m4": "Sectores distintos",
      "work.tag": "Producto profesional",
      "work.visit": "Ver proyecto",
      "work.w1.title": "Software de gestión · Hostelería",
      "work.w1.text":
        "Sistema de gestión para restaurantes locales: diseño, construcción y mantenimiento continuo.",
      "work.w2.title": "Landing page · Entrenador personal",
      "work.w2.text":
        "Página de captación para profesional con alto flujo de clientes. Clara, rápida y orientada a conversión.",
      "work.w3.title": "App móvil · Gimnasio",
      "work.w3.text":
        "Reserva de franjas y control de aforo en tiempo real para un gimnasio femenino. Experiencia exclusiva sin aglomeraciones.",
      "work.w4.title": "App web · Control de asistencias",
      "work.w4.text":
        "Aplicación progresiva pensada para móvil: registro y control de asistencias. En fase beta con acceso limitado.",
      "work.w5.title": "App web · Bingo en grupo",
      "work.w5.text":
        "Producto comercial para jugar al bingo online en grupo. Trabajo colaborativo profesional.",
      "work.w6.title": "Web profesional · Educación",
      "work.w6.text":
        "Sitio profesional para clienta externa. Diseño, estructura y puesta en marcha colaborativa.",
      "process.eyebrow": "Proceso",
      "process.title": "Simple, claro y sin rodeos",
      "process.p1.title": "Hablamos",
      "process.p1.text":
        "Me cuentas tu negocio y qué necesitas. Por WhatsApp o llamada, sin compromiso.",
      "process.p2.title": "Presupuesto cerrado",
      "process.p2.text":
        "Te digo precio, plazos e incluye/no incluye. Tú decides con información.",
      "process.p3.title": "Diseño y construcción",
      "process.p3.text":
        "Te voy mostrando avances. Ajustamos hasta que encaje con tu marca.",
      "process.p4.title": "Lanzamiento",
      "process.p4.text":
        "Publicamos, conectamos dominio/hosting si hace falta, y te dejo listo para recibir clientes.",
      "pricing.eyebrow": "Precios",
      "pricing.title": "Inversión clara. Sin trucos.",
      "pricing.lead":
        "Precios orientativos — los ajustamos a tu caso. Lo importante: que puedas dar el paso sin arruinarte.",
      "pricing.p1.label": "Más pedido",
      "pricing.p1.title": "Landing esencial",
      "pricing.p1.desc":
        "Ideal para panaderías, estudios, comercios y autónomos que quieren existir online ya.",
      "pricing.p1.i1": "1 página profesional",
      "pricing.p1.i2": "Móvil + escritorio",
      "pricing.p1.i3": "Botón WhatsApp",
      "pricing.p1.i4": "SEO básico",
      "pricing.p1.i5": "Entrega ~7 días",
      "pricing.p2.title": "Web de negocio",
      "pricing.p2.desc":
        "Varias secciones, galería, servicios y contacto. Tu marca con presencia seria.",
      "pricing.p2.i1": "Hasta 5 secciones",
      "pricing.p2.i2": "Diseño a medida",
      "pricing.p2.i3": "Formulario / WhatsApp",
      "pricing.p2.i4": "Optimización velocidad",
      "pricing.p2.i5": "1 ronda de cambios",
      "pricing.p3.title": "Automatización",
      "pricing.p3.desc": "Flujos, reservas o avisos que te quitan trabajo repetitivo.",
      "pricing.p3.i1": "1 flujo automatizado",
      "pricing.p3.i2": "Integración WhatsApp/email",
      "pricing.p3.i3": "Pruebas incluidas",
      "pricing.p3.i4": "Documentación simple",
      "pricing.p3.i5": "Soporte 15 días",
      "pricing.p4.title": "Software a medida",
      "pricing.p4.price": "A medida",
      "pricing.p4.desc":
        "Gestión, apps internas, paneles… lo valoramos según complejidad.",
      "pricing.p4.i1": "Análisis de necesidades",
      "pricing.p4.i2": "Prototipo / demo",
      "pricing.p4.i3": "Desarrollo iterativo",
      "pricing.p4.i4": "Formación de uso",
      "pricing.p4.i5": "Mantenimiento opcional",
      "pricing.cta": "Quiero esta",
      "pricing.ctaQuote": "Pedir presupuesto",
      "pricing.note":
        "* Precios orientativos (placeholder). Hosting y dominio se pueden conectar a lo que ya tengas, o te ayudo a dejarlo montado.",
      "about.eyebrow": "Quién hay detrás",
      "about.title": "No soy una agencia. Soy tu developer.",
      "about.p1":
        "Me llamo Marcos. Trabajo con empresarios locales que quieren resultados, no jerga técnica. Hablamos claro, acordamos precio y entrego.",
      "about.p2":
        "Si tienes un negocio físico y aún no tienes web — o la tienes abandonada — este es el momento. Quedarte fuera sale más caro que entrar.",
      "about.cta": "Escríbeme sin compromiso",
      "faq.title": "Preguntas que me hacen siempre",
      "faq.q1": "¿Cuánto tarda una landing?",
      "faq.a1":
        "En la mayoría de casos, unos 7 días desde que tenemos textos y fotos. Si tienes prisa, lo hablamos.",
      "faq.q2": "¿Necesito saber de tecnología?",
      "faq.a2":
        "No. Yo me encargo. Tú solo me cuentas tu negocio y qué quieres conseguir.",
      "faq.q3": "¿Y el dominio y el hosting?",
      "faq.a3":
        "Si ya los tienes, los conectamos. Si no, te ayudo a dejarlo montado de forma sencilla y económica.",
      "faq.q4": "¿Puedo pedir cambios?",
      "faq.a4":
        "Sí. Incluyo rondas de ajustes según el paquete. Todo queda escrito en el presupuesto para que no haya malentendidos.",
      "faq.q5": "¿Trabajas solo en Cataluña?",
      "faq.a5":
        "Estoy en Cataluña, pero trabajo online con clientes de cualquier sitio. WhatsApp basta.",
      "contact.eyebrow": "Contacto",
      "contact.title": "¿Hablamos de tu negocio?",
      "contact.lead":
        "Sin formularios eternos. Escríbeme por WhatsApp o email y te respondo personalmente.",
      "contact.wa": "+34 722 195 284",
      "contact.corp": "Web corporativa",
      "footer.tag": "Tu developer de confianza para pymes locales",
      "footer.rights": "Todos los derechos reservados",
    },
    ca: {
      "brand.tag": "El teu developer de confiança",
      "nav.services": "Serveis",
      "nav.work": "Treballs",
      "nav.process": "Procés",
      "nav.pricing": "Preus",
      "nav.faq": "FAQ",
      "nav.contact": "Contacte",
      "nav.cta": "Parlar per WhatsApp",
      "hero.eyebrow": "Per a negocis locals",
      "hero.title": "El teu negoci també mereix existir a internet",
      "hero.lead":
        "Landing pages, automatitzacions i programari a mida. Transparència, personalització i preus justos — sense renunciar a la qualitat. El teu developer de confiança.",
      "hero.cta1": "Començar des de 199€",
      "hero.cta2": "Veure treballs reals",
      "hero.pill1": "Sense lletra petita",
      "hero.pill2": "Tracte directe amb tu",
      "hero.pill3": "Entrega clara i ràpida",
      "hero.role": "CEO · Hermanos Solé",
      "hero.priceLabel": "Landing page des de",
      "hero.priceNote": "Menys del que costa quedar-te fora del mapa digital",
      "values.v1.title": "Transparència",
      "values.v1.text": "Saps què pagues, què inclou i quan ho tens. Sense sorpreses.",
      "values.v2.title": "Personalització",
      "values.v2.text": "Fet per al teu negoci, no una plantilla genèrica amb el teu logo.",
      "values.v3.title": "Preus justos",
      "values.v3.text": "Qualitat professional a preu de pimes. Accessible de veritat.",
      "services.eyebrow": "Serveis",
      "services.title": "El que necessites per entrar (i créixer) online",
      "services.lead":
        "Igual si tens un estudi de tatuatges, una fleca o un gimnàs: si no ets a internet, estàs deixant clients a la taula.",
      "services.s1.title": "Landing pages",
      "services.s1.text":
        "Una pàgina clara que explica qui ets, què ofereixes i com contactar-te. Ideal per captar clients per WhatsApp o trucada.",
      "services.s1.from": "Des de 199€",
      "services.s2.title": "Webs de negoci",
      "services.s2.text":
        "Lloc amb diverses seccions, carta/serveis, fotos i contacte. El teu aparador digital obert 24/7.",
      "services.s2.from": "Des de 449€",
      "services.s3.title": "Automatitzacions",
      "services.s3.text":
        "Reserves, avisos, formularis i fluxos que et estalvien hores cada setmana. Menys paperassa, més negoci.",
      "services.s3.from": "Des de 299€",
      "services.s4.title": "Programari a mida",
      "services.s4.text":
        "Gestió, control d'aforament, apps internes… quan el teu negoci necessita una eina pròpia, no un Excel etern.",
      "services.s4.from": "Pressupost",
      "work.eyebrow": "Casos reals",
      "work.title": "Productes lliurats a clients",
      "work.lead": "No demos de laboratori: projectes professionals en ús.",
      "work.m1": "Projectes lliurats",
      "work.m2": "Clients satisfets",
      "work.m3": "Entrega mitjana landing",
      "work.m4": "Sectors diferents",
      "work.tag": "Producte professional",
      "work.visit": "Veure projecte",
      "work.w1.title": "Programari de gestió · Hostaleria",
      "work.w1.text":
        "Sistema de gestió per a restaurants locals: disseny, construcció i manteniment continu.",
      "work.w2.title": "Landing page · Entrenador personal",
      "work.w2.text":
        "Pàgina de captació per a professional amb alt flux de clients. Clara, ràpida i orientada a conversió.",
      "work.w3.title": "App mòbil · Gimnàs",
      "work.w3.text":
        "Reserva de franges i control d'aforament en temps real per a un gimnàs femení. Experiència exclusiva sense aglomeracions.",
      "work.w4.title": "App web · Control d'assistències",
      "work.w4.text":
        "Aplicació progressiva pensada per a mòbil: registre i control d'assistències. En fase beta amb accés limitat.",
      "work.w5.title": "App web · Bingo en grup",
      "work.w5.text":
        "Producte comercial per jugar al bingo online en grup. Treball col·laboratiu professional.",
      "work.w6.title": "Web professional · Educació",
      "work.w6.text":
        "Lloc professional per a clienta externa. Disseny, estructura i posada en marxa col·laborativa.",
      "process.eyebrow": "Procés",
      "process.title": "Simple, clar i sense embuts",
      "process.p1.title": "Parlem",
      "process.p1.text":
        "Em comptes el teu negoci i què necessites. Per WhatsApp o trucada, sense compromís.",
      "process.p2.title": "Pressupost tancat",
      "process.p2.text":
        "Et dic preu, terminis i què inclou / no inclou. Tu decides amb informació.",
      "process.p3.title": "Disseny i construcció",
      "process.p3.text":
        "Et vaig mostrant avenços. Ajustem fins que encaixi amb la teva marca.",
      "process.p4.title": "Llançament",
      "process.p4.text":
        "Publiquem, connectem domini/hosting si cal, i et deixo a punt per rebre clients.",
      "pricing.eyebrow": "Preus",
      "pricing.title": "Inversió clara. Sense trucs.",
      "pricing.lead":
        "Preus orientatius — els ajustem al teu cas. L'important: que puguis fer el pas sense arruïnar-te.",
      "pricing.p1.label": "Més demanat",
      "pricing.p1.title": "Landing essencial",
      "pricing.p1.desc":
        "Ideal per a fleques, estudis, comerços i autònoms que volen existir online ja.",
      "pricing.p1.i1": "1 pàgina professional",
      "pricing.p1.i2": "Mòbil + escriptori",
      "pricing.p1.i3": "Botó WhatsApp",
      "pricing.p1.i4": "SEO bàsic",
      "pricing.p1.i5": "Entrega ~7 dies",
      "pricing.p2.title": "Web de negoci",
      "pricing.p2.desc":
        "Diverses seccions, galeria, serveis i contacte. La teva marca amb presència seriosa.",
      "pricing.p2.i1": "Fins a 5 seccions",
      "pricing.p2.i2": "Disseny a mida",
      "pricing.p2.i3": "Formulari / WhatsApp",
      "pricing.p2.i4": "Optimització de velocitat",
      "pricing.p2.i5": "1 ronda de canvis",
      "pricing.p3.title": "Automatització",
      "pricing.p3.desc": "Fluxos, reserves o avisos que et treuen feina repetitiva.",
      "pricing.p3.i1": "1 flux automatitzat",
      "pricing.p3.i2": "Integració WhatsApp/email",
      "pricing.p3.i3": "Proves incloses",
      "pricing.p3.i4": "Documentació simple",
      "pricing.p3.i5": "Suport 15 dies",
      "pricing.p4.title": "Programari a mida",
      "pricing.p4.price": "A mida",
      "pricing.p4.desc":
        "Gestió, apps internes, panells… ho valorem segons complexitat.",
      "pricing.p4.i1": "Anàlisi de necessitats",
      "pricing.p4.i2": "Prototip / demo",
      "pricing.p4.i3": "Desenvolupament iteratiu",
      "pricing.p4.i4": "Formació d'ús",
      "pricing.p4.i5": "Manteniment opcional",
      "pricing.cta": "Vull aquesta",
      "pricing.ctaQuote": "Demanar pressupost",
      "pricing.note":
        "* Preus orientatius (placeholder). Hosting i domini es poden connectar al que ja tinguis, o t'ajudo a deixar-ho muntat.",
      "about.eyebrow": "Qui hi ha al darrere",
      "about.title": "No sóc una agència. Sóc el teu developer.",
      "about.p1":
        "Em dic Marcos. Treballo amb empresaris locals que volen resultats, no argot tècnic. Parlem clar, acordem preu i lliuro.",
      "about.p2":
        "Si tens un negoci físic i encara no tens web — o la tens abandonada — aquest és el moment. Quedar-te fora surt més car que entrar.",
      "about.cta": "Escriu-me sense compromís",
      "faq.title": "Preguntes que em fan sempre",
      "faq.q1": "Quant triga una landing?",
      "faq.a1":
        "En la majoria de casos, uns 7 dies des que tenim textos i fotos. Si tens pressa, en parlem.",
      "faq.q2": "Necessito saber de tecnologia?",
      "faq.a2":
        "No. Me'n ocupo jo. Tu només em comptes el teu negoci i què vols aconseguir.",
      "faq.q3": "I el domini i l'hosting?",
      "faq.a3":
        "Si ja els tens, els connectem. Si no, t'ajudo a deixar-ho muntat de forma senzilla i econòmica.",
      "faq.q4": "Puc demanar canvis?",
      "faq.a4":
        "Sí. Incloc rondes d'ajustos segons el paquet. Tot queda escrit al pressupost perquè no hi hagi malentesos.",
      "faq.q5": "Treballes només a Catalunya?",
      "faq.a5":
        "Soc a Catalunya, però treballo online amb clients de qualsevol lloc. WhatsApp n'hi ha prou.",
      "contact.eyebrow": "Contacte",
      "contact.title": "Parlem del teu negoci?",
      "contact.lead":
        "Sense formularis eterns. Escriu-me per WhatsApp o email i et responc personalment.",
      "contact.wa": "+34 722 195 284",
      "contact.corp": "Web corporativa",
      "footer.tag": "El teu developer de confiança per a pimes locals",
      "footer.rights": "Tots els drets reservats",
    },
    en: {
      "brand.tag": "Your trusted developer",
      "nav.services": "Services",
      "nav.work": "Work",
      "nav.process": "Process",
      "nav.pricing": "Pricing",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.cta": "Chat on WhatsApp",
      "hero.eyebrow": "For local businesses",
      "hero.title": "Your business deserves to exist online too",
      "hero.lead":
        "Landing pages, automations and custom software. Transparency, personalization and fair prices — without cutting quality. Your trusted developer.",
      "hero.cta1": "Start from €199",
      "hero.cta2": "See real work",
      "hero.pill1": "No fine print",
      "hero.pill2": "Direct with you",
      "hero.pill3": "Clear, fast delivery",
      "hero.role": "CEO · Hermanos Solé",
      "hero.priceLabel": "Landing page from",
      "hero.priceNote": "Less than the cost of staying off the digital map",
      "values.v1.title": "Transparency",
      "values.v1.text": "You know what you pay, what’s included and when it’s ready. No surprises.",
      "values.v2.title": "Personalization",
      "values.v2.text": "Built for your business — not a generic template with your logo.",
      "values.v3.title": "Fair prices",
      "values.v3.text": "Professional quality at SME prices. Truly accessible.",
      "services.eyebrow": "Services",
      "services.title": "What you need to get online (and grow)",
      "services.lead":
        "Whether you run a tattoo studio, a bakery or a gym: if you’re not online, you’re leaving customers on the table.",
      "services.s1.title": "Landing pages",
      "services.s1.text":
        "A clear page that explains who you are, what you offer and how to reach you. Perfect for WhatsApp or phone leads.",
      "services.s1.from": "From €199",
      "services.s2.title": "Business websites",
      "services.s2.text":
        "Multiple sections, services, photos and contact. Your digital storefront open 24/7.",
      "services.s2.from": "From €449",
      "services.s3.title": "Automations",
      "services.s3.text":
        "Bookings, alerts, forms and flows that save you hours every week. Less admin, more business.",
      "services.s3.from": "From €299",
      "services.s4.title": "Custom software",
      "services.s4.text":
        "Ops tools, capacity control, internal apps… when your business needs its own tool — not endless spreadsheets.",
      "services.s4.from": "Quote",
      "work.eyebrow": "Real cases",
      "work.title": "Products delivered to clients",
      "work.lead": "Not lab demos: professional projects in use.",
      "work.m1": "Projects delivered",
      "work.m2": "Happy clients",
      "work.m3": "Avg. landing delivery",
      "work.m4": "Different industries",
      "work.tag": "Professional product",
      "work.visit": "View project",
      "work.w1.title": "Ops software · Hospitality",
      "work.w1.text":
        "Management system for local restaurants: design, build and ongoing maintenance.",
      "work.w2.title": "Landing page · Personal trainer",
      "work.w2.text":
        "Lead-gen page for a high-traffic professional. Clear, fast and conversion-focused.",
      "work.w3.title": "Mobile app · Gym",
      "work.w3.text":
        "Slot booking and live capacity control for a women’s gym. Exclusive experience without overcrowding.",
      "work.w4.title": "Web app · Attendance control",
      "work.w4.text":
        "Progressive web app built for mobile: attendance tracking. Limited-access beta.",
      "work.w5.title": "Web app · Group bingo",
      "work.w5.text":
        "Commercial product for playing bingo online in groups. Professional collaborative work.",
      "work.w6.title": "Professional site · Education",
      "work.w6.text":
        "Professional website for an external client. Collaborative design, structure and launch.",
      "process.eyebrow": "Process",
      "process.title": "Simple, clear, no fluff",
      "process.p1.title": "We talk",
      "process.p1.text":
        "You tell me about your business and what you need. WhatsApp or call — no commitment.",
      "process.p2.title": "Fixed quote",
      "process.p2.text":
        "I share price, timeline and what’s in / out. You decide with full info.",
      "process.p3.title": "Design & build",
      "process.p3.text":
        "I show progress as we go. We tweak until it fits your brand.",
      "process.p4.title": "Launch",
      "process.p4.text":
        "We publish, connect domain/hosting if needed, and leave you ready for customers.",
      "pricing.eyebrow": "Pricing",
      "pricing.title": "Clear investment. No tricks.",
      "pricing.lead":
        "Guide prices — we adjust to your case. The point: take the step without breaking the bank.",
      "pricing.p1.label": "Most requested",
      "pricing.p1.title": "Essential landing",
      "pricing.p1.desc":
        "Ideal for bakeries, studios, shops and freelancers who want to exist online now.",
      "pricing.p1.i1": "1 professional page",
      "pricing.p1.i2": "Mobile + desktop",
      "pricing.p1.i3": "WhatsApp button",
      "pricing.p1.i4": "Basic SEO",
      "pricing.p1.i5": "Delivery ~7 days",
      "pricing.p2.title": "Business website",
      "pricing.p2.desc":
        "Multiple sections, gallery, services and contact. Serious brand presence.",
      "pricing.p2.i1": "Up to 5 sections",
      "pricing.p2.i2": "Custom design",
      "pricing.p2.i3": "Form / WhatsApp",
      "pricing.p2.i4": "Speed optimization",
      "pricing.p2.i5": "1 revision round",
      "pricing.p3.title": "Automation",
      "pricing.p3.desc": "Flows, bookings or alerts that remove repetitive work.",
      "pricing.p3.i1": "1 automated flow",
      "pricing.p3.i2": "WhatsApp/email integration",
      "pricing.p3.i3": "Testing included",
      "pricing.p3.i4": "Simple docs",
      "pricing.p3.i5": "15-day support",
      "pricing.p4.title": "Custom software",
      "pricing.p4.price": "Custom",
      "pricing.p4.desc":
        "Ops tools, internal apps, dashboards… scoped by complexity.",
      "pricing.p4.i1": "Needs analysis",
      "pricing.p4.i2": "Prototype / demo",
      "pricing.p4.i3": "Iterative build",
      "pricing.p4.i4": "Usage training",
      "pricing.p4.i5": "Optional maintenance",
      "pricing.cta": "I want this",
      "pricing.ctaQuote": "Request a quote",
      "pricing.note":
        "* Guide prices (placeholder). We can connect hosting/domain you already have, or I help you set it up.",
      "about.eyebrow": "Who’s behind it",
      "about.title": "Not an agency. Your developer.",
      "about.p1":
        "I’m Marcos. I work with local business owners who want results, not tech jargon. We talk straight, agree on price, and I deliver.",
      "about.p2":
        "If you have a physical business and still no website — or an abandoned one — now’s the time. Staying offline costs more than getting in.",
      "about.cta": "Message me — no pressure",
      "faq.title": "Questions I get all the time",
      "faq.q1": "How long does a landing take?",
      "faq.a1":
        "Usually about 7 days once we have copy and photos. Need it faster? We’ll talk.",
      "faq.q2": "Do I need to know tech?",
      "faq.a2":
        "No. I handle it. You just tell me about your business and what you want to achieve.",
      "faq.q3": "What about domain and hosting?",
      "faq.a3":
        "If you already have them, we connect them. If not, I’ll help you set things up simply and affordably.",
      "faq.q4": "Can I request changes?",
      "faq.a4":
        "Yes. Revision rounds are included by package. Everything is written in the quote so there’s no confusion.",
      "faq.q5": "Do you only work in Catalonia?",
      "faq.a5":
        "I’m based in Catalonia, but I work online with clients anywhere. WhatsApp is enough.",
      "contact.eyebrow": "Contact",
      "contact.title": "Shall we talk about your business?",
      "contact.lead":
        "No endless forms. Message me on WhatsApp or email and I’ll reply personally.",
      "contact.wa": "+34 722 195 284",
      "contact.corp": "Corporate site",
      "footer.tag": "Your trusted developer for local SMEs",
      "footer.rights": "All rights reserved",
    },
  };

  const applyLang = (lang, persist = false) => {
    const pack = dict[lang] || dict.es;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && pack[key] != null) el.textContent = pack[key];
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    if (persist) localStorage.setItem("ss-lang-chosen", lang);
  };

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang || "es", true));
  });

  // Español por defecto (ignora idioma del navegador)
  const chosen = localStorage.getItem("ss-lang-chosen");
  applyLang(chosen === "ca" || chosen === "en" ? chosen : "es");
})();
