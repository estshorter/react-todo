import React, { useState } from 'react';
import './App.css';

function InputForm(props) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text === "") {
      return
    }
    props.onAdd(text)
    setText("");
  }

  const handleChange = (event) => {
    setText(event.target.value);
  }

  return (
    <form id="js-form" onSubmit={handleSubmit} >
      <input id="js-form-input" className="new-todo" type="text"
        placeholder="What need to be done?"
        autoComplete="off" value={text}
        onChange={handleChange} />
    </form>)
}

function TodoCount(props) {
  return (
    <footer className="footer">
      <span id
        ="js-todo-count">全アイテム数: {props.count}、未完了タスク: {props.incomplete}</span>
    </footer>)
}

function List(props) {
  const handleInputChange = (event) => {
    props.onCompleted(Number(event.target.id))
  }
  const handleOnClick = (event) => {
    props.onDeleted(Number(event.target.id))
  }
  let list
  if (props.todos.length > 0) {
    list = <ul>
      {props.todos.map((todo) => {
        if (todo.completed) {
          return <li key={todo.id}> <input id={todo.id} type="checkbox" className="checkbox" onChange={handleInputChange} ></input>
            <s>{todo.content}</s><button className="delete" id={todo.id} onClick={handleOnClick}>x</button></li>;
        }
        return <li key={todo.id}> <input id={todo.id} type="checkbox" className="checkbox" onChange={handleInputChange} ></input>
          {todo.content}<button className="delete" id={todo.id} onClick={handleOnClick}>x</button></li>;
      })}
    </ul>
  }
  return (
    <div id="js-todo-list" className="todo-list">
      {list}
    </div>
  )
}

function TodoApp(props) {
  const [todoList, setTodoList] = useState([{ id: 0, content: "ゴミ出し", completed: false }, { id: 1, content: "掃除", completed: false }]);

  const handleAdd = (text) => {
    setTodoList(todoList.concat({ id: getNextId(), content: text, completed: false }))
  }

  const handleCompleted = (id) => {
    const todoListCopy = todoList.slice()
    const modifiedTodoIdx = todoListCopy.findIndex(todo => todo.id === id)
    const todo = todoListCopy[modifiedTodoIdx]
    todo.completed = !todo.completed
    setTodoList(todoListCopy)
  }

  const handleDeleted = (id) => {
    setTodoList(todoList.filter(todo => {
      return todo.id !== id;
    }))
  }

  const getInCompleteNum = () => {
    return todoList.filter(todo => !todo.completed).length
  }

  const getNextId = () => {
    const idList = todoList.map(todo => todo.id)
    if (idList.length === 0) {
      return 0
    }
    return Math.max(...idList) + 1
  }

  return (
    <div className="todoapp">
      <InputForm onAdd={handleAdd} />
      <List todos={todoList} onDeleted={handleDeleted} onCompleted={handleCompleted} />
      <TodoCount count={todoList.length} incomplete={getInCompleteNum()} />
    </div>
  );
}

export default TodoApp;
