import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ICAL from "ical.js";

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    start: "",
    end: "",
  });

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
              },
            ];
          }
        });

        setEvents((prevEvents) => sortEvents([...prevEvents, ...newEvents]));
      };

      reader.readAsText(file);
    });
  };
  const sortEvents = (events) => {
    return events.sort((a, b) => new Date(a.start) - new Date(b.start));
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
    };

    setEvents((prevEvents) => sortEvents([...prevEvents, newEventData]));
    setNewEvent({
      title: "",
      description: "",
      location: "",
      start: "",
      end: "",
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
      <h1>Google Calendar Clone</h1>

      <div {...getRootProps({ className: "dropzone" })} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Перетащите сюда .ics файл или кликните для загрузки</p>
      </div>

      <h2>Добавить новое событие:</h2>
      <div style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={newEvent.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Описание"
          value={newEvent.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Место"
          value={newEvent.location}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="start"
          placeholder="Дата начала"
          value={newEvent.start}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="end"
          placeholder="Дата окончания"
          value={newEvent.end}
          onChange={handleChange}
        />
        <button onClick={handleAddEvent}>Добавить событие</button>
      </div>

      <h2>События:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong>
            <p>{event.description}</p>
            <p>Место: {event.location}</p>
            <p>
              Дата начала: {new Date(event.start).toLocaleString()}, Дата
              окончания: {new Date(event.end).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  dropzone: {
    border: "2px dashed #000",
    padding: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
};

export default App;
