export interface GrammarSection {
  id: string
  title: string
  titleLv: string
  content: GrammarBlock[]
}

export type GrammarBlock =
  | { type: 'text'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'example'; lv: string; en: string }
  | { type: 'heading'; text: string }

export const grammarSections: GrammarSection[] = [
  {
    id: 'cases',
    title: 'Cases Overview',
    titleLv: 'Locījumi',
    content: [
      { type: 'text', text: 'Latvian has 7 noun cases. The 5 most common are:' },
      {
        type: 'table',
        headers: ['Case', 'Latvian', 'Usage', 'Question'],
        rows: [
          ['Nominative', 'Nominatīvs', 'Subject', 'Kas? (Who/What?)'],
          ['Accusative', 'Akuzatīvs', 'Direct object', 'Ko? (Whom/What?)'],
          ['Dative', 'Datīvs', 'Indirect object, possession', 'Kam? (To whom?)'],
          ['Locative', 'Lokatīvs', 'Location, time', 'Kur? (Where?)'],
          ['Genitive', 'Ģenitīvs', 'Possession, quantity', 'Kā? (Whose?)'],
        ],
      },
      { type: 'example', lv: 'Vīrs dod grāmatu sievai.', en: 'The man gives the book to his wife.' },
      { type: 'text', text: 'vīrs = nominative (subject), grāmatu = accusative (direct object), sievai = dative (indirect object)' },
    ],
  },
  {
    id: 'declension-m',
    title: 'Masculine Declensions',
    titleLv: 'Vīriešu dzimte',
    content: [
      { type: 'text', text: 'Masculine nouns typically end in -s, -is, or -us in nominative singular.' },
      { type: 'heading', text: '1st Declension: -s (e.g. galds — table)' },
      {
        type: 'table',
        headers: ['Case', 'Singular', 'Plural'],
        rows: [
          ['Nominative', '-s', '-i'],
          ['Accusative', '-u', '-us'],
          ['Dative', '-am', '-iem'],
          ['Locative', '-ā', '-os'],
          ['Genitive', '-a', '-u'],
        ],
      },
      { type: 'example', lv: 'galds → galdu, galdam, galdā, galda', en: 'table (acc, dat, loc, gen singular)' },
      { type: 'heading', text: '2nd Declension: -is (e.g. brālis — brother)' },
      {
        type: 'table',
        headers: ['Case', 'Singular', 'Plural'],
        rows: [
          ['Nominative', '-is', '-i'],
          ['Accusative', '-i', '-us'],
          ['Dative', '-im', '-iem'],
          ['Locative', '-ī', '-os'],
          ['Genitive', '-a', '-u'],
        ],
      },
      { type: 'example', lv: 'brālis → brāli, brālim, brālī, brāļa', en: 'brother (acc, dat, loc, gen singular)' },
      { type: 'heading', text: '3rd Declension: -us (e.g. tirgus — market)' },
      {
        type: 'table',
        headers: ['Case', 'Singular', 'Plural'],
        rows: [
          ['Nominative', '-us', '-i'],
          ['Accusative', '-u', '-us'],
          ['Dative', '-um', '-iem'],
          ['Locative', '-ū', '-os'],
          ['Genitive', '-us', '-u'],
        ],
      },
    ],
  },
  {
    id: 'declension-f',
    title: 'Feminine Declensions',
    titleLv: 'Sieviešu dzimte',
    content: [
      { type: 'text', text: 'Feminine nouns typically end in -a or -e in nominative singular.' },
      { type: 'heading', text: '4th Declension: -a (e.g. māja — house)' },
      {
        type: 'table',
        headers: ['Case', 'Singular', 'Plural'],
        rows: [
          ['Nominative', '-a', '-as'],
          ['Accusative', '-u', '-as'],
          ['Dative', '-ai', '-ām'],
          ['Locative', '-ā', '-ās'],
          ['Genitive', '-as', '-u'],
        ],
      },
      { type: 'example', lv: 'māja → māju, mājai, mājā, mājas', en: 'house (acc, dat, loc, gen singular)' },
      { type: 'heading', text: '5th Declension: -e (e.g. piere — forehead)' },
      {
        type: 'table',
        headers: ['Case', 'Singular', 'Plural'],
        rows: [
          ['Nominative', '-e', '-es'],
          ['Accusative', '-i', '-es'],
          ['Dative', '-ei', '-ēm'],
          ['Locative', '-ē', '-ēs'],
          ['Genitive', '-es', '-u'],
        ],
      },
      { type: 'example', lv: 'māte → māti, mātei, mātē, mātes', en: 'mother (acc, dat, loc, gen singular)' },
    ],
  },
  {
    id: 'plurals',
    title: 'Forming Plurals',
    titleLv: 'Daudzskaitlis',
    content: [
      { type: 'text', text: 'The plural nominative ending depends on the declension:' },
      {
        type: 'table',
        headers: ['Declension', 'Sg ending', 'Pl ending', 'Example'],
        rows: [
          ['1st (m)', '-s', '-i', 'galds → galdi'],
          ['2nd (m)', '-is', '-i', 'brālis → brāļi'],
          ['3rd (m)', '-us', '-i', 'tirgus → tirgi'],
          ['4th (f)', '-a', '-as', 'māja → mājas'],
          ['5th (f)', '-e', '-es', 'māte → mātes'],
        ],
      },
      { type: 'text', text: 'Note: some nouns have consonant changes in the plural (palatalization). E.g. brālis → brāļi (l → ļ), galds → galdi.' },
    ],
  },
  {
    id: 'locative',
    title: 'Locative Case',
    titleLv: 'Lokatīvs',
    content: [
      { type: 'text', text: 'The locative case expresses location ("in/at/on") and is used with time expressions. Latvian doesn\'t need a separate preposition for "in".' },
      {
        type: 'table',
        headers: ['Type', 'Sg ending', 'Pl ending'],
        rows: [
          ['Masc (-s)', '-ā', '-os'],
          ['Masc (-is)', '-ī', '-os'],
          ['Fem (-a)', '-ā', '-ās'],
          ['Fem (-e)', '-ē', '-ēs'],
        ],
      },
      { type: 'example', lv: 'Es esmu Rīgā.', en: 'I am in Riga.' },
      { type: 'example', lv: 'Grāmata ir galdā.', en: 'The book is on the table.' },
      { type: 'example', lv: 'Pirmdienā es strādāju.', en: 'On Monday I work.' },
      { type: 'text', text: 'The locative is also used for time: pirmdienā (on Monday), janvārī (in January), rītā (in the morning).' },
    ],
  },
  {
    id: 'verb-endings',
    title: 'Verb Conjugation Patterns',
    titleLv: 'Darbības vārdu galotnes',
    content: [
      { type: 'text', text: 'Latvian verbs are divided into 3 conjugation groups based on their present-tense endings:' },
      { type: 'heading', text: '1st Conjugation' },
      { type: 'text', text: 'Infinitive typically in -t. Various present-tense stem changes.' },
      {
        type: 'table',
        headers: ['Person', 'Ending', 'Example (dot — to give)'],
        rows: [
          ['es', '-u / -ju', 'dodu'],
          ['tu', '— (stem only)', 'dod'],
          ['viņš/viņa', '— (stem only)', 'dod'],
          ['mēs', '-am / -jam', 'dodam'],
          ['jūs', '-at / -jat', 'dodat'],
          ['viņi/viņas', '— (stem only)', 'dod'],
        ],
      },
      { type: 'heading', text: '2nd Conjugation' },
      { type: 'text', text: 'Infinitive in -āt, -ēt, -īt, or -ot. Stem stays consistent.' },
      {
        type: 'table',
        headers: ['Person', 'Ending', 'Example (strādāt — to work)'],
        rows: [
          ['es', '-ju', 'strādāju'],
          ['tu', '-', 'strādā'],
          ['viņš/viņa', '-', 'strādā'],
          ['mēs', '-jam', 'strādājam'],
          ['jūs', '-jat', 'strādājat'],
          ['viņi/viņas', '-', 'strādā'],
        ],
      },
      { type: 'heading', text: '3rd Conjugation' },
      { type: 'text', text: 'Infinitive in -īt or -ēt with suffix -ina- or -a- in present.' },
      {
        type: 'table',
        headers: ['Person', 'Ending', 'Example (lasīt — to read)'],
        rows: [
          ['es', '-u', 'lasu'],
          ['tu', '-i', 'lasi'],
          ['viņš/viņa', '-a', 'lasa'],
          ['mēs', '-ām', 'lasām'],
          ['jūs', '-āt', 'lasāt'],
          ['viņi/viņas', '-a', 'lasa'],
        ],
      },
    ],
  },
  {
    id: 'reflexive',
    title: 'Reflexive Verbs',
    titleLv: 'Atgriezeniskie darbības vārdi',
    content: [
      { type: 'text', text: 'Reflexive verbs end in -ties (instead of -t). They indicate the action is directed back at the subject ("oneself"). The reflexive suffix -os/-ies/-ās/-amies/-aties/-as is added to the conjugated form.' },
      { type: 'heading', text: 'Example: klausīties (to listen)' },
      {
        type: 'table',
        headers: ['Person', 'Present', 'Past', 'Future'],
        rows: [
          ['es', 'klausos', 'klausījos', 'klausīšos'],
          ['tu', 'klausies', 'klausījies', 'klausīsies'],
          ['viņš/viņa', 'klausās', 'klausījās', 'klausīsies'],
          ['mēs', 'klausāmies', 'klausījāmies', 'klausīsimies'],
          ['jūs', 'klausāties', 'klausījāties', 'klausīsieties'],
          ['viņi/viņas', 'klausās', 'klausījās', 'klausīsies'],
        ],
      },
      { type: 'text', text: 'Common reflexive verbs: mazgāties (to wash oneself), celties (to get up), mācīties (to study), justies (to feel), atcerēties (to remember).' },
    ],
  },
  {
    id: 'irregular-iet',
    title: 'Irregular: iet (to go)',
    titleLv: 'iet — neregulārs',
    content: [
      { type: 'text', text: '"Iet" (to go) is one of the most common irregular verbs in Latvian.' },
      {
        type: 'table',
        headers: ['Person', 'Present', 'Past', 'Future'],
        rows: [
          ['es', 'eju', 'gāju', 'iešu'],
          ['tu', 'ej', 'gāji', 'iesi'],
          ['viņš/viņa', 'iet', 'gāja', 'ies'],
          ['mēs', 'ejam', 'gājām', 'iesim'],
          ['jūs', 'ejat', 'gājāt', 'iesiet'],
          ['viņi/viņas', 'iet', 'gāja', 'ies'],
        ],
      },
      { type: 'example', lv: 'Es eju uz veikalu.', en: 'I am going to the shop.' },
      { type: 'example', lv: 'Vakar es gāju uz parku.', en: 'Yesterday I went to the park.' },
    ],
  },
]
