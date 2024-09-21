import { useState, useEffect } from "react";
import Button from "./Button";

export function Card({ temp, event, onDelete }) {
  const [isChecked, setIsChecked] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    return storedEvents[temp] ? storedEvents[temp].checked : false;
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents[temp] = { ...event, checked: isChecked };
    localStorage.setItem("events", JSON.stringify(storedEvents));
  }, [isChecked, temp, event]);

  const handleButtonClick = () => {
    setIsChecked((prev) => !prev);
  };

  const handleDelete = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventIndex = storedEvents.findIndex((e) => e.id === temp);

    if (eventIndex !== -1) {
      storedEvents.splice(eventIndex, 1);
      localStorage.setItem("events", JSON.stringify(storedEvents));
      onDelete(temp);
    }
  };

  return (
    <li
      key={temp}
      id={"Card" + temp}
      style={{ backgroundColor: isChecked ? "lightgreen" : "transparent" }}
    >
      <strong>{event.title}</strong>
      <p>{event.description}</p>
      <p>Место: {event.location}</p>
      <p>
        Дата начала: {new Date(event.start).toLocaleString()}, Дата окончания:{" "}
        {new Date(event.end).toLocaleString()}
      </p>
      <Button text="Удалить" onClick={handleDelete} />
      <Button
        text={isChecked ? "Убрать значение" : "Margi tehtuks"}
        onClick={handleButtonClick}
      />
    </li>
  );
}
