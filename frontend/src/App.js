import "./App.css";
import "./styles.css";
import { useReducer, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketReducer from "./reducers/ticketReducer";
import TicketList from "./components/TicketList";
import { sortTicket } from "./utils/sortingUtils";
import { getBugList } from "./services/commonApiService";

function App() {
  const [state, dispatch] = useReducer(TicketReducer, {
    tickets: [],
    editingTicket: null,
    sortingPreference: "High to low",
  });
  useEffect(() => {
    getBugList()
      .then((res) => {
        console.log("res", res);
        if (res) {
          dispatch({ type: "SET_TICKETS", payload: res.data });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  // const [state, dispatch] = useReducer(TicketReducer, initialState);
  const sortedTickets = sortTicket(state.tickets, state.sortingPreference);
  return (
    <div className="App">
      <div className="container">
        <h1>Bug Tracker</h1>
        <TicketForm
          key={state.tickets._id}
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>

        {state.tickets.length > 0 && (
          <div>
            <h2>All Tickets</h2>
            <select
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to low">High to low</option>
              <option value="Low to high">Low to high</option>
            </select>
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
