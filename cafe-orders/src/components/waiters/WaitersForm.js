import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { saveWaiter, deleteWaiter } from '../../store/actions/waiters';



const BLANK = {
    name: '',
    surname: '',
    notation: '',
}
function WaitersForm({ match: { params: { id } }, waiters, saveWaiter, deleteWaiter }) {

    const history = useHistory();

    function selectedItem(id) {
        return waiters.find(item => item._id === id)
    }
    function getItemForForm(id) {
        return id === 'new' ? BLANK : selectedItem(id);
    }
    function onFormSubmit(data) {
        saveWaiter(data);
        history.goBack();
    }
    function onCancel() {
        history.goBack()
    }
    function onDelete() {
        deleteWaiter(id);
        history.goBack();
    }
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                {id !== 'new' ? 'Edit waiter' : 'Create new waiter'}
            </h2>
            <Formik
                initialValues={getItemForForm(id)}
                onSubmit={onFormSubmit}
            >
                <Form>
                    <Field name='name' type='text'>
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                style={styles.fildBtnMargin} />
                        )}
                    </Field>
                    <Field name='surname' type='text'>
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                label="Surname"
                                variant="outlined"
                                style={styles.fildBtnMargin} />
                        )}
                    </Field>
                    <Field name='notation' type='text'>
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                label="Notation"
                                variant="outlined"
                                style={styles.fildBtnMargin} />
                        )}
                    </Field>

                    <Button
                        variant="contained"
                        style={styles.fildBtnMargin}
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        type='submit'
                    >Save
                    </Button>
                    <Button
                        variant="contained"
                        style={styles.fildBtnMargin}
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
                </Form>
            </Formik>
        </>
    )
}

const mapStateToProps = ({ waiters: { items } }) => ({
    waiters: items,
});
const mapDispatchToProps = {
    saveWaiter,
    deleteWaiter,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitersForm))

const styles = {
    fildBtnMargin: {
        marginRight: '25px',
    }
}