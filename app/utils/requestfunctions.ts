import { setDoc, addDoc, query, where, serverTimestamp, doc, DocumentData, onSnapshot, collection, Firestore, getDocs, deleteDoc, updateDoc  } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";
import { addUserToUserChats } from "./usersfunctions";


export const createRequest = async (chatid: string, uid1: string, uid2: string) => {
    const app = initializeFirebase;
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
  
    // await addDoc(messagesCollectionRef, {
    //   text: "Hi there!",
    //   createdAt: serverTimestamp(),
    //   uid: uid1
    // });
  
  }

// SENT = 0 AND RECEIVED = 1
export const getRequests = (uid: string | null | undefined, setRequests: (users: DocumentData[]) => void, status: string) => {
  const app = initializeFirebase();
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

export const deleteRequest = async (chatid: string) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const acceptRequest = async (chatid: string, uid1: string, uid2: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);
    const socialStatus = {[uid1]: null, [uid2]: null}
  
    const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));
  
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { activeState: "active", createdAt: serverTimestamp(), socialStatus });
    });
  
    addUserToUserChats(uid1, uid2)
    addUserToUserChats(uid2, uid1)
  };
  