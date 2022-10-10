import logo from './logo.svg';
import './App.css';
import Home from './home';
import { useEffect, useState } from 'react';


function App() {
const [data, setdata] = useState([])
  
  const getData=()=>{
    fetch('employees.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
       
        return response.json();
      })
      .then(function(myJson) {
        
        setdata(myJson.users)
      });
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    
    <div>
      <Home data={data} setdata={setdata}/>
    </div>
  
  );
}

export default App;
