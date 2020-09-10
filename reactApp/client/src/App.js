import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Gauges from './components/Gauges';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join'
import Addgh from './components/Addgh'
import Temperature from './components/Analysis/Temperature'
import Soil from './components/Analysis/Soil'
import Lux from './components/Analysis/Lux'
import Tanklevel from './components/Analysis/Tanklevel'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/gauges" component={Gauges} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/Addgh" component={Addgh} />
            <Route exact path="/temperature" component={Temperature} />
            <Route exact path="/soil" component={Soil} />
            <Route exact path="/lux" component={Lux} />
            <Route exact path="/tanklevel" component={Tanklevel} />
          </div>
        </div>
      </Router>
    )
  }
}



export default App
