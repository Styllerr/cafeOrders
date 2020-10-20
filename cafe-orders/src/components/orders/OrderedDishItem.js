import React, { useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

function OrderedDishItem({
    dish,
    dishes,
    index,
    setQuantityDish,
    calculateSum,
    deleteDish,
    orderClosed,
}) {

    useEffect(() => {
        calculateSum();
    }, [dish.quantity]);

    function findDish(id) {
        return dishes.find(item => item._id === id)
    }

    function onChangeQnt(e) {
        setQuantityDish(dish.id, e.target.value);

    }
    function onDelete() {
        deleteDish(dish.id)
    }
    return (
        <TableRow >
            <TableCell
                style={styles.no}
            >{index}
            </TableCell>
            <TableCell
                component="th"
                scope="row"
                style={styles.title}
            >
                {findDish(dish.dishId).dishTitle}
            </TableCell>
            <TableCell
                component="th"
                scope="row"
                style={styles.description}
            >
                {findDish(dish.dishId).description}
            </TableCell>
            <TableCell style={styles.digit}>
                <TextField
                    label="Quantity"
                    variant="outlined"
                    value={dish.quantity}
                    onChange={onChangeQnt}
                    disabled={orderClosed}
                />
            </TableCell>
            <TableCell
                style={styles.digit}>
                {dish.price}
            </TableCell>
            <TableCell
                style={styles.digit}>
                {dish.quantity * dish.price}
            </TableCell>
            <TableCell
                style={styles.digit}>
                <IconButton
                    onClick={onDelete}
                    disabled={orderClosed}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
const mapStateToProps = (state) => ({
    dishes: state.dishes.items,
})

export default connect(mapStateToProps)(OrderedDishItem)
const styles = {
    digit: {
        width: '9%'
    },
    no: {
        width: '4%'
    },
    title: {
        width: '20%'
    },
    description: {
        width: '40%',
    },
}