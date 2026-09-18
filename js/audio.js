/* ============================================================
   audio.js — narration pipeline.
   Preferred: Sarvam AI Bulbul v3 text-to-speech (female voices),
   called directly from the browser with the user's own API key
   (stored only in localStorage, sent only to api.sarvam.ai).
   Fallback: the browser's built-in speechSynthesis.
   API reference: https://docs.sarvam.ai/api-reference/text-to-speech/convert
   ============================================================ */
(function () {
'use strict';
var ENDPOINT = 'https://api.sarvam.ai/text-to-speech';
var LS_KEY = 'loka_sarvam_key';
var LS_SPEAKER = 'loka_sarvam_speaker';

var key = '';
var speaker = 'priya';
try {
  key = localStorage.getItem(LS_KEY) || '';
  speaker = localStorage.getItem(LS_SPEAKER) || 'priya';
} catch (e) { /* storage unavailable — fall back to browser voice */ }

var audioEl = null;
var cache = {};

function hasKey() { return !!key; }
function getSpeaker() { return speaker; }

function setKey(k) {
  key = (k || '').trim();
  try {
    if (key) localStorage.setItem(LS_KEY, key);
    else localStorage.removeItem(LS_KEY);
  } catch (e) { /* ignore */ }
  cache = {};
}

function setSpeaker(s) {
  speaker = s;
  try { localStorage.setItem(LS_SPEAKER, s); } catch (e) { /* ignore */ }
  cache = {};
}

function stop() {
  if (audioEl) {
    try { audioEl.pause(); } catch (e) { /* ignore */ }
    audioEl = null;
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  }
}

function base64ToBlobUrl(b64) {
  var bin = atob(b64);
  var bytes = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
}

function playUrl(url) {
  stop();
  audioEl = new Audio(url);
  audioEl.play().catch(function () { /* autoplay blocked — user can click again */ });
}

function sarvamFetch(text, lang) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-subscription-key': key
    },
    body: JSON.stringify({
      text: text,
      target_language_code: lang === 'hi' ? 'hi-IN' : 'en-IN',
      model: 'bulbul:v3',
      speaker: speaker
    })
  }).then(function (r) {
    if (!r.ok) throw new Error('Sarvam HTTP ' + r.status);
    return r.json();
  }).then(function (j) {
    var b64 = (j.audios && j.audios[0]) || j.audio || (typeof j.audios === 'string' ? j.audios : null);
    if (!b64) throw new Error('no audio in response');
    return base64ToBlobUrl(b64);
  });
}

function browserSpeak(text, lang) {
  if (!('speechSynthesis' in window)) return;
  try {
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    u.rate = 0.95;
    var voices = window.speechSynthesis.getVoices() || [];
    var pick = null;
    var FEMALE = ['female', 'woman', 'priya', 'kalpana', 'neerja', 'swara', 'heera', 'veena', 'aditi', 'madhur', 'hemant'];
    outer:
    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      if (v.lang && v.lang.indexOf(u.lang.substring(0, 2)) === 0) {
        if (!pick) pick = v;
        var nm = (v.name || '').toLowerCase();
        for (var f = 0; f < FEMALE.length; f++) {
          if (nm.indexOf(FEMALE[f]) >= 0) { pick = v; break outer; }
        }
      }
    }
    if (pick) u.voice = pick;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) { /* speech unavailable */ }
}

/* speak(text, lang) — Sarvam if a key is set, else the browser voice */
function speak(text, lang) {
  if (key) {
    stop();
    var ck = lang + '|' + speaker + '|' + text;
    if (cache[ck]) { playUrl(cache[ck]); return; }
    sarvamFetch(text, lang)
      .then(function (url) { cache[ck] = url; playUrl(url); })
      .catch(function (err) {
        if (window.console) console.warn('Sarvam TTS unavailable, using browser voice:', err);
        browserSpeak(text, lang);
      });
  } else {
    browserSpeak(text, lang);
  }
}

window.LokaAudio = {
  hasKey: hasKey,
  getSpeaker: getSpeaker,
  setKey: setKey,
  setSpeaker: setSpeaker,
  speak: speak,
  stop: stop
};
})();
