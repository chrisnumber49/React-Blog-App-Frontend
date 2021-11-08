import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import {CookiesProvider} from 'react-cookie';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path = "/" render={(props)=> ( <Login {...props} /> )}/>
            
            <Route exact path = "/posts" render={(props)=> ( <MainPage {...props} /> )}/>
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
