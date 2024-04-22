import React ,{ useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import avatar from  '../assets/avatar.jpg';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper';


import styles from '../styles/Username.module.css'

export default function Register(){

    const navigate = useNavigate()

    const[file,setFile]= useState()

    const formik = useFormik({
        initialValues: {
            email:'example@mail.com',
            username:'example123',
            password: 'example@123'
        },
        validate : registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values=>{
            values = await Object.assign(values,{profile : file || ''})
            let registerPromise = registerUser(values)
            toast.promise(registerPromise,{
                Loading:"creating...",
                success :<b>Register Successfully...!</b>,
                error: <b>could not register</b>
            });

            registerPromise.then(function(){navigate('/')});
        }
    })

    /** formik doesn't support file upload so we need to create the handler */
    const onUpload = async e =>{
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    return (
        <div className="container mx-auto">
            <Toaster position ='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
               <div className={styles.glass}>
                <div className="title flex flex-col item-center">
                    <h4 className='text-4xl font-bold text-center'>Register</h4>
                    <span className='py-4 text-xl text-center text-gray-500'>
                        Happy to join you!
                    </span>
                </div>
                
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <label htmlFor="profile">
                            <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                        </label>
                        <input onChange={onUpload} type="file" id='profile' name='profile'/> 
                    </div>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('email')} className={styles.testbox} type="text" placeholder='Email*'/>
                        <input {...formik.getFieldProps('username')} className={styles.testbox} type="text" placeholder='Username*'/>
                        <input {...formik.getFieldProps('password')} className={styles.testbox} type="password" placeholder='Password*'/>
                        <button className={styles.btn} type='submit'>Sign up</button>
                    </div>
                    <div className="text-center py-4">
                        <span className='text-gray-500'>Already Registered?</span> <Link className='text-red-500' to="/recovery">Login Now</Link>
                    </div>
                </form>

                </div> 
            </div>
        </div>
    )
}