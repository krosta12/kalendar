

export function RetunClass({ now, eventStart, eventIsChecked }) {
  if (now > eventStart && eventIsChecked) {
    return "List Done";
  }
  if (now > eventStart) {
    return "List isntDone";
  }
  if (now < eventStart && eventIsChecked) {
    return "List Done";
  }
  if (now < eventStart && !eventIsChecked) {
    return "List isntDone hasTime";
  }
}
