/* ================= CONFIG — edit paths & PIN here in VS Code ================= */
const CONFIG = {
  PIN: "2000", // <-- set to her birth year (4 digits)

  // low-opacity background collage — add as many image paths as you like
  collagePhotos: [
    "./collage/1.jpg",
    "./collage/2.JPG",
    "./collage/3.JPG",
    "./collage/4 .jpg",
    "./collage/5.jpg",
    "./collage/6.jpg",
    "./collage/7.jpg",
    "./collage/8.jpg",
const branchesLayer = document.getElementById("branchesLayer");

// builds a tapered, curved "ribbon" shape between two points (like a real branch silhouette)
// shiftFrac / widthScale let us also draw a slimmer, offset highlight streak on the same curve
function branchPath(
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  w1,
  w2,
  shiftFrac = 0,
  widthScale = 1,
) {
  const dxs = cx - x1,
    dys = cy - y1,
    lens = Math.hypot(dxs, dys) || 1,
    pxs = -dys / lens,
    pys = dxs / lens;
  const dxe = x2 - cx,
    dye = y2 - cy,
    lene = Math.hypot(dxe, dye) || 1,
    pxe = -dye / lene,
    pye = dxe / lene;
  const hw1 = (w1 * widthScale) / 2,
    hw2 = (w2 * widthScale) / 2;
  const shift1 = w1 * shiftFrac,
    shift2 = w2 * shiftFrac;
  const sx1 = x1 + pxs * shift1,
    sy1 = y1 + pys * shift1;
  const scx = cx + pxs * shift1,
    scy = cy + pys * shift1;
  const sx2 = x2 + pxe * shift2,
    sy2 = y2 + pye * shift2;
  const topStart = [sx1 + pxs * hw1, sy1 + pys * hw1],
    botStart = [sx1 - pxs * hw1, sy1 - pys * hw1];
  const topEnd = [sx2 + pxe * hw2, sy2 + pye * hw2],
    botEnd = [sx2 - pxe * hw2, sy2 - pye * hw2];
  const topCtrl = [scx + pxs * hw1, scy + pys * hw1],
    botCtrl = [scx - pxs * hw1, scy - pys * hw1];
  const f = (n) => n.toFixed(1);
  return (
    `M${f(topStart[0])},${f(topStart[1])} Q${f(topCtrl[0])},${f(topCtrl[1])} ${f(topEnd[0])},${f(topEnd[1])} ` +
    `L${f(botEnd[0])},${f(botEnd[1])} Q${f(botCtrl[0])},${f(botCtrl[1])} ${f(botStart[0])},${f(botStart[1])} Z`
  );
}
function addBranchShape(b) {
  const main = document.createElementNS(svgNS, "path");
  main.setAttribute(
    "d",
    branchPath(b.x1, b.y1, b.cx, b.cy, b.x2, b.y2, b.w1, b.w2, 0, 1),
  );
  main.setAttribute("fill", b.color);
  branchesLayer.appendChild(main);
  const hi = document.createElementNS(svgNS, "path");
  hi.setAttribute(
    "d",
    branchPath(b.x1, b.y1, b.cx, b.cy, b.x2, b.y2, b.w1, b.w2, 0.3, 0.32),
  );
  hi.setAttribute("fill", "#FF5A36");
  hi.setAttribute("opacity", "0.55");
  branchesLayer.appendChild(hi);
}

// two main limbs off the trunk
const limbs = [
  {
    x1: 400,
    y1: 650,
    cx: 340,
    cy: 600,
    x2: 260,
    y2: 540,
    w1: 34,
    w2: 22,
    color: "#5C1E12",
  },
  {
    x1: 400,
    y1: 650,
    cx: 460,
    cy: 600,
    x2: 540,
    y2: 540,
    w1: 34,
    w2: 22,
    color: "#5C1E12",
  },
];
// secondary branches off each limb (3 off the left, 2 off the right)
const secondaries = [
  {
    x1: 260,
    y1: 540,
    cx: 180,
    cy: 470,
    x2: 120,
    y2: 430,
    w1: 20,
    w2: 12,
    color: "#722816",
  },
  {
    x1: 260,
    y1: 540,
    cx: 220,
    cy: 420,
    x2: 190,
    y2: 340,
    w1: 20,
    w2: 12,
    color: "#722816",
  },
  {
    x1: 260,
    y1: 540,
    cx: 300,
    cy: 430,
    x2: 330,
    y2: 340,
    w1: 20,
    w2: 12,
    color: "#722816",
  },
  {
    x1: 540,
    y1: 540,
    cx: 620,
    cy: 470,
    x2: 680,
    y2: 430,
    w1: 20,
    w2: 12,
    color: "#722816",
  },
  {
    x1: 540,
    y1: 540,
    cx: 560,
    cy: 420,
    x2: 600,
    y2: 320,
    w1: 20,
    w2: 12,
    color: "#722816",
  },
];
// two final twig tips off each secondary = 10 total, clickable photo spots
const tips = [
  {
    x1: 120,
    y1: 430,
    cx: 80,
    cy: 390,
    x2: 60,
    y2: 360,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 120,
    y1: 430,
    cx: 90,
    cy: 470,
    x2: 60,
    y2: 500,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 190,
    y1: 340,
    cx: 150,
    cy: 280,
    x2: 120,
    y2: 220,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 190,
    y1: 340,
    cx: 210,
    cy: 265,
    x2: 210,
    y2: 180,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 330,
    y1: 340,
    cx: 300,
    cy: 265,
    x2: 280,
    y2: 190,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 330,
    y1: 340,
    cx: 365,
    cy: 270,
    x2: 395,
    y2: 210,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 680,
    y1: 430,
    cx: 720,
    cy: 390,
    x2: 750,
    y2: 360,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 680,
    y1: 430,
    cx: 710,
    cy: 470,
    x2: 750,
    y2: 500,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 600,
    y1: 320,
    cx: 560,
    cy: 255,
    x2: 530,
    y2: 190,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
  {
    x1: 600,
    y1: 320,
    cx: 645,
    cy: 260,
    x2: 680,
    y2: 200,
    w1: 10,
    w2: 4,
    color: "#9C3A1E",
  },
];
// small root tendrils spreading along the ground
const roots = [
  {
    x1: 375,
    y1: 895,
    cx: 320,
    cy: 878,
    x2: 265,
    y2: 866,
    w1: 9,
    w2: 2,
    color: "#4A160E",
  },
  {
    x1: 425,
    y1: 895,
    cx: 480,
    cy: 878,
    x2: 535,
    y2: 866,
    w1: 9,
    w2: 2,
    color: "#4A160E",
  },
  {
    x1: 392,
    y1: 898,
    cx: 345,
    cy: 902,
    x2: 300,
    y2: 898,
    w1: 6,
    w2: 2,
    color: "#4A160E",
  },
  {
    x1: 408,
    y1: 898,
    cx: 455,
    cy: 902,
    x2: 500,
    y2: 898,
    w1: 6,
    w2: 2,
    color: "#4A160E",
  },
];
[...roots, ...limbs, ...secondaries, ...tips].forEach(addBranchShape);

// small spiked twigs at each of the 10 tips, like the reference image
tips.forEach((t) => {
  const ux = t.x2 - t.cx,
    uy = t.y2 - t.cy,
    len = Math.hypot(ux, uy) || 1;
  const dx = ux / len,
    dy = uy / len,
    px = -dy,
    py = dx;
  [-1, 1].forEach((s) => {
    const mx = t.x2 + dx * 13 + px * s * 6,
      my = t.y2 + dy * 13 + py * s * 6;
    const ex = t.x2 + dx * 24 + px * s * 15,
      ey = t.y2 + dy * 24 + py * s * 15;
    const spike = document.createElementNS(svgNS, "path");
    spike.setAttribute(
      "d",
      `M${t.x2.toFixed(1)},${t.y2.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`,
    );
    spike.setAttribute("stroke", "#9C3A1E");
    spike.setAttribute("stroke-width", "2.3");
    spike.setAttribute("fill", "none");
    spike.setAttribute("stroke-linecap", "round");
    branchesLayer.appendChild(spike);
  });
});

// the 10 tip endpoints become the clickable photo positions
const branchPositions = tips.map((t) => [
  Math.max(3, Math.min(97, (t.x2 / 800) * 100)),
  Math.max(3, Math.min(97, (t.y2 / 900) * 100)),
]);

/* Happy Birthday in different languages, cycled at the top */
const languages = [
  "Happy Birthday",
  "¡Feliz Cumpleaños!",
  "Joyeux Anniversaire!",
  "お誕生日おめでとう",
  "생일 축하해요",
  "Buon Compleanno!",
  "Alles Gute zum Geburtstag!",
  "जन्मदिन मुबारक हो",
  "Feliz Aniversário!",
  "عيد ميلاد سعيد",
];

/* ================= LOCK SCREEN ================= */
const pinInput = document.getElementById("pinInput");
const wrongZone = document.getElementById("wrongZone");
const snoopy = document.getElementById("snoopySad");
snoopy.addEventListener("error", () => {
  snoopy.outerHTML = '<div id="snoopySad" class="fallback">🐾😢</div>';
});

document.getElementById("pinSubmit").addEventListener("click", checkPin);
pinInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPin();
});

function checkPin() {
  if (pinInput.value.trim() === CONFIG.PIN) {
    document.getElementById("lockScreen").classList.add("hide");
    document.body.classList.remove("locked");
  } else {
    wrongZone.classList.add("show");
    const cloud = document.getElementById("cloudText");
    cloud.style.animation = "none";
    void cloud.offsetWidth;
    cloud.style.animation =
      "cloudPop .5s ease, cloudFloat 2.5s ease-in-out infinite 0.5s";
    snoopy.style.animation = "none";
    void snoopy.offsetWidth;
    snoopy.style.animation = "shake .5s";
    pinInput.value = "";
  }
}

/* ================= LANGUAGE CYCLE ================= */
let langIndex = 0;
const langEl = document.getElementById("langCycle");
setInterval(() => {
  langIndex = (langIndex + 1) % languages.length;
  langEl.style.transition = "opacity .4s";
  langEl.style.opacity = 0;
  setTimeout(() => {
    langEl.textContent = languages[langIndex];
    langEl.style.opacity = 1;
  }, 400);
}, 2600);

/* ================= TOP COLLAGE STRIP ================= */
const collageStrip = document.getElementById("collageStrip");
CONFIG.collagePhotos.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.onerror = () => {
    img.outerHTML = '<div class="ph"></div>';
  };
  collageStrip.appendChild(img);
});

/* ================= SAKURA ================= */
const sakuraLayer = document.getElementById("sakuraLayer");
for (let i = 0; i < 32; i++) {
  const s = document.createElement("div");
  s.className = "sakura";
  const size = 9 + Math.random() * 9;
  s.style.width = size + "px";
  s.style.height = size + "px";
  s.style.left = Math.random() * 100 + "vw";
  s.style.transform = `rotate(${Math.random() * 360}deg)`;
  s.style.animationDuration =
    9 + Math.random() * 8 + "s, " + (3 + Math.random() * 2) + "s";
  s.style.animationDelay = Math.random() * 12 + "s, 0s";
  s.style.opacity = 0.5 + Math.random() * 0.4;
  sakuraLayer.appendChild(s);
}

/* ================= TREE PHOTOS ================= */
const branchContainer = document.getElementById("branchPhotos");
CONFIG.treePhotos.forEach((item, i) => {
  const pos = branchPositions[i] || [50, 50];
  const btn = document.createElement("div");
  btn.className = "branch-photo";
  btn.style.left = pos[0] + "%";
  btn.style.top = pos[1] + "%";
  const img = document.createElement("img");
  img.src = item.src;
  img.onerror = () => {
    img.remove();
  };
  btn.appendChild(img);
  btn.addEventListener("click", () => openZoom(item, btn));
  branchContainer.appendChild(btn);
});

const zoomOverlay = document.getElementById("zoomOverlay");
const zoomPhotoPanel = document.querySelector(".zoom-photo");

function closeZoom() {
  zoomOverlay.classList.remove("show");
}
document.getElementById("closeZoom").addEventListener("click", closeZoom);
zoomPhotoPanel.addEventListener("dblclick", closeZoom);

function openZoom(item, sourceEl) {
  const r = sourceEl.getBoundingClientRect();
  const originX = (((r.left + r.width / 2) / window.innerWidth) * 100).toFixed(
    1,
  );
  const originY = (((r.top + r.height / 2) / window.innerHeight) * 100).toFixed(
    1,
  );
  zoomOverlay.style.transformOrigin = `${originX}% ${originY}%`;

  const zoomImg = document.getElementById("zoomImg");
  const zoomWish = document.getElementById("zoomWish");
  zoomImg.src = item.src;
  zoomWish.textContent = item.wish;
  zoomImg.classList.remove("kenburns");
  void zoomImg.offsetWidth;

  // the whole frame scales up from the exact spot that was clicked —
  // no popup card, no backdrop, just the page itself zooming into the photo
  requestAnimationFrame(() => {
    zoomOverlay.classList.add("show");
    zoomImg.classList.add("kenburns");
  });
}

/* ================= CANDLES ================= */
const candleRow = document.getElementById("candleRow");
const totalCandles = 6;
let litCount = totalCandles;
for (let i = 0; i < totalCandles; i++) {
  const c = document.createElement("div");
  c.className = "candle";
  c.innerHTML = '<span class="flame">🔥</span>';
  c.addEventListener("click", () => {
    if (c.classList.contains("out")) return;
    c.classList.add("out");
    litCount--;
    if (litCount === 0) {
      document.getElementById("wishMsg").classList.add("show");
    }
  });
  candleRow.appendChild(c);
}

/* ================= 3D SCROLL TILT ================= */
const tiltEls = document.querySelectorAll(".tilt");
function updateTilt() {
  const vh = window.innerHeight;
  tiltEls.forEach((el) => {
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const dist = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
    const rotate = dist * -20;
    const tz = -Math.abs(dist) * 220;
    const scale = 1 - Math.abs(dist) * 0.18;
    const blur = Math.abs(dist) * 4;
    const opacity = 1 - Math.abs(dist) * 0.55;
    el.style.transform = `rotateX(${rotate}deg) translateZ(${tz}px) scale(${scale})`;
    el.style.filter = `blur(${blur}px)`;
    el.style.opacity = opacity;
  });
  requestAnimationFrame(updateTilt);
}
requestAnimationFrame(updateTilt);
