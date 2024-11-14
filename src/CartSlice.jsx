import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      console.log('state-',state,'action-',action)
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const { name, quantity } = action.payload;
      console.log('action',action,action.type)
      state.items = state.items.filter(item => item.name !== name);

    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      console.log('action',action.payload)
      const itemToUpdate = state.items.find(item => item.name === name);
      if(action.payload.todo === 'increment'){
        if (itemToUpdate) {
          console.log('itemToUpdate',itemToUpdate.quantity)
          itemToUpdate.quantity++;
        }
      }
      if(action.payload.todo === 'decrement'){
        if (itemToUpdate  && itemToUpdate.quantity > 0) {
          console.log('itemToUpdate',itemToUpdate.quantity)
          itemToUpdate.quantity--;
        }
      }
      console.log('state-item',state.items)
    }
  },

});

export const { addItem, removeItem, updateQuantity, decrementItem } = CartSlice.actions;

export default CartSlice.reducer;
