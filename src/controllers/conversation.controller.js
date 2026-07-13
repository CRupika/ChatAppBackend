// import ConversationService from "../services/conversation.service.js";

// class ConversationController {

//     static async createConversation(req, res) {

//         try {
//             const conversation = await ConversationService.createConversation()
//             return res.status(201).json({
//                 success: true,
//                 message: "Conversation created successfully",
//                 data: conversation
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }


//     }

//     static async getConversations(req, res) {

//         try{

//             const conversation = await ConversationService.getConversations()
//             return res.status(201).json({
//                 success:true,
//                 data: conversation
//             })

//         }catch(error){

//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//     }

//     static async getConversationById(req, res) {

//         try{

//             const {id} = req?.params;
//             const conversation = await ConversationService.getConversationById(id)
//             return res.status(200).json({
//                 success:true,
//                 data:conversation
//             })

//         }catch(error){

//             return res.status(404).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//     }


// }

// export default ConversationController

import ConversationService from "../services/conversation.service.js";

class ConversationController {

    static async createConversation(req, res) {

        const data = {
            user1_id: req.userId,
            user2_id: req.body.userId
        };

        console.log("Controller Data:", data);

        try {

            const conversation =
                await ConversationService.createConversation(data);

            return res.status(201).json({
                success: true,
                message: "Conversation created successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getConversations(req, res) {

        try {

            const conversations =
                await ConversationService.getConversations(req.user.id);

            return res.status(200).json({
                success: true,
                data: conversations
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getConversationById(req, res) {

        try {

            const conversation =
                await ConversationService.getConversationById(
                    req.params.id,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                data: conversation
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default ConversationController;