import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Basket } from "../../app/models/basket";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";


export default function Basket(){
    const {basket,status} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    if(!basket) return<Typography variant="h2">Basket is empty</Typography>

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
                                            loading={status===('pendingRemoveItem'+itemBasket.productId+'rem')} 
                                            onClick={()=>dispatch(removeBasketItemAsync({
                                                productId:itemBasket.productId,quantity:1, status:'rem'
                                                }))}>
                                        <Remove/>
                                    </LoadingButton>                            
                                    {itemBasket.quantity}
                                    <LoadingButton 
                                            loading={status===('pendingAddItem'+itemBasket.productId)}  
                                            onClick={()=>dispatch(addBasketItemAsync({productId:itemBasket.productId}))}>
                                        <Add/>
                                    </LoadingButton> 
                                </TableCell>
                                <TableCell >{currencyFormat(itemBasket.price*itemBasket.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                            loading={status===('pendingRemoveItem'+itemBasket.productId+'del')} 
                                            onClick={()=>dispatch(removeBasketItemAsync({
                                                productId:itemBasket.productId, quantity:itemBasket.quantity,status:'del'
                                                }))}>
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