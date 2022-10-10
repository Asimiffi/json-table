import React from 'react'
import { useState,useEffect } from 'react';
import "./App.css"
const home = ({data,setdata}) => {

    

const [userfilter,setuserfilter] = useState([]);
const [seniorfilter,setseniorfilter] = useState([]);
const [wfmfilter,setwfmfilter] = useState([]);
const [modal,setmodal] = useState(false);
const [firstName,setfirstName] = useState('');
const [lastName,setlastName] = useState('')
const [role,setrole] = useState('')
const [searchterm,setsearchterm]=useState('')
let count =0;
 
const adddata = () =>{

if(role !=="" && firstName!=="" && lastName !== ""  )  {  
setdata([...data,{
    role:role,
    firstName:firstName,
    lastName:lastName  
}])

setmodal(false)
}

}



const  openmodal = ()=>{
    console.log(modal)
    setmodal(true)
}



useEffect(() => {
    setseniorfilter(data.filter(user=>user.role==2))
    setwfmfilter(data.filter(wfm=>wfm.role==3))
    setuserfilter(data.filter(user=>user.role==1))
    console.log("check")
},[data])


const handlelastname = (e) =>{
 setlastName(e.target.value)

}


const handlerole = (e) =>{
    setrole(e.target.value)
   console.log(e.target.value);
   }



const seniordelete = (name,index)=>{
   
    setseniorfilter(seniorfilter.filter((sen,id)=>id!=index))
    
    setdata(data.filter((user)=>user.firstName!=name))
}


const userdelete = (name,index)=>{
    setuserfilter(userfilter.filter((us,id)=>id!==index))
    setdata(data.filter((user)=>user.firstName!=name))
 }


 const wfmdelete = (name,index)=>{
    setwfmfilter(wfmfilter.filter((wfm,id)=>id!==index))  
    setdata(data.filter((user)=>user.firstName!=name))
 }


 return (
    <div> 

<nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid w-50">
            <label for="search-user" className="col-sm-2 col-form-label">Search for employee:</label>
            <div className="col-sm-10">
                <input type="text" onChange={e=>setsearchterm(e.target.value)} className="form-control" id="search-user" placeholder="Enter a name"/>
            </div>
        </div>
    </nav>
    
    <div className="container pt-5">
        <h2>Users</h2>
        <table className="table mb-5 align-middle" id="users">
            <thead>
                <tr>
                    <th style={{width:"20%"}} scope="col">#</th>
                    <th style={{width:"20%"}} scope="col">First</th>
                    <th style={{width:"20%"}} scope="col">Last</th>
                    <th style={{width:"20%"}} scope="col">Role</th>
                    <th style={{width:"20%"}} scope="col"></th>
                </tr>
            </thead>
            <tbody>
                
                    
                    {userfilter.
                    filter(
                        (user)=>
                        user.firstName.toLowerCase().includes(searchterm)||
                        user.lastName.toLowerCase().includes(searchterm)
                        )
                    .map((datas,index)=>(
                      <tr>
                      <th scope="row">{index+1}</th>
                      <td>{datas.firstName}</td>
                    <td>{datas.lastName}</td>
                    <td>User</td>
                    <td><button type="button" onClick={()=>userdelete(datas.firstName,index)} className="btn btn-outline-danger btn-sm">Delete</button></td>
                </tr>
                    ))}
                    
            </tbody>
        </table>
        <h2>Senior Users</h2>
        <table className="table mb-5 align-middle" id="senior-users">
            <thead>
                <tr>
                    <th style={{width:"20%"}} scope="col">#</th>
                    <th style={{width:"20%"}} scope="col">First</th>
                    <th style={{width:"20%"}} scope="col">Last</th>
                    <th style={{width:"20%"}} scope="col">Role</th>
                    <th style={{width:"20%"}} scope="col"></th>
                </tr>
            </thead>
            <tbody> {seniorfilter
            .
            filter(
                (senior)=>
                senior.firstName.toLowerCase().includes(searchterm)||
                senior.lastName.toLowerCase().includes(searchterm)
                )
            .map((datas,index)=>(
                      <tr>
                      <th scope="row">{index+1}</th>
                      <td>{datas.firstName}</td>
                    <td>{datas.lastName}</td>
                    <td>Senior User</td>
                    <td><button onClick={()=>seniordelete(datas.firstName,index)} type="button" className="btn btn-outline-danger btn-sm">Delete</button></td>
                </tr>
                    ))}
            </tbody>
        </table>
        <h2>WFM</h2>
        <table className="table mb-5 align-middle" id="wfm-users">
            <thead>
                <tr>
                    <th style={{width:"20%"}} scope="col">#</th>
                    <th style={{width:"20%"}} scope="col">First</th>
                    <th style={{width:"20%"}} scope="col">Last</th>
                    <th style={{width:"20%"}} scope="col">Role</th>
                    <th style={{width:"20%"}} scope="col"></th>
                </tr>
            </thead>
            <tbody> {wfmfilter
            .
            filter(
                (user)=>
                user.firstName.toLowerCase().includes(searchterm)||
                user.lastName.toLowerCase().includes(searchterm)
                )
            .map((datas,index)=>(
                      <tr>
                      <th scope="row">{index+1}</th>
                      <td>{datas.firstName}</td>
                    <td>{datas.lastName}</td>
                    <td>WFM Professional</td>
                    <td><button type="button" onClick={()=>wfmdelete(datas.firstName,index)} className="btn btn-outline-danger btn-sm">Delete</button></td>
                </tr>
                    ))}
            </tbody>
        </table>
        <button type="submit" onClick={openmodal} className="btn btn-primary"  data-toggle="modal" data-bs-toggle="modal" data-target="#add-user-modal">
            Add User
        </button>
    </div>

{
modal &&
    <form class="was-validated">
    <div className="modal fade"  data-backdrop="" id="add-user-modal" tabindex="-1" aria-labelledby="add-user-modal-label" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="add-user-modal-label">Add a new user</h5>
                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label for="first-name-input needsvalidation">First Name</label>
                        <input type="text" required  onChange={(e)=>setfirstName(e.target.value)} className="form-control" id="first-name-input" placeholder="Mark"/>
                    </div>
                    <div className="mb-3">
                        <label for="last-name-input">Last Name</label>
                        <input type="text" required onChange={handlelastname} className="form-control" id="last-name-input" placeholder="Otto"/>
                    </div>
                    <div className="mb-3">
                        <label for="role-select">Role</label>
                        <select className="form-select" required  onChange={handlerole}  id="role-select" aria-label="Role select">
                            <option selected value="" >Select a role</option>
                            <option value="1">User</option>
                            <option value="2">Senior User</option>
                            <option value="3">WFM</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button className="btn btn-primary" data-dismiss={modal ? "hi" : "modal"} onClick={adddata}>Save changes</button>
                </div>

               
            </div>
        </div>
    </div>
    </form>
    }






    </div>
  )
}

export default home