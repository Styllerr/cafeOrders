import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, useHistory } from 'react-router-dom';
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
    price: '0',
}

function DishesForm(
    { match: { params: { id } },
        menuSections,
        dishes,
        saveDish,
        deleteDishes }
) {
    const history = useHistory();

    function selectedItem(id) {
        return dishes.find(item => item._id === id)
    }
    function getItemForForm(id) {
        return id === 'new' ? BLANK : selectedItem(id);
    }
    function onAddMenuSection() {
        history.push('/menu/new');
    }
    function onFormSubmit(data) {
        saveDish(data);
        history.goBack();
    }
    function onCancel() {
        history.goBack()
    }
    function onDelete() {
        deleteDishes(id);
        history.goBack();
    }
    return (
        <>
            <Paper>
                <h2 style={styles.header}>
                    {id !== 'new' ? 'Edit dish' : 'Create new dish'}
                </h2>
            </Paper>
            <Formik
                initialValues={getItemForForm(id)}
                onSubmit={onFormSubmit}
            >
                <Form>
                    <Grid container spacing={5} alignItems="center">
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
                            <Field name='_id' type='text'>
                                {({ field, meta }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-basic"
                                        label="ID"
                                        variant="outlined"
                                        disabled={true}
                                        style={styles.shot}
                                    />
                                )}
                            </Field>
                            <Field name='dishTitle' type='text'>
                                {({ field, meta }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-basic"
                                        label="Title"
                                        variant="outlined"
                                        style={styles.margin}
                                    />
                                )}
                            </Field>
                            <Field name='description' type='text'>
                                {({ field, meta }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-basic"
                                        label="Description"
                                        variant="outlined"
                                        rowsMax='2'
                                        style={styles.margin}
                                    />
                                )}
                            </Field>
                            <Field name='price' type='text'>
                                {({ field, meta }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-basic"
                                        label="Price"
                                        variant="outlined"
                                        style={styles.shot}
                                    />
                                )}
                            </Field>
                            <Button
                                variant="contained"
                                style={styles.margin}
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                type='submit'
                            >Save dish
                            </Button>
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
    shot: {
        marginRight: '10px',
        width: '80px'
    },
    margin: {
        marginRight: '10px',
    },
    grid: {
        display: 'flex',
        alignItems: 'center',
    },
}