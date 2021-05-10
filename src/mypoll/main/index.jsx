import { Component } from "react";
import PropTypes from "prop-types";
import OpinionForm from "./opinionform";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Form from '../form'

class Main extends Component {
    state = {
        openForm: false
    }

    toggleModal = () => {
        this.setState({ openForm: !this.state.openForm })
    }
    render() {
        if (Object.keys(this.props.selectedPoll).length > 0) {
            const poll = this.props.selectedPoll;
            return (
                <div>
                    <p><span style={{fontWeight: 'bold'}}>Poll title: </span>{poll.title}</p>
                    <p><span style={{fontWeight: 'bold'}}>Poll description: </span>{poll.description}</p>
                    <OpinionForm
                        poll={poll}
                        getOpinion={this.props.getOpinion}
                        showOpinion={this.props.showOpinion}
                        opinion={this.props.opinion}
                        toggleModal={this.toggleModal}
                        deletePoll={this.props.deletePoll}
                        selectedPoll={this.props.selectedPoll}
                    />

                    <Modal isOpen={this.state.openForm} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Update Poll
                        </ModalHeader>
                        <ModalBody>
                            <Form submit={this.props.updatePoll} poll={poll} isUpdate={true} buttonValue='Update poll' toggleModal={this.toggleModal}/>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else if(Object.keys(this.props.data).length === 0){
            return <h3>No Poll found.Create a new poll</h3>
        }
        
        else {
            return <h3>Please select a poll from left menu</h3>;
        }
    }
}

Main.propTypes = {
    selectedPoll: PropTypes.object.isRequired,
    getOpinion: PropTypes.func.isRequired,
    showOpinion: PropTypes.func.isRequired,
    opinion: PropTypes.array.isRequired
};

export default Main;
