import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { deleteOrder } from '../../store/actions/orders';

function OrdersItem({ order, waiters, deleteOrder }) {

    const history = useHistory();
    const { url } = useRouteMatch();

    const onRowClick = () => history.push(`${url}/${order._id}`);
    const waiterID = (waiterID) => {
        let tempWaiterByID = waiters.find((item) => item._id === waiterID);
        return tempWaiterByID ? `${tempWaiterByID.name} ${tempWaiterByID.surname}` : 'noneme';
    };
    const onDelete = (e) => {
        e.stopPropagation();
        deleteOrder(order._id);
    };

    return (
        <TableRow onClick={onRowClick}>
            <TableCell >{order.date}</TableCell>
            <TableCell >{order.orderOpenTime}</TableCell>
            <TableCell >{waiterID(order.waiterID)}</TableCell>
            <TableCell >{order.table}</TableCell>
            <TableCell >{order.sum}</TableCell>
            <TableCell align='center'>{order.orderClosed
                ? <div>
                    <div style={{ 'color': 'red' }}>Order is CLOSED</div>
                    <span>{`at ${order.orderCloseTime}`}</span>
                </div>
                : <span style={{ 'color': 'blue' }}>Order is OPEN</span>}
            </TableCell>
            <TableCell >
                <IconButton
                    onClick={onDelete}
                    disabled={order.orderClosed}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
const mapStateToProps = (state) => ({
    waiters: state.waiters.items,
});
const mapDispatchToProps = {
    deleteOrder,
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersItem)
