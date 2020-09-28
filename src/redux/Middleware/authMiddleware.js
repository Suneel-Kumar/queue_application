import firebase from '../../config/config';
import authAction from '../Action/authAction';

export default class AuthMiddleware {
    static signOut() {
        return dispatch => {
            firebase.auth().signOut().then(() => {
                dispatch(authAction.unsetUser())
            }).catch(err => {
                alert(err.message);
            })
        }
    }

    static routGuard() {
        return dispatch => {
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    console.log('No record found');
                } else {
                    dispatch(authAction.user(user));
                }
            });
        };
    }

    static signInWithFB() {
        return (dispatch) => {
            var provider = new firebase.auth.FacebookAuthProvider();

            provider.setCustomParameters({
                'display': 'popup'
            });

            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                dispatch(authAction.user(user));
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }
    }


}