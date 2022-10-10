import pkg from '../../package.json';

export const environment = {
  production: false,
  version: pkg.version + '-dev',
  firebaseConfig: {
    apiKey: 'AIzaSyAJL9tAW-3MpnbW3Cye_lNRMdqFQvjSxXA',
    authDomain: 'binary-b58e3.firebaseapp.com',
    databaseURL: 'https://binary-b58e3.firebaseio.com',
    projectId: 'binary-b58e3',
    storageBucket: 'binary-b58e3.appspot.com',
    messagingSenderId: '575506156958',
    appId: '1:575506156958:web:11b7726d62291a1f7bda8f',
    measurementId: 'G-48GF49MXNR'
  }
};
