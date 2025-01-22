import { getUserProfile } from "@/actions/profile.actions";
import { verifyToken } from "@/lib/helpers/generateSession";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col  text-white w-full pt-[250px] pb-32 max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center">
        <Image
          src={userData.response?.photo}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-4xl font-bold mt-6">
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
