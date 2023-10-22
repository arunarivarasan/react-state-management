
import { Todo } from "../backend/api";

export const getTodos = () => ({ type: "FETCH_TODOS" });

export const deleteTodo = (todo: Todo) => ({
    type: "DELETE_TODO",
    payload: todo,
    });


export const toggleTodo = (todo: Todo) => ({
    type: "UPDATE_TODO",
    payload: { ...todo, completed: !todo.completed },
    });

    export const addTodo = (text: string) => ({
        type: "ADD_TODO",
        payload: text,
        });

 