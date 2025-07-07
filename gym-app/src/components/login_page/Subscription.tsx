import React, { useState } from "react";
import { z } from "zod";
import type { ZodIssue } from "zod";
import { User, Shield, CreditCard } from "lucide-react";
import Background from "../../assets/gymphoto5.jpg";

const subscriptionSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  confirmPassword: z.string(),
  birthDate: z.string().min(1, { message: "Date de naissance requise" }),
  plan: z.enum(["basic", "premium", "elite"], { message: "Veuillez sélectionner un plan" }),
  terms: z.boolean().refine(val => val === true, { message: "Vous devez accepter les conditions" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const plans = [
  { id: "basic", name: "Basic", price: "29€", features: ["Accès 24h/24", "Support client"] },
  { id: "premium", name: "Premium", price: "49€", features: ["Cours illimités", "Coaching 2h/mois"] },
  { id: "elite", name: "Elite", price: "79€", features: ["Coaching illimité", "Suivi médical"] },
];

const Subscription = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    plan: "",
    terms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = subscriptionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err: ZodIssue) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      alert("Inscription réussie !");
      console.log("Données valides :", result.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#1C1C1C]/80 backdrop-blur-md border border-gray-200/20 rounded-2xl shadow-2xl p-8 w-full max-w-3xl space-y-6 text-white"
      >
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#D7FD52]">
              <User /> Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} className="input-style" />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} className="input-style" />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-style" />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

            <input name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} className="input-style" />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}

            <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="input-style" />
            {errors.birthDate && <p className="text-red-400 text-sm">{errors.birthDate}</p>}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#D7FD52]">
              <Shield /> Sécurité
            </h2>
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={formData.password} onChange={handleChange} className="input-style" />
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

            <input name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirmer mot de passe" value={formData.confirmPassword} onChange={handleChange} className="input-style" />
            {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-[#D7FD52] underline">
              {showPassword ? "Cacher" : "Afficher"} le mot de passe
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#D7FD52]">
              <CreditCard /> Choisissez votre plan
            </h2>
            {plans.map((plan) => (
              <label key={plan.id} className={`block border rounded-xl p-4 cursor-pointer transition hover:border-[#D7FD52] ${formData.plan === plan.id ? "border-[#D7FD52]" : "border-gray-300"}`}>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={formData.plan === plan.id}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="font-bold text-white">{plan.name} - {plan.price}</span>
                <ul className="text-sm text-gray-300 ml-6 mt-1 list-disc">
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </label>
            ))}
            {errors.plan && <p className="text-red-400 text-sm">{errors.plan}</p>}

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
              J'accepte les conditions générales
            </label>
            {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Précédent
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="bg-[#D7FD52] hover:bg-[#B7EB00] text-black font-bold px-6 py-2 rounded-md"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#D7FD52] hover:bg-[#B7EB00] text-black font-bold px-6 py-2 rounded-md"
            >
              S'inscrire maintenant
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Subscription;
