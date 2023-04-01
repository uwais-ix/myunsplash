import {motion} from 'framer-motion';
import Logo from './UI/Logo';
import * as Form from '@radix-ui/react-form';

import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/slice/Account';

const Signup = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.loading);

  const FormSubmitHandler = async (e) => {
    e.preventDefault();

    const formElements = e.target.form.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;

    dispatch(registerUser({email, password}));
  };

  const disableSubmit = loading === 'pending';

  return (
    <>
      <Link to={'/'}>
        <Logo className='form__logo' />
      </Link>

      <motion.div
        initial={{opacity: 0, x: 100}}
        animate={{opacity: 1, x: 0}}
        className='container mx-auto'
      >
        <div className='form__container'>
          <div className='text-center'>
            <h1 className='form__title'>Sign Up</h1>
            <p className='form__desc'>Sign up to myunsplash</p>
          </div>

          <Form.Root className='m-6'>
            <Form.Field
              name='email'
              className='form__field group'
            >
              <Form.Label className='form__label'>Email Address</Form.Label>
              <Form.Control asChild>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email@mail.com'
                  className='form__input'
                />
              </Form.Control>
            </Form.Field>

            <Form.Field
              name='password'
              className='form__field group'
            >
              <Form.Label className='form__label'>Password</Form.Label>
              <Form.Control asChild>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Your Password'
                  className='form__input'
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit
              onClick={FormSubmitHandler}
              className='button__auth'
              disabled={disableSubmit}
            >
              Sign Up
            </Form.Submit>
          </Form.Root>

          <div>
            <p className='form__footer--text'>
              Already have an account?{' '}
              <Link
                to={'/login'}
                className='form__footer--link'
              >
                {' '}
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Signup;
