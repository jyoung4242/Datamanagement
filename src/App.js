import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

/**
 *  imports for redux toolkit
 *  keyHandler is store for keyboard state
 *  KeyboardEvents is the actual component setup of event handlers
 *  DataManagement is the actual component setup of data event handlers
 */
import { useSelector, useDispatch } from "react-redux"
import { regKey, unregKey } from "./Redux/keyHandler"
import KeyBoardEvents from "./Controls/KeyboardEvents"
import { createOdo, regData, createLimitFlag, startOdo, stopOdo, createOdoLimit } from "./Redux/dataManager"
import DataManagement from "./Analytics/DataMgmt"

/**
 *  imports for screen management
 *  simulating multiple screens in a game, think title screen, invetory screen, top-down map screen etc...
 * */

import Screen1 from "./Screens/screen1"
import Screen2 from "./Screens/screen2"
import StatsScreen from "./Screens/StatsScreen"

function App() {
  /**
   *  GlobalKeys is the redux state array for globally scoped keys that are registered
   *  dispatch gives us access to the regKey and unregKey action creators
   * */
  const { GlobalKeys } = useSelector((state) => state.keyHandler)
  const dispatch = useDispatch()

  /**
   *  Initial lifecycle mounting useEffect
   *  Job is to register specific global keys that will be monitored for lifecycle of entire app
   * */

  useEffect(() => {
    //register global keypresses - see keyHandler.js for explanation of regkey and unregKey action creators
    //registering the Escape key and the SpaceBar globally
    dispatch(regKey({ Key: "Escape", pressed: false, scope: "global" }))
    dispatch(regKey({ Key: " ", pressed: false, scope: "global" }))

    /**
     * Setup Game Data Elements
     * gold, experience, and enemies defeated
     * gold and experience i dynamically created the dataLimits objects at registration time
     * below on enemies defeated, i seperated the dataLimit object out to test the method
     */

    dispatch(
      regData({
        key: "gold",
        value: 0,
        LimitFlags: [
          {
            key: "goldLimit1",
            limit: 10,
            status: "ready",
          },
        ],
      })
    )
    dispatch(
      regData({
        key: "experience",
        value: 0,
        LimitFlags: [
          {
            key: "xpLimit1",
            limit: 5,
            status: "ready",
          },
        ],
      })
    )
    dispatch(regData({ key: "enemies defeated", value: 0, LimitFlags: [] }))

    //just for demonstration purpose, create LimitFlag for enemies as a seperate function
    dispatch(
      createLimitFlag({
        key: "enemies defeated",
        Limit: {
          key: "enemyLimit1",
          limit: 3,
          status: "ready",
        },
      })
    )

    /**
     * Duration played odometer object, tracks how long you've "played" and creates the 8 second limit event seperately
     */
    dispatch(createOdo({ key: "duration played", duration: 0, activeStatus: false, LimitFlags: [] }))

    //startOdo dispatch changes the activeStatus flag to true
    dispatch(startOdo({ key: "duration played" }))

    //just for demonstration purpose, create LimitFlag for duration played as a seperate function
    dispatch(
      createOdoLimit({
        key: "duration played",
        Limit: {
          key: "duration1",
          limit: 8000,
          status: "ready",
        },
      })
    )

    return () => {
      //unregistering them for cleanup
      dispatch(unregKey("global"))
    }
  }, [])

  //Keyboard Event Logic - Globally scoped keys
  //useEffect that has GlobalKeys dependancy, for monitoring changes in keyboard state
  useEffect(() => {
    {
      //Escape button
      let index = GlobalKeys.findIndex((key) => key.Key === "Escape")
      if (index >= 0) {
        if (GlobalKeys[index].pressed) {
          //Add Logic here for Escape button
          console.log("Global Esc pressed")
        }
      }
    }

    {
      //Space button
      let index = GlobalKeys.findIndex((key) => key.Key === " ")
      if (index >= 0) {
        //Add Logic here for Escape button
        if (GlobalKeys[index].pressed) {
          console.log("Global Space pressed")
        }
      }
    }
  }, [GlobalKeys])

  /**
   * Handler functions for onscreen buttons
   */
  function handleStartClick() {
    dispatch(startOdo({ key: "duration played" }))
  }
  function handleStopClick() {
    dispatch(stopOdo({ key: "duration played" }))
  }

  //Container JSX
  //This uses react router to switch between screens
  //<KeyBoardEvents /> component is added, with no UI impact to allow for access
  return (
    <div className="App">
      <div className="Globals">
        <h1>Global keypresses:</h1>
        <p>ESC key and SpaceBar will console out</p>

        <div>
          <button onClick={handleStartClick}>Start Timer</button>
          <button onClick={handleStopClick}>Stop Timer</button>
        </div>
      </div>
      <KeyBoardEvents />
      <DataManagement interval="1000" />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Screen1</Link>
              </li>
              <li>
                <Link to="/s2">Screen2</Link>
              </li>
              <li>
                <Link to="/s3">Stats Screen</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/s2">
            <Screen2 />
          </Route>
          <Route path="/s3">
            <StatsScreen />
          </Route>
          <Route path="/">
            <Screen1 />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
