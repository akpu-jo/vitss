import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
let app;

const firebaseConfig = {
  apiKey: "AIzaSyDTlZgy53G8QwKZCCf-8wDqc1hoxqJbLL0",
  authDomain: "vitaminsussie.firebaseapp.com",
  projectId: "vitaminsussie",
  storageBucket: "vitaminsussie.appspot.com",
  messagingSenderId: "996085854022",
  appId: "1:996085854022:web:1d15bdf8c44d1c5b283f47",
  measurementId: "G-QT157PTT0G",
};

if(getApps().length){
  app = getApp()
}else{
  app =   initializeApp(firebaseConfig);
}

export default app

