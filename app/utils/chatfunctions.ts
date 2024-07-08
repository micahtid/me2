import { updateDoc, addDoc, query, orderBy, serverTimestamp, DocumentData, onSnapshot, collection, where, getDocs, deleteDoc, limit } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";

export const getChatData = (chatid: string, setMessages: (msgs: DocumentData[]) => void, setIsLoaded: (loaded: boolean) => void) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    if (!chatid) {
        setMessages([]);
        setIsLoaded(true);
        return () => { };
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

export const getChatProperty = async (chatid: string, property: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    if (!chatid) {
        return null;
    }

    const q = query(collection(firestore, "chat_data"), where("chatid", "==", chatid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const chatDoc = querySnapshot.docs[0];
    const chatData = chatDoc.data();

    if (property === "createdAt") {
        return chatData.createdAt ? chatData.createdAt.toDate() : null;
    } else if (property === "socialStatus") {
        return chatData.socialStatus ? chatData.socialStatus :null;
    } else {
        return null
    }
};

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

export const deleteChat = async (chatid: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
};

export const setChatComplete = async (chatid: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { activeState: "complete" });
    });
}

export const editSocialStatus = async (chatid: string, uid: string, status: boolean) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const q = query(collection(firestore, 'chat_data'), where('chatid', '==', chatid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        const chatData = doc.data();
        const socialStatus = chatData.socialStatus || {};
        socialStatus[uid] = status;
        await updateDoc(doc.ref, { socialStatus });
    });
};

export const checkNotificationStatus = (
    chatids: string[],
    uid: string,
    setNotifStatus: (status: (prevStatus: { [key: string]: boolean }) => { [key: string]: boolean }) => void
  ) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const unsubscribes: (() => void)[] = [];
  
    for (const chatid of chatids) {
      // Access the messages collection within the chat_data document
      const messagesCollectionRef = collection(firestore, `chat_data/${chatid}/messages`);
  
      // Query to get the last added message document, ordered by createdAt
      const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(1));
  
      const unsubscribe = onSnapshot(messagesQuery, (messagesSnapshot) => {
        if (messagesSnapshot.empty) {
          setNotifStatus((prevStatus) => ({ ...prevStatus, [chatid]: false }));
          return;
        }
  
        // Assuming we have at least one message, get the latest message document
        const latestMessageDoc = messagesSnapshot.docs[0];
        const latestMessageData = latestMessageDoc.data();
  
        // Check if the uid matches uid1 in the latest message document
        setNotifStatus((prevStatus) => ({ ...prevStatus, [chatid]: latestMessageData.uid !== uid }));
      });
  
      unsubscribes.push(unsubscribe);
    }
  
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  };