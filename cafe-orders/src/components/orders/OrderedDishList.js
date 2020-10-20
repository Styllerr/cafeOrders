import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import OrderedDishItem from './OrderedDishItem';

function OrderedDishList({
    calculateSum,
    listSelectedDishes,
    setQuantityDish,
    deleteDish,
    orderClosed,
}) {
    return (
        <>
            <Paper>
                <h3 style={styles.headerText}>Selected dishes</h3>
            </Paper>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={styles.headerBckg}>
                        <TableRow>
                            <TableCell >No</TableCell>
                            <TableCell >Title</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell style={styles.quantity}>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sum</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSelectedDishes.map((item, index) => (
                            <OrderedDishItem
                                dish={item}
                                index={index +1}
                                calculateSum={calculateSum}
                                setQuantityDish={setQuantityDish}
                                deleteDish={deleteDish}
                                orderClosed={orderClosed}
                                key={item.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default OrderedDishList
const styles = {
    headerText: {
        textAlign: 'center'
    },
    headerBckg: { 
        backgroundColor: '#fafafa' 
    },
    quantity: {
        width: '45px',
    },
}