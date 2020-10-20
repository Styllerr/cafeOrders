import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MenuSectionItem from './MenuSectionItem';
import { connect } from 'react-redux';

function MenuSectionList({ menuSections }) {

    const history = useHistory();
    const { url } = useRouteMatch();

    function handleAddMenu() {
        history.push(`${url}/new`);
    }
    function onCancel() {
        history.goBack()
    }
    return (
        <>
            <Paper>
                <h2 style={styles.header}>Menu section list</h2>
            </Paper>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={styles.tableCaption}>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell>Menu section</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuSections.map((item) => (
                            <MenuSectionItem menu={item} key={item._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddMenu}
                startIcon={<Icon>add_circle</Icon>}
                style={styles.margin}
            >Add new menu section
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CancelIcon />}
                onClick={onCancel}
            >Cancel
            </Button>
        </>
    )
}

const mapStateToProps = ({ menuSections: { items } }) => ({
    menuSections: items,
});
export default connect(mapStateToProps)(MenuSectionList)
const styles = {
    header: { textAlign: 'center' },
    margin: { margin: '20px' },
    tableCaption: {
        backgroundColor: '#fafafa'
    },
}