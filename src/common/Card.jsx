import { useEffect, useState } from "react";
import Button from "./Button";
import "../../src/css/Card.css"

export function Card({ temp, event, onDelete, onToggleChecked }) {
  const handleButtonClick = () => {
    onToggleChecked(event.id);
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <li
      className={
        new Date() > new Date(event.start) && event.isChecked
          ? "List Done"
          : new Date() > new Date(event.start) && "List isntDone"
      }
      key={temp}
      id={"Card" + temp}
    >
      <div className="MainCardDiv">
        {event.title && <h2>{event.title}</h2>}

        {event.description && <h4>{event.description}</h4>}

        {event.location && (
          <p>
            <h3>Koht:</h3> {event.location}
          </p>
        )}

        <p>
          <h3>alguskuupäev:</h3> {new Date(event.start).toLocaleString()},
          lõpetamine: {new Date(event.end).toLocaleString()}
        </p>
        <div className="ButtonHandler">
          <Button
            text={event.isChecked ? "Märgi tehtuks" : "Tehtud"}
            onClick={handleButtonClick}
          />
          <Button
            className="deleteButton"
            text="Kustuta"
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  );
}
