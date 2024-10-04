import csrfFetch from "./csrf";
import * as sessionActions from "./session";

const ADD_USERS = 'users/addUsers';
const ADD_USER = 'users/addUser';


export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
  });
  
  export const addUsers = (users) => ({
    type: ADD_USERS,
    payload: users
  });

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users')
    if (res.ok) {
        const data = await res.json();
        dispatch(addUsers(data.users));
    }
};
export const updateUser = (user) => async dispatch => {
    // debugger
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: "PATCH",
        body: user
    });
    const data = await res.json();
    dispatch(sessionActions.getCurrentUser(data));
    return res;
};

 
function usersReducer(state = {}, action) {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case ADD_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case ADD_USERS:
            return {...nextState,...action.payload};
        default:
            return state;
    }
}

export default usersReducer;