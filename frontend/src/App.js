import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react'
import {Link, BrowserRouter as Router} from "react-router-dom";
import ChooseFoodContainer from './containers/ChooseFoodContainer'
import StorageIcon from '@material-ui/icons/Storage';
import RouterComponent from './components/RouterComponent'
import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { SnackbarProvider } from 'notistack'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function App(props) {
  const classes = useStyles();
  return (
    <SnackbarProvider>
    <div className="container">
      <Router>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Choose your diet
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Suggest food'].map((text, index) => (
              <Link to="/food">
              <ListItem button key={text} >

                <ListItemIcon><RestaurantMenuIcon></RestaurantMenuIcon></ListItemIcon>
                <ListItemText primary={text} />

              </ListItem>
               </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Add meal'].map((text, index) => (
              <Link to="/add">
              <ListItem button key={text} >
                <ListItemIcon><AddCircleIcon></AddCircleIcon></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Database'].map((text, index) => (
              <Link to="/database">
                <ListItem button key={text} >
                  <ListItemIcon><StorageIcon></StorageIcon></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar></Toolbar>
      <RouterComponent></RouterComponent>
        </main>
      </Router>
    </div>

    </SnackbarProvider>

  )
}

export default App
