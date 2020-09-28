const INITIAL_STATE = {
    companys: [],
    companyDetail: [],
    Search: [],
    User : []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COMPANYS': {
            return {
                ...state,
                companys: action.payload
            }
        }

        case 'COMPANY_DETAIL': {
            return {
                ...state,
                companyDetail: action.payload
            }
        }

        case 'SEARCH': {
            return {
                ...state,
                Search: action.payload
            }
        }

        case 'USER': {
            return {
                ...state,
                User: action.payload
            }
        }

        default:
            return state;
    }
};