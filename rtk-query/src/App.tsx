import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import './App.css';
import { Todo, todoApi } from './redux/store';

const TodoAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
`;

const TodoAppItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-basis: 200px;
`;

const TodoAppActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
  
`;

const TodoAppInput = styled.input`
  width: 100%;
  flex-basis: 190px;
`;
function TodoApp()  {

  const { data: todos } = todoApi.useGetTodosQuery();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const onToggle = useCallback(
    (todo: Todo) => {
      updateTodo({
        ...todo,
        completed: !todo.completed,
      });
    },
    [updateTodo]
  );

  const textRef = useRef<HTMLInputElement>(null);
  const handleAdd = useCallback(() => {
    addTodo(textRef.current!.value ?? "");
    textRef.current!.value = "";
  }
  , [addTodo]);
  

  
 return (
  <>
  <h1>Todo List</h1>
    {todos?.map((todo) => (
      <TodoAppContainer key={todo.id}>
        <TodoAppItem>
        <input type="checkbox" id={todo.id.toString()} checked={todo.completed} name={todo.title} onChange={() => onToggle(todo)} />
        <label htmlFor={todo.id.toString()}>{todo.title}</label>
       </TodoAppItem>
        <button type="button" onClick={() => deleteTodo(todo)}>Delete</button>
      </TodoAppContainer>
    ))}
    <TodoAppActions>
    <TodoAppInput type="text" ref={textRef} />
    <button type="button" onClick={handleAdd} style={{ width: '53px' }}>Add</button>
    </TodoAppActions>
</>
 )
}
function App() {
  return (
    <ApiProvider api={todoApi}>
      <TodoApp />
      </ApiProvider>
  );
}

export default App;
