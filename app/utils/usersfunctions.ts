import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, where, getDocs, arrayUnion, doc } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";

export const getUsers = (setUsers: (users: DocumentData[]) => void) => {
  const app = initializeFirebase();
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

export const getUser = async (uid: string): Promise<DocumentData | null> => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  let user: DocumentData | null = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });

  return user;
};

export const addUser = async (userName: string, age: number, 
  curr: string, location: string, hobbies: string[], pfp: string | null | undefined, 
  instagram: string, discord: string, snap: string) => {
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
        pfp,
        instagram,
        discord,
        snap
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

export const getActiveUsers = (uid: string, setActiveUsers: Function) => {
  const app = initializeFirebase();
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

export const addUserToUserChats = async (uid1: string, uid2: string) => {
  const app = initializeFirebase();
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

export const removeUserFromUserChats = async (uid1: string, uid2: string) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, 'users'), where('uid', '==', uid1));
  const querySnapshot = await getDocs(q);

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  if (userData.activeUsers && Array.isArray(userData.activeUsers)) {
    const updatedActiveUsers = userData.activeUsers.filter((userUid: string) => userUid !== uid2);

    await updateDoc(userDoc.ref, { activeUsers: updatedActiveUsers });
  } else {
    console.log(`activeUsers property does not exist or is not an array for user with UID ${uid1}.`);
  }
};

export const editUser = async (uid: string, userName: string, age: number, curr: string, location: string, hobbies: string[], 
  instagram: string, discord: string, snap: string) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDocRef = querySnapshot.docs[0].ref;

    await updateDoc(userDocRef, {
      userName,
      age,
      location,
      curr,
      hobbies,
      instagram,
      discord,
      snap
    });

    console.log(`User document with UID ${uid} successfully updated.`);
  } else {
    console.error(`No user found with UID ${uid}.`);
  }
};