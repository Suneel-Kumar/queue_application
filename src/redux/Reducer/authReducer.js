import { USER_STATUS, LOADING, UNSET_USER, NOTIFICATION} from '../constants'
const INITIAL_STATE = {
    user: {},
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case UNSET_USER:
            return {
                ...state,
                user: {}
            }

        case USER_STATUS:
            return {
                ...state,
                user: action.payload,
            };


        default:
            return state;
    }
};