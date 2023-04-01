import {motion} from 'framer-motion';
import Logo from './UI/Logo';
import {useNavigate} from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className='max-w-md items-center justify-center'
      initial={{opacity: 0.3, x: -100}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 100}}
    >
      <Logo />
      <div className='text-center w-full mt-4'>
        <button
          className='button__welcome'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className='button__welcome'
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default Main;
