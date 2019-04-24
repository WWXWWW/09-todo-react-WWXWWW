import React, { Component } from 'react';
import './Todo.css';

var apiKey = "1c4492b31a7d5e2c60edcfdeb1218ba3b4d21f6b4f6972a722e2f90d30bebecf";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed
        }
   
        this.checkTodo = this.checkTodo.bind(this); 
        this.deleteTodo = this.deleteTodo.bind(this);  
    }

    checkTodo(event) {
        var todoId = this.props.id; 
        var data = {
            completed: true
        };

        const self = this;
        var completeRequest = new XMLHttpRequest();
        completeRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.setState({
                    completed:true
                })
            } else if (this.readyState == 4) {
                console.log(this.responseText);
            }
        }
        completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
        completeRequest.setRequestHeader("Content-type", "application/json");
        completeRequest.setRequestHeader("x-api-key", apiKey);
        completeRequest.send(JSON.stringify(data));
    }

    deleteTodo(event) {
        this.props.removeDeletedTodo(this.props.id);

    }


render() {
  var className = "todo";
  if (this.state.completed) {
    className = "todo completed";
  }
  return(
    <div className={className} id={this.props.id}>
        <button className="check" onClick={this.checkTodo}></button>
        <p>{this.props.text}</p>
        <button className="delete" onClick={this.deleteTodo}>-</button>
    </div> 
  );
}

}
export default Todo;





