/* ============================================================
   app.js — UI: panels, codex, guided yatra, language toggle,
   Sarvam AI narration settings. Bootstraps the experience.
   ============================================================ */
(function () {
'use strict';
var Loka = window.Loka, LokaScene = window.LokaScene, LokaAudio = window.LokaAudio;
var I18N = Loka.I18N;
var SPOTS = Loka.SPOTS;
var SPOT_BY_ID = {};
SPOTS.forEach(function (s) { SPOT_BY_ID[s.id] = s; });
var VIEW_FLYS = Loka.VIEW_FLYS;

var markersEl = document.getElementById('markers');
var chipsEl = document.getElementById('chips');
var panelEl = document.getElementById('panel');
var panelTitle = document.getElementById('panelTitle');
var panelBody = document.getElementById('panelBody');
var panelDetails = document.getElementById('panelDetails');
var panelKicker = document.getElementById('panelKicker');
var panelListenBtn = document.getElementById('panelListen');
var codexEl = document.getElementById('codex');
var codexCards = document.getElementById('codexCards');
var tourEl = document.getElementById('tour');
var tourTitle = document.getElementById('tourTitle');
var tourText = document.getElementById('tourText');
var tourStep = document.getElementById('tourStep');
var sourcesModal = document.getElementById('sourcesModal');
var sourcesText = document.getElementById('sourcesText');
var sourcesNote = document.getElementById('sourcesNote');
var voiceBtn = document.getElementById('btnVoice');

var lang = Loka.state.lang;
var openSpotId = null;
var tourIndex = -1;
var voiceOn = false;

window.LokaUI = {
  activeId: null,
  onMarker: function (id) { openSpot(id); }
};

function T(key) { return I18N[Loka.state.lang][key]; }
function spotText(id) { return Loka.spotText(Loka.state.lang, id); }
function tourData() { return Loka.tourData(); }
function codexData() { return Loka.codexData(); }

function renderPanel(id) {
  var idx = SPOTS.findIndex(function (s) { return s.id === id; });
  panelKicker.textContent = String(idx + 1).padStart(2, '0') + ' / ' + SPOTS.length;
  var tx = spotText(id);
  panelTitle.textContent = tx.t;
  panelBody.textContent = tx.d;
  if (tx.x) {
    panelDetails.hidden = false;
    panelDetails.textContent = tx.x;
  } else {
    panelDetails.hidden = true;
  }
  panelListenBtn.textContent = T('listen');
  panelListenBtn.hidden = false;
}
function openSpot(id) {
  var s = SPOT_BY_ID[id];
  openSpotId = id;
  endTour(true);
  LokaScene.flyTo(s.cam, s.tgt);
  renderPanel(id);
  panelEl.hidden = false;
  codexEl.classList.remove('open');
  LokaScene.refreshMarkers();
}
function closePanel() {
  openSpotId = null;
  panelEl.hidden = true;
  panelListenBtn.hidden = true;
  LokaScene.refreshMarkers();
}

var codexTab = 'worlds';
function renderCodex() {
  var tabs = { worlds: T('worlds'), devas: T('devas'), jivas: T('jivas'), guardians: T('guardians') };
  document.getElementById('codexTabs').innerHTML = '';
  Object.keys(tabs).forEach(function (k) {
    var b = document.createElement('button');
    b.className = 'ctab' + (k === codexTab ? ' active' : '');
    b.textContent = tabs[k];
    b.addEventListener('click', function () { codexTab = k; renderCodex(); });
    document.getElementById('codexTabs').appendChild(b);
  });
  codexCards.innerHTML = '';
  codexData().forEach(function (c) {
    if (c.tab !== codexTab) return;
    var card = document.createElement('div');
    card.className = 'ccard';
    var h = document.createElement('h4');
    h.textContent = c.t;
    card.appendChild(h);
    var p = document.createElement('p');
    p.textContent = c.d;
    card.appendChild(p);
    if (c.x) {
      var dx = document.createElement('div');
      dx.className = 'cdetails';
      dx.textContent = c.x;
      card.appendChild(dx);
    }
    if (c.view) {
      var vb = document.createElement('button');
      vb.className = 'viewbtn';
      vb.textContent = T('view');
      vb.addEventListener('click', function () {
        var v = VIEW_FLYS[c.view] || (SPOT_BY_ID[c.view] ? { cam: SPOT_BY_ID[c.view].cam, tgt: SPOT_BY_ID[c.view].tgt } : VIEW_FLYS.overview);
        toggleCodex(false);
        LokaScene.flyTo(v.cam, v.tgt);
        if (SPOT_BY_ID[c.view]) openSpot(c.view); else closePanel();
      });
      card.appendChild(vb);
    }
    codexCards.appendChild(card);
  });
  var note = document.createElement('p');
  note.className = 'cnote';
  note.textContent = T('readingNote');
  codexCards.appendChild(note);
}
function toggleCodex(force) {
  var open = (typeof force === 'boolean') ? force : !codexEl.classList.contains('open');
  codexEl.classList.toggle('open', open);
  if (open) { closePanel(); renderCodex(); }
}

function speak(text) {
  if (!voiceOn) return;
  LokaAudio.speak(text, Loka.state.lang);
}
function renderTour() {
  var stops = tourData();
  var st = stops[tourIndex];
  tourStep.textContent = (tourIndex + 1) + ' / ' + stops.length;
  tourTitle.textContent = st.t;
  tourText.textContent = st.n;
  document.getElementById('tourPrev').disabled = tourIndex === 0;
  document.getElementById('tourNext').textContent = tourIndex === stops.length - 1 ? T('endTour') : T('next');
  var dots = document.getElementById('tourDots');
  dots.innerHTML = '';
  stops.forEach(function (x, i) {
    var d = document.createElement('span');
    d.className = 'tdot' + (i === tourIndex ? ' on' : '');
    d.addEventListener('click', function () { gotoTour(i); });
    dots.appendChild(d);
  });
}
function gotoTour(i) {
  var stops = tourData();
  tourIndex = Math.max(0, Math.min(stops.length - 1, i));
  var st = stops[tourIndex];
  closePanel();
  toggleCodex(false);
  LokaScene.flyTo(st.cam, st.tgt, 2200);
  renderTour();
  tourEl.hidden = false;
  speak(Loka.narr()[tourIndex]);
}
function startTour() { gotoTour(0); }
function endTour(silent) {
  if (tourIndex < 0) return;
  tourIndex = -1;
  tourEl.hidden = true;
  LokaAudio.stop();
  if (!silent) LokaScene.flyTo(Loka.HOME_CAM, Loka.HOME_TGT);
}

var CHIPS = [
  { key: 'chipAll', cam: Loka.HOME_CAM, tgt: Loka.HOME_TGT },
  { key: 'chipAdho', cam: VIEW_FLYS.adho.cam, tgt: VIEW_FLYS.adho.tgt },
  { key: 'chipMadhya', cam: VIEW_FLYS.madhyaloka.cam, tgt: VIEW_FLYS.madhyaloka.tgt },
  { key: 'chipUrdhva', cam: VIEW_FLYS.urdhva.cam, tgt: VIEW_FLYS.urdhva.tgt },
  { key: 'chipSiddha', cam: [1.0, 5.7, 2.3], tgt: [0, 5.4, 0] }
];
function renderChips() {
  chipsEl.innerHTML = '';
  CHIPS.forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.textContent = T(c.key);
    b.addEventListener('click', function () { endTour(true); LokaScene.flyTo(c.cam, c.tgt); });
    chipsEl.appendChild(b);
  });
}

document.getElementById('btnCodex').addEventListener('click', function () { toggleCodex(); });
document.getElementById('codexClose').addEventListener('click', function () { toggleCodex(false); });
document.getElementById('btnYatra').addEventListener('click', startTour);
document.getElementById('tourPrev').addEventListener('click', function () { gotoTour(tourIndex - 1); });
document.getElementById('tourNext').addEventListener('click', function () {
  if (tourIndex >= tourData().length - 1) endTour(); else gotoTour(tourIndex + 1);
});
document.getElementById('tourEnd').addEventListener('click', function () { endTour(); });
document.getElementById('panelClose').addEventListener('click', closePanel);
document.getElementById('btnReset').addEventListener('click', function () {
  endTour(true); closePanel(); toggleCodex(false); LokaScene.flyTo(Loka.HOME_CAM, Loka.HOME_TGT);
});
document.getElementById('btnSources').addEventListener('click', function () {
  sourcesText.textContent = T('sourcesText');
  sourcesNote.textContent = T('sourcesNote');
  sourcesModal.hidden = false;
});
document.getElementById('sourcesClose').addEventListener('click', function () { sourcesModal.hidden = true; });
sourcesModal.addEventListener('click', function (e) { if (e.target === sourcesModal) sourcesModal.hidden = true; });
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { sourcesModal.hidden = true; toggleCodex(false); closePanel(); endTour(); }
  if (e.key === 'ArrowRight' && tourIndex >= 0) gotoTour(tourIndex + 1);
  if (e.key === 'ArrowLeft' && tourIndex >= 0) gotoTour(tourIndex - 1);
});

var voiceBtn = document.getElementById('btnVoice');
if (true) {
  voiceBtn.addEventListener('click', function () {
    voiceOn = !voiceOn;
    voiceBtn.textContent = voiceOn ? T('voiceOn') : T('voiceOff');
    voiceBtn.classList.toggle('active', voiceOn);
    if (!voiceOn) { LokaAudio.stop(); }
    else if (tourIndex >= 0) speak(Loka.narr()[tourIndex]);
  });
}

document.getElementById('langEn').addEventListener('click', function () { setLang('en'); });
document.getElementById('langHi').addEventListener('click', function () { setLang('hi'); });

function setLang(l) {
  lang = l;
  Loka.state.lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = I18N[l][el.dataset.i18n];
  });
  document.getElementById('langEn').classList.toggle('active', l === 'en');
  document.getElementById('langHi').classList.toggle('active', l === 'hi');
  voiceBtn.textContent = voiceOn ? T('voiceOn') : T('voiceOff');
  renderChips(); LokaScene.refreshMarkers();
  if (openSpotId) renderPanel(openSpotId);
  if (tourIndex >= 0) renderTour();
  if (codexEl.classList.contains('open')) renderCodex();
  if (!sourcesModal.hidden) { sourcesText.textContent = T('sourcesText'); sourcesNote.textContent = T('sourcesNote'); }
}



/* ---------- Sarvam narration settings ---------- */
var audioModal = document.getElementById('audioModal');
var sarvamKeyInput = document.getElementById('sarvamKey');
var sarvamSpeakerSel = document.getElementById('sarvamSpeaker');
var audioStatusEl = document.getElementById('audioStatus');

Loka.FEMALE_VOICES.forEach(function (v) {
  var o = document.createElement('option');
  o.value = v;
  o.textContent = v.charAt(0).toUpperCase() + v.slice(1);
  sarvamSpeakerSel.appendChild(o);
});
sarvamSpeakerSel.value = LokaAudio.getSpeaker();
if (LokaAudio.hasKey()) sarvamKeyInput.placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (saved)';

function updateAudioStatus() {
  audioStatusEl.textContent = LokaAudio.hasKey() ? T('audioStatusSarvam') : T('audioStatusBrowser');
}
document.getElementById('btnAudio').addEventListener('click', function () {
  updateAudioStatus();
  audioModal.hidden = false;
});
document.getElementById('audioClose').addEventListener('click', function () { audioModal.hidden = true; });
audioModal.addEventListener('click', function (e) { if (e.target === audioModal) audioModal.hidden = true; });
document.getElementById('audioSave').addEventListener('click', function () {
  if (sarvamKeyInput.value) LokaAudio.setKey(sarvamKeyInput.value);
  LokaAudio.setSpeaker(sarvamSpeakerSel.value);
  sarvamKeyInput.value = '';
  sarvamKeyInput.placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (saved)';
  updateAudioStatus();
});
document.getElementById('audioClear').addEventListener('click', function () {
  LokaAudio.setKey('');
  sarvamKeyInput.value = '';
  sarvamKeyInput.placeholder = '';
  updateAudioStatus();
});
document.getElementById('audioTest').addEventListener('click', function () {
  enableVoice();
  LokaAudio.speak(T('audioTestLine'), Loka.state.lang);
});
function enableVoice() {
  voiceOn = true;
  voiceBtn.textContent = T('voiceOn');
  voiceBtn.classList.add('active');
}
panelListenBtn.addEventListener('click', function () {
  if (!openSpotId) return;
  enableVoice();
  var tx = spotText(openSpotId);
  LokaAudio.speak(tx.d + (tx.x ? ' ' + tx.x : ''), Loka.state.lang);
});

/* boot */
setLang(Loka.state.lang);
renderChips();
LokaScene.flyTo(Loka.HOME_CAM, Loka.HOME_TGT, 2600);
})();
