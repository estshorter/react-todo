import React from 'react';
import './App.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.text)
    this.setState({ text: "" });
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <form id="js-form" onSubmit={this.handleSubmit} >
        <input id="js-form-input" className="new-todo" type="text"
          placeholder="What need to be done?"
          autoComplete="off" value={this.state.text}
          onChange={this.handleChange} />
      </form>)
  }
}

function TodoCount(props) {
  return (
    <footer className="footer">
      <span id
        ="js-todo-count">Todoアイテム数: {props.count}</span>
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

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ id: 0, content: "ゴミ出し", completed: false }, { id: 1, content: "掃除", completed: false }],
      currentId: 2
    }
  }

  handleSubmit = (text) => {
    this.setState((state) => ({
      todos: state.todos.concat({ id: state.currentId + 1, content: text, completed: false }),
      currentId: state.currentId + 1
    }));
  }

  handleCompleted = (id) => {
    const todos = this.state.todos.slice()
    const modifiedTodoIdx = todos.findIndex(todo => todo.id === id)
    const todo = todos[modifiedTodoIdx]
    todo.completed = !todo.completed
    this.setState({ todos: todos })
  }

  handleDeleted = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({ todos: todos, currentId: todos.length })
  }

  render() {
    return (
      <div className="todoapp">
        <InputForm onSubmit={this.handleSubmit} />
        <List todos={this.state.todos} onDeleted={this.handleDeleted} onCompleted={this.handleCompleted} />
        <TodoCount count={this.state.todos.length} />
      </div>
    );
  }
}

export default TodoApp;
