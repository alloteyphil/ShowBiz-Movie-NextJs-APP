import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";

export const sendEmail = async (
  email: string,
  fName: string,
  lName: string,
): Promise<{ status: string; message: EmailJSResponseStatus | unknown }> => {
  try {
    if (!email || !fName || !lName) {
      throw new Error("Missing email, fName, or lName");
    }

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        email,
        fName,
        lName,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    );

    return { status: "success", message: response };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }

    return { status: "error", message: "An unknown error occurred." };
  }
};
