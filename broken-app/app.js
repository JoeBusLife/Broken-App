const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const axios = require('axios');

app.use(express.json());

app.post('/', function(req, res, next) {
	let devs = req.body.developers;
	if (!devs) throw new ExpressError("No developer usernames submitted", 400);
  try {
    let requests = devs.map(async d => {
      let res = await axios.get(`https://api.github.com/users/${d}`);
			return res;
    });

		axios.all(requests).then(axios.spread((...results) =>{
			let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
			return res.send(JSON.stringify(out));
		}));
		
  } catch (err) {
    next(err);
  }
});

// If no other route matches, respond with a 404
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})

// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;