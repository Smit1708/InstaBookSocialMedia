import { Button, Card, Input, ScrollShadow } from "@nextui-org/react";
import { SendIcon, CircleUserRound, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

type ChatList = {
  message: string;
  sender: string;
  receiver: string;
};

const Chats = () => {
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [specificChat, setSpecificChat] = useState<ChatList[]>([]);
  async function addMessage() {
    const msgRef = collection(db, "chats");

    if (auth.currentUser) {
      await addDoc(msgRef, {
        message: message,
        sender: auth.currentUser.email,
        receiver: currentChat,
      });
    } else {
      console.log("You are not logged in!!");
    }
    setMessage("");
  }

  useEffect(() => {
    async function getMessages() {
      let list: any = [];
      if (auth.currentUser) {
        const q = query(
          collection(db, "chats"),
          where("sender", "==", auth.currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let chat = doc.data();
          if (!list.some((c: ChatList) => c.receiver === chat.receiver)) {
            list.push(chat);
          }
        });
        setChatList(list);
      } else {
        console.log("Sign in required!!");
      }
    }
    getMessages();
  }, []);

  async function getSpecificMsgs(current: string) {
    let list: any = [];
    if (auth.currentUser) {
      const q = query(
        collection(db, "chats"),
        where("sender", "==", auth.currentUser.email),
        where("receiver", "==", current)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let chat = doc.data();
          list.push(chat);
        });
        setSpecificChat(list);
      });
    } else {
      console.log("Sign in required!!");
    }
  }

  console.log(chatList);

  return (
    <>
      <aside className="fixed left-0 w-full md:w-1/4 py-5 h-screen bg-purple-400">
        <h1 className="text-4xl font-bold text-purple-800 text-center  pb-5  shadow-md">
          All Chats
        </h1>

        <ScrollShadow
          className="h-[85%] w-full px-2 pt-2"
          visibility="none"
          hideScrollBar
        >
          {chatList.map((value, index) => (
            <Card
              className="h-fit p-3 mb-2 w-full hover:bg-purple-200 transition-all hover:cursor-pointer"
              key={index}
              isPressable
              isHoverable
              onClick={() => {
                setCurrentChat(value.receiver);
                getSpecificMsgs(value.receiver);
                console.log(specificChat);
              }}
            >
              <h4 className="font-semibold text-lg underline">
                <div className="flex gap-3 items-center text-purple-800">
                  <CircleUserRound></CircleUserRound> {value.receiver}
                </div>
              </h4>
              <p className="font-light">
                <div className="flex gap-3 items-center text-slate-500">
                  <MessageCircle></MessageCircle>: {value.message}
                </div>
              </p>
            </Card>
          ))}
        </ScrollShadow>
        <h1 className="text-lg font-bold text-purple-100 text-center my-3 pb-2">
          Insta-book
        </h1>
      </aside>
      <main className="fixed h-[100dvh] right-0 p-8 w-full md:w-3/4 bg-purple-200">
        <h2 className="text-lg bg-purple-800 inline-block px-10 py-1 rounded-md mb-5 text-white font-semibold">
          User Name
        </h2>
        <div className="flex items-center w-full">
          <Input
            className="fixed bottom-20 w-[calc(100%-3.5rem)] md:w-1/2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Input>
          <Button
            isIconOnly
            className="bg-black fixed bottom-20 right-4 md:right-[22%] max-sm:right-[18%]"
            onClick={() => addMessage()}
          >
            <SendIcon className="text-white"></SendIcon>
          </Button>
        </div>
        <section className="h-[75%] w-full">
          <ScrollShadow className="h-full w-full" visibility="none">
            {specificChat.map((chat, index) => (
              <Card
                className="max-w-[80%] w-fit rounded-md px-5 mb-2"
                key={index}
              >
                <h4 className="font-bold underline">{chat.sender}</h4>
                <p>{chat.message}</p>
                <p className="text-xs text-end text-slate-400">time</p>
              </Card>
            ))}
          </ScrollShadow>
        </section>
      </main>
    </>
  );
};

export default Chats;
