"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await sendEmail(data);

    if (result.error) {
      toast.error("An error occurred! Please try again later.");
      return;
    }

    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="mt-16 lg:flex-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            {...register("name")}
          />

          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <Textarea
            rows={4}
            placeholder="Message"
            autoComplete="Message"
            {...register("message")}
          />

          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>
        {/* <p className="mt-4 text-xs text-muted-foreground">
          By submitting this form, I agree to the{" "}
          <Link href="/privacy" className="link font-bold">
            privacy&nbsp;policy.
          </Link>
          
        </p> */}
      </div>
    </form>
  );
}
