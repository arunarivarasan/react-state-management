import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:5000/";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    }

    export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
        query: () => 'api/todos',
        providesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        updateTodo: builder.mutation<Todo, Partial<Todo>>({
        query: (todo) => ({
            url: `api/todos/${todo.id}`,
            method: 'PUT',
            body: todo,
        }),
        invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        deleteTodo: builder.mutation<Todo, Todo>({
        query: (todo) => ({
            url: `api/todos/${todo.id}`,
            method: 'DELETE',
            body: todo
        }),
        invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        addTodo: builder.mutation<Todo, string>({
        query: (title) => ({
            url: `api/todos`,
            method: 'POST',
            body: { title: title, completed: false },
        }),
        invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
    }),
    });