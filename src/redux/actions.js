import * as types from "./actionTypes.js";
import { createStore, applyMiddleware } from "redux";
import database from "../firebase";
import thunkMiddleware from "redux-thunk";
import Reducer from "./reducers";

export const getTasks = tasks => ({ type: types.GET_TASKS, tasks });
export const addTask = task => ({ type: types.ADD_TASK, task });
export const removeTask = task => ({ type: types.REMOVE_TASK, task });
export const setChoice = tasks => ({ type: types.SET_TABLE_CHOICE, tasks });

/**
 * LISTENERS
 */

export const watchTaskAddedEvent = dispatch => {
  database.ref(`/rooms/regular/`).on("child_changed", snap => {
    dispatch(getTasksThunk());
  });

  database.ref(`/rooms/lux/`).on("child_changed", snap => {
    dispatch(getTasksThunk());
  });
  database.ref(`/rooms/forOne/`).on("child_changed", snap => {
    dispatch(getTasksThunk());
  });
  database.ref(`/rooms/twoBeds/`).on("child_changed", snap => {
    dispatch(getTasksThunk());
  });
  database.ref(`/rooms/regular/`).on("child_added", snap => {
    dispatch(getTasksThunk());
  });

  database.ref(`/rooms/lux/`).on("child_added", snap => {
    dispatch(getTasksThunk());
  });
  database.ref(`/rooms/forOne/`).on("child_added", snap => {
    dispatch(getTasksThunk());
  });
  database.ref(`/rooms/twoBeds/`).on("child_added", snap => {
    dispatch(getTasksThunk());
  });
};

export const watchTaskRemovedEvent = dispatch => {
  database.ref(`/rooms/regular`).on("child_removed", snap => {
    dispatch(removeTask(snap.val()));
  });
  database.ref(`/rooms/lux`).on("child_removed", snap => {
    dispatch(removeTask(snap.val()));
  });
  database.ref(`/rooms/forOne`).on("child_removed", snap => {
    dispatch(removeTask(snap.val()));
  });
  database.ref(`/rooms/twoBeds`).on("child_removed", snap => {
    dispatch(removeTask(snap.val()));
  });
};

/**
 * THUNKS
 */
export const getTasksThunk = () => dispatch => {
  const tasks = [];
  database
    .ref(`/rooms/`)
    .once("value", snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task);
      });
    })
    .then(() => dispatch(getTasks(tasks)));
};

export default createStore(Reducer, applyMiddleware(thunkMiddleware));
