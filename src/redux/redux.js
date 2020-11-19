import { combineReducers, createStore } from "redux";

// actions
export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const removeUser = () => ({
  type: "REMOVE_USER",
});

// reducers
export const user = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "REMOVE_USER":
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  user,
});

// store
export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}

export const store = configureStore();
