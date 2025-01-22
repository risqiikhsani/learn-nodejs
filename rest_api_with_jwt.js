// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Secret key to sign JWT (In real-world apps, store this securely, not hard-coded)
const SECRET_KEY = 'your-very-secret-key';

// Middleware to protect routes
function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // If no token is provided, return an error
    if (!token) {
        return res.status(403).send('Token is required');
    }

    // Remove "Bearer " from the token (if present)
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the JWT
    jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
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

    // Sign the JWT with user data and secret key
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

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
