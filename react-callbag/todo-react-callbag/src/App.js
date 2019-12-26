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
        })}>pronto s🅱️inotto (click me to answer the call and find out the number of times se🅱️astian has spun this season)</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "newtodo",
          PARAMETERS: "s🅱️innala"
        })}>s🅱️innala</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "reset"
        })}>reset surface state</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "filter",
          PARAMETERS: "completed"
        })}>completed</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "filter",
          PARAMETERS: "active"
        })}>active</p>
        <p onClick = {() => Registry.Dispatch({
          ACTION: "filter",
          PARAMETERS: "all"
        })}>all</p>
        {/*this may seem unnecessary but we want the filter state to be restored on launch as well*/}
        <p>
          {this.state.todos.map((x, index) => ({...x, index: index})).filter(x => this.state.filter === "all" || x.state === this.state.filter).map(x => (<p onClick = {() => Registry.Dispatch({
            ACTION: "togglecomplete",
            PARAMETERS: x.index
          })}>
            {x.todoText}
          </p>))}
        </p>
        <input type="text" value={this.state.inputValue} onChange = {x => Registry.Dispatch({
          ACTION: "inputchange",
          PARAMETERS: x.target.value
        })} onKeyDown = {x => {if (x.key === "Enter") {Registry.Dispatch({
          ACTION: "inputenter"
        })}}}/>
      </div>
    );
  }
}

export default App;
