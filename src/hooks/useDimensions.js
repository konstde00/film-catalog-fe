import { useEffect, useState } from 'react';

const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth && window.innerHeight) {
        const currentDimensions = {
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth,
        };

        setDimensions(currentDimensions);
      }
    };

    if (window.innerWidth && window.innerHeight) {
      const currentDimensions = {
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      };

      setDimensions(currentDimensions);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return dimensions;
};

export default useDimensions;
