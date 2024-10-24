// Get Rooms


import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, serverTimestamp, where, getDocs, arrayUnion, doc, deleteDoc, arrayRemove } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";

export const getRooms = (setRooms: (rooms: DocumentData[]) => void) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);
  
    const q = query(collection(firestore, "rooms"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rooms: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      setRooms(rooms);
    });
  
    return unsubscribe;
  };

export const addRoom = async (
    roomId: string,
    limit: number,
    description: string,
    tags: string[],
    startUrl: string,
    joinUrl: string
) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const users: string[] = [roomId];

    console.log("Creating room...");

    try {
        await addDoc(collection(firestore, "rooms"), {
            roomId,
            limit,
            createdAt: serverTimestamp(),
            description,
            tags,
            users,
            startUrl,
            joinUrl
        });
        console.log("Room successfully created!");
    } catch (error) {
        console.error("Error adding room document: ", error);
    }
};

export const deleteRoom = async (roomId: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    try {
        const roomsRef = collection(firestore, "rooms");
        const q = query(roomsRef, where("roomId", "==", roomId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                console.log(`Room with roomId: ${roomId} has been successfully deleted.`);
            });
        } else {
            console.log(`No room found with roomId: ${roomId}.`);
        }
    } catch (error) {
        console.error("Error deleting room: ", error);
    }
};

export const leaveRoom = async (roomId: string, uid: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    try {
        const roomsRef = collection(firestore, "rooms");
        const q = query(roomsRef, where("roomId", "==", roomId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                // Update the document by removing the uid from the users array
                await updateDoc(doc.ref, {
                    users: arrayRemove(uid),
                });
                console.log(`User with uid: ${uid} has successfully left the room with roomId: ${roomId}.`);
            });
        } else {
            console.log(`No room found with roomId: ${roomId}.`);
        }
    } catch (error) {
        console.error("Error leaving room: ", error);
    }
};

export const editRoom = async (
    roomId: string,
    limit: number,
    description: string,
    tags: string[]
) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    try {
        const roomsRef = collection(firestore, "rooms");
        const q = query(roomsRef, where("roomId", "==", roomId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    limit,
                    description,
                    tags
                });
                console.log(`Room with roomId: ${roomId} has been successfully updated.`);
            });
        } else {
            console.log(`No room found with roomId: ${roomId}.`);
        }
    } catch (error) {
        console.error("Error updating room: ", error);
    }
};

export const joinRoom = async (uid: string, roomId: string) => {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    try {
        const roomsRef = collection(firestore, "rooms");
        const q = query(roomsRef, where("roomId", "==", roomId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    users: arrayUnion(uid),
                });
                console.log(`User with uid: ${uid} has successfully joined the room with roomId: ${roomId}.`);
            });
        } else {
            console.log(`No room found with roomId: ${roomId}.`);
        }
    } catch (error) {
        console.error("Error joining room: ", error);
    }
};