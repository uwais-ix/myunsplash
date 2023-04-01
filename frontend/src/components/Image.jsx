import {useState} from 'react';
import {motion} from 'framer-motion';

import 'react-loading-skeleton/dist/skeleton.css';

import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';

const Image = ({image, addImage = false}) => {
  const [trigger, setTrigger] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // dialog (add or delete)
  const deleteDialog = (
    <DeleteDialog
      open={trigger}
      setOpen={setTrigger}
      id={image._id}
    />
  );

  const addImgDialog = (
    <AddDialog
      isOpen={trigger}
      setOpen={setTrigger}
      url={image.url}
    />
  );

  const dialog = addImage ? addImgDialog : deleteDialog;

  const deleteButtonStyle =
    'border-red-600 text-red-600 hover:bg-red-600 hover:text-white';
  const addButtonStyle =
    'border-green-600 text-green-600 hover:bg-green-600 hover:text-white';

  const buttonStyle = addImage ? addButtonStyle : deleteButtonStyle;

  const skeletonStyle = !loaded ? 'bg-gray-300' : '';

  return (
    <motion.div
      key={image._id}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className='mb-11'
    >
      <div
        className={`relative group hover:cursor-pointer`}
        onClick={() => window.open(image.url, '_blank')}
      >
        <img
          src={image.url}
          alt={image.title}
          className={`w-full h-full aspect-auto rounded-2xl ${skeletonStyle}`}
          loading='eager'
          onLoad={() => {
            setLoaded(true);
          }}
        />

        <div className='w-full inset-0 rounded-2xl group-hover:bg-gray-800 opacity-40 absolute'></div>
        <button
          className={`hidden absolute top-5 right-5 group-hover:block px-3 py-1 border-[1px] rounded-2xl text-xs ${buttonStyle}`}
          onClick={(e) => {
            e.stopPropagation();
            setTrigger(true);
          }}
        >
          {addImage ? 'Add' : 'Delete'}
        </button>

        <h1 className='hidden absolute group-hover:block text-xl font-medium text-white bottom-5 left-5'>
          {image.title}
        </h1>
      </div>

      {trigger && dialog}
    </motion.div>
  );
};

export default Image;
