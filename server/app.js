const express = require('express');
require('dotenv').config();
const querystring = require('querystring')
const app = express();

async function getGithubUser (code){
  let accesstoken = ''
  const token = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.clientId}&client_secret=${process.env.gsecret}&code=${code}`,
    {method: 'POST'}
  ).then(response => {
    // console.log(response.body)
    return response.text()
  })
  .then(response => {
    const decoded = querystring.parse(response)
    accesstoken = decoded.access_token
  })
  .catch((error) => {
    throw error
  })
  console.log(accesstoken)
  return await fetch('https://api.github.com/user', {
    headers: {Authorization: `Bearer ${accesstoken}`}
  })
  .then(response => {
    return response.json()
  })

}

app.get('/api/auth/github', async (req, res)=>{
  console.log(req.query)
  const code = req.query.code
  const path = req.query.path

  if (!code){
    throw ('no code')
  }
  const user = await getGithubUser(code)
  const userstring = JSON.stringify(user)
  // would send user jwt in real scenario
  res.redirect('http://localhost:5174' + path + '?'+ userstring)

})

app.listen(4000, ()=>console.log(' Message Board - listening on port '+4000+'!'));