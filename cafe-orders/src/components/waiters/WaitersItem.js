import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory, useRouteMatch } from 'react-router-dom';



function WaitersItem({ waiter }) {
    const history = useHistory();
    const { url } = useRouteMatch();

    function onRowClick() {
        history.push(`${url}/${waiter._id}`)
    }
    return (
        <TableRow onClick={onRowClick}>
            <TableCell component="th" scope="row">
                {waiter._id}
            </TableCell>
            <TableCell >{waiter.name}</TableCell>
            <TableCell >{waiter.surname}</TableCell>
            <TableCell >{waiter.notation}</TableCell>
        </TableRow>
    )
}

export default WaitersItem
