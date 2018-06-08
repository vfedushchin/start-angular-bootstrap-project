// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const END_POINT = 'http://35.173.186.126:8622';
// export const END_POINT = 'http://localhost:3000';
export const environment = {
  production: false,

  rest_endpoint: {
    register: END_POINT + '/user',
    login: END_POINT + '/auth/login',
    logout: END_POINT + '/v1/accessuser/logout',
    //Tokens
    retrieveHistory: END_POINT + '/api/ico/token',
  }
};
