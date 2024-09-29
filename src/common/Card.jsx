import Button from "./Button";
import "../../src/css/Card.css"
import { RetunClass } from "./ReturnClass";


export function Card({ temp, event, onDelete, onToggleChecked, now }) {
  const handleButtonClick = () => {
    onToggleChecked(event.id);
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <li
  className={
    RetunClass({ now: now, eventStart: new Date(event.start), eventIsChecked: event.isChecked })
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

