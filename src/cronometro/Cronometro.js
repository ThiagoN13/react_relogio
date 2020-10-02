import React from 'react';
import './Cronometro.css';
import moment from 'moment'

class Cronometro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null,
      tempo: 0,
      series: []
    }
  }

  iniciarCronometro () {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    const interval = setInterval(() => {
      this.setState({ tempo: this.state.tempo + 1 });
    }, 1000);

    this.setState({ interval });
  }

  pausarCronometro () {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  zerarCronometro () {
    this.setState({ tempo: 0 });
  }

  adicionarSerie () {
    const series = this.state.series.concat([this.state.tempo])

    this.setState({ series })
  }

  getLabelTempo (segundos) {
    return moment()
      .startOf('day')
      .seconds(segundos)
      .format('HH:mm:ss')
  }

  render () {
    return (
      <div className="Cronometro">
        <div className="row">
          <div className="chronotime">
            <div className="chronotime-text">
              <span>{this.getLabelTempo(this.state.tempo)}</span>
            </div>
          </div>
        </div>

        <div className="row">
          <button type="button" onClick={event => this.iniciarCronometro(event)}>Iniciar</button>
          <button type="button" onClick={event => this.pausarCronometro(event)}>Pausar</button>
          <button type="button" onClick={event => this.zerarCronometro(event)}>Zerar</button>
          <button type="button" onClick={event => this.adicionarSerie(event)}>Série</button>
        </div>

        <div className="row row-table">
          <table>
            <tr>
              <th>Indíce</th>
              <th>Tempo</th>
            </tr>

            {this.state.series.map((serie, index) => {
              return <tr>
                  <td>{index + 1}</td>
                  <td>{this.getLabelTempo(serie)}</td>
              </tr>
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Cronometro;
