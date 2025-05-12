import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

export interface user { 
  id: number,
  name: string,
  email: string
}

function App() {
  const [user,setuser] = useState();
  const [show,setshow] = useState(false)
   
  
useEffect(() => { 

const  list = fetch('http://localhost:3001/user').then(c => {  return c.json(); });
setuser(list);

},[])


function create() { 

}

function delete(id)
{
  console.log(id);
}

function update(id)
{
  console.log(id);
}




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

      <button onClick={create} >Create User</button>
      {user && user.map(c => { 
        <div>
         {c.id}, - , { c.name}, { c.email} - <button onClick={delete(c.id)}>Delete</button>
         <button onClick={update(c.id)}>update</button>
         <button onClick={update(c.id)}>update</button>

      </div>})}

      {show && <div>
        Create New user 
        <input onChange={name => }
      </div>} 
    </div>
  );
}

export default App;
