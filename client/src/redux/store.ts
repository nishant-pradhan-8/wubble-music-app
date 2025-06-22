import { configureStore } from '@reduxjs/toolkit'
import trackReducer from "./trackSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
     track: trackReducer,
     theme: themeReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store