import React from 'react';
import logo from './logo.svg';
import './App.css';
import Callbags from './callbags.js';
import './Logic.js'
import Registry from './Registry.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = Registry.getInitialState()
  }

  componentDidMount() {
    Callbags.forEach(x => {
      this.setState(x)}
    )(Registry.Firehose)
  }

  render() {
    return (
      <div className="App">
        <p onClick = {() => Registry.Dispatch({
          ACTION: "toggleinterval"
        })}>pronto s🅱️inotto</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "newtodo",
          PARAMETERS: "s🅱️innala"
        })}>
          {this.state.todos.map(x => (<p>
            {x.todoText}
          </p>))}
        </p>
        <input type="text" value={this.state.inputValue} onChange = {x => Registry.Dispatch({
          ACTION: "inputchange",
          PARAMETERS: x.target.value
        })}/>
      </div>
    );
  }
}

export default App;
