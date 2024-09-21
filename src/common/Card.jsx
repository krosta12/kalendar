import { useState, useEffect } from "react";
import Button from "./Button";

export function Card({ temp, event, onDelete }) {
  const [isChecked, setIsChecked] = useState(() => {
    const storedValue = localStorage.getItem(`event-${event.id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem(`event-${event.id}`, JSON.stringify(isChecked));
  }, [isChecked, event.id]);

  const handleButtonClick = () => {
    setIsChecked((prev) => !prev);
  };

  const handleDelete = () => {
    localStorage.removeItem(`event-${event.id}`);
    onDelete(event.id);
  };

  return (
    <li
      className={
        new Date() > new Date(event.start) && isChecked
          ? "Done"
          : new Date() > new Date(event.start) && "isntDone"
      }
      key={temp}
      id={"Card" + temp}
      style={{ backgroundColor: isChecked && "lightgreen" }}
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
        text={isChecked ? "Убрать значение" : "Добавить значение"}
        onClick={handleButtonClick}
      />
    </li>
  );
}
