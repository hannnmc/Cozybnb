import csrfFetch from "./csrf";


const SET_RESERVATIONS = 'reservations/setReservations'
const ADD_RESERVATION = 'reservations/addReservation'
const REMOVE_RESERVATION = 'reservations/removeReservation'

const setReservations = reservations => ({
    type: SET_RESERVATIONS,
    payload: reservations
});

export const addReservation = reservation => ({
    type: ADD_RESERVATION,
    payload: reservation
});

const removeReservation = (reservation) => ({
    type: REMOVE_RESERVATION,
    payload: reservation
});

export const destroyReservation = (reservationId) => async dispatch => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: "DELETE"
    })
    const data = await response.json();
    dispatch(removeReservation(data.reservation));
    return response;
}

export const fetchReservations = () => async dispatch => {
    const response = await csrfFetch(`/api/reservations`);
    const data = await response.json();
    dispatch(setReservations(data.reservations));
    return response;
}

export const fetchReservation = reservationId => async dispatch => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`);
    const data = await response.json();
    dispatch(addReservation(data.reservation));
    return response;
}

export const createReservation = (reservation) => async (dispatch) => {
    const {            
        userId,
        listingId,
        guests,
        startDate,
        endDate,
        total,
        days
    } = reservation;
    const response = await csrfFetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify({
            userId,
            listingId,
            guests,
            startDate,
            endDate,
            total,
            days
        })
    });
    const data = await response.json();
    dispatch(addReservation(data.reservation));
    return response;
};

function reservationsReducer(state = {}, action) {
    switch (action.type) {
      case SET_RESERVATIONS: {
          return action.payload;
      }
    case ADD_RESERVATION: {
        const reservation = action.payload;
        return { ...state, [reservation.id]: reservation };
    }
    case REMOVE_RESERVATION: {
        const reservation = action.payload;
        const { [reservation.id]: _remove, ...newState } = state;
        return newState;
    }
      default:
        return state;
    }
}

export default reservationsReducer;


