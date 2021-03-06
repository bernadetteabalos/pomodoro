import { useContext } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { SettingsContext } from '../context/SettingsContext'

const CountdownAnimation = ({id, timer, animate, colors, trailColor, children}) => {

  const {stopTimer} = useContext(SettingsContext)

  return (
        <CountdownCircleTimer
            key={id}
            isPlaying={animate}
            duration={ timer * 60 }
            colors={colors}
            strokeWidth={6}
            size={220}
            trailColor={trailColor}
            onComplete={ () => {
              stopTimer()
            }}
        >
            {children}
        </CountdownCircleTimer>
  )
}

export default CountdownAnimation