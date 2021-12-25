function prepareRawData(rawDataSheetName) {
  /*
  Функция парсит лист в таблице, который содержит расписание аудитории и 
  вытягивает оттуда День недели, Номер проходящей пары и Тип недели (нижняя, верхняя), 
  формируя массив, готовый для записи в лист с таблицей занятости. 

  Q - от анг. Quantity (количество)

  auditoryObj.lessons[Номер дня недели][Номер недели (0-верх, 1-нижн)][Пара] = 1;
   */
  var sheet_name = rawDataSheetName;
  var FIRST_CELL_COL = 1;
  var FIRST_CELL_ROW = 3;
  var SELECTED_COLS_Q = 3;

  var DAY_COL_INDEX = 0;
  var LESSON_COL_INDEX = 1;
  var WEEK_TYPE_COL_INDEX = 2;

  var ss = SpreadsheetApp.getActive();
  var auditoryRawData = ss.getSheetByName(sheet_name);
  var rowsQ = auditoryRawData.getMaxRows();
  var range = auditoryRawData.getRange(FIRST_CELL_ROW, FIRST_CELL_COL, rowsQ, SELECTED_COLS_Q);

  /* 
  values - матрица размером SELECTED_COLS_Q x rowsQ хранящая в себе данные о парах в аудитории
   */
  var values = range.getValues();
  
  auditoryObj = {
    auditoryName: 'none',
    lessons: [
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
    ]
  }
  auditoryObj.auditoryName = sheet_name.split('_')[0];
  for (var rowIndex = 0; rowIndex < rowsQ; rowIndex = rowIndex + 1) {
    var lessonNum = values[rowIndex][LESSON_COL_INDEX].split('-')[0];
    var weekType = values[rowIndex][WEEK_TYPE_COL_INDEX];
    switch (values[rowIndex][DAY_COL_INDEX]) {
      case 'Понедельник':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[0][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[0][1][lessonNum - 1] = 1;
        }
        break;
      case 'Вторник':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[1][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[1][1][lessonNum - 1] = 1;
        }
        break;
      case 'Среда':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[2][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[2][1][lessonNum - 1] = 1;
        }
        break;
      case 'Четверг':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[3][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[3][1][lessonNum - 1] = 1;
        }
        break;
      case 'Пятница':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[4][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[4][1][lessonNum - 1] = 1;
        }
        break;
      case 'Суббота':
        if (weekType == 'верхняя') {
          auditoryObj.lessons[5][0][lessonNum - 1] = 1;
        } else if (weekType == 'нижняя') {
          auditoryObj.lessons[5][1][lessonNum - 1] = 1;
        }
        break;
    }
  }
  return auditoryObj;
}