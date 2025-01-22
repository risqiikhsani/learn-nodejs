// Import necessary modules
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();

// Load the private and public RSA keys (make sure they are stored securely)
const PRIVATE_KEY = fs.readFileSync('private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('public.pem', 'utf8');

// Middleware to protect routes (verify JWT using the public key)
function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // If no token is provided, return an error
    if (!token) {
        return res.status(403).send('Token is required');
    }

    // Remove "Bearer " from the token (if present)
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the JWT with the public key
    jwt.verify(tokenWithoutBearer, PUBLIC_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid or expired token');
        }

        // If token is valid, attach decoded data to the request object
        req.user = decoded;
        next();
    });
}

// Route to generate a JWT (e.g., simulating a login)
app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'exampleUser'
    };

    // Sign the JWT with the user data using the private key
    const token = jwt.sign(user, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '1h' });

    // Return the token to the user
    res.json({
        message: 'Login successful',
        token: token
    });
});

// Protected route - only accessible with a valid JWT
app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
