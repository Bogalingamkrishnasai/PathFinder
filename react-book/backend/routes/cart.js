const { Router } = require('express');
const prisma = require('../utils/prismaClient');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const { cookieName, secret } = require('../config');

const cartRoutes = Router();

const getUsernameFromRequest = (req) => {
  const token = req.cookies[cookieName];
  if (!token) return null;

  try {
    const user = jwt.verify(token, secret, { algorithm: 'HS256' });
    return user.username;
  } catch {
    return null;
  }
};

// GET /api/cart
cartRoutes.get('/', authMiddleware, async (req, res) => {
  const username = getUsernameFromRequest(req);
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { username } });
  res.json(user?.cart || []);
});

// POST /api/cart
cartRoutes.post('/', authMiddleware, async (req, res) => {
  const username = getUsernameFromRequest(req);
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const { cartItems } = req.body;
  console.log('Saving cart for:', username);
  console.log('Cart content:', cartItems);

  try {
    const updated = await prisma.user.update({
      where: { username },
      data: { cart: cartItems },
    });

    console.log('✅ Updated User:', updated);
    res.json(updated.cart);
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

module.exports = cartRoutes;
