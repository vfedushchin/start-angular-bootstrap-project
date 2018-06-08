export const END_POINT = 'http://35.173.186.126:8622';

export const environment = {
  production: true,

  rest_endpoint: {
    register: END_POINT + '/user',
    login: END_POINT + '/auth/login',
    logout: END_POINT + '/v1/accessuser/logout',
    //Tokens
    createToken: END_POINT + '/api/ico/token',
  }
};
