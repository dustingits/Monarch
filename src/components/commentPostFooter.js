import React from 'react';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact'
import CommentCard from './commentCard';
class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.onComment = this.onComment.bind(this);
        this.onSend = this.onSend.bind(this);
        this.commentInput = React.createRef();

        this.state = {
            shortList: [],
            comment: null,
            postedBy: this.props.userId,
            postId: this.props.postId
        }
    }
    // function sets this.state.comment onChange of input
    onComment(e) {
        this.setState({
            comment: e.target.value
        });
    }
    // function fired onClick sendBtn
    onSend(e) {
        const comment = {
            postId: this.state.postId,
            comment: this.state.comment,
            postedBy: this.state.postedBy
        }
        // external axios POST function
        this.props.createComment(comment);
        this.setState({
            comment: '',
        })
        // reset input text to blank after post
        this.commentInput.current.value = ""
    }
    // function that maps through the comments and creates each comment card
    commentLog() {
        // if the post has more than 2 comments create new array with the first and last comment
        if (this.props.comments.length > 2) {
            const firstComment = this.props.comments[1]
            const lastComment = this.props.comments[this.props.comments.length - 1]
            const shortList = [firstComment, lastComment]
            // then map the shortlist of comments to display comment card
            return shortList.map(c => {
                return <CommentCard postedBy={this.props.postedBy} commentId={c._id} userId={this.props.userId} postId={this.props.postId} comment={c.text} commentedBy={c.postedBy} key={c._id} />;
            })
        // else 2 or fewer comments exist so map those to display comment card
        } else {
            return this.props.comments.map(c => {
                return <CommentCard postedBy={this.props.postedBy} commentId={c._id} userId={this.props.userId} postId={this.props.postId} comment={c.text} commentedBy={c.postedBy} key={c._id} />;
            })
        }

    }
    render() {
        return (
            // container div for entire comment section
            <div>
                {/* conatiner div for comment log  */}
                <div>
                    {this.commentLog()}
                </div>
                {/*container div for comment input field  */}
                <div id="commentInput" className="input-group  mb-3">
                    <input type="text" className="form-control" ref={this.commentInput} onChange={this.onComment} placeholder="Leave a comment..." name="commentInput"  />
                    {/* div to append send button behind the input */}
                    <div className="input-group-append">
                        <button id="sendBtn" className="btn btn-outline-secondary" onClick={this.onSend} type="button">
                            <MDBIcon icon="paper-plane" size="2x" />
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        isLoading: state.posts.isLoading
    };
}
export default connect(mapStateToProps)(Comment);