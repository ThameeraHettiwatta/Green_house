import axios from 'axios';
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Select from 'react-select';
import './Join.css';
import jwt_decode from 'jwt-decode'

var optionName;
var optionRoom;
class SignIn extends Component{
  constructor(){
    super()
    this.state = {
      type:'',
      name: '',
      room: '',
      email: '',
      user_email: '',
      instructor_email: '',
      options: [],
      selectedOption: null,
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    optionName = localStorage.getItem('name');
    optionRoom = localStorage.getItem('room');
    // var optionData = localStorage.option;
    console.log("got:"+ optionName)

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      type: decoded.type,
      name: decoded.first_name,
      email: decoded.email
    })
    console.log(decoded.type);
    if(decoded.type == "Green House Owner"){
      axios.get(`users/join`, {
        params: {
          type: "Agricultural Instructor"
        }
      })
      .then(res => {
        var i;
        const user = []
        for(i in res.data){
          user.push({ value: res.data[i].email, label: res.data[i].first_name + ", " + res.data[i].location })
        }
        this.setState({ options: user });
      })
    }
    else{
      axios.get(`users/join`, {
        params: {
          type: "Green House Owner"
        }
      })
      .then(res => {
        var i;
        const user = []
        for(i in res.data){
          user.push({ value: res.data[i].email, label: res.data[i].first_name + ", " + res.data[i].location })
        }
        this.setState({ options: user });
      })
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };

  signIn(e) {
    e => (!this.state.room || !this.state.selectedOption) ? e.preventDefault() : null;
    // console.log("setitem:"+this.state.selectedOption.value)
    var r = this.state.room;
    var n = this.state.selectedOption.value;
   localStorage.setItem('name',n);
   localStorage.setItem('room', r);
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){
    const { selectedOption } = this.state;
    if(optionName == this.state.email){
      return(
      <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate>
                  <h1 className="h3 mb-3 font-weight-normal">Please click to open chat</h1>
                  <Link to={`/chat?name=${this.state.name}&room=${optionRoom}`} >
                    <button className={"btn btn-lg btn-primary btn-block"} type="submit">Open Chat</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
      )
    }
    else{
    return (
            <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate>
                  <h1 className="h3 mb-3 font-weight-normal">Please select users to chat</h1>
                  <div className="form-group">
                    <label htmlFor="email">Select User</label>
                    <Select
                      value={selectedOption}
                      options={this.state.options}
                      onChange={this.handleChange}
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Chat Topic</label>
                    <input
                      type="room"
                      className="form-control"
                      name="room"
                      placeholder="Topic"
                      value={this.state.room}
                      onChange={this.onChange}
                    />
                  </div>
                  <Link onClick={this.signIn.bind(this)} to={`/chat?name=${this.state.name}&room=${this.state.room}`} >
                    <button className={"btn btn-lg btn-primary btn-block"} type="submit">Creat Chat</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
    );
  }
}
}

export default SignIn
