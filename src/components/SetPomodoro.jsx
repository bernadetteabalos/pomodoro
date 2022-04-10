import React, { useState, useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'
import Button from './Button'
import { Input } from '../App'

const SetPomodoro = () => {

    
    const [newTimer, setNewTimer] = useState({
        work: 25,
        short: 5,
        long: 15,
        active: 'work'
    })
    
    const{updateExecute} = useContext(SettingsContext)
    
    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
            
            default: 
                break; 
      }
  }

  const handleSubmit = e => {
      e.preventDefault()
      updateExecute(newTimer)
  }

  return (
    <div className="form-container">
        <form noValidate onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <Input autoComplete="off" type="number" name="work" onChange={handleChange} value={newTimer.work}/>
                <Input autoComplete="off" type="number" name="shortBreak" onChange={handleChange} value={newTimer.short}/>
                <Input autoComplete="off" type="number" name="longBreak" onChange={handleChange} value={newTimer.long}/>
            </div>
            <Button title="Set Timer" type='submit'/>
        </form>

    </div>
  )
}

export default SetPomodoro