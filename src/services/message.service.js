import MessageModel from '../models/message.model.js'

class MessageService {

    static async sendMessage(data) {

        return await MessageModel.create(data);
    }

    static async getMessages(channelId) {

        return await MessageModel.getChannelMessages(channelId);
    }

    static async editMessage(id, message) {

        const updateMessage = await MessageModel.updateMessage(id, message);
        if (!updateMessage) {
            throw new Error("Message not found")
        }
        return updateMessage;
    }

    static async deleteMessage(id) {

        const deleteMessage = await MessageModel.deleteMessage(id);
        if (!deleteMessage) {
            throw new Error("Message not found")
        }
        return deleteMessage;
    }

}

export default MessageService;