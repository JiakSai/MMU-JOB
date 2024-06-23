import React, { useState } from 'react';
import EmployerFooter from './employerFooter';
import EmployerHeader from './employerHeader';
import AddEditPost from './Add&EditPost';

export default function AddPost() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleClose = () => {
        setShowSuccessMessage(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        setTimeout(() => setShowSuccessMessage(false), 6000); // Hide the message after 4 seconds
    };

    return (
        <>
            <EmployerHeader />
            <section className='mt-[100px] mb-[30px] mx-[120px]'>
                {showSuccessMessage && (
                    <div className="success-message">
                        Add post successfully!
                    </div>
                )}
                <AddEditPost onClose={handleClose} />
            </section>
            <EmployerFooter />
        </>
    );
}
