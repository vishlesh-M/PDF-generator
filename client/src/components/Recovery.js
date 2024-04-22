import React,{useEffect,useState} from 'react'
import { useAuthStore } from '../store/store';
import toast,{Toaster} from 'react-hot-toast';
//import { passwordValidate } from '../helper/validate'
import { generateOTP, verifyOTP} from '../helper/helper'
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Username.module.css'

export default function Recovery() {
    const { username } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        generateOTP(username)
            .then(OTP => {
                console.log(OTP);
                if (OTP) {
                    toast.success('OTP has been sent to your email');
                } else {
                    toast.error('Problem while generating OTP');
                }
            })
            .catch(error => {
                console.error('Error generating OTP:', error);
                toast.error('Failed to generate OTP');
            });
    }, [username]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const { status } = await verifyOTP({ username, code: OTP });
            if (status === 201) {
                toast.success('Verification successful');
                navigate('/reset');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Error verifying OTP. Please try again.');
        }
    }

    async function resendOTP() {
        try {
            const OTP = await generateOTP(username);
            if (OTP) {
                toast.success('OTP has been sent to your email');
            } else {
                toast.error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            toast.error('Failed to resend OTP');
        }
    }
    return (
        <div className="container mx-auto">
            <Toaster position ='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
               <div className={styles.glass}>
                <div className="title flex flex-col item-center">
                    <h4 className='text-5xl font-bold'>Recovery</h4>
                    <span className='py-4 text-xl w-2/3 text-center'>
                        Enter OTP to recover password.
                    </span>
                </div>
                <form className='pt-10' onSubmit={onSubmit}>
                    <div className="textbox flex flex-col items-center gap-6">
                        <div className="input text-center">
                        <span className='py-4 text-sm text-left'>
                            Enter 6 digit OTP sent to your email address.
                        </span>
                        <br/>
                        <input onChange={(e)=>setOTP(e.target.value)} className={styles.testbox} type="password" placeholder='OTP'/>
                        </div>

                        <button className={styles.btn} type='submit'>Sign up</button>
                    </div>
                </form>
                <div className="text-center py-4">
                        <span className='text-gray-500'>Can't get OTP? <button onCLick={resendOTP}className='text-red-500'>Resend</button></span>
                    </div>
                </div> 
            </div>
        </div>
    )
}