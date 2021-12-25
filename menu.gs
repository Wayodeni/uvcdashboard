function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard Menu')
      .addItem('Добавить аудиторию', 'auditoryCreationPrompt')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();
}

function auditoryCreationPrompt() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.prompt(
      'Добавление аудитории',
      'Введите ссылку на расписание в Studydep:',
      ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  var link = result.getResponseText();
  if (button == ui.Button.OK) {
    createAuditory(link);
  } else if (button == ui.Button.CANCEL) {
    ui.alert('Отказ от добавления');
  } else if (button == ui.Button.CLOSE) {
    ui.alert('Закрыли диалог');
  }
}

function createAuditory(link) {
  var linkTokens = [{}];
  linkTokens = link.split('=');
  var auditoryNumber = linkTokens[linkTokens.length - 1];
  var auditorySheetName = auditoryNumber + '_raw';
  createSheet(auditorySheetName);
  var auditorySheet = SpreadsheetApp.getActive().getSheetByName(auditorySheetName);
  var formulaInitCell = auditorySheet.getRange(1, 1);
  formulaInitCell.setFormula('=IMPORTHTML("' + link + '";"table";11)');
}

function createSheet(sheetName) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  activeSpreadsheet.insertSheet(sheetName);
}