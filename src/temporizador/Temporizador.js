import React from 'react';
import './Temporizador.css';

class Temporizador extends React.Component {
    constructor(props) {
      super(props)
      this.setHoras = this.setHoras.bind(this);
      this.setsegundos = this.setsegundos.bind(this);
      this.setminutos = this.setminutos.bind(this);
      
      this.state = {
        time: {
          horas: 0,
          minutos: 0,
          segundos: 0,
          acabou: false
        },
        
        //define o tempo manualmente 
       // soma:2 * 60 * 60 * 1000,
       // soma: null,
        timer: null
        
      };

      //this.startTimer = this.start.bind(this);
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

  
    msToTime(soma) {
    
      let segundos = Math.floor((soma / 1000) % 60);
      let minutos = Math.floor((soma / (1000 * 60)) % 60);
      let horas = Math.floor((soma / (1000 * 60 * 60)) % 24);
  
      horas = horas.toString().padStart(2, '0');
      minutos = minutos.toString().padStart(2, '0');
      segundos = segundos.toString().padStart(2, '0');
     
  
      return {
        horas,
        minutos,
        segundos
      
      };
    }
    
    
    pararTemp () {
      clearTimeout(this.timer);
    }
  
   // componentDidMount() { }

    start() {
      if (!this.state.timer) {
        this.state.startTime = Date.now();
        this.timer = window.setInterval(() => this.run(), 10);
      }
    }

    zerarTemp() {
      this.setState({ horas: 0, minutos: 0, segundos: 0});
      this.pararTemp();
    }
    alarme () {
      const { horas, minutos, segundos, acabou } = this.state.time;
  
      if (acabou && horas === 0 && minutos === 0 && segundos === 0) {
        return (
          <audio controls autoPlay loop>
            <source src="/som-do-despertador.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      }
    }
    run() {
      const { horas, minutos, segundos} = this.state.time;
      let soma = this.state.time;

      let horasMilesegundos =  horas * 1000 * 60 * 60
      let minutosMilesegundos =  minutos* 1000 * 60
      let segundosMilesegundos =  segundos * 1000

      soma = horasMilesegundos + minutosMilesegundos + segundosMilesegundos

      const diff = Date.now() - this.state.startTime;
      
      let remaining = this.state.soma - diff;
      if (remaining < 0) {
        remaining = 0;
      }
      this.setState(() => ({
        time: this.msToTime(remaining)
      }));
      if (remaining === 0) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    }

    render() {
      const { horas, minutos, segundos, acabou } = this.state.time;

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
                    {horas < 10 ? `${horas}` : horas}:
                    {minutos < 10 ? `${minutos}` : minutos}:
                    {segundos < 10 ? `${segundos}` : segundos}
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
        
        <button onClick = {
          this.startTimer
        } > Iniciar </button> 
        <button onClick ={(event) => this.pararTemp(event)
        } > Parar </button> 
        <button onClick ={(event) => this.zerarTemp(event)
        } > Zerar </button> 
        
        </div>
      );
    }
}
export default Temporizador;        
        
