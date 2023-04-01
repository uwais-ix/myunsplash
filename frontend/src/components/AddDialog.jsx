import * as Dialog from '@radix-ui/react-dialog';
import {motion} from 'framer-motion';

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addImage} from '../redux/slice/Gallery';

const AddDialog = ({url, isOpen = false, setOpen: setDialogOpen}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isOpen);

  const openDialog = () => {
    setOpen(true);
    if (setDialogOpen) setDialogOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    if (setDialogOpen) setDialogOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target.form.elements;
    const data = {
      title: form.title.value,
      url: form.url.value,
    };

    dispatch(addImage(data));
    closeDialog();
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        onClick={openDialog}
        asChild
      >
        {!setDialogOpen && (
          <button className='button__nav bg-green-400 '>Add a photo</button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className='dialog__overlay'
          onClick={closeDialog}
        />

        <Dialog.Content className='dialog__content'>
          <motion.div
            className='dialog__container p-7 flex flex-col space-y-3'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
          >
            <h1 className='form__title'>Add Photo</h1>
            <form className='form__container w-80'>
              <div className='form__field'>
                <label
                  htmlFor='title'
                  className='form__label'
                >
                  Label
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='form__input'
                />
              </div>

              <div div='form__field'>
                <label
                  htmlFor='url'
                  className='form__label'
                >
                  Photo URL
                </label>
                <input
                  type='text'
                  name='url'
                  id='url'
                  className='form__input'
                  defaultValue={url}
                />
              </div>

              <div className='flex justify-end space-x-4 pt-6 pb-2'>
                <button
                  onClick={closeDialog}
                  className='button__dialog bg-red-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  onClick={onSubmit}
                  className='button__dialog bg-green-400'
                >
                  Add Image
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddDialog;
