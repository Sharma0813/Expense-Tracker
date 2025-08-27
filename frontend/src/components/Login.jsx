import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Logo from './shared/Logo';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Server Error');
    }
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>
        <div className='w-full flex justify-center mb-5'>
          <Logo />
        </div>
        <div className='mb-4'>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            value={input.email}
            onChange={changeHandler}
            required
          />
        </div>
        <div className='mb-4'>
          <Label>Password</Label>
          <Input
            type='password'
            name='password'
            value={input.password}
            onChange={changeHandler}
            required
          />
        </div>
        <Button type='submit' className='w-full my-5'>
          Login
        </Button>
        <p className='text-sm text-center'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-600'>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
