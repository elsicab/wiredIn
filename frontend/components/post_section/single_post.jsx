import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { removePost, fetchPosts  } from '../../actions/post_actions';
import { createLike, fetchLikes, removeLike} from '../../actions/like_action'
import Dropdown from './post_dropdown';
import PostCommentContainer from './comment';


class SinglePost extends React.Component{
    constructor(props){
        super(props)
         this.state = {
            openMenu: true, 
            showComment: false,
            like: []
        };
        this.handleFocus = this.handleFocus.bind(this); 
        this.timepassed = this.timepassed.bind(this);
        this.showComment = this.showComment.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            like: props.liked,
        })
    }

    componentDidUpdate(prevProps){
        if (this.props.likes.length !== prevProps.likes.length) {
            this.props.fetchLikes();
        }
    }

    handleLike(e){
        e.preventDefault();
        if(this.state.like.length === 0){
            this.props.createLike({likeable_id: this.props.post.id, likeable_type: "post"})
        }else{
            this.props.removeLike(this.props.liked[0].id)
        }
    }

    handleFocus(e) {
        const newState = !this.state.openMenu 
        this.setState({openMenu: newState})
    }

    showComment(e){
        this.setState({showComment: true})
    }

    componentDidMount() {
        this.props.fetchPosts();
        this.props.fetchLikes();
    }

    timepassed(date){
        let time = Date.now() - Date.parse(date)
        if(Math.floor(time / 86400000 ) > 0){
            return Math.floor(time / 86400000) + 'd'
        }else if(Math.floor(time / 3600000) > 0)
            return Math.floor(time / 3600000) + 'h'
        else{
            return Math.floor(time / 60000) + 'm'
        }
    }

    render(){
        if(!this.props.post) return null
        
            const dropdown = this.props.currentUser.id == this.props.post.author_id ? <Dropdown post={this.props.post}/> : null
            const avatarPost = this.props.post?.author?.avatar ? <img className= "avatar-index" src={this.props.post?.author?.avatar} /> : 
            <img className="avatar-index" src={window.avatar} />
            let comments = this.props.comments.filter(comment => 
                comment.post_id === this.props.post.id)
            
            let likes = this.props.likes.filter(like => 
                like.likeable_id === this.props.post.id)

            let likeCount = likes.length > 0 ? <div className="like-count"><div className="active-likes"><AiOutlineLike/></div> <div className="likes-num">{likes.length}</div> </div> : null
            let commentCount = comments.length > 0 ? <div onClick={this.showComment} className="comment-count">{comments.length} comments</div> : null
            return(
            <div>
                <div className="post_menu" >
                    {dropdown}
                </div>
                
                <div className="post_info">
                    <p>{avatarPost}</p>
                    <div className="author-info">
                        <div className="author_name">
                            <p>{this.props.post?.author?.first_name}</p>
                            <p>{this.props.post?.author?.last_name}</p>
                        </div>
                        <div className="created">
                            <p>{this.timepassed(this.props.post.created_at)}</p>
                        </div>
                    </div>
                </div>
                <div><img className= "post_image" src={this.props.post.photoUrl} /></div>
                <div className="post_text">{this.props.post.body}</div>
                <div className="interactions">
                    {likeCount}
                    {commentCount}
                </div>
                <ul className="post-interactions">
                    <li onClick={this.handleLike} className={this.state.like.length != 0 ? "liked" : "not-liked"}><AiOutlineLike/>  Like</li>
                    <li onClick={this.showComment}><FaRegCommentDots/ >  Comment</li>
                </ul>
                <div className={this.state.showComment ? "show-comment" : "clear"}>
                    <PostCommentContainer postId={this.props.post.id}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // errors: errors.session,
    author: state.entities.posts.author,
    posts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.currentUser],
    liker: state.session.currentUser,
    post: ownProps.post,
    comments: Object.values(state.entities.comments),
    likes: Object.values(state.entities.likes),
    liked: Object.values(state.entities.likes).filter(like => 
                like.likeable_id === ownProps.post.id && like.liker_id === state.session.currentUser)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: postId => dispatch(removePost(postId)),
    openModal: (modal, id) => dispatch(openModal(modal, id)), 
    createLike: like => dispatch(createLike(like)), 
    removeLike: likeId => dispatch(removeLike(likeId)),
    fetchLikes: () => dispatch(fetchLikes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);