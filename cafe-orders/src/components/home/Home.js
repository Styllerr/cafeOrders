import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './Home.css';

function Home() {
    return (
        <Paper elevation={3}>
            <header>
                <h1 className='header'>
                    Instructions for using the Web Application.
                </h1>
            </header>
            <main className='wrapper_main'>
                <ol className='main_list'>
                    <li className='list_element'>To view the list of orders, in the navigation bar, click
                        <Button
                            className="btnInInstruction"
                            variant="contained"
                            color="primary"
                        >Orders
                        </Button>
                </li>
                    <li className='list_element'>To create a new order, in the navigation bar, click
                        <Button
                            className="btnInInstruction"
                            variant="contained"
                            color="primary"
                        >New order
                        </Button>
                        <ul>
                            <li>
                                Select the Waiter and the table number from the lists
                            </li>
                            <li>
                                To add a new dish to the list, press the 
                                <Fab 
                                    className="btnInInstruction"
                                    variant="contained"
                                    color="primary"
                                >
                                <AddIcon />
                                </Fab>
                            </li>
                            <li>
                                Use the filter and search bar to quickly find a dish
                            </li>
                            <li>
                                When the order is completed, click Save
                            </li>
                            <li>
                                When the order is paid, click the checkbox order status
                            </li>
                        </ul>
                    </li>
                    <li className='list_element'>To create, view, edit and delete Waiters, in the navigation bar, click 
                    <Button
                        className="btnInInstruction"
                        variant="contained"
                        color="primary"
                    >Admin
                    </Button>
                    >>> Waiters list.</li>
                    <li className='list_element'>To create, view, edit and delete Dishes, in the navigation panel, click 
                    <Button
                        className="btnInInstruction"
                        variant="contained"
                        color="primary"
                    >Admin
                    </Button>
                    >>> Dishes list.</li>
                    <li className='list_element'>To create, view, edit and delete Menu Sections, in the navigation bar, click 
                    <Button
                        className="btnInInstruction"
                        variant="contained"
                        color="primary"
                    >Admin
                    </Button>
                    >>> Menu Sections list</li>
                </ol>
            </main>
        </Paper>
    )
}

export default Home
