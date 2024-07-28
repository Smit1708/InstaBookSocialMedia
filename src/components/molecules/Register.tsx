import { useForm } from "react-hook-form";
import background from "../../assets/img/bg.jpg";
import background1 from "../../assets/img/loginbg.jpg";
import { Button, Card, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface RegisterFormInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInterface>();
  const navigate = useNavigate();

  async function onSubmit(values: RegisterFormInterface) {
    if (values.password === values.confirmPassword) {
      createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log(auth);
      navigate("/login");
      reset();
    } else {
      alert("your password is not match with confirm password!!");
    }
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
        style={{
          backgroundImage: `url(${background})`,
          width: `300px`,
        }}
      >
        <CardHeader className="p-0">
          <h1 className="text-2xl text-violet-500 font-bold">Register Here</h1>
        </CardHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            size="sm"
            variant="underlined"
            color="secondary"
            className="text-white"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg text-red-600">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg  text-red-600">Email is not valid.</p>
          )}
          <Input
            type="password"
            label="Password"
            size="sm"
            variant="underlined"
            color="secondary"
            className="text-white"
            autoComplete="current-password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg  text-red-600">Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg  text-red-600">
              Password should be at-least 6 characters.
            </p>
          )}
          <Input
            type="text"
            label="Confirm Password"
            size="sm"
            variant="underlined"
            color="secondary"
            className="text-white"
            autoComplete="current-password"
            {...register("confirmPassword")}
          />

          <Button type="submit" size="sm" color="secondary">
            Register
          </Button>
        </form>

        <CardFooter className="pl-0 py-3">
          <Link to="/login" className="underline text-blue-600 ">
            Already Register ? Login HERE
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
