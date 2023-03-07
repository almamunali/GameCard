import { createSlice } from "@reduxjs/toolkit";


const CardSlice=createSlice({
    name:"CardAllGame",
    initialState:{
        CardGames:[],
        item:"gameData",
        totalPrice:0,
        totalQuantity:0
    },
    reducers:{
        AddCardItem:(state,action)=>{
            const itemIndex=state.CardGames.findIndex((item)=>item.id===action.payload.id);
            if(itemIndex >=0){
                state.CardGames[itemIndex].cartQuantity +=1
            }else{
                const tempGame={...action.payload,cartQuantity:1};
                state.CardGames.push(tempGame);
            }
            
        },
        removedCartGame:(state,action)=>{
            const gameId =action.payload;
            state.CardGames=state.CardGames.filter((item)=> item.id!==gameId)
        },
        DecrementQuantity:(state,action)=>{
            const gameId =action.payload.id
            const itemIndex=state.CardGames.findIndex((item)=>item.id===action.payload.id);
            if(state.CardGames[itemIndex].cartQuantity >1){
                state.CardGames[itemIndex].cartQuantity -=1
            }else if(state.CardGames[itemIndex].cartQuantity ===1){
                state.CardGames=state.CardGames.filter((item)=> item.id!==gameId)
            }
            
        },
        GetTotalPrice:(state,action)=>{
            let {total,quantity}=state.CardGames.reduce((acc,curr)=>{
                const {price,cartQuantity}=curr;
                const gamePrice=price *cartQuantity;

                acc.total +=gamePrice;
                acc.quantity +=cartQuantity
                return acc;

            },{
                total:0,
                quantity:0
            })

            state.totalQuantity=quantity;
            state.totalPrice=total;


        }



    }
    
})

export  const CardsAction = CardSlice.actions;
export default CardSlice.reducer;