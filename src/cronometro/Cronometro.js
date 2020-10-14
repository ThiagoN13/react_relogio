import React from 'react'
import moment from 'moment'
import './Cronometro.css'

class Cronometro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null,
      tempo: 0,
      parciais: []
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

  pararCronometro () {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  zerarCronometro () {
    this.pararCronometro()
    this.setState({ tempo: 0, parciais: [] })
  }

  adicionarParcial () {
    const parciais = this.state.parciais.concat([this.state.tempo])

    this.setState({ parciais })
  }

  getLabelTempo (segundos) {
    return moment()
      .startOf('day')
      .seconds(segundos)
      .format('HH:mm:ss')
  }

  getIntervalo (parcial, index) {
    const parcialAnterior = this.state.parciais[index - 1]

    if (parcialAnterior === undefined) return '00:00:00'

    const intervalo = moment(parcial)
      .diff(parcialAnterior)

    return this.getLabelTempo(intervalo)
  }

  render () {
    return (
      <div className="Cronometro">
        <div className="row">
          <div className="col">
            <div className="chronotime">
              <div className="chronotime-text">
                <span>{this.getLabelTempo(this.state.tempo)}</span>
              </div>
            </div>

            <div className="row">
              <button
                type="button"
                disabled={this.state.interval}
                onClick={event => this.iniciarCronometro(event)}>
                  { this.state.tempo === 0 ? 'Iniciar' : 'Retomar' }
              </button>
              <button
                type="button"
                onClick={event => this.pararCronometro(event)}>
                  Parar
              </button>
              <button
                type="button"
                onClick={event => this.zerarCronometro(event)}>
                  Zerar
              </button>
              <button
                type="button"
                onClick={event => this.adicionarParcial(event)}>
                  Parcial
              </button>
            </div>
          </div>

          <div className="col">
            <div className="row row-table">
              <table>
                <thead>
                  <tr>
                    <th>Indíce</th>
                    <th>Tempo</th>
                    <th>Intervalo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.parciais.map((parcial, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{this.getLabelTempo(parcial)}</td>
                        <td className="interval">{this.getIntervalo(parcial, index)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cronometro;
