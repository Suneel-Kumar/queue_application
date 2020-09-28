import { USER_STATUS, LOADING, UNSET_USER } from '../constants'
export default class AuthAction {

    static user(data) {
        const { displayName, uid, email } = data
        return { type: USER_STATUS, payload: { displayName, uid, email } }
    }

    static loading(data) {
        return { type: LOADING, payload: data }
    }

    static unsetUser() {
        return {
            type: UNSET_USER
        }
    }


}