import { DocumentData } from "firebase/firestore"

export const checkUser = (uid: string | undefined, uidList: DocumentData[] | undefined) => {
    if (!uidList || !uid) {
        return false
    }

    for (let i=0; i<uidList.length; i++) {
        console.log(uid, uidList[i].uid)
        if (uidList[i].uid == uid) {
            return true;
        }
    }

    return false;
}

export const checkChat = (chatid: string | undefined, activeChats: DocumentData[] | undefined) => {
    if (!chatid|| !activeChats) {
        return false;
    }

    for (let i=0; i<activeChats.length; i++) {
        if (activeChats[i].chatid == chatid) {
            return true;
        } 
    }

    return false;
}