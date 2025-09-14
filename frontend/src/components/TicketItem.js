import React from "react";
import { deleteBug } from "../services/commonApiService";
export default function TicketItem({ ticket, dispatch }) {
  const { id, title, description, priority } = ticket;
  const priorityClass = {
    1: "priority-low",
    2: "priority-medium",
    3: "priority-high",
  };

  const handleDelete = () => {
    deleteBug(ticket._id)
      .then((res) => {
        console.log("res", res);
        dispatch({ type: "DELETE_TICKET", payload: ticket._id });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClass[ticket.priority]}`}></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="button" onClick={handleDelete}>
        Delete
      </button>
      <button
        className="button"
        onClick={() =>
          dispatch({ type: "SET_EDITING_TICKET", payload: ticket })
        }
      >
        Edit
      </button>
    </div>
  );
}
