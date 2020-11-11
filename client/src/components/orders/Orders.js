import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import OrdersList from './OrdersList';
import Order from './Order';

function Orders() {
    const { url } = useRouteMatch();

    return (
            <Switch>
                <Route path={`${url}/`} exact>
                    <OrdersList />
                </Route>
                <Route path={`${url}/:id`}>
                    <Order />
                </Route>
            </Switch>
    )
}

export default Orders
