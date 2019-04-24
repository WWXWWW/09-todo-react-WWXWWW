import React, { Component } from 'react';
import './App.css';
import Todo from './Todo.js'; 
import NewTodo from './NewTodo.js';

var apiKey = "1c4492b31a7d5e2c60edcfdeb1218ba3b4d21f6b4f6972a722e2f90d30bebecf";


class App extends Component {

  constructor () {
    super(); 
    this.state = {todos: []}; 
    this.onChange = this.onChange.bind(this); 
    this.addTodo = this.addTodo.bind(this); 
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this); 
    this.sort = this.sort.bind(this); 
    }

  onChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  


// Load existing ToDos
  componentDidMount() {
      const self = this;
      var listRequest = new XMLHttpRequest();
      listRequest.onreadystatechange = function() {
          if(this.readyState==4 && this.status==200) {
              var todos = JSON.parse(this.responseText);
              self.setState({todos: todos}); 
          } else if(this.readyState==4) {
              console.log(this.responseText);
          }
      }
      listRequest.open("GET", "https://api.kraigh.net/todos", true); 
      listRequest.setRequestHeader("x-api-key", apiKey); 
      listRequest.send(); 
  }

  addTodo(event) {
      event.preventDefault();
      const self = this;

      var data = {
        text: self.state.input
      };

      var createRequest = new XMLHttpRequest();
      createRequest.onreadystatechange = function () {
    
        if (this.readyState == 4 && this.status == 200) {
          self.setState({
            todos: [...self.state.todos, JSON.parse(this.responseText)]
          })
          self.setState({input: ''});

        } else if (this.readyState == 4) {
          console.log(this.responseText);

        }
      };

      createRequest.open("POST", "https://api.kraigh.net/todos", true);
      createRequest.setRequestHeader("Content-type", "application/json");
      createRequest.setRequestHeader("x-api-key", apiKey);
      createRequest.send(JSON.stringify(data));
  }

  removeDeletedTodo(todoId) {
    const self = this;
    
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          if (todo.id !== todoId) {
            return todo; 
          }
        }); 
        self.setState({todos: remainingTodos}); 
      }
      else if (this.readyState==4) {
        console.log(this.responseText); 
      }
    }

    deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();
  
}


sort () {
  const todos = this.state.todos; 
  todos.sort(function (a, b) {
  return parseFloat(b.created) - parseFloat(a.created);
});
  this.setState({todos: todos});
}

  render() {
    return (
      <div id="todos">
 		     <button onClick={this.sort} id="sort">Sort by Created Time</button>
        
        <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
        
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} id={todo.id} completed={todo.completed}
            text={todo.text} removeDeletedTodo={this.removeDeletedTodo} />
        )}

      </div>
    );
  }

}

export default App;



