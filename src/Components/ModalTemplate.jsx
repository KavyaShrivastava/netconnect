import React from 'react';

const Modal = ({ heading, message, buttonColor, buttonText, onClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-80">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>
        <p>{message}</p>
        <div className='flex justify-center mt-4'>
        <button
          className={`px-4 py-2 rounded-md text-white ${buttonColor}`}
          onClick={onClick}
        >
          {buttonText}
        </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
