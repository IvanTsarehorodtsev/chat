import {
    REGISTER_USER_NAME,
    USER_CONNECTED,
    SEND_MASSEGE,
    SHOW_USERLIST,
    USER_TYPING,
    USER_DISCONNECTED
} from "./actionConstants";

export const registerUserName = (username) => {
    return {
        type: REGISTER_USER_NAME,
        payload: username
    }
}

export const userConnected = (username, status) => {
    return {
        type: USER_CONNECTED,
        payload: {
            username: username,
            status: status
        }
    }
}

export const sendUserMessage = (message) => {
    return {
        type: SEND_MASSEGE,
        payload: message
    }
}

export const showUserlist = (userlist) => {
    return {
        type: SHOW_USERLIST,
        payload: userlist
    }
}


export const userTyping = (user) => {
    return {
        type: USER_TYPING,
        payload: user
    }
}

export const userDisconnected = (id) => {
    return {
        type: USER_DISCONNECTED,
        payload: id
    }
}