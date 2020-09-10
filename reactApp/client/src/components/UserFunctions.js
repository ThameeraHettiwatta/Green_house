import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      type: newUser.type,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      location: newUser.location,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const addgh = newGreenhouse => {
  return axios
    .post('users/addgh', {
      gh_name: newGreenhouse.gh_name,
      owner_email: newGreenhouse.owner_email,
      instructor_email: newGreenhouse.instructor_email
    })
    .then(response => {
      console.log('Gh added')
    })    
    .catch(err => {
      console.log(err)
    })
}

// export const profile = user => {
//   return axios
//   .get('users/profile')
//   .then(res => {
//     console.log(res.data)
//     // this.setState({ owner_email: user.data.owner_email });
//   })
// }