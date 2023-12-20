
import * as ical from 'ical.js';

// TODO: Pull ics from google calendar or something

var allEvents = [];

export function getEvents(icsData) {
    const data = icsData;
    const jcalData  = ical.parse(data);

    const comp = new ical.Component(jcalData);

    const vevents = comp.getAllSubcomponents("vevent");

    allEvents = vevents.map(vevent => {
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
    thisWeekStart.setDate(startDate + 2);
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(startDate + 7);
    return getEventsFromRange(thisWeekStart, thisWeekEnd);
}

export function upcomingNextWeek() {
    const nextWeekStart = new Date();
    // truncate to midnight
    nextWeekStart.setHours(0, 0, 0, 0);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
    return getEventsFromRange(nextWeekStart, nextWeekEnd);
}

