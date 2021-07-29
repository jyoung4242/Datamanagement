import React, { useEffect, useRef } from "react"

import { regKey, unregKey } from "../Redux/keyHandler"
import { useSelector, useDispatch } from "react-redux"
import { setDataByKey, decDataByKey, incDataByKey } from "../Redux/dataManager"
import { useHistory } from "react-router-dom"

/**
 *  Almost identical to Screen1.js, please refer to that file for comments
 *  and documentation
 * */
function Screen2() {
  const { LocalKeys } = useSelector((state) => state.keyHandler)
  const dispatch = useDispatch()
  const enemyInputRef = useRef(null)
  const xpInputRef = useRef(null)
  let history = useHistory()

  useEffect(() => {
    //register component keypresses
    dispatch(regKey({ Key: "j", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "k", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "l", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "s", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "1", pressed: false, scope: "local" }))
    return () => {
      dispatch(unregKey("local"))
    }
  }, [])

  //KeyEvent Exception Statement
  function allowKeystroke() {
    if (document.activeElement !== enemyInputRef.current && document.activeElement !== xpInputRef.current) return true
    return false
  }

  //Key Events
  useEffect(() => {
    if (allowKeystroke()) {
      {
        //j button
        let index = LocalKeys.findIndex((key) => key.Key === "j")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            dispatch(setDataByKey({ key: "enemies defeated", value: 0 }))
            dispatch(setDataByKey({ key: "experience", value: 0 }))
          }
        }
      }

      {
        //s button
        let index = LocalKeys.findIndex((key) => key.Key === "k")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            console.log("Screen2 k pressed")
          }
        }
      }

      {
        //a button
        let index = LocalKeys.findIndex((key) => key.Key === "l")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            console.log("Screen2 l pressed")
          }
        }
      }

      {
        //s button
        let index = LocalKeys.findIndex((key) => key.Key === "s")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            console.log("Screen2 s pressed")
            history.push("/s3")
          }
        }
      }

      {
        //1 button
        let index = LocalKeys.findIndex((key) => key.Key === "1")
        if (index >= 0) {
          if (LocalKeys[index].pressed) {
            console.log("Screen2 1 pressed")
            history.push("/")
          }
        }
      }
    }
  }, [LocalKeys])

  /**
   * Handler functions for onscreen buttons
   */
  function handleEnemyClick() {
    const gld = parseInt(enemyInputRef.current.value, 10)
    dispatch(setDataByKey({ key: "enemies defeated", value: gld }))
  }
  function handleXPClick() {
    const xp = parseInt(xpInputRef.current.value, 10)
    dispatch(setDataByKey({ key: "experience", value: xp }))
  }
  function handleEnemyIncClick() {
    const gld = parseInt(enemyInputRef.current.value, 10)
    dispatch(incDataByKey({ key: "enemies defeated", value: gld }))
  }
  function handleEnemyDecClick() {
    const gld = parseInt(enemyInputRef.current.value, 10)
    dispatch(decDataByKey({ key: "enemies defeated", value: gld }))
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
      <h1>Screen 2</h1>
      <h2>Heading Indicator - Status Idle</h2>
      <div className="enemy_controls" style={{ border: "1px black solid" }}>
        <input ref={enemyInputRef} type="numeric" id="enemy" />
        <label htmlFor="enemy">Enemies Defeated</label>
        <button onClick={handleEnemyClick} id="Gold">
          Set Enemy Defeated
        </button>
        <div className="incdec">
          <button onClick={handleEnemyIncClick}>Inc</button>
          <button onClick={handleEnemyDecClick}>Dec</button>
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
      <h1>KEYS 1 AND s ARE NAVIGATION HOTKEYS</h1>
      <p>Screen2 keypresses mapped: </p>
      <p>j button resets to defaults</p>
      <p>k button resets Enemy Defeated data Event</p>
      <p>l button resets Exp data Event</p>
    </div>
  )
}

export default Screen2
