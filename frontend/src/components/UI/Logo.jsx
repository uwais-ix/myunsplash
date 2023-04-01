import myUnsplashLogo from '../../images/my_unsplash_logo.svg';

const Logo = ({className = ''}) => {
  return (
    <img
      src={myUnsplashLogo}
      alt='my'
      className={`w-64 object-contain ${className}`}
    />
  );
};

export default Logo;
