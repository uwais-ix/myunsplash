import {motion} from 'framer-motion';
import Toast from './UI/Toast';

import {useSelector} from 'react-redux';

const ToastNotifier = () => {
  const notifications = useSelector((state) => state.toast.notifications);

  return (
    <motion.div className='fixed bottom-5 right-5 z-50 flex flex-col space-y-2 overflow-hidden p-3'>
      {notifications.map((notification) => (
        <Toast
          key={notification._id}
          notification={notification}
        />
      ))}
    </motion.div>
  );
};

export default ToastNotifier;
