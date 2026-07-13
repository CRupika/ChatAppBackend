import UserModel from "../models/user.model.js";

class UserService {

    static async getUsers(userId) {

        return await UserModel.getUsers(userId);

    }

    static async getUserById(id) {

        const user = await UserModel.getUserById(id);

        if (!user) {
            throw new Error("User not found.");
        }

        return user;

    }

}

export default UserService;