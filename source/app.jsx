import React, { Component } from 'react';

import Suggest from './components/suggest';

import streetsData from './data/streets.json';
import nativeAlgorithm from './algorithms/native';
import bruteForceAlgorithm from './algorithms/brute-force';

class App extends Component {
  constructor(props) {
    super(props);

    this.clickHandlerSuggest = this.clickHandlerSuggest.bind(this);
    this.changeHandlerSuggest = this.changeHandlerSuggest.bind(this);

    this.nameOfAlgorithms = {
      'Native Algorithm': 0,
      'Brute Force Algorithm': 1,
    };

    this.state = {
      input: '',
      output: [],
      algorithms: [],
      currentAlgorithm: 0,
    };
  }

  componentWillMount() {
    this.setState({
      algorithms: [nativeAlgorithm, bruteForceAlgorithm],
    });
  }

  clickHandlerSuggest() {
    const { input, algorithms, currentAlgorithm } = this.state;
    this.setState({ output: algorithms[currentAlgorithm](streetsData, input) });
  }

  changeHandlerSuggest(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div className="body" >
        <Suggest
          input={this.state.input}
          output={this.state.output}
          clickHandler={this.clickHandlerSuggest}
          changeHandler={this.changeHandlerSuggest}
        />
        <div className="algorithms">
          {
            Object.keys(this.nameOfAlgorithms).map((name, key) => (
              <div
                className="algorithm"
                role="button"
                tabIndex="0"
                key={key}
                onClick={() => this.setState({ currentAlgorithm: key })}
              >{name}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
