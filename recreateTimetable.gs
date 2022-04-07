function recreateTimetable() {
  const TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1Kj4zpPWM15DGCmwK1B1KbNVlGegSNmItaMeqwsOT3mk/edit';
  const TIMETABLE_DB_SHEET_NAME = 'Расписание'
  const CURSOR_START_ROW = 2
  const CURSOR_START_COL = 5
  const AUDITORY_ORDER = [3, 4, 5, 15, 42, 56, 106, 108, 165, 166, 170, 101, 302, 303, 304, 507, 508, 509, 510, 8, 30, 32, 125, 411, 609, 608, 607, 606, 605, 603];

  var ss = SpreadsheetApp.getActive();
  var timetableSheet = ss.getSheetByName(TIMETABLE_DB_SHEET_NAME);
  if (timetableSheet != null) {
    ss.deleteSheet(timetableSheet);
  }
  sheetFromTemplate(TIMETABLE_DB_SHEET_NAME, TEMPLATE_URL);
  ss.getSheetByName(TIMETABLE_DB_SHEET_NAME).activate();
  for (var auditoryIndex = 0; auditoryIndex < AUDITORY_ORDER.length; auditoryIndex = auditoryIndex + 1) {
    var auditory = createAuditoryObject(AUDITORY_ORDER[auditoryIndex] + '_raw');
    fillTimetable(auditory, CURSOR_START_ROW, CURSOR_START_COL + auditoryIndex, TIMETABLE_DB_SHEET_NAME);
  }
}
