import React, {Component} from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import FormElement from "../../Component/FormElement/FormElement";
import {formAuth} from "../../styles";
import {connect} from "react-redux";
import {loginUser} from "../../Store/Actions/actionUsers";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    loginUserSubmit = e => {
      e.preventDefault();
      this.props.loginUser({...this.state})
    };

    errorHandler = (fieldName) =>{
      return this.props.error && this.props.error[fieldName]
    };

    render() {
        return (
            <div style={formAuth}>
                <Form onSubmit={this.loginUserSubmit}>
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
                        <Button color="success">Login</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);