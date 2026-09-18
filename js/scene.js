/* ============================================================
   scene.js — the 3D palm-leaf manuscript figure (Three.js):
   sculpted body, loka ornament bands, camera flights, markers.
   ============================================================ */
(function () {
'use strict';
if (typeof THREE === 'undefined') {
  var fb0 = document.getElementById('fallback');
  if (fb0) fb0.hidden = false;
  return;
}
var Loka = window.Loka;
var SPOTS = Loka.SPOTS;
var SPOT_BY_ID = {};
SPOTS.forEach(function (s) { SPOT_BY_ID[s.id] = s; });
var container = document.getElementById('scene');
var markersEl = document.getElementById('markers');
var I18N = Loka.I18N;

/* ============================================================
   Three.js — the palm-leaf manuscript figure
   ============================================================ */
var scene, camera, renderer, controls;
try {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
} catch (e) {
  var fb1 = document.getElementById('fallback');
  if (fb1) fb1.hidden = false;
  return;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.05, 120);
camera.position.set(9.0, 3.0, 20.0);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, -0.75, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 0.6;
controls.maxDistance = 45;
controls.autoRotateSpeed = 0.45;
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) controls.autoRotate = true;

scene.add(new THREE.HemisphereLight(0xfff3da, 0xd9b98a, 0.7));
var sunLight = new THREE.DirectionalLight(0xfff0d0, 0.9);
sunLight.position.set(6, 9, 7);
scene.add(sunLight);
var rim = new THREE.DirectionalLight(0xe8c890, 0.35);
rim.position.set(-7, 3, -5);
scene.add(rim);

/* ---------- toon (hand-painted) shading ---------- */
var gradData = new Uint8Array([70, 150, 255]);
var gradMap = new THREE.DataTexture(gradData, 3, 1, THREE.LuminanceFormat);
gradMap.minFilter = THREE.NearestFilter;
gradMap.magFilter = THREE.NearestFilter;
gradMap.needsUpdate = true;
function toonMat(color) {
  return new THREE.MeshToonMaterial({ color: color, gradientMap: gradMap });
}
var INK = new THREE.MeshBasicMaterial({ color: 0x2b1a0c, side: THREE.BackSide });
function addOutline(mesh, sx, sy, sz) {
  var o = new THREE.Mesh(mesh.geometry, INK);
  o.scale.set(sx || 1.03, sy || 1.006, sz || 1.03);
  mesh.add(o);
  return o;
}
var GOLD = new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.3, metalness: 0.6 });
var GOLD_GLOW = new THREE.MeshBasicMaterial({ color: 0xffe9b0 });

var loka = new THREE.Group();
scene.add(loka);

/* ---------- body profile (r, y) — feet to neck ---------- */
var PROFILE = [
  [0.00, -7.25], [0.30, -7.25], [0.27, -7.05], [0.30, -6.90],
  [0.38, -6.20], [0.42, -5.40], [0.44, -4.75], [0.52, -4.35],
  [0.60, -3.60], [0.68, -2.90], [0.74, -2.30], [0.78, -1.90],
  [0.72, -1.60], [0.64, -1.30], [0.68, -0.95], [0.78, -0.50],
  [0.90, 0.10], [1.00, 0.70], [1.04, 1.20], [0.98, 1.75],
  [0.88, 2.25], [0.78, 2.60], [0.55, 2.85], [0.30, 3.05],
  [0.24, 3.25], [0.22, 3.55], [0.27, 3.85]
];
function radiusAt(y) {
  for (var i = 0; i < PROFILE.length - 1; i++) {
    var a = PROFILE[i], b = PROFILE[i + 1];
    if (y >= a[1] && y <= b[1]) {
      var k = (y - a[1]) / (b[1] - a[1] || 1);
      return a[0] + (b[0] - a[0]) * k;
    }
  }
  return y < PROFILE[0][1] ? PROFILE[0][0] : PROFILE[PROFILE.length - 1][0];
}

var body = new THREE.Group();   /* elliptical cross-section group */
body.scale.z = 0.62;
loka.add(body);

var lathePts = PROFILE.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
var bodyMesh = new THREE.Mesh(new THREE.LatheGeometry(lathePts, 56), toonMat(0xcfa871));
body.add(bodyMesh);
addOutline(bodyMesh, 1.025, 1.004, 1.025);

/* feet */
[-0.18, 0.18].forEach(function (fx) {
  var foot = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.13, 0.52), toonMat(0xc49a63));
  foot.position.set(fx, -7.16, 0.10);
  body.add(foot);
  addOutline(foot, 1.05, 1.06, 1.04);
});

/* head + neck cap + face */
var head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 40, 28), toonMat(0xcfa871));
head.scale.set(1, 1.18, 0.85);
head.position.y = 4.35;
loka.add(head);
addOutline(head, 1.03, 1.015, 1.03);
/* serene closed eyes */
[-0.16, 0.16].forEach(function (ex) {
  var eye = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.0055, 6, 20, Math.PI * 0.75), new THREE.MeshBasicMaterial({ color: 0x3a2410 }));
  eye.position.set(ex, 4.44, 0.375);
  eye.rotation.z = Math.PI * 0.625;
  loka.add(eye);
});
/* tilak */
var tilak = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.11, 0.012), GOLD_GLOW);
tilak.position.set(0, 4.63, 0.385);
tilak.rotation.x = -0.12;
loka.add(tilak);
/* gold circlet (Anuttara) */
(function () {
  var g = new THREE.Group();
  var c = new THREE.Mesh(new THREE.TorusGeometry(0.375, 0.014, 8, 64), GOLD);
  c.rotation.x = Math.PI / 2;
  g.add(c);
  g.position.y = 4.74;
  g.scale.set(1, 1, 0.85);
  loka.add(g);
})();
/* Sarvarthasiddha crown dome */
var crown = new THREE.Mesh(new THREE.SphereGeometry(0.17, 32, 18), GOLD);
crown.scale.set(1, 0.72, 0.85);
crown.position.y = 5.04;
loka.add(crown);

/* ---------- arms akimbo ---------- */
function limb(p1, p2, p3, r) {
  var curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(p1[0], p1[1], p1[2]),
    new THREE.Vector3(p2[0], p2[1], p2[2]),
    new THREE.Vector3(p3[0], p3[1], p3[2])
  ]);
  var m = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, r, 12), toonMat(0xc49a63));
  addOutline(m, 1.06, 1.06, 1.06);
  return m;
}
function joint(x, y, z, r) {
  var m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), toonMat(0xc49a63));
  m.position.set(x, y, z);
  addOutline(m, 1.05, 1.05, 1.05);
  return m;
}
[1, -1].forEach(function (side) {
  var S = side;
  loka.add(joint(S * 0.66, 2.55, 0.02, 0.23));                        /* shoulder */
  loka.add(limb([S * 0.78, 2.45, 0.02], [S * 1.34, 1.9, 0.09], [S * 1.52, 1.32, 0.12], 0.155));  /* upper arm */
  loka.add(joint(S * 1.52, 1.32, 0.12, 0.14));                         /* elbow */
  loka.add(limb([S * 1.52, 1.32, 0.12], [S * 1.14, 0.05, 0.18], [S * 0.75, -1.2, 0.2], 0.13));  /* forearm */
  loka.add(joint(S * 0.75, -1.2, 0.2, 0.10));                          /* hand on hip */
});
/* smooth neck-to-shoulder transition */
(function () {
  var cl = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), toonMat(0xcfa871));
  cl.scale.set(1.45, 0.5, 0.8);
  cl.position.y = 2.85;
  body.add(cl);
  addOutline(cl, 1.03, 1.06, 1.03);
})();

/* ---------- hell bands on the legs ---------- */
var HELL_NAMES = ['ratnaprabha', 'sharkaraprabha', 'valukaprabha', 'pankaprabha', 'dhumaprabha', 'tamahprabha', 'mahatamahprabha'];
var HELL_COL = [0xc98a3d, 0xb3763a, 0xa2683c, 0x8a5a35, 0x6e4a30, 0x4a3423, 0x2e2118];
var hellTop = -1.62, hellBot = -6.85, hellH = (hellTop - hellBot) / 7;
HELL_COL.forEach(function (c, i) {
  var yT = hellTop - i * hellH, yB = yT - hellH;
  var band = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusAt(yT) + 0.012, radiusAt(yB) + 0.012, hellH * 0.74, 48),
    toonMat(c)
  );
  band.position.y = (yT + yB) / 2;
  body.add(band);
  var div = new THREE.Mesh(new THREE.TorusGeometry(radiusAt(yT) + 0.013, 0.007, 8, 56), i < 4 ? GOLD : GOLD_GLOW);
  div.rotation.x = Math.PI / 2;
  div.position.y = yT;
  body.add(div);
});

/* ---------- heaven bands on the torso ---------- */
var PAIR_IDS = ['saudharma', 'sanatkumara', 'brahma', 'lantaka', 'shukra', 'shatara', 'anata', 'arana'];
var PAIR_COL = [0xa63a26, 0xc9963d, 0xb98a2f, 0x3f5478, 0xa63a26, 0xb8862f, 0x3f5478, 0x7a2e1e];
var hvTop = 2.70, hvBot = -1.05, hvH = (hvTop - hvBot) / 8;
PAIR_COL.forEach(function (c, i) {
  var yT = hvTop - i * hvH, yB = yT - hvH;
  var band = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusAt(yT) + 0.010, radiusAt(yB) + 0.010, hvH * 0.68, 48),
    toonMat(c)
  );
  band.position.y = (yT + yB) / 2;
  body.add(band);
  var div = new THREE.Mesh(new THREE.TorusGeometry(radiusAt(yT) + 0.011, 0.006, 8, 56), GOLD);
  div.rotation.x = Math.PI / 2;
  div.position.y = yT;
  body.add(div);
  if (i === 2) { /* Brahma pair: double ring, the widest */
    var d2 = new THREE.Mesh(new THREE.TorusGeometry(radiusAt(yB) + 0.011, 0.009, 8, 56), GOLD);
    d2.rotation.x = Math.PI / 2;
    d2.position.y = yB;
    body.add(d2);
  }
});

/* ---------- neck rings: 9 Graiveyaka + 9 Anudisha ---------- */
function ringRow(yStart, yEnd, n, tube) {
  for (var i = 0; i < n; i++) {
    var y = yStart + (yEnd - yStart) * (i / (n - 1));
    var rr = new THREE.Mesh(new THREE.TorusGeometry(radiusAt(y) + 0.009, tube, 6, 48), GOLD);
    rr.rotation.x = Math.PI / 2;
    rr.position.y = y;
    body.add(rr);
  }
}
ringRow(3.32, 3.55, 9, 0.0055);
ringRow(3.60, 3.82, 9, 0.0055);

/* ---------- middle-world mandala at the waist ---------- */
var waistR = radiusAt(-1.28);
var mandala = new THREE.Group();
mandala.position.set(0, -1.28, waistR * 0.62 + 0.02);
loka.add(mandala);
var mDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.028, 48), toonMat(0x46708a));
mDisc.rotation.x = Math.PI / 2;
mandala.add(mDisc);
function mRing(rIn, rOut, color, z) {
  var m = new THREE.Mesh(new THREE.RingGeometry(rIn, rOut, 48), toonMat(color));
  m.position.z = z;
  mandala.add(m);
}
mRing(0.42, 0.53, 0xd8b877, 0.017);
mRing(0.28, 0.36, 0xcbb287, 0.017);
mRing(0.235, 0.27, 0x3f8291, 0.017);
var jambu = new THREE.Mesh(new THREE.CircleGeometry(0.225, 40), toonMat(0xcf9f4e));
jambu.position.z = 0.018;
mandala.add(jambu);
var meruDot = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 10), GOLD);
meruDot.rotation.x = Math.PI / 2;
meruDot.position.z = 0.055;
mandala.add(meruDot);

/* sun & moon around the waist; stars ring */
function glowTexture(rgba) {
  var cnv = document.createElement('canvas');
  cnv.width = cnv.height = 64;
  var ctx = cnv.getContext('2d');
  var g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  g.addColorStop(0, rgba);
  g.addColorStop(0.4, rgba);
  g.addColorStop(1, 'rgba(255,240,200,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(32, 32, 30, 0, 6.283); ctx.fill();
  return new THREE.CanvasTexture(cnv);
}
var sunOrbit = new THREE.Group();
sunOrbit.position.y = -1.25;
var sunBall = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffc75e }));
sunBall.position.x = 0.95;
var sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,190,80,0.9)'), transparent: true, depthWrite: false }));
sunGlow.scale.set(0.3, 0.3, 1);
sunGlow.position.x = 0.95;
sunOrbit.add(sunBall, sunGlow);
loka.add(sunOrbit);

var moonOrbit = new THREE.Group();
moonOrbit.position.y = -1.02;
moonOrbit.rotation.y = 2.4;
var moonBall = new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 12), new THREE.MeshBasicMaterial({ color: 0xf4eedd }));
moonBall.position.x = 1.04;
var moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(240,235,210,0.85)'), transparent: true, depthWrite: false }));
moonGlow.scale.set(0.24, 0.24, 1);
moonGlow.position.x = 1.04;
moonOrbit.add(moonBall, moonGlow);
loka.add(moonOrbit);

var starGeo = new THREE.BufferGeometry();
var starPos = [];
for (var st = 0; st < 42; st++) {
  var ang = st / 42 * Math.PI * 2;
  var rr = 1.06 + Math.random() * 0.12;
  starPos.push(Math.cos(ang) * rr, -1.2 + (Math.random() - 0.5) * 0.34, Math.sin(ang) * rr);
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
var starPts = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x6b5334, size: 0.009, transparent: true, opacity: 0.7 }));
loka.add(starPts);

/* ---------- Siddhashila crescent + glow ---------- */
var crescent = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.05, 12, 48, Math.PI * 0.72), GOLD);
crescent.rotation.z = Math.PI * 1.14;   /* horns up */
crescent.position.set(0, 5.45, 0);
loka.add(crescent);
var siddhaGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,235,170,0.95)'), transparent: true, depthWrite: false }));
siddhaGlow.scale.set(1.15, 0.8, 1);
siddhaGlow.position.set(0, 5.45, -0.05);
loka.add(siddhaGlow);

/* ---------- Trasa-nadi: fine gold line down the front ---------- */
(function () {
  var pts = [];
  for (var y = -7.05; y <= 4.6; y += 0.45) {
    pts.push(new THREE.Vector3(0, y, radiusAt(y) * 0.62 + 0.02));
  }
  var curve = new THREE.CatmullRomCurve3(pts);
  var line = new THREE.Mesh(new THREE.TubeGeometry(curve, 90, 0.009, 6), GOLD_GLOW);
  loka.add(line);
})();

/* ---------- prabhavali rings behind the figure ---------- */
[[3.95, 0.016], [3.72, 0.010]].forEach(function (rr) {
  var ring = new THREE.Mesh(new THREE.TorusGeometry(rr[0], rr[1], 8, 90), new THREE.MeshBasicMaterial({ color: 0xb98a2f, transparent: true, opacity: 0.55 }));
  ring.position.set(0, -0.9, -1.7);
  loka.add(ring);
});

/* ---------- vata-valaya shells (very faint) ---------- */
[[1.0, 0.05], [1.07, 0.038], [1.14, 0.028]].forEach(function (sh) {
  var shell = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 26),
    new THREE.MeshBasicMaterial({ color: 0xb98a2f, transparent: true, opacity: sh[1], depthWrite: false, side: THREE.BackSide })
  );
  shell.scale.set(2.9 * sh[0], 8.2 * sh[0], 2.5 * sh[0]);
  shell.position.y = -0.85;
  loka.add(shell);
});

/* ---------- ground shadow ---------- */
(function () {
  var cnv = document.createElement('canvas');
  cnv.width = cnv.height = 128;
  var ctx = cnv.getContext('2d');
  var g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  g.addColorStop(0, 'rgba(70,48,20,0.32)');
  g.addColorStop(1, 'rgba(70,48,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  var tex = new THREE.CanvasTexture(cnv);
  var sh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.0), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  sh.rotation.x = -Math.PI / 2;
  sh.position.y = -7.29;
  loka.add(sh);
})();



/* ============================================================
   Fly-to, markers, panels, codex, tour (same engine as before)
   ============================================================ */
var fly = null;
function flyTo(camPos, tgtPos, dur) {
  fly = {
    t0: performance.now(), dur: dur || 1700,
    cf: camera.position.clone(), ct: controls.target.clone(),
    p: new THREE.Vector3(camPos[0], camPos[1], camPos[2]),
    t: new THREE.Vector3(tgtPos[0], tgtPos[1], tgtPos[2])
  };
  controls.autoRotate = false;
}
function easeInOut(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }

function renderMarkers() {
  markersEl.innerHTML = '';
  SPOTS.forEach(function (s) {
    var el = document.createElement('div');
    el.className = 'marker' + (window.LokaUI && window.LokaUI.activeId === s.id ? ' active' : '');
    el.dataset.id = s.id;
    var dot = document.createElement('span');
    dot.className = 'dot';
    var label = document.createElement('span');
    label.className = 'mlabel';
    label.textContent = Loka.spotText(Loka.state.lang, s.id).t;
    el.appendChild(dot);
    el.appendChild(label);
    el.addEventListener('click', function () { if (window.LokaUI) window.LokaUI.onMarker(s.id); });
    markersEl.appendChild(el);
  });
}
var projV = new THREE.Vector3();
function updateMarkers() {
  var w = container.clientWidth, h = container.clientHeight;
  var kids = markersEl.children;
  for (var i = 0; i < kids.length; i++) {
    var el = kids[i];
    var spot = SPOT_BY_ID[el.dataset.id];
    projV.set(spot.pos[0], spot.pos[1], spot.pos[2]).project(camera);
    if (projV.z < 1) {
      el.style.display = '';
      el.style.left = ((projV.x + 1) / 2 * w) + 'px';
      el.style.top = ((-projV.y + 1) / 2 * h) + 'px';
    } else {
      el.style.display = 'none';
    }
  }
}



renderer.domElement.addEventListener('pointerdown', function () { controls.autoRotate = false; });

window.addEventListener('resize', function () {
  var w = container.clientWidth, h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

function animate() {
  requestAnimationFrame(animate);
  if (fly) {
    var k = (performance.now() - fly.t0) / fly.dur;
    if (k >= 1) k = 1;
    var e = easeInOut(Math.max(0, k));
    camera.position.lerpVectors(fly.cf, fly.p, e);
    controls.target.lerpVectors(fly.ct, fly.t, e);
    if (k >= 1) fly = null;
  }
  sunOrbit.rotation.y += 0.0018;
  moonOrbit.rotation.y -= 0.0012;
  starPts.rotation.y += 0.0004;
  controls.update();
  renderer.render(scene, camera);
  updateMarkers();
}


animate();

window.LokaScene = {
  flyTo: flyTo,
  refreshMarkers: renderMarkers,
  camera: function () { return camera; },
  controls: function () { return controls; }
};
})();
