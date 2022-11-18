import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');

  const Register = () => {
    const sendData = async (email, password, name) => {
      //dispatch({ type: 'FETCH_REQUEST' });
      if (password === cpassword) {
        var reg = new FormData();
        reg.append('email', email);
        reg.append('password', password);
        reg.append('name', name);

        console.log('uyuyuyuyuyuyuyuy333333333333333333333');
        try {
          console.log('uyuyuyuyuyuyuyuy');
          const result = await axios.post(`/api/client/register`, reg);
          // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          console.log(result);
        } catch (error) {
          // dispatch({ type: 'FETCH_FAIL', payload: error.message });
          alert(error.response.data.message);
        }
      } else {
        alert('Incompatibel Password');
      }
    };
    sendData(email, password, name);
  };

  return (
    <div className=" flex items-center justify-center   px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center   px-4 sm:px-6 lg:px-8  max-w-lg flex-col ">
        <div className="bg-white px-6 py-6  text-black w-full">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-4 py-8 text-center text-3xl font-extrabold text-gray-900">
              Sign Up
            </h2>
          </div>
          <input
            type="text"
            className="block   border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-2"
            name="confirm_password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="w-full text-center p-3 rounded mt-2  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
              onClick={() => Register()}
            >
              Create Account
            </button>
          </div>

          <div className="text-center text-sm text-grey-dark mt-2">
            By signing up, you agree to the{' '}
            <Link
              to={'#'}
              className="no-underline border-b border-grey-dark text-grey-dark text-blue-600"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to={'#'}
              className="no-underline border-b border-grey-dark text-grey-dark text-blue-600"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-grey-dark">
          Already have an account?
          <Link
            to={'/signin'}
            className="no-underline border-b border-blue text-blue-600"
          >
            {' '}
            Sign in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
