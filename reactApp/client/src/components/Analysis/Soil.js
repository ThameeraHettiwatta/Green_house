import React, { Component } from 'react'
import CanvasJSReact from '../../canvasjs.react'
import axios from 'axios';
import Navbar from '../DataNavbar';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Soil extends Component {	
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.state = {
			tempData: []
		}
	}
	
	componentDidMount() {
		axios.get(`users/soil`)
		.then(res => {
		  var i;
          const user = []
          if(res){
            for(i in res.data){
                var ot = res.data[i].timestamp
                var time = ot.split(/-| |:/).map(Number)
              user.push({ x: new Date(time[0], time[1]-1, time[2], time[3], time[4], time[5]), y: Number(res.data[i].soil_value) })
            }
            this.setState({ tempData: user });	
          }
		})
	}

	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Soil Moisture"
			},
			axisX: {
				title: "Time"
			},
			axisY: {
				title: "% Water by weight",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Soil moisture",
				showInLegend: true,
				xValueFormatString: "YYYY-MM-DD HH:mm",
				yValueFormatString: "#'%' Water by weight",
				dataPoints: this.state.tempData
			}]
		}
		
		
		return (
		<div className="container">
			<CanvasJSChart options = {options} />
			<Navbar />
		</div>
		);
	}
			
}
 
export default Soil;                       
