import React from 'react';
import './App.css';
import Header from "./Container/Header/Header";
import {Route, Switch} from "react-router-dom";
import Register from "./Container/Register/Register";
import Login from "./Container/Login/Login";
import {connect} from "react-redux";
import {logoutUser} from "./Store/Actions/actionUsers";
import Chat from "./Container/Chat/Chat";

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Header
            user={this.props.user}
            logout={this.props.logoutUser}
            />
            {this.props.user &&
            <Chat
            user={this.props.user}
            />
            }
            <Switch>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => ({
   user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: ()=> dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
