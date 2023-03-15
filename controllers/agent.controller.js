import Agent from "../mongoDB/models/agent.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createAgent = async (req, res) => {
    try {
        const { agentName, agentMail, agentLocation, mobileNumber, photo,agentPassword } = req.body;
        console.log("Agent Controller", agentName, agentMail, agentLocation, mobileNumber);
        const agentExists = await Agent.findOne({ agentMail });

        if (agentExists) return res.status(400).json({ message: "Agent Already Exist" });
        const photoUrl = await cloudinary.uploader.upload(photo);
        const hashedPassword = await bcrypt.hash(agentPassword, 12)

        if (!agentExists) {

            const newAgent = await Agent.create({
                agentName,
                agentMail,
                agentLocation,
                hashedPassword,
                mobileNumber,
                photo: photoUrl.url,

            });
            console.log(newAgent);
            res.status(200).json(newAgent);
        }

    } catch (error) {
        res.status(500).json({ message: error});
        console.log("error from createAgent",error);

    }
};
const getAllAgents = async (req, res) => {
    try {
        const users = await Agent.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
        console.log("error from getAllAgents",error);
        // "error from signin"
    }
};

 const signin = async (req, res) => {
    const { agentMail, agentPassword } = req.body
    console.log(agentMail,agentPassword);
    try {

        const existingUser = await Agent.findOne({ agentMail })
        console.log("existing user",existingUser);
        if (!existingUser) return res.status(404).json({ message: "Agent Does not Exist" })

        const isPasswordCorrect = await bcrypt.compare(agentPassword, existingUser.hashedPassword)

        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ 
            id: existingUser._id ,
            name:existingUser.agentName, 
            email:existingUser.agentMail,
            photo:existingUser.photo,
            location:existingUser.agentLocation,
            number:existingUser.mobileNumber,
            allProperties:existingUser.allProperties,
            }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        
        res.status(200).json({ agent:token })

    } catch (error) {
        res.status(500).json({ error })
        console.log("error from signin",error);
    }
}

const getAgentInfoByID = async (req, res) => {
    try {
        const { id } = req.params;

        const agent = await Agent.findOne({ _id: id }).populate("allProperties");

        if (agent) {
            res.status(200).json(agent);
        } else { 
            res.status(404).json({ message: "Agent not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log("error from getAgentInfoByID",error);
        
    }
};

export { createAgent, getAllAgents,signin,getAgentInfoByID };
