function sheetFromTemplate(sheetname, url) {
  var templateSpreadsheet = SpreadsheetApp.openByUrl(url);
  var template = templateSpreadsheet.getSheetByName(sheetname);
  var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  template.copyTo(currentSpreadsheet).setName(sheetname);
}