import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Link,
 useRouteMatch,
} from "react-router-dom";

class NewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      shop_name: '',
      status: '',
      errors: [],
    }

    this.handleSaveTodo = this.handleSaveTodo.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.TodoId = this.props.match.params.id
  }

  handleSaveTodo (event) {
    event.preventDefault()
    const Todo = {

     name: this.state.name,
     shop_name: this.state.shop_name,
     status: this.state.status,
     date_val: new Date(),
    }
    let urls = '';

    if(!this.TodoId) {//save
       urls = 'http://localhost:8000/api/todos/';

       axios.post(urls, Todo)
        .then(response => {
         this.props.history.push('/todos');
      });
    }
    else {//update
       urls = 'http://localhost:8000/api/todos/'+this.TodoId+'/';

       axios.put(urls, Todo)
        .then(response => {
        this.props.history.push('/todos');
      });        
    }
      
  }

  componentDidMount(){
  if(this.TodoId) {
     axios.get('http://localhost:8000/api/todos/'+ this.TodoId)
     .then(response => {
         this.setState({   

             name: response.data.name,
             shop_name: response.data.shop_name,
             status: response.data.status,
         });

     });
 }
   
 }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
   
    return (

  <div className="container">
            <div>
    <Link to='./'>
    List todo
    </Link>
		</div>
  <form onSubmit={this.handleSaveTodo}>
     <h5 className="font-brown">Todo Details</h5>
     
   <div className="row">
     <div className="col-sm-6 col-md-4">
      <div className="form-group">
       <label>NAME</label><span className="text-danger">*</span>
        <input
        id='name'
        type='text'
        className='form-control'
        name='name'
        value={this.state.name}
        onChange={this.handleFieldChange}
      />
      </div>
     </div>
     </div>

     <div className="row">     
     <div className="col-sm-6 col-md-4">
      <div className="form-group">
       <label>SHOP NAME</label><span className="text-danger">*</span>
        <input
        id='shop_name'
        type='text'
        className='form-control'
        name='shop_name'
        value={this.state.shop_name}
        onChange={this.handleFieldChange}
      />
      </div>
     </div>
     </div>

     <div className="row">     
     <div className="col-sm-6 col-md-4">
      <div className="form-group">
       <label>STATUS</label><span className="text-danger">*</span>
        <textarea
        id='status'
        type='text'
        className='form-control'
        name='status'
        value={this.state.status}
        onChange={this.handleFieldChange}
      >{this.state.status}</textarea>
      </div>
     </div>
     </div>

     <div className="row">     
      <div className="col-sm-6 col-md-3">
      <div className="text-left">
        <button className='btn btn-sm btn-primary'>Save</button>
      </div>
      </div>
      </div>
  </form>
  </div>
    )
  }
}

export default withRouter(NewForm)