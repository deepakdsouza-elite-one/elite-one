"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { GOOGLE_SHEETS_API } from "@/lib/utils";
import { useToast } from "@/components/ui/custom-toast";

const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      showToast({
        title: "Missing details",
        description: "Please fill name, email and phone.",
        type: "warning",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("package", "FAQ Lead");

    try {
      const res = await fetch(GOOGLE_SHEETS_API, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        showToast({
          title: "Request sent successfully",
          description: "We’ll get back to you shortly.",
          type: "success",
        });

        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        showToast({
          title: "Submission failed",
          description: "Please try again later.",
          type: "error",
        });
      }
    } catch {
      showToast({
        title: "Network error",
        description: "Check your internet connection.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <h3 className="text-2xl font-semibold mb-1">Let’s talk</h3>
      <p className="text-gray-500 mb-6">Tell us a bit about your project.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="relative">
          <Phone
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="relative">
          <MessageSquare
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <Textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="pl-10 rounded-xl resize-none"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#D9B36C] text-white hover:bg-[#caa55f]"
        >
          <Send size={16} className="mr-2" />
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;
