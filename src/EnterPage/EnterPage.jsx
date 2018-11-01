import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUserName } from "../store/actions/actions";

class EnterPage extends Component {
    onEnterUserNameHandler = (e) => {
        e.preventDefault();

        let name = this.refs.name.value;
        
        if (name !== "") {
            this.props.registerUserName(name);
            this.props.history.push("/chat");
        } else {
            return false;
        }
        
    }

  render() {
    return (
      <div className="enterPage">
        <div className="startWrap">
          <h1>Friends chat</h1>

          <input
            type="text"
            placeholder="Please, enter your Name"
            name="name"
            ref="name"
          />

            <button className="loginBtn" onClick={this.onEnterUserNameHandler}>Enter</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.chat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUserName: username => dispatch(registerUserName(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterPage);
