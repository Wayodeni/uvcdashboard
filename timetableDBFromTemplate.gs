function timetableDBFromTemplate(timetableName, url) {
  var templateSpreadsheet = SpreadsheetApp.openByUrl(url);
  var template = templateSpreadsheet.getSheets()[0];
  var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  template.copyTo(currentSpreadsheet).setName(timetableName);
}