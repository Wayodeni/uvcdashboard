function prepareRawData() {
  /*
  Функция парсит лист в таблице, который содержит расписание аудитории и 
  вытягивает оттуда День недели, Номер проходящей пары и Тип недели (нижняя, верхняя), 
  формируя массив, готовый для записи в лист с таблицей занятости. 

  Q - от анг. Quantity (количество)
   */
  var TEMPORARY_NAMING = '101_raw';  // Позже сделать наименование аудиторий динамическим (автопарсинг всех добавленных)
  var FIRST_CELL_COL = 1;
  var FIRST_CELL_ROW = 3;
  var SELECTED_COLS_Q = 3;

  var DAY_COL_INDEX = 0;
  var LESSON_COL_INDEX = 1;
  var WEEK_TYPE_COL_INDEX = 2;

  var ss = SpreadsheetApp.getActive();
  var auditoryRawData = ss.getSheetByName(TEMPORARY_NAMING);
  var rowsQ = auditoryRawData.getMaxRows();
  var range = auditoryRawData.getRange(FIRST_CELL_ROW, FIRST_CELL_COL, rowsQ, SELECTED_COLS_Q);

  /* 
  values - матрица размером SELECTED_COLS_Q x rowsQ хранящая в себе данные о парах в аудитории
   */
  var values = range.getValues();
  
  /*
  auditoryObj - JSON следующей структуры:
  auditoryObj = {
    'auditoryName' = '304',
    'monday' = {
      'topWeek' = [1, 2, 3, 5, 6],
      'bottomWeek' = [5, 7],
    },
  }
  На данном этапе JSON содержит информацию о имени аудитории, а также парам, которые проходят в ней в определенный день
  на четной или нечетной неделе.
  Далее можно добавить ключи Преподаватель, Группа, Предмет и т.д
   */
  auditoryObj = {
    'auditoryName': 'none',
    'monday': {
      'topWeek': [],
      'bottomWeek': [],
    },
    'tuesday': {
      'topWeek': [],
      'bottomWeek': [],
    },
    'wednesday': {
      'topWeek': [],
      'bottomWeek': [],
    },
    'thursday': {
      'topWeek': [],
      'bottomWeek': [],
    },
    'friday': {
      'topWeek': [],
      'bottomWeek': [],
    },
    'saturday': {
      'topWeek': [],
      'bottomWeek': [],
    },
  }
  auditoryObj.auditoryName = '101';
  for (var rowIndex = 0; rowIndex < rowsQ; rowIndex = rowIndex + 1) {
    var lessonNum = values[rowIndex][LESSON_COL_INDEX].split('-')[0];
    var weekType = values[rowIndex][WEEK_TYPE_COL_INDEX];
    // if (row[DAY_COL_INDEX] = 'Понедельник') {
    //   if (row[WEEK_TYPE_COL_INDEX] = 'верхняя') {
    //     auditoryObj.monday.topWeek.push(lessonNum);
    //   }
    // }

    switch (values[rowIndex][DAY_COL_INDEX]) {
      case 'Понедельник':
        if (weekType == 'верхняя') {
          auditoryObj.monday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.monday.bottomWeek.push(lessonNum);
        }
        break;
      case 'Вторник':
        if (weekType == 'верхняя') {
          auditoryObj.tuesday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.tuesday.bottomWeek.push(lessonNum);
        }
        break;
      case 'Среда':
        if (weekType == 'верхняя') {
          auditoryObj.wednesday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.wednesday.bottomWeek.push(lessonNum);
        }
        break;
      case 'Четверг':
        if (weekType == 'верхняя') {
          auditoryObj.thursday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.thursday.bottomWeek.push(lessonNum);
        }
        break;
      case 'Пятница':
        if (weekType == 'верхняя') {
          auditoryObj.friday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.friday.bottomWeek.push(lessonNum);
        }
        break;
      case 'Суббота':
        if (weekType == 'верхняя') {
          auditoryObj.saturday.topWeek.push(lessonNum);
        } else if (weekType == 'нижняя') {
          auditoryObj.saturday.bottomWeek.push(lessonNum);
        }
        break;
    }
  }
  Logger.log(auditoryObj);
}