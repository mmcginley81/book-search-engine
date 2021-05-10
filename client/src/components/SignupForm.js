import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import useMutation and ADD_USER
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';

//dont need this line below
// import { createUser } from '../utils/API';

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // importing the addUser mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //change the API to GQL Here
    try {
      const response = await addUser(
        { variables: {...userFormData}
      });

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      //const { token, user } = await response.json();
      //console.log(data);
      console.log(response.data.addUser)
      Auth.login(response.data.addUser.token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder='Your username'
            name="username"
            id="username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name="email"
            id="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder='Your password'
            name="password"
            id="password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
      {error && <div>Signup failed</div>}
    </>
  );
};

export default SignupForm;
