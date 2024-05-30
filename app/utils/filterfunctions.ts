import { DocumentData } from "firebase/firestore"

export const checkUser = (uid: string | undefined, uidList: DocumentData[] | undefined) => {
    if (!uidList || !uid) {
        return false
    }

    for (let i=0; i<uidList.length; i++) {
        console.log("List: ", uidList[i].uid, "Yours: ", uid)
        if (uidList[i].uid == uid) {
            return true;
        }
    }

    return false;
}