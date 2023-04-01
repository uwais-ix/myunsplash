import {Outlet} from 'react-router-dom';

import PageLayout from '../components/UI/Container/PageLayout';
import Footer from '../components/Footer';
import {AnimatePresence} from 'framer-motion';

const Welcome = () => {
  return (
    <>
      <PageLayout className='justify-center items-center'>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </PageLayout>
      <Footer />
    </>
  );
};

export default Welcome;
