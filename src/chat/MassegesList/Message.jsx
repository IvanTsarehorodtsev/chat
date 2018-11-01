import React from 'react'

const Message = props => {
    const {item, username} = props;

    let ms = new Date(item.date);
    let date = ms.getDate() + '.' + (ms.getMonth() + 1) + '.' +  ms.getFullYear();
    let time = ms.getHours() + ':' + ms.getMinutes()

    return (
        <div className={"messageWrap " + (username === item.user ? "authorMsg" : "simpleMsg")}>
            <div className="message" key={item.date}>
                <p className="author">{item.user}</p>
                <p className="text">{item.text}</p>

                <p className="date">{date + ' ' + time}</p>
            </div>
        </div>
    )
}

export default Message
