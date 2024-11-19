



function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

// function submitForm(form) {
//   var url = "https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0";
//   var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Form');
  
//   var submissionDate = new Date();
//   var rowData = [form.name, submissionDate, form.studentId, form.email, form.phone, form.date, form.slot, form.first, form.second, form.third, form.fourth];
  

//   sheet.appendRow(rowData);
//   sendEmail(form, submissionDate);

// }

function submitForm(form) {
  var url = "https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0";
  var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Form');
  
  var submissionDate = new Date();
  var rowData = [form.name, form.date, form.studentId, form.email, submissionDate, form.phone,  form.slot, form.first, form.second, form.third, form.fourth];
  
  // Find the first empty row in columns A to K
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;
  
  for (var i = 1; i <= lastRow; i++) {
    var range = sheet.getRange(i, 1, 1, 11);
    var values = range.getValues()[0];
    
    if (values.every(cell => cell === "")) {
      newRow = i;
      break;
    }
  }
  
  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
  sendEmail(form, submissionDate);
}



function sendEmail(form) {
  var subject = "Form Submission Confirmation";
  var body = `Hello ${form.name},\n\n` +
    `Thank you for submitting the form. Here are the details you provided:\n` +
    `Name: ${form.name}\n` +
    `Student ID: ${form.studentId}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone}\n` +
    `Date: ${form.date}\n` +
    `Slot: ${form.slot}\n` +
    `Class: ${form.first}\n` +
    `Subject: ${form.second}\n` +
    `Chapter: ${form.third}\n` +
    `Topic: ${form.fourth}\n\n` +
    `Best regards,\n` +
    `ISP Team`;
  MailApp.sendEmail(form.email, subject, body);
}

function getUniqueValues(col) {
  var url = "https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0";
  var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Examlist');
  var data = sheet.getRange(2, col, sheet.getLastRow() - 1, 1).getValues();
  var uniqueValues = [...new Set(data.flat())];
  return uniqueValues;
}

function getDependentValues(col, value) {
  var url = "https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0";
  var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Examlist');
  var data = sheet.getRange(2, col, sheet.getLastRow() - 1, col + 1).getValues();
  var dependentValues = data.filter(row => row[0] === value).map(row => row[1]);
  var uniqueDependentValues = [...new Set(dependentValues)];
  return uniqueDependentValues;
}

function getNameById(studentId) {
  var url = "https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0";
  var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('ID');
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == studentId) {
      return data[i][1];
    }
  }
  return '';
}

function getLoggedInEmail() {
  return Session.getActiveUser().getEmail();
}







// var url ="https://docs.google.com/spreadsheets/d/1wEAs97yZeAY4TKrBhCEiqFkpqg32GaTQr7qDxpJVPjw/edit?gid=0#gid=0"

// function doGet() {
//   return HtmlService.createHtmlOutputFromFile('Index');
// }

// function submitForm(form) {
  
//   var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Form');
  
//   var submissionDate = new Date();
//   sheet.appendRow([form.name, submissionDate, form.studentId, form.email, form.phone, form.date, form.slot, form.first, form.second, form.third, form.fourth]);
  
//   sendEmail(form, submissionDate);
// }

// function sendEmail(form, submissionDate) {
//   var subject = "Form Submission Confirmation";
//   var body = `Hello ${form.name},\n\n` +
//     `Thank you for submitting the form. Here are the details you provided:\n` +
//     `Name: ${form.name}\n` +
//     `Submission Date: ${submissionDate}\n` +
//     `Student ID: ${form.studentId}\n` +
//     `Email: ${form.email}\n` +
//     `Phone: ${form.phone}\n` +
//     `Date: ${form.date}\n` +
//     `Slot: ${form.slot}\n` +
//     `Class: ${form.first}\n` +
//     `Subject: ${form.second}\n` +
//     `Chapter: ${form.third}\n` +
//     `Topic: ${form.fourth}\n\n` +
//     `Best regards,\n` +
//     `ISP Team`;
//   MailApp.sendEmail(form.email, subject, body);
// }

// function getUniqueValues(col) {
  
//   var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Examlist');
//   var data = sheet.getRange(2, col, sheet.getLastRow() - 1, 1).getValues();
//   var uniqueValues = [...new Set(data.flat())];
//   return uniqueValues;
// }

// function getDependentValues(col, value) {
  
//   var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('Examlist');
//   var data = sheet.getRange(2, col, sheet.getLastRow() - 1, col + 1).getValues();
//   var dependentValues = data.filter(row => row[0] === value).map(row => row[1]);
//   var uniqueDependentValues = [...new Set(dependentValues)];
//   return uniqueDependentValues;
// }

// function getNameById(studentId) {
  
//   var sheet = SpreadsheetApp.openByUrl(url).getSheetByName('ID');
//   var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
//   for (var i = 0; i < data.length; i++) {
//     if (data[i][0] == studentId) {
//       return data[i][1];
//     }
//   }
//   return '';
// }

// function getLoggedInEmail() {
//   return Session.getActiveUser().getEmail();
// }














