
function showSidebar() {
  var html = HtmlService.createTemplateFromFile('HTMLsidebar')
  html.message = "none";
  html = html.evaluate().setTitle('Check Select');
  SpreadsheetApp.getUi().showSidebar(html);
}

function getCheckDetails(form) {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  //Check that API textbox is populated
  var apikey = form.apikey;
  apikey = apikey.trim();
  if (apikey == ''){
    ui.alert('Please enter your API key');
    return 'end';
  } else {
    //if API key is populated, clear this sheet and pull new data
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.clear();
    //call API function to pull data
    sheet.appendRow(['=ImportJSON("https:\/\/monitoring-api\.rigor\.com\/v2\/checks?type=real_browser&page=1&per_page=1000&api_key=' + apikey + '", "\/checks")']);  
    //copy the output as values
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var range = sheet.getRange(1, 1, lastRow, lastColumn);         
    range.copyTo(range, {contentsOnly:true});
    
    //unhide next section of Textbox.html in Textbox.html
  }
}

//Check that API textbox is populated
function checkTestID(form){
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var testid = form.testid;
  testid = testid.trim();
  if (testid == ''){
    ui.alert('Please enter your Test ID');
    return 'end';
  }
}

//============================UNIT TESTING
function testgetLoadTimeData(){
 var form = new Object();
  form.servertime = true;
  form.domloadtime = true;
  form.apikey ='ra2Dv8QkIJI6YGc6sfJ';
  form.testid = '41291';
  form.timeframe = 'custom';
  form.fromDate = '2017-07-01';
  form.toDate = '2017-07-07';
  
  getFormData(form);  
}
//==================================


//==========================================================================================================
//determine which load times to pull
function getFormData(form){
  if(form.servertime == "true"){
   getLoadTimeData(form, "server_time"); 
  }
  if(form.startrendertime == "true"){
   getLoadTimeData(form, "start_render"); 
  }
  if(form.domloadtime == "true"){
   getLoadTimeData(form, "dom_load_time"); 
  }
   if(form.onloadtime == "true"){
   getLoadTimeData(form, "onload_time"); 
  }
  if(form.visuallycompletetime == "true"){
   getLoadTimeData(form, "visually_complete"); 
  }
   if(form.fullyloadedtime == "true"){
   getLoadTimeData(form, "fully_loaded_time"); 
  }
  if(form.speedindex == "true"){
   getLoadTimeData(form, "speed_index"); 
  }
}

//Get Load Time data
function getLoadTimeData(form, metric){
  var ui = SpreadsheetApp.getUi(); // Same variations.
  //Get API Key
  var apikey = form.apikey;
  apikey = apikey.trim();
  //Get Test ID
  var testid = form.testid;
  testid = testid.trim();
  //Get timeframe
  var timeframe = form.timeframe;
  var timeframe2 = 'range=' + form.timeframe;
  var dateDiff = 4;
  if (timeframe2 == 'range=custom'){
    //ui.alert(form.fromDate);
    timeframe2 = 'from=' + form.fromDate + '&to=' + form.toDate; 
    var fromDate = Date.parse(form.fromDate);
    
    var toDate = Date.parse(form.toDate);
    var timeDiff = toDate - fromDate;
    dateDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }
  
  //Get aggregation (median vs. none)
  var aggregation;
  aggregation = 'median_';
  
  if(form.timeframe == 'last_hour' || form.timeframe == 'last_4_hours' || form.timeframe == 'last_8_hours' || form.timeframe == 'last_12_hours' || form.timeframe =='last_24_hours' || dateDiff < 2){
      aggregation = '';
  }
  //Add new sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.insertSheet(metric + '_' + testid + '_' + timeframe + '_' + SpreadsheetApp.getActive().getSheets().length);
  var sheet = ss.getActiveSheet();
  //Call Rigor API for Server Time data
  var json = JSON.parse(UrlFetchApp.fetch("https://monitoring-api.rigor.com/v2/checks/real_browsers/"+ testid +"/pages/data?" + timeframe2 + "&metrics[]=" + aggregation + metric + "&include_total=true&include_failures=true&api_key=" + apikey));
  var data = [];
  var currentRow = 2;
  
  //create header
  var headers = [['Check ID', 'Selected From Date', 'Selected To Date', 'Selected Range', 'Metrics Name', 'Metrics Unit', 'Page ID', 'Page URL', 'Page Hostname', 'Check From Date', 'Check To Date', 'Value']];
  sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
  
  for(var seriesI = 0; seriesI < json.series.length ; seriesI++){
    //access page data, assign webpage info accordingly
     var rowValues = [[]];
     rowValues[0].push(json.check_id);
     rowValues[0].push(json.from);
     rowValues[0].push(json.to);
     rowValues[0].push(json.range);
     rowValues[0].push(json.metrics[0].name);
     rowValues[0].push(json.metrics[0].unit);
    //if it's the Total row
     if(json.series[seriesI].total == true){
       rowValues[0].push('TOTAL');
       rowValues[0].push('TOTAL');
       rowValues[0].push('TOTAL');
     } else{
       rowValues[0].push(json.series[seriesI].page.id);
       rowValues[0].push(json.series[seriesI].page.url);
       rowValues[0].push(json.series[seriesI].page.hostname);
     }
       var numToKeep = rowValues[0].length
    
    for(var dataI = 0; dataI < json.series[seriesI].data.length ; dataI++){
      rowValues[0].push(json.series[seriesI].data[dataI].from);
      rowValues[0].push(json.series[seriesI].data[dataI].to);
      rowValues[0].push(json.series[seriesI].data[dataI].value);
      sheet.getRange(currentRow, 1, 1, rowValues[0].length).setValues(rowValues);
      rowValues[0].splice(numToKeep, rowValues[0].length - numToKeep);
      currentRow++;
   }
  }
 }
//====================================================================================================================

function deleteSheetsGAS(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var ui = SpreadsheetApp.getUi();
  
  if(sheets.length >= 1){
    var response = ui.alert('Are you sure you want to delete all data sheets?', ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES) {
      for (i = 1; i < sheets.length; i++) {
      ss.deleteSheet(sheets[i]);
    }
 }
    }
  }
