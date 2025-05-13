const PORT = process.env.PORT || 3005; // Use a higher port to avoid common conflicts
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  PORT,
  NODE_ENV,
  name: NODE_ENV
};