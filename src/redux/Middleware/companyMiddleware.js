import firebase from '../../config/config';
import companyAction from '../Action/companyAction';


export default class CompanyMiddleware {

    static getCompany(id) {
        return (dispatch) => {
            firebase.firestore().collection("Company").where("userId", "==", id).onSnapshot((user) => {
                var list = [];
                user.forEach(function (doc) {
                    list.push(doc.data());
                });
                dispatch(companyAction.companys(list));
            }, function (error) {
                alert(error.message)
            });
        }
    }

    static AllCompanies(limit) {
        return (dispatch) => {
            if (limit) {
                firebase.firestore().collection("Company").limit(limit).get().then((companys) => {
                    var list = [];
                    companys.forEach(function (doc) {
                        list.push(doc.data());
                    });
                    dispatch(companyAction.companys(list));
                }, function (error) {
                    alert(error.message)
                });

            }
        }
    }

    // static AllCompanies() {
    //     return (dispatch) => {
    //         firebase.firestore().collection("Company").get().then((companys) => {
    //             var list = [];
    //             companys.forEach(function (doc) {
    //                 list.push(doc.data());
    //             });
    //             dispatch(companyAction.companys(list));
    //         }, function (error) {
    //             alert(error.message)
    //         });
    //     }
    // }

    static addCompany(data) {
        return (dispatch) => {
            if (data.certificate) {
                let storegeRef = firebase.storage().ref(`images/${data.uid}`);
                storegeRef.put(data.certificate).on('state_changed', snap => { }, err => { },
                    () => storegeRef.getDownloadURL().then(downloadableUrl => {
                        data.certificate = downloadableUrl;
                        firebase.firestore().collection('Company').doc(`${data.uid}`).set(data).then(() => {
                            alert("Companies Added Successfully");
                        }).catch((e) => {
                            alert("Error", e.message);
                        })
                    }))
            }
        }
    }

    static CompanyId(id) {
        return (dispatch) => {
            firebase.firestore().collection('Company').doc(id).get().then((user) => {
                dispatch(companyAction.CompanyDetail(user.data()))
            })
        }
    }

    static companyTokenAdd(obj) {
        const { companyId, timeET, token, currentDate } = obj
        return (dispatch) => {
            firebase.firestore().collection('Company').doc(companyId).update({ timeET, token, currentDate }).then(() => {
                alert("Token", "Token Added", "success");
                firebase.firestore().collection('Company').doc(companyId).get().then((user) => {
                    dispatch(companyAction.CompanyDetail(user.data()))
                })
            })
        }
    }

    static tokenDispatch({ companyId, token }) {
        return (dispatch) => {
            firebase.firestore().collection('Company').doc(companyId).update({ token });
        }
    }

    static searchCompany(input) {
        return (dispatch) => {
            firebase.firestore().collection('Company').where("name", "==", input).get().then((user) => {
                var list = [];
                user.forEach(function (doc) {
                    list.push(doc.data());
                });
                // const searchedCompany = list.filter((item) => {
                //     return item.name.toLowerCase().substring(0, input.toLowerCase()).indexOf(input.toLowerCase()) !== -1;
                // })
                dispatch(companyAction.Search(list))
            })
        }
    }

    static UserInfo(user) {
        return (dispatch) => {
            const storageRef = firebase.storage().ref(`User/${user.UId}`);
            storageRef.put(user.file).then(function (response) {
                response.ref.getDownloadURL().then(function (url) {
                    user.file = url;
                    firebase.firestore().collection("Users").doc(`${user.UId}`).set(user).then(() => {
                        alert("Please Wait for Response");
                    }).catch((e) => alert(e.message))
                })
            })
        }
    }

    static getCustomers(id) {
        return (dispatch) => {
            firebase.firestore().collection('Users').where("companyId", "==", parseInt(id)).get().then((res) => {
                let list = [];
                res.forEach(element => {
                    list.push(element.data())
                });

                dispatch(companyAction.User(list))
            })
        }
    }


    static updateTokenInFirebase(CurrentToken, companyId) {
        return (dispatch) => {
            firebase.firestore().collection("Company").doc(companyId).update({ CurrentToken }).then(function () {
                // console.log("Token Updated Successfully");
            })
        }
    }

}