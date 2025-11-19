import { useState } from 'react'

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title); //title of a list
  const [content, setContent] = useState(todo.content); //content of a list

  function handleUpdate() {
    onUpdate(todo.id, title, content);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleUpdate}
        >Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
        >Cancel
        </button>




      </li>
    );
  } else {
    return (
      <>
        <p>{todo.title}</p>
        <p>{todo.content}</p>
        <button
          onClick={() => onDelete(todo.id)}>
          Delete
        </button>
        <button
          onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>

    );
  }


}

function App() {
  const [todos, setTodos] = useState([]); //to-do list array
  const [inputTitle, setInputTitle] = useState(''); //title of a list
  const [inputContent, setInputContent] = useState(''); //content of a list

  function addTodo() {
    if (inputTitle === '' || inputContent === '') return; //if the title or the content is not filled out

    const newTodo = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent,
      completed: false
    }

    setTodos([
      newTodo,
      ...todos

    ]);

    //empty the input
    setInputTitle('');
    setInputContent('');
  }

  function deleteTodo(targetId) {
    setTodos(todos.filter(todo =>
      todo.id !== targetId
    ));
  }

  function updateTodo(targetId, newTitle, newContent) {
    setTodos(todos.map(todo => {
      if (todo.id === targetId) {
        return {
          ...todo,
          title: newTitle,
          content: newContent
        }
      } else {
        return todo;
      }

    }))
  }



  return (
    <div>
      <h1>To-do List</h1>

      <div>
        <input
          type="text"
          placeholder='title'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea
          placeholder='content'
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <button onClick={addTodo}>
          add
        </button>
      </div>


      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))
        }
      </ul>


    </div>
  );
}

export default App