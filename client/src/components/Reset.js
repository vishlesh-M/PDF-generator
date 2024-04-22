import React from 'react'
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate'


import styles from '../styles/Username.module.css'

export default function Reset(){

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: ''
        },
        validate : resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values=>{
            console.log(values)
        }
    })

    return (
        <div className="container mx-auto">
            <Toaster position ='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
               <div className={styles.glass} style={{width:"50%"}}>
                <div className="title flex flex-col item-center">
                    <h4 className='text-5xl font-bold text-center'>Reset</h4>
                    <span className='py-4 text-xl text-center text-gray-500'>
                        Enter new Password.
                    </span>
                </div>
                
                <form className='pt-10' onSubmit={formik.handleSubmit}>     
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('password')} className={styles.testbox} type="password" placeholder='New Password'/>
                        <input {...formik.getFieldProps('confirm_pwd')} className={styles.testbox} type="password" placeholder='Repeat Password'/>
                        <button className={styles.btn} type='submit'>Reset</button>
                    </div>
                    
                </form>

                </div> 
            </div>
        </div>
    )
}