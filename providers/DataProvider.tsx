"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import { initializeFirebase, getUserAuth, getChats, getUsers } from "@/app/utils/databasefunctions";
import { Auth, User } from "firebase/auth";

type DataContextType = {
  user: null | undefined | DocumentData;
  users: null | undefined | DocumentData[];
  chats: undefined | DocumentData[];
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

  const getUsersHook = (): [DocumentData[] | undefined] => {
    const [users, setUsers] = useState<DocumentData[] | undefined>(undefined); // Initialize with undefined

    useEffect(() => {
      const unsubscribe = getUsers(setUsers);
      return () => unsubscribe();
    }, []);

    return [users];
  };

  const [users] = getUsersHook();
  const [user] = getUserHook(auth);

  const value = {
    user,
    users,
    chats
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
