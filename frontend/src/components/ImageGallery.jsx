import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {motion} from 'framer-motion';

import Image from './Image';
import {loadGallery} from '../redux/slice/Gallery';

const ImageGallery = ({filter: searchFilter}) => {
  const dispatch = useDispatch();

  // gallery synced with server
  const gallery = useSelector((state) => state.gallery.gallery);
  const loadingState = useSelector((state) => state.gallery.loading);

  // images (stored locally) changes based on filter or updates to the gallery
  const [images, setImages] = useState([]);

  // fetch gallery
  useEffect(() => {
    if (loadingState === 'idle') {
      dispatch(loadGallery());
    }
  }, [loadingState, dispatch]);

  // set images based on filter
  useEffect(() => {
    if (typeof gallery === typeof []) {
      setImages(gallery.filter((image) => image.title.includes(searchFilter)));
    } else {
      throw new Error('Gallery is not an array', gallery);
    }
  }, [gallery, searchFilter]);

  // content
  let galleryContent;

  // skeleton or display images
  if (loadingState === 'pending' || images.length === 0)
    galleryContent = <div>Your Gallery Looks Empty</div>;
  else
    galleryContent = images.map((image, index) => (
      <Image
        key={image._id}
        image={image}
      />
    ));

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      <h1 className='gallery__header'>My Gallery</h1>
      <motion.div
        className='gallery__container'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        {galleryContent}
      </motion.div>
    </motion.div>
  );
};

export default ImageGallery;
