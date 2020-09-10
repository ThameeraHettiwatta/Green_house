import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/temperature" className="nav-link">
                Temperature
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/soil" className="nav-link">
                Soil Moisture
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/lux" className="nav-link">
                Light Intensity
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/tanklevel" className="nav-link">
                Tank Level
                </Link>
            </li>
        </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
