import React from 'react';
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
import { saveDish, deleteDishes } from '../../store/actions/dishes';
import { connect } from 'react-redux';

const BLANK = {
    dishTitle: '',
    menuSectionId: '0',
    description: '',
    price: 0,
}

function DishesForm({
    match: { params: { id } },
    menuSections,
    dishes,
    saveDish,
    deleteDishes }
){
    const history = useHistory();

    const selectedItem = (id) => dishes.find(item => item._id === id);
    const getItemForForm = (id) => id === 'new' ? BLANK : selectedItem(id);
    const onAddMenuSection = () => history.push('/menu/new');
    const onCancel = () => history.goBack()
    const onDelete = () => {
        deleteDishes(id);
        history.goBack()
    }
    const onFormSubmit = (data) => {
        saveDish(data);
        history.goBack();
    }
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
                                        disabled={!form.isValid}
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
        </>
    )
}

const mapStateToProps = (state) => ({
    menuSections: state.menuSections.items,
    dishes: state.dishes.items,
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