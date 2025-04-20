const jwt = require('jsonwebtoken');
const { Router } = require('express');

const { cookieName, secret } = require('../config');
const bcrypt = require('bcrypt');
const prisma = require('../utils/prismaClient');

const authRoutes = Router();
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

authRoutes.get('/current-user', (req, res) => {
  const cookie = req.cookies[cookieName];
  if (cookie) {
    try {
      const user = jwt.verify(cookie, secret, { algorithm: 'HS256' });
      res.json(user);
    } catch (error) {
      res.json({});
    }
  } else {
    res.json({});
  }
});

authRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // 2. Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // 3. Generate JWT and set cookie
    const userPayload = {
      username: user.username,
      access: ['guest', 'Guest'].includes(user.username) ? '' : 'associate',
    };

    const token = jwt.sign(userPayload, secret, { algorithm: 'HS256' });
    res.cookie(cookieName, token, { maxAge: TWELVE_HOURS, httpOnly: true });

    res.json(userPayload);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

authRoutes.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Create the JWT and store it in cookie
    const userPayload = {
      username: newUser.username,
      access: ['guest', 'Guest'].includes(newUser.username) ? '' : 'associate',
    };

    const newToken = jwt.sign(userPayload, secret, { algorithm: 'HS256' });
    res.cookie(cookieName, newToken, { maxAge: TWELVE_HOURS, httpOnly: true });
    res.status(201).json(userPayload);
  } catch (error) {
    console.error('Signup error:', error); // This will now show in terminal
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

authRoutes.post('/logout', (req, res) => {
  res.cookie(cookieName, '', { maxAge: TWELVE_HOURS, httpOnly: true });
  res.send('Logged out');
});

module.exports = authRoutes;
