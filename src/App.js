import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarPage from './components/navbar';
import CreatePosts from './components/createPosts';
import EditPosts from './components/editPosts';
import Profile from './components/profile';
import SignUp from './components/signup';
import LogIn from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/post';
import { loadUser } from './actions/authActions';
import { loadCommunity } from './actions/userActions';
import Landing from './components/landing';
import store from './store';
import MultiSignup from './components/multistepForm/multiStepSignup';
class App extends Component {
  constructor(props) {
    super(props)
    store.dispatch(loadCommunity());
    store.dispatch(loadUser());
    console.log(process.env.REACT_APP_GOOGLE_API);

  }



  render() {




    return (
      <Router>

        <NavbarPage />
        <br />
        <Route path="/" exact component={Landing} />
        <Route path="/createposts" component={CreatePosts} />
        <Route path="/edit/:id" component={EditPosts} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/:id" component={Post} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/multisignup" component={MultiSignup} />

      </Router>

    );
  }
}

export default App;
