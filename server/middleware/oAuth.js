// TODO Tomorrow: Get the Auth0 credentials and store it in the .env file
// TODO Tomorrow: Make the modifications tomorrow to the index.js file
// TODO Tomorrow: Make the auth.js middleware file obsolete and remove it from the project
// TODO Tomorrow: Do the client stuff on React

var axios = require('axios');

const tokenEndpoint = "placeholder-for-now"

const oAuth = (req, res, next) => {
    var code = req.query.code;

    if (!code) {
        res.status(401).send("No code provided");
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', "placeholder-for-now");
    params.append('client_secret', "placeholder-for-now");
    params.append('code', code);
    params.append('redirect_uri', "http://localhost:3000");

    axios.post(tokenEndpoint, params)
        .then(response => {
            req.oauth = response.data;
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(403).json('Reason: ${err.message}');
        })
}