import * as URL from 'url' //Fairly sure I need to install a module into this for the GET to work from API, spend some time looking into options

interface Holiday {
    name: string;
    date: string;
    daysUntil: string;
    weekends: string;
}

async function getHolidays() {
    const response = await fetch('https://date.nager.at/api/publicholidays/2024/Austria');
    const holidays = await response.json();
    const csvData: Holiday[] = [];

    for (const holiday of holidays) {
        const date = new Date(holiday.date);
        const daysUntil = date > new Date() ? `+${Math.round((date.getTime() - Date.now()) / (1000 * 86400))}` : ''; 
        const weekends = holiday.date.includes('Saturday') || holiday.date.includes('Sunday') ? 'Yes' : 'No';
        csvData.push({ //Went through whole file, forgot that csv parser module is needed for this
            name: holiday.name,
            date: holiday.date,
            daysUntil: daysUntil, 
            weekends: weekends,
        });
    }


const csvString = csvData.map((holiday) => Object.values(holiday).join(',')).join('/n');
const csvFile = `austrian-holidays-2024.csv`;

const formData = new FormData();
formData.append('sheet', '1');
formData.append('response', csvString)
formData.append('title', 'austrian-holidays-2024.csv');

await
fetch('https://docs.google.com/forms/d/e/1FAIP2AaM9U3KUqOxQYwXsQjYkZ7v__KQxGwLQK3iO1vGjPkgRqZMzQ/formResponse',
{
    method: 'POST',
    body: formData,
});

console.log(`CSV file saved to ${csvFile}`) //Providing feedback to confirm the necessary action is completed
}

getHolidays();

