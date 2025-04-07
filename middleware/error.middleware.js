export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
  
    // Set default status code and message
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';
  
    // Handle specific error types (optional)
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors).map((val) => val.message).join(', ');
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };

  