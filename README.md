# Rigor Monitoring API Data Pull Tool

Use Google Sheets to pull load time data from Rigor.

The tool uses your Rigor Monitoring API key to access your Real Browser Check (RBC) data. Using the appropriate Check ID, you can then pull the following metrics over a specified timeframe: Sserver Time, Start Render Time, DOM Load Time, Onload Time, Visually Complete Time, Fully Loaded Time, or Speed Index. In addition, you can select multiple Load Times simultaneously with each Load Time populating a new sheet.

If you have questions about these timing metrics, please reference Rigor’s [Knowledge Base](https://help.rigor.com/hc/en-us/articles/115006741308-Performance-Metrics-Glossary).

You can select multiple load times simultaneously, with each load time type populating a new sheet.

NOTE: This tool is NOT supported by Rigor, rather it is offered for free based on feedback from customers.

# Using the Tool

1. Make a copy of the spreadsheet:  
https://docs.google.com/spreadsheets/d/1YUC2SvU8utOHjRGtN-37s5p0kCQqSVRLiDY1RBpWvyw/edit?usp=sharing  

![Rigor Data Pull - Copy Spreadsheet](https://github.com/Rigor/LoadTimesTool/blob/master/images/data_pull_copy.gif?raw=true)  

   The spreadsheet is shared read-only, so you'll first need to make a copy. This tool has not yet been verified by Google, so you will have to provide authorization for the tool (follow the instructions on the spreadsheet)

2. Entering your API Key 

![Rigor Data Pull - Copy Spreadsheet](https://github.com/Rigor/LoadTimesTool/blob/master/images/data_pull_api_key.gif?raw=true)  

   When the sidebar loads and after the script has been enabled, enter your API Key into the sidebar. You can find your API Key here:      https://monitoring.rigor.com//settings
   
   Once you have entered your API Key, click RUN to populate the spreadsheet with data for all RBCs in your account
   
   NOTE: The tool hits the https://monitoring-api.rigor.com/v2/checks/real_browsers/ API endpoint. The parameters can be edited in the      script to customize the tool. For more information on the Rigor API and available parameters, visit https://monitoring-api.rigor.com

3. Grabbing the Check ID and running the tool

![Rigor Data Pull - Copy Spreadsheet](https://github.com/Rigor/LoadTimesTool/blob/master/images/data_pull_get_metrics.gif?raw=true)  

   Select the Check ID for the check you want to pull data for (Column A) and copy it into the sidebar where prompted. Then, select the appropriate metrics you want to pull data for. Finally, choose a timeframe for the data. Note: if you select Custom, you will be asked to select a From Date and a To Date.
   
   NOTE: Timing data is rolled-up based on timeframe:
   
     0-24 hours: every run is returned;
     24 hours - 3 days: hourly rollups;
     Over 3 days: daily rollups.
     For more information, click here https://help.rigor.com/hc/en-us/articles/115004589167-How-to-View-Your-Data

4. Deleting Sheets

![Rigor Data Pull - Copy Spreadsheet](https://github.com/Rigor/LoadTimesTool/blob/master/images/data_pull_delete.gif?raw=true)  
   
   Everytime the tool is run, one new sheet will be added for each timing checked. Quickly delete all report sheets by clicking the        "Delete Reports" button at the bottom of the sidebar. NOTE: Do NOT delete the sheet titled "CHECKS_LIST"
