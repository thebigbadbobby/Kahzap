import React from 'react';
import './App.css';
import './App.sass';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCartPage from './pages/shoppingcart/shoppingcart.js'
import ItemPage from './pages/itemPage/index'
// import ConfirmationPage from './pages/confirmOrderPage/index.js'
import ErrorPage from './pages/404Page/index'
import HomePage from './pages/HomePage/index'
import { HashRouter } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path = '/' exact component={HomePage}/>
        <Route path ='/cart' component={ShoppingCartPage}/>
          {/* <ShoppingCartPage/> */}
        <Route path = '/item/:store/:itemID' component={ItemPage}/>
        <Route path = '/404' component = {ErrorPage}/>
        {/* <Route path ='/confirmation' component = {ConfirmationPage}/> */}
        <Route component={ErrorPage}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
