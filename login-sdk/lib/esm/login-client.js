
import { signIn } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { confirmSignIn } from 'aws-amplify/auth';  

class LoginClient {
    constructor() {
    }

    init() {
        return new Promise((resolve, reject) => {
            const awsconfig = {
                Auth: {
                    Cognito:{
                            region: 'ap-south-1',
                            userPoolId: 'ap-south-1_GBrI16qi6',
                            userPoolClientId: '6r7ag07ii2og7eiv8bnjgshs54',
                            loginWith: { // Optional
                                oauth: {
                                    domain: 'testingsso.auth.ap-south-1.amazoncognito.com',
            scope: ['openid', 'email', 'profile'],
            redirectSignIn: 'http://localhost:4200/',  // Redirect URI for Application 1
            redirectSignOut: 'http://localhost:4200/', // Redirect URI for Application 1
            responseType: 'code',
                                }
                            }
                               
                        },
                      },

                };                     
           
              Amplify.configure(awsconfig);
            const currentConfig = Amplify.getConfig();
            console.log("currentConfig", currentConfig);
            resolve(true);
        });
    }

    signInFromBrowser() {
        try {
          const signInInput = {
            username: 'amitkumar',
            password: 'Welcome@12345',
            options: {
              authFlowType: 'USER_PASSWORD_AUTH'
            }
          };
        
          return new Promise((resolve, reject) => {
            let auth ;
              signIn(signInInput).then((data) => {
                resolve({
                    data
                 });
              }, (error) => {
                  reject(error);
              });
          });
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }

    createNewPassword(password) {
        return new Promise((resolve, reject) => {
            confirmSignIn({ challengeResponse: password }).then((data) => {
                resolve({
                    auth_status: 'TOKEN_RECEIVED',
                    data: data
                });
            }, (error) => {
                reject(error);
            });
        });
    }


    async isLoggedIn() {
        return new Promise((resolve, reject) => {
            try{
                fetchAuthSession()
                .then(res => {
                    resolve(res);
                    console.log(res);
                });
            }catch(error){
                reject(error);
                console.log(error);

            }
        });
    }
}
export const loginClient = new LoginClient();
