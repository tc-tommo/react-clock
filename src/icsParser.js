
import * as ical from 'ical.js';

// TODO: Pull ics from google calendar or something

const ics_source = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART;VALUE=DATE:20231219T120000
DTEND;VALUE=DATE:20231219T235959
SUMMARY:Sample Event
DESCRIPTION:This is a sample event
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20231219
DTEND;VALUE=DATE:20231220
SUMMARY:Brunch Club!
DESCRIPTION:Sample event 1
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20231220
DTEND;VALUE=DATE:20231221
SUMMARY:Novelty Socks Day
DESCRIPTION:Sample event 2
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20231221
DTEND;VALUE=DATE:20231222
SUMMARY:Ice Cream Social
DESCRIPTION:Sample event 3
END:VEVENT
END:VCALENDAR
`;

function getEvents(icsPath) {
    const data = ics_source;
    const  jcalData  = ical.parse(data);

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



const allEvents = getEvents(ics_source);


function getEventsFromRange(start, end) {
    return allEvents.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= start && eventDate < end;
    });
}

export function upcomingToday() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getEventsFromRange(today, tomorrow);
}

export function upcomingTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    return getEventsFromRange(tomorrow, dayAfterTomorrow);
}

export function upcomingNextWeek() {
    const nextWeekStart = new Date();
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
    return getEventsFromRange(nextWeekStart, nextWeekEnd);
}

