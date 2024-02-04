import { FastifyInstance } from "fastify";
import { FollowUserParams } from "../controllers/Follow/followUserController/protocols";
import { FollowUserRepository } from "../repositories/Follow/followUserRepository/followUser";
import { FollowUserController } from "../controllers/Follow/followUserController/followUser";
import { GetFollowersParams } from "../controllers/Follow/getFollowersController/protocols";
import { GetFollowersRepository } from "../repositories/Follow/getFollowersRepository/getFollowers";
import GetFollowersController from "../controllers/Follow/getFollowersController/getFollowers";
import { GetFollowingsRepository } from "../repositories/Follow/getFollowingsRepository/getFollowings";
import GetFollowingsController from "../controllers/Follow/getFollowingsController/getFollowings";

export default async function (app: FastifyInstance): Promise<void> {
    app.post("/follow", async (request, reply) => {
        const Body = request.body as FollowUserParams;

        const followUserRepository = new FollowUserRepository();
        const followUserController = new FollowUserController(followUserRepository);
        try {
            const {body, statusCode} = await followUserController.handle({
                body: Body
            });
            reply.code(statusCode).send(body);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    app.get("/follower/:email", async (request, reply) => {
        const Params = request.params as GetFollowersParams;

        const getFollowersRepository = new GetFollowersRepository();
        const getFollowersController = new GetFollowersController(getFollowersRepository);

        try {
            const {body, statusCode} = await getFollowersController.handle({
                params: Params
            });
            reply.code(statusCode).send(body);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    app.get("/following/:email", async (request, reply) => {
        const Params = request.params as GetFollowersParams;

        const getFollowingsRepository = new GetFollowingsRepository();
        const getFollowingsController = new GetFollowingsController(getFollowingsRepository);

        try {
            const {body, statusCode} = await getFollowingsController.handle({
                params: Params
            });
            reply.code(statusCode).send(body);
        } catch (error) {
            reply.code(500).send(error);
        }
    });
}