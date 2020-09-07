import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

const user ={
    firstName: 'Felipe Luís',
    lastName:  'Pinheiro',
};

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isToggleOn: true };
  
      // Aqui utilizamos o `bind` para que o `this` funcione dentro da nossa callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number, index) =>
      <li key={index}>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const numbers = [1, 2, 3, 4, 5,5];
  function Blog(props) {
    const sidebar = (
      <ul>
        {props.posts.map((post) =>
          <li key={post.id} >
            {post.title}
          </li>
        )}
      </ul>
    );
    const content = props.posts.map((post) =>
      <div key={post.id} id={'post'+post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }
  
  const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];

  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
     this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Um nome foi enviado: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Nome:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Enviar" />
        </form>
      );
    }
  }

  class NumberForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
     this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Um nome foi enviado: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Número:
            <input type="number" 
            value={this.state.value}
            onChange={this.handleChange} 
            max='10'
            maxLength='10'
            placeholder='Entre com um numero qualquer.'/>
          </label>
          <input type="submit" value="Enviar" />
        </form>
      );
    }
  }

  class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Uma dissertação foi enviada: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Dissertação:
            <textarea 
            value={this.state.value} 
            onChange={this.handleChange} 
            rows="10" cols="30" 
            placeholder='Por favor, escreva uma dissertação sobre o seu elemento DOM favorito.'
            maxLength='50'
            />
          </label>
          <input type="submit" value="Enviar" />
        </form>
      );
    }
  }
  class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'laranja'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Seu sabor favorito é: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Escolha seu sabor favorito:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="laranja">Laranja</option>
              <option value="limao">Limão</option>
              <option value="coco">Coco</option>
              <option value="manga">Manga</option>
            </select>
          </label>
          <input type="submit" value="Enviar" />
        </form>
      );
    }
  }
  class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2,
        nome: '',
        flavor: 'coco'
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      console.log(name + ' ' + value );
    }
  
    render() {
      return (
        <form>
          <label>
            Estão indo:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Número de convidados:
            <input
              name="numberOfGuests"
              type="number"
              min='0'
              max='10'
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
              nome:
              <input name='nome' type='text' maxLength='50' value={this.state.nome} onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Escolha seu sabor favorito:
            <select name='flavor' value={this.state.flavor} onChange={this.handleInputChange}>
              <option value="laranja">Laranja</option>
              <option value="limao">Limão</option>
              <option value="coco">Coco</option>
              <option value="manga">Manga</option>
            </select>
          </label>
        </form>
      );
    }
  }

  function BoilingVeredict(props){
      if(Number.isNaN(props.celsius)) return <p></p>;
      if(props.celsius <= -273) return <p>zero absoluto</p>
      if(props.celsius >= 100) return <p>A água ferveria</p>;
      return <p>A água não ferveria</p>;
  }

  class Calculator extends React.Component{
      constructor(props){
          super(props);
          this.handleChange = this.handleChange.bind(this);
          this.state = {
              temperature: '',
              temperatureF: '',
        };
      }
      handleChange(event){
          this.setState({
              temperature: event.target.value,
              temperatureF: this.calculaterF(event.target.value)
          });
      }

      calculaterF(temperature){
        if(Number.isNaN(temperature)) return null;
          return 9./5.* temperature + 32;
      }
      render(){
          const temperature = this.state.temperature;
          const temperatureF = this.state.temperatureF;
          return(
              <fieldset>
                  <legend>Informe a temperature em</legend>
                  <label>Celsius:
                      <input value={temperature} type='number' onChange={this.handleChange} />
                  </label>
                  <label>
                      Fareheint:
                      <input value={temperatureF} type='number' onChange={this.handleChange} disabled />
                  </label>
                      <BoilingVeredict celsius={parseFloat(temperature)}/>
              </fieldset>
          );
      }
  }
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:props.name,
        };
    }
    render(){
        return (
            <div className="main">
                <h1>Hello, World!</h1> 
                <Welcome name={this.state.name} />
                <p>{formatName(user)}</p>
                <div>
                    <Toggle />
                </div>
                <div>
                    <LoginControl />
                </div>
                <div>
                    <NumberList numbers={numbers} />
                </div>
                <div>
                    <Blog posts={posts} />
                </div>
                <div>
                    <NameForm />
                </div>
                <div>
                    <EssayForm/>
                </div>
                <div>
                    <NumberForm/>
                </div>
                <div>
                    <FlavorForm/>
                </div>
                <div>
                    <Reservation/>
                </div>
                <div>
                    <Calculator/>
                </div>
            </div>
        );    
    }
}


function Welcome(props){
    return (<h3>Welcome, {props.name}</h3>);
}
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
        };
    }
    componentDidMount(){
        this.timerId = setInterval(
            ()=> this.tick(),1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    tick(){
        this.setState({
            date: new Date()
        });
    }
    render(){
        return (
            <div>
                <p>it is {this.state.date.toLocaleDateString()} - {this.state.date.toLocaleTimeString()}.</p>
            </div>
        );
    }
}

function App(){
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

function LogingButton(props){
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props){
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { 
            isLoggedIn: false,
        };
    }
    handleLoginClick(){
        this.setState({isLoggedIn: true});
    }
    handleLogoutClick(){
        this.setState({isLoggedIn: false});
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        let button ;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        }else{
            button = <LogingButton onClick={this.handleLoginClick} />
        }
        return button;
    }

}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
function GuestGreeting(props) {
return <h1>Please sign up.</h1>;
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return UserGreeting(props);
    }
    return GuestGreeting(props);
}
ReactDOM.render(
    <Greeting/>,
    document.getElementById('header')
);


ReactDOM.render(
    <Main name='Selles'/>,
    document.getElementById('root')
);
ReactDOM.render(
    <App />,
    document.getElementById('footer')
);
