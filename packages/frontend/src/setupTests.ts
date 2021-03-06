// should be first
import './firebase/firebase-imports';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import firebase from 'firebase/app';
import { firebaseFullConfig } from './firebase-full-config';

// In Node v7 unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', reason => {
        process.env.LISTENING_TO_UNHANDLED_REJECTION = 'true';
        throw reason;
    });
    // Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = 'true';
}

beforeEach(() => {
    firebase.initializeApp({ projectId: firebaseFullConfig.projectName });
    firebase.functions().useFunctionsEmulator("http://localhost:5001");
});

afterEach(async () => {
    await Promise.all(firebase.apps.map(app => app.delete()));
});
