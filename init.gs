function init() {
  var ss = SpreadsheetApp.getActive();
  var emptySheet = ss.getSheetByName('empty');
  if (!emptySheet) {
   ss.insertSheet('empty');
  }
  const TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1Kj4zpPWM15DGCmwK1B1KbNVlGegSNmItaMeqwsOT3mk/edit';
  const TIMETABLE_DB_SHEET_NAME = 'timetable_db';
  const CURSOR_START_ROW = 7;
  const CURSOR_START_COL = 7;
  const AUDITORY_NUMBERS = [3, 4, 5, 15, 42, 56, 106, 108, 165, 166, 170, 101, 302, 303, 304, 507, 508, 509, 510];
  const STUDYDEP_URL = 'http://studydep.miigaik.ru/semestr/timetableau.php?';
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
  ]
  timetableDBFromTemplate(TIMETABLE_DB_SHEET_NAME, TEMPLATE_URL);
  // Создать лист в таблице с расписанием, спарсенным с сайта
  for (var i = 0; i < AUDITORY_TOKENS.length; i = i + 1) {
    createAuditoryRawdataSheet(STUDYDEP_URL + AUDITORY_TOKENS[i]);
  }
  
  // Заполнение листа таблицы с расписанием всех аудиторий
  for (var auditoryIndex = 0; auditoryIndex < AUDITORY_NUMBERS.length; auditoryIndex = auditoryIndex + 1) {
    var auditory = createAuditoryObject(AUDITORY_NUMBERS[auditoryIndex] + '_raw');
    fillTimetable(auditory, CURSOR_START_ROW, CURSOR_START_COL + auditoryIndex, TIMETABLE_DB_SHEET_NAME);
  }
}

function createAuditoryRawdataSheet(link) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var linkTokens = link.split('=');
  var auditoryNumber = linkTokens[linkTokens.length - 1];
  var auditorySheetName = auditoryNumber + '_raw';
  ss.insertSheet(auditorySheetName);
  var auditorySheet = ss.getSheetByName(auditorySheetName);
  var formulaInitCell = auditorySheet.getRange(1, 1);
  formulaInitCell.setFormula('=IMPORTHTML("' + link + '";"table";11)');
}