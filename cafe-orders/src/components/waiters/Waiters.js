import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WaitersList from './WaitersList';
import WaitersForm from './WaitersForm';


function Waiters() {

    const { url } = useRouteMatch();
    return (
            <Switch>
                <Route path={`${url}/`} exact>
                    <WaitersList/>
                </Route>
                <Route path={`${url}/:id`}>
                    <WaitersForm />
                </Route>
            </Switch>
    )
}

export default Waiters
