import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ICAL from "ical.js";
import { MainPage } from "./components/MainPage";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    start: "",
    end: "",
    id: typeof uuidv4(),
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const eventsWithIds = events.map((event) => {
        if (!event.id) {
          return { ...event, id: uuidv4() };
        }
        return event;
      });

      localStorage.setItem("events", JSON.stringify(eventsWithIds));
    }
  }, [events]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;
        const jcalData = ICAL.parse(fileContent);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");

        const newEvents = vevents.flatMap((vevent) => {
          const event = new ICAL.Event(vevent);

          if (event.isRecurring()) {
            const iterator = event.iterator();
            const occurrences = [];

            const today = ICAL.Time.now();
            const tenYearsFromNow = today.clone();
            tenYearsFromNow.year += 10;

            let nextOccurrence = iterator.next();
            while (
              nextOccurrence &&
              nextOccurrence.compare(tenYearsFromNow) <= 0
            ) {
              occurrences.push({
                title: event.summary,
                description: event.description,
                location: event.location,
                start: nextOccurrence.toString(),
                end: event.endDate.toString(),
                id: event.id,
              });
              nextOccurrence = iterator.next();
            }

            return occurrences;
          } else {
            return [
              {
                title: event.summary,
                description: event.description,
                location: event.location,
                start: event.startDate.toString(),
                end: event.endDate.toString(),
                id: event.id,
              },
            ];
          }
        });

        const filteredEvents = filterDuplicates([...events, ...newEvents]);
        setEvents(sortEvents(filteredEvents));
      };

      reader.readAsText(file);
    });
  };

  const sortEvents = (events) => {
    return events.sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const filterDuplicates = (newEvents) => {
    const uniqueEvents = new Map();
    newEvents.forEach((event) => {
      const key = `${event.title}-${event.start}`;
      if (!uniqueEvents.has(key)) {
        uniqueEvents.set(key, event);
      }
    });
    return Array.from(uniqueEvents.values());
  };
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    const { title, description, location, start, end } = newEvent;
    if (!title || !start || !end) {
      alert(
        "Пожалуйста, заполните обязательные поля: название, дату начала и дату окончания"
      );
      return;
    }

    const newEventData = {
      title,
      description,
      location,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      id: uuidv4(),
    };

    const updatedEvents = filterDuplicates([...events, newEventData]);
    setEvents(sortEvents(updatedEvents));

    setNewEvent({
      title: "",
      description: "",
      location: "",
      start: "",
      end: "",
      id: uuidv4(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".ics",
  });

  return (
    <div className="App">
      <MainPage
        getRootProps={getRootProps}
        newEvent={newEvent}
        handleChange={handleChange}
        events={events}
        getInputProps={getInputProps}
        onDelete={handleDeleteEvent}
        handleAddEvent={handleAddEvent}
      />
    </div>
  );
}

export default App;
