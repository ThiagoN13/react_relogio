import React from 'react';
import './Tabs.css';

class Tabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="Tabs">
        <ul>
          <li onClick={event => this.props.handleSetActive('relogio')}>
            Relógio
          </li>
          <li onClick={event => this.props.handleSetActive('cronometro')}>
            Cronometro
          </li>
          <li onClick={event => this.props.handleSetActive('temporizador')}>
            Temporizador
          </li>
        </ul>
      </div>
    );
  }
}

export default Tabs;
