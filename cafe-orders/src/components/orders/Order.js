import React, { useEffect } from 'react'
import OrderedDishList from './OrderedDishList'
import { withRouter, useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { setSelectDish, setUnselectDish, } from '../../store/actions/dishes';
import {
    saveOrders,
    setBlankOrder,
    setDateOrder,
    changeInOrder,
    addDishOrder,
    delDishTempOrder,
    setQuantity,
    setEditOrder,
    onCloseOrder,
} from '../../store/actions/orders';
import DishesList from '../dishes/DishesList';


function Order({
    match: { params: { id } },
    waiters,
    tables,
    orders,
    tempOrder,
    setBlankOrder,
    setSelectDish,
    setUnselectDish,
    saveOrders,
    setDateOrder,
    changeInOrder,
    addDishOrder,
    setQuantity,
    delDishTempOrder,
    onSelectDish,
    setEditOrder,
    onCloseOrder,
}) {
    const history = useHistory();

    useEffect(() => {
        if (id === 'new') {
            setBlankOrder();
            setDateOrder();
        } else if (orders.length !== 0) {
            setEditOrder(id);
        }
    }, [, id, orders.length, setBlankOrder, setDateOrder, setEditOrder]);
    useEffect(() => {
        calculateSum();
    }, [tempOrder.listSelectedDishes]);


    const tablesList = [];
    for (let i = 1; i <= tables; i++) {
        tablesList.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    function onWaiterChange(e) {
        changeInOrder({ waiterID: e.target.value })
    }
    function onTableChange(e) {
        changeInOrder({ table: e.target.value })
    }

    function addDishModal() {
        setSelectDish();
    }

    function addDishInOrder(dishId, price) {
        addDishOrder(dishId, price)
    }
    function deleteDish(id) {
        delDishTempOrder(id)
    }
    function setQuantityDish(id, qnt) {
        setQuantity(id, qnt);
    }

    function onOrderSave() {
        if (tempOrder.waiterID !== '0') {
            saveOrders(tempOrder);
            setUnselectDish();
            history.push('/orders');
        } else {
            console.error('Waiter non selected')
        }
    }

    function onCancel() {
        setUnselectDish();
        history.goBack()
    }

    function calculateSum() {
        let total = 0;
        tempOrder.listSelectedDishes.forEach(item => {
            total += item.price * item.quantity
        })
        changeInOrder({ sum: total })
    }

    function handleCheck(event) {
        onCloseOrder(event.target.checked);
    }
    return (
        <>
            <Paper style={styles.marginTop}>
                <header style={styles.headerText}>
                    <span>Date: {tempOrder.date}</span>
                    <span>{tempOrder.waiterID === '0' ? 'Waiter not selected' : 'WaiterID: ' + tempOrder.waiterID}</span>
                    <span>{tempOrder.table === '0' ? 'Table not selected' : 'Table: ' + tempOrder.table}</span>
                </header>
            </Paper>
            <FormControl variant="outlined" disabled={tempOrder.orderClosed} style={styles.marginTop}>
            <InputLabel id="select-menuSection">Waiter name</InputLabel>
                <Select
                    labelId="select-menuSection"
                    id="select-menuSection"
                    value={tempOrder.waiterID}
                    onChange={onWaiterChange}
                    label="Waiter name"
                >
                    <MenuItem value='0' disabled={true}>Choose the waiter</MenuItem>
                    {
                        waiters.map((item) => {
                            return <MenuItem key={item._id} value={item._id}>{item.name + ' ' + item.surname}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl variant="outlined" disabled={tempOrder.orderClosed} style={styles.marginTop}>
            <InputLabel id="select-table">Table</InputLabel>
                <Select
                    labelId="select-table"
                    id="select-table"
                    value={tempOrder.table}
                    onChange={onTableChange}
                    label="Table"
                >
                    <MenuItem value='0' disabled={true}>Choose the table</MenuItem>
                    {tablesList}
                </Select>
            </FormControl>
            <div>
                <FormControlLabel
                    control={<Checkbox checked={tempOrder.orderClosed}
                        onChange={handleCheck} name="closed"
                    />}
                    label="Order status: "
                /><span>{tempOrder.orderClosed ? 'CLOSED' : 'OPEN'}</span>
            </div>
            <OrderedDishList
                calculateSum={calculateSum}
                listSelectedDishes={tempOrder.listSelectedDishes}
                setQuantityDish={setQuantityDish}
                deleteDish={deleteDish}
                orderClosed={tempOrder.orderClosed}
            />
            <Paper style={styles.footerText}>
                <span>{tempOrder.sum === '0' ? '---' : 'Total cost: ' + tempOrder.sum}</span>
            </Paper>
            <Fab
                color="primary"
                aria-label="add"
                onClick={addDishModal}
                disabled={tempOrder.orderClosed}
                style={styles.marginRight}
            >
                <AddIcon />
            </Fab>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={onOrderSave}
                style={styles.marginRight}
            >
                Save
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CancelIcon />}
                onClick={onCancel}
            >
                Cancel
            </Button>
            {
                onSelectDish
                    ? <><div style={styles.modalBackground} />
                        <div style={styles.modal}>
                            <Container maxWidth="md">
                                <DishesList addDishInOrder={addDishInOrder} />
                            </Container>
                        </div>
                    </>
                    : null
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders.items,
    tempOrder: state.orders.tempOrder,
    onSelectDish: state.dishes.onSelectDish,
    waiters: state.waiters.items,
    dishes: state.dishes.items,
    tables: state.tables.items,
})
const mapDispatchToProps = {
    setSelectDish,
    setBlankOrder,
    setDateOrder,
    changeInOrder,
    addDishOrder,
    setQuantity,
    delDishTempOrder,
    saveOrders,
    setUnselectDish,
    setEditOrder,
    onCloseOrder,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order))


const styles = {
    modalBackground: {
        background: 'grey',
        opacity: '0.3',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: '2',
    },
    headerText: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    footerText: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 20px',
        margin: '10px 0',
    },
    marginRight: {
        marginRight: '10px',
    },
    marginTop: {
        marginTop: '10px',
    },
}
