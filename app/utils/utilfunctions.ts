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

export const getCompatibility = (user1: DocumentData, user2: DocumentData) => {
    // Get compatibility percentage for each area
    // Find the mean and add weighting to certain areas
    // Age -> 2x, Hobbies -> 3x, Academic -> 2x

    const areaPercentage = user1.location === user2.location ? 1 : 0.25;
    const academicPercentage = user1.curr === user2.curr ? 1 : 0.25;

    const hobbiesPercentage = ((list1: string[], list2: string[]) =>
        (common => common === 0 ? 0 : common === 1 ? 0.7 : 0.7 + (common - 1) * 0.1)(list1.filter(item => list2.includes(item)).length))(user1.hobbies, user2.hobbies);

    const agePercentage = ((age1: number, age2: number) => {
        const ageDifference = Math.abs(age1 - age2);
        return Math.max(1 - (ageDifference * 0.25), 0);
      })(user1.age, user2.age);

    /////
    const totalCompatibility = (agePercentage * 2 + academicPercentage * 2 + 
        areaPercentage + hobbiesPercentage * 3)/(8)

    return totalCompatibility;
}