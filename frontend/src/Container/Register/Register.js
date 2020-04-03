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
                    />
                    <FormElement
                        type="text"
                        value={this.state.username}
                        propertyName="username"
                        name="username"
                        placeholder="Введите логин"
                        onChange={this.inputChangeHandler}
                    />
                    <FormElement
                        type="password"
                        value={this.state.password}
                        name="password"
                        propertyName="password"
                        placeholder="Введите пароль"
                        onChange={this.inputChangeHandler}
                    />
                   <FormGroup>
                       <Button color="success">Register</Button>
                   </FormGroup>
                </Form>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    registerUser : (user)=> dispatch(registerUser(user))
});

export default connect(null, mapDispatchToProps)(Register);