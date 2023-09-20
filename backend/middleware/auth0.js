import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

const auth0 = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://YOUR-DOMAIN/.well-known/jwks.json`,
    }),
    audience: 'YOUR-AUDIENCE',
    issuer: `https://YOUR-DOMAIN/`,
    algorithms: ['RS256'],
});

export default auth0;
