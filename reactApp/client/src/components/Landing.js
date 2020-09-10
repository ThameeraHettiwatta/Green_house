import React, { Component } from 'react'
import Background from './images/background.jpg';



var sectionStyle = {
  width: "100%",
  height: "697px",
  backgroundImage: "url(" + Background + ")"
};


class Landing extends Component {
  render() {
    return (
      <div style={ sectionStyle }>
        {/* <div className="container"> */}
          <div className="jumbotron bg-transparent">
            <div className="col-xl- mx-auto">
              <h1 className="text-center">GREEN HOUSE IOT PLATFORM</h1>
            </div>
          </div>
        </div>
      // </div>
    )
  }
}


export default Landing
