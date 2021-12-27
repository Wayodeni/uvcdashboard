function fillTimetable(auditoryObj, cursorRow, cursorCol, timetableSheetName) {
  /*
  Функция заполняет расписание аудитории auditoryObj сверху вниз в столбик, 
  начиная с ячейки (cursorRow; cursorCol)
  */
  var ss = SpreadsheetApp.getActive();
  var timetableSheet = ss.getSheetByName(timetableSheetName);
  var cursor = timetableSheet.getRange(cursorRow, cursorCol);
  var cr = cursorRow;
  var cc = cursorCol;
  cursor = timetableSheet.getRange(cr, cc);
  cursor.setValue(auditoryObj.auditoryName);
  cr = cr + 1;
  cursor = timetableSheet.getRange(cr, cc);
  for (var weekDay = 0; weekDay < 6; weekDay = weekDay + 1) {
    for (var weekType = 0; weekType < 2; weekType = weekType + 1) {
      for (var lesson = 0; lesson < 7; lesson = lesson + 1) {
        var val = auditoryObj.lessons[weekDay][weekType][lesson]
        cursor.setValue(val);
        if (val == 1) {
          cursor.setBackground('red');
        } else {
          cursor.setBackground('green');
        }
        cr = cr + 1;
        cursor = timetableSheet.getRange(cr, cc);
        }
        if (weekType == 1) {
          cursor.setValue(auditoryObj.auditoryName);
          cr = cr + 1;
          cursor = timetableSheet.getRange(cr, cc);
        }
    }
  }
}