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

function HomePageContainer() {

  return (
    <React.Fragment>
      <div className='text-center'>
        <Typography color={'primary'} variant={'h2'} style={{ align: 'center' }}>
          Diet helper
        </Typography>
      </div>
      <Typography>
        Hello, I am Paweł Jeleń and this is my project.
        This application is designed to help you keep your daily calorie goals, while eating meals that
        you want. It is very easy to use, you just set up number of calories you want to eat daily, then pick a meal you want for example: pizza for lunch,
        and the app offers you some variants that you can eat for breakfast and dinner keeping the calories limit.
        After choosing one variant app provides you weekly menu.
      </Typography>
    </React.Fragment>
  )
}


export default HomePageContainer
