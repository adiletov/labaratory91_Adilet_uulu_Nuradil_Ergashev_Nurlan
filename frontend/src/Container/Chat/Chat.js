import React, {Component} from 'react';
import {connectChat} from "../../Store/Actions/actionChat";
import {Alert, Input, InputGroup, InputGroupAddon} from "reactstrap";


class Chat extends Component {
    state = {
        onlineUser: [],
        message: '',
        messages: [],
        loginError: null
    };

    componentDidMount() {
        this.websocket = connectChat(this.props.user.token);
        this.websocket.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);
            switch (decodedMessage.type) {
                case 'ONLINE_USERS':
                    return this.setState({onlineUser: decodedMessage.user});
                case 'NEW_MESSAGES':
                    return this.setState({
                        messages: [
                            decodedMessage.message,
                            ...this.state.messages
                        ]
                    });
                case 'ALL_MESSAGES':
                    return this.setState({messages: decodedMessage.messages});
                default:
                    return undefined
            }
        }
    }



    inputChangeHandler = e => {
        this.setState({message: e.target.value})
    };

    sendMessage = () => {
        this.websocket.send(JSON.stringify({
            type: 'CREATE_MESSAGE',
            message: this.state.message
        }));
    };


    deleteMessage = (id) => {
        this.websocket.send(JSON.stringify({
            type: 'DELETE_MESSAGE',
            id
        }));
    };

    render() {
        return (
            <div style={blockChat}>
                <div style={onlineStyle}>
                    {this.state.onlineUser.map(user =>
                        <p key={user.key}>{user.username}</p>
                    )}
                </div>
                <div style={blockMessage}>
                    <InputGroup>
                        <Input
                            value={this.state.message}
                            onChange={this.inputChangeHandler}
                        />
                        <InputGroupAddon addonType="append">
                            <button onClick={this.sendMessage}>Send</button>
                        </InputGroupAddon>
                    </InputGroup>
                    <div>
                        {this.state.messages.map(message =>
                            <Alert color="success" key={message._id}>
                                {this.props.user.role === 'moderator' &&
                                <button onClick={() => this.deleteMessage(message._id)}>&#10008;</button>}
                                {message.username ? <b>{message.username} - </b> : <b>{message.userId.username} - </b>}
                                {message.message} <small style={{right: '80%'}}>{message.datetime}</small>
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const blockChat = {
    display: 'flex',
};
const onlineStyle = {
    padding: '20px',
    border: '1px solid black',
    width: '20%'
};
const blockMessage = {
    width: '50%',
    border: '1px solid black',
    overflow: 'scroll'

};





export default Chat;