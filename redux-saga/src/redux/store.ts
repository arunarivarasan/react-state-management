
import createSagaMiddleware from '@redux-saga/core';

import { applyMiddleware, compose, createStore } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { Todo, addToDoDetails, deleteTodoDetails, getTodoList, updateTodoDetails } from '../backend/api';
import { reducer } from './reducer';

export interface State {
  todos: Todo[];
}

export const initialState: State = {
  todos: [],
};

function* getTodos() {
    const todos: Todo[] = yield getTodoList();
    yield put({ type: "SET_TODOS_DONE", payload: todos });
}

function* updateTodo({ payload }: { type: "UPDATE_TODO", payload: Todo}) {
    yield updateTodoDetails(payload);
    yield put({ type: "FETCH_TODOS"});
}
function* deleteTodo({ payload }: { type: "DELETE_TODO", payload: Todo}) {
    yield deleteTodoDetails(payload);
    yield put({ type: "FETCH_TODOS"});
}   

function* addTodo({ payload }: { type: "ADD_TODO", payload: string}) {
    yield addToDoDetails(payload);
    yield put({ type: "FETCH_TODOS"});
}
function* rootSaga() {
    yield takeEvery("FETCH_TODOS", getTodos);
    yield takeEvery("UPDATE_TODO", updateTodo);
    yield takeEvery("DELETE_TODO", deleteTodo);
    yield takeEvery("ADD_TODO", addTodo);
}

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);



