import { useState } from 'react'


function TodoItem({ todoTitle, todoContent, onDelete, todoId, onUpdate }) {
  const [title, setTitle] = useState(todoTitle);
  const [content, setContent] = useState(todoContent);
  const [isEditing, setIsEditing] = useState(false);


  return (
    <li>
      {isEditing ?
        (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)} />
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                onUpdate(title, content, todoId);
              }}>
              save
            </button>
          </>


        )
        :
        (
          <>
            <p>{todoTitle}</p>
            <p>{todoContent}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}>
              edit
            </button>
            <button
              onClick={() => onDelete(todoId)}>
              delete
            </button>
          </>
        )

      }
    </li>

  );
}


function App() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [todoLists, setTodoLists] = useState([]);

  function handleAddTodo() {
    const todo = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent
    }

    setTodoLists([
      todo,
      ...todoLists
    ]);



    setInputTitle('');
    setInputContent('');
  }

  function handleCancelTodo() {
    setInputTitle('');
    setInputContent('');
  }

  function handleDeleteAll() {
    setTodoLists([]);
  }

  function handleDeleteTodo(targetId) {
    setTodoLists(todoLists.filter(todoList =>
      todoList.id !== targetId
    ));
  }

  function handleUpdate(newTitle, newContent, id) {
    setTodoLists(todoLists.map(todoList =>
      id === todoList.id ? { ...todoList, title: newTitle, content: newContent } : todoList
    ));

  }




  return (
    <>
      <h1>To-do List</h1>
      <div>
        <input
          type="text"
          value={inputTitle}
          onChange={e => setInputTitle(e.target.value)}
          placeholder='What do you wanna do?'
        />
        <textarea
          type="text"
          value={inputContent}
          onChange={e => setInputContent(e.target.value)}
          placeholder='How are you gonna do?'
        />
        <button
          onClick={handleAddTodo}>
          add
        </button>
        <button
          onClick={handleCancelTodo}>
          cancel
        </button>
      </div>

      <ul>

        {todoLists.map(todoList => (
          <TodoItem
            key={todoList.id}
            todoId={todoList.id}
            todoLists={todoLists}
            todoTitle={todoList.title}
            todoContent={todoList.content}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdate}
          />
        )





        )}
      </ul>

      <button
        onClick={handleDeleteAll}>
        delete all the lists
      </button>
    </>

  );
}

export default App