import React from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import ContactList from "./components/ContactList";

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      contacts:[],
    };
  }

  componentDidMount(){
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        const newContacts = response.data.map(c=> {
          return {
            id: c.id,
            name: c.name,
            email: c.email,
          };
        });

        const newState = Object.assign({}, this.state, {contacts: newContacts});

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}



export default App;
