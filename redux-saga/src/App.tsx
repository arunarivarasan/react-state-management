import { useCallback, useEffect, useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Todo } from './backend/api';
import { addTodo, deleteTodo, getTodos, toggleTodo } from './redux/actions';
import { selectTodos } from './redux/selector';
import { store } from './redux/store';


const TodoAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
`;

const TodoAppActions = styled.div`
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
const TodoAppInput = styled.input`
  width: 100%;
  flex-basis: 190px;
`;

function ToDoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleDelete = (todo: Todo) => {
    dispatch(deleteTodo(todo));
  };

  const textRef = useRef<HTMLInputElement>(null);
  const handleAdd = useCallback(() => {
    dispatch(addTodo(textRef.current?.value || ''));
    textRef.current!.value = "";
  }, [dispatch]);

  return (
    <>
      <h1>Todo List</h1>
        {todos?.map((todo: Todo) => (
          <TodoAppContainer key={todo.id}>
             <TodoAppItem>
            <input type="checkbox" id={todo.id.toString()} checked={todo.completed} name={todo.title} onChange={() => dispatch(toggleTodo(todo))} />
            <label htmlFor={todo.id.toString()}>{todo.title}</label>
            </TodoAppItem>
            <button type="button" onClick={() => handleDelete(todo)}>Delete</button>
          </TodoAppContainer>
        ))}
        <TodoAppActions>
        <TodoAppInput type="text" ref={textRef}/>
        <button type="button" onClick={handleAdd} style={{ width: '53px' }}>Add</button>
        </TodoAppActions>
    </>
  );
}


function App() {
  return (
    <Provider store={store}>
      <ToDoApp />
    </Provider>
  );
}

export default App;
