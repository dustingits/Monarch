import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBIcon, MDBCard, MDBBadge, MDBRow, MDBBtn, MDBCol } from 'mdbreact';
import { followMember, unfollowMember, getMemberProfile } from '../actions/userActions';
import { Link } from 'react-router-dom';

/*@@TYPE: dumb component 
DESC: creates indivisual member card for community list
PROPS: member={member to be displayed}
	user={current user}  Id needed for following and unfollowing function
	followMember={}     followMember()
	unfollowMember={}   unfollowMember()
	profile={getProfile}  a function that sets the active profile to the chosen member.
	
*/
const Member = (props) => (
	// container row / col for member card
	<MDBRow center className='my-3 align-middle' >
		<MDBCol style={{ maxWidth: '45rem' }}>
			{/* container Row for member card content*/}
			<MDBCard className='memberCard d-flex'>
				{/* col 1/3  that display member image */}
				<div className='col-3 m-auto'>
					<img
						src={props.member.picture}
						className='rounded-circle avatar-sm img-thumbnail '
						alt='profile'
					/>
				</div>
				{/* col 2/3  that displays username - email - and categories on seperate rows */}
				<div className='m-auto col-5'>
					{/* Link onClick triggers profile state change to the selected member */}
					<Link to='#' id='memberLink' onClick={() => props.profile(props.member._id)}>
						<div className='row'>{props.member.username}</div>
						<div className='row'>{props.member.email}</div>
						<div className='row'>
							{props.member.categories.map((category, index) => (
								<MDBBadge key={index} pill id='categoryPill' className='my-1 mx-1'>
									{category}
								</MDBBadge>
							))}
						</div>
					</Link>
				</div>
				{/* col 3/3 conditionally displays either follow button or unfollow button*/}
				<div className='m-auto col-4'>
					{/* if the user's following array contains this member's Id show UNFOLLOW btn  */}
					{props.user.following.includes(props.member._id) ? (
						<MDBBtn
							onClick={() =>
								/* UnfollowMember is an external  axios function that DELETES the member's Id from user's following[] AND the user's Id from the member's followers[] */
								props.unfollowMember({
									unfollowIds: {
										unfollowId: props.member._id,
										_id: props.user._id,
									}
								})
							}
							id='editBtn'>
							{/* Inside of unfollow Btn */}
							<MDBIcon icon='minus' id='unfollow-icon' className='mr-1' />
							Unfollow
						</MDBBtn>
						/* else the user's following[] does not contain this member Id so display FOLLOW btn */
					) : (
							<MDBBtn
								onClick={() =>
									/* followMember is an external  axios function that PUTS the member's Id into user's following[] AND the user's Id into the member's followers[] */
									props.followMember({
										followIds: {
											followId: props.member._id,
											_id: props.user._id,
										},
									})
								}
								id='editProfileBtn'>
								{/* Inside of unfollow Btn */}
								<MDBIcon icon='plus' id='follow-icon' className='mr-1' />
							Follow
							</MDBBtn>
							// close conditional statement
						)}
				</div>
			</MDBCard>
		</MDBCol>
	</MDBRow>
);
// smart component that generates the list of member cards
class CommunityList extends Component {
	constructor(props) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
		this.state = {
			query: '',
			myId: this.props.user._id,
			community: [...this.props.members],
		};
	}
	componentDidMount() {
		this.communityPopulate();
	}
	// Function triggered onMount and in component render
	communityPopulate() {
		return this.state.community.map((member) => {
			return (
				<Member
					member={member}
					user={this.props.user}
					followMember={this.props.followMember}
					unfollowMember={this.props.unfollowMember}
					profile={this.props.getMemberProfile}
					key={member._id}
				/>
			);
		});
	}
	// Function triggered onChange of memberSearch input field
	onSearch(e) {
		// create lowercase query string from input value
		const query = e.target.value.toLowerCase();
		// create new [] of members based on query search
		const resCommunity = this.props.members.filter(
			(e) => e.username.includes(query) || e.email.includes(query)
		);
		// set this.state.community to newly created resCommunity[] causing rerender of memberlist.
		this.setState({
			community: resCommunity,
		});
	}
	render() {
		return (
			/* container row/col for entire list of members */
			<div id='post-list-container'>
				<MDBCol md='6'>
					<form className='form-inline mt-4 mb-4'>
						<MDBIcon icon='search' />
						<input
							id="memberSearch"
							name="memberSearch"
							onChange={this.onSearch}
							className='form-control form-control-sm ml-3 w-75'
							type='text'
							placeholder='Search'
						/>
					</form>
				</MDBCol>
				{/* if members exist populate community else do nothing */}
				{this.props.members ? this.communityPopulate() : null}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
		members: state.users.members,
	};
}
export default connect(mapStateToProps, {
	followMember,
	unfollowMember,
	getMemberProfile,
})(CommunityList);
