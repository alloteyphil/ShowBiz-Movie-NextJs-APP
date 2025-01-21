import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ShowbizNewsletterEmailProps {
  email: string;
  fName: string;
  lName: string;
}

export const ShowbizNewsletterEmail = ({
  email,
  fName,
  lName,
}: ShowbizNewsletterEmailProps) => {
  const previewText = `Welcome to the Showbiz Insider, ${fName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans px-2">
          <Container className="bg-white border border-solid border-gray-300 rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="text-center">
              <Heading className="text-black text-[24px] font-bold my-[20px]">
                Welcome to Showbiz Insider, {fName}!
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {fName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px] my-[16px]">
              We're thrilled to have you on board. Get ready for exclusive
              updates, breaking news, and behind-the-scenes stories from the
              world of entertainment.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3"
                href="https://show-biz-delta.vercel.app/"
              >
                Check out our latest movies
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              If you have any questions or feedback, feel free to reply to this
              email or contact us at{" "}
              <Link
                href={`mailto:alloteyphilip@gmail.com`}
                className="text-blue-600 no-underline"
              >
                alloteyphilip@gmail.com
              </Link>
              .
            </Text>
            <Text className="text-gray-600 text-[12px] leading-[24px] mt-[20px]">
              You are receiving this email because you subscribed to Showbiz
              Insider. If you no longer wish to receive updates, you can{" "}
              <Link href="#" className="text-blue-600 no-underline">
                unsubscribe here
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// ShowbizNewsletterEmail.PreviewProps = {
//   email: "subscriber@example.com",
//   fName: "John",
//   lName: "Doe",
// } as ShowbizNewsletterEmailProps;

export default ShowbizNewsletterEmail;
