import { FastifyInstance } from "fastify";
import { LikePostParams } from "../controllers/Like/likePostController/protocols";
import { LikePostController } from "../controllers/Like/likePostController/likePost";
import { LikePostRepository } from "../repositories/Like/likePostRepository/likePost";
import { GetLikesParams } from "../controllers/Like/getLikesController/protocols";
import { GetLikesRepository } from "../repositories/Like/getLikesRepository/getLikes";
import { GetLikesController } from "../controllers/Like/getLikesController/getLikes";

export default async function Post(app: FastifyInstance): Promise<void> {

    app.post("/like", async (request, reply) => {
        const Body = request.body as LikePostParams;

        const likePostRepository = new LikePostRepository();
        const likePostController = new LikePostController(likePostRepository);

        try {
            const {body, statusCode} = await likePostController.handle({
                body: Body
            });

            reply.code(statusCode).send(body);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    app.get("/like/:post", async (request, reply) => {
        const Params = request.params as GetLikesParams;

        const getLikesRepository = new GetLikesRepository();
        const  getLikesController = new GetLikesController(getLikesRepository);

        try {
            const {body, statusCode} = await getLikesController.handle({
                params: Params
            });

            reply.code(statusCode).send(body);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

}