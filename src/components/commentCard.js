import React from 'react';
import { MDBRow, MDBCol, MDBBadge, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { deleteComment } from '../actions/postActions';
import { Link } from 'react-router-dom';

/*   COMMENT CARD 
this component is the layout of each indivisual comment
*/
class CommentCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentImage: null,
			commentUsername: null,
		};
	}

	// each time the comment card mounts we need to find the picture of who the current comment belongs to.
	componentDidMount() {
		this.getPicture(this.props.commentedBy);
	}

	// getPicture finds the profile picture by matching comment.postedBy with the member object and returns the username and picture.
	getPicture(commentedBy) {
		// if the (commentedBy) matches the current user we have to use the user state from props.
		if (this.props.user._id === commentedBy) {
			this.setState({
				commentImage: this.props.user.picture,
				commentUsername: this.props.user.username,
			});
			// else it must belong to a member so we will map through the member state for that id
		} else {
			this.props.members.map((member) =>
				member._id === commentedBy
					? this.setState({
							commentImage: member.picture,
							commentUsername: member.username,
					  })
					: // or return nothing if no member is matched.
					  null
			);
		}
	}

	render() {
		return (
			// Row container for each comment box
			<MDBRow center className='my-3 align-middle' style={{ height: '100px' }}>
				{/* col container for comment box */}
				<MDBCol style={{ maxWidth: '45rem' }}>
					<div className='row'>
						{/* 1/2 columns where we place the picture col width is auto*/}
						<div className='col-auto d-flex '>
							<img
								src={this.state.commentImage}
								className='rounded-circle avatar-sm img-thumbnail '
								alt='profile'
							/>
						</div>
						{/* 2/2 column where we display the username and comment on seperate rows*/}
						<div id='commentBlock' className=' col-9'>
							<div className='row'>{this.state.commentUsername}</div>
							<div className='row'>
								{/* MDBBadge creates the style for the bubble textbox that comments sit inside */}
								<MDBBadge id='commentpill' pill color='light'>
									{this.props.comment}
								</MDBBadge>

								{/* conditional render of the 3rd col. If the comment is owned by the user OR the post is owned by user then show delete button */}
								{this.props.userId === this.props.postedBy ||
								this.props.userId === this.props.commentedBy ? (
									<div className='d-flex justify-content-center col-auto'>
										<Link
											to='#'
											id='deleteComment'
											className='align-middle'
											onClick={() =>
												this.props.deleteComment({
													postId: this.props.postId,
													commentId: this.props.commentId,
												})
											}>
											<MDBIcon icon='backspace' color='default' size='lg' className='mr-1 ' />
										</Link>
									</div>
								) : /* if the user is not the owner of the post or the owner of the comment return null */
								null}
							</div>
						</div>
					</div>
				</MDBCol>
			</MDBRow>
		);
	}
}
function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
		isLoading: state.posts.isLoading,
		members: state.users.members,
	};
}
export default connect(mapStateToProps, { deleteComment })(CommentCard);
