import {createSlice} from '@reduxjs/toolkit'

const initialState={
    score:localStorage.getItem("score")?JSON.parse(localStorage.getItem("score")):[]
}

export const scoreSlice=createSlice({
    name:'score',
    initialState,
    reducers:{
        add:(state,action)=>{
           // const player={
           //     name:action.payload.name,
           //     score:action.payload.score,
          //      created:new Date().toDateString()
          //  }
          const {id,name,score}=action.payload;
          const newEntry={
            id,
            name,
            score,
            created:new Date().toDateString()
          };
          //Here i add this new entry temporarily so first spread state and then add it.
          const player=[...state.score,newEntry];
          //Now sort it and add rank in it .
          player.sort((a,b)=>{
            if(a.score!==b.score) return b.score - a.score;
            return new Date(a.created)-new Date(b.created);
          });
          //Add rank to each entry
          const rankedPlayer=player.map((entry,index)=>({
            rank:index+1,
            ...entry
          }))
            state.score=rankedPlayer;
            localStorage.setItem("score", JSON.stringify(state.score));
        },
        remove:(state,action)=>{
            const id=action.payload;
            const updatedPlayer=state.score.filter((item)=>item.id!==id);
           
             const ranked= updatedPlayer.sort((a,b)=>{
              if(a.score!==b.score) return b.score -a.score;
              return new Date(a.created)- new Date(b.created);
             })
           .map((entry,index)=>({
               rank:index+1,
            ...entry,             
             }));
             state.score=ranked;
                localStorage.setItem("score",JSON.stringify(state.score));
            
        },
        resetGame:(state)=>{
         state.score=[];
         localStorage.setItem("score",JSON.stringify(state.score))       
        },
        updateScore:(state,action)=>{
           state.score=action.payload.score;
         localStorage.setItem("score",JSON.stringify(state.score))
        },
    }
})

export const {add,remove,resetGame,updateScore}=scoreSlice.actions;
export default scoreSlice.reducer;