/* REDROOM - sitio estatico. Todo el contenido editable esta en CONFIG y PROJECTS. */
var CONFIG = {
  email: "CORREO@REDROOM.CL",            // TODO: reemplazar por el correo real
  instagram: "https://instagram.com/",   // TODO: perfil real
  youtube: "https://youtube.com/",       // TODO: canal real
  // TODO: para enviar sin abrir el correo, cambia submitForm() por Formspree / Netlify Forms / FormSubmit
};
var PROJECTS = [ /* TODO: reemplazar el contenido DEMO por trabajos reales (image y video son rutas en /assets) */
  {id:"p01",title:"PROYECTO 01",category:"MÚSICA",mood:["oscuro","enérgico"],year:"DEMO",image:"",video:"",description:"Videoclip. CONTENIDO DEMO."},
  {id:"p02",title:"PROYECTO 02",category:"CINE",mood:["cinematográfico","emotivo"],year:"DEMO",image:"",video:"",description:"Cortometraje. CONTENIDO DEMO."},
  {id:"p03",title:"PROYECTO 03",category:"EN VIVO",mood:["crudo","enérgico"],year:"DEMO",image:"",video:"",description:"Sesion en vivo. CONTENIDO DEMO."},
  {id:"p04",title:"PROYECTO 04",category:"COMERCIAL",mood:["elegante","cinematográfico"],year:"DEMO",image:"",video:"",description:"Video corporativo. CONTENIDO DEMO."},
  {id:"p05",title:"PROYECTO 05",category:"EXPERIMENTAL",mood:["abstracto","caótico"],year:"DEMO",image:"",video:"",description:"Pieza experimental. CONTENIDO DEMO."},
  {id:"p06",title:"PROYECTO 06",category:"COMERCIAL",mood:["elegante","emotivo"],year:"DEMO",image:"",video:"",description:"Matrimonio. CONTENIDO DEMO."},
  {id:"p07",title:"PROYECTO 07",category:"MÚSICA",mood:["crudo","oscuro"],year:"DEMO",image:"",video:"",description:"Videoclip. CONTENIDO DEMO."},
  {id:"p08",title:"PROYECTO 08",category:"EXPERIMENTAL",mood:["abstracto","oscuro"],year:"DEMO",image:"",video:"",description:"Pieza experimental. CONTENIDO DEMO."}
];
var MOODS = ["oscuro","cinematográfico","crudo","enérgico","emotivo","abstracto","elegante","caótico"];
/* RED AUDIOVISUAL VIVA. TODO: reemplaza los nodos DEMO por reales. Cada trabajo nuevo = un nodo "J" con l:[ids conectados]
   y add:"AAAA-MM" (mes en que se concretó). El botón CONSTRUIR LA RED reproduce el crecimiento en ese orden. ll = [lon, lat] aproximada. */
var NET_TYPES = {R:"REDROOM",B:"BANDAS",P:"ARTISTAS Y PERSONAS",E:"EMPRENDIMIENTOS",L:"LOCACIONES",J:"PROYECTOS",C:"COLABORACIONES"};
var NET = [
  {id:"rr",t:"R",n:"REDROOM",ll:[-71.66,-35.43],add:"2020-01",l:["vc","lo","co","su","ct","cm"]},
  {id:"ba",t:"B",n:"BANDA DEMO (TALCA)",ll:[-71.70,-35.40],add:"2021-03",l:["vc"]},
  {id:"vc",t:"J",n:"VIDEOCLIP DEMO",ll:[-71.62,-35.47],add:"2021-05",l:["ba","rr"]},
  {id:"lo",t:"L",n:"LOCACIÓN DEMO (SAN JAVIER)",ll:[-71.73,-35.60],add:"2021-05",l:["rr","fo"]},
  {id:"fo",t:"P",n:"FOTÓGRAFO DEMO",ll:[-71.24,-34.98],add:"2022-02",l:["lo","ev"]},
  {id:"ev",t:"C",n:"EVENTO DEMO",ll:[-71.45,-35.2],add:"2022-09",l:["fo","em"]},
  {id:"em",t:"E",n:"EMPRENDIMIENTO DEMO (LINARES)",ll:[-71.60,-35.85],add:"2022-09",l:["ev"]},
  {id:"ar",t:"P",n:"ARTISTA DEMO (CAUQUENES)",ll:[-72.32,-35.97],add:"2023-01",l:["co","cl"]},
  {id:"co",t:"J",n:"CORTOMETRAJE DEMO",ll:[-72.0,-35.7],add:"2023-04",l:["rr","ar"]},
  {id:"b2",t:"B",n:"BANDA DEMO (CONSTITUCIÓN)",ll:[-72.42,-35.33],add:"2023-08",l:["su"]},
  {id:"su",t:"J",n:"SESIÓN EN VIVO DEMO",ll:[-72.05,-35.25],add:"2023-08",l:["b2","rr","l2"]},
  {id:"l2",t:"L",n:"LOCACIÓN DEMO (CORDILLERA)",ll:[-70.8,-35.45],add:"2024-02",l:["su"]},
  {id:"ma",t:"E",n:"MARCA DEMO (MOLINA)",ll:[-71.28,-35.12],add:"2024-06",l:["ct"]},
  {id:"ct",t:"J",n:"VIDEO CORPORATIVO DEMO",ll:[-71.50,-35.30],add:"2024-06",l:["rr","ma"]},
  {id:"cl",t:"C",n:"COLABORACIÓN DEMO (PARRAL)",ll:[-71.83,-36.14],add:"2025-01",l:["ar","cm"]},
  {id:"cm",t:"J",n:"PROYECTO NUEVO DEMO",ll:[-71.9,-35.9],add:"2025-05",l:["rr","cl"]}
];
var MAULE_OUTLINE = [[-72.35,-34.95],[-72.1,-34.72],[-71.5,-34.66],[-70.9,-34.7],[-70.4,-34.9],[-70.55,-35.3],[-70.45,-35.7],[-70.6,-36.05],[-70.9,-36.35],[-71.6,-36.45],[-72.2,-36.38],[-72.7,-36.05],[-72.62,-35.75],[-72.5,-35.35]];
var MENU = [["DESCUBRIR","discover"],["TRABAJOS","work"],["COMERCIAL","commercial"],["ARTÍSTICO","artistic"],["SENSACIÓN","mood"],["ARMA TU PROYECTO","build"],["REDROOM MAULE","maule"],["NOSOTROS","about"],["COLABORA","collaborate"],["CONTACTO","contact"]];
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
var CTA = '<a class="btn" href="build.html">SOLICITAR COTIZACIÓN</a>';

/* envio: hoy abre el correo (mailto). Cambia SOLO esta funcion para usar un servicio externo. */
function submitForm(subject, body) {
  location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

function card(p) {
  return '<a class="card rv" href="project.html?id=' + p.id + '" aria-label="' + esc(p.title) + '"><i' + (p.image ? ' style="background:url(' + esc(p.image) + ') center/cover"' : '') + '></i><span class="demo">' + (p.year === "DEMO" ? "DEMO" : esc(p.year)) + '</span><div><b>' + esc(p.title) + '</b><small>' + p.category + ' / ' + p.year + ' - ' + esc(p.description) + '</small></div></a>';
}
function chips(list, cur, attr) {
  return '<div class="chips" role="group">' + list.map(function (c) { return '<button class="btn' + (c === cur ? ' on' : '') + '" ' + attr + '="' + c + '">' + c + '</button>'; }).join("") + '</div>';
}
function section(h, t, extra) { return '<div class="wrap"><p class="tag">' + t + '</p><h2 class="rv">' + h + '</h2>' + (extra || "") + '</div>'; }
function service(items, cta) {
  return '<div class="wrap">' + items.map(function (s) {
    return '<hr class="line"><div class="two rv"><h2>' + s[0] + '</h2><div><p>' + s[1] + '</p><br>' + (cta ? CTA : '<a class="btn" href="collaborate.html">CREEMOS ALGO JUNTOS</a>') + '</div></div>';
  }).join("") + '</div>';
}

var PAGES = {
  discover: function () {
    return '<div class="wrap"><p class="tag">DESCUBRIR</p><h1 class="rv">NO SOLO GRABAMOS HISTORIAS.<br><span class="red">CONSTRUIMOS MUNDOS.</span></h1><hr class="line rv"></div>' +
      section('TRABAJOS DESTACADOS', 'EXPLORA', '<div class="grid">' + PROJECTS.slice(0, 4).map(card).join("") + '</div><br><a class="btn" href="work.html">VER TODO</a>') +
      '<div class="wrap"><hr class="line"><h2 class="rv">PRIMERO SIÉNTELO. DESPUÉS LO CONSTRUIMOS.</h2><br><a class="btn" href="mood.html">EXPLORAR POR SENSACIÓN</a> <a class="btn" href="build.html">EMPEZAR UN PROYECTO</a></div>';
  },
  work: function () {
    var cats = ["TODOS", "COMERCIAL", "MÚSICA", "CINE", "EN VIVO", "EXPERIMENTAL"];
    return section('TRABAJOS', 'PORTAFOLIO', chips(cats, "TODOS", "data-c") + '<div class="grid" id="g"></div><br><a class="btn" href="mood.html">O EXPLORA POR SENSACIÓN</a>');
  },
  mood: function () {
    return section('¿QUÉ QUIERES SENTIR?', 'BÚSQUEDA POR SENSACIÓN', chips(MOODS.map(function (m) { return m.toUpperCase(); }), "", "data-m") + '<div class="grid" id="g"></div><br>' + CTA);
  },
  commercial: function () {
    return '<div class="wrap"><p class="tag">COMERCIAL</p><h1 class="rv">RESULTADOS QUE SE VEN COMO CINE</h1></div>' + service([
      ["EVENTOS", "Cobertura audiovisual pensada para recordar la emoción del día."], ["MATRIMONIOS", "Una historia filmada con mirada cinematográfica."],
      ["CORPORATIVO", "Videos que muestran a tu empresa con claridad y estilo."], ["REDES SOCIALES", "Piezas cortas con identidad para redes."],
      ["PUBLICIDAD", "Conceptos y piezas para campañas."], ["CONTENIDO PARA MARCAS", "Contenido recurrente con una estética propia."]], true);
  },
  artistic: function () {
    return '<div class="wrap"><p class="tag">ARTÍSTICO</p><h1 class="rv">NUESTROS <span class="red">MUNDOS</span></h1><p>Proyectos propios y colaborativos.</p></div>' + service([
      ["CORTOMETRAJES", "Cortometrajes de autor."], ["VIDEOCLIPS", "Videoclips con identidad."], ["SESIONES EN VIVO", "Conciertos en vivo registrados como cine."],
      ["EXPERIMENTAL", "Exploración de imagen y sonido."], ["DOCUMENTAL / OTROS", "Otras formas de contar."]], false);
  },
  build: function () { return '<div class="wrap"><p class="tag">ARMA TU PROYECTO</p><div id="b"></div></div>'; },
  maule: function () {
    return '<div class="wrap"><p class="tag">REDROOM MAULE</p><h1 class="rv">LA RED <span class="red">VIVA</span></h1><p>Cada punto es una persona, banda, emprendimiento, locación o proyecto del Maule. Toca uno y mira con quién se conecta.</p><br><button class="btn" id="bn">CONSTRUIR LA RED</button><canvas id="net" class="net" role="img" aria-label="Red audiovisual del Maule: puntos rojos conectados por líneas"></canvas><div class="two" style="margin-top:1.5rem"><div aria-live="polite"><p class="tag">CONEXIÓN</p><p id="chain">Selecciona un punto para generar su constelación.</p></div><div><p class="tag" id="yr">LA RED HOY</p><div id="stats"></div></div></div><div class="chips" id="nlist" aria-label="Lista de puntos de la red"></div><p class="tag">DEMO: nodos de ejemplo. Cada proyecto realizado agrega una conexión nueva.</p><br>' + CTA + '</div>';
  },
  about: function () {
    return '<div class="wrap"><p class="tag">NOSOTROS</p><h1 class="rv">REDROOM</h1><p>Redroom nace desde una búsqueda cinematográfica y audiovisual de dos cineastas de la Universidad de Valparaíso.</p><div class="grid"><div class="card rv"><i></i><span class="demo">PLACEHOLDER</span><div><b>ANÍBAL CASTILLO</b><small>Cineasta. TODO: biografía real.</small></div></div><div class="card rv"><i></i><span class="demo">PLACEHOLDER</span><div><b>VÍCTOR QUEZADA</b><small>Cineasta. TODO: biografía real.</small></div></div></div><br>' + CTA + '</div>';
  },
  collaborate: function () {
    return '<div class="wrap"><p class="tag">COLABORA</p><h1 class="rv">CREEMOS <span class="red">ALGO JUNTOS</span></h1><p>MÚSICOS · ARTISTAS · CINEASTAS · ACTORES · DISEÑADORES · EMPRENDEDORES · MARCAS · PRODUCTORAS</p>' +
      fform("cf", [["Nombre", "name"], ["Tipo de proyecto", "type"], ["Instagram / redes", "social"], ["Descripción", "desc", 1], ["Qué buscas realizar", "goal", 1]], "ENVIAR") + '</div>';
  },
  contact: function () {
    return '<div class="wrap"><p class="tag">CONTACTO</p><h1 class="rv">REDROOM</h1><p><a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a> · <a href="' + CONFIG.instagram + '" rel="noopener">INSTAGRAM</a> · <a href="' + CONFIG.youtube + '" rel="noopener">YOUTUBE</a></p>' +
      fform("ct", [["Nombre", "name"], ["Correo", "email"], ["Mensaje", "msg", 1]], "EMPEZAR UN PROYECTO") + '<br><h2>NOS VEMOS EN LA SALA.</h2></div>';
  },
  project: function () {
    var id = new URLSearchParams(location.search).get("id");
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0] || PROJECTS[0];
    var modes = {"ENCUADRE": "Composición y encuadre.", "CÁMARA": "Cámara y lentes.", "LUZ": "Diseño de luz.", COLOR: "Color y look.", "MONTAJE": "Montaje y ritmo.", "DETRÁS DE CÁMARAS": "Detrás de cámaras."};
    return '<div class="wrap"><p class="tag">' + p.category + ' / ' + p.year + '</p><h1>' + esc(p.title) + '</h1><p>' + esc(p.description) + '</p><br><div class="card" style="aspect-ratio:16/8"><i></i><span class="demo">PLACEHOLDER</span></div><p class="tag" style="margin-top:2rem">MODO DIRECTOR</p>' +
      chips(Object.keys(modes), "ENCUADRE", "data-d") + '<div class="card" id="dm" style="aspect-ratio:16/7"><i></i><span class="demo">PLACEHOLDER</span><div><b id="dt">FRAME</b><small id="dd">' + modes.FRAME + ' TODO: contenido real.</small></div></div><br>' + CTA + ' <a class="btn" href="work.html">VOLVER A TRABAJOS</a></div>';
  }
};
function fform(id, fields, label) {
  return '<form id="' + id + '">' + fields.map(function (f) {
    return '<div><label for="' + id + f[1] + '">' + f[0].toUpperCase() + '</label>' + (f[2] ? '<textarea id="' + id + f[1] + '" name="' + f[0] + '" rows="4" required></textarea>' : '<input id="' + id + f[1] + '" name="' + f[0] + '" ' + (f[1] === "email" ? 'type="email"' : '') + ' required>') + '</div>';
  }).join("") + '<button class="btn" type="submit">' + label + '</button></form>';
}

var INIT = {
  work: function () { renderGrid(function (p, c) { return c === "TODOS" || p.category === c; }, "data-c", "TODOS"); },
  mood: function () { renderGrid(function (p, m) { return !m || p.mood.indexOf(m.toLowerCase()) > -1; }, "data-m", ""); },
  project: function () {
    $$("[data-d]").forEach(function (b) {
      b.onclick = function () {
        $$("[data-d]").forEach(function (x) { x.classList.toggle("on", x === b); });
        $("#dt").textContent = b.dataset.d; $("#dd").textContent = "TODO: contenido real de " + b.dataset.d + ".";
      };
    });
    $("[data-d]").classList.add("on");
  },
  maule: netInit,
  collaborate: function () { bindForm("cf", "Colaboración Redroom"); },
  contact: function () { bindForm("ct", "Contacto Redroom"); },
  build: buildFlow
};
function renderGrid(filter, attr, start) {
  var cur = start, g = $("#g");
  function draw() {
    var list = PROJECTS.filter(function (p) { return filter(p, cur); });
    g.innerHTML = list.length ? list.map(card).join("") : '<p>Sin proyectos para esta selección.</p>';
    $$(".rv", g).forEach(function (e) { setTimeout(function () { e.classList.add("in"); }, 30); });
    document.body.dataset.mood = cur;
  }
  $$("[" + attr + "]").forEach(function (b) {
    b.onclick = function () { cur = b.getAttribute(attr); $$("[" + attr + "]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(); };
  });
  draw();
}
function bindForm(id, subject) {
  $("#" + id).onsubmit = function (e) {
    e.preventDefault();
    var body = $$("input,textarea", this).map(function (i) { return i.name + ": " + i.value; }).join("\n");
    submitForm(subject, body);
  };
}

function buildFlow() {
  var steps = [
    {k: "TIPO DE PROYECTO", q: "¿QUÉ ESTÁS CREANDO?", o: ["VIDEO CORPORATIVO", "VIDEOCLIP", "EVENTO", "MATRIMONIO", "CORTOMETRAJE", "REDES SOCIALES", "SESIÓN EN VIVO", "OTRO"]},
    {k: "SENSACIÓN", q: "¿QUÉ QUIERES QUE SIENTA LA GENTE?", o: ["CINEMATOGRÁFICO", "EMOTIVO", "ENÉRGICO", "OSCURO", "CRUDO", "ELEGANTE", "EXPERIMENTAL"]},
    {k: "LUGAR", q: "¿DÓNDE?", o: ["TALCA", "MAULE", "VALPARAÍSO", "SANTIAGO", "OTRO"]},
    {k: "IDEA", q: "CUÉNTANOS TU IDEA", t: 1},
    {k: "CONTACTO", q: "DATOS DE CONTACTO", c: 1}
  ], i = 0, a = {}, root = $("#b");
  function show() {
    if (i >= steps.length) {
      var sum = Object.keys(a).map(function (k) { return k + ": " + a[k]; }).join("\n");
      root.innerHTML = '<h1>TU PROYECTO<br><span class="red">ESTÁ LISTO.</span></h1><pre class="sum">' + esc(sum) + '</pre><button class="btn" id="send">ENVIAR PROYECTO</button> <button class="btn" id="back">EDITAR</button>';
      $("#send").onclick = function () { submitForm("Solicitud de cotización Redroom", sum); };
      $("#back").onclick = function () { i = 0; show(); };
      return;
    }
    var s = steps[i], h = '<p class="tag">PASO ' + (i + 1) + ' / ' + steps.length + '</p><h1>' + s.q + '</h1>';
    if (s.o) { h += '<div class="opt">' + s.o.map(function (o) { return '<button class="btn' + (a[s.k] === o ? ' on' : '') + '" data-o="' + o + '">' + o + '</button>'; }).join("") + '</div>'; }
    else if (s.t) { h += '<form id="st"><textarea aria-label="Idea" id="v" rows="5">' + esc(a.IDEA || "") + '</textarea><button class="btn" type="submit">SIGUIENTE</button></form>'; }
    else { h += '<form id="st">' + [["Nombre", "n", 1], ["Correo", "e", 1], ["Teléfono", "p", 1], ["Instagram (opcional)", "i", 0]].map(function (f) { return '<div><label for="' + f[1] + '">' + f[0].toUpperCase() + '</label><input id="' + f[1] + '"' + (f[1] === "e" ? ' type="email"' : '') + (f[2] ? ' required' : '') + '></div>'; }).join("") + '<button class="btn" type="submit">TERMINAR</button></form>'; }
    h += i ? '<br><button class="btn" id="prev">ATRÁS</button>' : '';
    root.innerHTML = h;
    $$("[data-o]").forEach(function (b) { b.onclick = function () { a[s.k] = b.dataset.o; i++; show(); }; });
    var f = $("#st");
    if (f) { f.onsubmit = function (e) { e.preventDefault(); if (s.t) { a.IDEA = $("#v").value || "-"; } else { a.NOMBRE = $("#n").value; a.CORREO = $("#e").value; a.TELÉFONO = $("#p").value; a.INSTAGRAM = $("#i").value || "-"; } i++; show(); }; }
    if ($("#prev")) { $("#prev").onclick = function () { i--; show(); }; }
  }
  show();
}

function chrome() {
  var cur = document.body.dataset.page;
  document.body.insertAdjacentHTML("afterbegin",
    '<header class="top"><a href="index.html" aria-label="REDROOM, inicio">REDROOM</a><button id="mb" aria-expanded="false" aria-controls="menu">MENÚ</button></header>' +
    '<nav class="menu" id="menu" aria-label="Principal"><button class="x" id="mx">CERRAR</button>' + MENU.map(function (m) { return '<a href="' + m[1] + '.html"' + (m[1] === cur ? ' aria-current="page"' : '') + '>' + m[0] + '</a>'; }).join("") + '</nav>' +
    '<div class="stage" id="stage" role="dialog" aria-label="Modo experiencia Redroom"></div>' +
    '<button class="rbtn" id="rb" aria-label="Botón rojo: modo experiencia Redroom" title="EL BOTÓN ROJO"></button>');
  var m = $("#menu");
  function tog(o) { m.classList.toggle("open", o); $("#mb").setAttribute("aria-expanded", o); if (o) { $("#mx").focus(); } }
  $("#mb").onclick = function () { tog(true); }; $("#mx").onclick = function () { tog(false); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { tog(false); stopExp(); } });
  var timer;
  function stopExp() { clearInterval(timer); $("#stage").classList.remove("on"); document.body.classList.remove("exp"); if (document.fullscreenElement) { document.exitFullscreen(); } }
  $("#rb").onclick = function () { /* EXPERIENCE MODE: fullscreen + navegacion oculta + presentacion de proyectos (ESC sale) */
    var st = $("#stage"), n = 0;
    if (st.classList.contains("on")) { stopExp(); return; }
    document.body.classList.add("exp"); st.classList.add("on");
    if (document.documentElement.requestFullscreen) { document.documentElement.requestFullscreen().catch(function () {}); }
    function f() { var p = PROJECTS[n++ % PROJECTS.length]; st.innerHTML = '<div><p class="tag">' + p.category + ' · ' + p.year + '</p><h1>' + esc(p.title) + '</h1><p class="tag">ESC O EL BOTÓN ROJO PARA SALIR</p></div>'; }
    f(); timer = setInterval(f, 2800);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.dataset.page;
  if (page === "index") { return enterRoom(); }
  chrome();
  $("#app").innerHTML = PAGES[page]();
  if (INIT[page]) { INIT[page](); }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, {threshold: .15}) : null;
  $$(".rv").forEach(function (e) { io ? io.observe(e) : e.classList.add("in"); });
});

function enterRoom() {
  var h = $(".hero"), go = function () { h.classList.add("go"); setTimeout(function () { location.href = "discover.html"; }, 1100); };
  $("#enter").onclick = go;
  document.addEventListener("keydown", function (e) { if (e.key === "Enter") { go(); } });
  setTimeout(function () { $("#load").textContent = "LISTO"; $("#enter").hidden = false; $("#enter").focus(); }, 900);
}

/* INNOVACION: la CLAQUETA. Al terminar el formulario, tu proyecto se convierte en una claqueta de cine. */
function claqueta(a) {
  function c(l, v) { return '<div><small>' + l + '</small><b>' + esc(v || "-") + '</b></div>'; }
  return '<div class="slate"><div class="clap"></div><div class="sg">' + c("PROYECTO", a["TIPO DE PROYECTO"]) + c("SENSACIÓN", a["SENSACIÓN"]) + c("LUGAR", a["LUGAR"]) + c("PRODUCTORA", "REDROOM") + c("FECHA", new Date().toLocaleDateString("es-CL")) + c("TOMA", "1") + '</div></div>';
}
/* INNOVACION: el VISOR. En pantallas con mouse, un visor de cámara sigue el cursor y "encuadra" lo que miras. */
function viewfinder() {
  if (!window.matchMedia("(pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion:reduce)").matches) { return; }
  var v = document.createElement("div"); v.className = "vf"; v.setAttribute("aria-hidden", "true");
  v.innerHTML = '<i></i><i></i><i></i><i></i><span id="vft"></span>'; document.body.appendChild(v);
  var t0 = Date.now(), pad = function (n) { return (n < 10 ? "0" : "") + n; };
  document.addEventListener("mousemove", function (e) {
    var el = e.target.closest ? e.target.closest("a,button,.card") : null, r = el && el.getBoundingClientRect();
    v.classList.toggle("lock", !!el);
    if (el && !el.classList.contains("dot")) { v.style.cssText = "transform:translate(" + r.left + "px," + r.top + "px);width:" + r.width + "px;height:" + r.height + "px"; }
    else { v.style.cssText = "transform:translate(" + (e.clientX - 40) + "px," + (e.clientY - 28) + "px)"; }
  });
  setInterval(function () { var s = Math.floor((Date.now() - t0) / 1000); $("#vft").innerHTML = '<em>●</em> REC ' + pad(Math.floor(s / 60)) + ":" + pad(s % 60) + (v.classList.contains("lock") ? " · EN CUADRO" : ""); }, 250);
}
document.addEventListener("DOMContentLoaded", viewfinder);

/* ---- Red audiovisual viva (canvas) ---- */
function netInit() {
  var cv = $("#net"), c = cv.getContext("2d"), W = 0, H = 0, now = 0, sel = null, lev = {}, vis = {}, timer = null, building = false;
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches, byId = {}, E = [], seen = {};
  NET.forEach(function (n, i) { n.i = i; byId[n.id] = n; vis[n.id] = true; });
  NET.forEach(function (n) { n.l.forEach(function (o) { var k = [n.id, o].sort().join("-"); if (!seen[k] && byId[o]) { seen[k] = 1; E.push({a: n, b: byId[o], t0: null}); } }); });
  function size() { var d = window.devicePixelRatio || 1; W = cv.clientWidth; H = Math.round(W * 0.62); cv.style.height = H + "px"; cv.width = W * d; cv.height = H * d; c.setTransform(d, 0, 0, d, 0, 0); }
  function xy(ll, n) {
    var m = 30, t = reduce || !n ? 0 : now;
    return [m + (ll[0] + 72.9) / 2.7 * (W - 2 * m) + (n ? 6 * Math.sin(t / 1700 + n.i) : 0), m + (-34.6 - ll[1]) / 1.95 * (H - 2 * m) + (n ? 5 * Math.cos(t / 2100 + n.i * 1.7) : 0)];
  }
  function stats() {
    var cnt = {}, k, e = 0, h = "";
    NET.forEach(function (n) { if (vis[n.id]) { cnt[n.t] = (cnt[n.t] || 0) + 1; } });
    E.forEach(function (x) { if (vis[x.a.id] && vis[x.b.id] && (!building || x.t0 !== null)) { e++; } });
    for (k in NET_TYPES) { h += '<p><b class="red">' + (cnt[k] || 0) + '</b> ' + NET_TYPES[k] + '</p>'; }
    $("#stats").innerHTML = h + '<p><b class="red">' + e + '</b> CONEXIONES</p>';
  }
  function select(n) {
    sel = n; lev = {}; lev[n.id] = 0; var q = [n], lines = [], i;
    while (q.length) { var u = q.shift(); E.forEach(function (x) { var v = x.a === u ? x.b : (x.b === u ? x.a : null); if (v && vis[v.id] && lev[v.id] === undefined) { lev[v.id] = lev[u.id] + 1; q.push(v); } }); }
    E.forEach(function (x) { x.t0 = (lev[x.a.id] !== undefined && lev[x.b.id] !== undefined) ? now + Math.min(lev[x.a.id], lev[x.b.id]) * 450 : null; });
    NET.forEach(function (m) { if (lev[m.id] !== undefined) { (lines[lev[m.id]] = lines[lev[m.id]] || []).push(m.n); } });
    $("#chain").textContent = lines.map(function (l) { return l.join(" · "); }).join("  →  ");
    if (reduce) { draw(); }
  }
  function draw() {
    now = Date.now(); c.clearRect(0, 0, W, H);
    c.beginPath(); MAULE_OUTLINE.forEach(function (q, i) { var p = xy(q, null); i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.strokeStyle = "#1a1a1a"; c.lineWidth = 1; c.stroke();
    E.forEach(function (x) {
      if (x.t0 === null || !vis[x.a.id] || !vis[x.b.id]) { return; }
      var p = reduce ? 1 : Math.max(0, Math.min(1, (now - x.t0) / 450)); if (!p) { return; }
      var a = xy(x.a.ll, x.a), b = xy(x.b.ll, x.b);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p); c.strokeStyle = "rgba(225,6,0,.9)"; c.lineWidth = 1.5; c.stroke();
    });
    NET.forEach(function (n) {
      if (!vis[n.id]) { return; }
      var p = xy(n.ll, n), on = sel ? lev[n.id] !== undefined && now > (lev[n.id] * 450 + 300 - 450 * (lev[n.id] ? 0 : 1)) : true;
      c.globalAlpha = on ? 1 : .3; c.beginPath(); c.arc(p[0], p[1], n.t === "R" ? 9 : 5, 0, 7); c.fillStyle = "#e10600"; c.fill();
      if (n === sel || n.t === "R") { c.strokeStyle = "#f2f2f2"; c.lineWidth = 1.5; c.beginPath(); c.arc(p[0], p[1], n.t === "R" ? 14 : 11, 0, 7); c.stroke(); }
      if (sel && on && lev[n.id] !== undefined) { c.fillStyle = "#f2f2f2"; c.font = "11px monospace"; c.fillText(n.n, p[0] + 10, p[1] - 9); }
      c.globalAlpha = 1;
    });
  }
  function loop() { if (!document.hidden) { draw(); } requestAnimationFrame(loop); }
  function nearest(x, y) { var best = null, d = 24; NET.forEach(function (n) { if (vis[n.id]) { var p = xy(n.ll, n), k = Math.hypot(p[0] - x, p[1] - y); if (k < d) { d = k; best = n; } } }); return best; }
  cv.onclick = function (e) { var r = cv.getBoundingClientRect(), n = nearest(e.clientX - r.left, e.clientY - r.top); if (n) { select(n); } };
  $("#nlist").innerHTML = NET.map(function (n) { return '<button class="btn" data-n="' + n.id + '">' + esc(n.n) + '</button>'; }).join("");
  $$("[data-n]").forEach(function (b) { b.onclick = function () { if (vis[b.dataset.n]) { select(byId[b.dataset.n]); cv.scrollIntoView({block: "center", behavior: reduce ? "auto" : "smooth"}); } }; });
  $("#bn").onclick = function () {
    clearInterval(timer);
    if (building) { building = false; NET.forEach(function (n) { vis[n.id] = true; }); sel = null; E.forEach(function (x) { x.t0 = null; }); $("#bn").textContent = "CONSTRUIR LA RED"; $("#yr").textContent = "LA RED HOY"; $("#chain").textContent = "Selecciona un punto para generar su constelación."; stats(); return; }
    building = true; sel = null; NET.forEach(function (n) { vis[n.id] = false; }); E.forEach(function (x) { x.t0 = null; });
    var order = NET.slice().sort(function (a, b) { return a.add < b.add ? -1 : 1; }), i = 0;
    $("#bn").textContent = "VOLVER A EXPLORAR";
    function step() {
      if (i >= order.length) { clearInterval(timer); $("#chain").textContent = "La red completa: así ha crecido Redroom en el Maule."; return; }
      var n = order[i++]; vis[n.id] = true; $("#yr").textContent = "CRECIMIENTO · " + n.add;
      E.forEach(function (x) { if (x.t0 === null && vis[x.a.id] && vis[x.b.id]) { x.t0 = Date.now(); } });
      stats();
    }
    if (reduce) { while (i < order.length) { step(); } draw(); } else { step(); timer = setInterval(step, 800); }
  };
  window.addEventListener("resize", function () { size(); if (reduce) { draw(); } });
  size(); stats(); E.forEach(function (x) { x.t0 = null; });
  if (reduce) { draw(); } else { loop(); }
}
