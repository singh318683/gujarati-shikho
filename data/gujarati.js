/*
  Gujarati course content, built for SPEAKING: listening, understanding and answering.
  Learners see transliteration (English-style spelling) and hear audio. Gujarati script is only
  shown if the learner turns it on in Testing tools. The script is still needed here because it
  is what the audio generator reads aloud.

  P(gujarati, said as, meaning, needsCheck, note)   a phrase or word
  N(gujarati, said as, meaning, digit)              a number

  pairs: [[a, b], ...] are small conversations inside a lesson: item a is heard, item b is the reply.
  needsCheck = true flags items a native speaker should double-check first.
  Audio file names come from the "said as" text, e.g. "kem chho?" -> audio/kem-chho.mp3
  and audio/kem-chho-slow.mp3
*/
(function () {
  const P = (gu, rom, en, check, note) => ({ gu, rom, en, extra: '', note: note || '', check: !!check });
  const N = (gu, rom, en, digit) => ({ gu, rom, en, extra: digit, note: '', check: false });

  window.COURSE = {
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    voiceLang: 'gu',
    levels: [
      { id: 1, title: 'First conversations', sub: 'Greetings, names and asking for help' },
      { id: 2, title: 'Family', sub: 'Talk about the people in your life' },
      { id: 3, title: 'Daily life', sub: 'Numbers, food, shopping and getting around' },
      { id: 4, title: 'Festivals and fun', sub: 'Wishes, kites and garba' }
    ],
    lessons: [
      /* ---------------- Level 1: first conversations ---------------- */
      {
        id: 'a1', level: 1, kind: 'phrase', icon: '👋', title: 'Hello and goodbye',
        tip: "Say 'chh' as a ch with a small puff of air. A double letter like 'aa' is a long sound, like the a in 'father'.",
        items: [
          P('નમસ્તે', 'namaste', 'hello'),
          P('કેમ છો?', 'kem chho?', 'how are you?'),
          P('મજામાં', 'majaa maa', "I'm doing well"),
          P('આભાર', 'aabhaar', 'thank you'),
          P('આવજો', 'aavjo', 'goodbye')
        ],
        pairs: [[1, 2]]
      },
      {
        id: 'a2', level: 1, kind: 'phrase', icon: '🙏', title: 'Polite words',
        tip: 'જય શ્રી કૃષ્ણ (jay shree krishna) is a warm, traditional greeting used by many Gujarati families.',
        items: [
          P('જય શ્રી કૃષ્ણ', 'jay shree krishna', 'hello (traditional greeting)'),
          P('સુપ્રભાત', 'suprabhaat', 'good morning'),
          P('શુભ રાત્રિ', 'shubh raatri', 'good night'),
          P('માફ કરજો', 'maaf karjo', 'sorry / excuse me'),
          P('કોઈ વાંધો નહીં', 'koi vaandho nahi', 'no problem', true)
        ],
        pairs: [[3, 4]]
      },
      {
        id: 'a3', level: 1, kind: 'phrase', icon: '✅', title: 'Yes, no and maybe',
        items: [
          P('હા', 'haa', 'yes'),
          P('ના', 'naa', 'no'),
          P('કદાચ', 'kadaach', 'maybe'),
          P('ખબર નથી', 'khabar nathi', "I don't know"),
          P('સારું', 'saaru', 'okay / good'),
          P('ઠીક છે', 'theek chhe', "it's fine")
        ]
      },
      {
        id: 'a4', level: 1, kind: 'phrase', icon: '💬', title: 'Your name and where you live',
        items: [
          P('તમારું નામ શું છે?', 'tamaaru naam shu chhe?', 'what is your name?'),
          P('મારું નામ રાજ છે', 'maaru naam raaj chhe', 'my name is Raj'),
          P('તમે ક્યાં રહો છો?', 'tame kyaa raho chho?', 'where do you live?'),
          P('હું અમેરિકામાં રહું છું', 'hu amerikaa maa rahu chhu', 'I live in America'),
          P('તમને મળીને આનંદ થયો', 'tamne maline aanand thayo', 'nice to meet you', true)
        ],
        pairs: [[0, 1], [2, 3]]
      },
      {
        id: 'a5', level: 1, kind: 'phrase', icon: '🤔', title: "When you don't understand",
        tip: 'These are your safety net. Using them early in a real conversation makes people slow down and help you.',
        items: [
          P('મને સમજાતું નથી', 'mane samjaatu nathi', "I don't understand"),
          P('ફરીથી કહો', 'pharithi kaho', 'please say it again'),
          P('ધીમે બોલો', 'dheeme bolo', 'please speak slowly'),
          P('ગુજરાતીમાં શું કહેવાય?', 'gujaraati maa shu kahevaay?', 'how do you say this in Gujarati?', true),
          P('મને થોડું ગુજરાતી આવડે છે', 'mane thodu gujaraati aavde chhe', 'I know a little Gujarati'),
          P('તમને ગુજરાતી આવડે છે?', 'tamne gujaraati aavde chhe?', 'do you know Gujarati?')
        ],
        pairs: [[5, 4]]
      },
      {
        id: 'cp1', level: 1, kind: 'checkpoint', icon: '✓', title: 'First conversations checkpoint',
        from: ['a1', 'a2', 'a3', 'a4', 'a5'], count: 10
      },

      /* ---------------- Level 2: family ---------------- */
      {
        id: 'f1', level: 2, kind: 'word', icon: '👪', title: 'Immediate family',
        items: [
          P('મમ્મી', 'mummy', 'mother'),
          P('પપ્પા', 'pappa', 'father'),
          P('ભાઈ', 'bhaai', 'brother'),
          P('બહેન', 'bahen', 'sister'),
          P('પરિવાર', 'parivaar', 'family')
        ]
      },
      {
        id: 'f2', level: 2, kind: 'word', icon: '👵', title: 'Grandparents',
        tip: "Gujarati has different words for your father's side (દાદા, દાદી) and your mother's side (નાના, નાની).",
        items: [
          P('દાદા', 'daada', "grandfather (father's side)"),
          P('દાદી', 'daadi', "grandmother (father's side)"),
          P('નાના', 'naana', "grandfather (mother's side)"),
          P('નાની', 'naani', "grandmother (mother's side)")
        ]
      },
      {
        id: 'f3', level: 2, kind: 'word', icon: '🧑‍🤝‍🧑', title: 'Aunts and uncles',
        tip: 'Aunts and uncles also have different names depending on which side of the family they are on.',
        items: [
          P('કાકા', 'kaaka', "father's brother"),
          P('કાકી', 'kaaki', "father's brother's wife"),
          P('ફોઈ', 'foi', "father's sister", true),
          P('મામા', 'maama', "mother's brother"),
          P('મામી', 'maami', "mother's brother's wife"),
          P('માસી', 'maasi', "mother's sister")
        ]
      },
      {
        id: 'f4', level: 2, kind: 'phrase', icon: '🏠', title: 'Introduce your family',
        tip: 'Notice મારો (maaro) with a brother, મારી (maari) with a sister or mother. The word for "my" changes to match.',
        items: [
          P('આ મારો ભાઈ છે', 'aa maaro bhaai chhe', 'this is my brother'),
          P('આ મારી બહેન છે', 'aa maari bahen chhe', 'this is my sister'),
          P('આ મારી મમ્મી છે', 'aa maari mummy chhe', 'this is my mother'),
          P('આ મારા પપ્પા છે', 'aa maara pappa chhe', 'this is my father'),
          P('તમારા પરિવારમાં કોણ કોણ છે?', 'tamaara parivaar maa kon kon chhe?', 'who is in your family?', true),
          P('મારા પરિવારમાં ચાર લોકો છે', 'maara parivaar maa chaar loko chhe', 'there are four people in my family', true)
        ],
        pairs: [[4, 5]]
      },
      {
        id: 'cp2', level: 2, kind: 'checkpoint', icon: '✓', title: 'Family checkpoint',
        from: ['f1', 'f2', 'f3', 'f4'], count: 10
      },

      /* ---------------- Level 3: daily life ---------------- */
      {
        id: 'd1', level: 3, kind: 'word', icon: '🔢', title: 'Numbers 1 to 5',
        items: [
          N('એક', 'ek', 'one', '1'),
          N('બે', 'be', 'two', '2'),
          N('ત્રણ', 'tran', 'three', '3'),
          N('ચાર', 'chaar', 'four', '4'),
          N('પાંચ', 'paanch', 'five', '5')
        ]
      },
      {
        id: 'd2', level: 3, kind: 'word', icon: '🔟', title: 'Numbers 6 to 10',
        items: [
          N('છ', 'chha', 'six', '6'),
          N('સાત', 'saat', 'seven', '7'),
          N('આઠ', 'aath', 'eight', '8'),
          N('નવ', 'nav', 'nine', '9'),
          N('દસ', 'das', 'ten', '10')
        ]
      },
      {
        id: 'd3', level: 3, kind: 'word', icon: '📅', title: 'Days of the week',
        items: [
          P('સોમવાર', 'somvaar', 'Monday'),
          P('મંગળવાર', 'mangalvaar', 'Tuesday'),
          P('બુધવાર', 'budhvaar', 'Wednesday'),
          P('ગુરુવાર', 'guruvaar', 'Thursday'),
          P('શુક્રવાર', 'shukravaar', 'Friday'),
          P('શનિવાર', 'shanivaar', 'Saturday'),
          P('રવિવાર', 'ravivaar', 'Sunday')
        ]
      },
      {
        id: 'd4', level: 3, kind: 'word', icon: '🥛', title: 'Food and drink words',
        items: [
          P('પાણી', 'paani', 'water'),
          P('ચા', 'chaa', 'tea'),
          P('દૂધ', 'doodh', 'milk'),
          P('ભાત', 'bhaat', 'rice'),
          P('દાળ', 'daal', 'lentil soup'),
          P('રોટલી', 'rotli', 'flatbread')
        ]
      },
      {
        id: 'd5', level: 3, kind: 'phrase', icon: '🍽️', title: 'Hungry and thirsty',
        items: [
          P('મને ભૂખ લાગી છે', 'mane bhookh laagi chhe', 'I am hungry'),
          P('મને તરસ લાગી છે', 'mane tarash laagi chhe', 'I am thirsty'),
          P('જમવાનું તૈયાર છે', 'jamvaanu taiyaar chhe', 'food is ready'),
          P('આવું છું', 'aavu chhu', "I'm coming"),
          P('ચાલો જમીએ', 'chaalo jamiye', "let's eat"),
          P('મને પાણી જોઈએ છે', 'mane paani joie chhe', 'I would like some water')
        ],
        pairs: [[2, 3], [0, 4]]
      },
      {
        id: 'd6', level: 3, kind: 'phrase', icon: '😋', title: 'Enjoying the meal',
        items: [
          P('થોડું વધારે', 'thodu vadhaare', 'a little more'),
          P('બસ, આભાર', 'bas, aabhaar', "that's enough, thank you"),
          P('આ બહુ સ્વાદિષ્ટ છે', 'aa bahu swaadisht chhe', 'this is very tasty'),
          P('તમે જમ્યા?', 'tame jamyaa?', 'have you eaten?'),
          P('આ શું છે?', 'aa shu chhe?', 'what is this?')
        ]
      },
      {
        id: 'd7', level: 3, kind: 'phrase', icon: '🛍️', title: 'Shopping',
        items: [
          P('કેટલા પૈસા?', 'ketla paisa?', 'how much is it?'),
          P('દસ રૂપિયા', 'das rupiyaa', 'ten rupees'),
          P('બહુ મોંઘું છે', 'bahu monghu chhe', "it's too expensive"),
          P('થોડું ઓછું કરો', 'thodu ochhu karo', 'please reduce it a little', true),
          P('મને આ જોઈએ છે', 'mane aa joie chhe', 'I want this'),
          P('બીજું બતાવો', 'biju bataavo', 'show me another one', true)
        ],
        pairs: [[0, 1]]
      },
      {
        id: 'd8', level: 3, kind: 'phrase', icon: '🧭', title: 'Getting around',
        items: [
          P('ક્યાં છે?', 'kyaa chhe?', 'where is it?'),
          P('અહીં આવો', 'ahi aavo', 'come here'),
          P('સીધા જાઓ', 'seedhaa jaao', 'go straight'),
          P('ડાબી બાજુ', 'daabi baaju', 'on the left'),
          P('જમણી બાજુ', 'jamni baaju', 'on the right'),
          P('અહીં ઊભા રહો', 'ahi ubhaa raho', 'stop here', true)
        ]
      },
      {
        id: 'd9', level: 3, kind: 'phrase', icon: '😊', title: 'Feelings and reactions',
        items: [
          P('ખૂબ સરસ', 'khoob saras', 'very good'),
          P('મજા આવી', 'maja aavi', 'I had fun'),
          P('મને ગમ્યું', 'mane gamyu', 'I liked it'),
          P('ચિંતા ના કરો', 'chinta naa karo', "don't worry"),
          P('વાહ!', 'vaah!', 'wow!')
        ]
      },
      {
        id: 'cp3', level: 3, kind: 'checkpoint', icon: '✓', title: 'Daily life checkpoint',
        from: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'], count: 12
      },

      /* ---------------- Level 4: festivals and fun ---------------- */
      {
        id: 'e1', level: 4, kind: 'phrase', icon: '🎉', title: 'Festival wishes',
        tip: 'The ending શુભકામનાઓ (shubhkaamnaao) means "good wishes". Add it after any festival name.',
        items: [
          P('નવરાત્રિની શુભકામનાઓ', 'navraatri ni shubhkaamnaao', 'happy Navratri'),
          P('દિવાળીની શુભકામનાઓ', 'divaali ni shubhkaamnaao', 'happy Diwali'),
          P('હોળીની શુભકામનાઓ', 'holi ni shubhkaamnaao', 'happy Holi'),
          P('જન્મદિવસની શુભકામનાઓ', 'janmadivas ni shubhkaamnaao', 'happy birthday'),
          P('સાલ મુબારક', 'saal mubaarak', 'happy new year', true)
        ]
      },
      {
        id: 'e2', level: 4, kind: 'word', icon: '🪁', title: 'Kite day',
        tip: 'Uttarayan, in mid-January, is the kite festival. Rooftops fill with families flying kites and eating sesame sweets.',
        items: [
          P('ઉત્તરાયણ', 'uttaraayan', 'the kite festival'),
          P('પતંગ', 'patang', 'kite'),
          P('દોરી', 'dori', 'kite string'),
          P('કાઈ પો છે!', 'kaai po chhe!', 'I cut your kite! (the festival shout)', true),
          P('ચીક્કી', 'chikki', 'sesame and jaggery sweet'),
          P('ઊંધિયું', 'undhiyu', 'winter vegetable dish')
        ]
      },
      {
        id: 'e3', level: 4, kind: 'phrase', icon: '💃', title: 'Garba night',
        items: [
          P('ગરબા', 'garba', 'the Navratri folk dance'),
          P('દાંડિયા', 'daandiya', 'the stick dance'),
          P('આરતી', 'aarti', 'prayer with a lamp'),
          P('ચાલો ગરબા રમીએ', 'chaalo garba ramiye', "let's play garba", true)
        ]
      },
      {
        id: 'cp4', level: 4, kind: 'checkpoint', icon: '✓', title: 'Festivals checkpoint',
        from: ['e1', 'e2', 'e3'], count: 10
      }
    ]
  };
})();
