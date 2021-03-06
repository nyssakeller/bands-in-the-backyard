import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { Route } from 'react-router-dom';
import DefaultPage from '../DefaultPage/DefaultPage';
import './App.css';

class App extends Component {  
  render() {
    return (
      <div className="App">
        {
          localStorage.location && 
            <Header/>
        }

        {
          !localStorage.location &&
          <Route exact path='/' component={DefaultPage} />
        }
        
      </div>
    );
  }
}

export default App;


