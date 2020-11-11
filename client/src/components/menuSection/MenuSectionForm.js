import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { saveMenuSection, deleteMenuSection } from '../../store/actions/menuSections'


const BLANK = {
    title: '',
    description: '',
}
function MenuSectionForm({
    match: { params: { id } },
    menuSections,
    dishes,
    saveMenuSection,
    deleteMenuSection,
}) {
    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => setModalVisible(false);
    const getItemForForm = (id) => id === 'new' ? BLANK : selectedItem(id);
    const selectedItem = (id) => menuSections.find(item => item._id === id);
    const onCancel = () => history.goBack();
    const saveButtonStatus = (isValid, dirty) =>  !(isValid && dirty);
    const onFormSubmit = (data) => {
        saveMenuSection(data);
        history.goBack();
    }
    const findForDelete = () => {
        let array = dishes.filter((item => item.menuSectionId === id));
        let result = [];
        array.forEach((item, index) => {
            result.push(`${index+1}. Dish: ${item.dishTitle} belongs to the menu section to be deleted`)
        });
        return { length: array.length, result }
    }
    const onDelete = () => {
        if (findForDelete().length !== 0) {
            setModalVisible(true);
        } else {
            deleteMenuSection(id);
            history.goBack();
        }
    }
    const menuSectionSchema = yup.object().shape({
        title: yup.string()
            .min(3, 'Very short title')
            .required('Title is required'),
        description: yup.string()
            .min(5, 'Very short description')
            .required('Description is required'),
    })
    return (
        <>
            <Paper>
                <h2 style={styles.header}>
                    {id !== 'new' ? 'Edit menu section' : 'Create new menu section'}
                </h2>
            </Paper>
            <Formik
                initialValues={getItemForForm(id)}
                validateOnBlur
                validationSchema={menuSectionSchema}
                onSubmit={onFormSubmit}>
                <Form>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={4}>
                            <Field name='title' type='text'>
                                {({ field, meta }) => (
                                    <div>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name='description' type='text'>
                                {({ field, meta }) => (
                                    <div>
                                        <TextField
                                            {...field}
                                            id="outlined-basic"
                                            label="Description"
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
                                    >Save
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
const mapStateToProps = ({ menuSections, dishes }) => ({
    menuSections: menuSections.items,
    dishes: dishes.items,
});
const mapDispatchToProps = {
    saveMenuSection,
    deleteMenuSection,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuSectionForm))

const styles = {
    header: { textAlign: 'center' },
    margin: { marginRight: '20px' },
    error: { color: 'red' },
}