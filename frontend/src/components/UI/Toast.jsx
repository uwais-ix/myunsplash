import * as ToastR from '@radix-ui/react-toast';
import {motion} from 'framer-motion';
import {IoIosCloseCircleOutline} from 'react-icons/io';

import {useDispatch} from 'react-redux';
import {removeNotification} from '../../redux/slice/Notifications';

const Toast = ({notification}) => {
  const dispatch = useDispatch();

  const {duration, title, message, msg, error, field, _id} = notification;

  const notificationTitle = title || field;
  const notificationMessage = message || msg || error || field || title;

  if (!notification) return <></>;

  const onDismiss = () => dispatch(removeNotification(_id));

  return (
    <ToastR.Provider
      duration={duration || 5000}
      swipeDirection='right'
    >
      <ToastR.Root onOpenChange={onDismiss}>
        <motion.div
          className='bg-white shadow-lg rounded-md p-4 text-sm text-gray-500 min-w-[200px] divide-y-2 divide-gray-200'
          initial={{opacity: 0, x: 1000}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: 100}}
          duration={0.5}
        >
          <ToastR.Title className='flex capitalize justify-between items-center text-gray-600'>
            {notificationTitle}
            <ToastR.Close>
              <IoIosCloseCircleOutline />
            </ToastR.Close>
          </ToastR.Title>
          <ToastR.Description className='mt-2 pt-2'>
            {notificationMessage}
          </ToastR.Description>
        </motion.div>
      </ToastR.Root>
      <ToastR.Viewport />
    </ToastR.Provider>
  );
};

export default Toast;
