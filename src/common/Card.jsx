import Button from "./Button";

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
          ? "Done"
          : new Date() > new Date(event.start) && "isntDone"
      }
      key={temp}
      id={"Card" + temp}
      style={{ backgroundColor: event.isChecked && "lightgreen" }}
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
            text={event.isChecked ? "Eemalda väärtus" : "Lisa väärtust"}
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
