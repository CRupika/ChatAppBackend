// import ConversationModel from "../models/conversation.model.js";

// class ConversationService {

//     static async createConversation() {

//         return await ConversationModel.createConversation();
//     }

//     static async getConversations() {

//         return await ConversationModel.getConversations();
//     }

//     static async getConversationById(id) {

//         const conversation = await ConversationModel.getConversationById(id);

//         if (!conversation) {
//             throw new Error("Conversation not found.");
//         }

//         return conversation;
//     }

// }

// export default ConversationService;

import ConversationModel from "../models/conversation.model.js";

class ConversationService {

    static async createConversation(data) {

        console.log('data ------> 36', data)

        const exist = await ConversationModel.findConversation(
            data.user1_id,
            data.user2_id
        );

        if (exist) {
            return {
                conversation_id: exist.conversation_id,
                message: "Conversation already exists."
            };
        }

        const conversation =
            await ConversationModel.createConversation();

        await ConversationModel.addMember(
            conversation.id,
            data.user1_id
        );

        await ConversationModel.addMember(
            conversation.id,
            data.user2_id
        );

        return conversation;
    }

    static async getConversations(userId) {

        return await ConversationModel.getConversations(userId);

    }

    static async getConversationById(conversationId, userId) {

        const conversation =
            await ConversationModel.getConversationById(
                conversationId,
                userId
            );

        if (!conversation) {
            throw new Error("Conversation not found.");
        }

        return conversation;
    }
}

export default ConversationService;