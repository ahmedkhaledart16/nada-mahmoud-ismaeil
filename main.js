import './style.css';

/* ============================================
   ادعوا لندى محمود إسماعيل — Main Script
   Modular vanilla JS. Event delegation,
   DocumentFragment, no duplicate DOM queries.
   ============================================ */

/* ---------- Data ---------- */

const VERSES = [
  { text: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ', ref: 'الشعراء: 80' },
  { text: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ', ref: 'الإسراء: 82' },
  { text: 'قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ', ref: 'فصلت: 44' },
  { text: 'رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ', ref: 'الأنبياء: 83' },
  { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
];

/* Each prayer gets a category: quran | sunna | general */
const PRAYERS = [
  { text: 'اللهم اشفِ ندى محمود إسماعيل شفاءً لا يغادر سقمًا، وألبسها ثوب الصحة والعافية.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم رب الناس، أذهب البأس، واشفِ ندى أنت الشافي، لا شفاء إلا شفاؤك، شفاءً لا يغادر سقمًا.', source: 'متفق عليه', cat: 'sunna' },
  { text: 'اللهم اشفها، اللهم عافها، اللهم ارحمها، اللهم اجعل ما أصابها تكفيرًا لذنوبها ورفعةً في درجاتها.', source: 'دعاء عام', cat: 'general' },
  { text: 'أسأل الله العظيم رب العرش العظيم أن يشفي ندى.', source: 'أبو داود', cat: 'sunna' },
  { text: 'بسم الله أرقيك، من كل شيء يؤذيك، من شر كل نفس أو عين حاسد، الله يشفيك، بسم الله أرقيك.', source: 'مسلم', cat: 'sunna' },
  { text: 'اللهم اشفها شفاءً عاجلًا، وألبسها ثوب الصحة والعافية، واجعل ما أصابها طهورًا لها.', source: 'دعاء عام', cat: 'general' },
  { text: 'لا إله إلا الله الحليم الكريم، سبحان الله رب العرش العظيم، الحمد لله رب العالمين، اللهم ارحمني واشفِ عبدتك ندى.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم يا شافي يا كافي، اشفِ ندى شفاءً لا يغادر سقمًا، يا أرحم الراحمين.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إني أسألك بأنك أنت الله لا إله إلا أنت، الأحد الصمد، الذي لم يلد ولم يولد، ولم يكن له كفوًا أحد، أن تشفي ندى.', source: 'أبو داود - الترمذي', cat: 'sunna' },
  { text: 'اللهم رب السماوات السبع ورب العرش العظيم، ربنا ورب كل شيء، أنت الظاهر فلا شيء فوقك، وأنت الباطن فلا شيء دونك، اشفِ ندى من كل داء.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، اللهم اجعل لندى من كل هم فرجًا ومن كل ضيق مخرجًا.', source: 'البخاري', cat: 'sunna' },
  { text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة، اللهم أسألك العفو والعافية في ديني ودنياي وأهلي ومالي، اللهم استر عوراتي وآمن روعاتي.', source: 'أبو داود', cat: 'sunna' },
  { text: 'اللهم اشفِ ندى وكل مريض المسلمين، شفاءً لا يغادر سقمًا، يا رب العالمين.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم يا من أمرت بالدعاء ووعدت بالإجابة، اشفِ ندى واجعلها من عبادك الصالحين.', source: 'دعاء عام', cat: 'general' },
  { text: 'سبحان الله وبحمده، سبحان الله العظيم — اللهم بنورك أذهب عن ندى كل داء.', source: 'البخاري - دعاء عام', cat: 'general' },
  { text: 'اللهم إني أسألك من خير ما سألك منه عبادك الصالحون، وأعوذ بك من شر ما استعاذ منه عبادك الصالحون، اللهم اشفِ ندى.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم صلِّ على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم، وبارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم، واشفِ ندى.', source: 'البخاري - دعاء عام', cat: 'general' },
  { text: 'اللهم أذهب عن ندى البأس رب الناس، واشفِها وأنت الشافي، لا شفاء إلا شفاؤك.', source: 'متفق عليه', cat: 'sunna' },
  { text: 'اللهم إنك إن شئت شفيتها، ولا مانع لما أعطيت، ولا معطي لما منعت، فاشفِ ندى يا أرحم الراحمين.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إني أسألك الثبات في الأمر، والعزيمة على الرشد، وأسألك شكر نعمتك، وحسن عبادتك، وأسألك لسانًا صادقًا، وقلبًا سليمًا، وأعوذ بك من شر ما تعلم، وأسألك من خير ما تعلم، وأستغفرك لما تعلم، واشفِ ندى.', source: 'الترمذي - دعاء عام', cat: 'general' },
  { text: 'اللهم احفظ ندى من بين يديها ومن خلفها، وعن يمينها وعن شمالها، ومن فوقها، وأعوذ بعظمتك أن تُغتال من تحتها، واشفها واشف كل مريض.', source: 'أبو داود - دعاء عام', cat: 'general' },
  { text: 'اللهم إني أسألك نعيمًا لا ينفد، وقرة عين لا تنقطع، واشفِ ندى واجعلها من أهل الجنة.', source: 'النسائي - دعاء عام', cat: 'general' },
  { text: 'اللهم اجعل لندى من كل ضيق فرجًا، ومن كل هم مخرجًا، ومن كل بلاء عافية.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إنك قلت وقولك الحق: «ادعوني أستجب لكم»، فهذه دعوتك ربي فاستجب لي كما وعدتني، واشفِ ندى شفاءً تامًا.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم اكشف عن ندى البلاء، وفرج عنها الكرب، وارحم ضعفها، واشفها شفاءً لا يغادر سقمًا.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إني أسألك بأسمائك الحسنى وصفاتك العُلى أن تشفي ندى محمود إسماعيل.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم إن العبدة ندى قد ابتليت في جسدها، فاشفها واصبرها وأجرها على بلائها، يا أرحم الراحمين.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم ألبس ندى ثوب الصحة والعافية عاجلًا غير آجل، وأقر بها أعين أهلها.', source: 'دعاء عام', cat: 'general' },
  { text: 'اللهم يا حي يا قيوم، برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين، واشفِ ندى.', source: 'النسائي - دعاء عام', cat: 'general' },
  { text: 'اللهم اشفِ ندى وكل مريض، اللهم ارحمها برحمتك، واجعل مرضها طهورًا لها وتكفيرًا لسيئاتها.', source: 'دعاء عام', cat: 'general' },
];

const HADITHS = [
  {
    tag: 'الصبر',
    text: 'عَنْ صُهَيْبٍ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «عَجَبًا لِأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لِأَحَدٍ إِلَّا لِلْمُؤْمِنِ؛ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ».',
    ref: 'رواه مسلم (2999)',
  },
  {
    tag: 'المرض',
    text: 'عَنْ أَبِي سَعِيدٍ وَأَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُمَا، عَنِ النَّبِيِّ ﷺ قَالَ: «مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا حَزَنٍ وَلَا أَذًى وَلَا غَمٍّ، حَتَّى الشَّوْكَةِ يُشَاكُهَا، إِلَّا كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ».',
    ref: 'متفق عليه (البخاري 5640، مسلم 2573)',
  },
  {
    tag: 'الدعاء',
    text: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ: «مَنْ سَرَّهُ أَنْ يَسْتَجِيبَ اللَّهُ لَهُ عِنْدَ الْكَرْبِ وَالشَّدَائِدِ، فَلْيُكْثِرِ الدُّعَاءَ فِي الرَّخَاءِ».',
    ref: 'رواه الترمذي (3382) وحسنه',
  },
  {
    tag: 'الدعاء بظهر الغيب',
    text: 'عَنْ أَبِي الدَّرْدَاءِ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ، عِنْدَ رَأْسِهِ مَلَكٌ مُوَكَّلٌ، كُلَّمَا دَعَا لِأَخِيهِ بِخَيْرٍ قَالَ الْمَلَكُ الْمُوَكَّلُ بِهِ: آمِينَ وَلَكَ بِمِثْلٍ».',
    ref: 'رواه مسلم (2733)',
  },
  {
    tag: 'تكفير الذنوب',
    text: 'عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «إِذَا أَرَادَ اللَّهُ بِعَبْدِهِ الْخَيْرَ عَجَّلَ لَهُ الْعُقُوبَةَ فِي الدُّنْيَا، وَإِذَا أَرَادَ اللَّهُ بِعَبْدِهِ الشَّرَّ أَمْسَكَ عَنْهُ بِذَنْبِهِ حَتَّى يُوَفِّيَ بِهِ يَوْمَ الْقِيَامَةِ».',
    ref: 'رواه الترمذي (2396) وحسنه',
  },
  {
    tag: 'عيادة المريض',
    text: 'عَنْ عَلِيٍّ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «مَا مِنْ مُسْلِمٍ يَعُودُ مُسْلِمًا غُدْوَةً إِلَّا صَلَّى عَلَيْهِ سَبْعُونَ أَلْفَ مَلَكٍ حَتَّى يُمْسِيَ، وَإِنْ عَادَهُ مَسَاءً صَلَّى عَلَيْهِ سَبْعُونَ أَلْفَ مَلَكٍ حَتَّى يُصْبِحَ، وَكَانَ لَهُ خَرِيفٌ فِي الْجَنَّةِ».',
    ref: 'رواه الترمذي (3689) وحسنه',
  },
];

const SURAHS = [
  { num: 1, name: 'الفاتحة', ayahs: 7, english: 'Al-Fatihah' },
  { num: 36, name: 'يس', ayahs: 83, english: 'Ya-Sin' },
  { num: 55, name: 'الرحمن', ayahs: 78, english: 'Ar-Rahman' },
  { num: 67, name: 'الملك', ayahs: 30, english: 'Al-Mulk' },
  { num: 56, name: 'الواقعة', ayahs: 96, english: 'Al-Waqi\'ah' },
  { num: 112, name: 'الإخلاص', ayahs: 4, english: 'Al-Ikhlas' },
  { num: 113, name: 'الفلق', ayahs: 5, english: 'Al-Falaq' },
  { num: 114, name: 'الناس', ayahs: 6, english: 'An-Nas' },
];

const ADHKAR = [
  { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', target: 100, virtue: 'حُطَّتْ خطاياه وإن كانت مثل زبد البحر' },
  { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', target: 10, virtue: 'كانت له عدل عشر رقاب' },
  { text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', target: 100, virtue: 'من صلى عليّ صلاة صلى الله عليه بها عشرًا' },
  { text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', target: 100, virtue: 'كنز من كنوز الجنة' },
  { text: 'سُبْحَانَ اللَّهِ الْعَظِيمِ', target: 33, virtue: 'كلمتان خفيفتان على اللسان ثقيلتان في الميزان' },
  { text: 'الْحَمْدُ لِلَّهِ', target: 33, virtue: 'تملأ الميزان' },
  { text: 'اللَّهُ أَكْبَرُ', target: 34, virtue: 'تملأ ما بين السماء والأرض' },
  { text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ', target: 100, virtue: 'كانت له عدل عِتْق رقبة' },
  { text: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ ﷺ نَبِيًّا', target: 3, virtue: 'كان حقًا على الله أن يرضيه' },
];

/* ---------- Utilities ---------- */

const $ = (id) => document.getElementById(id);
const toArabicNum = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
const refreshIcons = () => { if (window.lucide) lucide.createIcons(); };

/* Premium toast — top-left, blur background, auto-hide */
function showToast(msg) {
  const t = $('toast');
  t.innerHTML = '';
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', 'check-circle');
  const span = document.createElement('span');
  span.textContent = msg;
  t.append(icon, span);
  refreshIcons();
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* Smooth number animation with easing */
function animateNumber(el, from, to, duration = 1200) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const val = Math.floor(from + (to - from) * eased);
    el.textContent = toArabicNum(val.toLocaleString('en-US'));
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = toArabicNum(to.toLocaleString('en-US'));
  };
  requestAnimationFrame(step);
}

/* ---------- Render: Verses (DocumentFragment) ---------- */
function renderVerses() {
  const grid = $('verses-grid');
  const frag = document.createDocumentFragment();
  VERSES.forEach((v) => {
    const card = document.createElement('div');
    card.className = 'verse-card reveal';
    const p = document.createElement('p');
    p.className = 'verse-text';
    p.textContent = `﴿${v.text}﴾`;
    const ref = document.createElement('span');
    ref.className = 'verse-ref';
    ref.textContent = v.ref;
    card.append(p, ref);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Render: Prayers (DocumentFragment) ---------- */
function renderPrayers() {
  const grid = $('prayers-grid');
  const frag = document.createDocumentFragment();
  PRAYERS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'prayer-card reveal';
    card.dataset.cat = p.cat;
    card.dataset.index = i;

    const head = document.createElement('div');
    head.className = 'prayer-head';
    const num = document.createElement('span');
    num.className = 'prayer-num';
    num.textContent = toArabicNum(i + 1);
    const src = document.createElement('span');
    src.className = 'prayer-source';
    src.textContent = p.source;
    head.append(num, src);

    const text = document.createElement('p');
    text.className = 'prayer-text';
    text.textContent = p.text;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'prayer-copy';
    copyBtn.type = 'button';
    copyBtn.dataset.copy = i;
    copyBtn.setAttribute('aria-label', 'نسخ الدعاء');
    const copyIcon = document.createElement('i');
    copyIcon.setAttribute('data-lucide', 'copy');
    const copyLabel = document.createElement('span');
    copyLabel.textContent = 'نسخ الدعاء';
    copyBtn.append(copyIcon, copyLabel);

    card.append(head, text, copyBtn);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Render: Hadiths (DocumentFragment) ---------- */
function renderHadiths() {
  const grid = $('hadiths-grid');
  const frag = document.createDocumentFragment();
  HADITHS.forEach((h) => {
    const card = document.createElement('div');
    card.className = 'hadith-card reveal';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'hadith-icon';
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', 'book-marked');
    iconWrap.appendChild(icon);

    const tag = document.createElement('span');
    tag.className = 'hadith-tag';
    tag.textContent = h.tag;

    const text = document.createElement('p');
    text.className = 'hadith-text';
    text.textContent = h.text;

    const ref = document.createElement('p');
    ref.className = 'hadith-ref';
    ref.textContent = h.ref;

    card.append(iconWrap, tag, text, ref);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Render: Surahs (DocumentFragment) ---------- */
function renderSurahs() {
  const grid = $('surahs-grid');
  const frag = document.createDocumentFragment();
  SURAHS.forEach((s) => {
    const card = document.createElement('div');
    card.className = 'surah-card reveal';
    card.dataset.surah = s.num;
    card.dataset.name = s.name;
    card.dataset.ayahs = s.ayahs;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `فتح سورة ${s.name}`);

    const num = document.createElement('div');
    num.className = 'surah-num';
    num.textContent = toArabicNum(s.num);

    const name = document.createElement('h3');
    name.className = 'surah-name';
    name.textContent = `سورة ${s.name}`;

    const meta = document.createElement('p');
    meta.className = 'surah-meta';
    meta.textContent = `${toArabicNum(s.ayahs)} آية`;

    card.append(num, name, meta);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Render: Adhkar (DocumentFragment) ---------- */
function renderAdhkar() {
  const grid = $('adhkar-grid');
  const frag = document.createDocumentFragment();
  ADHKAR.forEach((d, i) => {
    const saved = parseInt(localStorage.getItem(`nada-dhikr-${i}`) || '0', 10);
    const done = saved >= d.target;
    const card = document.createElement('div');
    card.className = 'dhikr-card reveal' + (done ? ' complete' : '');
    card.dataset.dhikr = i;

    const text = document.createElement('p');
    text.className = 'dhikr-text';
    text.textContent = d.text;

    const virtue = document.createElement('p');
    virtue.className = 'dhikr-virtue';
    virtue.textContent = d.virtue;

    const progressWrap = document.createElement('div');
    progressWrap.className = 'dhikr-progress';
    const bar = document.createElement('div');
    bar.className = 'dhikr-progress-bar';
    bar.style.width = Math.min((saved / d.target) * 100, 100) + '%';
    progressWrap.appendChild(bar);

    const counterRow = document.createElement('div');
    counterRow.className = 'dhikr-counter-row';
    const countSpan = document.createElement('span');
    countSpan.className = 'dhikr-count';
    countSpan.textContent = toArabicNum(saved);
    const targetSpan = document.createElement('span');
    targetSpan.className = 'dhikr-target';
    targetSpan.textContent = ' / ' + toArabicNum(d.target);
    counterRow.append(countSpan, targetSpan);

    const tapBtn = document.createElement('button');
    tapBtn.className = 'dhikr-tap';
    tapBtn.type = 'button';
    tapBtn.dataset.dhikr = i;
    tapBtn.setAttribute('aria-label', 'اضغط للعدّ');
    const tapIcon = document.createElement('span');
    tapIcon.className = 'dhikr-tap-icon';
    tapIcon.textContent = done ? '✓' : '🤲';
    const tapLabel = document.createElement('span');
    tapLabel.className = 'dhikr-tap-label';
    tapLabel.textContent = done ? 'تم بحمد الله' : 'اضغط للعدّ';
    tapBtn.append(tapIcon, tapLabel);
    if (done) tapBtn.disabled = true;

    const resetBtn = document.createElement('button');
    resetBtn.className = 'dhikr-reset';
    resetBtn.type = 'button';
    resetBtn.dataset.reset = i;
    resetBtn.setAttribute('aria-label', 'إعادة العداد');
    const resetIcon = document.createElement('i');
    resetIcon.setAttribute('data-lucide', 'rotate-ccw');
    resetBtn.appendChild(resetIcon);

    card.append(text, virtue, progressWrap, counterRow, tapBtn, resetBtn);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Adhkar Counters (event delegation + localStorage) ---------- */
function setupAdhkarCounters() {
  document.addEventListener('click', (e) => {
    const tapBtn = e.target.closest('.dhikr-tap');
    if (tapBtn) {
      const i = +tapBtn.dataset.dhikr;
      const card = tapBtn.closest('.dhikr-card');
      const countEl = card.querySelector('.dhikr-count');
      const bar = card.querySelector('.dhikr-progress-bar');
      const target = ADHKAR[i].target;
      let count = parseInt(localStorage.getItem(`nada-dhikr-${i}`) || '0', 10);
      if (count >= target) return;
      count++;
      localStorage.setItem(`nada-dhikr-${i}`, String(count));
      countEl.textContent = toArabicNum(count);
      countEl.classList.add('counter-pulse');
      setTimeout(() => countEl.classList.remove('counter-pulse'), 500);
      bar.style.width = Math.min((count / target) * 100, 100) + '%';
      if (count >= target) {
        card.classList.add('complete');
        tapBtn.disabled = true;
        tapBtn.querySelector('.dhikr-tap-icon').textContent = '✓';
        tapBtn.querySelector('.dhikr-tap-label').textContent = 'تم بحمد الله';
        showToast('أتممت الذكر — تقبّل الله');
      }
      return;
    }
    const resetBtn = e.target.closest('.dhikr-reset');
    if (resetBtn) {
      const i = +resetBtn.dataset.reset;
      const card = resetBtn.closest('.dhikr-card');
      localStorage.removeItem(`nada-dhikr-${i}`);
      card.querySelector('.dhikr-count').textContent = toArabicNum(0);
      card.querySelector('.dhikr-progress-bar').style.width = '0%';
      card.classList.remove('complete');
      const tap = card.querySelector('.dhikr-tap');
      tap.disabled = false;
      tap.querySelector('.dhikr-tap-icon').textContent = '🤲';
      tap.querySelector('.dhikr-tap-label').textContent = 'اضغط للعدّ';
    }
  });
}

/* ---------- Prayer Counter ---------- */
const COUNTER_KEY = 'nada-duaa-count';
const COUNTER_DONE_KEY = 'nada-duaa-done';
const BASE_COUNT = 0; // starts from zero

function setupCounter() {
  const card = $('counter-card');
  const numEl = $('counter-num');
  const btn = $('counter-btn');
  const alreadyDone = localStorage.getItem(COUNTER_DONE_KEY) === '1';

  // Track current value in a closure (avoids parsing Arabic numerals from DOM)
  let currentValue = BASE_COUNT + (alreadyDone ? 1 : 0);

  // Animate from 0 on first paint
  animateNumber(numEl, 0, currentValue, 1600);

  if (alreadyDone) {
    card.classList.add('done');
    btn.querySelector('span').textContent = 'شكرًا لدعائك 🤲';
    btn.disabled = true;
  }

  btn.addEventListener('click', () => {
    if (localStorage.getItem(COUNTER_DONE_KEY) === '1') return;

    localStorage.setItem(COUNTER_DONE_KEY, '1');
    const next = currentValue + 1;
    animateNumber(numEl, currentValue, next, 600);
    currentValue = next;
    numEl.classList.add('counter-pulse');
    setTimeout(() => numEl.classList.remove('counter-pulse'), 500);

    card.classList.add('done');
    btn.querySelector('span').textContent = 'شكرًا لدعائك 🤲';
    btn.disabled = true;
    showToast('تقبّل الله دعاءك');
  });
}

/* ---------- Ameen Button ---------- */
function setupAmeen() {
  const btn = $('ameen-btn');
  const success = $('ameen-success');

  btn.addEventListener('click', () => {
    btn.classList.add('done');
    success.hidden = false;
    showToast('جزاك الله خيرًا');
    // Re-trigger animation
    success.style.animation = 'none';
    void success.offsetWidth;
    success.style.animation = '';
  });
}

/* ---------- Prayer Search + Category Tabs ---------- */
function setupPrayerFilters() {
  const searchInput = $('prayers-search');
  const tabsContainer = $('prayers-tabs');
  const emptyMsg = $('prayers-empty');
  let activeCat = 'all';
  let searchTerm = '';

  function applyFilters() {
    const cards = document.querySelectorAll('.prayer-card');
    let visibleCount = 0;
    cards.forEach((card) => {
      const cat = card.dataset.cat;
      const idx = parseInt(card.dataset.index, 10);
      const text = PRAYERS[idx].text;
      const matchCat = activeCat === 'all' || cat === activeCat;
      const matchSearch = !searchTerm || text.includes(searchTerm);
      if (matchCat && matchSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    emptyMsg.hidden = visibleCount > 0;
  }

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    applyFilters();
  });

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    activeCat = tab.dataset.cat;
    tabsContainer.querySelectorAll('.tab').forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });
    applyFilters();
  });
}

/* ---------- Copy Prayer (event delegation + icon animation) ---------- */
function setupCopyPrayers() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.prayer-copy');
    if (!btn) return;
    const idx = +btn.dataset.copy;
    navigator.clipboard.writeText(PRAYERS[idx].text).then(() => {
      btn.classList.add('copied');
      const label = btn.querySelector('span');
      const icon = btn.querySelector('i');
      const prevLabel = label.textContent;
      label.textContent = 'تم النسخ';
      icon.setAttribute('data-lucide', 'check');
      refreshIcons();
      showToast('تم نسخ الدعاء');
      setTimeout(() => {
        btn.classList.remove('copied');
        label.textContent = prevLabel;
        icon.setAttribute('data-lucide', 'copy');
        refreshIcons();
      }, 2000);
    });
  });
}

/* ---------- Surah Modal ---------- */
let currentSurahText = '';

async function openSurah(num, name, ayahCount) {
  const modal = $('surah-modal');
  $('modal-surah-name').textContent = `سورة ${name}`;
  $('modal-surah-meta').textContent = `${toArabicNum(ayahCount)} آية • ${toArabicNum(num)}`;
  const body = $('modal-surah-body');
  body.innerHTML = '';
  const loading = document.createElement('div');
  loading.className = 'modal-loading';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  const loadingText = document.createElement('p');
  loadingText.textContent = 'جارٍ تحميل السورة...';
  loading.append(spinner, loadingText);
  body.appendChild(loading);

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  try {
    const res = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${num}`);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    const verses = data.verses || [];
    if (!verses.length) throw new Error('no verses');
    currentSurahText = verses.map((v) => v.text_uthmani).join(' ');

    const frag = document.createDocumentFragment();
    if (num !== 1 && num !== 9) {
      const bism = document.createElement('div');
      bism.className = 'bismillah';
      bism.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
      frag.appendChild(bism);
    }
    verses.forEach((v) => {
      const ayah = document.createElement('span');
      ayah.className = 'ayah';
      const ayahText = document.createTextNode(v.text_uthmani);
      const numSpan = document.createElement('span');
      numSpan.className = 'ayah-num';
      numSpan.textContent = toArabicNum(v.verse_number);
      ayah.append(ayahText, numSpan, document.createTextNode(' '));
      frag.appendChild(ayah);
    });
    body.innerHTML = '';
    body.appendChild(frag);
  } catch (err) {
    body.innerHTML = '';
    const errDiv = document.createElement('div');
    errDiv.className = 'modal-error';
    const errMsg = document.createElement('p');
    errMsg.textContent = 'تعذّر تحميل السورة الآن. يرجى المحاولة مرة أخرى لاحقًا.';
    errDiv.appendChild(errMsg);
    body.appendChild(errDiv);
    currentSurahText = '';
  }
}

function closeSurahModal() {
  const modal = $('surah-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupSurahModal() {
  // Event delegation for surah cards + close buttons
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.surah-card');
    if (card) {
      openSurah(+card.dataset.surah, card.dataset.name, +card.dataset.ayahs);
      return;
    }
    if (e.target.closest('[data-close-modal]')) closeSurahModal();
  });

  // Keyboard: Enter/Space to open surah card, Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSurahModal(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.classList?.contains('surah-card')) {
      e.preventDefault();
      const card = document.activeElement;
      openSurah(+card.dataset.surah, card.dataset.name, +card.dataset.ayahs);
    }
  });

  $('modal-copy-surah').addEventListener('click', () => {
    if (!currentSurahText) { showToast('لا يوجد نص لنسخه'); return; }
    navigator.clipboard.writeText(currentSurahText).then(() => showToast('تم نسخ السورة'));
  });
}

/* ---------- Share (improved message + icon animation) ---------- */
function setupShare() {
  const pageUrl = window.location.href;
  const shareText = '🤲 ربما تكون دعوتك هي الأقرب للإجابة.\nخصص دقيقة لقراءة قصة ندى والدعاء لها.';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.share-btn');
    if (!btn) return;
    const type = btn.dataset.share;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(shareText);

    if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank', 'noopener');
    } else if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank', 'noopener');
    } else if (type === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank', 'noopener');
    } else if (type === 'copy') {
      navigator.clipboard.writeText(pageUrl).then(() => {
        btn.classList.add('copied');
        const label = btn.querySelector('span');
        const icon = btn.querySelector('i');
        const prevLabel = label.textContent;
        label.textContent = 'تم النسخ';
        icon.setAttribute('data-lucide', 'check');
        refreshIcons();
        showToast('تم نسخ الرابط');
        setTimeout(() => {
          btn.classList.remove('copied');
          label.textContent = prevLabel;
          icon.setAttribute('data-lucide', 'link');
          refreshIcons();
        }, 2000);
      });
    }
  });
}

/* ---------- Navbar ---------- */
function setupNavbar() {
  const navbar = $('navbar');
  const toggle = $('nav-toggle');
  const links = $('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Scroll Progress & Back to Top ---------- */
function setupScrollUI() {
  const progress = $('scroll-progress');
  const backTop = $('back-to-top');

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = pct + '%';
    backTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Theme Toggle ---------- */
function setupTheme() {
  const toggle = $('theme-toggle');
  const saved = localStorage.getItem('nada-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.innerHTML = '<i data-lucide="sun"></i>';
  } else {
    toggle.innerHTML = '<i data-lucide="moon"></i>';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('nada-theme', 'light');
      toggle.innerHTML = '<i data-lucide="moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('nada-theme', 'dark');
      toggle.innerHTML = '<i data-lucide="sun"></i>';
    }
    refreshIcons();
  });
}

/* ---------- Scroll Reveal ---------- */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ---------- Loading Screen ---------- */
function setupLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => $('loader').classList.add('hidden'), 400);
  });
}

/* ---------- Footer Year ---------- */
function setupYear() {
  $('year').textContent = toArabicNum(new Date().getFullYear());
}

/* ---------- Init ---------- */
function init() {
  renderVerses();
  renderPrayers();
  renderHadiths();
  renderSurahs();
  renderAdhkar();

  setupNavbar();
  setupScrollUI();
  setupTheme();
  setupCounter();
  setupAmeen();
  setupPrayerFilters();
  setupCopyPrayers();
  setupAdhkarCounters();
  setupSurahModal();
  setupShare();
  setupReveal();
  setupLoader();
  setupYear();

  // Re-render lucide icons after dynamic content injection
  refreshIcons();
  // Defer in case lucide script loads after this module
  setTimeout(refreshIcons, 300);
}

document.addEventListener('DOMContentLoaded', init);
