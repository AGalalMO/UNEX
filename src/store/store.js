import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter";
import CartReducer from "./cart";

console.log({ CartReducer, CounterReducer });

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    cart: CartReducer,
  },
});

const dispatch = store.dispatch;

export { store, dispatch };
