import React from 'react'

const Sidebar = props => {
    const {usersList, connectedUser} = props;
    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <span>Users</span>

                <i className="fa fa-user" aria-hidden="true"></i>
            </div>

            <div className="sidebarBody">
                <div className="usersList">
                    {   usersList ?
                        usersList.map((item, i) => {
                            return (
                                <div className="user" key={i}>
                                    <span>{item.username}</span>
                                    <span className="status" status={item.status} style={{backgroundColor: item.status === "online" ? "green" : "rgb(192, 192, 192)"}}></span>
                                </div>
                            ) 
                        }) : ""
                    }
                </div>


                <div className="notifications">
                    {connectedUser.status === "online" && `User ${connectedUser.username} Connected `}
                    {connectedUser.status === "offline" && `User ${connectedUser.username} Disconnected` }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
