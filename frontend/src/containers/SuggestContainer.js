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
  TextField, Tooltip, Dialog, DialogTitle, Typography, DialogContent, DialogActions, Snackbar, Box,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import {useParams} from "react-router-dom"
function SuggestContainer() {
const {id,calories} = useParams()
  const [suggestedMeals,setSuggestedMeals] = useState([])
  useEffect(async () => {
    console.log(id,calories)
    const result = await axios.post(
      'http://localhost:8080/suggestion',
      {selectedMealId:id, calories:calories } ,
    ).then(res => {
      setSuggestedMeals(res.data)
    }).catch(err => {
        console.error(err)
      }
    )


  }, [])
  return (
    <React.Fragment>
      {suggestedMeals.map(mealList=>{
        console.log(mealList)
       const breakfast= mealList.find(meal=>meal.mealType==='BREAKFAST')
       const lunch= mealList.find(meal=>meal.mealType==='LUNCH')
       const dinner= mealList.find(meal=>meal.mealType==='DINNER')
        return (
          <div className={'row '}>
            <div className={'col-3'}>
              {/*<Typography noWrap={true} >*/}
              {breakfast.name} {breakfast.calories}
              {/*</Typography>*/}
            </div>
            <div className={'col-3'}>
              {/*<Typography noWrap={true}>*/}
              {lunch.name} {lunch.calories}
              {/*</Typography>*/}
            </div>
            <div className={'col-3'}>
              {/*<Typography noWrap={true}>*/}
              {dinner.name} {dinner.calories}
              {/*</Typography>*/}
            </div>
            <div className={'col-3'}>
              {dinner.calories + lunch.calories + breakfast.calories}
            </div>
            </div>
        )
      })}
    </React.Fragment>
  )
}


export default SuggestContainer