import SetPomodoro from "./components/SetPomodoro";
import Button from "./components/Button";
import CountdownAnimation from "./components/CountdownAnimation";
import { useState, useContext, useEffect } from "react";
import { SettingsContext } from "./context/SettingsContext";
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import ThemeSelector from './ThemeSelector';

function App() {
  const {
    pomodoro,
    executing,
    startAnimation,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingBtn } = useContext(SettingsContext)

  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  useEffect(() => { updateExecute(executing) }, [updateExecute, executing, startAnimation])

  // function generateKey() {
  //   return Math.floor(Math.random() * 100)
  // }

  return (
    <div className="container">
      {themeLoaded && <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <div style={{ fontFamily: selectedTheme.font }}>
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
            </> : <><SetPomodoro />
              <ThemeSelector setter={setSelectedTheme} />
            </>}

        </div>
      </ThemeProvider>

      }
    </div>
  );
}

export default App;
