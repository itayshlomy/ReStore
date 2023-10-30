import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
  darkMode:boolean;
  switchMode: ()=>void;
}


export default function Header({darkMode,switchMode}:Props) { 
  return (
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar>
          <Typography variant="h6">
            Re-Store
          </Typography>
          <Switch checked={darkMode} onChange={switchMode}/> 
        </Toolbar>
      </AppBar>

  );
}
