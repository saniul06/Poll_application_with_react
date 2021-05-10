import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './sidebar';
import Main from './main';
import data from '../data/data';

class MyPoll extends Component {
    state = {
        polls: [],
        selectedPoll: {},
        showOpinion: []
    };

    all = 'all';

    componentDidMount() {
        this.setState({
            polls: data,
            selectedPoll: data[0]
        });
    }

    selectPoll = (pollId) => {
        const selectedPoll = this.state.polls.find(
            (poll) => poll.id === pollId
        );
        this.setState({
            selectedPoll,
            showOpinion: [...selectedPoll.opinions]
        });
    };

    getOpinion = (opinion) => {
        const polls = this.state.polls;
        const poll = polls.find((poll) => poll.id === opinion.pollId);
        const option = poll.options.find(
            (opt) => opt.id === opinion.selectedOption
        );
        option.vote++;
        poll.totalVote++;
        poll.opinions.push(opinion);
        this.setState({ polls }, () => this.setState({showOpinion: [...this.state.selectedPoll.opinions]}));
    };

    addNewPoll = (poll) => {
        this.setState({
            polls: this.state.polls.concat(poll)
        });
    };

    showOpinion = (pollId, optionId) => {
        if(!optionId){
            return this.setState({showOpinion: pollId.opinions})
        }
        const polls = this.state.polls;
        let poll = polls.find(poll => poll.id === pollId)
        let opinion = poll.opinions.filter(opinion => opinion.selectedOption === optionId)
        this.setState({ showOpinion: opinion });
    };

    updatePoll = updatedPoll => {
        const polls = this.state.polls;
        const poll = polls.find(poll => poll.id === updatedPoll.id)
        poll.title = updatedPoll.title;
        poll.description = updatedPoll.description;
        poll.options = updatedPoll.options;
        this.setState({ polls})
    }

    deletePoll = id => {
        const polls = this.state.polls.filter(poll => poll.id !== id);
        this.setState({polls, selectedPoll: {}})
    }

    render() {
        return (
            <Container>
                <h3 className='text-center'>Poll application</h3>
                <hr />
                <Row>
                    <Col md={4}>
                        <Sidebar
                            polls={this.state.polls}
                            selectPoll={this.selectPoll}
                            addNewPoll={this.addNewPoll}
                        />
                    </Col>
                    <Col md={8}>
                        <Main
                            selectedPoll={this.state.selectedPoll}
                            getOpinion={this.getOpinion}
                            all={this.all}
                            showOpinion={this.showOpinion}
                            opinion={this.state.showOpinion}
                            updatePoll={this.updatePoll}
                            deletePoll={this.deletePoll}
                            data={this.state.polls}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MyPoll;
