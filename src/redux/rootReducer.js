import { combineReducers } from 'redux';
import authReducer from './Reducer/authReducer';
import companyReducer from './Reducer/companyReducer'

const rootReducer = combineReducers({
    authReducer,
    companyReducer
})

export default rootReducer;