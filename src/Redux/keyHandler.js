import { createSlice } from "@reduxjs/toolkit"

/**
 *  Creation of redux state slice
 *  initial state defines both Global and Local key arrays as empty
 * */

export const keySlice = createSlice({
  name: "keyHandler",
  initialState: {
    LocalKeys: [],
    GlobalKeys: [],
  },
  reducers: {
    /**
     *  regKey
     *  takes in object as {Key, pressed, scope}
     *  Key is key code string from evenlistener (e.key)
     *  pressed is default status flag boolean
     *  scope is either "global" or "local" else its ignored
     * */
    regKey: (state, action) => {
      const { Key, pressed, scope } = action.payload
      if (scope === "global") {
        state.GlobalKeys.push({ Key, pressed })
      } else if (scope === "local") {
        state.LocalKeys.push({ Key, pressed })
      }
      //do nothing if junk data
    },
    /**
     *  unregKey
     *  takes in string as either "global" or "local" else its ignored
     *  it resets the corresponding state array to empty based on which value is passed
     * */
    unregKey: (state, action) => {
      if (action.payload === "global") {
        state.GlobalKeys = []
      } else if (action.payload === "local") {
        state.LocalKeys = []
      }
      //do nothing if junk data
    },
    /**
     *  setKey
     *  payload is key code string from e.key and set's pressed status to true
     *  it searches global array first for key string, then local array
     *  does nothing if not found, if it finds in global, then local isn't searched
     * */
    setKey: (state, action) => {
      //check Global first
      const index = state.GlobalKeys.findIndex((key) => key.Key === action.payload)
      if (index >= 0) {
        state.GlobalKeys[index].pressed = true
      } else {
        //then Local
        const index = state.LocalKeys.findIndex((key) => key.Key === action.payload)
        if (index >= 0) {
          state.LocalKeys[index].pressed = true
        }
      }
    },
    /**
     *  unsetKey
     *  payload is key code string from e.key and set's pressed status to false
     *  it searches global array first for key string, then local array
     *  does nothing if not found, if it finds in global, then local isn't searched
     * */
    unsetKey: (state, action) => {
      //check Global first
      const index = state.GlobalKeys.findIndex((key) => key.Key === action.payload)
      if (index >= 0) {
        state.GlobalKeys[index].pressed = false
      } else {
        //then Local
        const index = state.LocalKeys.findIndex((key) => key.Key === action.payload)
        if (index >= 0) {
          state.LocalKeys[index].pressed = false
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { regKey, unregKey, setKey, unsetKey } = keySlice.actions

export default keySlice.reducer
