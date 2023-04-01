import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import Welcome from './pages/Welcome';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';

import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import ToastNotifier from './components/ToastNotifier';

import {isLoggedIn} from './redux/slice/Account';

const App = () => {
  const isAuth = useSelector((state) => state.account.isAuth);
  const status = useSelector((state) => state.account.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(isLoggedIn());
    }
  }, [status, dispatch]);

  return (
    <>
      <BrowserRouter>
        <AnimatePresence mode='wait'>
          <Routes>
            <Route
              path='/'
              element={isAuth ? <Navigate to='/gallery' /> : <Welcome />}
            >
              <Route
                index
                element={<Main />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
            </Route>

            <Route
              path='/gallery'
              element={isAuth ? <Gallery /> : <Navigate to='/' />}
            ></Route>

            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>

      <ToastNotifier />
    </>
  );
};

export default App;
