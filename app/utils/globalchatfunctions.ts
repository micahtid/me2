import { addDoc, query, orderBy, serverTimestamp, DocumentData, onSnapshot, collection } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";

export const getGlobalChatData = (setGlobalChatMessages: (msgs: DocumentData[]) => void, setIsLoaded: (loaded: boolean) => void) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const q = query(collection(firestore, "global_chat"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        setGlobalChatMessages(messages);
        setIsLoaded(true);
    });

    return unsubscribe;
};

export const sendGlobalChatMessage = async (e: React.FormEvent<HTMLFormElement>, formValue: string, setFormValue: Function, setSending: Function) => {
    const app = initializeFirebase();
    const auth = getUserAuth(true);
    const firestore = getFireStore(true);

    e.preventDefault();

    if (auth.currentUser) {
        const { uid } = auth.currentUser;

        try {
            await addDoc(collection(firestore, "global_chat"), {
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