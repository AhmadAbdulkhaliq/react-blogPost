import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Col, Row, Button} from 'reactstrap';

class MainPage extends Component {

  state = {
    posts:[]
  }

  componentDidMount() {
    fetch('http://localhost:3000/posts')
    .then(res=>res.json())
       .then(allPosts => {
         this.setState({
           posts: allPosts
         })
       })
            }


  render() {
    return (
     <div className="container">
     
       <div className="posts">
        <div className="postDiv">
           {this.state.posts.map((x, i) => (
             <div className="card p-3 color m-3">
            <h1>{x.title}</h1>
            <p>{x.body}</p>
            </div>
              ))
            }
            
        </div>
       </div>
     </div>
       
    );
  }
}

export default MainPage;
