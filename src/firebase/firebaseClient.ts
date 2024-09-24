// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import {
    FirestoreSettings,
    connectFirestoreEmulator,
    getFirestore,
    initializeFirestore,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firestore settings
const firestoreSettings: FirestoreSettings = {
    ignoreUndefinedProperties: true,
};

// Initialize Firebase
export const firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

const source = process.env.NEXT_PUBLIC_FIREBASE_SOURCE ?? 'production';
const useEmulators = source !== 'production';

export const firebaseAuth = useEmulators ? getAuth() : getAuth(firebaseApp);
// export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStore = useEmulators
    ? getFirestore()
    : initializeFirestore(firebaseApp, firestoreSettings);
export const firebaseStorage = useEmulators ? getStorage() : getStorage(firebaseApp);

if (useEmulators) {
    const authAddress = `http://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST}`;
    console.log(`Connecting to auth: ${authAddress}`);
    connectAuthEmulator(firebaseAuth, authAddress, { disableWarnings: true });

    const storeAddress = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST;
    const storePort = +process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT!;
    console.log(`Connecting to store = ${storeAddress}:${storePort}`);
    connectFirestoreEmulator(firebaseStore, storeAddress!, storePort);

    const storageAddress = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST!;
    const storagePort = +process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT!;
    console.log(`Connecting to storage = ${storageAddress}:${storagePort}`)
    connectStorageEmulator(firebaseStorage, storageAddress, storagePort);

    console.log('Done connecting to emulators');
}
