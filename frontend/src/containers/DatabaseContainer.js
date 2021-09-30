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
  TextField, Tooltip, Dialog, DialogTitle, Typography, DialogContent, DialogActions, DialogContentText,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack'
function DatabaseContainer() {
  const [meals, setMeals] = useState([])
  const [selectedMeals, setSelectedMeals] = useState([])
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [mealToEdit,setMealToEdit]=useState({});
  const [mealType, setMealType] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState(100)
  const handleChange = (e) => setMealToEdit({...mealToEdit,mealType:e.target.value})
  const { enqueueSnackbar } = useSnackbar()
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant })
    handleClose()
    getMeals()
  }

  const handleClose = () => {
    setOpen(false);
    setOpenEditDialog(false)
  };
   const getMeals = async () =>{
    const result = await axios('http://localhost:8080/meal/list')
    setMeals(result.data)
  }
  useEffect(async () => {
    await getMeals();
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'calories', headerName: 'Calories',type:'number',width: 130 },
    { field: 'name', headerName: 'Name', width: 350 },
    {
      field: 'mealType',
      headerName: 'MealType',
      width: 350,
    },
    {
      field: "edition",
      headerName: "Edit",
      sortable: false,
      width: 112,
     disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow={};


          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
          console.log(thisRow)
          setMealToEdit(thisRow);
          setOpenEditDialog(true)
        };

        return <Button variant={'outlined'} onClick={onClick}>Edit</Button>;
      }
    }

  ];
  return (
   <React.Fragment>
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center">
            <Typography color={'primary'} variant={"h2"} style={{ align: "center" }}>
              Meals Database
            </Typography>

          </div>
        </div>

      </div>
     <div className='row' style={{ height: '400px', width: '100%' }}>
       <DataGrid
         onSelectionModelChange={(newSelection) => {
           setSelectedMeals(newSelection.selectionModel);
         }} rows={meals} columns={columns} pageSize={5} checkboxSelection selectionModel={selectedMeals}/>
     </div>
     <div className='row float-right' style={{paddingRight: 30, paddingTop: 15}}>
     <Button disabled={selectedMeals<=0} color={'secondary'} variant={'contained'} onClick={()=>setOpen(true)}
     >Delete selected positions</Button>
       <Dialog

         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
       >
         <DialogTitle id="responsive-dialog-title">{"Do you want to delete selected meals?"}</DialogTitle>
         <DialogActions>
           <Button autoFocus onClick={handleClose} color="primary">
             Cancel
           </Button>
           <Button onClick={async () => {
             const result = await axios.post(
               'http://localhost:8080/meal/deleteList',
               selectedMeals,
             )
             await getMeals()
             handleClose()
           }} color="primary" autoFocus >
             Confirm
           </Button>
         </DialogActions>
       </Dialog>



       <Dialog
        style={{minHeight:"400px",minWidth:"900px"}}
         open={openEditDialog}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
       >
         <DialogTitle id="responsive-dialog-title">{"Meal Edition"}</DialogTitle>

<DialogContent>
  <div className='row col-12'>
             <TextField variant={'outlined'} fullWidth={true} value={mealToEdit.name} label='Name'   onChange={(e) => setMealToEdit({...mealToEdit,name:e.target.value})} />
             <TextField variant={'outlined'} fullWidth={true} style={{marginTop:'20px'}} value={mealToEdit.calories} error={mealToEdit.calories<=0} helperText={mealToEdit.calories<=0 ? 'Calories must be greater than 0' : ''}
                        label='Calories' type='number' onChange={(e) => {
               setMealToEdit({...mealToEdit,calories:e.target.value})
             }} />
  </div>


<div className='row col-12' style={{marginTop:"15px"}}>
             <FormControl
               component='fieldset'
               color={'secondary'}
               variant={'filled'}
             >
               <FormLabel component='legend'>MealType</FormLabel>
               <RadioGroup
                 aria-label='MealType'
                 name='MealType'
                 value={mealToEdit.mealType}
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
</DialogContent>


         <DialogActions>
           <Button autoFocus onClick={handleClose} color="primary">
             Cancel
           </Button>
           <Button disabled={mealToEdit.calories<=0 || !mealToEdit.name || !mealToEdit.mealType} color={'primary'} variant={'contained'} style={{ marginTop: '10px' }} onClick={async () => {

             axios.post(
               'http://localhost:8080/meal/add',
               mealToEdit,
             ).then(res => {
               handleClickVariant(`${res.data.name} was successfully edited!`, 'success')
             }).catch(err => {
                 if(err.response?.status===400) {handleClickVariant('Meal already exists.', 'error')} else
                   handleClickVariant('Unexpected error when adding meal','error')
               }
             )



           }
           }

           >

             Confirm changes
           </Button>
         </DialogActions>
       </Dialog>
     </div>
   </React.Fragment>
  )
}

export default DatabaseContainer
