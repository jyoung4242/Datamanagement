import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setKey, unsetKey } from "../Redux/keyHandler"

/**
 *  KeyBoardEvents component
 *  returns null due to zero UI impact
 *  sets up KeyUp and KeyDown event listeners
 *  also cleans up when unmounting
 * */
function KeyBoardEvents() {
  const dispatch = useDispatch()

  useEffect(() => {
    //KeyUp callback, which sends e.key to redux
    function KeyUp(e) {
      dispatch(unsetKey(e.key))
    }
    //KeyDown callback, which sends e.key to redux
    function KeyDown(e) {
      dispatch(setKey(e.key))
    }

    //defines event listeners
    window.addEventListener("keydown", KeyDown)
    window.addEventListener("keyup", KeyUp)

    return () => {
      //cleans up event listeners
      window.removeEventListener("keydown", KeyDown)
      window.removeEventListener("keyup", KeyUp)
    }
  }, [])

  return null
}

export default KeyBoardEvents
