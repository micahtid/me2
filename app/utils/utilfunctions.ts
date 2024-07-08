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


//////////////////////////////

interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export const convertTimestampToDate = (timestamp: Timestamp): Date => {
    // Extract the seconds and nanoseconds
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    
    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);
    
    return date;
};

export const sortMessagesByDate = (messages: DocumentData[]) => {
    // Convert messages to include the date
    let dates: number[] = [];
  
    messages.forEach((message) => {
      dates.push(convertTimestampToDate(message.createdAt).getDate());
    });
  
    const result: { date: Date | null, messages: DocumentData[] }[] = [];
    let resultObject: { date: Date | null, messages: DocumentData[] } = { date: null, messages: [] };
  
    messages.forEach((message, index) => {
      if (index === 0) {
        resultObject.date = convertTimestampToDate(message.createdAt);
        resultObject.messages.push(message);
      } else {
        if (dates[index] !== dates[index - 1]) {
          result.push(resultObject);
          resultObject = { date: convertTimestampToDate(message.createdAt), messages: [] };
          resultObject.messages.push(message);
        } else {
          resultObject.date = convertTimestampToDate(message.createdAt);
          resultObject.messages.push(message);
        }
      }
    });
  
    // Push the last resultObject if it has messages
    if (resultObject.messages.length > 0) {
      result.push(resultObject);
    }
  
    return result;
  };

//////////////////////////////

export const shuffleArray = (array: DocumentData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
