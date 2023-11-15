import agent from "../../app/api/agent";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Basket } from "../../app/models/basket";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";


export default function Basket(){
    const {basket,setBasket, removeItem} = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name:''
    });

    if(!basket) return<Typography variant="h2">Basket is empty</Typography>

    function removeItemFromBasket(productId:number, quantity=1,name:string) {
        setStatus({loading:true, name});
        agent.Basket.removeItem(productId, quantity)
        .then(()=>removeItem(productId,quantity))
        .catch(error=>console.log(error))
        .finally(()=>setStatus({loading:false, name:''}))
    }
    function addItem(productId:number, name:string){
        setStatus({loading:true, name});
        agent.Basket.addItem(productId,1)
        .then(basket=>setBasket(basket))
        .catch(error=> console.log(error))
        .finally(()=>setStatus({loading:false, name:''}))

    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket?.items.map(itemBasket => (
                            <TableRow key={itemBasket.productId}
                                    sx={{'&:last-child td, &:last-child th':{border:0}}}>
                                <TableCell component="th" scope="row">
                                    <Box display='flax' alignItems='center'>
                                    <img src={itemBasket.pictureUrl} alt={itemBasket.name} style={{height:50, marginRight:20}}/>
                                    <span>{itemBasket.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell >${(itemBasket.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton 
                                            loading={status.loading && status.name==='rem'+itemBasket.productId} 
                                            onClick={()=>removeItemFromBasket(itemBasket.productId,1,'rem'+itemBasket.productId)}>
                                        <Remove/>
                                    </LoadingButton>                            
                                    {itemBasket.quantity}
                                    <LoadingButton 
                                            loading={status.loading && status.name==='add'+itemBasket.productId}  
                                            onClick={()=>addItem(itemBasket.productId,'add'+itemBasket.productId)}>
                                        <Add/>
                                    </LoadingButton> 
                                </TableCell>
                                <TableCell >${currencyFormat(itemBasket.price*itemBasket.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                            loading={status.loading && status.name==='del'+itemBasket.productId}
                                            onClick={()=>removeItemFromBasket(itemBasket.productId,itemBasket.quantity,'del'+itemBasket.productId)}>
                                        <Delete/>
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button
                        component={Link}
                        to='/checkout'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}