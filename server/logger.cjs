const info = function(message) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
};

function logger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

// Add error logging capability
logger.error = function(message) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};

module.exports = { 
  logger,
  info,
  error: logger.error 
};