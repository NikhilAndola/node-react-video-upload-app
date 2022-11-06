import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Form from '../Form';
import '../Form.css'

export const SignIn = () => {

  const [state, setState] = useState({
    email: '',
    password: '',
    token: '',
    redirect: localStorage.getItem('usesTokenTime') ? true : false
  });

  const emailInputChangeHandler = (e) => {
    setState({...state, email: e.target.value
      });
  };

  const passwordInputChangeHandler = (e) => {
    setState({
      ...state, password: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(!(state.email === '' || state.password === '')) {
      axios.post('/api/signIn', {
        email: state.email,
        password: state.password
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details!');
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <h3 className='text-center text-info'>Login</h3>
      <div className='form-group'>
        <label htmlFor="email" className='text-info'> Email:</label><br />
        <input 
          id="email"
          className='form-control'
          type="email"
          name="email"
          placeholder='example@domain.com'
          onChange={emailInputChangeHandler}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="password" className='text-info'>Password:</label><br />
        <input 
          id="password"
          className='form-control'
          type="password"
          name="password"
          placeholder='*********'
          onChange={passwordInputChangeHandler}
          required
        />
      </div>
      <div className='d-flex justify-content-between align-items-end'>
          <button type="button" onClick={onSubmitHandler} className="btn btn-info btn-md">Submit</button>
          <Link to="/signUp" className="text-info">Sign up here</Link>
      </div>
    </Form>
  )
}
