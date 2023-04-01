import {motion} from 'framer-motion';
import {useState} from 'react';

import Navbar from '../components/Navbar';
import ImageGallery from '../components/ImageGallery';

const Gallery = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <motion.div className='mt-8 container mx-auto'>
        <Navbar setFilter={setFilter} />
        <motion.div className='divide-y-4'>
          <ImageGallery filter={filter} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Gallery;
