import React from "react";
import { loginUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { MDBContainer,MDBAlert, MDBRow, MDBCardBody, MDBCol, MDBBtn, MDBInput, MDBCard} from 'mdbreact';
import { connect } from 'react-redux';
import {Link,Redirect} from 'react-router-dom';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      errmsg: ""
    };
  }
  componentDidUpdate(prevProps) {
    // if we have errors in our error redux set this.state or clear this.state.errmsg
    const errors = this.props
    if (errors.errors !== prevProps.errors) {
      if (errors.errors.id === 'REGISTER_FAIL') {
        this.setState({
          errmsg: errors.msg.error
        });
      } else {
        this.setState({
          errmsg: null
        })
      }
    }
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    // redirect to profile after login
    this.props.loginUser(user);
    if (this.props.isAuthenticated & !this.props.isLoading){
      this.props.history.push('/profile')
    }
  }
  render() {
    const errmsg = this.props.errors.msg.error;
    // if authenticated redirect to profile
    if(this.props.isAuthenticated){
      return(<Redirect to='/profile'/>)
    }
    return (
      <MDBContainer fluid id="login">
        {/* if this.errmsg is truthy display alert */}
        {errmsg ? <MDBAlert color="danger">{errmsg}</MDBAlert> : null}
        <MDBRow center>
          <MDBCol md="4">
            <MDBCard id="loginCard" style={{ margin:"3em", width: "22rem" }}>
              <MDBCardBody >
                <form>
                  <p id="loginHeader" className="h5 text-center mb-4">Log In</p>
                  <div className="grey-text">
                    <MDBInput onChange={this.onChangeEmail} label="Email" icon="user" group type="text" validate error="wrong"
                      success="right" />
                    <MDBInput onChange={this.onChangePassword} label="Password" icon="lock" group type="password" validate />
                  </div>
                  <div className="text-center">
                    <MDBBtn id="loginBtn"onClick={this.handleSubmit} color="default">Log In</MDBBtn>
                  </div>
                </form>
                <div className="d-flex justify-content-center pt-2">
                  <Link to="/signup">Don't have an account?</Link>
                  </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  errors: state.errors,
  user: state.auth.user
});



export default connect(mapStateToProps, { loginUser, clearErrors })(LogIn);