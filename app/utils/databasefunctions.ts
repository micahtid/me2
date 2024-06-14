import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, addDoc, query, orderBy, serverTimestamp, doc, DocumentData, onSnapshot, collection, Firestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";
import { signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";


////////////////////////////////////////////////////
//// Initializing Functions & Others ///////////////
////////////////////////////////////////////////////
export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCVZcN1p21TgNA-jSx9x7qhCAmwf8Sei8E",
    authDomain: "me2-web-app.firebaseapp.com",
    projectId: "me2-web-app",
    storageBucket: "me2-web-app.appspot.com",
    messagingSenderId: "100835264460",
    appId: "1:100835264460:web:6af0681fa12e244fca3f69",
    measurementId: "G-L2NXZ8F0B2",
  };

  const app = initializeApp(firebaseConfig);
  return app;
}

export const getUserAuth = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const auth = getAuth();
  return auth;
}

export const getFireStore = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const firestore = getFirestore();
  return firestore;
}

export const signIn = () => {
  const auth = getUserAuth(false);
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export const signOut = () => {
  const auth = getUserAuth(false);
  auth.signOut();
}

////////////////////////////////////////////////////
//// Reading Functions /////////////////////////////
////////////////////////////////////////////////////

export const getChats = (alreadyInit: boolean) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const chatsRef = collection(firestore, "chat_data");
  const chatsQuery = query(chatsRef);
  const [chats] = useCollectionData(chatsQuery);
  return chats;
}

export const getChatData = (firestore: Firestore, chatid: string, setMessages: (msgs: DocumentData[]) => void, setIsLoaded: (loaded: boolean) => void) => {
  if (!chatid) {
    setMessages([]);
    setIsLoaded(true);
    return () => {};
  }

  const q = query(collection(firestore, `/chat_data/${chatid}/messages`), orderBy("createdAt"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    setMessages(messages);
    setIsLoaded(true);
  });

  return unsubscribe;
};

export const getUsers = (setUsers: (users: DocumentData[]) => void) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setUsers(users);
  });

  return unsubscribe;
};

////////////////////////////////////////////////////
//// Writing Functions /////////////////////////////
////////////////////////////////////////////////////

export const sendMessage = async (e: React.FormEvent<HTMLFormElement>, chatid: string, formValue: string, setFormValue: Function, setSending: Function) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  e.preventDefault();

  if (!chatid) {
    return;
  }

  if (auth.currentUser) {
    const { uid } = auth.currentUser;

    try {
      await addDoc(collection(firestore, `/chat_data/${chatid}/messages`), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid
      });
      setFormValue('');
      setSending(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

export const createChat = async (chatid: string, uid1: string, uid2: string, alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase;
  }

  const auth = getUserAuth(true);
  const firestore = getFireStore(true);
  const activeState = "request";
  const ids = [uid1, uid2]

  const chatDataDocRef = doc(firestore, "chat_data", chatid);
  await setDoc(chatDataDocRef, {
    chatid,
    activeState,
    ids
    // uid1,
    // uid2
  });

  const messagesCollectionRef = collection(firestore, `chat_data/${chatDataDocRef.id}/messages`);

  await addDoc(messagesCollectionRef, {
    text: "Hi there!",
    createdAt: serverTimestamp(),
    uid: uid1
  });

}

/// Create request
/// Read requests

export const createRequest = async (chatid: string, uid1: string, uid2: string) => {
  const app = initializeFirebase;
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const activeState = "request";
  const ids = [uid1, uid2]

  const chatDataDocRef = doc(firestore, "chat_data", chatid);
  await setDoc(chatDataDocRef, {
    chatid,
    activeState,
    ids
  });

  const messagesCollectionRef = collection(firestore, `chat_data/${chatDataDocRef.id}/messages`);

  await addDoc(messagesCollectionRef, {
    text: "Hi there!",
    createdAt: serverTimestamp(),
    uid: uid1
  });

}

import { where } from "firebase/firestore";

// SENT = 0 AND RECEIVED = 1
export const getRequests = (uid: string | null | undefined, setRequests: (users: DocumentData[]) => void, status: string) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const index = status === "sent" ? 0 : status === "received" ? 1 : -1;

  const q = query(
    collection(firestore, `/chat_data`),
    where("activeState", "==", "request"),
    where("ids", "array-contains", uid)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const requests: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.ids && data.ids[index] === uid) {
        requests.push(data);
      }
    });
    setRequests(requests);
  });

  return unsubscribe;
};

import { getDocs } from "firebase/firestore";

export const getUser = async (uid: string): Promise<DocumentData | null> => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  
  let user: DocumentData | null = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });

  return user;
};

///
///

export const addUser = async (userName: string, age: number, curr: string, location: string, hobbies: string[], pfp: string | null | undefined) => {
  const app = initializeFirebase
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);


  if (auth.currentUser) {
    const { uid } = auth.currentUser;

    try {
      await addDoc(collection(firestore, "users"), {
        uid,
        userName,
        age,
        curr,
        location,
        hobbies,
        pfp
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

import { deleteDoc, updateDoc } from "firebase/firestore";

export const deleteRequest = async (chatid: string): Promise<void> => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const acceptRequest = async (chatid: string, uid1: string, uid2: string): Promise<void> => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, { activeState: "active" });
  });

  addUserToUserChats(uid1, uid2)
  addUserToUserChats(uid2, uid1)
};

export const getActiveUsers = (uid: string, setActiveUsers: Function) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, 'users'), where('uid', '==', uid));

  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    if (querySnapshot.empty) {
      console.log(`User with UID ${uid} does not exist.`);
      setActiveUsers([]);
      return;
    }

    const userDoc = querySnapshot.docs[0].data();
    const activeUsers: string[] = userDoc.activeUsers || [];

    const activeUserDataPromises = activeUsers.map((activeUid) => getUser(activeUid));
    const activeUserData = await Promise.all(activeUserDataPromises);

    setActiveUsers(activeUserData.filter((user) => user !== null) as DocumentData[]);
  });

  return unsubscribe;
};
import { arrayUnion, getDoc } from "firebase/firestore";

export const addUserToUserChats = async (uid1: string, uid2: string): Promise<void> => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const q = query(collection(firestore, 'users'), where('uid', '==', uid1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDocRef = querySnapshot.docs[0].ref;
    await updateDoc(userDocRef, {
      activeUsers: arrayUnion(uid2)
    });
  } else {
    console.log(`User with UID ${uid1} does not exist.`);
  }
};