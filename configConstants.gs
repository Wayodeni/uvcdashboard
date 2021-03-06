// Цвет занятой пары
const BUSY_LESSON_COLOR = 'red';

// Цвет свободной пары
const FREE_LESSON_COLOR = 'green';

// Начальная позиция, от которой будут заполняться номера аудиторий и краситься клеточки
const CURSOR_START_ROW = 4;
const CURSOR_START_COL = 4;

// Порядок расположения аудиторий
// Порядок расположения чисел ВАЖЕН. Опеределяет то, как аудитории идут друг за другом
const AUDITORY_ORDER = [3, 8, 4, 5, 15, 30, 32, 42, 56, 106, 108, 125, 101, 302, 303, 304, 507, 508, 509, 510, 411, 165, 166, 170, 603, 605, 606, 607, 608, 609];

// Ссылка на аудиторию (часть, идущая после STUDYDEP_URL, после перехода на страницу с расписанием аудитории)
// Порядок вставки ссылок НЕ ВАЖЕН
const AUDITORY_TOKENS = [
  'a=97&audit=4',
  'a=4410&audit=5',
  'a=36&audit=15',
  'a=49&audit=42',
  'a=47&audit=56',
  'a=90&audit=106', 
  'a=91&audit=108',
  'a=9&audit=165',
  'a=4426&audit=166',
  'a=10&audit=170',
  'a=5054&audit=101',
  'a=4&audit=302',
  'a=3&audit=303',
  'a=2&audit=304',
  'a=6&audit=507',
  'a=7&audit=508',
  'a=8&audit=509',
  'a=5&audit=510',
  'a=4451&audit=3',
  'a=27&audit=30',
  'a=50&audit=32',
  'a=51&audit=125',
  'a=4444&audit=8',
  'a=57&audit=609',
  'a=56&audit=608',
  'a=55&audit=607',
  'a=4454&audit=606',
  'a=53&audit=605',
  'a=52&audit=603',
  'a=77&audit=411',
]

/*
ВНИМАНИЕ! ОПАСНАЯ ЗОНА!
Изменение следующих параметров может привести к неработоспособности таблицы:
*/

// URL адрес таблицы-шаблона, которая копируется каждый раз при обновлении
const TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1Kj4zpPWM15DGCmwK1B1KbNVlGegSNmItaMeqwsOT3mk/edit';

// Неизменяемая часть адреса StudyDep
const STUDYDEP_URL = 'http://studydep.miigaik.ru/semestr/timetableau.php?';

// Имя листа для заполнения общего расписания
const TIMETABLE_DB_SHEET_NAME = 'Расписание';

/*
ВНИМАНИЕ! ОПАСНАЯ ЗОНА!
*/