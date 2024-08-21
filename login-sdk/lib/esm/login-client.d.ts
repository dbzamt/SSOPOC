declare class LoginClient {
    constructor();
    init(): Promise<unknown>;
    createNewPassword(password: string): Promise<any>;
    isLoggedIn(): Promise<any>;
    signInFromBrowser(): Promise<any>;

}
export declare const loginClient: LoginClient;
export { };

