import React, { Component } from 'react';
import Comment from './commentPostFooter';
import { createComment, deletePost, likePost, unlikePost } from '../actions/postActions';
import { connect } from 'react-redux';
import EditPost from './editPosts';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBCard, MDBRow, MDBBtn, MDBCol } from 'mdbreact';
import ReactTimeAgo from 'react-time-ago';
import YouTube from 'react-youtube';
// options for youtubeplayer
const opts = {
	height: '400px',
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
const Post = (props) => (
	// container row/col for post item
	<MDBRow id='postWrapper' center>
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
							src={props.picture}
							className='rounded-circle avatar-sm img-thumbnail '
							alt='profile'
						/>
						<span id='postUser'> {props.username}</span>
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
					{props.post.likes.find((e) => e === props.user) ? (
                        /* this row has border top and bottom as dividers */
						<div id='likeDiv' className='col-12 '>
							<Link
								to='#'
								id='likeBtn'
								onClick={() => props.unlikePost({ postId: props.post._id, likedBy: props.user })}>
								<MDBIcon fas icon='heart' color='danger' size='lg' className='mr-1' />
							</Link>
							{props.post.likes.length ? props.post.likes.length : '0'}
						</div>
					) : (
                    /* if post.likes[] does not contain user's Id then display like button */
						<div id='likeDiv' className='col-12 '>
							<Link
								to='#'
								id='likeBtn'
								onClick={() => props.likePost({ postId: props.post._id, likedBy: props.user })}>
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
							userId={props.user}
						/>
					</div>
				</div>
                {/* edit / delete buttons in footer */}
				<div className='row'>
					<div className='col'>
						<EditPost post={props.post} />
					</div>
					<div className='col mb-2 mx-2'>
						<MDBBtn
							id='deleteBtn'
							className='btn btn-block m-auto'
							outline
							color='danger'
							onClick={() => props.deletePost(props.post._id)}>
							<MDBIcon icon='trash-alt' size='lg' className='mr-1' />
							Delete
						</MDBBtn>
					</div>
				</div>
			</MDBCard>
		</MDBCol>
	</MDBRow>
);

/*@@TYPE: super smart component 
DESC: creates list of <Post> components 
PROPS: connected to redux store	
*/
class MyPostsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myPosts: [],
		};
    }
    // function that creates the post list
	postsLog() {
        // if posts have loaded in the store and the active user is 'user' then create my postlist
		if (this.props.posts && this.props.active === 'user') {
            //myPosts filters through all posts creating a new array matching any post postedBy user's Id
			const myPosts = this.props.posts.filter((e) => e.postedBy === this.props.user._id);
            // maps through the new myPost array creating a <Post> component for each one
            return myPosts.map((currentpost) => {
				return (
					<Post
						username={this.props.user.username}
						picture={this.props.user.picture}
						likePost={this.props.likePost}
						createComment={this.props.createComment}
						deletePost={this.props.deletePost}
						post={currentpost}
						postId={currentpost._id}
						user={this.props.user._id}
						unlikePost={this.props.unlikePost}
						key={currentpost._id}
					/>
				);
            });
            // else if the active user is member show thier posts instead
		} else if (this.props.posts && this.props.active === 'member') {
            //myPosts filters through all posts creating a new array matching any post postedBy selected member's Id
			const myPosts = this.props.posts.filter((e) => e.postedBy === this.props.member._id);
			return myPosts.map((currentpost) => {
				return (
					<Post
						username={this.props.member.username}
						picture={this.props.member.picture}
						likePost={this.props.likePost}
						createComment={this.props.createComment}
						deletePost={this.props.deletePost}
						post={currentpost}
						postId={currentpost._id}
						user={this.props.user._id}
						unlikePost={this.props.unlikePost}
						key={currentpost._id}
					/>
				);
            });
            
        } else {
			return 'no posts yet..';
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
export default connect(mapStateToProps, { createComment, deletePost, likePost, unlikePost })(
	MyPostsList
);
