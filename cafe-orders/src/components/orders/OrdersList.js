import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import OrdersItem from './OrdersItem';


function OrdersList({ orders }) {

    const history = useHistory();
    const { url } = useRouteMatch();

    function handleAddOrder() {
        history.push(`${url}/new`);
    }
    function onCancel() {
        history.goBack()
    }
    return (
        <>
            <Paper>
                <h2 style={styles.header}>Orders list</h2>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={styles.tableCaption}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Waiter</TableCell>
                            <TableCell>Table</TableCell>
                            <TableCell>Sum</TableCell>
                            <TableCell>Open/Close</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((item) => (
                            <OrdersItem order={item} key={item._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddOrder}
                startIcon={<Icon>add_circle</Icon>}
                style={{ margin: '20px' }}
            >Add new order
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CancelIcon />}
                onClick={onCancel}
            >Cancel
            </Button>
        </>
    )
}
const mapStateToProps = (state) => ({
    orders: state.orders.items,

});
export default connect(mapStateToProps)(OrdersList)

const styles = {
    header: { textAlign: 'center' },
    tableCaption: { backgroundColor: '#fafafa' },
}