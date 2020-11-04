import React, { useEffect, useState, useCallback } from 'react'
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => setModalVisible(false);
    const calculateSum = useCallback(() => {
        let total = 0;
        tempOrder.listSelectedDishes.forEach(item => {
            total += item.price * item.quantity
        })
        changeInOrder({ sum: total })
    }, [tempOrder.listSelectedDishes, changeInOrder]);

    useEffect(() => {
        if (id === 'new') {
            setBlankOrder();
            setDateOrder();
        } else if (orders.length !== 0) {
            setEditOrder(id);
        }
    }, [id, orders.length, setBlankOrder, setDateOrder, setEditOrder]);

    useEffect(() => {
        calculateSum();
    }, [tempOrder.listSelectedDishes, calculateSum]);


    const tablesList = [];
    for (let i = 1; i <= tables; i++) {
        tablesList.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    const onWaiterChange = (e) => changeInOrder({ waiterID: e.target.value });
    const onTableChange = (e) => changeInOrder({ table: e.target.value });
    const addDishModal = () => setSelectDish();
    const addDishInOrder = (dishId, price) => addDishOrder(dishId, price);
    const deleteDish = (id) => delDishTempOrder(id);
    const setQuantityDish = (id, qnt) => setQuantity(id, qnt);
    const handleCheck = (e) => onCloseOrder(e.target.checked);
    const onOrderSave = () => {
        if (tempOrder.waiterID !== '0' && tempOrder.table !== '0' && tempOrder.listSelectedDishes.length !== 0) {
            saveOrders(tempOrder);
            setUnselectDish();
            history.push('/orders');
        } else {
            setModalVisible(true);
        }
    }
    const onCancel = () => {
        setUnselectDish();
        history.goBack();
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
            {
                modalVisible
                    ? <>
                        <Dialog
                            open={modalVisible}
                            onClose={closeModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Save error."}</DialogTitle>
                            <DialogContent>
                                {(tempOrder.listSelectedDishes.length === 0) ? <div>Add at least one line item to your order.</div> : null}
                                {(tempOrder.waiterID === '0') ? <div>-== Choose waiter. ==-</div> : null}
                                {(tempOrder.table === '0') ? <div>-== Choose table. ==-</div> : null}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeModal} color="primary" autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
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
    error: {
        color: 'red'
    },
}
