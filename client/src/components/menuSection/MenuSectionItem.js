import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useRouteMatch, useHistory } from 'react-router-dom';


function MenuSectionItem({ menu, number }) {
    const history = useHistory();
    const { url } = useRouteMatch();
    const onRowClick = () => history.push(`${url}/${menu._id}`);
    
    return (
        <TableRow onClick={onRowClick}>
            <TableCell
                component="th"
                scope="row">
                {number + 1}
            </TableCell>
            <TableCell >{menu.title}</TableCell>
            <TableCell >{menu.description}</TableCell>
        </TableRow>
    )
}

export default MenuSectionItem
