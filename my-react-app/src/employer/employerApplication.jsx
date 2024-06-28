import React, { useState } from 'react';
import EmployerFooter from './employerFooter';
import EmployerHeader from './employerHeader';
import AcceptApplication from './acceptApplication';
import RejectApplication from './rejectApplication';
import PendingApplication from './pendingApplication';
import { useEffect } from 'react';

export default function EmployerApplication() {
    const [currentView, setCurrentView] = useState('Pending');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    const handleViewChange = (view) => {
        setCurrentView(view);
    };
    if (isLoading) {
        return ( 
            <> 
                <div className="Emploader"></div> 
                <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customPink'>
                    " MMUJOB "</p> 
                </div> 
            </> 
        );
    }
    return (
        <>
            <EmployerHeader />
            <div className='mt-24 mb-8 mx-8 md:mx-32 min-h-[100vh]'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Application Status</h1>
                    <div className='flex justify-center space-x-8 md:space-x-20 border border-gray-300 p-2 rounded-md bg-gray-100 shadow-sm'>
                        <p 
                            className={`cursor-pointer transition-all duration-200 px-4 py-2 rounded ${currentView === 'Pending' ? 'bg-stone-300 text-white' : 'text-gray-600'}`}
                            onClick={() => handleViewChange('Pending')}
                        >
                            Pending
                        </p>
                        <p 
                            className={`cursor-pointer transition-all duration-200 px-4 py-2 rounded ${currentView === 'Accepted' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
                            onClick={() => handleViewChange('Accepted')}
                        >
                            Accepted
                        </p>
                        <p 
                            className={`cursor-pointer transition-all duration-200 px-4 py-2 rounded ${currentView === 'Rejected' ? 'bg-red-500 text-white' : 'text-gray-600'}`}
                            onClick={() => handleViewChange('Rejected')}
                        >
                            Rejected
                        </p>
                    </div>
                </div>
                <div className='mt-4'>
                    {currentView === 'Pending' && <PendingApplication />}
                    {currentView === 'Accepted' && <AcceptApplication />}
                    {currentView === 'Rejected' && <RejectApplication />}
                </div>
            </div>
            <EmployerFooter />
        </>
    );
}
