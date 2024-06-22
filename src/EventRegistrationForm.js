import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const initialFormState = {
  name: '',
  email: '',
  age: '',
  attendingWithGuest: 'No',
  guestName: ''
};

const validate = (values) => {
  let errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest === 'Yes' && !values.guestName) {
    errors.guestName = 'Guest name is required';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormValidation(initialFormState, validate);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    handleSubmit(e);
    if (!Object.keys(errors).length) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={onSubmit}>
          <h1>Event Registration</h1>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={values.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={values.email} onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" value={values.age} onChange={handleChange} />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <label>Are you attending with a guest?</label>
            <select name="attendingWithGuest" value={values.attendingWithGuest} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {values.attendingWithGuest === 'Yes' && (
            <div>
              <label>Guest Name:</label>
              <input type="text" name="guestName" value={values.guestName} onChange={handleChange} />
              {errors.guestName && <p>{errors.guestName}</p>}
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Form Submission Summary</h2>
          <p>Name: {values.name}</p>
          <p>Email: {values.email}</p>
          <p>Age: {values.age}</p>
          <p>Attending with guest: {values.attendingWithGuest}</p>
          {values.attendingWithGuest === 'Yes' && <p>Guest Name: {values.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
