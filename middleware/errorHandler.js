const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong'
  });
};

module.exports = errorHandler;