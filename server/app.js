const express = require('express');
require('dotenv').config();
const querystring = require('querystring')
const app = express();

async function getGithubUser (code){
  const token = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.clientId}&client_secret=${process.env.gsecret}&code=${code}`,
    {method: 'POST'}
  ).then(response => {
    console.log(response.data)
    return response
  })
  .catch((error) => {
    throw error
  })

  const decoded = querystring.parse(token)
  console.log('decoded', decoded)

}

app.get('/api/auth/github', async (req, res)=>{
  console.log(req.query)
  const code = req.query.code
  const path = req.query.path

  if (!code){
    throw ('no code')
  }
  await getGithubUser(code)

})

app.listen(4000, ()=>console.log(' Message Board - listening on port '+4000+'!'));