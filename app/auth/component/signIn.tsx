"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Error from "@/app/components/error"
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormInputs, loginFormSchema } from "@/app/types/index";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/store";
import { changeAuthDisplay } from "@/redux/slices/authSlice";
import { AuthScreenDisplay } from "@/app/types";
import Header from "@/app/components/header";

export default function SignIn() {
  const dispatch = useAppDispatch()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<LoginFormInputs>({
      resolver: yupResolver(loginFormSchema),
    });

    const onSubmit = async (data:LoginFormInputs) => {
 setIsLoading(true);
 const response = await signIn("credentials", {
   email: data.email.toLowerCase(),
   password: data.password,
   redirect: false,
 });
        if (response?.ok) {
            setIsLoading(false)
            return router.push('/dashboard')
        }
        if (response?.status == 400) {
            setIsLoading(false)
            toast.error("error trying to login")
        }
    }

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };
  return (
    <section data-test="form-header" className="">
      <Header title="Login to your account" />
      <h1 className="pt-12 font-bold text-2xl lg:text-3xl md:mt-20">
        Welcome back
      </h1>

      {/* Google Button*/}
      <button
        className="flex flex-row items-center justify-center mt-14 w-full py-4 gap-2 px-8 bg-bluemedium text-white rounded-md border border-bluemedium hover:bg-white hover:border hover:border-bluemedium hover:text-gray-600"
        onClick={() => handleGoogleLogin()}
      >
        <Image
          unoptimized={true}
          width={20}
          height={20}
          src="/images/google 1.svg"
          alt=""
        />
        Sign in with Google
      </button>

      {/* Line*/}
      <div className="flex flex-row justify-between mt-12 max-w-full">
        <Image
          unoptimized={true}
          width={25}
          height={25}
          src="/images/Line.svg"
          alt=""
        />
        <p className="text-inactive">Or</p>
        <Image
          unoptimized={true}
          width={25}
          height={25}
          src="/images/Line.svg"
          alt=""
        />
      </div>

      {/* Form components*/}
      <div className="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {loginError && (
              <div className="flex flex-col text-center text-red-600 mb-2 pt-2 pb-2">
                {loginErrorMessage}
              </div>
            )} */}
          <div className="flex flex-col">
            <h3>Email address</h3>
            <input
              type="email"
              data-test="email-input"
              className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2 placeholder:font-thin"
              placeholder="janedoe@email.com"
              {...register("email")}
            />
            {errors.email && <Error message={"errors.email.message"} />}
          </div>

          <div className="flex flex-col mt-5">
            <h3>Password</h3>
            <input
              type="password"
              data-test="password-input"
              className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
              placeholder="Min. 8 characters"
              {...register("password")}
            />
            {errors.password && <Error message={"errors.password.message"} />}
          </div>

          <div className="flex flex-row justify-end">
            <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-2 mt-2">
              <Link href={`#`}>Forgot password?</Link>
            </span>
          </div>

          <div className="flex flex-col mt-14 items-center space-y-4">
            <button
              data-test="login-button"
              className="border border-white w-1/2 p-1 rounded-lg hover:bg-white hover:border-black hover:text-black"
              type="submit"
            >
              Login to account
            </button>
            <p>
              Don&apos;t have an account yet?
              <span
                className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-2 cursor-pointer"
                onClick={() =>
                  dispatch(changeAuthDisplay(AuthScreenDisplay.signUp))
                }
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
