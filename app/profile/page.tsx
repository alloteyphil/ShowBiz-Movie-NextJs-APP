import { getUserProfile } from "@/actions/profile.actions";
import { verifyToken } from "@/lib/helpers/generateSession";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import noUser from "../../public/images/user.png";
import { redirect } from "next/navigation";
import EditUserProfile from "../components/EditUserProfile";

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

  const userData = await getUserProfile(payload.email);

  if (userData.response === null) {
    redirect("/");
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   userData.response
  //    = e.target.value;
  // };

  return (
    <div className="grid place-items-center bg-white text-[#111111] w-full min-h-screen">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-5xl mb-4">Manage Profile</h1>

        <Image
          src={userData.response.photo || noUser}
          alt="Profile Picture"
          className="w-32 h-32 rounded-none "
        />
        <EditUserProfile userData={userData.response} />

        <h1 className="text-4xl font-bold">
          {userData.response?.fName + " " + userData.response?.lName}
        </h1>
        <div className="flex flex-col w-[550px] h-[300px] relative gap-8 mt-7 border-[0.5px] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm">First Name</p>
              <p className="text-lg font-medium">{userData.response?.fName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Name</p>
              <p className="text-lg font-medium">{userData.response?.lName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="text-lg font-medium">{userData.response?.email}</p>
              <Link
                href="/profile/editProfile"
                className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
