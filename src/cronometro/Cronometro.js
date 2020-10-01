import React from 'react';
import './Cronometro.css';

class Cronometro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null,
      time: 0,
      series: []
    }
  }

  iniciarCronometro () {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    const interval = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);

    this.setState({ interval });
  }

  pausarCronometro () {
    clearInterval(this.state.interval)
    this.setState({ interval: null });
  }

  zerarCronometro () {
    this.setState({ time: 0 });
  }

  render () {
    return (
      <div className="Cronometro">
        <div className="row">
          <div className="chronotime">
            <div className="chronotime-text">
              <span>{this.state.time}</span>
            </div>
          </div>
        </div>

        <div className="row">
          <button type="button" onClick={event => this.iniciarCronometro(event)}>Iniciar</button>
          <button type="button" onClick={event => this.pausarCronometro(event)}>Pausar</button>
          <button type="button" onClick={event => this.zerarCronometro(event)}>Zerar</button>
          <button type="button">Série</button>
        </div>

        <div className="row">
          <table>
            <tr>
              <th></th>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Cronometro;
