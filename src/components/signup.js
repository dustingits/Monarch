import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBAlert, MDBCardBody, MDBCol, MDBBtn, MDBInput, MDBCard } from 'mdbreact';
import { connect } from 'react-redux';
import { signUpUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
class SignUp extends Component {

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeEmail2 = this.onChangeEmail2.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      errmsg: ""

    };
  }
  componentDidUpdate(prevProps) {
    const errors = this.props
    if (errors.errors !== prevProps.errors) {
      if (errors.errors.id === 'REGISTER_FAIL') {
        this.setState({
          errmsg: errors.errors.msg.error
        });
      } else {
        this.setState({
          errmsg: null
        })
      }
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeEmail2(e) {
    this.setState({
      email2: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const signup = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    this.props.signUpUser(signup)

  }


  render() {
    const errmsg = this.props.errors.msg.error;
    if (this.props.isAuthenticated) {
      return (<Redirect to='/profile' />)
    }

    return (


      <MDBContainer fluid id="login">
        {errmsg ? <MDBAlert color="danger">{errmsg}</MDBAlert> : null}
        <MDBRow center>
          <MDBCol md="4">
            <MDBCard id="loginCard" style={{ width: "22rem" }}>
              <MDBCardBody id="loginCard" >
                <form>
                  <p id="loginHeader" className="h5 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput onChange={this.onChangeUsername} label="Username" icon="user" group type="text" validate error="wrong"
                      success="right" />
                    <MDBInput onChange={this.onChangeEmail} label="Email" icon="envelope" group type="email" validate error="wrong"
                      success="right" />
                    <MDBInput onChange={this.onChangeEmail2} label="Confirm Email" icon="exclamation-triangle" group type="text" validate
                      error="wrong" success="right" />
                    <MDBInput onChange={this.onChangePassword} label="Password" icon="lock" group type="password" validate />
                    <MDBInput onChange={this.onChangePassword2} label="Confirm Password" icon="exclamation-triangle" group type="text" validate error="wrong"
                      success="right" />
                  </div>
                  <div className="text-center">
                    <MDBBtn id="loginBtn" onClick={this.onSubmit} color="default">Sign Up</MDBBtn>
                  </div>
                </form>
                <div className="d-flex justify-content-center pt-2">
                  <Link to="/login">Already have an account?</Link>
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});



export default connect(mapStateToProps, { signUpUser, clearErrors })(SignUp);