import './App.css';
import React, { useEffect, useState} from 'react';

function App() {

  const [userData, setUser] = useState([{}])
  const [reposData, setRepos] = useState([{}])
  const [gistsData, setGists] = useState([{}])
  const [orgsData, setOrgs] = useState([{}])

  const handleClick2 = () => {
    const text = document.getElementById('input1').value;

    fetch(`/api/getUser?input=${encodeURIComponent(text)}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(`/api/getRepos?input=${encodeURIComponent(text)}`)
      .then((response) => response.json())
      .then((data) => {
        setRepos(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(`/api/getOrganization?input=${encodeURIComponent(text)}`)
      .then((response) => response.json())
      .then((data) => {
        setOrgs(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(`/api/getGists?input=${encodeURIComponent(text)}`)
      .then((response) => response.json())
      .then((data) => {
        setGists(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButton2Click = () => {
    const inputValues = document.getElementById('input2').value;
    const threshold = document.getElementById('input4').value;
    const numbers = inputValues.split(',').map(Number);
    const input3 = document.getElementById('input3');
    if(threshold == '' || numbers == 0){
      input3.value = 'error';
    }
    else{
      const result = countSetsOfThree(numbers, threshold);
      
      input3.value = `Sets of three: ${result}`;
    }
    
  };
  

  return (
    <div className="App">
      <h1>Function counting sets of three</h1>
      <div>
        <input type="text" id="input2"></input><input type="text" id="input4"></input>
        <button id="button2" onClick={handleButton2Click}>Calculate</button>
      </div>
      <p></p>
      <div>
        Result:
        <spacer type="horizontal" width="100" height="100">   </spacer>
        <input type="text" id="input3" readOnly></input>
      </div>

      <p></p>

      <h1>Git Task</h1>
      <div>Github User</div>
      <div>
       <input type="text" id="input1"></input>
       <button id="button1" onClick={handleClick2}>Search User</button>
      </div>

      <h2>User Details</h2>
      <div class="card-container">
        <img class="round" src={userData.avatar_url} alt="user" />
        <h4>{userData.id}</h4>
        <h3>{userData.name}</h3>
        <h6>{userData.location}</h6>
        <div class="skills">
          <h6>Bio</h6>
          <ul>
            <li>{userData.bio}</li>
          </ul>
        </div>
      </div>

      <h2>Repositories</h2>
      <table  class="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>Description</th>
            <th>Tech Stack</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          { reposData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.full_name}</td>
              <td>{item.html_url}</td>
              <td>{item.description}</td>
              <td>{item.language}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Gists</h2>
      <table  class="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>URL</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          { gistsData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.html_url}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <h2>Organizations</h2>
      <table  class="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { orgsData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.login}</td>
              <td>{item.url}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>

  );
}

function countSetsOfThree(numbers, threshold) {
  let count = 0;

  if (numbers.length < 3) {
    return count;
  }

  for (let left = 0; left < numbers.length - 2; left++) {
    let middle = left + 1;

    for (let right = middle + 1; right < numbers.length; right++) {
      const sum = numbers[left] + numbers[middle] + numbers[right];

      if (sum <= threshold) {
        count = count + 1;
      }

    }
  }

  return count;
}

export default App;
