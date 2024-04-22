import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** make api request */


/** authenticate function */

export async function authentication (username){
    try {
        return await axios.post('/api/authenticate',{ username})
    } catch (error) {
        return {error: "Username dosen't exist...!"}
    }
}

/** get iser detail */

export async function getUser({ username}){
    try {
       const {data} = await axios.get (`/api/user/${username}`)
    } catch (error) {
        return {error :"Password doesnt Match...!"}
    }
}

/** register user function  */

export async function registerUser(credentials){
    try {
      const{data : {message},status} = await axios.post(`/api/register`, credentials) 
      let{username,email}=credentials;

      /** send enmail */
      if(status === 201){
        await axios.post('/api/registerMail',{username,userEmail:email,text:message})
      }
      return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({ error})
    }
}

/** login function */

export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password });
            return {data}; // Assuming `data` contains relevant login information
        }
    } catch (error) {
        throw new Error("Password doesn't Match...!"); // Throw an error instead of returning a rejected Promise
    }
}

/**update user function */

export async function updateUser(response){
    try {
        const token =  localStorage.getItem('token');
        const data = await axios.put('/api/updateUser',response,{headers : {"Authorization":`Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({error:"Coulden't update user"})
    }
}

export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

        if (status === 202) {
            const { data: { email } } = await getUser({ username });
            const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery" });
        }

        return Promise.resolve(code);
    } catch (error) {
        console.error('Error generating OTP:', error);
        return Promise.reject({ error: "Failed to generate OTP" });
    }
}


export async  function verifyOTP({username ,code}){
    try {
      const {data,status} = await axios.get('/api/verifyOTP',{params:{username,code,}})
      return {data,status}  
    
    } catch (error) {
        return Promise.reject(error);
    }
}

/**reset password */
export async function resetPassword({username,password}){
    try {
        const{data,status} = await axios.put('/api/resetPassword',{username,password});
        return Promise.resolve({data,status})
    } catch (error) {
        return Promise.reject( {error})
    }
}