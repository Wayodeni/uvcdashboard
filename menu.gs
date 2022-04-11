function onOpen() {
  var ss = SpreadsheetApp.getActive();
  var timetableSheet = ss.getSheetByName(TIMETABLE_DB_SHEET_NAME);
  if (timetableSheet) {
   timetableSheet.activate();
  }

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard Menu')
      .addItem('Создать таблицы', 'create')
      .addItem('Удалить таблицы', 'remove')
      .addItem('Обновить таблицы', 'update')
      .addSeparator()
      .addSubMenu(ui.createMenu('Для Разработчиков')
        .addItem('Перегенерировать расписание из существующих листов', 'resetTimetable'))
      .addToUi();
}

function create() {
  init();
}

function remove() {
  deleteAllSheets();
}

function update() {
  deleteAllSheets();
  init();
}

function resetTimetable() {
  recreateTimetable();
}