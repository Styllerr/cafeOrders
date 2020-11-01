import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DishesItem from './DishesItem';
import { connect } from 'react-redux';
import { setUnselectDish } from '../../store/actions/dishes';

function DishesList({ dishes, setUnselectDish, addDishInOrder, menuSections }) {

    const history = useHistory();
    const { url } = useRouteMatch();

    const [filter, setFilter] = useState('0');
    const [findDish, setfindDish] = useState('');
    const [sortList, setSortList] = useState(dishes.items);
    const [dishesList, setDishesList] = useState(sortList);

    const handleAddDish = () => history.push(`${url}/new`);
    const onCancel = () => !dishes.onSelectDish ? history.goBack() : setUnselectDish();
    const findTitleById = useCallback((id) => menuSections.items.find((item) => item._id === id).title, [menuSections.items]);
    const onChangeFindDish = (e) => setfindDish(e.target.value);
    const filteredDish = (items, findDish) => items.filter(item => (item.dishTitle.toLowerCase().includes(findDish)));
    const onFilterChange = (e) => setFilter(e.target.value);
    const clearSearch = () => setfindDish('');

    const sortDishBy = useCallback((array) => {
        if (filter === '0') {
            let sortArray = array.sort(function (a, b) {
                let result = findTitleById(a.menuSectionId).toLowerCase() <= findTitleById(b.menuSectionId).toLowerCase()
                return result ? -1 : 1
            })
            return sortArray
        } else {
            let sortArray = array.sort(function (a, b) {
                let result = a.dishTitle.toLowerCase() <= b.dishTitle.toLowerCase()
                return result ? -1 : 1
            })
            return sortArray
        }
    }, [filter, findTitleById]);

    useEffect(() => {
        if (filter !== '0') {
            let tempArray = sortDishBy(dishes.items.filter((item) => item.menuSectionId === filter));
            setSortList(tempArray);
        } else {
            setSortList(sortDishBy(dishes.items));
        }
    }, [filter, dishes, sortDishBy]);

    useEffect(() => {
        setDishesList(sortList)
    }, [sortList]);

    useEffect(() => {
        if (findDish !== '') {
            setDishesList(filteredDish(sortList, findDish));
        } else {
            setDishesList(sortList);
        }
    }, [findDish, sortList]);

    return (
        <>
            <Paper>
                {dishes.onSelectDish ? <h2 style={styles.header}>Select dish from</h2> : null}
                <h2 style={styles.header}>Dishes list</h2>
            </Paper>
            <Paper style={styles.searchPaper}>
                <div style={styles.searchFild}>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search dish by title..."
                        value={findDish}
                        onChange={onChangeFindDish}
                    />
                    <IconButton onClick={clearSearch}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <FormControl
                    style={styles.filter}
                >
                    <InputLabel id="select-filter">Filter by Menu Section</InputLabel>
                    <Select
                        labelId="select-filter"
                        id="select-filter"
                        value={filter}
                        onChange={onFilterChange}
                        label="filter"
                    >
                        <MenuItem value='0'>Without filter</MenuItem>
                        {
                            menuSections.items.map((item) => {
                                return <MenuItem
                                    key={item._id}
                                    value={item._id}
                                >{item.title}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Paper>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={styles.tableCaption}>
                        <TableRow>
                            <TableCell>Menu section</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dishesList.map((item) => (
                            <DishesItem
                                dish={item}
                                forSelect={dishes.onSelectDish}
                                addDishInOrder={addDishInOrder}
                                key={item._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!dishes.onSelectDish
                ? <>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddDish}
                        startIcon={<Icon>add_circle</Icon>}
                        style={styles.margin}
                    >Add new dish</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}>
                        Cancel
                    </Button>
                </> : <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={onCancel}
                >Cancel
                        </Button>}
        </>
    )
}

const mapStateToProps = ({ dishes, menuSections }) => ({
    dishes,
    menuSections,
});
const mapDispatchToProps = {
    setUnselectDish,
}
export default connect(mapStateToProps, mapDispatchToProps)(DishesList)

const styles = {
    header: { textAlign: 'center' },
    tableCaption: { backgroundColor: '#fafafa' },
    margin: {
        margin: '20px'
    },
    searchPaper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    searchFild: {
        width: '25%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    filter: {
        minWidth: '165px',
    }

}