import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { Card } from "../common/Card";
import Input from "../common/Input";
import { ProgressBar } from "../common/ProgressBar";

export function MainPage(props) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ProgressBar events={props.events} />
      <div style={{ marginLeft: "50px", padding: "20px", flex: 1 }}>
        <h1>Google Calendar Clone</h1>

        <div {...props.getRootProps({ className: "dropzone" })}>
          <input {...props.getInputProps()} />
          <p>Перетащите сюда .ics файл или кликните для загрузки</p>
        </div>

        <h2>Добавить новое событие:</h2>
        <div className="eventCreatingBox">
          <div className="postEvent">
            <Input
              value={props.newEvent.title}
              onChange={props.handleChange}
              type="text"
              name="title"
              placeholder="Название"
            />
            <Input
              type="text"
              name="description"
              placeholder="Описание"
              value={props.newEvent.description}
              onChange={props.handleChange}
            />
            <Input
              type="text"
              name="location"
              placeholder="Место"
              value={props.newEvent.location}
              onChange={props.handleChange}
            />
            <Input
              type="datetime-local"
              name="start"
              placeholder="Дата начала"
              value={props.newEvent.start}
              onChange={props.handleChange}
            />
            <Input
              type="datetime-local"
              name="end"
              placeholder="Дата окончания"
              value={props.newEvent.end}
              onChange={props.handleChange}
            />
            <Button onClick={props.handleAddEvent} text="Добавить событие" />
          </div>
        </div>

        <h2>События:</h2>
        <ul>
          {props.events.map((event) => (
            <Card
              key={event.id}
              temp={event.id}
              event={event}
              onDelete={props.onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
