import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import ItemCreate from './screens/ItemCreate/ItemCreate'
import Items from './screens/Items/Items';
import ItemDetail from './screens/ItemDetail/ItemDetail';
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import './App.css';

import {
  createItem,
  readAllItems,
  updateItem,
  destroyItem,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemForm: {
        name: "",
        photo: ""
      },
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    this.getItems();
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  getItems = async () => {
    const Items = await readAllItems();
    this.setState({
      Items
    })
  }

  newItem = async (e) => {
    e.preventDefault();
    const item = await createItem(this.state.itemForm);
    this.setState(prevState => ({
      items: [...prevState.items, item],
      itemForm: {
        name: "",
      }
    }))
  }

  editItem = async () => {
    const { itemForm } = this.state
    await updateItem(itemForm.id, itemForm);
    this.setState(prevState => (
      {
        items: prevState.items.map(item => item.id === itemForm.id ? itemForm : item),
      }
    ))
  }

  deleteItem = async (id) => {
    await destroyItem(id);
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }))
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      itemForm: {
        ...prevState.itemForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const items = await readAllItems();
    const item = items.find(el => el.id === parseInt(id));
    this.setState({
      itemForm: item
    });
  }

  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: userData
    })
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            itemForm: {
              name: "",
              photo: ""
            }
          })}>Tech Trendsss</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
          exact path="/"
          render={() => (
            <Items
              items={this.state.items}
              itemForm={this.state.teacherForm}
              handleFormChange={this.handleFormChange}
              newItem={this.newItem} />
          )}
        />
        <Route
          path="/new/item"
          render={() => (
            <ItemCreate
              handleFormChange={this.handleFormChange}
              teacherForm={this.state.teacherForm}
              newTeacher={this.newTeacher} />
          )} />
        <Route
          path="/items/:id"
          render={(props) => {
            const { id } = props.match.params;
            const item = this.state.items.find(el => el.id === parseInt(id));
            return <ItemDetail
              id={id}
              item={item}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editItem={this.editItem}
              itemForm={this.state.itemForm}
              deleteItem={this.deleteItem} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);