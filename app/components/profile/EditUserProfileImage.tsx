import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "../../../utils/uploadthing";
import type { UserResponseType } from "@/types/user";
import { updateUserImage } from "@/actions/profile.actions";
import { useUserProfileStore } from "@/store";

const EditUserProfileImage = ({ email }: { email: string }) => {
  const userState = useUserProfileStore((state) => state);

  const { setPhoto } = userState;

  const { toast } = useToast();

  return (
    <UploadDropzone
      className="ut-button:rounded-none ut-button:bg-[#111111] ut-button:text-white rounded-none border-[#111111]/40"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const updateUserProfileImage = async (url: string) => {
          try {
            const response = await updateUserImage(email, url);

            if (response.statusCode === 200) {
              const user: UserResponseType | null = JSON.parse(
                localStorage.getItem("user") || "null",
              );

              if (user) {
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...user,
                    photo: url,
                  }),
                );
                setPhoto(url, userState);
              }

              toast({
                title: "Photo uploaded",
                description: "Photo uploaded successfully",
                className:
                  "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
              });
              return;
            }

            toast({
              title: "Error",
              description:
                "There was a problem uploading your photo. Please try again",
              className:
                "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
            });
            return;
          } catch (error) {
            toast({
              title: "Error",
              description:
                "There was a problem uploading your photo. Please try again",
              className:
                "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
            });
          }
        };

        updateUserProfileImage(res[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Error uploading photo",
          description: "Please try again",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
      }}
    />
  );
};

export default EditUserProfileImage;
