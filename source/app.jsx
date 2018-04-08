import React, { Component } from 'react';

import streetsData from './data/streets.json';

import Suggest from './components/suggest';
import Algorithms from './components/algorithms';
import Speed from './components/speed';

import nativeAlgorithm from './algorithms/native';
import bruteForceAlgorithm from './algorithms/brute-force';
import rabinKarpAlgorithm from './algorithms/rabin-karp';
import kmpAlgorithm from './algorithms/kmp';

class App extends Component {
  constructor(props) {
    super(props);

    this.clickHandlerAlgorithms = this.clickHandlerAlgorithms.bind(this);
    this.clickHandlerSuggest = this.clickHandlerSuggest.bind(this);
    this.changeHandlerSuggest = this.changeHandlerSuggest.bind(this);

    this.nameOfAlgorithms = {
      'Native Algorithm': 0,
      'Brute-Force Algorithm': 1,
      'Rabin-Karp Algorithm': 2,
      'KMP Algorithm': 3,
    };

    this.state = {
      input: '',
      output: [],
      algorithms: [],
      currentAlgorithm: 0,
      speed: 0,
    };
  }

  componentWillMount() {
    this.setState({
      algorithms: [
        nativeAlgorithm,
        bruteForceAlgorithm,
        rabinKarpAlgorithm,
        kmpAlgorithm,
      ],
    });
  }

  clickHandlerSuggest() {
    this.launchAlgorithm();
  }

  clickHandlerAlgorithms(key) {
    this.setState({ currentAlgorithm: key });
  }

  changeHandlerSuggest(e) {
    this.setState({ input: e.target.value });
  }

  launchAlgorithm() {
    const { input, algorithms, currentAlgorithm } = this.state;

    const start = performance.now();
    const result = typeof algorithms[currentAlgorithm] === 'function'
      ? algorithms[currentAlgorithm](streetsData, input)
      : algorithms[currentAlgorithm].search(streetsData, input);
    const end = performance.now();

    this.setState({ output: result, speed: (end - start) });
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
        <Algorithms
          currentAlgorithm={this.state.currentAlgorithm}
          algorithms={this.nameOfAlgorithms}
          clickHandler={this.clickHandlerAlgorithms}
        />
        <Speed speed={this.state.speed} />
      </div>
    );
  }
}

export default App;
