import { Container, ButtonGroup, Button, Typography, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    const [validationErrors,setValidationErrors] = useState<string[]>([]);

    function getValidationError(){
        agent.TestError.getValidationError()
            .then(()=>console.log('should not see this'))
            .catch(error=>setValidationErrors(error))
    }
    return (
        <Container>
            <Typography gutterBottom variant= 'h2'>Error for tasting purposes</Typography>
            <ButtonGroup variant='contained'>
                <Button variant= 'contained' onClick={()=> agent.TestError.get400Error().catch(error=>console.log(error))}>Test 400 ERROR</Button>
                <Button variant= 'contained' onClick={()=> agent.TestError.get401Error().catch(error=>console.log(error))}>Test 401 ERROR</Button>
                <Button variant= 'contained' onClick={()=> agent.TestError.get404Error().catch(error=>console.log(error))}>Test 404 ERROR</Button>
                <Button variant= 'contained' onClick={()=> agent.TestError.get500Error().catch(error=>console.log(error))}>Test 500 ERROR</Button>
                <Button variant= 'contained' onClick={getValidationError}>Test VALI ERROR</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&(
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error =>(
                            <ListItem key={error} >
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}
    
        </Container>
    )
}