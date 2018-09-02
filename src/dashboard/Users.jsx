

  import React, { Component } from 'react';
  import '../App.css';
  import axios from "axios";
  
  
  class Categories extends Component {
    state = {
      users: [],
      user: {
          name:'',
          email:''
      },
      edit:false
    }
  
    //retrive input value to user object
    bindInputToState = e => {
        this.setState({
          user: {
            ...this.state.user,
          id:this.findId(),
          [e.target.name]: e.target.value
        }
      })
    }
   
  //find ID to use when we user an item
    findId(){
         let usersLength=this.state.users.length;
         let id=usersLength+1;
         return id
    }  
  
    //Get user
    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then(res=>res.json())
           .then(allusers => {
             this.setState({
               users: allusers
             })
           })
    }
  
    //Delete user
    deleteuser = (id) => {
        axios.delete('http://localhost:3000/users/' + id)
        .then(res => {
          this.setState({
            users: this.state.users.filter(user => user.id !== id)
          })
        })
    }
    
    adduser(e){
         e.preventDefault();
  
         axios.post('http://localhost:3000/users',this.state.user)
         .then(res=>{
           this.setState({
              users:[...this.state.users,this.state.user],
              user:{
              name:'',
              email:''
              }
           })
           })
    }
  
    //update user
  
    updateuser=(e)=> {
     e.preventDefault();
    //     axios.put('http://localhost:3000/users/' + this.state.post.id,
    //        this.state.user)
    //        .then(res => {
    //         this.setState({
    //         users: this.state.users.map(x => {
    //         if (x.id === res.data.id) {
    //              return res.data;
    //              }
    //              return x;
    //            }),
    //          user: {title: '', body: ''}
    //          ,edit:false
    //          })
    //        })
    console.log('sory')
     }
  
    
    
  
    
    render() {
      
        let savebtn;
        let cancelbtn;
        let userbtn;
        if (this.state.edit) {
           savebtn= <button type="submit" onClick={this.updateuser} className="btn btn-warning">save</button>;
           cancelbtn=<button type="submit" onClick={() => this.setState({user:{name:'',email:''}
           ,edit:false})} className="btn btn-secondary">cancel</button>
        }
        else{
           userbtn=<button type="submit" onClick={this.adduser.bind(this)} className="btn btn-info">Add User</button>
        }
      
      return (
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-12">
  
              <form>
                  <div className="form-group">
                     <label>Name</label>
                     <input type="text" className="form-control" name="name" 
                     value={this.state.user.name} 
                     onChange={this.bindInputToState} />
                  </div>

                  <div className="form-group">
                     <label>Email</label>
                     <input type="text" className="form-control" name="email" 
                     value={this.state.user.email} 
                     onChange={this.bindInputToState} />
                  </div>
  

                      {savebtn}
                      {cancelbtn}
                      {userbtn}
             </form>
            </div>
  
            <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
  
            <tbody>
               {this.state.users.map((x, i) => (
                  <tr key={i} id={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                     <td>
  
                       <button onClick={() => this.setState({user: x ,edit:true})} className="btn btn-warning">
                       Edit
                       </button>
  
                       <button onClick={() => this.deleteuser(x.id)} className="btn btn-danger">
                       Delete
                       </button>
  
                     </td>
                  </tr>
                ))
              }
            </tbody>
        </table>
     </div>
   </div>
          
      );
    }
  }
  export default Categories;
  
