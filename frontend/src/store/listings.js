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
    const response = await csrfFetch(`/api/listings?${filterParams}`);
    const data = await response.json();
    dispatch(setListings(data.listings));
    return response;
}

export const fetchListing = listingId => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    const data = await response.json();
    dispatch(addListing(data.listing));
    // dispatch(addUsers(data.users));
    // dispatch(addReviews(data.reviews));
    return response;
}

export const createListing = (listing) => async (dispatch) => {
    const { title,
        description, 
        lat, 
        lng, 
        price,
        guests, 
        bedrooms,
        beds,
        baths,
        address,
        city,
        state,
        country,
        wifi,
        propType,
        parking,
        kitchen,
        dedicatedWorkspace,
        petsAllowed,
        usersId
    } = listing;
    const response = await csrfFetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
            title,
            description, 
            lat, 
            lng, 
            price,
            guests, 
            bedrooms,
            beds,
            baths,
            address,
            city,
            state,
            country,
            wifi,
            propType,
            parking,
            kitchen,
            dedicatedWorkspace,
            petsAllowed,
            usersId
        })
    });
    const data = await response.json();
    dispatch(createListing(data.listing));
    return response;
};

function listingsReducer(state = {}, action) {
    switch (action.type) {
      case SET_LISTINGS:
        return action.payload;
    case ADD_LISTING:
        const listing = action.payload;
        return { ...state, [listing.id]: listing };
      default:
        return state;
    }
}

export default listingsReducer;