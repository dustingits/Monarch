import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/custom.css';
import store from './store';
import en from 'javascript-time-ago/locale/en';
import JavascriptTimeAgo from 'javascript-time-ago';
import { LoadScript } from '@react-google-maps/api';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
JavascriptTimeAgo.addLocale(en);

ReactDOM.render(

  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </LoadScript>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
