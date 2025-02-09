"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import { SubscribeInfo, type ISubscribe } from "@/mongo/models/Subscribe.model";
import type { UserSubscribeDetailsType } from "@/types/subscribe";

export const storeEmail = async (
  email: string,
  fName: string,
  lName: string,
): Promise<
  | {
      statusCode: number;
      message: string;
      subscriber: UserSubscribeDetailsType | null;
    }
  | undefined
> => {
  await connectToDatabase();
  try {
    const existingSubscriber: ISubscribe | null = await SubscribeInfo.findOne({
      email,
    });

    if (existingSubscriber) {
      return {
        statusCode: 409,
        message: "subscriber already exists",
        subscriber: {
          fName: existingSubscriber.fName,
          lName: existingSubscriber.lName,
          email: existingSubscriber.email,
        },
      };
    }

    const newSubscriber: ISubscribe = await SubscribeInfo.create({
      email,
      fName,
      lName,
    });

    return {
      statusCode: 200,
      message: "Subscriber created successfully",
      subscriber: {
        fName: newSubscriber.fName,
        lName: newSubscriber.lName,
        email: newSubscriber.email,
      },
    };
  } catch (error) {
    {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Store subscriber error:", errorMessage);
      return {
        statusCode: 500,
        message: `Failed to create subscriber: ${errorMessage}`,
        subscriber: null,
      };
    }
  }
};
