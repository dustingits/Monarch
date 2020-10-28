import { MDBCard, MDBProgress, MDBContainer, MDBInput } from "mdbreact";
import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Slider from '@material-ui/core/Slider';
import Select from 'react-select';

const catOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.taskName = React.createRef();
    }
    continue(e) {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const materialTheme = createMuiTheme({
            overrides: {
                MuiPickersToolbar: {
                    toolbar: {
                        backgroundColor: "#9477d7",
                    },
                },
                MuiPickersDay: {
                    day: {
                        color: "#9477d7",
                    },
                    daySelected: {
                        backgroundColor: "#1fe1e1",
                    },
                    dayDisabled: {
                        color: "#1fe1e1"["100"],
                    },
                    current: {
                        color: "#1fe1e1"["900"],
                    },
                },
                MuiPickersModal: {
                    dialogAction: {
                        color: "#1fe1e1"["400"],
                    },
                },
            },
        });
        const { values } = this.props;
        const { onChangeInfo, nextStep, prevStep, onChangeDate, onSelect, onSlide } = this.props;
        return (
            <MDBContainer>
                <div className="progress mb-4">
                    <div className="progress-bar " role="progressbar" style={{ width: "40%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">40%</div>
                </div>
                <div className="card multiStepCard m-auto">
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <form>
                                <div className="grey-text">
                                    <MDBInput onChange={onChangeInfo('firstName')} valueDefault={values.firstName} label="First Name" icon="user" group type="text" />

                                    <MDBInput onChange={onChangeInfo('lastName')} valueDefault={values.lastName} label="Last Name" icon="user" group type="text" validate error="wrong"
                                        success="right" />
                                    <span className="pr-3 ">Birthday</span>
                                    <div className="md-form form-group mt-1">
                                        <span className="pr-3 d-flex-inline icon prefix"><i className="fas fa-birthday-cake"></i></span>
                                        <ThemeProvider theme={materialTheme}>
                                            <KeyboardDatePicker
                                                className="mt-3 ml-4 pl-4 "
                                                placeholder="2018/10/10"
                                                value={values.birthDate}
                                                onChange={onChangeDate}
                                                format="MM/dd/yyyy"
                                            />
                                        </ThemeProvider>
                                    </div>
                                    <MDBInput onChange={onChangeInfo('zip')} valueDefault={values.zip} className="col-5" label="Zip Code" icon="map-marker-alt" group type="text" validate
                                        error="wrong" success="right" />
                                    <span className="pr-3 ">Type of Artist</span>
                                    <Select
                                        className="multi-select-container"
                                        classNamePrefix="multi-select"
                                        closeMenuOnSelect={false}
                                        onChange={onSelect('categories')}
                                        defaultValue={values.categories}
                                        isMulti
                                        options={catOptions}

                                    />
                                    <span className="pr-3 ">Years of experience</span>

                                    <Slider
                                        defaultValue={values.yearsXP}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        onChangeCommitted={onSlide}
                                        marks
                                        min={1}
                                        max={10}
                                    />


                                    <MDBInput onChange={this.onChangePassword2} label="Confirm Password" icon="map-marker-alt" group type="text" validate error="wrong"
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

export default PersonalInfo;