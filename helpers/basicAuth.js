module.exports = () => require('express-basic-auth')({
    users: { 'user': '123456' },
    unauthorizedResponse: {
      success: false,
      data: null,
      message: 'Unauthorized: basic authentication credentials required',
      code: 401,
    }
  });
  