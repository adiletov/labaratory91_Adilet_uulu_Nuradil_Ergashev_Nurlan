import React, {Component} from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import FormElement from "../../Component/FormElement/FormElement";
import {formAuth} from "../../styles";
import {connect} from "react-redux";
import {registerUser} from "../../Store/Actions/actionUsers";

class Register extends Component {
    state = {
        fullName: '',
        username: '',
        password: ''
    };

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    registerNewUser = (e)=>{
        e.preventDefault();
        this.props.registerUser({...this.state})
    };

    errorHandler = (fieldName) =>{
        return this.props.error && this.props.error[fieldName]
    };

    render() {
        return (
            <div style={formAuth}>
                <Form onSubmit={this.registerNewUser}>
                    <FormElement
                        type="text"
                        value={this.state.fullName}
                        propertyName="fullName"
                        name="fullName"
                        placeholder="Введите имя"
                        onChange={this.inputChangeHandler}
                        error={this.errorHandler('fullName')}
                    />
                    <FormElement
                        type="text"
                        value={this.state.username}
                        propertyName="username"
                        name="username"
                        placeholder="Введите логин"
                        onChange={this.inputChangeHandler}
                        error={this.errorHandler('username')}
                    />
                    <FormElement
                        type="password"
                        value={this.state.password}
                        name="password"
                        propertyName="password"
                        placeholder="Введите пароль"
                        onChange={this.inputChangeHandler}
                        error={this.errorHandler('password')}
                    />
                   <FormGroup>
                       <Button color="success">Register</Button>
                   </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   error: state.users.registerError
});
const mapDispatchToProps = dispatch => ({
    registerUser : (user)=> dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);