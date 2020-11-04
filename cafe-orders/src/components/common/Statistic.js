import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

function Statistic() {
    return (
        <>
            <Paper>
                Select a date interval for generating a report
                <form noValidate>
                    <TextField
                        id="date=start"
                        label="Start"
                        type="date"
                        defaultValue=''
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date-end"
                        label="End"
                        type="date"
                        defaultValue=''
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </Paper>
        </>
    )
}

export default Statistic
