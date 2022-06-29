import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';

/*
const form = document.querySelector('form')
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const name = document.querySelector('input').value;
  const response = await axios.post('/api/users', { name });
  state.users.push(response.data); 
  renderUsers();
})

*/
class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.destroyUser = this.destroyUser.bind(this);
    this.createAUser = this.createAUser.bind(this);
  }
  destroyUser(user){
    console.log(user)
    if(this.state.userId){
      window.location.hash = '#';
    }

  }
  async componentDidMount(){
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }
  }

  async createAUser(){
    try{
      const user = await createUser({ name: Math.random() });
      const users = [...this.state.users, user];
      this.setState({ users });
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    const { users, userId } = this.state;
    const {destroyUser} = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } userId={ userId } destroy = {destroyUser}/>
          {
            userId ? <User userId={ userId } /> : null
          }
        </main>
        <form>
          <input />
          <button>Add a User</button>
      </form>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App />, root);


