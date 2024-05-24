    import * as fs from 'node:fs'; 
    import axios from 'axios'; //Needed something that would make posts requests and all that
    
    // Defining the API and country, previous iteration was me getting lost in the sauce and overthinking it.
    const apiUrl = 'https://date.nager.at/api/v3/PublicHolidays/2024/AT'; // Had misspelled and omitted v3 and country code, should hopefully work now
    const country = 'Austria'; // this is what gets printed out on line 53 for the country field
    
    // Got to make a GET request to the API endpoint
    axios.get(apiUrl)
      .then(response => {
        // console.log(`response.status: ${response.status}`); 
        // console.log`Response data: ${response.data}`;       
        const holidays = response.data;                     
    
        // Write the holidays to the austrian holidays file, or it would if fs would work
        function writeHolidaysToCsv(holidays: { date: string, description: string, localizeDate: string }[]) {
          const csvWriter = fs.createWriteStream(`austrian-holidays-2024.csv`, {
            flags: 'w',
            encoding: 'utf8',
          });
    
          // Header
          csvWriter.write(`"Name","Date","Days until","Weekends"\n`);
    
          // Write each holiday record
          holidays.forEach((holiday) => {
            const date = new Date(holiday.date);
            const today = new Date();
            let daysUntil = Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
            if (isNaN(daysUntil)) {
              daysUntil = 0;
            } else {
              daysUntil = Number(daysUntil);
            }

            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // double check this with console logs and a quick function if have time
    
            csvWriter.write(`"${holiday.description}","${holiday.date}","${daysUntil}","${isWeekend ? 'Yes' : 'No'}"\n`);
          });
    
          // Close the CSV writer
          csvWriter.end();
        }
    
        // Write the holidays to a CSV file
        writeHolidaysToCsv(holidays);
      })
      .catch(error => {
        console.error(error);
      });
    
    // Print a message to the console
    console.log(`Austrian holidays for ${country} have been written to a CSV file.`);

