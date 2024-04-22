import {create} from 'zustand';


export const useAuthStore = create((set)=>({
    auth : {
        usernaeme:'',
        active:false
    },
    setUsername : (name)=> set((state)=>({auth:{...state.auth, username:name}}))
}))