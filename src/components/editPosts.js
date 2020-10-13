import React, { Component } from 'react';
import {
	MDBBtn,
	MDBContainer,
	MDBInput,
	MDBRow,
	MDBCard,
	MDBCardBody,
	MDBCollapse,
	MDBIcon,
	MDBCardImage,
	MDBCol,
	MDBModal,
	MDBModalHeader,
	MDBModalFooter,
	MDBModalBody,
} from 'mdbreact';
import { connect } from 'react-redux';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import { editPost } from '../actions/postActions';

/* @@TYPE: smart component 
    DESC: upates a post model to mongodb returns the updated post and updates redux store.
    PROPS: post:{_id,title,content,picture,video,date}
*/
class EditPost extends Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.togglePostModal = this.togglePostModal.bind(this);
		this.onChangeContent = this.onChangeContent.bind(this);
		this.onChangePicture = this.onChangePicture.bind(this);
		this.onChangeVideo = this.onChangeVideo.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			title: this.props.post.title,
			content: this.props.post.content,
			picture: this.props.post.picture,
			video: this.props.post.video,
			openPostModal: false,
			collapseID: 'collapse2',
			date: new Date(),
		};
	}
	togglePostModal() {
		this.setState({
			openPostModal: !this.state.openPostModal,
		});
	}
	onChangeTitle(e) {
		this.setState({
			title: e.target.value,
		});
	}
	onChangeContent(e) {
		this.setState({
			content: e.target.value,
		});
	}
	onChangePicture(e) {
		this.setState({
			picture: e.target.value,
			video: '',
		});
	}
	onChangeVideo(e) {
		const id = getYouTubeID(e.target.value);
		this.setState({
			video: id,
			picture: '',
		});
		console.log(this.state);
	}
	// controls the edit modal window
	toggleCollapse(collapseID) {
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : '',
		}));
	}
	onSubmit(e) {
		e.preventDefault();
		const post = {
			postId: this.props.post._id,
			title: this.state.title,
			picture: this.state.picture,
			content: this.state.content,
			video: this.state.video,
			date: Date.now(),
		};
		//editPost external axios Thunk
		this.props.editPost(post);
		this.togglePostModal();
	}
	render() {
		// youtube player options
		const opts = {
			height: '390',
			width: '100%',
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 0,
			},
		};
		return (
			<MDBContainer>
                {/* button that will render outside of the modal*/}
				<MDBBtn id='editBtn' className='btn btn-block' onClick={this.togglePostModal}>
					<MDBIcon icon='pencil-alt' size='lg' className='mr-1' />
					Edit
				</MDBBtn>
                {/* elements contained in MDBModal are hidden until toggled*/}
				<MDBModal size='lg' isOpen={this.state.openPostModal} toggle={this.togglePostModal}>
					<MDBModalHeader toggle={this.toggleModal}>Update your Post</MDBModalHeader>
					<MDBModalBody>
						<MDBRow center>
							<MDBCol style={{ maxWidth: '45rem' }}>
								<MDBCard>
									<MDBCardBody>
                                        {/* conditonal render of preview URL based on picture or video is truthy */}
										{this.state.picture ? (
											<MDBCardImage
												className='img-fluid w-100 mt-4'
												src={this.state.picture}
												waves
											/>
										) : null}
										{this.state.video ? (
											<YouTube videoId={this.state.video} opts={opts} onReady={this._onReady} />
										) : null}
                                        {/* container for 3 hidden divs with URL input fields  */}
										<MDBContainer>
											<MDBContainer className='md-accordion mt-5'>
                                                {/* header div 1/3 onClick to display Audio URL input field */}
												<MDBCard className='mt-3'>
													<div
                                                        // change style based on div is active or collapsed
														id={
															this.state.collapseID === 'collapse1'
																? 'uploadTabActive'
																: 'uploadTab'
														}
														className='d-flex justify-content-between'
														onClick={() => this.toggleCollapse('collapse1')}>
														<p>Upload an Image URL</p>
														<MDBIcon
															icon={
																this.state.collapseID === 'collapse1' ? 'angle-up' : 'angle-down'
															}
														/>
													</div>
                                                    {/* collapsed div 1/3 picture URL input field */}
													<MDBCollapse id='collapse1' isOpen={this.state.collapseID}>
														<MDBCardBody>
															<MDBInput
																onChange={this.onChangePicture}
																value={this.state.picture}
																label='Image URL'
																icon='folder-open'
															/>
														</MDBCardBody>
													</MDBCollapse>
												</MDBCard>
                                                {/* header div 2/3 onClick to display Audio URL input field */}
												<MDBCard>
													<div
                                                        // change style based on div is active or collapsed
														id={
															this.state.collapseID === 'collapse2'
																? 'uploadTabActive'
																: 'uploadTab'
														}
														className='d-flex justify-content-between'
														onClick={() => this.toggleCollapse('collapse2')}>
														<p>Upload a youtube video</p>
														<MDBIcon
															icon={
																this.state.collapseID === 'collapse2' ? 'angle-up' : 'angle-down'
															}
														/>
													</div>
                                                    {/* collapsed div 2/3 video URL input field */}
													<MDBCollapse id='collapse2' isOpen={this.state.collapseID}>
														<MDBCardBody>
															paste a youtube video url ( youtube.com/?=id)
															<MDBInput
																onChange={this.onChangeVideo}
																value={this.state.video}
																label='Video URL'
																icon='folder-open'
															/>
														</MDBCardBody>
													</MDBCollapse>
												</MDBCard>
                                                {/* header div 3/3 onClick to display Audio URL input field */}
												<MDBCard>
													<div
                                                        // change style based on div is active or collapsed
														id={
															this.state.collapseID === 'collapse3'
																? 'uploadTabActive'
																: 'uploadTab'
														}
														className='d-flex justify-content-between'
														onClick={() => this.toggleCollapse('collapse3')}>
														<p>upload audio file</p>
														<MDBIcon
															icon={
																this.state.collapseID === 'collapse3' ? 'angle-up' : 'angle-down'
															}
														/>
													</div>
                                                    {/* collapsed div 3/3 video URL input field */}
													<MDBCollapse id='collapse3' isOpen={this.state.collapseID}>
														<MDBCardBody>Coming soon..</MDBCardBody>
													</MDBCollapse>
												</MDBCard>
											</MDBContainer>
                                        {/*Title and content Input fields */}
										</MDBContainer>
										<MDBInput
											onChange={this.onChangeTitle}
											value={this.state.title}
											label='Post Title'
											icon='pencil-alt'
										/>
										<MDBInput
											onChange={this.onChangeContent}
											value={this.state.content}
											type='textarea'
											label='Message'
											rows='3'
											icon='file-alt'
										/>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBModalBody>
					<MDBModalFooter>
                        {/* Submit / cancel Btn */}
						<MDBBtn id='deleteBtn' onClick={this.togglePostModal}>
							Cancel
						</MDBBtn>
						<MDBBtn id='editBtn' onClick={this.onSubmit}>
							Save changes
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.auth.user,
		myPosts: state.posts.myPosts,
	};
}
export default connect(mapStateToProps, { editPost })(EditPost);
