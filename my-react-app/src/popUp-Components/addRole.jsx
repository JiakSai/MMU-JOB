import React, { useState } from 'react';

export function AddRole({ onClose }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onClose(inputValue);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg relative">
                <button 
                    className='absolute top-2 right-2 text-xl font-bold' 
                    onClick={() => onClose(null)}
                >
                    &times;
                </button>
                <div className="w-[660px] py-[32px] bg-white">
                    <h1 className="text-2xl font-bold mb-4">Add Role</h1>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"  
                            className='border border-black w-h-[100px]'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} 
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
