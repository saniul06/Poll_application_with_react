import { Component, useState } from 'react';
import {
    Form,
    FormGroup,
    Label,
    CustomInput,
    Input,
    FormFeedback,
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup
} from 'reactstrap';
import shortid from 'shortid';
import PropTypes from 'prop-types';

class OpinionForm extends Component {
    state = {
        name: '',
        selectedOption: '',
        errors: '',
        opinions: [],
        bg: 'all',
        pollId: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        this.setState({ errors: '' });
    }

    componentWillReceiveProps(props){
        this.setState({pollId: props.poll.id})
        if(props.selectedPoll.id !== this.state.pollId){
            this.setState({
                bg: 'all'
            })
        }
        console.log(props.selectedPoll)
    }

    validate = () => {
        const errors = {};
        if (!this.state.name) {
            errors.name = 'Please Provide your name';
        }
        if (!this.state.selectedOption) {
            errors.selectedOption = 'Please select one item';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    submitOpinion = (e) => {
        e.preventDefault();
        const { isValid, errors } = this.validate();
        if (isValid) {
            const opinion = {};
            opinion.id = shortid.generate();
            opinion.pollId = this.props.poll.id;
            opinion.name = this.state.name;
            opinion.selectedOption = this.state.selectedOption;
            this.props.getOpinion(opinion);
            this.setState({
                name: '',
                selectedOption: '',
                errors: '',
                bg: 'all'
            });
        } else {
            this.setState({
                errors,
                name: '',
                selectedOption: '',
                isChecked: false
            });
        }
    };

    getSingleOpinion = (id) => {
        this.setState({
            bg: id
        });
        this.props.showOpinion(this.props.poll.id, id);
    };

    getAllOpinios = () => {
        this.setState({
            bg: 'all'
        });
        this.props.showOpinion(this.props.poll);
    };

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.submitOpinion}
                    style={{ padding: '10px', borderRadius: '10px' }}
                >
                    <div className='d-flex mb-2'>
                        <h5>Options</h5>
                        <Button
                            onClick={this.props.toggleModal}
                            className='ml-auto'
                            color='warning'
                        >
                            Edit poll
                        </Button>
                        <Button
                            onClick={() =>
                                this.props.deletePoll(
                                    this.props.selectedPoll.id
                                )
                            }
                            color='danger'
                        >
                            Delete poll
                        </Button>
                    </div>

                    {this.props.poll.options.map((option) => (
                        <FormGroup key={option.id}>
                            <Label
                                className='d-flex'
                                style={{
                                    padding: '5px',
                                    background: '#fff',
                                    borderRadius: '10px'
                                }}
                            >
                                <CustomInput
                                    id={option.id}
                                    type='radio'
                                    name='selectedOption'
                                    value={option.id}
                                    onClick={this.handleChange}
                                    invalid={
                                        this.state.errors.selectedOption
                                            ? true
                                            : false
                                    }
                                />
                                {option.value}
                                <span
                                    style={{
                                        padding: '5px 20px',
                                        background: 'green',
                                        color: 'white',
                                        borderRadius: '5px'
                                    }}
                                    className='ml-auto'
                                >
                                    {option.vote}
                                </span>
                                <span
                                    style={{
                                        padding: '5px 20px',
                                        background: 'orange',
                                        color: 'black',
                                        borderRadius: '5px'
                                    }}
                                >
                                    {this.props.poll.totalVote
                                        ? (
                                              (option.vote * 100) /
                                              this.props.poll.totalVote
                                          ).toFixed(2)
                                        : 0}{' '}
                                    %
                                </span>
                            </Label>
                        </FormGroup>
                    ))}
                    <FormGroup>
                        <Label>Enter your Name</Label>
                        <Input
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder='enter your name'
                            invalid={this.state.errors.name ? true : false}
                        />
                        {this.state.errors.name && (
                            <FormFeedback>
                                {this.state.errors.name}
                            </FormFeedback>
                        )}
                    </FormGroup>
                    <button className='btn btn-info'>Submit</button>
                </Form>
                <div>
                    <h3 className='my-2'>See who votes for each opinion</h3>
                    {/* <UncontrolledButtonDropdown>
                        <DropdownToggle caret>Select option</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem
                                    key={this.props.poll.id}
                                    onClick={() =>
                                        this.props.showOpinion(
                                            this.props.poll
                                        )
                                    }
                                >
                                    All
                                </DropdownItem>
                            {this.props.poll.options.map((option) => (
                                <DropdownItem
                                    key={option.id}
                                    onClick={(e) =>
                                        this.props.showOpinion(e,
                                            this.props.poll.id,
                                            option.id
                                        )
                                    }
                                >
                                    {option.value}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown> */}
                    <ButtonGroup>
                        <Button
                            key={this.props.poll.id}
                            onClick={this.getAllOpinios}
                            className={
                                this.state.bg === 'all' ? 'bg-success' : ''
                            }
                        >
                            All
                        </Button>
                        {this.props.poll.options.map((option) => (
                            <Button
                                key={option.id}
                                // className={this.props.opinion.length > 0 && this.props.opinion[0].selectedOption === option.id ? 'bg-success' : ''}
                                className={
                                    this.state.bg === option.id
                                        ? 'bg-success'
                                        : ''
                                }
                                onClick={() => this.getSingleOpinion(option.id)}
                            >
                                {option.value}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <p className='mt-3'>Name of the voters</p>
                    <ListGroup>
                        {this.props.opinion && this.props.opinion.length > 0
                            ? this.props.opinion.map((opinion) => (
                                  <ListGroupItem key={opinion.id}>
                                      {opinion.name}
                                  </ListGroupItem>
                              ))
                            : 'There is no vote'}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

OpinionForm.propTypes = {
    poll: PropTypes.object.isRequired,
    getOpinion: PropTypes.func.isRequired
};

export default OpinionForm;
