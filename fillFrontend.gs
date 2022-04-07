function fillFrontend(cursorRow, cursorCol, frontendSheetName, timetableSheetName, auditoriesQ) {
  var cursorRow = 3;
  var cursorCol = 3;
  var frontendSheetName = 'Расписание';
  var timetableSheetName = 'timetable_db';
  var auditoriesQ = 19;
  const TIMETABLE_DATA_START_ROW = 7;
  const TIMETABLE_DATA_START_COL = 7;
  var ss = SpreadsheetApp.getActive();
  var frontendSheet = ss.getSheetByName(frontendSheetName);
  var timetableSheet = ss.getSheetByName(timetableSheetName);
  var cursor = frontendSheet.getRange(cursorRow, cursorCol);
  var cr = cursorRow;
  var cc = cursorCol;
  cursor = frontendSheet.getRange(cr, cc);
  for (var colIndex = 0; colIndex < auditoriesQ; colIndex = colIndex + 1) {
    cursor.setValue(timetableSheet.getRange(TIMETABLE_DATA_START_ROW, TIMETABLE_DATA_START_COL + colIndex).getValue());
    cursor = frontendSheet.getRange(cr, cc);
    for (var rowIndex = 0; rowIndex < 8; rowIndex = rowIndex + 1) {
      cr = cr + 1;
      var isLessonGoing = timetableSheet.getRange(TIMETABLE_DATA_START_ROW + rowIndex, TIMETABLE_DATA_START_COL + colIndex).getValue();
      if (isLessonGoing) {
        cursor.setBackground('red');
      } else {
        cursor.setBackground('green');
      }
      cursor = frontendSheet.getRange(cr, cc);
    }
    cr = cursorRow;
    cc = cc + 1;
    cursor = frontendSheet.getRange(cr, cc);
  }
}