import { cookies } from "next/headers";
import User from "./User";
import { verifyToken } from "@/lib/helpers/generateSession";
import { getUserProfile } from "@/actions/profile.actions";

type PayloadType = {
  email: string;
  timestamp: number;
  iat: number;
  exp: number;
};

const UserWrapper = async () => {
  let userData;

  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session || session.value === "") {
    userData = undefined;
  } else {
    const payload = (await verifyToken(session.value)) as PayloadType;

    if (!payload) {
      return;
    }

    userData = await getUserProfile(payload.email);
  }
  return (
    <div>
      <User session={session?.value} userData={userData?.response} />
    </div>
  );
};

export default UserWrapper;
