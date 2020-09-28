
export default class CompanyAction {

    static companys(companys) {
        return {
            type: 'COMPANYS',
            payload: companys
        }
    }

    static CompanyDetail(CompanyDetail) {
        return {
            type: 'COMPANY_DETAIL',
            payload: CompanyDetail
        }
    }

    static Search(search) {
        return {
            type: 'SEARCH',
            payload: search
        }
    }

    static User(list){
        return {
            type : "USER",
            payload : list
        }
    }

}