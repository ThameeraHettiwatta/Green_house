import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
// import { profile } from './UserFunctions'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      type:'',
      first_name: '',
      last_name: '',
      email: '',
      location: '',
      status: 0,
      owner_email: '',
      gh_name:'',
      instructor_email:'',
      errors: {}
    }
  }
  

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      type: decoded.type,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      status: decoded.status,
      location: decoded.location
    })
    if(decoded.type == "Agricultural Instructor"){
      axios.get('users/profile',{
        params: {
          instructor_email: decoded.email
        }
      })
      .then(res => {
        const user = res.data;
        this.setState({ 
          owner_email: user.owner_email,
          gh_name: user.gh_name,
          instructor_email: user.instructor_email
         });
      })
    }
    else{
      axios.get(`users/profile`,{
        params: {
          owner_email: decoded.email
        }
      })
      .then(res => {
        const user = res.data;
        // console.log(user)
        this.setState({ 
          owner_email: user.owner_email,
          gh_name: user.gh_name,
          instructor_email: user.instructor_email
         });
      })
    }
  }

  toGauges(e){
    e.preventDefault()
    this.props.history.push(`/gauges`)
  }

  toChat(e){
    e.preventDefault()
    this.props.history.push(`/join`)
  }

  toAdd(e){
    e.preventDefault()
    this.props.history.push(`/addgh`)
  }

  toAnalyse(e){
    e.preventDefault()
    this.props.history.push('/temperature')
  }

  
  render() {
    console.log(this.state.instructor_email);
    if(this.state.type == "Agricultural Instructor"){
      return (
        <div className="container">
          <div className="jumbotron mt-5">
          <form noValidate>
            <table   className="table col-md-7 mx-auto">
              <h1>AGRICULTURAL INSTRUCTOR</h1>
              <tbody>
                <tr>
                  <td>Name :  {this.state.first_name} {this.state.last_name}</td>
                </tr>
                <tr>
                <td>District : {this.state.location}</td>
                </tr>
                {this.state.instructor_email == this.state.email&&
                <tr>
                <td>Assigned green house name : {this.state.gh_name}</td>
                </tr>
                }
                {this.state.instructor_email == this.state.email&&
                <tr>
                <td>Assigned green house owner : {this.state.owner_email}</td>
                </tr>
                }
              </tbody>
              <button onClick={this.toChat.bind(this)} className="btn btn-lg btn-primary btn-block">
                  Chat
              </button>
              {this.state.instructor_email == this.state.email&&
              <button onClick={this.toGauges.bind(this)}  className="btn btn-lg btn-primary btn-block">
                  Sensor Data
              </button> 
                }
              {this.state.instructor_email == this.state.email&&
              <button onClick={this.toAnalyse.bind(this)} className="btn btn-lg btn-primary btn-block">
                  Data analytics
              </button>
                }
            </table>
          </form>
          </div>
        </div>
      )
    }
    else{
      var status
      if (this.state.owner_email == this.state.email) status = "Active"; else status = "Inactive"
      return (
        <div className="container">
          <div className="jumbotron mt-5">
          <form noValidate>
            <table   className="table col-md-7 mx-auto">
              <h1>GREEN HOUSE DETAILS</h1>
              <tbody>
                <tr>
                  <td>Green house owner :  {this.state.first_name} {this.state.last_name}</td>
                </tr>
                <tr>
                <td>Green house location : {this.state.location}</td>
                </tr>
                <tr>
                <td>Status : {status} </td>
                </tr>
                {status=="Active" &&
                <tr>
                <td>Green house name : {this.state.gh_name}</td>
                </tr>
                }
                {status=="Active" &&
                <tr>
                <td>Assigned Instructor : {this.state.instructor_email}</td>
                </tr>
                }
              </tbody>
            <button onClick={this.toAdd.bind(this)} className="btn btn-lg btn-primary btn-block">
                  Add Green House
              </button>
              <button onClick={this.toChat.bind(this)} className="btn btn-lg btn-primary btn-block">
                  Chat
              </button>
                {status=="Active" &&
              <button onClick={this.toGauges.bind(this)}  className="btn btn-lg btn-primary btn-block">
                  Sensor Data
              </button> 
                }
              {status=="Active" &&
              <button onClick={this.toAnalyse.bind(this)} className="btn btn-lg btn-primary btn-block">
                  Data analytics
              </button>
                }
           </table>
          </form>
          </div>
        </div>
      )
    }
  }
}

export default Profile
