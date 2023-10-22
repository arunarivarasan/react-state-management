import { Todo } from "../backend/api";
import { State, initialState } from "./store";

export const reducer = (state: State = initialState, action: {type: "SET_TODOS_DONE"; payload: Todo[]}) => {
    switch (action.type) {
        case "SET_TODOS_DONE":
            return {
            ...state,
            todos: action.payload,
            };
        default:
            return state;       
    }
}