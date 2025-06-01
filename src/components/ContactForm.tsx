"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<Inputs | null>(null);

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

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    const formElement = document.querySelector("form");
    const honeypot = formElement?.querySelector(
      'input[name="website"]',
    ) as HTMLInputElement;

    if (honeypot?.value) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setFormData(data);
    setShowConfirmDialog(true);
  };

  const processForm = async () => {
    if (!formData) return;

    setShowConfirmDialog(false);
    const result = await sendEmail(formData);

    if (result.error) {
      toast.error("An error occurred! Please try again later.");
      return;
    }

    toast.success("Message sent successfully!");
    reset();
    setFormData(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute -left-[9999px] opacity-0"
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {/* Name */}
          <div className="h-16">
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
          <div className="h-16">
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
          <div className="h-32 sm:col-span-2">
            <Textarea
              rows={4}
              placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
              autoComplete="Message"
              className="resize-none"
              {...register("message")}
            />

            {errors.message?.message && (
              <p className="input-error">{errors.message.message}</p>
            )}
          </div>
        </div>

        <div className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full disabled:opacity-50"
          >
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            By submitting this form, I agree to the{" "}
            <Link href="/privacy" className="link font-semibold">
              privacy&nbsp;policy.
            </Link>
          </p>
        </div>
      </form>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Just a quick check! 🤔</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p>
                  Hey! Remember to use a real email so I can reply you
                  personally.
                </p>
                <p className="mt-4 font-medium">
                  I&apos;ll be sending my reply to:{" "}
                  <span className="text-foreground">{formData?.email}</span>
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Let me fix that</AlertDialogCancel>
            <AlertDialogAction onClick={processForm} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                  <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>Send</span>
                  <PaperPlaneIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
