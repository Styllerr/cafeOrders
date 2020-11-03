import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { saveWaiter, deleteWaiter } from '../../store/actions/waiters';



const BLANK = {
    name: '',
    surname: '',
    notation: '',
}
function WaitersForm(
    { match: { params: { id } },
        waiters,
        orders,
        saveWaiter,
        deleteWaiter
    }) {

    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => setModalVisible(false);
    const selectedItem = (id) => waiters.find(item => item._id === id);
    const getItemForForm = (id) => id === 'new' ? BLANK : selectedItem(id);
    const onCancel = () => history.goBack();
    const saveButtonStatus = (isValid, dirty) => !(isValid && dirty);
    const onFormSubmit = (data) => {
        saveWaiter(data);
        history.goBack();
    }
    const findForDelete = () => {
        let array = orders.filter((item => item.waiterID === id));
        let result = [];
        array.forEach((item, index) => {
            result.push(`${index+1}. Order from ${item.date} in the amount of ${item.sum}`)
        });
        return { length: array.length, result }
    }
    const onDelete = () => {
        if (findForDelete().length !== 0) {
            setModalVisible(true);
        } else {
            deleteWaiter(id);
            history.goBack();
        }
    }
    const waiterSchema = yup.object().shape({
        name: yup.string()
            .min(2, 'Very short name')
            .required('Name is required'),
        surname: yup.string()
            .min(2, 'Very short second name')
            .required('Surname is required'),
    })
    return (
        <>
            <Paper>
                <h2 style={styles.header}>
                    {id !== 'new' ? 'Edit waiter' : 'Create new waiter'}
                </h2>
            </Paper>
            <Formik
                initialValues={getItemForForm(id)}
                validateOnBlur
                validationSchema={waiterSchema}
                onSubmit={onFormSubmit}
            >
                <Form>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={3}>
                            <Field name='name' type='text'>
                                {({ field, meta }) => (
                                    <div>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Field name='surname' type='text'>
                                {({ field, meta }) => (
                                    <div>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Surname"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field name='notation' type='text'>
                                {({ field, meta }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-basic"
                                        label="Notation"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field>
                                {({ form }) => (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        type='submit'
                                        disabled={saveButtonStatus(form.isValid, form.dirty)}
                                        style={styles.btnMargin}
                                    >Save
                                    </Button>
                                )}
                            </Field>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                                style={styles.btnMargin}
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

const mapStateToProps = ({ waiters, orders }) => ({
    waiters: waiters.items,
    orders: orders.items,
});
const mapDispatchToProps = {
    saveWaiter,
    deleteWaiter,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitersForm))

const styles = {
    header: {
        textAlign: 'center',
    },
    btnMargin: {
        marginRight: '20px',
    },
    error: {
        color: 'red'
    },
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
}