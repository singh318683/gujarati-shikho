/*
  Gujarati course content.
  To add another language later, copy this file (e.g. data/marathi.js), change the content and
  the voiceLang code, and load it in index.html instead. The app code does not change.

  L(gu, rom, hint, [exampleGu, exampleRom, exampleEn], needsCheck)   a letter, sound or mark
  W(gu, rom, meaning, extra, needsCheck)                             a word or phrase

  needsCheck = true flags items a native speaker should double-check (shown with a warning on the Review screen).
  In transliteration, a capital letter (Ta, Da, Na, La, Sha) marks a curled-back "retroflex" sound.
*/
(function () {
  const L = (gu, rom, hint, ex, check) => ({
    gu, rom, en: hint,
    ex: ex ? { gu: ex[0], rom: ex[1], en: ex[2] } : null,
    check: !!check
  });
  const W = (gu, rom, en, extra, check) => ({ gu, rom, en, extra: extra || '', check: !!check });

  window.COURSE = {
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    voiceLang: 'gu',
    levels: [
      { id: 1, title: 'Script and sounds', sub: 'Learn to read the letters' },
      { id: 2, title: 'Everyday words', sub: 'Greetings, family, food and more' }
    ],
    lessons: [
      /* ---------------- Level 1: script ---------------- */
      {
        id: 'v1', level: 1, kind: 'letter', icon: 'અ', title: 'Vowels 1',
        tip: 'Gujarati vowels come in short and long pairs. The long one is held about twice as long.',
        items: [
          L('અ', 'a', "like the a in 'about'"),
          L('આ', 'aa', "like the a in 'father' (long)"),
          L('ઇ', 'i', "like the i in 'bit'"),
          L('ઈ', 'ee', "like the ee in 'feet' (long)")
        ]
      },
      {
        id: 'v2', level: 1, kind: 'letter', icon: 'ઉ', title: 'Vowels 2',
        items: [
          L('ઉ', 'u', "like the u in 'put'"),
          L('ઊ', 'oo', "like the oo in 'food' (long)"),
          L('એ', 'e', "like the e in 'they'"),
          L('ઐ', 'ai', "like the ai in 'air'", null, true)
        ]
      },
      {
        id: 'v3', level: 1, kind: 'letter', icon: 'ઓ', title: 'Vowels 3',
        tip: 'The dot (અં) adds a nasal sound and the two dots (અઃ) add a soft breath. You will see both in real words.',
        items: [
          L('ઓ', 'o', "like the o in 'go'"),
          L('ઔ', 'au', "like the ow in 'cow'", null, true),
          L('અં', 'an', "a nasal 'an', like the ng in 'song'"),
          L('અઃ', 'ah', "the vowel followed by a soft breath")
        ]
      },
      {
        id: 'c1', level: 1, kind: 'letter', icon: 'ક', title: 'K and G sounds',
        tip: 'Every consonant carries a built-in short "a". Letters with an h in the transliteration are said with a puff of air.',
        items: [
          L('ક', 'ka', "k as in 'sky'", ['કમળ', 'kamal', 'lotus']),
          L('ખ', 'kha', 'k with a puff of air', ['ખેતર', 'khetar', 'field']),
          L('ગ', 'ga', "g as in 'go'", ['ગાય', 'gaay', 'cow']),
          L('ઘ', 'gha', 'g with a puff of air', ['ઘર', 'ghar', 'house'])
        ]
      },
      {
        id: 'c2', level: 1, kind: 'letter', icon: 'ચ', title: 'CH and J sounds',
        items: [
          L('ચ', 'cha', "ch as in 'chair'", ['ચમચી', 'chamchi', 'spoon']),
          L('છ', 'chha', 'ch with a puff of air', ['છત્રી', 'chhatri', 'umbrella']),
          L('જ', 'ja', "j as in 'jam'", ['જળ', 'jal', 'water']),
          L('ઝ', 'jha', 'j with a puff of air', ['ઝાડ', 'jhaad', 'tree'])
        ]
      },
      {
        id: 'c3', level: 1, kind: 'letter', icon: 'ટ', title: 'Hard T and D sounds',
        tip: 'These five are made with the tongue tip curled back. We write them with a capital letter (Ta, Da) to tell them apart from the softer ત and દ in the next lesson.',
        items: [
          L('ટ', 'Ta', 'a hard t, tongue curled back', ['ટામેટું', 'taametu', 'tomato']),
          L('ઠ', 'Tha', 'a hard t with a puff of air', ['ઠંડી', 'thandi', 'cold']),
          L('ડ', 'Da', 'a hard d, tongue curled back', ['ડોલ', 'dol', 'bucket']),
          L('ઢ', 'Dha', 'a hard d with a puff of air', ['ઢોલ', 'dhol', 'drum']),
          L('ણ', 'Na', 'n with the tongue curled back', ['બાણ', 'baan', 'arrow'])
        ]
      },
      {
        id: 'c4', level: 1, kind: 'letter', icon: 'ત', title: 'Soft T and D sounds',
        items: [
          L('ત', 'ta', 'a soft t, tongue touching the teeth', ['તારો', 'taaro', 'star']),
          L('થ', 'tha', 'a soft t with a puff of air', ['થાળી', 'thaali', 'plate']),
          L('દ', 'da', 'a soft d, tongue touching the teeth', ['દૂધ', 'doodh', 'milk']),
          L('ધ', 'dha', 'a soft d with a puff of air', ['ધન', 'dhan', 'wealth']),
          L('ન', 'na', "n as in 'no'", ['નદી', 'nadi', 'river'])
        ]
      },
      {
        id: 'c5', level: 1, kind: 'letter', icon: 'પ', title: 'P and B sounds',
        items: [
          L('પ', 'pa', "p as in 'spin'", ['પતંગ', 'patang', 'kite']),
          L('ફ', 'pha', 'p with a puff of air', ['ફળ', 'phal', 'fruit']),
          L('બ', 'ba', "b as in 'boy'", ['બિલાડી', 'bilaadi', 'cat']),
          L('ભ', 'bha', 'b with a puff of air', ['ભાત', 'bhaat', 'rice']),
          L('મ', 'ma', "m as in 'man'", ['માછલી', 'maachhli', 'fish'])
        ]
      },
      {
        id: 'c6', level: 1, kind: 'letter', icon: 'ય', title: 'Y, R, L and V',
        items: [
          L('ય', 'ya', "y as in 'yes'", ['યાદ', 'yaad', 'memory']),
          L('ર', 'ra', 'r, lightly rolled', ['રાત', 'raat', 'night']),
          L('લ', 'la', "l as in 'love'", ['લીંબુ', 'limbu', 'lemon']),
          L('વ', 'va', 'between a v and a w', ['વાદળ', 'vaadal', 'cloud'])
        ]
      },
      {
        id: 'c7', level: 1, kind: 'letter', icon: 'શ', title: 'S, SH and H',
        items: [
          L('શ', 'sha', "sh as in 'shop'", ['શાળા', 'shaala', 'school']),
          L('ષ', 'Sha', 'sh with the tongue curled back; sounds close to શ', null, true),
          L('સ', 'sa', "s as in 'sun'", ['સફરજન', 'safarjan', 'apple']),
          L('હ', 'ha', "h as in 'home'", ['હાથ', 'haath', 'hand']),
          L('ળ', 'La', 'an l with the tongue curled back', ['કાળો', 'kaalo', 'black'], true)
        ]
      },
      {
        id: 'm1', level: 1, kind: 'letter', icon: 'કા', title: 'Vowel marks 1',
        tip: 'After a consonant, a vowel is written as a small mark on the letter instead of the full vowel. Here they are on ક.',
        items: [
          L('કા', 'kaa', 'the ા mark makes it long: kaa'),
          L('કિ', 'ki', 'the િ mark makes it: ki'),
          L('કી', 'kee', 'the ી mark makes it long: kee'),
          L('કુ', 'ku', 'the ુ mark makes it: ku'),
          L('કૂ', 'koo', 'the ૂ mark makes it long: koo')
        ]
      },
      {
        id: 'm2', level: 1, kind: 'letter', icon: 'કે', title: 'Vowel marks 2',
        items: [
          L('કે', 'ke', 'the ે mark makes it: ke'),
          L('કૈ', 'kai', 'the ૈ mark makes it: kai'),
          L('કો', 'ko', 'the ો mark makes it: ko'),
          L('કૌ', 'kau', 'the ૌ mark makes it: kau'),
          L('કં', 'kan', 'the ં dot adds a nasal sound: kan')
        ]
      },
      {
        id: 'j1', level: 1, kind: 'letter', icon: 'ક્ષ', title: 'Joined letters',
        tip: 'When two consonants meet with no vowel between them, they join into one shape.',
        items: [
          L('ક્ષ', 'ksha', 'ક and ષ joined', ['ક્ષમા', 'kshamaa', 'forgiveness']),
          L('જ્ઞ', 'gna', 'જ and ઞ joined; said gna', ['જ્ઞાન', 'gnaan', 'knowledge'], true),
          L('ત્ર', 'tra', 'ત and ર joined', ['ત્રણ', 'tran', 'three']),
          L('શ્ર', 'shra', 'શ and ર joined', ['શ્રી', 'shree', 'a respectful title, like Mr.'])
        ]
      },
      {
        id: 'w1', level: 1, kind: 'word', icon: 'કમળ', title: 'Your first words',
        tip: 'Sound each word out letter by letter, then check it.',
        items: [
          W('કમળ', 'kamal', 'lotus'),
          W('ઘર', 'ghar', 'house'),
          W('જળ', 'jal', 'water'),
          W('નદી', 'nadi', 'river'),
          W('દૂધ', 'doodh', 'milk')
        ]
      },
      {
        id: 'w2', level: 1, kind: 'word', icon: 'હાથ', title: 'More words to read',
        items: [
          W('હાથ', 'haath', 'hand'),
          W('ભાત', 'bhaat', 'rice'),
          W('રાત', 'raat', 'night'),
          W('ગાય', 'gaay', 'cow'),
          W('ફળ', 'phal', 'fruit'),
          W('તારો', 'taaro', 'star')
        ]
      },
      {
        id: 'cp1', level: 1, kind: 'checkpoint', icon: '✓', title: 'Script checkpoint',
        from: ['v1', 'v2', 'v3', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'w1', 'w2'], count: 10
      },

      /* ---------------- Level 2: everyday words ---------------- */
      {
        id: 'g1', level: 2, kind: 'word', icon: '👋', title: 'Greetings',
        tip: 'કેમ છો? is the everyday way to ask how someone is. A common reply is મજામાં.',
        items: [
          W('નમસ્તે', 'namaste', 'hello'),
          W('કેમ છો?', 'kem chho?', 'how are you?'),
          W('મજામાં', 'majaa maa', "I'm doing well"),
          W('આભાર', 'aabhaar', 'thank you'),
          W('આવજો', 'aavjo', 'goodbye')
        ]
      },
      {
        id: 'g2', level: 2, kind: 'word', icon: '🌅', title: 'More greetings',
        tip: 'જય શ્રી કૃષ્ણ is a warm, traditional greeting used by many Gujarati families.',
        items: [
          W('જય શ્રી કૃષ્ણ', 'jay shree krishna', 'hello (traditional greeting)'),
          W('સુપ્રભાત', 'suprabhaat', 'good morning'),
          W('શુભ રાત્રિ', 'shubh raatri', 'good night'),
          W('માફ કરજો', 'maaf karjo', 'sorry / excuse me'),
          W('મહેરબાની કરીને', 'meherbaani karine', 'please')
        ]
      },
      {
        id: 'i1', level: 2, kind: 'word', icon: '🙋', title: 'I, you and yes/no',
        items: [
          W('હું', 'hu', 'I'),
          W('તમે', 'tame', 'you (polite)'),
          W('તે', 'te', 'he / she / that'),
          W('હા', 'haa', 'yes'),
          W('ના', 'naa', 'no')
        ]
      },
      {
        id: 'i2', level: 2, kind: 'word', icon: '💬', title: 'Introduce yourself',
        items: [
          W('મારું નામ રાજ છે', 'maaru naam raaj chhe', 'my name is Raj'),
          W('તમારું નામ શું છે?', 'tamaaru naam shu chhe?', 'what is your name?'),
          W('હું ગુજરાતી શીખું છું', 'hu gujaraati shikhu chhu', 'I am learning Gujarati'),
          W('આ શું છે?', 'aa shu chhe?', 'what is this?'),
          W('મને ગમે છે', 'mane game chhe', 'I like it')
        ]
      },
      {
        id: 'f1', level: 2, kind: 'word', icon: '👪', title: 'Family',
        items: [
          W('મમ્મી', 'mummy', 'mother'),
          W('પપ્પા', 'pappa', 'father'),
          W('ભાઈ', 'bhaai', 'brother'),
          W('બહેન', 'bahen', 'sister'),
          W('બા', 'baa', 'grandmother')
        ]
      },
      {
        id: 'f2', level: 2, kind: 'word', icon: '👵', title: 'Grandparents',
        tip: "Gujarati has different words for your father's side (દાદા, દાદી) and your mother's side (નાના, નાની).",
        items: [
          W('દાદા', 'daada', "grandfather (father's side)"),
          W('દાદી', 'daadi', "grandmother (father's side)"),
          W('નાના', 'naana', "grandfather (mother's side)"),
          W('નાની', 'naani', "grandmother (mother's side)")
        ]
      },
      {
        id: 'f3', level: 2, kind: 'word', icon: '🧑‍🤝‍🧑', title: 'Aunts and uncles',
        tip: 'Aunts and uncles also have different names depending on which side of the family they are on.',
        items: [
          W('કાકા', 'kaaka', "father's brother"),
          W('ફોઈ', 'foi', "father's sister"),
          W('મામા', 'maama', "mother's brother"),
          W('માસી', 'maasi', "mother's sister")
        ]
      },
      {
        id: 'n1', level: 2, kind: 'word', icon: '🔢', title: 'Numbers 1 to 5',
        tip: 'Gujarati has its own digits, shown under each number.',
        items: [
          W('એક', 'ek', 'one', '૧'),
          W('બે', 'be', 'two', '૨'),
          W('ત્રણ', 'tran', 'three', '૩'),
          W('ચાર', 'chaar', 'four', '૪'),
          W('પાંચ', 'paanch', 'five', '૫')
        ]
      },
      {
        id: 'n2', level: 2, kind: 'word', icon: '🔟', title: 'Numbers 6 to 10',
        items: [
          W('છ', 'chha', 'six', '૬'),
          W('સાત', 'saat', 'seven', '૭'),
          W('આઠ', 'aath', 'eight', '૮'),
          W('નવ', 'nav', 'nine', '૯'),
          W('દસ', 'das', 'ten', '૧૦')
        ]
      },
      {
        id: 'd1', level: 2, kind: 'word', icon: '📅', title: 'Days of the week 1',
        items: [
          W('સોમવાર', 'somvaar', 'Monday'),
          W('મંગળવાર', 'mangalvaar', 'Tuesday'),
          W('બુધવાર', 'budhvaar', 'Wednesday'),
          W('ગુરુવાર', 'guruvaar', 'Thursday')
        ]
      },
      {
        id: 'd2', level: 2, kind: 'word', icon: '🗓️', title: 'Days of the week 2',
        items: [
          W('શુક્રવાર', 'shukravaar', 'Friday'),
          W('શનિવાર', 'shanivaar', 'Saturday'),
          W('રવિવાર', 'ravivaar', 'Sunday')
        ]
      },
      {
        id: 'col1', level: 2, kind: 'word', icon: '🎨', title: 'Colours',
        tip: 'Colour words ending in -o (પીળો, લીલો, કાળો) change their ending to match what they describe. You will meet that later.',
        items: [
          W('લાલ', 'laal', 'red'),
          W('વાદળી', 'vaadali', 'blue'),
          W('પીળો', 'peelo', 'yellow'),
          W('લીલો', 'leelo', 'green'),
          W('કાળો', 'kaalo', 'black'),
          W('સફેદ', 'safed', 'white')
        ]
      },
      {
        id: 'food1', level: 2, kind: 'word', icon: '🥛', title: 'Food and drink',
        items: [
          W('પાણી', 'paani', 'water'),
          W('દૂધ', 'doodh', 'milk'),
          W('ચા', 'chaa', 'tea'),
          W('ભાત', 'bhaat', 'rice'),
          W('દાળ', 'daal', 'lentil soup'),
          W('રોટલી', 'rotli', 'flatbread')
        ]
      },
      {
        id: 'food2', level: 2, kind: 'word', icon: '🍛', title: 'Gujarati favourites',
        items: [
          W('ઢોકળા', 'dhokla', 'steamed savoury cake'),
          W('થેપલા', 'thepla', 'spiced flatbread'),
          W('ખાખરા', 'khakhra', 'thin crisp cracker'),
          W('ખીચડી', 'khichdi', 'rice and lentil dish'),
          W('મીઠાઈ', 'mithaai', 'sweets'),
          W('શાક', 'shaak', 'vegetable dish')
        ]
      },
      {
        id: 'home1', level: 2, kind: 'word', icon: '🏠', title: 'Around the home',
        items: [
          W('ઘર', 'ghar', 'house'),
          W('દરવાજો', 'darvaajo', 'door'),
          W('બારી', 'baari', 'window'),
          W('ખુરશી', 'khurshi', 'chair'),
          W('પલંગ', 'palang', 'bed'),
          W('ચાવી', 'chaavi', 'key')
        ]
      },
      {
        id: 'verb1', level: 2, kind: 'word', icon: '🚶', title: 'Action words 1',
        tip: 'Gujarati verbs in their basic form end in -vu, like જવું. That ending means "to ...".',
        items: [
          W('જવું', 'javu', 'to go'),
          W('આવવું', 'aavvu', 'to come'),
          W('ખાવું', 'khaavu', 'to eat'),
          W('પીવું', 'peevu', 'to drink'),
          W('જોવું', 'jovu', 'to see')
        ]
      },
      {
        id: 'verb2', level: 2, kind: 'word', icon: '📖', title: 'Action words 2',
        items: [
          W('વાંચવું', 'vaanchvu', 'to read'),
          W('લખવું', 'lakhvu', 'to write'),
          W('બોલવું', 'bolvu', 'to speak'),
          W('સૂવું', 'soovu', 'to sleep'),
          W('રમવું', 'ramvu', 'to play')
        ]
      },
      {
        id: 'ph1', level: 2, kind: 'word', icon: '🗣️', title: 'Useful phrases',
        tip: 'મને થોડું ગુજરાતી આવડે છે is a handy line when someone speaks to you too fast.',
        items: [
          W('કેટલા પૈસા?', 'ketla paisa?', 'how much (money)?'),
          W('મને સમજાતું નથી', 'mane samjaatu nathi', "I don't understand"),
          W('ફરીથી કહો', 'pharithi kaho', 'please say it again'),
          W('ધીમે બોલો', 'dheeme bolo', 'please speak slowly'),
          W('મને થોડું ગુજરાતી આવડે છે', 'mane thodu gujaraati aavde chhe', 'I know a little Gujarati')
        ]
      },
      {
        id: 'fest1', level: 2, kind: 'word', icon: '🪔', title: 'Festivals',
        tip: 'Uttarayan, in mid-January, is the kite festival, when the sky fills with colourful patang.',
        items: [
          W('નવરાત્રિ', 'navraatri', 'nine-night festival'),
          W('ગરબા', 'garba', 'folk dance of Navratri'),
          W('ઉત્તરાયણ', 'uttaraayan', 'kite festival'),
          W('દિવાળી', 'divaali', 'festival of lights'),
          W('હોળી', 'holi', 'festival of colours'),
          W('રક્ષાબંધન', 'rakshaabandhan', 'festival of brothers and sisters')
        ]
      },
      {
        id: 'cp2', level: 2, kind: 'checkpoint', icon: '✓', title: 'Everyday words checkpoint',
        from: ['g1', 'g2', 'i1', 'i2', 'f1', 'f2', 'f3', 'n1', 'n2', 'd1', 'd2', 'col1', 'food1', 'food2', 'home1', 'verb1', 'verb2', 'ph1', 'fest1'],
        count: 12
      }
    ]
  };
})();
