import React, { Component } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import mapStyle from './mapStyle';
import monarchIcon from '../imgs/monarchIcon3.png';
import { MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';

const containerStyle = {
	width: '100%',
	height: '600px',
	margin: '0',
};
// load an external style for googleMap
const options = {
	styles: mapStyle,
};

export default class MonarchMap extends Component {
	state = {
		selected: null,
	};
	// sets the state to the member object taht was clicked on the map.
	onMarkerClick(m) {
		this.setState({
			selected: m,
		});
		console.log(this.state);
	}
	render() {
		return (
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={this.props.user.location}
				zoom={8}
				options={options}>
				{/* insert Marker for each member with a location */}
				{this.props.members.map((member) => (
					<Marker
						key={member._id}
						position={member.location}
						/*style to change the icon to monarch buttefly */
						icon={{
							url: monarchIcon,
							scaledSize: new window.google.maps.Size(75, 75),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 15),
						}}
						onClick={() => {
							this.onMarkerClick(member);
						}}
					/>
				))}
				{/* if selected is truthy display the infowindow with that member*/}
				{this.state.selected ? (
					<InfoWindow
						/* place infowindow center at this.state.selected.location */
						position={this.state.selected.location}
						/* when we close the infowindow set this.state.selected back to empty so it will reopen*/
						onCloseClick={() => {
							this.setState({ selected: null });
						}}>
						{/* this is a copy of the member card layout*/}
						{/* container Row for member content*/}
						<div className='row'>
							{/* col 1/3  that display member image */}
							<div className='col-auto'>
								<img
									src={this.state.selected.picture}
									className='rounded-circle avatar-sm img-thumbnail '
									alt='profile'
								/>
							</div>
							{/* col 2/3  display username,aboutme, and categories on seperate rows */}
							<div className='col'>
								<div className='row'>{this.state.selected.username}</div>
								<div className='row'>{this.state.selected.aboutme}</div>
								<div className='row'>
									{this.state.selected.categories.map((category, index) => (
										<MDBBadge key={index} pill id='categoryPill' className='my-1 mx-1'>
											{category}
										</MDBBadge>
									))}
								</div>
							</div>
							{/* col 3/3 conditionally displays either follow button or unfollow button*/}
							<div className='m-auto col-auto'>
								{/* if the user's following array contains this member's Id show UNFOLLOW btn  */}
								{this.props.user.following.includes(this.state.selected._id) ? (
									<MDBBtn
										onClick={() =>
											/* unfollowMember is an external  axios function that DELETES the member's Id from 
                      user's following[] AND the user's Id from the member's followers[] */
											this.props.unfollowMember({
												unfollowIds: {
													unfollowId: this.state.selected._id,
													_id: this.props.user._id,
												},
											})
										}
										outline
										id='deleteBtn'>
										{/* Inside of unfollow Btn */}
										<MDBIcon icon='minus' id='unfollow-icon' className='mr-1' />
										Unfollow
									</MDBBtn>
								) : (
									/* else the user's following[] does not contain this member Id so display FOLLOW btn */
									<MDBBtn
										onClick={() =>
											/* followMember is an external  axios function that PUTS the member's Id into 
                      user's following[] AND the user's Id into the member's followers[] */
											this.props.followMember({
												followIds: { followId: this.state.selected._id, _id: this.props.user._id },
											})
										}
										outline
										id='editProfileBtn'
										color='default'>
                    {/* Inside of unfollow Btn */}
										<MDBIcon icon='plus' id='follow-icon' className='mr-1' />
										Follow
									</MDBBtn>
                // close conditional statement
								)}
							</div>
						</div>
					</InfoWindow>
        //if this.state.selected is falsey display null
				) : null}
				<></>]
			</GoogleMap>
		);
	}
}
