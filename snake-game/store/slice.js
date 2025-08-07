import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  score: (() => {
    try {
      const data = localStorage.getItem("score");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("❌ Error parsing localStorage score:", err);
      localStorage.removeItem("score"); // Clean corrupted storage
      return [];
    }
  })(),
};


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
        updateScore: (state, action) => {
  const { id, score } = action.payload;

  // Update score for the specific player
  const updatedScores = state.score.map(p =>
    p.id === id ? { ...p, score } : p
  );

  // Recalculate rankings safely
  const rankedPlayer = updatedScores
    .slice() // copy array
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return new Date(a.created || 0) - new Date(b.created || 0); // avoid crash
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  // Save back
  state.score = rankedPlayer;

  try {
    localStorage.setItem("score", JSON.stringify(state.score));
  } catch (e) {
    console.error("Failed to save score to localStorage:", e);
  }
}

    }
})

export const {add,remove,resetGame,updateScore}=scoreSlice.actions;
export default scoreSlice.reducer;