import React, { Component, useEffect, useState } from 'react';
import Comment from './commentPostFooter';
import { loadPosts, createComment, deletePost, likePost, unlikePost } from '../actions/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBCard, MDBRow, MDBCol } from 'mdbreact';
import ReactTimeAgo from 'react-time-ago';
import YouTube from 'react-youtube';

const opts = {
	height: '390',
	width: '100%',
	playerVars: {
		// https://developers.google.com/youtube/player_parameters
		autoplay: 0,
	},
};
/*@@TYPE: dumb component 
DESC: creates single post layout
PROPS: member={member to be displayed}
	username={current user's username}  used to display username
	picture={current user's picture}     
    likePost= likePost() function that adds user's Id to the current post's likes[]
    unlikePost= unlikePost() function that removes user's Id from the current post's likes[]
    createComment= createComment() 
    deletePost= deletePost() 
    post={ post }  
    postId={ post._id } 
    user={ user._id } 	
*/
const Post = (props) => {
	const [picture, setPic] = useState();
	const [username, setUsername] = useState();
	// each time post mounts
	useEffect(() => {
		getPicture(props.post.postedBy);
	});

	function getPicture(postedBy) {
		// if the postedBy matches the current user we have to use the user state in the redux store to set picture/ username.
		if (props.user._id === postedBy) {
			setPic(props.user.picture);
			setUsername(props.user.username);
			// else it must belong to a member so we will map through the members state in redux store for that id and return picture/username.
		} else {
			props.members.map((member) =>
				member._id === postedBy ? (setPic(member.picture), setUsername(member.username)) : null
			);
		}
	}

	return (
		<MDBRow id='postWrapper' center className='my-4'>
			<MDBCol style={{ maxWidth: '55em' }}>
				{/* post Body */}
				<MDBCard>
					{/* post header with wave background that holds TITLE */}
					<div className='postWave'>
						<h3> {props.post.title} </h3>
					</div>
					{/* row displays picture and username of postedBy also date posted */}
					<div id='postName' className='row pb-2 mx-2'>
						<div className='col '>
							<img
								src={picture}
								className='rounded-circle avatar-sm img-thumbnail '
								alt='profile'
							/>
							<span id='postUser'> {username}</span>
						</div>
						{/* display date posted inline with postedBy */}
						<div className='col d-flex justify-content-center mr-1'>
							<p id='postDate'>
								<ReactTimeAgo date={props.post.date} />{' '}
							</p>
						</div>
					</div>
                    {/* post content row */}
					<div className='row mx-2 my-2'>{props.post.content}</div>
					{/* post media row */}
                    <div className='row mx-2'>
                        {/* if post.picture is truthy we must have a picture url to post */}
						{props.post.picture ? (
							<MDBCol className='col-12'>
								<div id='postImg' className='img-fluid h-auto w-100 '>
									<img src={props.post.picture} alt='post' />
								</div>
							</MDBCol>
                        /* if there is no post.picture return null */
						) : null}
                        {/* if post.video is truthy we must have a video url to post */}
						{props.post.video ? (
							<MDBCol className='col-12'>
								<div id='postVideo' className='img-fluid h-auto w-100 '>
									<YouTube videoId={props.post.video} opts={opts} />
								</div>
							</MDBCol>
                        /* if there is no post.video return null */    
						) : null}
					</div>
					<div className='row mx-3 mt-4'>
                        {/* if post.likes[] contains user's Id then display unlike button */}
						{props.post.likes.find((e) => e === props.user._id) ? (
                            /* this row has border top and bottom as dividers */
							<div id='likeDiv' className='col-12 '>
								<Link
									id='likeBtn'
									to='#'
									onClick={() =>
										props.unlikePost({ postId: props.post._id, likedBy: props.user._id })
									}>
									<MDBIcon fas icon='heart' color='danger' size='lg' className='mr-1' />
								</Link>
								{props.post.likes.length ? props.post.likes.length : '0'}
							</div>
                        /* if post.likes[] does not contain user's Id then display like button */
						) : (
							<div id='likeDiv' className='col-12 '>
								<Link
									to='#'
									id='likeBtn'
									onClick={() =>
										props.likePost({ postId: props.post._id, likedBy: props.user._id })
									}>
									<MDBIcon far icon='heart' color='default' size='lg' className='mr-1' />
								</Link>
                                {/* conditionally display how many likes */}
								{props.post.likes.length ? props.post.likes.length : '0'}
							</div>
                        // close conditional statement
						)}
					</div>
                    {/* comment section */}
					<div className='row'>
						<div className='col'>
							<Comment
								postedBy={props.post.postedBy}
								postId={props.postId}
								comments={props.post.comments}
								createComment={props.createComment}
								userId={props.user._id}
							/>
						</div>
					</div>
				</MDBCard>
			</MDBCol>
		</MDBRow>
	);
};
/*@@TYPE: super smart component 
DESC: creates list of <Post> components 
PROPS: connected to redux store	
*/
class OtherPostsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otherPosts: [],
			picture: '',
		};
    }
    // function that creates the post list
	postsLog() {
		if (this.props.posts) {
            //otherPosts filters through all posts creating a new array matching any post not postedBy user's Id
			const otherPosts = this.props.posts.filter((e) => e.postedBy !== this.props.user._id);
			return otherPosts.map((currentpost) => {
				return (
					<Post
						members={this.props.members}
						likePost={this.props.likePost}
						createComment={this.props.createComment}
						deletePost={this.props.deletePost}
						post={currentpost}
						postId={currentpost._id}
						user={this.props.user}
						unlikePost={this.props.unlikePost}
						key={currentpost._id}
					/>
				);
            });
        // if props.post have not loaded or no other posts exist.
		} else {
			return 'No Posts Yet..';
		}
	}
	render() {
		return <div id='post-list-container'>{this.postsLog()}</div>;
	}
}
// connect redux store to props
function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
		member: state.users.profile,
		active: state.users.active,
		members: state.users.members,
		posts: state.posts.posts,
	};
}
export default connect(mapStateToProps, {
	loadPosts,
	createComment,
	deletePost,
	likePost,
	unlikePost,
})(OtherPostsList);
