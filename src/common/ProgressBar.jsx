import { useEffect, useState } from "react";
import "../css/ProgressBar.css";

export function ProgressBar(props) {
  const [bar, setBar] = useState(0);

  const style = {
    height:
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) + "px",
  };
  function getCard() {
    const now = new Date();

    const futureEvents = props.events.filter(
      (event) => new Date(event.start) > now
    );

    const closestEvent = futureEvents.reduce((prev, curr) => {
      return new Date(curr.start) < new Date(prev.start) ? curr : prev;
    }, futureEvents[0]);
    return closestEvent;
  }

  useEffect(() => {
    const closestEvent = getCard();

    if (closestEvent) {
      const element = document.getElementById("Card" + closestEvent.id);

      if (element) {
        const rect = element.getBoundingClientRect();
        const elementPosition = rect.top + window.scrollY;

        setBar(elementPosition);
      }
    }
  }, [props.events]);

  const zap = {
    height: bar + "px",
  };

  return (
    <div className="container" style={style}>
      <div className="Bar" style={zap}></div>
    </div>
  );
}
