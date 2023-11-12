import { Container, Typography, Divider, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Notfound(){

    return(
        <Container component={Paper} sx={{heigth: 400}}>
            <Typography gutterBottom variant="h3">Oops- we could not find what you are looking for </Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>go back to shop</Button>
        </Container>
    )
}