import SetPomodoro from "./components/SetPomodoro";
import Button from "./components/Button";
import CountdownAnimation from "./components/CountdownAnimation";
import { useContext, useEffect } from "react";
import { SettingsContext } from "./context/SettingsContext";

function App() {
  const {
    pomodoro, 
    executing, 
    setCurrentTimer, 
    SettingBtn, 
    children,
    startAnimation,
    startTimer,
    pauseTimer,
    updateExecute
  } = useContext(SettingsContext)

  useEffect(() => {updateExecute(executing)}, [updateExecute, executing, startAnimation])

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <small>Be productive the right way.</small>
        {pomodoro !== 0 ? 
          
          <>
          <ul className="labels">
            <li>
              <Button 
                title="Work"
                activeClass={executing.active === 'work' ? 'active-label' : undefined}
                _callback={() => setCurrentTimer('work')}
              />
            </li>
            <li>
              <Button 
                title="Short Break"
                activeClass={executing.active === 'short' ? 'active-label' : undefined}
                _callback={() => setCurrentTimer('short')}
              />
            </li>
            <li>
              <Button 
                title="Long Break"
                activeClass={executing.active === 'long' ? 'active-label' : undefined}
                _callback={() => setCurrentTimer('long')}
              />
            </li>
          </ul>
          <Button title="Settings" _callback={SettingBtn} />
          <div className="timer-container">
            <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimation}
              >
                {children}
              </CountdownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <Button title="Start" className={!startAnimation ? 'active' : undefined} _callback={startTimer} />
            <Button title="Pause" className={startAnimation ? 'active' : undefined} _callback={pauseTimer} />
          </div>
          </> : <SetPomodoro/> }
        
    </div>
  );
}

export default App;
