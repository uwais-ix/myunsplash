import {motion} from 'framer-motion';

const Footer = ({className = ''}) => {
  return (
    <motion.footer
      className={`fixed bottom-2 w-full text-center text-xs font-light ${className}`}
    >
      created by{' '}
      <a
        href='https://github.com/uwais-ix'
        rel='noreferrer'
        target='_blank'
        className='text-blue-500 hover:animate-pulse'
      >
        uwais-ix
      </a>
    </motion.footer>
  );
};

export default Footer;
