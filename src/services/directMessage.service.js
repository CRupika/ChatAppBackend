import DirectMessageModel from "../models/directMessage.model.js";

class DirectMessageService {

    static async sendMessage(data) {

        return await DirectMessageModel.create(data);

    }

    static async getMessages(conversationId) {

        return await DirectMessageModel.getConversationMessages(
            conversationId
        );

    }

    static async editMessage(id, message) {

        const updatedMessage =
            await DirectMessageModel.updateMessage(
                id,
                message
            );

        if (!updatedMessage) {
            throw new Error("Message not found.");
        }

        return updatedMessage;

    }

    static async deleteMessage(id) {

        const deletedMessage =
            await DirectMessageModel.deleteMessage(id);

        if (!deletedMessage) {
            throw new Error("Message not found.");
        }

        return deletedMessage;

    }

}

export default DirectMessageService;