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
    uid: string, // current user's id
    setNotifStatus: (status: (prevStatus: { [key: string]: number }) => { [key: string]: number }) => void
  ) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);
  
    const unsubscribes: (() => void)[] = [];
  
    for (const chatid of chatids) {
      // Access the messages collection within the chat_data document
      const messagesCollectionRef = collection(firestore, `chat_data/${chatid}/messages`);
  
      // Query to get the last 10 messages ordered by createdAt
      const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(10));
  
      const unsubscribe = onSnapshot(messagesQuery, (messagesSnapshot) => {
        if (messagesSnapshot.empty) {
          setNotifStatus((prevStatus) => ({ ...prevStatus, [chatid]: 0 }));
          return;
        }
  
        // Get the message documents
        const messagesDocs = messagesSnapshot.docs;
        let count = 0;
  
        // Iterate through the messages to count consecutive messages from the other user
        for (const messageDoc of messagesDocs) {
          const messageData = messageDoc.data();
  
          // If the message is from the other user, increase the count
          if (messageData.uid !== uid) {
            count += 1;
          } else {
            // If the message is from the current user, stop counting
            break;
          }
        }
  
        // Update the notification count for the specific chat
        setNotifStatus((prevStatus) => ({ ...prevStatus, [chatid]: count }));
      });
  
      unsubscribes.push(unsubscribe);
    }
  
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  };
  