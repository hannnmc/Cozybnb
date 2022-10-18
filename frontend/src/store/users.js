import csrfFetch from "./csrf";

const SET_USERS = 'users/setUsers'

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users')
    if (res.ok) {
        const data = await res.json();
        dispatch(setUsers(data.users));
    }
}
 
function usersReducer(state = {}, action) {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
      case SET_USERS:
        return {...nextState,...action.payload};
      default:
        return state;
    }
}

export default usersReducer;