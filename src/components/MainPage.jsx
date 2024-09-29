import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { Card } from "../common/Card";
import Input from "../common/Input";
import { ProgressBar } from "../common/ProgressBar";
import "../css/MainPage.css"

export function MainPage(props) {
  return (
    <div className="MainBox">
      <ProgressBar events={props.events} />
      <div className="NonotaHandler">
        <h1>Kalendar by nonota</h1>

        <div {...props.getRootProps({ className: "dropzone" })}>
          <input {...props.getInputProps()} />
          <p className="FileDropper">Lohistage ics-fail või klõpsake üleslaadimiseks.</p>
        </div>

        <h2>Lisage uus sündmus:</h2>
        <div className="eventCreatingBox">
          <div className="postEvent">
            <Input
              value={props.newEvent.title}
              onChange={props.handleChange}
              type="text"
              name="title"
              placeholder="Nimi"
            />
            <Input
              type="text"
              name="description"
              placeholder="Kirjeldus"
              value={props.newEvent.description}
              onChange={props.handleChange}
            />
            <Input
              type="text"
              name="location"
              placeholder="Koht"
              value={props.newEvent.location}
              onChange={props.handleChange}
            />
            <Input
              type="datetime-local"
              name="start"
              placeholder="alguskuupäev"
              value={props.newEvent.start}
              onChange={props.handleChange}
              min={new Date().toISOString().slice(0, 16)}
            />
            <Input
              type="datetime-local"
              name="end"
              placeholder="Lõppkuupäev"
              value={props.newEvent.end}
              onChange={props.handleChange}
              min={props.newEvent.start}
            />

            <Button onClick={props.handleAddEvent} text="Lisage sündmus" />
          </div>
        </div>

        <h2>Sündmused:</h2>
        <ul>
          {props.events.map((event) => (
            <Card
              key={event.id}
              temp={event.id}
              event={event}
              onDelete={props.onDelete}
              onToggleChecked={props.onToggleChecked}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
