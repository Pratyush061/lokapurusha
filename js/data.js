/* ============================================================
   data.js — all content: i18n UI strings, hotspot texts, codex,
   tour stops, and the detailed narration scripts (spoken aloud).
   Sources: Tattvartha Sutra ch. 3–4, Bhagavati Sutra,
   Trishashti Shalaka Purusha Caritra, Trilokasara (Digambara).
   ============================================================ */
(function () {
'use strict';
var HOME_CAM = [2.6, 1.4, 17.4], HOME_TGT = [0, -0.75, 0];

window.Loka = {
  state: { lang: ((navigator.language || '') + '').toLowerCase().indexOf('hi') === 0 ? 'hi' : 'en' },
  I18N: {
  en: {
    title: 'The Lokapurusha',
    subtitle: 'The Jain Universe as the Cosmic Man',
    kicker: 'JAIN COSMOLOGY · DIGAMBARA TRADITION',
    hint: 'Hover a marker to see its name, click to travel there and read about it. Drag to rotate, scroll to zoom.',
    codex: 'Codex', yatra: 'Yatra', voiceOn: 'Voice on', voiceOff: 'Voice off',
    reset: 'Reset view', close: 'Close', next: 'Next', prev: 'Previous', endTour: 'End tour',
    tourTitle: 'The Yatra — a guided journey',
    details: 'Details from the texts', view: 'View in 3D',
    worlds: 'Worlds', devas: 'Devas', jivas: 'Jivas', guardians: 'Guardians',
    sources: 'Sources', footnote: 'Runs entirely in your browser. Detailed narration is spoken by a female voice through Sarvam AI — add your key in Audio settings. The height of the middle world is exaggerated for clarity.',
    sourcesText: 'Tattvartha Sutra, chapters 3–4 · Trishashti Shalaka Purusha Caritra · Bhagavati Sutra · Trilokasara (Digambara tradition)',
    sourcesNote: 'Where traditions differ, the Digambara reckoning is followed. Some name-lists and counts vary between texts; each panel cites its source. Visual proportions are illustrative — the true measurements appear in the details of each place.',
    chipAll: 'Whole Loka', chipAdho: 'Adho Loka', chipMadhya: 'Madhya Loka', chipUrdhva: 'Urdhva Loka', chipSiddha: 'Siddhashila',
        audio: 'Audio',
    audioTitle: 'Narration Voice',
    audioIntro: "To hear the detailed narration in a natural female voice, connect your Sarvam AI account. Your API key is stored only in this browser and is sent only to api.sarvam.ai. Without a key, the app uses the browser's built-in voice.",
    audioKeyLabel: 'Sarvam API key',
    audioVoiceLabel: 'Voice',
    audioSave: 'Save', audioTest: 'Test voice', audioClear: 'Remove key',
    audioStatusSarvam: 'Using the Sarvam voice',
    audioStatusBrowser: "Using the browser voice — no API key set",
    audioSaved: 'Saved. The narration will now use the Sarvam voice.',
    audioRemoved: 'API key removed. The browser voice will be used.',
    audioTestLine: 'This is the voice that will narrate the story of the Lokapurusha.',
    audioError: 'The Sarvam voice could not be reached. Check your key and connection; using the browser voice instead.',
    audioVoicesHint: 'Female voices of the Bulbul v3 model. Priya and Ishita are recommended by Sarvam for Hindi and English.',
    listen: 'Listen',
readingNote: 'For clarity, the height of the middle world and the gaps between layers are exaggerated; the texts give the true proportions in the details of each place.'
  }
},
  SPOT_EN: {
  ratnaprabha:     { t: 'Ratnaprabha', d: 'The jewel-hued first earth. The top strata are the home of the mansion-dwelling and wandering devas; hellish beings dwell in its three lower sections — Khara, Panka and Abbahula.', x: 'Thickness 180,000 yojana · 13 strata · 3,000,000 hell-abodes.' },
  sharkaraprabha:  { t: 'Sharkaraprabha', d: 'The gravel-hued second earth. As one descends, the bodies, pain, grief and lifespan of the hellish beings all increase.', x: 'Thickness 132,000 yojana · 11 strata · 2,500,000 abodes.' },
  valukaprabha:    { t: 'Valukaprabha', d: 'The sand-hued third earth of the lower world.', x: 'Thickness 128,000 yojana · 9 strata · 1,500,000 abodes.' },
  pankaprabha:     { t: 'Pankaprabha', d: 'The mud-hued fourth earth. The guardian Narakpal devas preside only over the first three hells; from here down there are no guardians, only suffering.', x: 'Thickness 120,000 yojana · 7 strata · 1,000,000 abodes.' },
  dhumaprabha:     { t: 'Dhumaprabha', d: 'The smoke-hued fifth earth.', x: 'Thickness 118,000 yojana · 5 strata · 300,000 abodes.' },
  tamahprabha:     { t: 'Tamahprabha', d: 'The darkness-hued sixth earth.', x: 'Thickness 116,000 yojana · 3 strata · 99,995 abodes.' },
  mahatamahprabha: { t: 'Mahatamahprabha', d: 'The earth of dense darkness — the deepest point of the universe. Lifespans here reach up to 33 sagaropama, the longest suffering in the cosmos; yet even here a soul\u2019s term ends and it rises again.', x: 'Thickness 108,000 yojana · 1 stratum · 5 abodes.' },
  madhyaloka:      { t: 'The Middle World', d: 'The Middle World — a vast, thin disc of innumerable rings of islands and oceans. Humans and animals live only here, and only from here can liberation be attained.', x: 'About 100,040 yojana thick — a hairline beside the 7-rajju worlds above and below.' },
  meru:            { t: 'Meru & Jambudvipa', d: 'At the centre stands golden Mount Meru, 99,000 yojana high, in the heart of Jambudvipa, the round continent 100,000 yojana across. Our region, Bharata, lies on its southern slope; at the centre lies Mahavideha, where Tirthankaras are born in every era.', x: '' },
  surya:           { t: 'Surya — the Sun', d: 'The solar devas circle the Middle World in their celestial cars, 800 yojana above the level earth — making day and night for the islands below.', x: 'First of the five classes of luminous devas: suns, moons, planets, constellations and scattered stars.' },
  chandra:         { t: 'Chandra — the Moon', d: 'The lunar devas ride 880 yojana above the level earth, just above the suns, cooling the lands they pass.', x: 'Above them: the constellations at 884 yojana, then the planets, one after another.' },
  saudharma:       { t: 'Saudharma & Ishana', d: 'The first pair of heavens, one and a half rajju above Meru, round like the full moon. Two Indras rule here — Shakra in the south, Ishana in the north. Here dwell the heaven-travelling devas with their courts, consorts and armies, ordered like celestial kingdoms; with every higher heaven, lifespan and splendour grow while attachment and pride diminish.', x: '32 lakh and 28 lakh celestial palaces · deva bodies about 7 hasta tall.' },
  sanatkumara:     { t: 'Sanatkumara & Mahendra', d: 'The second pair of heavens, two and a half rajju above Meru.', x: '12 lakh and 8 lakh palaces · deva bodies about 6 hasta tall.' },
  brahma:          { t: 'Brahma & Brahmottara', d: 'At the chest of the Cosmic Man the universe reaches its greatest breadth — five rajju. One Indra, Brahma, rules this pair. At its boundary wait the nine Lokantika devas, who descend whenever a Tirthankara is about to preach.', x: '4 lakh and 2 lakh palaces · one Indra for the pair.' },
  lantaka:         { t: 'Lantaka & Kapishtha', d: 'The fourth pair of heavens — thinner in population than the last, as attachment thins out with height.', x: 'About 50,000 palaces · one Indra, Lantaka, for the pair.' },
  shukra:          { t: 'Shukra & Mahashukra', d: 'The fifth pair of heavens.', x: 'About 40,000 palaces · one Indra, Shukra, for the pair.' },
  shatara:         { t: 'Shatara & Sahasrara', d: 'The sixth pair of heavens.', x: 'About 6,000 palaces · one Indra, Shatara, for the pair.' },
  anata:           { t: 'Anata & Pranata', d: 'The seventh pair of heavens, shaped round like the first.', x: '400 palaces · two Indras, Anata and Pranata.' },
  arana:           { t: 'Arana & Achyuta', d: 'The last and subtlest pair of the kalpa heavens. From here the devas rise to the Indra-free heights.', x: '300 palaces · two Indras, Arana and Achyuta.' },
  graiveyaka:      { t: 'The Nine Graiveyakas', d: 'Nine vimanas at the neck of the Cosmic Man: Sudarshana, Suprabuddha, Manorama, Sarvabhadra, Suvishala, Sumanas, Saumanasa, Pritikara and Aditya. Here begin the Indra-free devas — the Ahamindras, equal in rank, with no king above them. (The names vary slightly between texts.)', x: '' },
  anudisha:        { t: 'The Nine Anudishas', d: 'The nine Anudisha vimanas above the Graiveyakas: Aditya, Archi, Archimalini, Vaira, Vairochana, Sauma, Saumarupa, Arka and Sphatika. Four stand in the four directions, four in the intermediate directions, and Aditya at the centre.', x: '' },
  anuttara:        { t: 'The Anuttara Vimanas', d: 'The unsurpassed Anuttara vimanas at the head of the Cosmic Man — Vijaya, Vaijayanta, Jayanta and Aparajita at the four quarters, with Sarvarthasiddha above them all. Souls born here attain liberation within one or two births.', x: '' },
  sarvarthasiddha: { t: 'Sarvarthasiddha', d: 'The great vimana at the crown of the head — the last station before liberation. Everything is accomplished here; from here a soul rises directly to Siddhashila.', x: '' },
  siddhashila:     { t: 'Siddhashila', d: 'The crescent of Ishatpragbhara at the summit of the universe, just above the head — the abode of the siddhas: souls perfected forever, free of all karma, never to be born again. The final home of every liberated being.', x: 'Ishatpragbhara: one rajju across and 8 yojana high · Siddhashila spreads 45 lakh yojana wide.' },
  trasanadi:       { t: 'Trasa-Nadi', d: 'The channel of mobile beings — a column one rajju wide and thick, running the whole 14-rajju height of the universe. Inside it live beings that can move; outside it, only immobile one-sensed life.', x: '' },
  vatavalaya:      { t: 'The Three Vata-Valayas', d: 'The three envelopes of the universe — dense water, dense wind and thin wind, each 20,000 yojana thick at the base. Beyond them lies only the endless empty non-universe, the aloka.', x: '' }
},
  SPOT_HI: {},
  CODEX_EN: [
  { tab: 'worlds', id: 'lokapurusha', t: 'The Lokapurusha', d: 'Jain texts describe the universe as a human figure standing in endless space — the Cosmic Man. It is eternal, created by no one, and supports itself: 14 rajju tall; 7 rajju wide at the base, 1 at the middle, 5 at the chest, 1 at the crown — 343 cubic rajju in all, in the Digambara reckoning.', x: '', view: 'overview' },
  { tab: 'worlds', id: 'adholoka', t: 'Adho Loka — the Lower World', d: 'The lower world — the legs of the Cosmic Man. Seven earths stacked one below another, holding 8.4 million hell-abodes in all. Souls are born here from lives of great cruelty; their suffering grows with each lower earth. Below the seven earths rest the dense-water, dense-wind and thin-wind supports.', x: '', view: 'adho' },
  { tab: 'worlds', id: 'madhyaloka', t: 'Madhya Loka — the Middle World', d: 'The middle world — the waist. A thin disc of innumerable alternating islands and oceans, with Jambudvipa and Mount Meru at the centre. The only home of humans and animals — and the only world from which liberation is possible.', x: '', view: 'madhyaloka' },
  { tab: 'worlds', id: 'urdhvaloka', t: 'Urdhva Loka — the Upper World', d: 'The upper world — the torso, neck and head. Sixteen kalpa heavens in eight pairs, ruled by twelve Indras; then the Indra-free heights of the Graiveyakas, Anudishas and Anuttaras, crowned by Siddhashila.', x: '', view: 'urdhva' },
  { tab: 'devas', id: 'bhavanavasi', t: 'Bhavanavasi — Mansion Dwellers', d: 'Mansion-dwelling devas, the lowest class — they live in the upper strata of Ratnaprabha itself. Ten classes, each with two Indras: Asurakumara (Camara and Vairocana), Nagakumara (Dharana and Bhutananda), Vidyutkumara, Suparnakumara, Agnikumara, Vatakumara, Stanitakumara, Udadhikumara, Dvipakumara and Dikkumara.', x: 'Maximum lifespans: Asurakumara one sagaropama; the rest from three palyopama down to one and a half palyopama.', view: 'ratnaprabha' },
  { tab: 'devas', id: 'vyantara', t: 'Vyantara — the Wanderers', d: 'Wandering devas of the in-between places — the class that includes Yakshas (treasure-keepers), Gandharvas (celestial musicians), Kinnaras, Kimpurushas, Mahoragas, Bhutas, Pishachas, and Rakshasas (who dwell in the lower, mud-rich stratum). From this class are drawn the shasanadevatas — the Yaksha and Yakshini attendants of the Tirthankaras.', x: '', view: 'ratnaprabha' },
  { tab: 'devas', id: 'jyotishika', t: 'Jyotishika — the Luminous Devas', d: 'The luminous devas: suns, moons, planets, constellations and scattered stars. They circle the middle world as celestial cars — the suns 800 yojana above the level earth, the moons at 880, the constellations and planets above. Their light is the karma-born radiance of devas, not burning spheres.', x: '', view: 'surya' },
  { tab: 'devas', id: 'vaimanika', t: 'Vaimanika — the Heaven Travellers', d: 'Heaven-travelling devas of the upper world — the kalpa devas of the sixteen heavens under their twelve Indras, and above them the kalpatita devas — the Graiveyaka, Anudisha and Anuttara abodes — whose devas are called Ahamindras: equal in rank, free of courts and kings. Splendour, purity and lifespan increase with every higher abode.', x: '', view: 'saudharma' },
  { tab: 'devas', id: 'lokantika', t: 'Lokantika — the Boundary Devas', d: 'Nine classes of devas who wait at the boundary of the Brahma heavens — Sarasvata, Aditya, Agni, Aruna, Gardatoya, Tushita, Avyabadha, Maruta and Arishta. They descend to the assembly whenever a Tirthankara is about to preach.', x: '', view: 'brahma' },
  { tab: 'jivas', id: 'jivatma', t: 'The Jiva — Every Soul', d: 'Every jiva — every soul — is consciousness itself: eternal, uncreated, infinite in number. Every jiva carries a body ranging from a single sensed point to a vast celestial frame, and every jiva can, in principle, become a siddha — a perfect soul.', x: '' },
  { tab: 'jivas', id: 'senses', t: 'The Ladder of Senses', d: 'Souls are classified by senses: one-sensed (earth-bodied, water-bodied, fire-bodied, wind-bodied and plant-bodied), two-sensed (worms, leeches), three-sensed (ants, moths), four-sensed (bees, scorpions) and five-sensed (animals, humans, devas, hell-beings). One-sensed beings fill the entire universe; mobile beings fill only the channel of mobile life.', x: '' },
  { tab: 'jivas', id: 'gatis', t: 'The Four Gatis and the Fifth State', d: 'A soul moves between four states of rebirth — hellish, animal, human and celestial — driven by its own karma. A fifth state lies outside the wheel: the siddha, liberated forever, from which there is no return.', x: '' },
  { tab: 'jivas', id: 'nigoda', t: 'Nigoda', d: 'The subtlest one-sensed beings, existing everywhere in the universe in infinite numbers — the lowest form of life, from which souls rise slowly over eternities.', x: '' },
  { tab: 'jivas', id: 'where', t: 'Where Beings Live', d: 'Hell-beings fill the seven earths; animals and humans the middle world (humans in only two and a half of its regions — Bharata, Airavata and Mahavideha); devas fill the heavens, the upper strata of Ratnaprabha and the luminous orbits; the siddhas rest above the universe at Siddhashila.', x: '', view: 'madhyaloka' },
  { tab: 'guardians', id: 'shasanadevata', t: 'Shasanadevata — Yaksha & Yakshini', d: 'Each Tirthankara\u2019s order has guardian attendants — a Yaksha and a Yakshini — drawn from the wandering devas. For Rishabhanatha they are Gomukha and Chakreshvari; for Mahavira, Matanga and Siddhayika. They guard the teaching and its followers, and are honoured in Jain temples — but they are guardians, not liberators; the Jina alone teaches the path to liberation. The full list of twenty-four pairs was recorded in the Tiloyapannatti, a Digambara work; the Digambara and Shvetambara lists differ in some names.', x: '' },
  { tab: 'guardians', id: 'indras', t: 'The Indras', d: 'Each heavenly court is ruled by an Indra, with consorts, counsellors, guards and armies. The greatest is Shakra of Saudharma — the Indra who attends the sermons of the Jinas with his court.', x: '', view: 'saudharma' }
],
  CODEX_HI: [],
  TOUR_EN: [
  { t: 'The Cosmic Man', n: 'This is the Jain universe — the loka — drawn as a human figure standing in endless space. The texts describe it as eternal, created by no one, fourteen rajju tall, holding every soul that has ever lived.', cam: [2.6, 1.4, 17.4], tgt: [0, -0.75, 0] },
  { t: 'The Legs — Seven Hells', n: 'Below the waist are the seven earths — Ratnaprabha down to Mahatamahprabha — where souls born of cruelty undergo the fruits of their karma. Deeper means darker, longer, and more painful.', cam: [2.8, -3.2, 6.0], tgt: [0, -3.9, 0] },
  { t: 'The Deepest Dark', n: 'Mahatamahprabha — the dense darkness at the bottom of everything. Only five abodes, and lifespans of up to thirty-three sagaropama. Yet even here a soul\u2019s term ends, and it rises again.', cam: [1.5, -6.1, 2.9], tgt: [0, -6.4, 0] },
  { t: 'The Middle World', n: 'At the waist lies the middle world: rings of islands and oceans, with Mount Meru and Jambudvipa at the centre. The only home of humans and animals — and the only world from which liberation is possible.', cam: [1.7, -0.8, 3.1], tgt: [0, -1.28, 0.15] },
  { t: 'Meru, the Sun and the Moon', n: 'Golden Meru rises ninety-nine thousand yojana at the centre of Jambudvipa. Around this world circle the luminous devas — the suns at eight hundred yojana, the moons just above.', cam: [0.9, -0.85, 1.7], tgt: [0, -1.28, 0.35] },
  { t: 'The First Heaven', n: 'A rajju and a half above Meru hang the first heavens — Saudharma and Ishana — round like the full moon, with their Indra, his court and his armies.', cam: [2.3, -0.5, 3.2], tgt: [0, -0.82, 0] },
  { t: 'The Broad Chest', n: 'At the chest the universe widens to five rajju — the Brahma heavens. Sixteen kalpa heavens rise in eight pairs, ruled by twelve Indras; splendour grows with every level.', cam: [3.4, 1.3, 4.8], tgt: [0, 1.1, 0] },
  { t: 'The Indra-Free Heights', n: 'Above the kalpas there are no more kings. The Graiveyakas, Anudishas and Anuttaras are the abodes of equal, quiet devas — nearly free of attachment.', cam: [1.7, 3.6, 2.3], tgt: [0, 3.55, 0] },
  { t: 'The Crown', n: 'At the crown of the head stands Sarvarthasiddha — the all-accomplished. Souls born here are liberated within one or two births.', cam: [1.3, 4.9, 1.8], tgt: [0, 4.75, 0] },
  { t: 'Siddhashila', n: 'And above the head rests the crescent of Siddhashila — the home of the siddhas, perfect souls, free forever. This is where the whole figure is headed: every soul\u2019s journey ends here.', cam: [1.0, 5.7, 2.3], tgt: [0, 5.4, 0] }
],
  TOUR_HI: [],
  NARR_EN: [
  "You are looking at the Lokapurusha — the Jain universe itself, imagined as a human figure standing in endless space. The Tattvartha Sutra and the great cosmology texts describe this loka as eternal and uncreated: no god made it, and nothing can destroy it. It is fourteen rajju tall — a rajju is a distance so vast that the texts use it only for cosmic measurement. The figure is seven rajju wide at the base, narrows to one rajju at the waist, widens to five at the chest, and closes to one rajju at the crown — three hundred and forty-three cubic rajju in all, in the Digambara reckoning. The legs are the seven hells, the waist is the middle world of humans, the torso holds the heavens, and above the head rests Siddhashila, the abode of liberated souls. Everything that exists, exists inside this figure; outside it is only the endless, empty non-universe, the aloka.",
  "We begin at the legs: the seven earths of the lower world. From the top down they are Ratnaprabha, the jewel earth; Sharkaraprabha, the gravel earth; Valukaprabha, the sand earth; Pankaprabha, the mud earth; Dhumaprabha, the smoke earth; Tamahprabha, the dark earth; and at the very bottom, Mahatamahprabha, the earth of dense darkness. Souls are born here as hell-beings only after lives of great cruelty. Their suffering is not a punishment imposed by anyone; it is simply the ripening of their own karma. The first earth is one hundred and eighty thousand yojana thick; each earth below is thinner, and the darkness, pain and lifespans grow as one descends. Together the seven earths hold exactly eight million four hundred thousand hell-abodes.",
  "This is Mahatamahprabha — the deepest point of the universe. Only five abodes exist here, in a single stratum one hundred and eight thousand yojana thick. Lifespans reach up to thirty-three sagaropama — a number so vast it is measured in ocean-cycles, not years. The guardian devas of the hells preside only over the first three hells; below that there are no guardians, no courts, no visitors — only suffering. And yet the Jain teaching insists on this: even here, a soul's term ends. No one is damned forever. When the karma that brought the soul here is exhausted, it rises again — into an animal womb, or a human birth, or even a heaven. The wheel never stops, and nothing in it is permanent.",
  "At the waist lies the middle world — a vast, thin disc, about one hundred thousand yojana thick, made of innumerable alternating rings of islands and oceans. At its centre is Jambudvipa, the round continent one hundred thousand yojana across, and at the continent's heart rises golden Mount Meru. Humans and animals live only in the middle world — and among its countless regions, humans who can attain liberation are born in only two and a half: Bharata, our land in the south; Airavata, its mirror in the north; and Mahavideha, the great central region, where a Tirthankara is teaching in every era. This is why the middle world matters more than any heaven: liberation is possible only from a human birth.",
  "Here is the middle world seen up close. Mount Meru rises ninety-nine thousand yojana from the centre of Jambudvipa — the golden axis of the continent. Around it circle the luminous devas, the Jyotishika gods, in their celestial cars: the suns ride eight hundred yojana above the level earth, the moons just above at eight hundred and eighty, the constellations at eight hundred and eighty-four, and above them the planets, one after another. As they circle, they make day and night, the months and the seasons for every land below. In Jain teaching these lights are not burning spheres of gas but devas — beings whose own karma has given them radiant bodies for a time.",
  "One rajju and a half above Mount Meru hang the first two heavens: Saudharma in the south and Ishana in the north, round in shape like the full moon. Here begins the upper world of the heaven-travelling devas. Their Indra is Shakra — the same Shakra who, with his court, descends to attend the sermons of the Tirthankaras. Saudharma alone holds thirty-two lakh celestial palaces, and Ishana twenty-eight lakh more. The devas here live in courts and kingdoms, with consorts, councillors, and armies. But the texts warn: their splendour and lifespans increase with every higher heaven — and their attachment and pride decrease.",
  "At the chest, the universe reaches its greatest breadth — five rajju. Here sits the heaven of Brahma, with Brahmottara just above it, ruled by a single Indra named Brahma. A special detail stands at this boundary: the nine classes of Lokantika devas wait eternally at the edge of this heaven — the Sarasvata, the Aditya, the Agni, the Aruna, the Gardatoya, the Tushita, the Avyabadha, the Maruta and the Arishta. Whenever a Tirthankara anywhere in the middle world is about to preach his first sermon, they descend to that assembly. Above rise the remaining heavens in pairs — Anata and Pranata, then Arana and Achyuta — each thinner in population, as attachment itself thins with height.",
  "Above the sixteen kalpa heavens, at the neck of the cosmic man, the kingdoms end. The nine Graiveyaka abodes — Sudarshana, Suprabuddha, Manorama, Sarvabhadra, Suvishala, Sumanas, Saumanasa, Pritikara and Aditya — begin the realm of the Ahamindras: devas equal in rank, with no Indra above them, no courts, no consorts, no armies. Above them come the nine Anudisha abodes — four in the four directions, four in the intermediate directions, and Aditya at the centre. The devas here are quiet and nearly free of attachment.",
  "The head of the cosmic man holds the five unsurpassed abodes, the Anuttara. Four stand at the quarters — Vijaya, Vaijayanta, Jayanta and Aparajita — and above them all, at the crown, stands Sarvarthasiddha, the all-accomplished. The Tattvartha Sutra teaches that the devas of these abodes are of two final births — they take at most one or two human births more, without ever losing right belief, and then attain liberation; and of Sarvarthasiddha it is said the devas there are of a single birth. A soul rises here not by the gift of any god, but by its own shedding of karma — this heaven is merely the last waiting room before the door.",
  "And above the head, at the very summit of the universe, rests Siddhashila — the crescent where every journey ends. The texts say it is forty-five lakh yojana long and wide, resting on a tiny foundation called Ishatpragbhara, just above Sarvarthasiddha. Here dwell the siddhas — the perfected souls, free of every karma, never to be born again. No new soul is created there, and no soul ever leaves; they are beyond number, yet each one arrived by the same road: a human birth, right faith, restraint, and the complete shedding of karma. The whole figure you have travelled — the hells, the world and the heavens — exists only for this. Namo Siddhanam."
],
  SPOTS: [
  { id: 'ratnaprabha',     pos: [0.10, -2.00, 0.62], cam: [1.9, -1.4, 3.4], tgt: [0, -2.0, 0] },
  { id: 'sharkaraprabha',  pos: [0.10, -2.74, 0.66], cam: [1.9, -2.1, 3.4], tgt: [0, -2.74, 0] },
  { id: 'valukaprabha',    pos: [0.10, -3.49, 0.70], cam: [1.9, -2.8, 3.4], tgt: [0, -3.49, 0] },
  { id: 'pankaprabha',     pos: [0.10, -4.23, 0.74], cam: [2.0, -3.5, 3.6], tgt: [0, -4.23, 0] },
  { id: 'dhumaprabha',     pos: [0.10, -4.98, 0.79], cam: [2.1, -4.3, 3.7], tgt: [0, -4.98, 0] },
  { id: 'tamahprabha',     pos: [0.10, -5.72, 0.84], cam: [2.2, -5.0, 3.8], tgt: [0, -5.72, 0] },
  { id: 'mahatamahprabha', pos: [0.10, -6.47, 0.90], cam: [1.6, -6.0, 3.0], tgt: [0, -6.47, 0] },
  { id: 'madhyaloka',      pos: [0.58, -1.28, 0.75], cam: [1.6, -0.9, 3.0], tgt: [0, -1.28, 0.2] },
  { id: 'meru',            pos: [0.06, -1.13, 0.72], cam: [0.8, -0.95, 1.6], tgt: [0, -1.28, 0.35] },
  { id: 'surya',           pos: [0.95, -1.22, 0.10], cam: [1.8, -1.0, 2.4], tgt: [0.4, -1.25, 0] },
  { id: 'chandra',         pos: [-0.75, -1.05, 0.69], cam: [-1.7, -0.7, 2.2], tgt: [-0.3, -1.1, 0.3] },
  { id: 'saudharma',       pos: [0.12, -0.82, 0.55], cam: [2.2, -0.1, 3.8], tgt: [0, -0.82, 0] },
  { id: 'sanatkumara',     pos: [0.12, -0.35, 0.60], cam: [2.2, 0.4, 3.8], tgt: [0, -0.35, 0] },
  { id: 'brahma',          pos: [0.12, 0.13, 0.66], cam: [2.4, 0.9, 3.9], tgt: [0, 0.13, 0] },
  { id: 'lantaka',         pos: [0.12, 0.60, 0.72], cam: [2.5, 1.4, 4.0], tgt: [0, 0.60, 0] },
  { id: 'shukra',          pos: [0.12, 1.07, 0.76], cam: [2.6, 1.9, 4.1], tgt: [0, 1.07, 0] },
  { id: 'shatara',         pos: [0.12, 1.54, 0.76], cam: [2.6, 2.4, 4.1], tgt: [0, 1.54, 0] },
  { id: 'anata',           pos: [0.12, 2.01, 0.72], cam: [2.5, 2.9, 4.0], tgt: [0, 2.01, 0] },
  { id: 'arana',           pos: [0.12, 2.48, 0.66], cam: [2.4, 3.3, 3.9], tgt: [0, 2.48, 0] },
  { id: 'graiveyaka',      pos: [0.05, 3.44, 0.21], cam: [1.2, 3.6, 1.8], tgt: [0, 3.45, 0] },
  { id: 'anudisha',        pos: [0.05, 3.73, 0.23], cam: [1.2, 3.9, 1.8], tgt: [0, 3.75, 0] },
  { id: 'anuttara',        pos: [0.34, 4.35, 0.24], cam: [1.5, 4.5, 1.9], tgt: [0, 4.3, 0] },
  { id: 'sarvarthasiddha', pos: [0.0, 4.98, 0.20], cam: [0.9, 5.15, 1.4], tgt: [0, 4.95, 0] },
  { id: 'siddhashila',     pos: [0.0, 5.45, 0.34], cam: [0.9, 5.6, 2.0], tgt: [0, 5.4, 0] },
  { id: 'trasanadi',       pos: [0.05, 0.90, 0.78], cam: [1.9, 0.9, 3.0], tgt: [0, 0.8, 0] },
  { id: 'vatavalaya',      pos: [1.55, 4.80, 0.50], cam: [3.6, 4.9, 4.6], tgt: [1.4, 4.6, 0.4] }
],
  HOME_CAM: HOME_CAM, HOME_TGT: HOME_TGT,
  VIEW_FLYS: {
  overview: { cam: HOME_CAM, tgt: HOME_TGT },
  adho: { cam: [2.8, -3.2, 6.0], tgt: [0, -3.9, 0] },
  madhyaloka: { cam: [1.7, -0.8, 3.1], tgt: [0, -1.28, 0.15] },
  urdhva: { cam: [3.4, 1.3, 4.8], tgt: [0, 1.1, 0] }
},
  FEMALE_VOICES: ['priya', 'ishita', 'suhani', 'ritu', 'neha', 'pooja', 'simran', 'kavya', 'shreya', 'roopa', 'tanya', 'shruti', 'kavitha', 'rupali']
};
window.Loka.spotText = function (lang, id) { return (lang === 'hi' ? window.Loka.SPOT_HI : window.Loka.SPOT_EN)[id]; };
window.Loka.tourData = function () { return window.Loka.state.lang === 'hi' ? window.Loka.TOUR_HI : window.Loka.TOUR_EN; };
window.Loka.codexData = function () { return window.Loka.state.lang === 'hi' ? window.Loka.CODEX_HI : window.Loka.CODEX_EN; };
window.Loka.narr = function () { return window.Loka.state.lang === 'hi' ? window.Loka.NARR_HI : window.Loka.NARR_EN; };
})();
