import React from 'react';
import EmployerFooter from './employerFooter';
import EmployerHeader from './employerHeader';
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddEditPost from './Add&EditPost';

export default function AddPost() {

    return (
        <>
            <EmployerHeader />
            <section className='mt-[100px] mb-[30px] mx-[120px]'>
                <AddEditPost/>
            </section>
            <EmployerFooter />
        </>
    );
}
