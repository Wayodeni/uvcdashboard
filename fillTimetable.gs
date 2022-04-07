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
        var lessonObj = auditoryObj.lessons[weekDay][weekType][lesson]
        if (lessonObj) {
          cursor.setBackground(BUSY_LESSON_COLOR);
          var note = 'Преподаватель: ' + lessonObj.teacher + 
              '\n' + 'Дисциплина: ' + lessonObj.name + 
              '\n' + 'Группа: ' + lessonObj.group;
          cursor.setNote(note);
        } else {
          cursor.setBackground(FREE_LESSON_COLOR);
        }
        cr = cr + 1;
        cursor = timetableSheet.getRange(cr, cc);
      }
    }
  }
}