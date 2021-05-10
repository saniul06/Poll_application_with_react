import { Component } from 'react';
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    FormFeedback
} from 'reactstrap';
import shortid from 'shortid';
import PropTypes from 'prop-types';

class form extends Component {
    state = {
        title: '',
        description: '',
        options: [],
        errors: {}
    };

    componentDidMount() {
        const defaultOptions = [
            { id: shortid.generate(), value: '', vote: 0 },
            { id: shortid.generate(), value: '', vote: 0 }
        ];
        this.setState({
            options: defaultOptions
        })
        console.log('title in form :', this.state.title)
        if (this.props.poll && Object.keys(this.props.poll).length > 0) {
            const { title, description, options } = this.props.poll;
            
            this.setState({
                title,
                description,
                options
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addOption = () => {
        const options = this.state.options;
        if (options.length === 5) {
            return alert('you can have add max 5 options');
        }
        const option = {};
        option.id = shortid.generate();
        option.value = '';
        option.vote = 0;
        this.setState({
            options: this.state.options.concat(option)
        });
    };

    deleteOption = (index) => {
        let options = this.state.options;
        if (options.length == 2) {
            return alert('Atleaset 2 options required');
        }
        options.splice(index, 1);
        this.setState({
            options
        });
    };

    handleOptionChange = (e, index) => {
        const options = this.state.options;
        options[index].value = e.target.value;
        this.setState({
            options
        });
    };

    validate = (e) => {
        const errors = {};
        const { title, description, options } = this.state;
        if (!title) {
            errors.title = 'Title is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }

        const optionErrors = [];

        options.forEach((option, index) => {
            if (!option.value) {
                optionErrors[index] = 'Field is required';
            }
        });

        if (optionErrors.length > 0) {
            errors.options = optionErrors;
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    submitPoll = (e) => {
        e.preventDefault();
        console.log('this.state.title: :', this.state.title)
        const { isValid, errors } = this.validate();
        if (isValid) {
            if (this.props.isUpdate) {
                this.props.poll.title = this.state.title;
                this.props.poll.description = this.state.description;
                this.props.poll.options = this.state.options;
                this.props.submit(this.props.poll);
                console.log('submitted');
                this.props.toggleModal()
                alert('Poll updated successfully');
                
            } else {
                this.props.submit({
                    id: shortid.generate(),
                    title: this.state.title,
                    description: this.state.description,
                    options: this.state.options,
                    totalVote: 0,
                    opinions: [],
                    created: new Date()
                });
                this.setState({
                    title: '',
                    description: '',
                    options: [],
                    errors: {}
                });
                e.target.reset();
                console.log('submitted');
                this.props.toggleModal()
                alert('Poll added successfully');
            }
        } else {
            this.setState({ errors });
        }
    };

    render() {
        return (
            <Form onSubmit={this.submitPoll}>
                <FormGroup>
                    <Label id='title'>Title</Label>
                    <Input
                        id='title'
                        onChange={this.handleChange}
                        name='title'
                        value={this.state.title}
                        invalid={this.state.errors.title ? true : false}
                    />
                    <FormFeedback>{this.state.errors.title}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label id='description'>Description</Label>
                    <Input
                        id='description'
                        onChange={this.handleChange}
                        name='description'
                        value={this.state.description}
                        invalid={this.state.errors.description ? true : false}
                    />
                    <FormFeedback>{this.state.errors.description}</FormFeedback>
                </FormGroup>
                <Button onClick={this.addOption}>Add Option</Button>
                <FormGroup>
                    {this.state.options.map((option, index) => (
                        <div className='d-flex my-1' key={option.id}>
                            <Input
                             
                                placeholder='add option here'
                                value={this.state.options[index].value}
                                onChange={(e) =>
                                    this.handleOptionChange(e, index)
                                }
                                invalid={
                                    this.state.errors.options &&
                                        this.state.errors.options[index]
                                        ? true
                                        : false
                                }
                            />
                            <Button
                                color='danger'
                                type='button'
                                onClick={() => this.deleteOption(index)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </FormGroup>
                <Button>{this.props.buttonValue}</Button>
            </Form>
        );
    }
}

form.propTypes = {
    submit: PropTypes.func.isRequired
};

export default form;
