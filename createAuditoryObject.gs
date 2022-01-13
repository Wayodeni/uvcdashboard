function createAuditoryObject(rawDataSheetName) {
  /*
  Функция парсит лист в таблице, который содержит расписание аудитории из studydep и 
  вытягивает оттуда День недели, Номер проходящей пары и Тип недели (нижняя, верхняя), 
  формируя JSON, содержащий информацию об аудитории, готовый для записи в лист с 
  таблицей занятости (weekday_timetable).

  Q - от анг. Quantity (количество)

  auditoryObj.lessons[Номер дня недели (0 - пн ... 5 - сб)][Номер недели (0-верх, 1-нижн)][Пара (индекс от 0 до 6)] = 1;
  */
  var FIRST_CELL_COL = 1;
  var FIRST_CELL_ROW = 3;
  var SELECTED_COLS_Q = 8;

  const DAY_COL_INDEX = 0;
  const LESSON_COL_INDEX = 1;
  const WEEK_TYPE_COL_INDEX = 2;
  const LESSON_NAME_COL_INDEX = 3;
  const TEACHER_NAME_COL_INDEX = 4;
  const GROUP_NAME_COL_INDEX = 7;

  var ss = SpreadsheetApp.getActive();
  var auditoryRawData = ss.getSheetByName(rawDataSheetName);
  var rowsQ = auditoryRawData.getLastRow();
  var range = auditoryRawData.getRange(FIRST_CELL_ROW, FIRST_CELL_COL, rowsQ, SELECTED_COLS_Q);

  /* 
  values - матрица размером SELECTED_COLS_Q x rowsQ хранящая в себе данные о парах в аудитории
   */
  var timetable = range.getValues();
  
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
  };
  auditoryObj.auditoryName = rawDataSheetName.split('_')[0];
  for (var rowIndex = 0; rowIndex < rowsQ; rowIndex = rowIndex + 1) {
    var lessonNum = timetable[rowIndex][LESSON_COL_INDEX].split('-')[0];
    var lessonIndex = lessonNum - 1;
    var weekTypeStr = timetable[rowIndex][WEEK_TYPE_COL_INDEX];
    var weekdayNameStr = timetable[rowIndex][DAY_COL_INDEX];
    var teacherName = timetable[rowIndex][TEACHER_NAME_COL_INDEX];
    var lessonName = timetable[rowIndex][LESSON_NAME_COL_INDEX];
    var groupName = timetable[rowIndex][GROUP_NAME_COL_INDEX];
    switch (weekdayNameStr) {
      case 'Понедельник':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[0][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[0][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
      case 'Вторник':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[1][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[1][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
      case 'Среда':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[2][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[2][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
      case 'Четверг':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[3][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[3][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
      case 'Пятница':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[4][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[4][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
      case 'Суббота':
        if (weekTypeStr == 'верхняя') {
          auditoryObj.lessons[5][0][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        } else if (weekTypeStr == 'нижняя') {
          auditoryObj.lessons[5][1][lessonIndex] = {name: lessonName, teacher: teacherName, group: groupName};
        }
        break;
    }
  }
  return auditoryObj;
}