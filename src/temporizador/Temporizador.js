import React from 'react';
import './Temporizador.css';


class Temporizador extends React.Component{
    constructor(){
        super();
        this.state ={
        interval: null, horas:'', minutos:'', segundos:''
        }
        this.setHoras = this.setHoras.bind(this)
        this.setsegundos = this.setsegundos.bind(this)
        this.setminutos = this.setminutos.bind(this)
    }
//mudança de tempo
setsegundos (e){this.setState({segundos: e.target.value});}
setminutos (e){this.setState({minutos: e.target.value});}
setHoras (e){ this.setState({horas: e.target.value});}
stopTemp(){clearInterval(this.myInterval)}

startTemp(){   
    this.myInterval = setInterval(() =>{
        clearInterval(this.interval)
        this.setState({ interval: null })
        const { segundos, minutos, horas } = this.state
        
        if (segundos > 0) {
            this.setState(({ segundos }) => ({
                segundos: segundos - 1
            }))
        }
        if (segundos === 0){
            if (minutos > 0){

                this.setState(({ minutos }) =>({
                    minutos: minutos - 1,
                    segundos: 59
                }))
            }
        }
        if (segundos === 0){
            if (minutos === 0){
                if(horas === 0){
                    clearInterval(this.myInterval)
                } 
                else{
                    this.setState(({ horas }) => ({
                        horas: horas - 1,
                        minutos: 59,
                        segundos: 59,
                    }))
                }
            }
        }
    },1000)
}
zerarTemp(){
    this.stopTemp()
    this.setState({ horas:''})
    this.setState({ minutos:'' })
    this.setState({ segundos:''})
}


render() {
    const {horas, minutos, segundos } = this.state
    return (
        <div>
               <div>
                     { horas === 0 && minutos === 0 && segundos === 0
                     ? <h1>Acabou o tempo!</h1>
                     : <h1>Tempo restante:<br></br>
                      {horas < 10 ? `0${horas}` : horas}:
                      {minutos < 10 ? `0${minutos}` : minutos}:
                      {segundos < 10 ? `0${segundos}` : segundos}</h1>
                      }
                </div>
                 
                    <div className="countdown-item">
                        <input type="number" min="0" horas={this.state.value} onChange={this.setHoras}/>
                        <div>{this.state.value}</div>
                    </div>
                    <div className="countdown-item">
                        <input type="number" min="0" minutos={this.state.value} onChange={this.setminutos}/>
                        <div>{this.state.value}</div>
                    </div>
                    <div className="countdown-item">
                        <input type="number" min="0" segundos={this.state.value} onChange={this.setsegundos}/>
                        <div>{this.state.value}</div>
                    </div> 
                <div>
                    <button class="button-temp"
                        type="button"
                        disabled={this.state.interval}
                        onClick={event => this.startTemp(event)}>
                        {this.state.tempo === 0 ? 'Iniciar' : 'Continuar'}
                    </button>
                    <button class="button-temp"
                        type="button"
                        onClick={event => this.stopTemp(event)}>
                        Parar
                    </button>
                    <button class="button-temp"
                        type="button"
                        onClick={event => this.zerarTemp(event)}>
                        Zerar
                    </button>
                </div>
        </div>
    )
    }
}
export default Temporizador;