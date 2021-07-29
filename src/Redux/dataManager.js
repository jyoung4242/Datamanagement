import { createSlice } from "@reduxjs/toolkit"

/**
 *  Creation of redux state slice
 *  initial state defines both Global and Local key arrays as empty
 * */

export const dataMgr = createSlice({
  name: "dataManager",
  initialState: {
    odometers: [],
    GameData: [],
  },
  reducers: {
    /**
     * regData
     * creates the GameDataObject in the array GameData to be
     * accessed later, must happen first
     * action.payload must be an object of
     * {key: "gold",value: 0,  LimitFlags: {}}
     */

    regData: (state, action) => {
      //data validation
      const { key, value } = action.payload
      if (typeof key !== "string") return
      if (isNaN(value)) return
      state.GameData.push(action.payload)
    },

    /**
     * setDataByKey
     * sets the value attribute for the GameDataObject in the array
     * action.payload must be an object of
     * { key: "keyname", value: 0,}
     */

    setDataByKey: (state, action) => {
      const { key, value } = action.payload
      if (typeof key !== "string") return
      if (isNaN(value)) return
      const index = state.GameData.findIndex((data) => data.key === action.payload.key)
      if (index >= 0) {
        state.GameData[index].value = action.payload.value
      }
    },

    /**
     * incDataByKey
     * increments the value attribute in the GameDataObject array
     * action.payload must be an object of
     * { key: "keyname", value: 0 }
     */

    incDataByKey: (state, action) => {
      const { key, value } = action.payload
      if (typeof key !== "string") return
      if (isNaN(value)) return
      const index = state.GameData.findIndex((data) => data.key === action.payload.key)
      if (index >= 0) {
        state.GameData[index].value = state.GameData[index].value + action.payload.value
      }
    },
    /**
     * decDataByKey
     * decrements the value attribute in the GameDataObject array
     * action.payload must be an object of
     * { key: "keyname",  value: 0,}
     */
    decDataByKey: (state, action) => {
      const { key, value } = action.payload
      if (typeof key !== "string") return
      if (isNaN(value)) return
      const index = state.GameData.findIndex((data) => data.key === action.payload.key)
      if (index >= 0) {
        state.GameData[index].value = state.GameData[index].value - action.payload.value
      }
    },
    /**
     * createLimitFlag
     * creates the GameDataObject in the array GameData to be
     * accessed later, must happen first
     * action.payload must be an object of
     * { key: "keyname",  LimitFlag: { key: "LimitName",  limit: 0, status: ready,}}
     */

    createLimitFlag: (state, action) => {
      const { key, Limit } = action.payload
      if (typeof key !== "string") return
      const index = state.GameData.findIndex((data) => data.key === key)
      if (index >= 0) {
        state.GameData[index].LimitFlags.push(Limit)
      }
    },

    /**
     * createOdo
     * creates the Odometer object in the array odometers to be
     * accessed later, must happen first
     * action.payload must be an object of
     * {key: "duration played", duration: 0, activeStatus: false, LimitFlags: []}
     */

    createOdo: (state, action) => {
      //data validation
      const { key } = action.payload
      if (typeof key !== "string") return

      state.odometers.push(action.payload)
    },
    /**
     * resetOdo:
     * sets the runningTotal back to zero
     * action.payload must be an object,
     * {key: "duration played"}
     */
    resetOdo: (state, action) => {
      const { key } = action.payload
      const index = state.odometers.findIndex((data) => data.key === key)
      if (index >= 0) {
        state.odometers[index].duration = 0
      }
    },

    /**
     * createOdoLimit
     * creates the odometer LimitFlags object in the array odometerObject to be
     * accessed later, must happen first
     * action.payload must be an object of
     * {key: "duration played",
        Limit: {key: "duration1",limit: 8000,status: "ready",},
     */
    createOdoLimit: (state, action) => {
      const { key, Limit } = action.payload
      if (typeof key !== "string") return
      const index = state.odometers.findIndex((data) => data.key === key)
      if (index >= 0) {
        state.odometers[index].LimitFlags.push(Limit)
      }
    },

    /**
     * updateOdoTriggerStatus
     * this is how you modify the status of a limit trigger, either via event handler, or discretly to reset
     * action.payload contians the index of the odometer timer, then the subsequnt index of the limit, then status string
     */

    updateOdoTriggerStatus: (state, action) => {
      const { odoIndex, triggerIndex, status } = action.payload
      state.odometers[odoIndex].LimitFlags[triggerIndex].status = status
    },
    /**
     * updateDataTriggerStatus
     * this is how you modify the status of a limit trigger, either via event handler, or discretly to reset
     * action.payload contians the string key of the data element, then the subsequnt index of the limit, then status string
     *
     */

    updateDataTriggerStatus: (state, action) => {
      const { key, triggerIndex, status } = action.payload
      const index = state.GameData.findIndex((data) => data.key === key)
      state.GameData[index].LimitFlags[triggerIndex].status = status
    },

    /**
     * startOdo
     * this dispatch updates the timestamps and activeStatus for an odometer in the array
     * you simply pass a key for the odo to the dispatch, and it updates  activeStatus to true
     */

    startOdo: (state, action) => {
      const { key } = action.payload
      const index = state.odometers.findIndex((data) => data.key === key)
      state.odometers[index].activeStatus = true
    },
    /**
     * stopOdo
     * this dispatch updates the timestamps and activeStatus for an odometer in the array
     *you simply pass a key for the odo to the dispatch, and it updates  activeStatus to false
     */
    stopOdo: (state, action) => {
      const { key } = action.payload
      const index = state.odometers.findIndex((data) => data.key === key)
      state.odometers[index].activeStatus = false
    },
    /**
     * updateOdoDuration
     * this dispatch updates the duration attribute, and activeStatus for an odometer in the array
     * payload is {key: "duration played", duration: 1000} duration in milliseconds
     */
    updateOdoDuration: (state, action) => {
      const { odoIndex, duration } = action.payload
      if (odoIndex >= 0) {
        state.odometers[odoIndex].duration = duration
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateOdoDuration, regData, setDataByKey, incDataByKey, decDataByKey, createOdo, resetOdo, startOdo, stopOdo, createLimitFlag, createOdoLimit, updateDataTriggerStatus, updateOdoTriggerStatus } = dataMgr.actions

export default dataMgr.reducer
