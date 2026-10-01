"use client";

import { useState } from "react";

export default function ContactForm({ onSuccess }) {
    const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateForm();

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length !== 0) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch(
      "http://localhost:8080/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    console.log("Backend response:", data);
   onSuccess();

  } catch (error) {
    console.error("Contact submission failed:", error);

  } finally {
    setIsSubmitting(false);
  }
};
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () =>{
        const newErrors = {};

        if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

        if(!formData.email.trim()){
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = "Enter a valid email";
        }
        if (!formData.subject.trim()) {
    newErrors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    newErrors.message = "Message is required";
  }

  return newErrors;

    }
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-7
        md:p-9
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[9px] uppercase tracking-[3px] text-gray-600">
            Secure Channel
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Send a transmission
          </h3>

        </div>

        <div className="hidden items-center gap-2 sm:flex">

          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

          <span className="text-[8px] uppercase tracking-[2px] text-gray-600">
            Online
          </span>

        </div>

      </div>


      <form onSubmit={handleSubmit} className="mt-8 space-y-6">

        {/* NAME */}

        <div>

          <label className="text-[9px] uppercase tracking-[2px] text-gray-500">
            Name
          </label>

          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    name: e.target.value,
                })
            }
            className="
              mt-2
              w-full
              border-b
              border-white/10
              bg-transparent
              px-0
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-gray-700
              transition-colors
              focus:border-blue-400/50
            "
          /> {errors.name && (
  <p className="mt-2 text-[9px] text-red-400">
    {errors.name}
  </p>
)}

        </div>


        {/* EMAIL */}

        <div>

          <label className="text-[9px] uppercase tracking-[2px] text-gray-500">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            vlaue={formData.email}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    email: e.target.value,
                })
            }
            className="
              mt-2
              w-full
              border-b
              border-white/10
              bg-transparent
              px-0
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-gray-700
              transition-colors
              focus:border-blue-400/50
            "
          />
          {errors.email && (
  <p className="mt-2 text-[9px] text-red-400">
    {errors.email}
  </p>
)}

        </div>


        {/* SUBJECT */}

        <div>

          <label className="text-[9px] uppercase tracking-[2px] text-gray-500">
            Subject
          </label>

          <input
            type="text"
            placeholder="What would you like to discuss?"
            value={formData.subject}
             onChange={(e)=>
                setFormData({
                    ...formData,
                    subject: e.target.value,
                })
            }
            className="
              mt-2
              w-full
              border-b
              border-white/10
              bg-transparent
              px-0
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-gray-700
              transition-colors
              focus:border-blue-400/50
            "
          /> 
          {errors.subject && (
  <p className="mt-2 text-[9px] text-red-400">
    {errors.subject}
  </p>
)}

        </div>


        {/* MESSAGE */}

        <div>

          <label className="text-[9px] uppercase tracking-[2px] text-gray-500">
            Message
          </label>

          <textarea
            rows="4"
            placeholder="Tell me about your idea..."
            value={formData.message}
             onChange={(e)=>
                setFormData({
                    ...formData,
                    message: e.target.value,
                })
            }
            className="
              mt-2
              w-full
              resize-none
              border-b
              border-white/10
              bg-transparent
              px-0
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-gray-700
              transition-colors
              focus:border-blue-400/50
            "
          /> 
          {errors.message && (
  <p className="mt-2 text-[9px] text-red-400">
    {errors.message}
  </p>
)}

        </div>


        {/* SUBMIT */}

       <button
  type="submit"
  disabled={isSubmitting}
  className="
    group
    mt-2
    inline-flex
    items-center
    gap-3
    rounded-full
    border
    border-blue-400/30
    bg-blue-500/[0.06]
    px-6
    py-3
    text-[10px]
    font-medium
    uppercase
    tracking-[2px]
    text-blue-300
    transition-all
    duration-300
    hover:border-blue-400/60
    hover:bg-blue-500/[0.10]
    hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {isSubmitting ? "Transmitting..." : "Send Transmission"}

  {!isSubmitting && (
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  )}

  {isSubmitting && (
    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
  )}
</button>
      </form>

    </div>
  );
}