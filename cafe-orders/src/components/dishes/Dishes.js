import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import DishesList from './DishesList';
import DishesForm from './DishesForm';


function Dishes() {
    const { url } = useRouteMatch();
    return (
            <Switch>
                <Route path={`${url}/`} exact>
                    <DishesList />
                </Route>
                <Route path={`${url}/:id`}>
                    <DishesForm/>
                </Route>
            </Switch>
    )
}
export default Dishes
