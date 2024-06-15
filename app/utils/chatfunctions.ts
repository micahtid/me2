import { setDoc, addDoc, query, orderBy, serverTimestamp, doc, DocumentData, onSnapshot, collection, where, getDocs, deleteDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";


export const getChats = (alreadyInit: boolean) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const chatsRef = collection(firestore, "chat_data");
    const chatsQuery = query(chatsRef);
    const [chats] = useCollectionData(chatsQuery);
    return chats;
}

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
    const app = initializeFirebase();
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

export const deleteChat = async (chatid: string): Promise<void> => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);
  
    const q = query(collection(firestore, `/chat_data`), where("chatid", "==", chatid));
  
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };
  