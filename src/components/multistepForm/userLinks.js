import { MDBCard, MDBProgress, MDBContainer, MDBInput } from "mdbreact";
import React from "react";


class UserLinks extends React.Component {


    continue(e) {
        e.preventDefault();
        this.props.nextStep();

    }
    render() {
        const { values } = this.props;
        const { onChangeInfo, nextStep } = this.props;
        return (
            <MDBContainer>
                <div className="progress mb-4">
                    <div className="progress-bar " role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                </div>
                <div className="card multiStepCard mx-auto">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className="row">
                                <div className="col">
                                    <p>Account Type:</p>
                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={`btn btn-secondary ${values.accountType === "artist" ? "active" : ""}`}>
                                            <input type="radio" onChange={onChangeInfo('accountType')} name="artist" value="artist" checked={values.accountType === "artist"} /> Artist
                                        </label>
                                        <label className={`btn btn-secondary ${values.accountType === "agency" ? "active" : ""}`}>
                                            <input type="radio" onChange={onChangeInfo('accountType')} name="agency" value="agency" checked={values.accountType === "agency"} /> Agency
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mt-4 ">
                                    <img src={values.picture}
                                        className="rounded-circle avatar-md img-thumbnail" alt="profile" />
                                </div>

                            </div>


                            <form>

                                <div className="grey-text">
                                    <MDBInput onChange={onChangeInfo('picture')} valueDefault={values.picture} label="Profil Picture URL" icon="image" group type="text" />
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
                                    <button id="loginBtn" onClick={nextStep} color="default">
                                        Next <span><i className="fas fa-chevron-right"></i></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </MDBContainer>
        )
    }
}

export default UserLinks;