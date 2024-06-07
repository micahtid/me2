import Button from '../Button';

import { signOut, createChat } from '@/app/utils/databasefunctions';
import { useActiveChat } from '@/hooks/useActiveChat';
import { useActiveUser } from '@/hooks/useActiveUser';
import { checkChat } from '@/app/utils/filterfunctions';

import { DocumentData } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

interface UserDisplayProps {
    users: DocumentData[] | undefined; 
    auth: Auth;
    chats: DocumentData[] | undefined;
    setActiveChat: Function;
    setActiveUser: Function;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ users, auth, chats, setActiveChat, setActiveUser }) => {
  return (
    <div
    className="
    flex flex-col justify-start items-start gap-y-4"
  >
    <Button onClick={signOut}>Sign Out</Button>
    {users &&
      users.map((u) => (
        <div
          className={`cursor-pointer text-xl font-semibold underline ${
            auth.currentUser && u.uid == auth.currentUser.uid
              ? "hidden"
              : ""
          }`}
          onClick={() => {
            if (auth.currentUser) {
              const chatid =
                auth.currentUser.uid > u.uid
                  ? auth.currentUser.uid + u.uid
                  : u.uid + auth.currentUser.uid;

              if (!checkChat(chatid, chats)) {
                createChat(chatid, auth.currentUser.uid, u.uid, true);
              }

              setActiveChat(chatid);
              setActiveUser(u);
            }
          }}
        >
          {u.userName}
        </div>
      ))}
  </div>
  )
}

export default UserDisplay