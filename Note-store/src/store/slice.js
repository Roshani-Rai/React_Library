import {createSlice} from '@reduxjs/toolkit'
import {toast } from 'react-hot-toast'
 const initialState={
   pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes"))
       :[]
}

export const pasteSlice=createSlice({
    name:'paste',
    initialState,
    reducers:{
        add:(state,action)=>{
          const paste=action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully");
    },
        update:(state,action)=>{
            const paste=action.payload;
            const index=state.pastes.findIndex((item)=>item.id===paste.id);
            if(index>=0){
            state.pastes[index]=action.payload;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Updated Successfully");
          }
        },
       remove:(state,action)=>{
            const paste=action.payload;
            const index=state.pastes.findIndex((item)=>item.id===paste.id);
           if(index>=0){
           state.pastes.splice(index,1);
           localStorage.setItem("pastes",JSON.stringify(state.pastes));
           toast.success("Paste Deleted Successfully");
         }            
        },
        reset:(state)=>{
            state.pastes=[]
            localStorage.removeItem("pastes")
        },
    }
})
export const { add,update,remove,reset } = pasteSlice.actions;
export default pasteSlice.reducer 
//findIndex need a callback