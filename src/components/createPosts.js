import React, { Component } from 'react';
import {
	MDBBtn,
	MDBCard,
	MDBInput,
	MDBContainer,
	MDBIcon,
	MDBCollapse,
	MDBRow,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
} from 'mdbreact';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import { Redirect } from 'react-router';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';

/* @@TYPE: smart component 
DESC: creates a post model object to POST to mongodb returns the updated post and updates redux store.
PROPS: none.
*/
class CreatePosts extends Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeContent = this.onChangeContent.bind(this);
		this.onChangePicture = this.onChangePicture.bind(this);
		this.onChangeVideo = this.onChangeVideo.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		//post model
		this.state = {
			video: '',
			title: '',
			content: '',
			picture: '',
			postedBy: '',
			date: Date.now(),
			collapseID: 'collapse2',
		};
	}
	onChangeTitle(e) {
		this.setState({
			title: e.target.value,
			postedBy: this.props.user._id,
		});
	}
	onChangeContent(e) {
		this.setState({
			content: e.target.value,
		});
	}
	// if you set a picture url then resets video to empty
	onChangePicture(e) {
		this.setState({
			picture: e.target.value,
			video: '',
		});
	}
	// if you set a video url then resets picture to empty
	onChangeVideo(e) {
		const id = getYouTubeID(e.target.value);
		this.setState({
			video: id,
			picture: '',
		});
	}
	// controls the hidden divs so you can only display one URL field at a time
	toggleCollapse(collapseID) {
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : '',
		}));
	}
	onSubmit(e) {
		e.preventDefault();
		// post model
		const post = {
			title: this.state.title,
			content: this.state.content,
			date: Date.now(),
			picture: this.state.picture,
			postedBy: this.props.user._id,
			video: this.state.video,
		};
		// external axios function that POST the new comment
		this.props.createPost(post);
		// conditional redirect if done loading
		if (this.props.isLoading === false) {
			this.props.history.push('/profile');
		}
	}
	render() {
		// conditional redirect to protect routing
		if (!this.props.isAuthenticated) {
			return <Redirect to='/login' />;
		}
		// show the  URL field (1= picture 2= video) div based on current state
		const { collapseID } = this.state;
		// youtube video player options
		const opts = {
			height: '390',
			width: '100%',
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 0,
			},
		};
		return (
			// container row/col for component
			<MDBRow center>
				<MDBCol style={{ maxWidth: '45rem' }}>
					<MDBCard>
						<MDBCardBody>
							{/* conditonal render of preview URL based on picture or video is truthy */}
							{this.state.picture ? (
								<MDBCardImage className='img-fluid w-100 mt-4' src={this.state.picture} waves />
							) : null}
							{this.state.video ? (
								<YouTube videoId={this.state.video} opts={opts} onReady={this._onReady} />
							) : null}
							{/* container for 3 hidden divs with URL input fields  */}
							<MDBContainer className='md-accordion mt-5'>
								{/* header div 1/3 onClick to display image  URL input field */}
								<MDBCard className='mt-3'>
									<div
										// change style based on div is active or collapsed
										id={collapseID === 'collapse1' ? 'uploadTabActive' : 'uploadTab'}
										className='d-flex justify-content-between'
										onClick={() => this.toggleCollapse('collapse1')}>
										{/* inside div 1/3 */}
										<p> Upload an Image URL</p>
										{/* change icon direction based on div is active or collapsed */}
										<MDBIcon
											icon={collapseID === 'collapse1' ? 'angle-up m-2' : 'angle-down m-2'}
										/>
									</div>
									{/* collapsed div 1/3 image URL input field */}
									<MDBCollapse id='collapse1' isOpen={collapseID}>
										<MDBCardBody>
											<MDBInput
												onChange={this.onChangePicture}
												label='Image URL'
												icon='folder-open'
											/>
										</MDBCardBody>
									</MDBCollapse>
								</MDBCard>
								{/* header div 2/3 onClick to display video URL input field */}
								<MDBCard>
									<div
										id={collapseID === 'collapse2' ? 'uploadTabActive' : 'uploadTab'}
										className='d-flex justify-content-between'
										onClick={() => this.toggleCollapse('collapse2')}>
										<p>Upload a youtube video</p>
										<MDBIcon
											icon={collapseID === 'collapse2' ? 'angle-up m-2' : 'angle-down m-2'}
										/>
									</div>
									{/* collapsed div 2/3 video URL input field */}
									<MDBCollapse id='collapse2' isOpen={collapseID}>
										<MDBCardBody>
											paste a youtube video url ( youtube.com/?=id)
											<MDBInput
												onChange={this.onChangeVideo}
												label='Video URL'
												icon='folder-open'
											/>
										</MDBCardBody>
									</MDBCollapse>
								</MDBCard>
								{/* header div 3/3 onClick to display Audio URL input field */}
								<MDBCard>
									<div
										id={collapseID === 'collapse3' ? 'uploadTabActive' : 'uploadTab'}
										className='d-flex justify-content-between'
										onClick={() => this.toggleCollapse('collapse3')}>
										<p>Upload audio file</p>
										<MDBIcon
											icon={collapseID === 'collapse3' ? 'angle-up m-2' : 'angle-down m-2'}
										/>
									</div>
									{/* collapsed div 3/3 video URL input field */}
									<MDBCollapse id='collapse3' isOpen={collapseID}>
										<MDBCardBody>Coming soon...</MDBCardBody>
									</MDBCollapse>
								</MDBCard>
							</MDBContainer>
							{/* content / title input fields */}
							<MDBInput
								onChange={this.onChangeTitle}
								name='titleInput'
								label='Post Title'
								icon='pencil-alt'
							/>
							<MDBInput
								onChange={this.onChangeContent}
								type='textarea'
								label='Message'
								name='content'
								rows='3'
								icon='file-alt'
							/>
							{/* Submit Btn */}
							<MDBBtn id='createPostBtn' className='btn btn-block' onClick={this.onSubmit}>
								Submit
							</MDBBtn>
						</MDBCardBody>
					</MDBCard>
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
	};
}
export default connect(mapStateToProps, { createPost })(CreatePosts);
