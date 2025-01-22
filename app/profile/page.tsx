import { getUserProfile } from "@/actions/profile.actions";
import { verifyToken } from "@/lib/helpers/generateSession";
import { cookies } from "next/headers";

type PayloadType = {
  email: string;
  timestamp: number;
  iat: number;
  exp: number;
};

const page = async () => {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session || session.value === "") {
    return;
  }

  const payload = (await verifyToken(session.value)) as PayloadType;

  if (!payload) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await getUserProfile(payload.email);

  return (
    <div className="text-white pt-96">
      <h1>Profile</h1>
      <p>{userData.response?.email}</p>
      <p>{userData.response?.fName}</p>
      <p>{userData.response?.lName}</p>
    </div>
  );
};

export default page;
