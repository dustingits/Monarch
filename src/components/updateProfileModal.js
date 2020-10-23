import React, { Component } from 'react';
import { MDBContainer, MDBIcon, MDBCol, MDBRow, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/userActions';
import '../css/checkbox.css';
class UpdateProfileModal extends Component {
  constructor(props) {
    super(props)
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFacebook = this.onChangeFacebook.bind(this);
    this.onChangeInstagram = this.onChangeInstagram.bind(this);
    this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      username: this.props.user.username,
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      facebook: this.props.user.facebook,
      instagram: this.props.user.instagram,
      aboutme: this.props.user.aboutme,
      picture: this.props.user.picture,
      location: {
        address: "",
        lat: this.props.user.location.lat,
        lng: this.props.user.location.lng
      },
      openProfileModal: false,
      categories: []

    }

  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePicture(e) {
    this.setState({
      picture: e.target.value
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeAboutMe(e) {
    this.setState({
      aboutme: e.target.value
    });
  }
  onChangeFacebook(e) {
    this.setState({
      facebook: e.target.value
    });
  }
  onChangeInstagram(e) {
    this.setState({
      instagram: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    if (this.state.categories === null) {
      this.setState({
        categories: this.props.user.categories
      })
    }
    const profile = {

      categories: this.state.categories,
      username: this.state.username,
      _id: this.props.user._id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      aboutme: this.state.aboutme,
      picture: this.state.picture,
      location: this.state.location
    }
    this.props.updateProfile(profile);
    this.setState({
      categories: []
    });
    this.toggleModal();



  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoords, this.handleError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getCoords(position) {
    this.setState({
      location: { lat: position.coords.latitude, lng: position.coords.longitude }
    })
    console.log(this.state.location)
  }
  handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("an Error has occured")
    }
  }
  toggleModal() {
    this.setState({
      openProfileModal: !this.state.openProfileModal
    })

  }
  onCheck(e) {
    const categories = this.state.categories
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      categories.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = categories.indexOf(e.target.value)
      categories.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ categories: categories })
    console.log(categories)

  }
  render() {
    return (
      <MDBContainer>
        <MDBBtn id="editProfileBtn" onClick={this.toggleModal} outline color="info">
          <MDBIcon icon="cog" id="follow-icon" className="mr-1" />Edit
        </MDBBtn>
        <MDBModal size='lg' isOpen={this.state.openProfileModal} toggle={this.toggleModal}>
          <MDBModalHeader toggle={this.toggleModal}>Update your profile</MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol className="col-md-12 col-sm-12 col-lg-3">
                <div className="container">
                  <form>

                    <div>
                      {this.props.categories.map((category, index) => (
                        <label className="" key={index}>
                          <input className="mx-1" type="checkbox" onChange={this.onCheck}
                            checked={this.props.user.categories.map(c => c === category ? true : false
                            )}
                            value={category} >
                          </input>
                          {category}
                        </label>
                      ))}
                    </div>
                  </form>
                  <div className="mt-4">
                    <MDBBtn id="editBtn" onClick={this.getLocation}>
                      <MDBIcon far icon="compass" size="2x" /><br></br> Set Location
                  </MDBBtn>
                  </div>

                </div>
              </MDBCol>
              <MDBCol className="col-md-12 col-sm-12  col-lg-9">
                <img src={this.state.picture} className="rounded-circle avatar-xl img-thumbnail" alt="profile" />
                <form>
                  <p className="h5 text-center mb-4">Sign up</p>
                  <div className="grey-text text-left">
                    <MDBInput onChange={this.onChangePicture} value={this.state.picture} label="Picture URL" icon="image" group type="text" />
                    <MDBInput onChange={this.onChangeUsername} value={this.state.username} label="Username" icon="address-card" group type="text" />
                    <MDBInput onChange={this.onChangeFirstName} value={this.state.firstname} label="First Name" icon="user" group type="text" />
                    <MDBInput onChange={this.onChangeLastName} value={this.state.lastname} label="Last Name" icon="user" group type="text" />
                    <MDBInput onChange={this.onChangeAboutMe} value={this.state.aboutme} label="About Me" icon="file-alt" group type="textarea" />
                    <i className="fab fa-2x fa-facebook float-left pt-1"></i>
                    <MDBInput onChange={this.onChangeFacebook} value={this.state.facebook} label="Facebook Link" icon="facebook" group type="text" />
                    <i className="fab fa-2x fa-instagram float-left pt-1"></i>
                    <MDBInput onChange={this.onChangeInstagram} value={this.state.instagram} icon="instagram" label="Instagram Link" group type="text" validate error="wrong"
                      success="right" />
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn id="deleteBtn" onClick={this.toggleModal}>Cancel</MDBBtn>
            <MDBBtn id="editBtn" onClick={this.onSubmit}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

      </MDBContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    categories: state.users.categories
  };
}
export default connect(mapStateToProps, { updateProfile })(UpdateProfileModal);