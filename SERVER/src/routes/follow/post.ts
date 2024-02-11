import { FastifyInstance } from "fastify";
import { FollowUserParams } from "../../controllers/Follow/followUserController/protocols";
import { FollowUserController } from "../../controllers/Follow/followUserController/followUser";
import { FollowUserRepository } from "../../repositories/Follow/followUserRepository/followUser";
import IsAll from "../../middlewares/follow/post";

async function Post(app: FastifyInstance) {
  app.post("/follow", async (request, reply) => {
    const Body = request.body as FollowUserParams;

    const validation = IsAll(Body);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }

    const followUserRepository = new FollowUserRepository();
    const followUserController = new FollowUserController(followUserRepository);
    try {
      const { body, statusCode } = await followUserController.handle({
        body: Body,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Post;