import Logo from './UI/Logo';
import {IoIosSearch} from 'react-icons/io';
import debounce from 'debounce';
import AddDialog from './AddDialog';

const Navbar = ({setFilter}) => {
  const updateFilter = (value) => {
    setFilter(value);
  };

  const debouncedUpdateFilter = debounce(updateFilter, 450);

  return (
    <>
      <div className='flex justify-between sticky top-0 w-full p-4 z-10 bg-white opacity-95'>
        <div className='flex items-center space-x-6'>
          <Logo className='h-10' />
          <div className='flex items-center space-x-2 border-2 border-slate-300 p-5 text-slate-300 rounded-xl'>
            <IoIosSearch className='text-2xl text-slate-500' />
            <input
              type='text'
              placeholder='Search'
              onChange={(e) => {
                debouncedUpdateFilter(e.target.value);
              }}
              className='outline-none font-medium text-slate-500'
            />
          </div>
        </div>

        <div className='flex items-center space-x-6 font-semibold'>
          {/* <button className='button__nav bg-indigo-500 '>Settings</button> */}
          <AddDialog />
        </div>
      </div>
    </>
  );
};

export default Navbar;
