function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard Menu')
      .addItem('Создать таблицы', 'create')
      .addItem('Удалить таблицы', 'remove')
      .addItem('Обновить таблицы', 'update')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
        .addItem('Second item', 'menuItem2'))
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