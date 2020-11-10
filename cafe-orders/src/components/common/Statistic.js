import React, { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chart from './Chart';

function Statistic({ orders }) {

    const summary = () => {
        const data = {
            labels: [],
            sum: [],
        };
        orders.forEach((order) => {
            if (data.labels.length !== 0 && order.date === data.labels[data.labels.length - 1]) {
                data.sum[data.sum.length - 1] += order.sum;
            } else {
                data.labels.push(order.date);
                data.sum.push(order.sum);
            }
        })
        return data
    }
    const allData = summary();
    const [dataReport, setData] = useState(allData);
    const getOrderDate = (date) => {
        const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        return new Date(date.replace(pattern, '$3-$2-$1'));
    }
    const createDateObj = (date) => date ? new Date(date) : null
    const setReportInterval = ({ start, end }) => {
        const tempDataReport = {
            labels: [],
            sum: [],
        }
        const startDate = createDateObj(start);
        const endDate = createDateObj(end);
        allData.labels.forEach((item, index) => {
            const point = getOrderDate(item);
            if (!endDate) {
                if (startDate <= point) {
                    tempDataReport.labels.push(item);
                    tempDataReport.sum.push(allData.sum[index]);
                }
            } else if (startDate <= point && endDate >= point) {
                tempDataReport.labels.push(item);
                tempDataReport.sum.push(allData.sum[index]);
            }
        })
        setData(tempDataReport);
    }
    return (
        <>
            <Paper>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2" align='center'>
                            Select a date interval for generating a report
                        </Typography>
                    </Grid>
                </Grid>

                <Formik
                    initialValues={{ start: '', end: '' }}
                    onSubmit={setReportInterval}>
                    <Form>
                        <Grid container spacing={2} justify="center" alignItems='center'>
                            <Grid item xs={12} sm={2}>
                                <Field name='start' >
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            id="date-start"
                                            label="Start"
                                            type='date'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Field name='end'  >
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            id="date-end"
                                            label="End"
                                            type='date'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6} sm={1}>
                                <Button
                                    type='submit'
                                    variant="outlined"
                                >
                                    Ok
                                </Button>
                            </Grid>
                            <Field>
                            {({ resetForm }) =>(
                                <Grid item xs={6} sm={1}>
                                    <Button
                                        type="reset" onClick={resetForm}
                                        variant="outlined"
                                        >Clear
                                    </Button>
                                </Grid>
                            )}
                            </Field>
                        </Grid>
                    </Form>
                </Formik>
            </Paper>

            {dataReport ? <Chart dataReport={dataReport} /> : null}
        </>
    )
}
const mapStateToProps = ({ orders }) => ({
    orders: orders.items,
});
export default connect(mapStateToProps)(Statistic)
