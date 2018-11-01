import React, { Component } from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import { 
    userConnected, 
    sendUserMessage, 
    showUserlist, 
    userTyping, 
    userDisconnected 
} from "../store/actions/actions";

import MessagesList from "./MassegesList/MessagesList"
import Sidebar from "./Sidebar/Sidebar";

let socket;

class Chat extends Component {
    constructor(props) {
        super(props);

        const username = this.props.chat.username;

        socket = io.connect("http://localhost:8000");
        socket.emit('user connected', username);

        socket.on('chat message', (msg) => {
            this.props.sendUserMessage(msg);
        });

        socket.on("user typing" , (user) => {
            if (user !== username) {
                this.props.userTyping(user);
            }

            setTimeout(() => {this.props.userTyping('');}, 2000);
        });

        socket.on('user connected', (usersList) => {
            let userConnect = usersList[usersList.length - 1].username;
            this.props.showUserlist(usersList);

            if (userConnect !== username) {
                this.props.userConnected(userConnect, "online");
            }

            setTimeout(() => {this.props.userConnected("", "");}, 10000);
        });

        socket.on('user disconnected', id => {
            this.props.userDisconnected(id);

            let discUserName = this.props.chat.usersList.filter(item => {return item.socket === id});
            this.props.userConnected(discUserName[0].username, "offline");
            setTimeout(() => {this.props.userConnected("", "");}, 10000);
        });
    }

    onSendMessageHandler = () => {
        let text = this.refs.message.value;
        let username = this.props.chat.username;
        
        if (text !== '') {
            let msg = {
                text: text,
                date: Date.now(),
                user: username !== '' ? username : "user"
            }
    
            socket.emit('chat message', msg);
            this.refs.message.value = '';
        } else {
            return false;
        }
    }

    onUserTypingHandler = () => {
        let user = this.props.chat.username;
        socket.emit('user typing', user);
    }

    render() {
        const {connectedUser, messages, usersList, username, userTyping} = this.props.chat;
        return (
            <div className="chatPage">
                <div className="leftColumn">
                    <Sidebar 
                        connectedUser={connectedUser} 
                        usersList={usersList}
                    />
                </div>

                <div className="rightColumn">
                    <header>
                        <h1>Friends chat</h1>
                    </header>

                    <div className="msgArea">
                        <div className="msgWrapper">
                            <MessagesList messages={messages} username={username} typing={userTyping}/>
                        </div>

                        <div className="msgInput">
                            <textarea name="message" placeholder="Write a message..." ref="message" onKeyPress={this.onUserTypingHandler}></textarea>

                            <button className="sendMsgBtn" onClick={this.onSendMessageHandler}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chat: state.chat
    };
};

const mapDispatchToProps = dispatch => {
    return {
      userConnected: (name, status) => dispatch(userConnected(name, status)),
      sendUserMessage: msg => dispatch(sendUserMessage(msg)),
      showUserlist: userlist => dispatch(showUserlist(userlist)),
      userTyping: user => dispatch(userTyping(user)),
      userDisconnected: id => dispatch(userDisconnected(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);