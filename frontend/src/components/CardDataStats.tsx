import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className=' ml-10' >
      <div className="flex h-11.5 items-center justify-center rounded-full">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </span>
        </div>
        <span
          className="flex items-center gap-1 text-sm font-medium text-green-500"
        >
          {/* Optional content */}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
