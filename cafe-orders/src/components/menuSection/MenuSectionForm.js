import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { saveMenuSection, deleteMenuSection } from '../../store/actions/menuSections'


const BLANK = {
    title: '',
    description: '',
}
function MenuSectionForm({
    match: { params: { id } },
    menuSections,
    saveMenuSection,
    deleteMenuSection
}) {
    const history = useHistory();

    function getItemForForm(id) {
        return id === 'new' ? BLANK : selectedItem(id);
    }
    function selectedItem(id) {
        return menuSections.find(item => item._id === id)
    }
    function onFormSubmit(data) {
        saveMenuSection(data);
        history.goBack();
    }
    function onCancel() {
        history.goBack();
    }
    function onDelete() {
            deleteMenuSection(id);
            history.goBack();
        }
    
    return (
        <>
            <Paper>
                <h2 style={styles.header}>
                    {id !== 'new' ? 'Edit menu section' : 'Create new menu section'}
                </h2>
            </Paper>
            <Formik
                initialValues={getItemForForm(id)}
                onSubmit={onFormSubmit}>
                <Form>
                    <Field name='title' type='text'>
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                label="Title"
                                variant="outlined"
                                style={styles.margin} />
                        )}
                    </Field>
                    <Field name='description' type='text'>
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                style={styles.margin} />
                        )}
                    </Field>
                    <Button
                        variant="contained"
                        style={styles.margin}
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        type='submit'
                    >Save
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
                </Form>
            </Formik>
        </>
    )
}
const mapStateToProps = ({ menuSections: { items } }) => ({
    menuSections: items,
});
const mapDispatchToProps = {
    saveMenuSection,
    deleteMenuSection,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuSectionForm))

const styles = {
    header: { textAlign: 'center' },
    margin: {marginRight: '20px'}
}