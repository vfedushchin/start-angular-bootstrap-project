export const END_POINT = 'http://35.173.186.126:8622';

export const environment = {
  production: true,

  rest_endpoint: {
    register: END_POINT + '/user',
    login: END_POINT + '/api/user/auth/login',
    logout: END_POINT + '/v1/accessuser/logout',
    //Tokens
    createToken: END_POINT + '/api/ico/token',
    retrieveTokensList: END_POINT + '/api/ico/tokens',
    retrieveTokensDetails: END_POINT + '/api/ico/token/details/',
  }
};
