import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      let existingItem = state.items.find(item => item.name === name);
      if (existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({name, image, cost, quantity: 1})
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem){
        if (existingItem.quantity === 1){
          state.items = state.items.filter(item => item !== existingItem);
        }else{
          existingItem.quantity--;
        }
      }
    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem){
        existingItem.quantity = quantity;
      }
    },
}});

export const { addItem, removeItem, deleteItem } = CartSlice.actions;

export default CartSlice.reducer;
