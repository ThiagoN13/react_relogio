import React from 'react'
import moment from 'moment-timezone'
import './Relogio.css'

class Relogio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezone: 'America/Bahia',
      zones: moment.tz.zonesForCountry('BR'),
      tempo: moment()
    }

    setInterval(() => {
      this.setState({ tempo: moment() });
    }, 1000);

  }

  getLabelTempo() {
    return moment.tz(this.state.tempo, this.state.timezone).format('HH:mm:ss')
  }

  getLabelDia() {
    return moment(this.state.tempo).format('DD/MM/YYYY')
  }

  setarTimeZone(timezone) {
    this.setState({ timezone })
  }

  render() {
    return (
      <div className="Relogio">
        <div className="row">
          <div className="relogio">
            <div className="relogio-text">
              <span className="relogio-dia">{this.getLabelDia()}</span>
              <span className="relogio-tempo">{this.getLabelTempo()}</span>
              <span className="relogio-timezone">{this.state.timezone}</span>
            </div>
          </div>
        </div>

        <div className="row row-buttons">
          {this.state.zones.map(zone => {
            return <button
                    type="button"
                    key={zone}
                    onClick={event => this.setarTimeZone(zone)}>
                    {zone}
                  </button>
          })}
        </div>
      </div>
    );
  }
}

export default Relogio;
