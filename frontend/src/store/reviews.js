import csrfFetch from "./csrf";
import { addListing } from "./listings.js";
import { addUser } from "./users.js";


const ADD_REVIEWS = 'reviews/addReviews'
const ADD_REVIEW = 'reviews/addReview'
const REMOVE_REVIEW = 'reviews/removeReview'

export const addReviews = reviews => ({
    type: ADD_REVIEWS,
    payload: reviews
  });

export const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
});

export const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    payload: review
});

export const destroyReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    const data = await response.json();
    dispatch(removeReview(data.review));
    return response;
}

export const fetchReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews`);
    const data = await response.json();
    dispatch(addReviews(data.reviews));
    return response;
}

// export const fetchListingReviews = (listingId) => state => {
//     Object.values(state.reviews)
//     .filter((review => review.listingId === listingId)
//     .map(review => ({
//         ...review,
//         author: state.users[review.userId]?.id
//     }))
//     )
// }

export const fetchReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`);
    const data = await response.json();
    dispatch(addReview(data.review));
    return response;
}

export const createReview = (review) => async (dispatch) => {
    const {            
        listingId,
        body,
        rating
    } = review;
    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
            listingId,
            body,
            rating
        })
    });
    const data = await response.json();
    dispatch(addReview(data.review));
    return response;
};

function reviewsReducer(state = {}, action) {
    switch (action.type) {
      case ADD_REVIEWS: {
        const reviews = action.payload;
        return { ...state, ...reviews };
      }
    case ADD_REVIEW: {
        const review = action.payload;
        return { ...state, [review.id]: review };
    }
    case REMOVE_REVIEW: {
        const review = action.payload;
        const { [review.id]: _remove, ...newState } = state;
        return newState;
    }
      default:
        return state;
    }
}

export default reviewsReducer;


