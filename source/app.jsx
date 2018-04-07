import React, { Component } from 'react';

import Suggest from './components/suggest';

import streetsData from './data/streets.json';
import nativeAlgorithm from './algorithms/native';
import bruteForceAlgorithm from './algorithms/brute-force';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: [],
    };
  }

  clickHandler() {
    const { input } = this.state;
    this.setState({ output: bruteForceAlgorithm(streetsData, input) });
  }

  render() {
    return (
      <div className="body" >
        <div className="suggest" >
          <input
            className="suggest__input"
            onChange={e => this.setState({ input: e.target.value })}
          />
          <button
            className="suggest__button"
            onClick={() => this.clickHandler()}
          >Suggest
          </button>
          <div className="suggest__output">
            {
              this.state.output.map((elem, index) => (
                <div key={index} className="output__item">{elem}</div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
