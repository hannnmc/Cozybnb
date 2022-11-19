import csrfFetch from "./csrf";


const SET_REVIEWS = 'reviews/setReviews'
const ADD_REVIEW = 'reviews/addReview'
const REMOVE_REVIEW = 'reviews/removeReview'

const setReviews = reviews => ({
    type: SET_REVIEWS,
    payload: reviews
});

export const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
});

const removeReview = (review) => ({
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
    dispatch(setReviews(data.reviews));
    return response;
}

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
      case SET_REVIEWS: {
          return action.payload;
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


