// class ApiError extends Error {
//   constructor(statusCode, message, errors = [], stack = "") {
//     super(message);
//     this.statusCode = statusCode;
//     this.errorMessage = message;
//     this.success = false;
//     this.errors = errors;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }
// export default ApiError;


class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

export default ApiError;





// class ApiError extends Error {
//   constructor(message, statusCode) {
//     // Call the parent Error constructor and pass the error message
//     super(message);

//     // Set custom properties
//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true; // Mark as a predictable operational error

//     // Capture the stack trace, excluding the constructor call from the trace
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default ApiError
