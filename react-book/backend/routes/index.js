const { Router } = require('express');

const authRoutes = require('./auth');
const itemRoutes = require('./items');
const orderRoutes = require('./orders');
const employeeRoutes = require('./employees');
const cartRoutes = require('./cart');

const routes = Router();

routes.use('/api/auth', authRoutes);
routes.use('/api/items', itemRoutes);
routes.use('/api/orders', orderRoutes);
routes.use('/api/employees', employeeRoutes);
routes.use('/api/cart', cartRoutes);

module.exports = routes;
