import {motion} from 'framer-motion';

const PageLayout = ({children, className = ''}) => {
  return (
    <motion.div
      className={`flex flex-col min-h-screen container ${className} mx-auto relative`}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
