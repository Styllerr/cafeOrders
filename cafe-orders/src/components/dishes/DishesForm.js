import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { saveDish, deleteDishes } from '../../store/actions/dishes';
import { connect } from 'react-redux';

const BLANK = {
    dishTitle: '',
    menuSectionId: '0',
    description: '',
    price: 0,
};

function DishesForm({
    match: { params: { id } },
    menuSections,
    dishes,
    orders,
    saveDish,
    deleteDishes }
) {
    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => setModalVisible(false);
    const selectedItem = (id) => dishes.find(item => item._id === id);
    const getItemForForm = (id) => id === 'new' ? BLANK : selectedItem(id);
    const onAddMenuSection = () => history.push('/menu/new');
    const onCancel = () => history.goBack();
    const saveButtonStatus = (isValid, dirty) => !(isValid && dirty);
    const findForDelete = () => {
        let array = orders.filter((
            item => item.listSelectedDishes.findIndex(
                dish => dish.dishId === id) !== -1));
        let result = [];
        array.forEach((item, index) => {
            result.push(`${index + 1}. Order from ${item.date} in the amount of ${item.sum}`)
        });
        return { length: array.length, result }
    }
    const onDelete = () => {
        if (findForDelete().length !== 0) {
            setModalVisible(true);
        } else {
            deleteDishes(id);
            history.goBack();
        }
    };
    const onFormSubmit = (data) => {
        saveDish(data);
        history.goBack();
    };
    const dishSchema = yup.object().shape({
        dishTitle: yup.string()
            .min(3, 'Very short title')
            .required('Dish title is required'),
        description: yup.string()
            .min(5, 'Very short description')
            .required('Needed write description'),
        menuSectionId: yup.string()
            .test('', 'Needed choose menu section', (value) => value !== '0'),
        price: yup.number().typeError('Digits only!')
            .test('', 'Enter right price!', (value) => value !== 0)
            .required('Required'),
    })
    return (
        <>
            <Paper>
                <h2 style={styles.header}>
                    {id !== 'new' ? 'Edit dish' : 'Create new dish'}
                </h2>
            </Paper>
            <Formik
                initialValues={getItemForForm(id)}
                validateOnBlur
                validationSchema={dishSchema}
                onSubmit={onFormSubmit}
            >
                <Form>
                    <Grid container spacing={5} alignItems="flex-start">
                        <Grid item xs={12} style={styles.grid}>
                            <Field name='menuSectionId' type='text' >
                                {({ field, meta }) => (
                                    <FormControl variant="outlined">
                                        <Select
                                            {...field}
                                            style={styles.margin}
                                            labelId="select-menuSection"
                                        >
                                            <MenuItem value='0' disabled={true}>Choose the menu section</MenuItem>
                                            {
                                                menuSections.map((item) => {
                                                    return <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
                                                })
                                            }
                                        </Select>
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                style={styles.margin}
                                onClick={onAddMenuSection}
                            >Add menu section
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={styles.grid}>
                            <Field name='dishTitle' type='text'>
                                {({ field, meta }) => (
                                    <div style={styles.title}>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Title"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                            <Field name='description' type='text'>
                                {({ field, meta }) => (
                                    <div style={styles.description}>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Description"
                                            variant="outlined"
                                            rowsMax='2'
                                            fullWidth
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                            <Field name='price' type='number' >
                                {({ field, meta }) => (
                                    <div style={styles.price}>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Price"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field>
                                {({ form }) => (
                                    <Button
                                        variant="contained"
                                        style={styles.margin}
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        type='submit'
                                        disabled={saveButtonStatus(form.isValid, form.dirty)}
                                    >Save dish
                                    </Button>
                                )}
                            </Field>
                            <Button
                                variant="contained"
                                style={styles.margin}
                                color="primary"
                                size="large"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                            >Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<DeleteIcon />}
                                onClick={onDelete}
                                disabled={id !== 'new'
                                    ? false
                                    : true}
                            >Delete
                            </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Formik>
            {
                modalVisible
                    ? <>
                        <Dialog
                            open={modalVisible}
                            onClose={closeModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Deletion aborted."}</DialogTitle>
                            <DialogContent>
                                <div>
                                    Found related data. First, delete the records containing this item.
                                {findForDelete().result.map((item, index) => <p key={index}>{item}</p>)}
                                </div>
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
    menuSections: state.menuSections.items,
    dishes: state.dishes.items,
    orders: state.orders.items,
});
const mapDispatchToProps = {
    saveDish,
    deleteDishes,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishesForm))

const styles = {
    header: {
        textAlign: 'center',
    },
    title: {
        minWidth: '20%',
        paddingRight: '10px',
    },
    description: {
        minWidth: '40%',
        paddingRight: '10px',
    },
    price: {
        minWidth: '65px',
        maxWidth: '115px',
    },
    margin: {
        marginRight: '10px',
    },
    grid: {
        display: 'flex',
        alignItems: 'flexStart',
    },
    error: {
        color: 'red'
    }
}