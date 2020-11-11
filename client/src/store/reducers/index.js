import { combineReducers} from 'redux';
import waiters from './waiters';
import dishes from './dishes';
import orders from './orders';
import menuSections from './menuSections';
import tables from './tables';

export default combineReducers({waiters, dishes, orders, menuSections, tables})