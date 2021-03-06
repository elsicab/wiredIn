import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_action'; 
import CommentIndexContainer from './comments_index';


class Comments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            post_id: this.props.postId, 
            showComment: this.props.show,
            body: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type){
        return (e) => {
            this.setState({ [type]: e.target.value })
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createComment(this.state)
        .then(this.setState({body: ""}))
    }

    render(){
        let button = this.state.body ? <button className="comment-button" onClick={this.handleSubmit}>Post</button> : null
        return(
            <div>
                <div className="comment-body">
                    <textarea className="comment-box" placeholder="Add a comment..." onChange={this.handleInput('body')} value={this.state.body}/>
                    {button}
                </div>
                <div className="comments-index">
                    <CommentIndexContainer postId={this.props.postId}/>
                </div>
            </div> 
        )
    }
}

const mSTP = (state, ownProps) => ({
    postId:  ownProps.postId,
    show: ownProps.show
})

const mDTP = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default connect(mSTP, mDTP)(Comments);