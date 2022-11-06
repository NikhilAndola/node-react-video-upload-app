import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Form from '../Form';
import '../Form.css'

export const SignUp = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

    //   console.log(state);
    
      const inputChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
      };
      
      const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!(state.email === '' || state.password === '' || state.firstName === '' || state.lastName === '')) {
          axios.post('/api/signUp', {
            firstName: state.firstName,
            lastName: state.lastName,
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
      <h3 className='text-center text-info'>Register</h3>
      <div className='form-group'>
        <label htmlFor="first-name" className='text-info'> First Name:</label><br />
        <input 
          id="first-name"
          className='form-control'
          type="text"
          name="firstName"
          placeholder='First Name'
          onChange={inputChangeHandler}
          autoComplete="true"
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="last-name" className='text-info'> Last Name:</label><br />
        <input 
          id="last-name"
          className='form-control'
          type="text"
          name="lastName"
          placeholder='Last Name'
          onChange={inputChangeHandler}
          autoComplete="true"
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="email" className='text-info'> Email:</label><br />
        <input 
          id="email"
          className='form-control'
          type="email"
          name="email"
          placeholder='example@domain.com'
          onChange={inputChangeHandler}
          autoComplete="true"
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
          onChange={inputChangeHandler}
          required
        />
      </div>
      <div className='d-flex justify-content-between align-items-end'>
          <button type="button" onClick={onSubmitHandler} className="btn btn-info btn-md">Submit</button>
          <Link to="/signIn" className="text-info">Sign in here</Link>
      </div>
    </Form>
  )
}
