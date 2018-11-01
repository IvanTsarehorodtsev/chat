import {
    REGISTER_USER_NAME,
    USER_CONNECTED,
    SEND_MASSEGE,
    SHOW_USERLIST,
    USER_TYPING,
    USER_DISCONNECTED
} from "../actions/actionConstants";

const init = () => {
    try {
        const friendChatState = localStorage.getItem("friendChat");

        if(friendChatState === null) {
          return false;
        }

        let username = JSON.parse(friendChatState);
        return username;

    } catch (err) {
        return false;
    }
};

let initState = init();

const initialState = {
    username: initState.username ? initState.username : '',
    connectedUser: {},
    messages: initState.messages? initState.messages : [],
    usersList: [],
    userTyping: {
        typing: false,
        user: ''
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_NAME:
            let username = action.payload;
            
            let startStorage = {
                username: action.payload
            };

            try {
                const serialized = JSON.stringify(startStorage);
                localStorage.setItem("friendChat", serialized)
            } catch (err) {
                console.log(err);
            }

            return {
                ...state,
                username: username
            };

        case USER_CONNECTED:
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    username: action.payload.username,
                    status: action.payload.status
                }
            }

        case SEND_MASSEGE:
            let newMsgsList = Object.assign([], state.messages);
            let lastMsgDate = action.payload.date;
            newMsgsList.push(action.payload);

            let filteredMsgs =  newMsgsList.filter(item => {
                return item.date >= (lastMsgDate - 600000)
            });

            let newStorage = {
                username: state.username,
                messages: filteredMsgs
            };

            try {
                const serialized = JSON.stringify(newStorage);
                localStorage.setItem("friendChat", serialized)
            } catch (err) {
                console.log(err);
            }

            return {
                ...state,
                messages: newMsgsList
            }

        case SHOW_USERLIST:
            return {
                ...state,
                usersList: action.payload
            } 

        case USER_TYPING:
            if (action.payload) {
                return {
                    ...state,
                    userTyping: {
                        typing: true,
                        user: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    userTyping: {
                        typing: false,
                        user: ''
                    }
                }
            }
        
        case USER_DISCONNECTED:
            let oldUsersList = Object.assign([], state.usersList); 
            let newUsersList = oldUsersList.map(item => {
                if(item.socket === action.payload) {
                    item.status = "offline";
                }

                return item;
            });

            return {
                ...state,
                usersList: newUsersList
            }

        
        default:
            return state;
    }
}