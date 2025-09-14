export default function TicketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        editingTicket: null,
      };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) => {
          return ticket.id === action.payload.id ? action.payload : ticket;
        }),
        editingTicket: null,
      };
    case "DELETE_TICKET":
      if (state.editingTicket && state.editingTicket._id === action.payload) {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket._id !== action.payload
          ),
          editingTicket: null,
        };
      } else {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket._id !== action.payload
          ),
        };
      }
    case "SET_EDITING_TICKET":
      return {
        ...state,
        editingTicket: action.payload,
      };
    case "CANCEL_EDITING_TICKET":
      return {
        ...state,
        editingTicket: null,
      };
    case "SET_SORTING":
      return {
        ...state,
        sortingPreference: action.payload,
      };
    case "SET_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };
    default:
      return state;
  }
}
