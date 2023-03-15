import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
    agentName: { type: String, required: true },
    agentMail: { type: String, required: true },
    photo: { type: String, required: true },
    agentLocation: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

const agentModel = mongoose.model("Agent", AgentSchema);

export default agentModel;
