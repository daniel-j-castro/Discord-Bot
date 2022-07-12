import mongoose from "mongoose";

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    messageId: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    guild: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
})

export default mongoose.model('log', schema)