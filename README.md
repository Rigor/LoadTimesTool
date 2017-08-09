# LoadTimesTool

Use Google Sheets to pull load time data from Rigor

The tool uses your Rigor Monitoring API key to access your Real Browser Checks (RBCs). You can then pull relevant data by selecting a check based on Check ID, which load times to pull data for (server time, start render time, DOM load time, on load time, visually complete time, fully loaded time, or speed index), and a timeframe for the data.

You can select multiple load times simultaneously, with each load time type populating a new sheet.

# Using

1. Make a copy of Spreadsheet

	 https://docs.google.com/spreadsheets/d/1YUC2SvU8utOHjRGtN-37s5p0kCQqSVRLiDY1RBpWvyw/edit?usp=sharing

	 The spreadsheet is shared read-only so you'll first need to make a copy (follow the instructions on the spreadsheet)

2. Entering your API Key

   When the sidebar loads and after the script has been enabled, enter your API Key into the sidebar. You can find your API Key here:        https://monitoring.rigor.com//settings
   
   Once you have entered your API Key, click RUN to populate the spreadsheet with data for all RBCs in your account

3. Grabbing the Check ID and running the tool

	 Select the Check ID for the check you want to pull data for (Column A), and copy it into the sidebar where prompted. Then check the      checkboxes for the load times you want to pull data for. Finally, choose a timeframe for the data--if you select Custom, you will be    asked to select a From date and a To date. 
   
   NOTE: Load data is rolled-up based on timeframe
     0-24 hours: every run is returned
     24 hours - 3 days: hourly rollups
     Over 3 days: daily rollups

4. Deleting Sheets

	 Everytime the tool is run, one new sheet will be added for each load time checked. Quickly delete all report sheets by clicking the        "Delete Reports" button at the bottom of the sidebar. NOTE: Do NOT delete the sheet titled "CHECKS_LIST"
