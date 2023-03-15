import {useState} from "react"
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";
import { Box } from "@mui/system";
import jwt_decode from "jwt-decode";
import { UserInfo } from "interfaces/common";




const CreateProperty = () => {
  // const { data: user } = useGetIdentity();
const agentToken = localStorage.getItem("agent");
const showUserInfo: UserInfo | null = agentToken ? jwt_decode<UserInfo>(agentToken) : null;

// console.log(showUserInfo);
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
      refineCore: { onFinish, formLoading },
      register,
      handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
        new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        });

    reader(file).then((result: string) =>
        setPropertyImage({ name: file?.name, url: result }),
    );
};
  const onFinishHandler = async (data: FieldValues) => {
        if (!propertyImage.name) return alert("Please select an image");

        console.log(data)
        await onFinish({
            ...data,
            photo: propertyImage.url,
            //@ts-ignore
            email: showUserInfo.email,
        });
    };

  return (
    <Box 
    // sx={{ bgcolor: "#11142d" ,width:"100%",height:"100%" }}
    >

    <Form
    
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={formLoading}
    handleSubmit={handleSubmit}
    handleImageChange={handleImageChange}
    onFinishHandler={onFinishHandler}
    propertyImage={propertyImage}
    />
    </Box>
  )
}

export default CreateProperty