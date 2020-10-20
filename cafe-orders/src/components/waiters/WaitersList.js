import React from 'react';
import WaitersItem from './WaitersItem';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';


function WaitersList({ waiters }) {
    const history = useHistory();
    const { url } = useRouteMatch();

    function handleAddWaiter() {
        history.push(`${url}/new`);
    }
    function onCancel() {
        history.goBack()
    }
    return (
        <>
            <Paper>
                <h2 style={styles.header}>Waiters list</h2>
            </Paper>
            <Grid container spacing={5} alignItems="center">
                <Grid item xs={8} md={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={styles.tableCaption}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Notation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {waiters.map((item) => (
                                    <WaitersItem waiter={item} key={item._id} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4} md={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddWaiter}
                        startIcon={<Icon>add_circle</Icon>}
                        style={{ margin: '20px' }}
                    >Add new waiter
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                    >Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = ({ waiters: { items } }) => ({
    waiters: items,
});
export default connect(mapStateToProps)(WaitersList)

const styles = {
    header: { textAlign: 'center' },
    tableCaption: { backgroundColor: '#fafafa' },
}