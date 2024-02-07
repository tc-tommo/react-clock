
import * as ical from 'ical.js';


const GIST_URL = "https://gist.githubusercontent.com/tc-tommo/f190f6e997f61982c36b794060a99f7f/raw/"

function getIcsData(url) {
    
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            return data;
        });
}

// read the ics file from the gist into allEvents
// if error, log and allEvents = []
let allEvents = [];

getIcsData(GIST_URL)
    .then(data => {
        console.log(data);
        allEvents = getEvents(data);
    })
    .catch(err => {
        console.log(err);
        allEvents = [];
    });

export function getEvents(icsData) {
    if (!icsData) {
        return [];
    }
    const data = icsData;
    const jcalData  = ical.parse(data);

    const comp = new ical.Component(jcalData);

    const vevents = comp.getAllSubcomponents("vevent");

    return vevents.map(vevent => {
        const event = new ical.Event(vevent);
        return {
            summary: event.summary,
            description: event.description,
            start: event.startDate.toString(),
            end: event.endDate.toString(),
        };
    });
  
}


function getEventsFromRange(start, end) {
    return allEvents.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= start && eventDate < end;
    });
}

export function upcomingToday() {
    const today = new Date();
    // truncate to midnight
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getEventsFromRange(today, tomorrow);
}

export function upcomingTomorrow() {
    const tomorrow = new Date();
    // truncate to midnight
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    return getEventsFromRange(tomorrow, dayAfterTomorrow);
}

export function upcomingThisWeek() {
    const thisWeekStart = new Date();
    // truncate to midnight
    thisWeekStart.setHours(0, 0, 0, 0);
    const startDate = thisWeekStart.getDate();
    const thisWeekEnd = new Date(thisWeekStart);
    // set to sunday of this week
    const daysUntilSunday = 7 - thisWeekStart.getDay();
    thisWeekEnd.setDate(thisWeekEnd.getDate() + daysUntilSunday);
    return getEventsFromRange(thisWeekStart, thisWeekEnd);
}

export function upcomingNextWeek() {
    const nextWeekStart = new Date();
    // truncate to midnight
    nextWeekStart.setHours(0, 0, 0, 0);
    const daysUntilMonday = 8 - nextWeekStart.getDay();
    nextWeekStart.setDate(nextWeekStart.getDate() + daysUntilMonday);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
    return getEventsFromRange(nextWeekStart, nextWeekEnd);
}
