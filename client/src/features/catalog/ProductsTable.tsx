import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { Product } from "../../app/models/Product"

interface Props {
    products: Product[];
}

export default function ProductsTable({products}:Props){
    return(
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>type</TableCell>
                            <TableCell>brand</TableCell>
                            <TableCell>quantityInStock</TableCell>
                            <TableCell>picture</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell align="right">{product.id}</TableCell>
                                <TableCell align="right">{product.name}</TableCell>
                                <TableCell align="right">{product.description}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">{product.type}</TableCell>
                                <TableCell align="right">{product.brand}</TableCell>
                                <TableCell align="right">{product.quantityInStock}</TableCell>
                                <TableCell align="right"><img src={product.pictureUrl}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
   
    )
}