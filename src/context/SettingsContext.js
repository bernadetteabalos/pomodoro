import { createContext, useState } from 'react'

export const SettingsContext = createContext()

const SettingsContextProvider = (props) => {

  const [pomodoro, setPomodoro] = useState(0)
  const [executing, setExecuting] = useState({})
  const [startAnimation, setStartAnimation] = useState(false)

  function startTimer() {
    setStartAnimation(true)
  }

  function pauseTimer() {
    setStartAnimation(false)
  }

  function stopTimer() {
    setStartAnimation(false)
  }

  const SettingBtn = () => {
    setExecuting({})
    setPomodoro(0)
  }

  function setCurrentTimer(active_state) {
    updateExecute({ 
      ...executing,
      active: active_state
    })
    setTimerTime(executing)
    stopTimer()
  }

  const updateExecute = (updatedSettings) => {
    setExecuting(updatedSettings)
    setTimerTime(updatedSettings)
  }

  const setTimerTime = evaluate => {
    switch (evaluate.active) {
      case 'work':
        setPomodoro(evaluate.work)
        break;
      case 'short':
        setPomodoro(evaluate.short)
        break;
      case 'long':
        setPomodoro(evaluate.long)
        break;

      default:
        setPomodoro(0)
        break;
    }
  }

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    let seconds = remainingTime % 60
    if (minutes === 0) {
      return `${seconds}`
    }
    if (seconds === 0) {
      seconds = remainingTime % 60 + "0"
    }
    if (minutes >= 1 && seconds < 10 && seconds > 0 ) {
      return `${minutes}:0${seconds}`
    }

    return `${minutes}:${seconds}`

    
  }

  return (
    <SettingsContext.Provider 
    value={{ 
      pomodoro, 
            executing,
            updateExecute, 
            startAnimation, 
            startTimer,
            pauseTimer,
            children,
            SettingBtn,
            setCurrentTimer,
            stopTimer
      }}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider