import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { editEducation, deleteEducation, clearEducationErrors } from '../../actions/education_actions';

class EduEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            school: this.props.education.school,
            degree: this.props.education.degree,
            field: this.props.education.field,
            start: this.props.education.start,
            end: this.props.education.end,
            activities: this.props.education.activities, 
            gpa: this.props.education.gpa, 
            id: this.props.education.id,
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillMount() {
        if (this.props.errors.length > 0) this.props.clearEducationErrors()
    }

    renderErrors() {
        return(
        <ul className="errors">
            {this.props.errors.map((error, i) => (
            <li key={`error-${i}`} className="error, education-errors">
                <AiFillMinusCircle/> {error}
            </li>
            ))}
        </ul>
        );
    }

    handleDelete(e){
        e.preventDefault
        this.props.deleteEducation(this.props.education.id)
            .then(this.props.closeModal())
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
        this.props.editEducation(this.state)
            .then(() => this.props.closeModal())
    }

    render(){
        return (
            <div className="edu-modal">
                <div className="edu-header">
                    <h2>Edit education</h2>
                    <p className="exit-edit" onClick={this.handleModal}><AiOutlineClose/></p>
                </div>
                <div className="school-input">
                    <label>School*</label>
                    <input value={this.state.school} onChange={this.handleInput('school')} type="text" />
                    {this.renderErrors()}
                </div>
                <div className="degree">
                    <label>Degree </label>
                    <input  value={this.state.degree} onChange={this.handleInput('degree')} type="text" />
                </div>
                <div className="field-study">
                    <label>Field of study</label>
                    <input  value={this.state.field} onChange={this.handleInput('field')} type="text" />
                </div>
                <div className="start">
                    <label>Start date </label>
                    <input  value={this.state.start} onChange={this.handleInput('start')} type="text" />
                </div>
                <div className="end">
                    <label>End date (or expected)</label>
                    <input value={this.state.end} onChange={this.handleInput('end')} type="text" />
                </div>
                <div className="gpa">
                    <label>Grade </label>
                    <input value={this.state.gpa} onChange={this.handleInput('gpa')} type="text" />
                </div>
                <div className="activities">
                    <label>Activities and societies</label>
                    <textarea value={this.state.activities} onChange={this.handleInput('activities')} name="" id="" cols="10" rows="3"></textarea>
                </div>                
                <div className="profile-buttons">
                     <button className="delete-btn" onClick={this.handleDelete}>Delete education</button>
                     <button className="save-btn" onClick={this.handleSubmit}>Save</button>  
                </div>   
            </div>
        )
    }
}

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.currentUser], 
    eduId: ownProps.eduId,
    education: state.entities.educations[ownProps.eduId],
    errors: state.errors.educations
});

const mDTP = dispatch => ({
    editEducation: education => dispatch(editEducation(education)),
    closeModal: () => dispatch(closeModal()),
    deleteEducation: eduId => dispatch(deleteEducation(eduId)),
    clearEducationErrors: () => dispatch(clearEducationErrors())
})

export default connect(mSTP, mDTP)(EduEdit);