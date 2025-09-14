import React, { useState, useEffect } from "react";
import { updateBug, saveBugs } from "../services/commonApiService";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleCancelEdit = () => {
    clearForm();
    dispatch({
      type: "CANCEL_EDITING_TICKET",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      id: editingTicket ? editingTicket._id : new Date().toISOString(),
      title,
      description,
      priority,
    };
    console.log("ticketData", ticketData);
    if (editingTicket) {
      updateBug(ticketData)
        .then((res) => {
          console.log("res", res);
          dispatch({
            type: "UPDATE_TICKET",
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      saveBugs(ticketData)
        .then((res) => {
          console.log("res", res);
          dispatch({
            type: "ADD_TICKET",
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {Object.entries(priorityLabels).map(([value, label]) => {
          return (
            <label key={value} className="priority-label">
              <input
                type="radio"
                value={value}
                checked={priority == value}
                onChange={(e) => setPriority(e.target.value)}
              ></input>
              {label}
            </label>
          );
        })}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
      {editingTicket && (
        <button className="button" onClick={handleCancelEdit}>
          Cancel edit
        </button>
      )}
    </form>
  );
}
