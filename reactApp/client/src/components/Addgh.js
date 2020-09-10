import React, { Component } from 'react'
import { addgh } from './UserFunctions'


class Addgh extends Component {
  constructor() {
    super()
    this.state = {
      gh_name: '',
      owner_email: '',
      instructor_email:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {

    e.preventDefault()

    const user = {
      gh_name: this.state.gh_name,
      owner_email: this.state.owner_email,
      instructor_email: this.state.instructor_email
    }
    addgh(user).then(res => {
        this.props.history.push(`/profile`)
      }
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please enter green house details</h1>
              <div className="form-group">
                <label htmlFor="name">Green house name</label>
                <input
                  type="text"
                  className="form-control"
                  name="gh_name"
                  placeholder="Enter name"
                  value={this.state.gh_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Owners email</label>
                <input
                  type="email"
                  className="form-control"
                  name="owner_email"
                  placeholder="Email"
                  value={this.state.owner_email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Instructor email</label>
                <input
                  type="email"
                  className="form-control"
                  name="instructor_email"
                  placeholder="Email"
                  value={this.state.instructor_email}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Addgh
