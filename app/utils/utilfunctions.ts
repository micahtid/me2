import { DocumentData } from "firebase/firestore"
import { getChatProperty } from "./chatfunctions";

export const checkUser = (uid: string | undefined, uidList: DocumentData[] | null | undefined) => {
    if (!uidList || !uid) {
        return false
    }

    for (let i = 0; i < uidList.length; i++) {
        if (uidList[i].uid == uid) {
            return true;
        }
    }

    return false;
}

export const checkChat = (chatid: string | undefined, activeChats: DocumentData[] | undefined) => {
    if (!chatid || !activeChats) {
        return false;
    }

    for (let i = 0; i < activeChats.length; i++) {
        if (activeChats[i].chatid == chatid) {
            return true;
        }
    }

    return false;
}

export const toTitleCase = (str: string) => {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

export const getTimeLeft = async (chatid: string) => {
    const createdAt = await getChatProperty(chatid, "createdAt");

    if (!createdAt) {
        console.log('Chat creation time not found.');
        return null;
    }

    const now = new Date();
    const chatEndTime = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000);

    // Difference in milliseconds
    const timeDifference = chatEndTime.getTime() - now.getTime();
    // Convert milliseconds to hours
    const hoursLeft = timeDifference / (1000 * 60 * 60);

    // Ensure that the returned value is not negative
    return hoursLeft > 0 ? hoursLeft : 0;
};
