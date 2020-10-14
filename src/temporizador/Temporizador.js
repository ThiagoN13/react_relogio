import React from 'react';
import './Temporizador.css';

class Temporizador extends React.Component {
  constructor(props) {
    super(props)
    this.setHoras = this.setHoras.bind(this);
    this.setsegundos = this.setsegundos.bind(this);
    this.setminutos = this.setminutos.bind(this);

    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      acabou: false
    };

  }
  //mudança de tempo
  setsegundos(e) {
    this.setState({ segundos: e.target.value });
  }

  setminutos(e) {
    this.setState({ minutos: e.target.value });
  }

  setHoras(e) {
    this.setState({ horas: e.target.value });
  }

  pararTemporizador () {
    clearInterval(this.myInterval);
  }

  startTemp() {
    clearInterval(this.myInterval);

    this.myInterval = setInterval(() => {
      const { segundos = 0, minutos = 0, horas = 0 } = this.state;

      if (segundos > 0) {
        this.setState(({ segundos }) => ({
          segundos: segundos - 1,
        }));
      }

      if (segundos === 0 && minutos > 0) {
        this.setState(({ minutos }) => ({
          minutos: minutos - 1,
          segundos: 59,
        }));
      }

      if (segundos === 0) {
        if (minutos === 0) {
          if (horas === 0) {
            this.setState({ acabou: true })
            clearInterval(this.myInterval)
          }
          else {
            this.setState(({ horas }) => ({
              horas: horas - 1,
              minutos: 59,
              segundos: 59,
            }))
          }
        }
      }
    }, 1000);
  }

  zerarTemporizador() {
    this.setState({ horas: 0, minutos: 0, segundos: 0, acabou: false });
    this.pararTemporizador();
  }

  alarme () {
    const { horas, minutos, segundos, acabou } = this.state;

    if (acabou && horas === 0 && minutos === 0 && segundos === 0) {
      return (
        <audio controls autoPlay loop>
          <source src="/som-do-despertador.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )
    }
  }

  render() {
    const { horas, minutos, segundos, acabou } = this.state;

    return (
      <div className="Temporizador">
        <div className="col-center">
          <div className="temporizador">
            <div className="temporizador-text">
              {horas === 0 && minutos === 0 && segundos === 0 ? (
                (acabou ? <h5>Acabou o tempo!</h5> : <h6>Ínicie o temporizador</h6>)
              ) : (
                  <h5>
                    Tempo restante:<br></br>
                    {horas < 10 ? `0${horas}` : horas}:
                    {minutos < 10 ? `0${minutos}` : minutos}:
                    {segundos < 10 ? `0${segundos}` : segundos}
                  </h5>
                )}
            </div>
          </div>
        </div>

        <div className="row">
          {this.alarme()}
        </div>

        <div className="row">
          <div className="countdown-item">
            <input
              type="number"
              placeholder="Horas"
              min="0"
              value={this.state.horas}
              onChange={(event) => this.setHoras(event)}
            />
          </div>

          <div className="countdown-item">
            <input
              type="number"
              placeholder="Minutos"
              min="0"
              value={this.state.minutos}
              onChange={(event) => this.setminutos(event)}
            />
          </div>

          <div className="countdown-item">
            <input
              type="number"
              placeholder="Segundos"
              min="0"
              value={this.state.segundos}
              onChange={(event) => this.setsegundos(event)}
            />
          </div>
        </div>

        <div className="row">
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.startTemp(event)}
          >
            {!this.myInterval ? 'Iniciar' : 'Continuar'}
          </button>
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.pararTemporizador(event)}
          >
            Parar
          </button>
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.zerarTemporizador(event)}
          >
            Zerar
          </button>
        </div>
      </div>
    );
  }
}
export default Temporizador;
