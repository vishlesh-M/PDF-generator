import React ,{ useState } from 'react'
import { useNavigate} from 'react-router-dom'
import avatar from  '../assets/avatar.jpg';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../hooks/fetchHooks';
import {useAuthStore} from '../store/store';
import { updateUser } from '../helper/helper';

import styles from '../styles/Username.module.css'
// import styles from '../styles/profile.css';

export default function Profile(){

  const[file,setFile]= useState() ; 
  const{ username}= useAuthStore(state => state.auth)
    const[{isLoading,apiData,serverError}]=useFetch(`/user/${username}`)
    const navigate = useNavigate()

    

    const formik = useFormik({
        initialValues: {
            firstName:apiData?.firstName ||'',
            lastName:apiData?.lastName||'',
            email:apiData?.email||'',
            mobile:apiData?.mobiel||'',
            Adhar:apiData?.Adhar||'',
            address:apiData?.address||''
        },
        enableReinitialize:true,
        validate : profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values=>{
            values = await Object.assign(values,{profile : file || apiData?.profile||''})
            let updatePromise = updateUser(values);
            toast.promise(updatePromise,{
                loading:'Updating...',
                success:<b>Update Successful</b>,
                error:<b>could not update</b>
            })
            console.log(values)
        }
    })

    /** formik doesn't support file upload so we need to create the handler */
    const onUpload = async e =>{
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    function userLogout(){
      localStorage.removeItem('tooken');
      navigate('/')
    }

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
    
          <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>
              <div className="title flex flex-col item-center">
                <h4 className="text-4xl font-bold text-center">Profile</h4>
                <span className="py-4 text-xl text-center text-gray-500">
                  You can update the details!
                </span>
              </div>
    
              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  <input onChange={onUpload} type="file" id="profile" name="profile" />
                </div>
                <div className="textbox flex flex-col items-center gap-6">
                  <div className="name flex gap-10">
                    <input {...formik.getFieldProps("firstName")} className={styles.testbox} type="text" placeholder="FirstName" />
                    <input {...formik.getFieldProps("lastName")} className={styles.testbox} type="text" placeholder="LastName" />
                  </div>
                  <div className="name flex gap-10">
                    <input {...formik.getFieldProps("mobile")} className={styles.testbox} type="text" placeholder="Mobile No." />
                    <input {...formik.getFieldProps("email")} className={styles.testbox} type="email" placeholder="Email*" />
                  </div>
                  <div className="name flex gap-10">
                    <input {...formik.getFieldProps("Adhar")} className={styles.testbox} type="text" placeholder="Adhar No." />
                    <input {...formik.getFieldProps("meter")} className={styles.testbox} type="text" placeholder="Meter NO." />
                  </div>
                  <div className="address flex gap-20">
                    <input {...formik.getFieldProps("Aaddress")} className={styles.testbox} type="text" placeholder="Address" />
                  </div>
                  <button className={styles.btn} type="submit">
                    Register
                  </button>
                </div>
                <div className="text-center py-4">
                  <span className="text-gray-500">come back later?</span>{" "}
                  <button onClick={userLogout} className="text-red-500" to="/">
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
}