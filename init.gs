//TODO: Сделать новую структуру данных для хранения url аудиторий - в названиях аудиторий должны быть буквы
function init() {
  var ss = SpreadsheetApp.getActive();
  var emptySheet = ss.getSheetByName('empty');
  if (!emptySheet) {
   ss.insertSheet('empty');
  }
  
  sheetFromTemplate(TIMETABLE_DB_SHEET_NAME, TEMPLATE_URL);

  // Создать лист в таблице с расписанием, спарсенным с сайта
  for (var i = 0; i < AUDITORY_TOKENS.length; i = i + 1) {
    createAuditoryRawdataSheet(STUDYDEP_URL + AUDITORY_TOKENS[i]);
  }
  
  // Заполнение листа таблицы с расписанием всех аудиторий
  ss.getSheetByName(TIMETABLE_DB_SHEET_NAME).activate();
  for (var auditoryIndex = 0; auditoryIndex < AUDITORY_ORDER.length; auditoryIndex = auditoryIndex + 1) {
    var auditory = createAuditoryObject(AUDITORY_ORDER[auditoryIndex] + '_raw');
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