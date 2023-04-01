import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GallerySkeleton = () => {
  const heights = [300, 500, 100, 200, 300, 500, 400, 350, 300];
  return (
    <>
      {heights.map((height, index) => (
        <Skeleton
          key={index}
          height={height}
          className='mb-10'
        />
      ))}
    </>
  );
};

export default GallerySkeleton;
