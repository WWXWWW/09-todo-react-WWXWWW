import React, { Component } from 'react';
import './NewTodo.css';


class NewTodo extends Component {
  render() {
    return (
      <div id="new-todo">
        <form id="new-todo-form" onSubmit={this.props.addTodo}>
          <input id="newTitle" type="text" placeholder="New To Do..." 
          value={this.props.input} onChange={this.props.onChange}/>
          <button id="new-submit">+</button>
        </form>
      </div>
    );
  }
}


export default NewTodo;
