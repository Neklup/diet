import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MealList from '../components/MealList'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import {
  Button,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  TextField, Tooltip, Dialog, DialogTitle, Typography, DialogContent, DialogActions, Snackbar,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

function AddFoodContainer() {
  const [error, setError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant })
  }
  const [breakfasts, setBreakfasts] = useState([])
  const [lunches, setLunches] = useState([])
  const [dinners, setDinners] = useState([])
  const [mealType, setMealType] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState(100)
  const handleChange = (e) => setMealType(e.target.value)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <React.Fragment>
      <div className='text-center'>
        <Typography color={'primary'} variant={'h2'} style={{ align: 'center' }}>
          Add new meal
        </Typography>
      </div>
      <div  className='row justify-content-between'>
        <div className='col-3' >

          <TextField label='Name' variant={'outlined'} onChange={(e) => setName(e.target.value)} />
          <TextField style={{marginTop:'20px'}} defaultValue={calories} variant={'outlined'} error={calories<=0} helperText={calories<=0 ? 'Calories must be greater than 0' : ''}
                     label='Calories' type='number' onChange={(e) => {
            setCalories(e.target.value)
          }} />


        </div>
        <div className='col-6'>
          <FormControl
            component='fieldset'
            color={'secondary'}
            variant={'filled'}
          >
            <FormLabel component='legend'>MealType</FormLabel>
            <RadioGroup
              aria-label='MealType'
              name='MealType'
              value={mealType}
              onChange={handleChange}

            >
              <FormControlLabel
                value='BREAKFAST'
                control={<Radio />}
                label='Breakfast'
              />
              <FormControlLabel value='LUNCH' control={<Radio />} label='Lunch' />
              <FormControlLabel value='DINNER' control={<Radio />} label='Dinner' />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className='row col-12'>
        <Button disabled={calories<=0 || !name || !mealType} color={'primary'} variant={'contained'} style={{ marginTop: '10px' }} onClick={async () => {
          const request = { name, calories, mealType }
          axios.post(
            'http://localhost:8080/meal/add',
            request,
          ).then(res => {
            handleClickVariant(`${res.data.name} was successfully added!`, 'success')
          }).catch(err => {
            if(err.response?.status===400) {handleClickVariant('Meal already exists.', 'error')} else
              handleClickVariant('Unexpected error when adding meal','error')
          }
          )



        }
        }

        >

          Add to DataBase
        </Button>


        {/*<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>*/}
        {/*  <DialogTitle id="customized-dialog-title" onClose={handleClose}>*/}
        {/*    Meal added!*/}
        {/*  </DialogTitle>*/}
        {/*  <DialogActions>*/}
        {/*    <Button autoFocus onClick={handleClose} color="primary" >*/}
        {/*      Okay*/}
        {/*    </Button>*/}
        {/*  </DialogActions>*/}
        {/*</Dialog>*/}
      </div>
    </React.Fragment>
  )
}

export default AddFoodContainer
