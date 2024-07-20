import { useForm } from "react-hook-form";
import background from "../../assets/img/bg.jpg";
import background1 from "../../assets/img/loginbg.jpg";
import { Button, Card, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

interface LoginFormInterface {
  email: string;
  password: string;
}

const provider = new GoogleAuthProvider();

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInterface>();
  const navigate = useNavigate();

  async function onSubmit(values: LoginFormInterface) {
    signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
      navigate("/");
    });
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  }

  return (
    <div
      className="flex flex-col h-screen justify-center items-center"
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: `cover`,
      }}
    >
      <h1 className="text-6xl md:text-8xl font-serif font-bold mb-5 text-cyan-700">
        Insta-Book
      </h1>

      <Card
        className="p-10 mx-5 min-w-80 "
        style={{ backgroundImage: `url(${background})` }}
      >
        <CardHeader className="p-0">
          <h1 className="text-2xl text-violet-500 font-bold">Login Here</h1>
        </CardHeader>
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            label="Email"
            size="sm"
            variant="underlined"
            color="secondary"
            className="text-white"
            {...register("email")}
          />
          <Input
            type="password"
            label="Password"
            size="sm"
            variant="underlined"
            color="secondary"
            className="text-white"
            autoComplete="current-password"
            {...register("password")}
          />

          <Button type="submit" size="sm" color="secondary">
            Login
          </Button>
          <Button color="primary" size="sm" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </form>
        <CardFooter>
          <Link to="/signup" className="underline text-purple-600">
            New here ? Register Now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
