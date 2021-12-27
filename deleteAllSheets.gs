function deleteAllSheets() {
  var ss = SpreadsheetApp.getActive();
  var sheets = ss.getSheets();
  var emptySheet = ss.getSheetByName('empty');
  ss.setActiveSheet(emptySheet);
  if (emptySheet) {
    ss.moveActiveSheet(ss.getNumSheets());
  }
  sheets = ss.getSheets();
  for (var i = 0; i < sheets.length - 1; i = i + 1) {
    ss.deleteSheet(sheets[i]);
  }
}
