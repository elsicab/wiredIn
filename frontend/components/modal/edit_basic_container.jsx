import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions'; 
import { AiOutlineClose } from 'react-icons/ai';
import { editProfile } from '../../actions/profile_actions';



class EditBasic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pronouns: this.props.profile.pronouns,
            headline: this.props.profile.headline,
            country: this.props.profile.country,
            industry: this.props.profile.industry,
            location: this.props.profile.location,
            postal_code: this.props.profile.postal_code, 
            id: this.props.profile.id
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleModal = this.handleModal.bind(this);

    }

    handleModal(e){
        e.preventDefault();
        this.props.closeModal();
    }

    handleInput(type){
        return (e) => {
            this.setState({ [type]: e.target.value })
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.editProfile(this.state)
            .then(() => this.props.closeModal())
    }

    render(){
        return (
            <div className="edit_modal">
                <div className="edit_header">
                    <h2>Edit intro</h2>
                    <p className="exit_edit" onClick={this.handleModal}><AiOutlineClose/></p>
                </div>
                <div className="name_input">
                    <div className="first_name_input">
                        <label>First Name *</label>
                        <input value={this.props.currentUser.first_name} type="text" />
                    </div>
                    <div className="last_name_input">
                        <label>Last Name *</label>
                        <input value={this.props.currentUser.last_name}type="text" />
                    </div>
                </div>
                <div className="pronouns">
                    <label>Pronouns</label>
                    <select value={this.state.pronouns} onChange={this.handleInput('pronouns')}>
                         <option>Please Select</option>
                        <option value="She/Her">She/Her</option>
                        <option value="He/Him">He/Him</option>
                        <option value="They/Them" >They/Them</option>
                    </select>
                    <p>Let others know how to refer to you.</p>
                </div>
                <div className="headline">
                    <label>Headline *</label>
                    <textarea value={this.state.headline} onChange={this.handleInput('headline')} name="" id="" cols="78" rows="2"></textarea>
                </div>
                {/* <div className="position">
                    <label>Current Position</label>
                    <input type="text" />
                </div>
                <div className="pick_edu">
                    <label>Education</label>
                    <input type="text" />
                </div> */}
                <div className="country">
                    <label>Country/Region *</label>
                    <input value={this.state.country} onChange={this.handleInput('country')}type="text" />
                </div>
                <div className="postal_sec">
                    <div className="postal_code">
                        <label>Postal Code</label>
                        <input value={this.state.postal_code} onChange={this.handleInput('postal_code')} type="text" />
                    </div>
                    <div className="location">
                        <label>Location</label>
                        <input value={this.state.location} onChange={this.handleInput('location')} type="text" />
                    </div>
                </div>
                <div className="industry">
                    <label>Industry *</label>
                    <input value={this.state.industry} onChange={this.handleInput('industry')} type="text" />

                </div>
                <button className="save_button" onClick={this.handleSubmit}>Save</button>     
            </div>
        )
    }
}

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.currentUser], 
    profileId: ownProps.profileId, 
    profile: state.entities.profiles[ownProps.profileId]
});

const mDTP = dispatch => ({
    editProfile: profile => dispatch(editProfile(profile)),
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(EditBasic);