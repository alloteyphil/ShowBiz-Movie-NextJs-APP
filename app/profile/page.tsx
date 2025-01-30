import { getUserProfile } from "@/actions/profile.actions";
import { verifyToken } from "@/lib/helpers/generateSession";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditUserProfile from "../components/EditUserProfile";
import UserImage from "../components/UserImage";

type PayloadType = {
  email: string;
  timestamp: number;
  iat: number;
  exp: number;
};

const page = async () => {
  let userData;

  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (session) {
    if (session.value !== "") {
      const payload = (await verifyToken(session.value)) as PayloadType;

      userData = await getUserProfile(payload.email);

      if (userData.response === null) {
        redirect("/");
      }
    }
  }

  return (
    <div className="grid place-items-center bg-white text-[#111111] pt-56 pb-36 w-full min-h-screen">
      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="font-bold text-5xl mb-4">Manage Profile</h1>
        <UserImage image={userData?.response?.photo || ""} />
        <EditUserProfile userData={userData?.response} />
      </div>
    </div>
  );
};

export default page;
