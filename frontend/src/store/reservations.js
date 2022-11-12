import csrfFetch from "./csrf";


const SET_RESERVATIONS = 'reservations/setReservations'
const ADD_RESERVATION = 'reservations/addReservation'

const setReservations = reservations => ({
    type: SET_RESERVATIONS,
    payload: reservations
});

export const addReservation = reservation => ({
    type: ADD_RESERVATION,
    payload: reservation
});

export const fetchReservations = filters => async dispatch => {
    const response = await csrfFetch(`/api/reservations}`);
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
        total
    } = reservation;
    const response = await csrfFetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
            userId,
            listingId,
            guests,
            startDate,
            endDate,
            total
        })
    });
    const data = await response.json();
    dispatch(addReservation(data.reservation));
    return response;
};

function reservationsReducer(state = {}, action) {
    switch (action.type) {
      case SET_RESERVATIONS:
        return action.payload;
    case ADD_RESERVATION:
        const reservation = action.payload;
        return { ...state, [reservation.id]: reservation };
      default:
        return state;
    }
}

export default reservationsReducer;


