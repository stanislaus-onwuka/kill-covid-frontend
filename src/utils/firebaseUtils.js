import { auth } from '../firebase.js';

const getAccessToken = async () => (
    new Promise((resolve, reject) => {
        // wait for firebase sdk to resolve current user 
        auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdToken()
                // auth.currentUser.getIdToken(true)
                .then(idToken => {
                    resolve(idToken);
                }).catch(function(error) {
                    reject('error getting token');
                });
            } else {
                reject("user not unauthenticated");
            };
        });
    })
);

export { getAccessToken };