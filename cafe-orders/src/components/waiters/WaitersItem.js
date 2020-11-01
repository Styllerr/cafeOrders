import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory, useRouteMatch } from 'react-router-dom';



function WaitersItem({ waiter, number }) {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onRowClick = () => history.push(`${url}/${waiter._id}`);

    return (
        <TableRow onClick={onRowClick}>
            <TableCell
                component="th"
                scope="row">
                {number + 1}
            </TableCell>
            <TableCell>{waiter.name}</TableCell>
            <TableCell>{waiter.surname}</TableCell>
            <TableCell>{waiter.notation}</TableCell>
        </TableRow>
    )
}

export default WaitersItem
