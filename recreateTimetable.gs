function recreateTimetable() {
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
