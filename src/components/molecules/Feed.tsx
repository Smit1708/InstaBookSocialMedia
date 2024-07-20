import { Card } from "@nextui-org/card";
import NewPostForm from "./NewPostForm";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";

interface Post {
  Title: string;
  user: string;
  Image: string;
  Description: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const q = query(collection(db, "posts"));

  const getAllPosts = async () => {
    let postsArray: any[] = [];
    getDocs(q).then((docs) => {
      docs.forEach((doc) => postsArray.push(doc.data()));
      setPosts(postsArray);
    });
  };
  setInterval(() => {
    getAllPosts();
  }, 3000);

  return (
    <main className="p-4 pb-24">
      <NewPostForm></NewPostForm>
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="grid grid-cols-1 gap-4">
          {posts.map((value, index) => {
            return (
              <Card className="w-72 bg-violet-200 rounded-lg " key={index}>
                <img src={value.Image} alt="" className="p-3 pb-0" />
                <div className="p-3">
                  <p>User Id:-{value.user}</p>
                  <p>Title :- {value.Title}</p>
                  <p>Description:- {value.Description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
