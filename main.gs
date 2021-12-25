function main() {
  // const auditoryTokens = [
  //  'a=97&audit=4',
  //  'a=4410&audit=5',
  //  'a=36&audit=15',
  //  'a=49&audit=42',
  //  'a=47&audit=56',
  //  'a=90&audit=106', 
  //  'a=91&audit=108',
  //  'a=9&audit=165',
  //  'a=4426&audit=166',
  //  'a=10&audit=170',
  //  'a=5054&audit=101',
  //  'a=4&audit=302',
  //  'a=3&audit=303',
  //  'a=2&audit=304',
  //  'a=6&audit=507',
  //  'a=7&audit=508',
  //  'a=8&audit=509',
  //  'a=5&audit=510',
  //  'a=4451&audit=3',
  // ]
  // createRawDataSheets(auditoryTokens);

  const auditoryNumbers = [3, 4, 5, 15, 42, 56, 106, 108, 165, 166, 170, 101, 302, 303, 304, 507, 508, 509, 510];
  for (var i = 0; i < auditoryNumbers.length; i = i + 1) {
    var auditory = prepareRawData(auditoryNumbers[i] + '_raw');
    fillTimetable(auditory, 7, 7 + i);
  }
  
}

function createRawDataSheets(auditoryTokens) {
  const STUDYDEP_URL = 'http://studydep.miigaik.ru/semestr/timetableau.php?';
  for (var i = 0; i < auditoryTokens.length; i = i + 1) {
    createAuditory(STUDYDEP_URL + auditoryTokens[i]);
  }
}
