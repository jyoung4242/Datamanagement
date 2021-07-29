import { configureStore } from "@reduxjs/toolkit"
import keyReducer from "./keyHandler"
import dataManager from "./dataManager"

export default configureStore({
  reducer: {
    keyHandler: keyReducer,
    dataManager: dataManager,
  },
})
