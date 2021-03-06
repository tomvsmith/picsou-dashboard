import { Box, Card, CardContent, SvgIcon, SvgIconProps } from '@material-ui/core';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import React from 'react';
import { AppTitle } from '../../app-step/view/app-loading';
import { firebaseAuthClientID } from '../../firebase/create-firebase-app';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { AuthSuccessAction } from '../reducer/auth-actions';
import { FirebaseAuthButton } from './firebase-auth-button';

const GoogleIcon: React.FC<SvgIconProps> = props => (
    <SvgIcon {...props}>
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
    </SvgIcon>
);

const getFirebaseUIConfig = (dispatchAuthSuccess: () => void): firebaseui.auth.Config => ({
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            clientId: firebaseAuthClientID
        }
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    callbacks: {
        signInSuccessWithAuthResult: user => {
            dispatchAuthSuccess();

            return false;
        },
    }
});

export const AuthView: React.FC = () => {

    const { dispatchAuthSuccess } = useAppDispatch({
        dispatchAuthSuccess: AuthSuccessAction
    });

    const uiConfig = getFirebaseUIConfig(dispatchAuthSuccess);

    return <Box display='flex' flexDirection='column' height='100%' justifyContent='center' alignItems='center'>
        <Card>
            <CardContent>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <AppTitle withFilter />

                    <Box display='inline-block' mb={2}>
                        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='Logo' style={{ filter: 'drop-shadow(-15px 10px 0 rgba(0,0,0,0.25))' }} />
                    </Box>

                    <FirebaseAuthButton uiConfig={uiConfig} variant='primary' startIcon={<GoogleIcon style={{ width: '0.8em', height: '0.8em' }} />}>
                        Enter secret room
                        </FirebaseAuthButton>
                </Box>
            </CardContent>
        </Card>
    </Box>;
};
