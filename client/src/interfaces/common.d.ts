export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    id:string | undefined,
    type: string | undefined,
    name: string | undefined,
    avatar: string | undefined,
    email: string | undefined,
    location: string | undefined,
    number: number | undefined,
    properties: Array 
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: number,
    photo: string,
    agent: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
}

export interface UserInfo {
    id: string;
    name: string;
    photo: string;
    email: string;
    exp: number;
    iat: number;
    location: string;
    number: number;
    allProperties:Array<string>
  }