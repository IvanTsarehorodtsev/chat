import React from 'react';
import Message from "./Message";

const MessagesList = props => {
    const {messages, username, typing} = props;
    return (
        <div className="msgsList">
            {messages ? 
                messages.map((item, i) => {
                    return (
                        <Message item={item} key={i} username={username}/>
                    )
                }) : "No messages yet"
            }
            
            <div className="userTypingLine"> 
                { typing.typing && 
                    <span className="userTyping">User {typing.user} is tiping...</span>
                }
            </div>
        </div>
    )
}

export default MessagesList;
