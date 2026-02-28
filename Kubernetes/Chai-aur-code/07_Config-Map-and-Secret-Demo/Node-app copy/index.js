const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
const app_name = process.env.app_name || 'Node App'
const next_var = process.env.next_var || 'Default Value'
// Config Map Environment Variables
const my_name = process.env.MY_NAME || 'My name'
const my_age = process.env.MY_AGE || 'My Age'
// Config Map to take from files
const bro_name = process.env.BRO_NAME || 'Brothers name'
const bro_age = process.env.BRO_AGE || 'Brothers age'
// Secret Environment Variables
const my_username = process.env.MY_USERNAME || 'My username'
const my_pass = process.env.MY_PASS || 'My password'

const bro_username = process.env.BRO_USERNAME || 'Brothers username'
const bro_pass = process.env.BRO_PASS || 'Brothers Password'

app.get('/', (req, res) => {
  res.send(`Hello from Express 🚀 dockerized container ${app_name} and this is my next environment variable - ${next_var} and my name is ${my_name}, age is ${my_age}, brothers name is ${bro_name}, age is ${bro_age} and My secret creds: ${my_username}:${my_pass}, Brothers credentials - ${bro_username}:${bro_pass}`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
