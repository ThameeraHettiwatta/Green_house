import React, { Component } from 'react'
import { register } from './UserFunctions'
//import { select } from 'bootstrap-select'
import Background from './images/background-register.jpg';
import Select from 'react-select';

var sectionStyle = {
  width: "100%",
  height: "697px",
  backgroundImage: "url(" + Background + ")"
};

const optionType = [
  { value: 'Agricultural Instructor', label: 'Agricultural Instructor' },
  { value: 'Green House Owner', label: 'Green House Owner' }
]

const optionLocation = [
  { value: 'Ampara', label: 'Ampara' },
  { value: 'Anuradhapura', label: 'Anuradhapura' },
  { value: 'Badulla', label: 'Badulla' },
  { value: 'Batticaloa', label: 'Batticaloa' },
  { value: 'Colombo', label: 'Colombo' },
  { value: 'Galle', label: 'Galle' },
  { value: 'Gampaha', label: 'Gampaha' },
  { value: 'Hambantota', label: 'Hambantota' },
  { value: 'Jaffna', label: 'Jaffna' },
  { value: 'Kalutara', label: 'Kalutara' },
  { value: 'Kandy', label: 'Kandy' },
  { value: 'Kegalle', label: 'Kegalle' },
  { value: 'Kilinochchi', label: 'Kilinochchi' },
  { value: 'Kurunegala', label: 'Kurunegala' },
  { value: 'Mannar', label: 'Mannar' },
  { value: 'Matale', label: 'Matale' },
  { value: 'Matara', label: 'Matara' },
  { value: 'Moneragala', label: 'Moneragala' },
  { value: 'Mullaitivu', label: 'Mullaitivu' },
  { value: 'Nuwara Eliya', label: 'Nuwara Eliya' },
  { value: 'Polonnaruwa', label: 'Polonnaruwa' },
  { value: 'Puttalam', label: 'Puttalam' },
  { value: 'Ratnapura', label: 'Ratnapura' },
  { value: 'Trincomalee', label: 'Trincomalee' },
  { value: 'Vavuniya', label: 'Vavuniya' }
  ]

class Register extends Component {
  constructor() {
    super()
    this.state = {
      type: '',
      first_name: '',
      last_name: '',
      location:'',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleType = selectedType => {
    this.state.type = selectedType.value;
  }

  handleLocation = selectedLocation => {
    this.state.location = selectedLocation.value;
  }

  onSubmit(e) {
   
    e.preventDefault()

    const newUser = {
      type: this.state.type,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      location: this.state.location,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    const { selectedType } = this.state;
    const { selectedLocation } = this.state;
    return (
      // <div style={ sectionStyle }>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <p>User type</p>
                <Select
                  value={selectedType}
                  options={optionType}
                  onChange={this.handleType}
                  classNamePrefix="select"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <p>Location</p>
                <Select
                  value={selectedLocation}
                  options={optionLocation}
                  onChange={this.handleLocation}
                  classNamePrefix="select"
                />
                {/* <select class="selectpicker" data-live-search="true" data-style="btn-primary" name="location" onChange={this.onChange} >
                  <option value="Ampara">Ampara</option>
                  <option value="Anuradhapura">Anuradhapura</option>  
                  <option value="Badulla">Badulla</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Kegalle">Kegalle</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Matale">Matale</option>
                  <option value="Matara">Matara</option>
                  <option value="Moneragala">Moneragala</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Vavuniya">Vavuniya</option>
                </select> */}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
      // </div>
    )
  }
}

export default Register
