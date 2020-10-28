import React, { Component } from "react";
import { MDBContainer, MDBProgress, MDBRow, MDBAlert, MDBCardBody, MDBCol, MDBBtn, MDBInput, MDBCard } from 'mdbreact';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/authActions';
import { Redirect } from 'react-router';
import UserInfo from './userInfo';
import ArtistInfo from "./artistInfo";
import defaultPhoto from "../../imgs/default_photo.jpg"
import PersonalInfo from "./personalInfo";

class MultiSignUp extends Component {

    state = {
        step: 1,
        accountType: "",
        picture: defaultPhoto,
        username: "",
        email: "",
        email2: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
        birthDate: new Date(),
        zip: "",
        location: {
            lat: "",
            lng: "",
            address: "",
        },
        categories: [],
        yearsXP: "",
        gigs: "",
        aboutMe: "",
        influences: [],
        equipment: [],
        facebook: "",
        instagram: "",
        spotify: "",
        etsy: "",
        soundCloud: "",
        errmsg: ""
    };

    // proceed to next step
    nextStep = (e) => {
        e.preventDefault();
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    onChangeInfo = input => e => {
        this.setState({
            [input]: e.target.value.toLowerCase()
        });
    }
    onChangeDate = date => {
        this.setState({
            birthDate: date
        })
    }
    onSelect = (field) => (value) => {
        this.setState({
            [field]: value
        })
    }
    onSlide = (event, value) => {
        this.setState({
            yearsXP: value
        })
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
        const { step, accountType, picture, username, email, email2, password, password2, firstName, lastName, birthDate, zip, location, categories, yearsXP, gigs, aboutMe, influences, equipment, facebook, instagram, spotify, etsy, soundCloud } = this.state;
        const values = { step, accountType, picture, username, email, email2, password, password2, firstName, lastName, birthDate, zip, location, categories, yearsXP, gigs, aboutMe, influences, equipment, facebook, instagram, spotify, etsy, soundCloud }

        if (this.props.isAuthenticated) {
            return (<Redirect to='/profile' />)
        }
        switch (step) {
            case 1:
                return (

                    <UserInfo
                        nextStep={this.nextStep}
                        onChangeInfo={this.onChangeInfo}
                        values={values} />
                )
            case 2:
                return (
                    <PersonalInfo
                        onChangeInfo={this.onChangeInfo}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        onSelect={this.onSelect}
                        onSlide={this.onSlide}
                        onChangeDate={this.onChangeDate}
                        values={values}
                    />

                )
            case 3:
                return (
                    <ArtistInfo
                        nextStep={this.nextStep}
                        onChangeInfo={this.onChangeInfo}
                        prevStep={this.prevStep}
                        onSelect={this.onSelect}
                        values={values} />
                )
            default:
                return (<div>UhOh something went Wrong...</div>)
        }

    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors
});



export default connect(mapStateToProps, { signUpUser })(MultiSignUp);