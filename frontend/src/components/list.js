
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

 class NewList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          todos: [],
        };

        this.deletetodo = this.deletetodo.bind(this);
        this.gettodos = this.gettodos.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }

      // handleStatusChange(data){
      //   console.log(data)
      // }
      handleSearch(searchKey, searchVal) {
        this.gettodos(1,searchKey, searchVal)
      }

      handlePageChange(pageNumber) {
     
        this.gettodos(pageNumber);
      }
      
      componentDidMount(){
       this.gettodos()
      }

      gettodos(page = 1, searchKey = null, searchVal=null) {
        axios.get('http://localhost:8000/api/todos/?format=json')
        .then(response => {
          // console.log(response.data)
          this.setState({ 
            todos: response.data
          });
         
        })
        
        .catch(function (error) {
          console.log(error);
        })
      }

      deletetodo(todoId) {
        const r = window.confirm("Are you sure want to delete this record")
        if(r)
        {
          axios.delete('http://localhost:8000/api/todos/' + todoId)
            .then((res) => {
              this.gettodos()
            }).catch((error) => {
                console.log(error)
            })
        }
    }
      
    render() {
     
        const { todos } = this.state;

        return (
          <div className="container">
        <div>
    <Link className='btn btn-primary btn-xs' to='./todos/create'>
                      Create new todo
    </Link>
		</div>
  <br />
	<table className="table table-striped">
		<thead>
			<tr>
        <th>S.No</th>
        <th>Name</th>
		<th>Shop Name</th>
		<th width='20%'>Status </th>
        <th>Date </th>
		<th className="text-center">Action</th>
		</tr>
		</thead>
        <tbody>
                       {todos.map((todo,i) => (
                       
                            <tr key={i+1}>
                                <td>{i+1}</td>
                                <td>{todo.name}</td>
                                <td>{todo.shop_name}</td>
                                <td>{todo.status}</td>
                                <td>{todo.date_val}</td>

                                <td className="text-center">
                                  <Link  className='btn btn-info btn-xs' to={"/todos/" + todo.id}>
                                  Edit
                                  </Link>
                                  &nbsp;
                                  <button className='btn btn-danger btn-xs' onClick={() => this.deletetodo(todo.id)}>
                                  Delete
                                  </button>
                                </td>

                          </tr>
                      ))}
                        </tbody>
                    </table>

                </div>
            
        );
    }
}
export default NewList