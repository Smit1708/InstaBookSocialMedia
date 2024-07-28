import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";

interface UserData {
  bio: string;
  username: string;
}

const Account = () => {
  const [userData, setUserData] = useState<UserData>({
    bio: "",
    username: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as UserData; // Cast to UserData
            setUserData(data);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (values: any) => {
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, `users/${auth.currentUser.uid}`), {
          username: values.name,
          bio: values.bio,
        });
        // Update the local state with new data
        setUserData({
          username: values.name,
          bio: values.bio,
        });
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <p>Profile image:</p>
        <h1 className="2xl font-bold">Name: {userData.username}</h1>
        <h1 className="2xl font-bold">Bio: {userData.bio}</h1>

        <Button onPress={onOpen} color="secondary" className="m-4">
          Edit Profile
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit((values) => {
                    onSubmit(values);
                    onClose();
                  })}
                >
                  <Input
                    autoFocus
                    type="text"
                    label="Name"
                    placeholder="Enter Your Name"
                    {...register("name")}
                  />
                  <Input
                    type="text"
                    label="Bio"
                    placeholder="Bio"
                    {...register("bio")}
                  />
                  <Button color="primary" type="submit">
                    Upload
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Account;
