import csrfFetch from "./csrf";


const SET_LISTINGS = 'listings/setListings'
const ADD_LISTING = 'listings/addListing'

const setListings = listings => ({
    type: SET_LISTINGS,
    payload: listings
});

export const addListing = listing => ({
    type: ADD_LISTING,
    payload: listing
});

export const fetchListings = filters => async dispatch => {
    const filterParams = new URLSearchParams(filters);
    const response = await csrfFetch(`/api/listings`);
    const data = await response.json();
    dispatch(setListings(data.listings));
    return response;
}

function listingsReducer(state = {}, action) {
    switch (action.type) {
      case SET_LISTINGS:
        return action.payload;
      default:
        return state;
    }
}

export default listingsReducer;