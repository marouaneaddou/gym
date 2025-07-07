import React, { useState } from "react";
import { z } from "zod";
import type { ZodIssue } from "zod";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import  Background  from "../../assets/gymphoto5.jpg";
import { Link } from "react-router-dom";



const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err: ZodIssue) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      alert("Login validé avec succès !");
      console.log("Données valides :", result.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5) blur(1px)",
        }}
      />
      {/* Login Container */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-8 lg:px-8 shadow-2xl rounded-2xl w-full max-w-md bg-[#1C1C1C]/80 backdrop-blur-md border border-gray-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white px-1 py-2 text-left">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="Email"
                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm bg-white ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email ? (
                <p className="text-red-500 text-sm mt-1 min-h-[1.5rem]">{errors.email}</p>
              ) : (
                <div className="mt-1 min-h-[1.5rem]" />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                placeholder="Password"
                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm bg-white ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={handleClick}
                className="ml-[-2.5rem] text-xl text-gray-700 hover:text-indigo-600"
                aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </div>
            {errors.password ? (
              <p className="text-red-500 text-sm mt-1 min-h-[1.5rem]">{errors.password}</p>
            ) : (
              <div className="mt-1 min-h-[1.5rem]" />
            )}
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#D7FD52] px-4 py-2 text-sm text-black font-bold shadow-sm hover:bg-[#B7EB00] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Login
          </button>
          
        </form>
        
      </div>
      <Link
  to="/"
  className="fixed bottom-6 right-6 bg-[#D7FD52] text-black font-bold px-6 py-4 rounded-full shadow-lg hover:bg-[#B7EB00] transition "
>
  Accueil
</Link>

    </div>
  );
};

export default Login;
