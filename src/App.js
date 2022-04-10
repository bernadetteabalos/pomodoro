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

const Container = styled.div`
  color:${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font};
`

const Label = styled.ul`
list-style: none;
  display: flex;
  text-transform: uppercase;
  font-size: .8rem;
  padding:.3rem .3rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 1.5rem;
`

const TimeContainer = styled.div`
  display: flex;
  padding: 5em;
  align-items: center;
  justify-content: center;
`

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  width: 15rem;
  border-radius: 7.5rem;
  color:#efefef;
  background: ${({ theme }) => theme.colors.accent};
  font-size: 3.5rem;
  box-shadow: 1rem 1.5rem 2rem rgba(0,0,0,0.6);
`

export const Input = styled.input`
  height: 30px;
  width: 30px;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 50%;
  margin-right: 0.3rem;
  text-align: center;
  font-size: 14pt;

`

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
  // console.log(selectedTheme);

  return (
    <>
      {themeLoaded && <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Container >
          <h1>pomodoro {selectedTheme.emoji}</h1>
          <small>let's be productive today!</small>
          {pomodoro !== 0 ?
            <>
              <Label>
                <li>
                  <Button
                    title="Work"
                    active={executing.active === 'work'}
                    onClick={() => setCurrentTimer('work')}
                  />
                </li>
                <li>
                  <Button
                    title="Short Break"
                    active={executing.active === 'short'}
                    onClick={() => setCurrentTimer('short')}
                  />
                </li>
                <li>
                  <Button
                    title="Long Break"
                    active={executing.active === 'long'}
                    onClick={() => setCurrentTimer('long')}
                  />
                </li>
              </Label>
              <div className="button-wrapper">
                <Button title="Settings" onClick={SettingBtn} />
              </div>
              <TimeContainer>
                <TimeWrapper>
                  <CountdownAnimation
                    key={pomodoro}
                    timer={pomodoro}
                    animate={startAnimation}
                    colors={selectedTheme.colors.secondary}
                    trailColor={selectedTheme.colors.trail}
                  >
                    {children}
                  </CountdownAnimation>
                </TimeWrapper>
              </TimeContainer>
              <div className="button-wrapper">
                <Button title="Start" className={!startAnimation ? 'active' : undefined} onClick={startTimer} />
                <Button title="Pause" className={startAnimation ? 'active' : undefined} onClick={pauseTimer} />
              </div>
            </> : <><SetPomodoro />
              <ThemeSelector setter={setSelectedTheme} />
            </>}

        </Container>
      </ThemeProvider>

      }
    </>
  );
}

export default App;
