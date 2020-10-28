import { MDBContainer, MDBInput } from "mdbreact";
import React from "react";
import CreatableSelect from 'react-select/creatable';


const catOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ArtistInfo extends React.Component {


    continue(e) {
        e.preventDefault();
        this.props.nextStep();

    }


    render() {
        const { values } = this.props;
        const { onChangeInfo, nextStep, prevStep, onSelect } = this.props;
        return (
            <MDBContainer>
                <div className="progress mb-4">
                    <div className="progress-bar " role="progressbar" style={{ width: "75%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">75%</div>
                </div>
                <div className="card multiStepCard mx-auto">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <form>
                                <h3>Links:</h3>
                                <div className="form-row">
                                    <div className=" md-form form-group col-md-6">
                                        <span className=" icon prefix facebook"><i className="fab fa-facebook-square"></i></span>
                                        <input type="text" onChange={onChangeInfo('facebook')} value={values.facebook} className="form-control" placeholder="Facebook" />
                                    </div>
                                    <div className=" md-form form-group col-md-6">
                                        <span className=" icon prefix instagram"><i className="fab fa-instagram"></i></span>
                                        <input type="text" onChange={onChangeInfo('instagram')} value={values.instagram} className="form-control" placeholder="Instagram" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className=" md-form form-group col-md-6">
                                        <span className=" icon prefix etsy"><i className="fab fa-etsy"></i></span>
                                        <input type="text" onChange={onChangeInfo('etsy')} value={values.etsy} className="form-control" placeholder="Etsy" />
                                    </div>
                                    <div className=" md-form form-group col-md-6">
                                        <span className=" icon prefix spotify"><i className="fab fa-spotify"></i></span>
                                        <input type="text" onChange={onChangeInfo('spotify')} value={values.spotify} className="form-control" placeholder="Spotify" />
                                    </div>
                                </div>
                                <div className="grey-text">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">
                                            About Me:
                                        </label>
                                        <textarea
                                            onChange={onChangeInfo('aboutMe')}
                                            value={values.aboutMe}
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="5"
                                        />
                                    </div>
                                    <label htmlFor="exampleFormControlTextarea1">
                                        Influences:
                                        </label>
                                    <CreatableSelect
                                        formatCreateLabel={userInput => `Add ${userInput}`}
                                        noOptionsMessage={() => 'Type the names and press enter to submit each one.'}
                                        className="multi-select-container"
                                        classNamePrefix="multi-select"
                                        isMulti
                                        getNewOptionData={(inputValue, optionLabel) => ({
                                            label: optionLabel,
                                            value: inputValue,
                                        })}
                                        onChange={onSelect('influences')}
                                        defaultValue={values.influences}

                                    />


                                    <MDBInput onChange={onChangeInfo('soundCloud')} valueDefault={values.soundCloud} label="Sound Cloud URL" icon="volume-up" group type="text" validate error="wrong"
                                        success="right" />
                                </div>
                                <div className="text-center">
                                    <button id="loginBtn" className="m-2" onClick={prevStep} color="default">
                                        <span ><i className="fas fa-chevron-left"></i></span> Back
                                    </button>
                                    <button id="editProfileBtn" className="m-2" onClick={nextStep} color="default">
                                        Next <span ><i className="fas fa-chevron-right"></i></span>
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

export default ArtistInfo;