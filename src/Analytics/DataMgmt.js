import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateOdoTriggerStatus, updateDataTriggerStatus, updateOdoDuration } from "../Redux/dataManager"

function DataManagement(props) {
  const { odometers, GameData } = useSelector((state) => state.dataManager)
  const [timer, setTimer] = useState(() => Date.now())
  const [lastTimer, setLastTimer] = useState(Date.now)
  const [tickInterval, setTickInterval] = useState(0)
  const dispatch = useDispatch()
  var intervalHandle

  //useEffect tied to the props parameter passed into the DataManagmement component
  //value passed sets the TickInterval state value
  useEffect(() => {
    setTickInterval(parseInt(props.interval, 10))
  }, [props])

  //setInterval callback established to update timestamp
  useEffect(() => {
    function odoTick() {
      setTimer(() => Date.now())
    }

    if (tickInterval > 0) {
      intervalHandle = setInterval(odoTick, tickInterval)
    } else {
      clearInterval(intervalHandle)
    }
  }, [tickInterval])

  //useEffect tied to the odometers array
  //monitors for changes in the odometer durations, and compares against
  //all "limit events" in the odometer array
  useEffect(() => {
    //check for triggers
    odometers.forEach((odo, odoIndex) => {
      odo.LimitFlags.forEach((flag, triggerIndex) => {
        if (odo.duration >= flag.limit) {
          dispatch(updateOdoTriggerStatus({ odoIndex: odoIndex, triggerIndex: triggerIndex, status: "triggered" }))
        }
      })
    })
  }, [odometers])

  //useEffect tied to the timer tick in state
  //updates all the "active" odometers in the array
  //and manages the old time versus new time
  useEffect(() => {
    odometers.forEach((odo, odoIndex) => {
      if (odo.activeStatus) {
        //dispatch(updateOdoRunningTime({ odoIndex: odoIndex, timestamp: timer }))
        let duration = odo.duration
        console.log("duration: ", duration)
        duration += timer - lastTimer
        console.log("duration: ", duration, "timer: ", timer, "old time: ", lastTimer)

        dispatch(updateOdoDuration({ odoIndex: odoIndex, duration: duration }))
      }
      setLastTimer(timer)
    })
  }, [timer])

  //useEffect tied to the GameData array
  //monitors for changes in the GameData values, and compares against
  //all "limit events" in the GameData array
  useEffect(() => {
    //loopthrough gamedata object triggers, and change trigger status if conditions met
    if (GameData.length) {
      GameData.forEach((data) => {
        if (data.LimitFlags.length) {
          data.LimitFlags.forEach((LimitFlag, triggerIndex) => {
            if (data.value >= LimitFlag.limit) {
              dispatch(updateDataTriggerStatus({ key: data.key, triggerIndex: triggerIndex, status: "triggered" }))
            }
          })
        }
      })
    }
  }, [GameData])

  return null
}

export default DataManagement
