import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './SkeletonLoader.module.scss'; 

interface SkeletonLoaderProps {
  count?: number; 
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 6 }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className={style.skeleton_wrapper}>
          <ContentLoader
            speed={2}
            viewBox="0 0 420 600"
            backgroundColor="#6cb9ab"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" width="100%" height="70%" />
            <rect x="24" y="calc(70% + 30px)" width="60%" height="30%" />
            <rect x="24" y="calc(70% + 80px)" width="40%" height="25px" />
          </ContentLoader>
        </div>
      ))}
  </>
);
