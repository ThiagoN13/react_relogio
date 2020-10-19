import React from 'react';
import './Temporizador.css';

class Temporizador extends React.Component {
    constructor(props) {
      super(props)
      this.setHoras = this.setHoras.bind(this);
      this.setsegundos = this.setsegundos.bind(this);
      this.setminutos = this.setminutos.bind(this);
      
      this.state = {
        horas: '00',
        minutos: '00',
        segundos: '00',
        acabou: false,
        timer: null
      };
    }
    
    setsegundos(e) {
      this.setState({ segundos: e.target.value });
    }
    setminutos(e) {
      this.setState({ minutos: e.target.value });
    }
    setHoras(e) {
      this.setState({ horas: e.target.value });
    }

    converterMilesegundos (milesegundos) {
      let segundos = Math.floor((milesegundos / 1000) % 60);
      let minutos = Math.floor((milesegundos / (1000 * 60)) % 60);
      let horas = Math.floor((milesegundos / (1000 * 60 * 60)) % 24);
  
      horas = horas.toString().padStart(2, '0');
      minutos = minutos.toString().padStart(2, '0');
      segundos = segundos.toString().padStart(2, '0');

      return {
        horas,
        minutos,
        segundos
      };
    }

    pararTemporizador () {
      this.setState({ acabou: false })
      clearTimeout(this.timer);
    }
  
    zerarTemporizador() {
      this.setState({ horas: 0, minutos: 0, segundos: 0 });
      this.pararTemporizador();
    }

    alarme () {
      const { horas = 0, minutos = 0, segundos = 0, acabou = 0 } = this.state;

      if (acabou && Number(horas) === 0 && Number(minutos) === 0 && Number(segundos) === 0) {
        return (
          <audio controls autoPlay loop>
            <source src="/som-do-despertador.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      }
    }

    converterHorasMilesegundos () {
      const { horas = 0, minutos = 0, segundos = 0 } = this.state;

      let horasMilesegundos =  horas * 1000 * 60 * 60
      let minutosMilesegundos =  minutos * 1000 * 60
      let segundosMilesegundos =  segundos * 1000
      
      let milesegundos = horasMilesegundos + minutosMilesegundos + segundosMilesegundos;

      if (milesegundos < 0) {
        milesegundos = 0;
      }

      return milesegundos
    }

    iniciarTemporizador () {
      let milesegundos = this.converterHorasMilesegundos()

      if (this.timer) {
        clearInterval(this.timer)
      }

      this.timer = setInterval(() => {
        milesegundos -= 1000

        this.setState({ ...this.converterMilesegundos(milesegundos), acabou: false });

        if (milesegundos === 0) {
          this.setState({ acabou: true })
          window.clearTimeout(this.timer);
          this.timer = null;
        }
      }, 1000)
    }

    render() {
      const { horas, minutos, segundos, acabou } = this.state;

      return ( 
        <div className="Temporizador">
          <div className="col-center">
            <div className="temporizador-back">
              <div className="temporizador-text">
                {Number(horas) === 0 && Number(minutos) === 0 && Number(segundos) === 0 ? (
                  (acabou ? <h5>Acabou o tempo!</h5> : <h6>Ínicie o temporizador</h6>)
                ) : (
                    <h5>
                      Tempo restante:<br></br>
                      {horas < 10 ? `${horas}` : horas}:
                      {minutos < 10 ? `${minutos}` : minutos}:
                      {segundos < 10 ? `${segundos}` : segundos}
                    </h5>
                  )}
              </div>
            </div>
          </div>

          <div className="row d-none">
            {this.alarme()}
          </div>
          
          <div className="row justify-content-center mb-10px">
            <div className="countdown-item">
              <input
                type="number"
                placeholder="Horas"
                min="0"
                value={this.state.horas}
                onChange = {(event) => this.setHoras(event)}
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

          <button onClick ={(event) => this.iniciarTemporizador()}> Iniciar </button> 
          <button onClick ={(event) => this.pararTemporizador(event)}> Parar </button> 
          <button onClick ={(event) => this.zerarTemporizador(event)}> Zerar </button> 

        </div>
      )
    }
}
export default Temporizador;        
        
