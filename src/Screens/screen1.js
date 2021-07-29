import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

/**
 *  imports for redux toolkit
 *  keyHandler is store for keyboard state
 *  KeyboardEvents is the actual component setup of event handlers
 */
import { regKey, unregKey } from "../Redux/keyHandler"
import { setDataByKey, decDataByKey, incDataByKey, updateDataTriggerStatus } from "../Redux/dataManager"

function Screen1() {
  /**
   *  LocallKeys is the redux state array for locally scoped keys that are registered
   *  dispatch gives us access to the regKey and unregKey action creators
   * */
  const { LocalKeys } = useSelector((state) => state.keyHandler)
  const dispatch = useDispatch()
  const goldInputRef = useRef(null)
  const xpInputRef = useRef(null)
  let history = useHistory()

  useEffect(() => {
    //register component keypresses
    //see keyHandler.js for explanation of regkey and unregKey action creators
    //registering the a,s,d, and f keys for just this component
    dispatch(regKey({ Key: "a", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "s", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "d", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "f", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "2", pressed: false, scope: "local" }))
    return () => {
      //unregistering them for cleanup, this happens when you switch screens, very important
      dispatch(unregKey("local"))
    }
  }, [])

  //KeyEvent Exception Statement
  function allowKeystroke() {
    if (document.activeElement !== goldInputRef.current && document.activeElement !== xpInputRef.current) return true
    return false
  }

  //Keyboard Event Logic - locally scoped keys
  //useEffect that has LocalKeys dependancy, for monitoring changes in keyboard state
  useEffect(() => {
    if (allowKeystroke()) {
      {
        //a button, resets the gold and experience data values in state
        let index = LocalKeys.findIndex((key) => key.Key === "a")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            dispatch(setDataByKey({ key: "gold", value: 0 }))
            dispatch(setDataByKey({ key: "experience", value: 0 }))
          }
        }
      }

      {
        //s button navigation to stats screen
        let index = LocalKeys.findIndex((key) => key.Key === "s")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            //Add Logic here for s button
            console.log("Screen1 s pressed")
            console.log("jumping to stats screen")
            history.push("/s3")
          }
        }
      }

      {
        //d button sets gold limit to ready status
        let index = LocalKeys.findIndex((key) => key.Key === "d")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            //Add Logic here for d button
            console.log("Screen1 d pressed")
            dispatch(updateDataTriggerStatus({ key: "gold", triggerIndex: 0, status: "ready" }))
          }
        }
      }

      {
        //f button. sets experience limit to ready status
        let index = LocalKeys.findIndex((key) => key.Key === "f")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            //Add Logic here for f button
            console.log("Screen1 f pressed")
            dispatch(updateDataTriggerStatus({ key: "experience", triggerIndex: 0, status: "ready" }))
          }
        }
      }

      {
        //2 button for navigation to "screen 2"
        let index = LocalKeys.findIndex((key) => key.Key === "2")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            //Add Logic here for f button
            console.log("Screen1 2 pressed")
            history.push("/s2")
          }
        }
      }
    }
  }, [LocalKeys])

  /**
   * Handler functions for onscreen buttons
   */
  function handleGoldClick() {
    const gld = parseInt(goldInputRef.current.value, 10)
    dispatch(setDataByKey({ key: "gold", value: gld }))
  }
  function handleXPClick() {
    const xp = parseInt(xpInputRef.current.value, 10)
    dispatch(setDataByKey({ key: "experience", value: xp }))
  }
  function handleGoldIncClick() {
    const gld = parseInt(goldInputRef.current.value, 10)
    dispatch(incDataByKey({ key: "gold", value: gld }))
  }
  function handleGoldDecClick() {
    const gld = parseInt(goldInputRef.current.value, 10)
    dispatch(decDataByKey({ key: "gold", value: gld }))
  }
  function handleXPIncClick() {
    const xp = parseInt(xpInputRef.current.value, 10)
    dispatch(incDataByKey({ key: "experience", value: xp }))
  }
  function handleXPDecClick() {
    const xp = parseInt(xpInputRef.current.value, 10)
    dispatch(decDataByKey({ key: "experience", value: xp }))
  }

  return (
    <div>
      <h1>Screen1</h1>
      <h2>Heading Indicator - Status Idle</h2>
      <div className="gold_controls" style={{ border: "1px black solid" }}>
        <input ref={goldInputRef} type="numeric" id="gold" />
        <label htmlFor="gold">Gold</label>
        <button id="Gold" onClick={handleGoldClick}>
          Set Gold
        </button>
        <div className="incdec">
          <button onClick={handleGoldIncClick}>Inc</button>
          <button onClick={handleGoldDecClick}>Dec</button>
        </div>
      </div>
      <div className="experience" style={{ border: "1px black solid" }}>
        <input ref={xpInputRef} type="numeric" name="experience" id="exp" />
        <label htmlFor="exp">Experience</label>
        <button onClick={handleXPClick} id="experience">
          Set Experience
        </button>
        <div className="incdec">
          <button onClick={handleXPIncClick}>Inc</button>
          <button onClick={handleXPDecClick}>Dec</button>
        </div>
      </div>
      <h1>KEYS 2 AND s ARE NAVIGATION HOTKEYS</h1>
      <p>Screen1 keypresses mapped: </p>
      <p>a button resets to defaults</p>
      <p>d button resets Gold data Event</p>
      <p>f button resets Exp data Event</p>
    </div>
  )
}

export default Screen1
