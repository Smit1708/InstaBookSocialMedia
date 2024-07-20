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
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../lib/firebase";

export default function NewPostForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);

  const { register, handleSubmit } = useForm();

  async function onSubmit(values: any) {
    const storageRef = ref(storage, `posts/${timestamp + randomNum}.jpeg`);
    const file = values.image[0];
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      })
      .catch((error) => {
        console.error(error);
      });

    const imgUrl: string = await getDownloadURL(storageRef);
    console.log(imgUrl);

    if (auth.currentUser) {
      // Add a new document in collection "cities"
      await addDoc(collection(db, "posts"), {
        Title: values.title,
        Description: values.description,
        Image: imgUrl,
        user: auth.currentUser?.email,
      });
      console.log("uploaded successfully");
    } else {
      console.log("log in kar ke aao");
    }
    console.log(values);
  }

  return (
    <>
      <Button onPress={onOpen} color="secondary" className="mb-4">
        Add Post
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    autoFocus
                    type="file"
                    label="Image"
                    accept=".jpeg"
                    placeholder="Upload Your Image"
                    variant="bordered"
                    {...register("image")}
                  />
                  <Input
                    autoFocus
                    type="text"
                    label="Title"
                    placeholder="Write a title..."
                    variant="bordered"
                    {...register("title")}
                  />
                  <Input
                    autoFocus
                    type="text"
                    label="Description"
                    placeholder="Write a description..."
                    variant="bordered"
                    {...register("description")}
                  />
                  <Button color="primary" type="submit" onPress={onClose}>
                    Upload
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
