import toast from 'react-hot-toast'
import { authentication } from'./helper';
/**validate login page username */

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    if(values.username){
        const{status} = await authentication(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User doesnot exist'); 
        }
    }
    return errors;
}

/**validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}
/** validate reset password */
export async function resetPasswordValidation(values)
{
    const errors = passwordVerify({}, values);
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match..!");
    }

    return errors;
}

/** validate Register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;

}

export async function profileValidate(values){
    const errors = emailVerify({},values);
    return errors;
    
}


/** ********************************* */



/**validate password */

function passwordVerify(errors ={}, values ){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required..!");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 6){
        errors.password = toast.error("Password must be more than 6 character long ");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special characters ");
    }

    return errors;
}



/**valildate username */
function usernameVerify(error={}, values){
    if(!values.username){
        error.username=toast.error('Username Required..!');
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!');

    }
    return error
    }

    /** validate email */

    function emailVerify(error={}, values){
        if(!values.email){
            error.email = toast.error("Email Required..!");
        }else if(values.email.includes(" ")){
            error.email = toast.error("Wrong email...!")
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            error.email=toast.error("Invalid email address...!");
        }
    }