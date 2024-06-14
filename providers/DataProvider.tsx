"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import { initializeFirebase, getUserAuth, getChats, getUsers, getRequests, getActiveUsers } from "@/app/utils/databasefunctions";
import { Auth, User } from "firebase/auth";

type DataContextType = {
  user: null | undefined | DocumentData;
  users: null | undefined | DocumentData[];
  chats: undefined | DocumentData[];
  sentRequests: undefined | null | DocumentData[];
  receivedRequests: undefined | null | DocumentData[];
  activeUsers: undefined | DocumentData[]; // Added activeUsers
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export interface Props {
  [propNames: string]: any;
}

export const DataContextProvider = (props: Props) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const chats = getChats(true);

  const getUserHook = (auth: Auth) => {
    const [user, setUser] = useState<User | undefined | null>(undefined); // Initialize with undefined

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, [auth]);

    return [user];
  };

  const getUsersHook = () => {
    const [users, setUsers] = useState<DocumentData[] | undefined>(undefined); // Initialize with undefined

    useEffect(() => {
      const unsubscribe = getUsers(setUsers);
      return () => unsubscribe();
    }, []);

    return [users];
  };

  const getActiveUsersHook = (uid: string) => {
    const [activeUsers, setActiveUsers] = useState<DocumentData[] | undefined>(undefined);

    useEffect(() => {
      if (uid) {
        const unsubscribe = getActiveUsers(uid, setActiveUsers);
        return () => unsubscribe();
      }
    }, [uid]);

    return [activeUsers];
  };

  const [users] = getUsersHook();
  const [user] = getUserHook(auth);

  const getRequestHook = (status: string) => {
    const [requests, setRequests] = useState<DocumentData[] | undefined | null>(undefined);

    useEffect(() => {
      if (user?.uid) {
        const unsubscribe = getRequests(user?.uid, setRequests, status);
        return () => unsubscribe();
      }
    }, [user]);

    return [requests];
  };

  const [sentRequests] = getRequestHook('sent');
  const [receivedRequests] = getRequestHook('received');
  const [activeUsers] = getActiveUsersHook(user?.uid || "");

  const value = {
    user,
    users,
    chats,
    sentRequests,
    receivedRequests,
    activeUsers // Added activeUsers to the value
  };

  return <DataContext.Provider value={value} {...props} />;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};
