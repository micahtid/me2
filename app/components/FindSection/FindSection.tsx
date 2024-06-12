"use client";

import UserCard from "../UserCard";
import { DocumentData } from "firebase/firestore";

import { useUserModal } from "@/hooks/useUserModal";

interface FindSectionProps {
  users: DocumentData[] | undefined | null;
  user: DocumentData | null | undefined;
}

const FindSection: React.FC<FindSectionProps> = ({
  users,
  user
}) => {
  const { onChangeCurrentUser, onModalOpen } = useUserModal();

  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3"
    >
      {users &&
        users.map((u, index) => (
          <UserCard
            onClick={() => {
              onChangeCurrentUser(u);
              onModalOpen();
            }}
            className={`${user && u.uid == user.uid ? "hidden" : ""}`}
            status="Compatibility 80%"
            user={u}
            key={index}>
              <div>Add</div>
            </UserCard>
        ))}
    </div>
  );
};

export default FindSection;
