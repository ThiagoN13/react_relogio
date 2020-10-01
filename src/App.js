import React from 'react';
import Cronometro from './cronometro/Cronometro';
import Relogio from './relogio/Relogio';
import Temporizador from './temporizador/Temporizador';

import Tabs from './tabs/Tabs';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'relogio'
    }

    this.handleSetActive = this.handleSetActive.bind(this);
  }

  handleSetActive (active) {
    this.setState({ active })
  }

  render () {
    if (this.state.active === 'relogio') {
      return (
        <div className="App">
          <Relogio />
          <Tabs active={this.state.active} handleSetActive={this.handleSetActive}/>
        </div>
      );
    }

    if (this.state.active === 'cronometro') {
      return (
        <div className="App">
          <Cronometro />
          <Tabs active={this.state.active} handleSetActive={this.handleSetActive}/>
        </div>
      );
    }

    return (
      <div className="App">
        <Temporizador />
        <Tabs active={this.state.active} handleSetActive={this.handleSetActive}/>
      </div>
    );
  }
}

export default App;
