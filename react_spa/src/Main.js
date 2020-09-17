import React, { Component } from "react";

import { 
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom"; 
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Form from "./Form";
import FormApp from "./FormApp";
import Calculator from "./Temperature";

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
            <h1>Simple SPA</h1>
            <ul className="header">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/stuff">Stuff</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink exact to="/form">Form</NavLink></li>
                <li><NavLink to="/formApp">Form App</NavLink></li>
                <li><NavLink to="/Calculator">Calculater</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/stuff" component={Stuff}/>
                <Route path="/contact" component={Contact}/>                
                <Route exact path="/form" component={Form}/>                
                <Route path="/formApp" component={FormApp}/>
                <Route path="/calculator" component={Calculator}/>
            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;