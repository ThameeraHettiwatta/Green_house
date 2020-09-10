import React, { Component } from 'react'
import axios from 'axios';


class Gauges extends Component {
    constructor(){
        super()
        this.state = {
            tempGauge:'',
            tankGauge: '',
            luxGauge: '',
            soilGauge: '',
            reload:''
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            var xhttp = new XMLHttpRequest();
            var self = this;
            xhttp.responseType = "json";
            var data=[];
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    data = this.response; 
                    console.log('data : '+data);
                    if(data == null){
                        return;
                    }
                    console.log("is number : " +  (typeof temparature == 'number'));
                    
                    if(data) {
                        self.setState({ 
                            tempGauge: data.tempOutEnv,
                            tankGauge:data.tankLevel,
                            luxGauge: data.luxLevel,
                            soilGauge: data.soilMoisture
                        });

                        axios.post(`users/temperature`, {
                            tp_value: self.state.tempGauge
                        })
                        .then(response => {
                            console.log('temp added to db')
                            })    
                            .catch(err => {
                            console.log(err)
                            })
                        axios.post(`users/soil`, {
                            soil_value: self.state.soilGauge
                        })
                        .then(response => {
                            console.log('soil added to db')
                            })    
                            .catch(err => {
                            console.log(err)
                            })
                        axios.post(`users/lux`, {
                            lux_value: self.state.luxGauge
                        })
                        .then(response => {
                            console.log('lux added to db')
                            })    
                            .catch(err => {
                            console.log(err)
                            })
                        axios.post(`users/tanklevel`, {
                            tank_level: self.state.tankGauge
                        })
                        .then(response => {
                            console.log('tank level added to db')
                            })    
                            .catch(err => {
                            console.log(err)
                            })
                        // axios.post(`users/temperature`, {
                        //     tp_value: self.state.tempGauge
                        // })
                        // .then(response => {
                        //     console.log('temp added to db')
                        //     })    
                        //     .catch(err => {
                        //     console.log(err)
                        //     })                       
                    }
                }
            };
            console.log("tankLevel : "+this.state.tempGauge);
            xhttp.open("GET", "http://192.168.8.100/getSensorsData", true); //Handle readADC server on ESP8266
            xhttp.send();
        }, 5000)
    }


    componentWillUnmount() {
        clearInterval(this.interval);
        localStorage.setItem('reload',1);
      }


    render() {
        if(localStorage.getItem('reload') == 1 || !localStorage.getItem('reload')){
            localStorage.setItem('reload',0);
            window.location.reload(false);
        }
      return (<div className="container">
          <h1 className="text-center">GREEN HOUSE SENSOR DATA</h1>
            <div className="row"> 
                {/* <!-- 1 temp --> */}
                
                <canvas id="tempGauge" data-type="linear-gauge"
                    data-width="160"
                    data-height="450"
                    data-border-radius="20"
                    data-borders="0"
                    data-bar-stroke-width="0"
                    data-minor-ticks="20"
                    data-value={this.state.tempGauge}
                    data-animation-rule="cycle"
                    data-animation-duration="1000"
                    // data-major-ticks="10,22,24,26,28,30,32,34,36,38,40"
                    data-title="Temperature"
                    data-min-value="10"
                    data-max-value="50"
                    data-units="°C"
                    data-color-value-box-shadow="false"
                    data-animated-value="true"
                ></canvas>
                
              
                
                <div className="col-md-2">
                     {/* <!-- 4 Tank Level --> */}
                
                <canvas id="tankGauge" data-type="linear-gauge"
                    data-value={this.state.tankGauge}
                    data-width="160"
                    data-height="450"
                    data-border-radius="20"
                    data-borders="0"
                    data-bar-begin-circle="false"
                    data-title="Tank Level"
                    data-units="Level %"
                    data-color-units="#f00"
                    data-minor-ticks="10"
                    data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
                    data-tick-side="right"
                    data-number-side="right"
                    data-needle-side="right"
                    data-animation-rule="bounce"
                    data-animation-duration="750"
                    data-bar-stroke-width="5"
                    data-value-box-border-radius="0"
                    data-value-text-shadow="false"
                ></canvas>
                </div>
                
                <div className="col-md-4 card " > 
                
                
                {/* <!-- 2 LUX --> */}
                
                
                    <canvas id="luxGauge" data-type="radial-gauge"
                    data-value={this.state.luxGauge}
                    data-width="300"
                    data-height="400"
                    data-units="LUX"
                    data-title="false"
                    data-min-value="0"
                    data-max-value="150000"
                    data-animate-on-init="true"
                    data-minor-ticks="10"
                    data-major-ticks="0,15000,30000,45000,60000,75000,90000,105000,120000,135000,150000"
                    data-stroke-ticks="true"
                    data-color-plate="#222"
                    data-color-major-ticks="#f5f5f5"
                    data-color-minor-ticks="#ddd"
                    data-color-title="#fff"
                    data-color-units="#ccc"
                    data-color-numbers="#eee"
                    data-color-needle-start="rgba(240, 128, 128, 1)"
                    data-color-needle-end="rgba(255, 160, 122, .9)"
                    data-value-box="true"
                    data-font-value="Repetition"
                    data-font-numbers="Repetition"
                    data-animated-value="true"
                    data-borders="false"
                    data-border-shadow-width="0"
                    data-needle-type="arrow"
                    data-needle-width="2"
                    data-needle-circle-size="7"
                    data-needle-circle-outer="true"
                    data-needle-circle-inner="false"
                    data-animation-duration="1500"
                    data-animation-rule="linear"
                    data-ticks-angle="250"
                    data-start-angle="55"
                    data-color-needle-shadow-down="#333"
                    data-value-box-width="45"
                    ></canvas>
                
                </div>
                
                {/* <!-- 3 Soil --> */}
                <div className="col-md-4 card" > 

                <canvas id="soilGauge" data-type="radial-gauge"
                data-value={this.state.soilGauge}
                data-width="300"
                data-height="400"
                data-units="Soil moisture"
                data-title="false"
                data-animate-on-init="true"
                data-animated-value="true"
                data-min-value="0"
                data-max-value="100"
                data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
                data-minor-ticks="2"
                data-stroke-ticks="false"
                data-highlights='[
                    { "from": 300, "to": 700, "color": "rgba(0,255,0,0.25)" },
                    { "from": 700, "to": 800, "color": "rgba(255,30,0,0.25)" },
                    
                ]'
                data-color-plate="#222"
                data-color-major-ticks="#f5f5f5"
                data-color-minor-ticks="#ddd"
                data-color-title="#fff"
                data-color-units="#ccc"
                data-color-numbers="#eee"
                data-color-needle-start="rgba(240, 128, 128, 1)"
                data-color-needle-end="rgba(255, 160, 122, .9)"
                data-value-box="true"
                data-animation-rule="bounce"
                data-animation-duration="500"
                data-border-outer-width="3"
                data-border-middle-width="3"
                data-border-inner-width="3"
                
                ></canvas>

                </div>
                
            </div>
            
            <div className="row"> 
            </div>
            </div>
        )
    }
  }

  export default Gauges