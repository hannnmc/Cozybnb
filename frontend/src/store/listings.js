import csrfFetch from "./csrf";
import { addReviews } from './reviews';
import { addUsers } from './users';


const SET_LISTINGS = 'listings/setListings'
const ADD_LISTING = 'listings/addListing'
const REMOVE_LISTING = 'listings/removeListing'

const setListings = listings => ({
    type: SET_LISTINGS,
    payload: listings
});

export const addListing = listing => ({
    type: ADD_LISTING,
    payload: listing
});

export const removeListing = listing => ({
    type: REMOVE_LISTING,
    payload: listing
});

export const fetchListings = filters => async dispatch => {
    const filterParams = new URLSearchParams(filters);
    const response = await csrfFetch(`/api/listings?${filterParams}`);
    const data = await response.json();
    dispatch(setListings(data.listings));
    return response;
}

export const fetchListing = listingId => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    const data = await response.json();
    dispatch(addListing(data.listing));
    dispatch(addUsers(data.users));
    dispatch(addReviews(data.reviews));
    return response;
}

export const destroyListing = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`, {
        method: "DELETE"
    })
    const data = await response.json();
    dispatch(removeListing(data.listing));
    return response;
}

export const createListing = (formData) => async (dispatch) => {

    const response = await csrfFetch("/api/listings", {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    dispatch(addListing(data.listing));
    return response;
};

export const updateListing = (formData, listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`, {
        method: "PATCH",
        body: formData
    });
    const data = await res.json();
    dispatch(fetchListing(listingId));
    return res;
};


function listingsReducer(state = {}, action) {
    switch (action.type) {
      case SET_LISTINGS:
        return action.payload;
    case ADD_LISTING:
        const listing = action.payload;
        return { ...state, [listing.id]: listing };
    case REMOVE_LISTING: {
        const listing = action.payload;
        const { [listing.id]: _remove, ...newState } = state;
        return newState;
    }
      default:
        return state;
    }
}

export default listingsReducer;