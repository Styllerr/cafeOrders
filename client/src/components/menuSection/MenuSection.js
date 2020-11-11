import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MenuSectionList from './MenuSectionList';
import MenuSectionForm from './MenuSectionForm';

function MenuSection() {
    const { url } = useRouteMatch();
    
    return (
            <Switch>
                <Route path={`${url}/`} exact>
                    <MenuSectionList/>
                </Route>
                <Route path={`${url}/:id`}>
                    <MenuSectionForm />
                </Route>
            </Switch>
    )
}

export default MenuSection
