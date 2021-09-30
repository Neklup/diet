import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MealList from '../components/MealList'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {
  Button,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  TextField, Tooltip, Dialog, DialogTitle, Typography, DialogContent, DialogActions,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

function ChooseFoodContainer() {
  const [breakfasts, setBreakfasts] = useState([])
  const [lunches, setLunches] = useState([])
  const [dinners, setDinners] = useState([])
  const [gender, setGender] = useState('')
  const [calories, setCalories] = useState(2000)

  const handleChange = (e) => setGender(e.target.value)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {setOpen(false)
  };
  useEffect(async () => {
    const result = await axios('http://localhost:8080/meal/list')
    result.data.forEach((meal) => (meal.isChecked = false))
    setBreakfasts(result.data.filter((meal) => meal.mealType === 'BREAKFAST'))
    setLunches(result.data.filter((meal) => meal.mealType === 'LUNCH'))
    setDinners(result.data.filter((meal) => meal.mealType === 'DINNER'))
  }, [])
  const selectedMeals = [
    ...breakfasts.filter((meal) => meal.isChecked),
    ...lunches.filter((meal) => meal.isChecked),
    ...dinners.filter((meal) => meal.isChecked),
  ]
  return (
   <React.Fragment>
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center">
            <Typography color={'primary'} variant={"h2"} >
              Create your diet
            </Typography>
          </div>
        </div>

        <div className="col-sm-6">
          <TextField
            defaultValue={calories} error={calories<=0} helperText={calories<=0 ? 'Calories must be greater than 0' : ''}
            label={'CALORIES'}
            type={'number'}
            variant={'outlined'}
            onChange={(e) => setCalories(e.target.value)}
          />

          <Tooltip style={{fontSize:"40px",color:"#3f51b5"}} title="If you don't know the amount of calories u should eat per day, click this button for instructions ">

            <ContactSupportIcon onClick={()=>setOpen(true)}/>

          </Tooltip>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Daily Caloric Needs
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Calorie needs for adult women range from 1,600 to 2,400 per day. For men, the estimates range from 2,000 to 3,000 per day.
                Aim for the low end of the range if you are mostly sedentary (little to no activity).
                If you are more than moderately active, the high end of the range is more reflective of your needs.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>


        </div>
      </div>
      <div className="row">
        <MealList
          className={'col-sm'}
          meals={breakfasts}
          name={'Breakfasts'}
          updateItems={setBreakfasts}
        />

        <MealList
          className={'col-sm'}
          meals={lunches}
          name={'Lunches'}
          updateItems={setLunches}
        />

        <MealList
          className={'col-sm'}
          meals={dinners}
          name={'Dinners'}
          updateItems={setDinners}
        />
      </div>
     <Link to={`/suggest/${selectedMeals[0]?.id}/${calories}`}>
      <Button disabled={selectedMeals<=0 || calories<=0}
        color={'primary'}
        variant={'contained'}
      >
        Accept
      </Button>
     </Link>
   </React.Fragment>
  )
}

export default ChooseFoodContainer
