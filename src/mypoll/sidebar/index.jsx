import { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PollList from './list';
import Form from '../form';

class Sidebar extends Component {
    state = {
        searchTerm: ''
    };

    handleSearch = (searchTerm) => {
        this.setState({
            searchTerm,
            openForm: false
        });
    };

    toggleModal = () => {
        this.setState({
            openForm: !this.state.openForm
        });
    };

    render() {
        const polls = this.props.polls.filter((poll) =>
            poll.title
                .toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
        );
        return (
            <div>
                <PollList polls={polls} selectPoll={this.props.selectPoll} searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} toggleModal={this.toggleModal} />

                <Modal isOpen={this.state.openForm} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Add new poll
                    </ModalHeader>
                    <ModalBody>
                        <Form submit={this.props.addNewPoll} buttonValue='Add poll' toggleModal={this.toggleModal} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

Sidebar.propTypes = {
    polls: PropTypes.array.isRequired,
    selectPoll: PropTypes.func.isRequired
};

export default Sidebar;
