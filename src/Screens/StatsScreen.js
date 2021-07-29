import React, { useEffect } from "react"
import { regKey, unregKey } from "../Redux/keyHandler"
import { useSelector, useDispatch } from "react-redux"
import {} from "../Redux/dataManager"
import { useHistory } from "react-router-dom"

/**
 *  Almost identical to Screen1.js, please refer to that file for comments
 *  and documentation
 * */
function StatsScreen() {
  const { LocalKeys } = useSelector((state) => state.keyHandler)
  const { GameData, odometers } = useSelector((state) => state.dataManager)
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    //register component keypresses
    dispatch(regKey({ Key: "1", pressed: false, scope: "local" }))
    dispatch(regKey({ Key: "2", pressed: false, scope: "local" }))

    return () => {
      dispatch(unregKey("local"))
    }
  }, [])

  //Key Events
  useEffect(() => {
    {
      //1 button pressed for Navigation
      let index = LocalKeys.findIndex((key) => key.Key === "1")
      if (index >= 0) {
        if (LocalKeys[index].pressed) {
          console.log("Screen3 1 pressed")
          history.push("/")
        }
      }
    }

    {
      //2 button pressed for Navigation
      let index = LocalKeys.findIndex((key) => key.Key === "2")
      if (index >= 0) {
        if (LocalKeys[index].pressed) {
          console.log("Screen3 2 pressed")
          history.push("/s2")
        }
      }
    }
  }, [LocalKeys])

  /**
   * msToTime, converts ms durations into
   *  hours, minutes, seconds string for display
   */
  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return hours + ":" + minutes + ":" + seconds
  }

  //JSX for form
  return (
    <div>
      <h1>STATS!!!!</h1>
      <table>
        <tbody>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>

          {GameData.map((data, index) => (
            <tr key={index}>
              <td>{data.key}</td>
              <td>{data.value}</td>
            </tr>
          ))}

          {odometers.map((odo, index) => (
            <tr key={index}>
              <td>{odo.key}</td>
              <td>{msToTime(odo.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>Limit Trigger Name</th>
            <th>Index</th>
            <th>Limit Value</th>
            <th>Status</th>
          </tr>

          {GameData.map((data, index) =>
            data.LimitFlags.map((flag, flagIndex) => (
              <tr key={index}>
                <td>{flag.key}</td>
                <td>{flagIndex}</td>
                <td>{flag.limit}</td>
                <td>{flag.status}</td>
              </tr>
            ))
          )}

          {odometers.map((odo, index) =>
            odo.LimitFlags.map((flag, flagIndex) => (
              <tr key={index}>
                <td>{flag.key}</td>
                <td>{flagIndex}</td>
                <td>{flag.limit}</td>
                <td>{flag.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h1>KEYS 1 AND 2 ARE NAVIGATION HOTKEYS</h1>
    </div>
  )
}
export default StatsScreen
