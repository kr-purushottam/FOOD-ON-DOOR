import { act, createContext, useReducer, useState } from "react";

const CartContext = createContext({
    items : [], //items to be displayed will be stored here.
    addMeal: (item => {}),
    removeMeal : (id => {})
    // removeMeal : (item => {})
});

export function CartProvider({children}) {

    function cartReducer(state, action) {
        if(action.type === "ITEM_ADDED") {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            let updatedItems = [...state.items];


            if(existingCartItemIndex > -1) {
                const existingItem = updatedItems[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity : existingItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
    

                // --- THIS WILL NOT WORK AS THE action.item refers to the original meal which do not have the propery of quantity(WE HAVE THE QUANTITY PROPERTY IN THE items array specific to CartContext.jsx)
                // const existingItem = {...action.item, quantity : action.item.quantity + 1}
                // updatedItems[existingCartItemIndex] = existingItem;
            } else {
                updatedItems.push({...action.item, quantity : 1});
            }

            return {...state, items: updatedItems};
        }
        if(action.type === "ITEM_REMOVED") {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );

            let updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];

            if(existingItem.quantity === 1) {
                const remainingUpdateItems = updatedItems.filter((item) => item.id !== existingItem.id);
                updatedItems = remainingUpdateItems;
            } else {
                updatedItems[existingItemIndex] = {...existingItem, quantity : existingItem.quantity - 1};
                // This adds another item instead of updating the existing item.
                // updatedItems = [...updatedItems, {...existingItem, quantity : existingItem.quantity - 1}]
            }   
            return {...state, items : updatedItems}
        }

        if(action.type === "AddQuantity") {
            const updatedItems = [...state.items];
            const existingItemIndex =  updatedItems.findIndex(item => item.name === action.mealName);
            const updatedItem = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = {...updatedItem, quantity : updatedItem.quantity + 1}
            return { ...state, items: updatedItems };
        }

        if(action.type === "ReduceQuantity") {
            const updatedItems = [...state.items];
            const existingItemIndex =  updatedItems.findIndex(item => item.name === action.mealName);
            const updatedItem = updatedItems[existingItemIndex];
            if(updatedItem.quantity === 1) {
                const newUpdatedItems = updatedItems.filter(item => item.name !== action.mealName)
                return {...state, items : newUpdatedItems}
            } 
            updatedItems[existingItemIndex] = {...updatedItem, quantity : updatedItem.quantity - 1}
            return { ...state, items: updatedItems };
        }
        return state;
    }
    
    const[ cart , dispatchCartAction ] = useReducer(cartReducer, { items : [] });

    function addMeal(item) {
        dispatchCartAction({type : "ITEM_ADDED", item : item})
        // dispatchCartAction({type : "ITEM_ADDED", item})  --> can also use this as both have same name and allowed in js
    }

    function removeMeal(id) {
        dispatchCartAction({type : "ITEM_REMOVED", id})
        // dispatchCartAction({type : "ITEM_REMOVED", id : id})
        //dispatchCartAction({type : "ITEM_REMOVED", id : id})  --> can also use this as both have same name and allowed in js
    }

    function addQuantityByOne(mealName) {
        dispatchCartAction({type : "AddQuantity", mealName : mealName})
    }

    function reduceQuantityByOne(mealName) {
        dispatchCartAction({type : "ReduceQuantity", mealName : mealName})
    }

    const cartContext = {
        items : cart.items,
        addMeal : addMeal, //added the addMeal property which points to addMeal fn (can be written only addMeal)
        removeMeal : removeMeal, //added the removeMeal property which points to removeMeal fn(can be written only addMeal)
        addQuantityByOne, 
        reduceQuantityByOne
    }




    return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext;