import { Component } from 'react';
import { ListGroup, ListGroupItem, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';

class PollList extends Component {
    render() {
        return (
            <ListGroup className='p-2' style={{ background: '#ddd' }}>
                <Button className='my-2 d-block bg-primary' onClick={this.props.toggleModal}>Create new poll</Button>
                <Input
                    className='my-2'
                    value={this.props.searchTerm}
                    placeholder='search poll ...'
                    onChange={(event) => this.props.handleSearch(event.target.value)}
                />
                <h3 className='my-3'>List of polls</h3>
                {this.props.polls.map((poll) => (
                    <ListGroupItem
                        className='p-3'
                        key={poll.id}
                        onClick={() => this.props.selectPoll(poll.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {poll.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

PollList.propTypes = {
    polls: PropTypes.array.isRequired,
    selectPoll: PropTypes.func.isRequired
};

export default PollList;
