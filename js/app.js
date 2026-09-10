const appData = {
  dashboard: {
    title: "Dashboard Microlearning",
    tag: "Dashboard",
    description: "Monitorea tu proceso y haz follow up de tus Microlearnings en tiempo real.",
    url: "https://calm-bush-092a1f210.7.azurestaticapps.net/",
    image: "assets/videos/dashboard-microlearning.mp4",
    mediaType: "video",
    accent1: "#8BD2F8",
    accent2: "#00558C",
    status: "Disponible",
    users: "Dashboard activo",
    update: "Actualizado hoy",
    features: ["Seguimiento en tiempo real", "Indicadores LMS", "Resultados y monitoreo"]
  },
  microlearning: {
    title: "Microlearning Builder",
    tag: "Builder",
    description: "Crea tus Microlearnings de forma fácil y rápida con ayuda de la IA.",
    url: "https://microlearningbuilder-hah4augrd6hma0dv.mexicocentral-01.azurewebsites.net/",
    image: "assets/videos/microlearning-builder.mp4",
    mediaType: "video",
    accent1: "#EFA27F",
    accent2: "#8BD2F8",
    status: "Disponible",
    users: "Builder activo",
    update: "Actualizado hoy",
    features: ["Creación con IA", "Edición por slides", "Exportación rápida"]
  },
  roomsync: {
    title: "Roomsync",
    tag: "Reservas",
    description: "Revisa qué salas de capacitación se encuentran disponibles en tiempo real.",
    url: "https://happy-pond-0d0eafd10.7.azurestaticapps.net/",
    image: "assets/videos/roomsync.mp4",
    mediaType: "video",
    accent1: "#00A79D",
    accent2: "#8BD2F8",
    status: "Disponible",
    users: "Salas activas",
    update: "Actualizado hoy",
    features: ["Disponibilidad en tiempo real", "Plano de salas", "Control de reservaciones"]
  },
  cursos: {
    title: "Dashboard Desarrollo",
    tag: "Dashboard",
    description: "Conoce el estatus de las tareas y proyectos del equipo de Desarrollo.",
    url: "https://orange-bush-08c1a4010.7.azurestaticapps.net/",
    image: "assets/videos/dashboard-desarrollo.mp4",
    mediaType: "video",
    accent1: "#8BD2F8",
    accent2: "#EFA27F",
    status: "Disponible",
    users: "Dashboard activo",
    update: "Actualizado hoy",
    features: ["Estatus de tareas", "Seguimiento de proyectos", "Vista del equipo"]
  },
  reportes: {
    title: "Atento Reels",
    tag: "Reels",
    description: "Entra a nuestra plataforma VOD y conoce el material que tenemos para ti.",
    url: "https://polite-pebble-051474810.6.azurestaticapps.net/",
    image: "assets/videos/atento-reels.mp4",
    mediaType: "video",
    accent1: "#8BD2F8",
    accent2: "#00A79D",
    status: "Disponible",
    users: "Contenido VOD",
    update: "Actualizado hoy",
    features: ["Plataforma VOD", "Material disponible", "Acceso rápido"]
  },
  simuladores: {
    title: "Atento Space",
    tag: "Space",
    description: "Explora el Metaverso de Atento y aprende con tus compañeros de una forma didáctica y divertida.",
    url: "https://thankful-pond-0dfa40210.6.azurestaticapps.net/",
    image: "assets/videos/atento-space.mp4",
    mediaType: "video",
    accent1: "#00A79D",
    accent2: "#00558C",
    status: "Disponible",
    users: "Experiencia inmersiva",
    update: "Actualizado hoy",
    features: ["Metaverso Atento", "Aprendizaje inmersivo", "Interacción didáctica"]
  }
};


const body = document.body;
const root = document.documentElement;
const viewport = document.getElementById("viewport");
const previewOverlay = document.getElementById("previewOverlay");
const previewBack = document.getElementById("previewBack");
const previewTag = document.getElementById("previewTag");
const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewLink = document.getElementById("previewLink");
const previewWindowTitle = document.getElementById("previewWindowTitle");
const previewStatus = document.getElementById("previewStatus");
const previewUsers = document.getElementById("previewUsers");
const previewUpdate = document.getElementById("previewUpdate");
const previewFeatures = document.getElementById("previewFeatures");
const previewWindow = document.getElementById("previewWindow");
const previewImage = document.getElementById("previewImage");
const previewVideo = document.getElementById("previewVideo");
const introSequence = document.getElementById("introSequence");
const systems = [...document.querySelectorAll(".system")];

// Apps externas
const externalApps = {
  desarrollo: "https://orange-bush-08c1a4010.7.azurestaticapps.net/",
  reels: "https://polite-pebble-051474810.6.azurestaticapps.net/",
  space: "https://thankful-pond-0dfa40210.6.azurestaticapps.net/"
};

let activeSystemId = null;
let previewTimer = null;
let parallaxEnabled = window.innerWidth > 900;
let lastParallaxFrame = 0;


function startIntro(){
  if (window.__NEXUS_STARTED__) return;
  window.__NEXUS_STARTED__ = true;
  if (window.__NEXUS_LOCK__) return;
  window.__NEXUS_LOCK__ = true;

  const intro = document.getElementById("introSequence");
  const title = intro?.querySelector(".intro-title-wrap");

  if (!intro || !title) {
    document.body.className = "revealed";
    return;
  }

  // Freeze everything until the only intro animation finishes.
  document.body.className = "is-intro";

  title.style.opacity = "1";
  title.style.transform = "scale(1)";

  const anim = title.animate(
    [
      { opacity: 1, transform: "scale(1)" },
      { opacity: 1, transform: "scale(1.08)", offset: .55 },
      { opacity: 0, transform: "scale(2.4)" }
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(.12,.86,.08,1)",
      fill: "forwards"
    }
  );

  anim.finished.then(() => {
    if (intro.dataset.finished === "true") return;
    intro.dataset.finished = "true";
    intro.remove();
    document.body.className = "revealed";
  });
}


function updatePreview(data, id){
  previewTag.textContent = data.tag;
  previewTitle.textContent = data.title;
  previewDescription.textContent = data.description;
  previewLink.href = data.url;
  previewWindowTitle.textContent = data.title;
  previewStatus.textContent = data.status;
  previewUsers.textContent = data.users;
  previewUpdate.textContent = data.update;

  if (previewFeatures) {
    previewFeatures.innerHTML = (data.features || []).map(item => `<li>${item}</li>`).join("");
  }

  if (previewVideo && previewImage) {
    const type = data.mediaType || (String(data.image).match(/\.(mp4|webm|ogg)$/i) ? "video" : "image");

    if (type === "video") {
      previewImage.classList.add("is-hidden");
      previewVideo.classList.remove("is-hidden");
      previewVideo.src = data.image;
      previewVideo.setAttribute("aria-label", `Vista previa en video de ${data.title}`);
      previewVideo.muted = true;
      previewVideo.loop = true;
      previewVideo.autoplay = true;
      previewVideo.playsInline = true;
      previewVideo.load();
      const playAttempt = previewVideo.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    } else {
      previewVideo.pause();
      previewVideo.removeAttribute("src");
      previewVideo.load();
      previewVideo.classList.add("is-hidden");

      previewImage.classList.remove("is-hidden");
      previewImage.src = data.image;
      previewImage.alt = `Vista previa de ${data.title}`;
    }
  }

  previewWindow.className = "hologram-window";
  previewWindow.classList.add(`preview-${id}`);

  root.style.setProperty("--preview-accent", data.accent1);
  root.style.setProperty("--preview-accent-2", data.accent2);
}

function getScaleForScreen(){
  if (window.innerWidth <= 620) return 2.45;
  if (window.innerWidth <= 820) return 2.75;
  return 2.95;
}

function focusSystem(system){
  const id = system.dataset.id;
  const data = appData[id];
  if(!data) return;

  if (previewTimer) clearTimeout(previewTimer);
  activeSystemId = id;
  systems.forEach(item => item.classList.toggle("is-active", item === system));
  updatePreview(data, id);

  const viewportRect = viewport.getBoundingClientRect();
  const systemRect = system.getBoundingClientRect();
  const systemCenterX = systemRect.left + systemRect.width / 2;
  const systemCenterY = systemRect.top + systemRect.height / 2;

  const targetX = viewportRect.width * 0.5;
  const targetY = viewportRect.height * 0.5;
  const dx = targetX - systemCenterX;
  const dy = targetY - systemCenterY;

  root.style.setProperty("--scene-x", `${dx}px`);
  root.style.setProperty("--scene-y", `${dy}px`);
  root.style.setProperty("--scene-scale", `${getScaleForScreen()}`);

  body.classList.add("focused");
  previewTimer = setTimeout(() => {
    previewOverlay.classList.add("visible");
  }, 240);
}

function resetUniverse(){
  if (previewTimer) clearTimeout(previewTimer);
  activeSystemId = null;
  systems.forEach(item => item.classList.remove("is-active"));
  root.style.setProperty("--scene-x", "0px");
  root.style.setProperty("--scene-y", "0px");
  root.style.setProperty("--scene-scale", "1");
  body.classList.remove("focused");
  previewOverlay.classList.remove("visible");
  if (previewVideo) {
    previewVideo.pause();
  }
}

systems.forEach(system => {
  const button = system.querySelector(".system-button");
  button.addEventListener("click", () => focusSystem(system));

  system.addEventListener("keydown", (event) => {
    if(event.key === "Enter" || event.key === " "){
      event.preventDefault();
      focusSystem(system);
    }
  });
});

previewBack.addEventListener("click", resetUniverse);

document.addEventListener("keydown", (event) => {
  if(event.key === "Escape" && body.classList.contains("focused")){
    resetUniverse();
  }
});

window.addEventListener("resize", () => {
  parallaxEnabled = window.innerWidth > 900;

  if(activeSystemId){
    const active = document.querySelector(`.system[data-id="${activeSystemId}"]`);
    if(active) focusSystem(active);
  }
});

window.addEventListener("mousemove", (event) => {
  if (!parallaxEnabled || !body.classList.contains("revealed")) return;

  const now = performance.now();
  if (now - lastParallaxFrame < 18) return;
  lastParallaxFrame = now;

  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;
  root.style.setProperty("--parallax-x", `${x}px`);
  root.style.setProperty("--parallax-y", `${y}px`);
}, { passive: true });

startIntro();
