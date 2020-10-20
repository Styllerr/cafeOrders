import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { connect } from 'react-redux';
import { setUnselectDish } from '../../store/actions/dishes'


function DishesItem(
    {
        dish,
        menuSections,
        forSelect,
        setUnselectDish,
        addDishInOrder,
    }
) {
    const history = useHistory();
    const { url } = useRouteMatch();
    function menuID({ menuSectionId }) {
        let temp = menuSections.find((item) => item._id === menuSectionId);
        return temp ? temp.title : '0';
    }

    function onRowClick() {
        if (forSelect) {
            setUnselectDish();
            addDishInOrder(dish._id, dish.price);
        } else {
            history.push(`${url}/${dish._id}`)
        }
    }
    return (
        <TableRow onClick={onRowClick}>
            <TableCell
                component="th"
                scope="row">
                {menuID(dish)}
            </TableCell>
            <TableCell >{dish.dishTitle}</TableCell>
            <TableCell >{dish.description}</TableCell>
            <TableCell >{dish.price}</TableCell>
        </TableRow>
    )
}
const mapStateToProps = ({ menuSections: { items } }) => ({
    menuSections: items
});
const mapDispatchToProps = {
    setUnselectDish,
}
export default connect(mapStateToProps, mapDispatchToProps)(DishesItem)
