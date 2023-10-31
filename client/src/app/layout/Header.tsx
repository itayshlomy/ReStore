import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midlinks=[
  {title:'catalog', path:'/catalog'},
  {title:'about', path:'/about'},
  {title:'contact', path:'/contact'}
]
const rightLinks=[
  {title:'login', path:'/login'},
  {title:'register', path:'/register'}
]
const navStyles ={
  color:'inherit',
  textDecoration:'none',
  typography:'h6',
  '&:hover':{
    color:'coral'
  },
  '&.active':{
    color:'GrayText'
  }
}

interface Props{
  darkMode:boolean;
  switchMode: ()=>void;
}

export default function Header({darkMode,switchMode}:Props) { 
  return (
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Box display="flex" alignItems='center'>
          <Typography variant="h6" component={NavLink} 
                      to='/'
                      sx={navStyles}>
            Re-Store
          </Typography>
          <Switch checked={darkMode} onChange={switchMode}/>
          </Box>
 
          <List sx={{display:'flex'}}>
            {midlinks.map(({title,path})=>(
              <ListItem component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display='flex' alignItems='center'>
            <IconButton size='large' edge='start' color='inherit' sx={{mr:2}}>
                <Badge badgeContent='4' color='secondary'>
                  <ShoppingCart></ShoppingCart>
                </Badge>
            </IconButton>
            <List sx={{display:'flex'}}>
              {rightLinks.map(({title,path})=>(
                <ListItem 
                component={NavLink}
                to={path}
                key={path}
                sx= {navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box> 
        </Toolbar>
      </AppBar>

  );
}
