import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

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
  const {basket} = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item)=> sum+item.quantity,0)
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
            <IconButton  component={Link}
                                to='/basket'
                                size='large' edge='start' color='inherit' sx={{mr:2}}>
                <Badge badgeContent={itemCount} color='secondary'>
                  <ShoppingCart>

                  </ShoppingCart>
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
