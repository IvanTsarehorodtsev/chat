import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "./store/ConfigureStore";

// CUSTOM COMPONENT
import EnterPage from "./EnterPage/EnterPage";
import Chat from "./chat/Chat";

// CSS
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={EnterPage} />
              <Route path="/chat" component={Chat} />
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
