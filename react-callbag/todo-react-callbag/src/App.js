import React from 'react';
import logo from './logo.svg';
import './App.css';
import Callbags from './callbags.js';
import './Logic.js'
import Registry from './Registry.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hello: 5}
  }

  componentDidMount() {
    Callbags.forEach(x => this.setState(x))(Registry.Firehose)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p onClick = {() => Registry.Dispatch("Sbinnala")}>
            {this.state.hello}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
