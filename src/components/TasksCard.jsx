import React from 'react';

function TasksCard({ title, data, roll }) {
  // Function to transform title into human-readable format
  const formatTitle = (title) => {
    return title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Conditional UI rendering based on title
  const renderCardContent = ({title,data}) => {
    switch (title) {
      case 'members_count':
        return (
          <div className="  p-4 text-center">
            <h6 className="font-bold text-gray-900 text-lg text-md">
              {data}
            </h6>
          </div>
        );

      case 'active_inactive_users':
        return (
          <div className="flex justify-between   p-4">
            <div className="text-center w-1/2">
              <h6 className="font-bold uppercase text-green-600 text-lg">
                Active - {data.active}
              </h6>
            </div>
            <div className="text-center w-1/2">
              <h6 className="font-bold uppercase text-red-600 text-lg">
                Inactive - {data.inactive}
              </h6>
            </div>
          </div>
        );

      case 'low_balance':
        return (
          <div className="  p-4 text-center">
            <h6 className="font-bold text-gray-900 text-lg ">Balance - {data}</h6>
          </div>
        );

      case 'orders':
        return (
          <div className=" text-center p-4">
            <h6 className="font-bold text-gray-900 text-lg text-md">{data}s</h6>
          </div>
        );

      case 'daily_sales':
        return (
          <div className="  p-4 text-center">
            <h6 className="font-bold text-gray-900 text-lg text-md">
              {data}
            </h6>
          </div>
        );

      case 'task_complete':
        return (
          <div className="  p-4 text-center">
            <h6 className="font-bold text-gray-900 text-lg text-md">
             {data}
            </h6>
          </div>
        );

      default:
        // Default component
        return (
          <div className="  p-4">
            <p className="text-gray-900 text-center font-bold text-lg">{data}</p>
          </div>
        );
    }
  };

  return (
    <div className=" w-[90%] md:w-full bg-white cursor-pointer max-w-md mx-auto border border-gray-300 shadow-sm rounded-lg transition-all hover:scale-100 hover:shadow-md duration-300">
      <div className="px-4 py-2">
        <h6 className="uppercase text-xs  font-bold text-gray-600">
          {formatTitle(title)}
        </h6>
      </div>

      {/* Full-width line */}
      <div className="w-full border-t-2 border-gray-300 mt-1"></div>

      {/* Render dynamic content based on title */}
      {renderCardContent({title,data})}
    </div>
  );
}

export default TasksCard;
