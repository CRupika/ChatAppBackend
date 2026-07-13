import WorkspaceModel from "../models/workspace.model.js";

class WorkspaceService {

    static async createWorkspace(data) {

        const { name, createdBy } = data;

        if (!name) {
            throw new Error("Workspace name is required");
        }

        return await WorkspaceModel.createWorkspace(
            name,
            createdBy
        );
    }

    static async getAllWorkspaces() {

        return await WorkspaceModel.getAllWorkspaces();

    }

    static async getWorkspaceById(id) {

        const workspace =
            await WorkspaceModel.getWorkspaceById(id);

        if (!workspace) {
            throw new Error("Workspace not found");
        }

        return workspace;
    }

    static async updateWorkspace(id, data) {

        const { name } = data;

        if (!name) {
            throw new Error("Workspace name is required");
        }

        const workspace =
            await WorkspaceModel.updateWorkspace(
                id,
                name
            );

        if (!workspace) {
            throw new Error("Workspace not found");
        }

        return workspace;
    }

    static async deleteWorkspace(id) {

        const workspace =
            await WorkspaceModel.deleteWorkspace(id);

        if (!workspace) {
            throw new Error("Workspace not found");
        }

        return workspace;
    }

}

export default WorkspaceService;