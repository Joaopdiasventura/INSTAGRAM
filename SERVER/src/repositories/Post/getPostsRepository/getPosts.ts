import { GetPostsParams, IGetPostsRepository } from "../../../controllers/Post/getPostsController/protocols";
import { Message } from "../../../controllers/protocols";
import Post from "../../../models/post";
import prisma from "../../../services/prisma";

export class GetPostsRepository implements IGetPostsRepository {
    async get(params: GetPostsParams): Promise<Message | Post[]> {
        try {
            const user = await prisma.user.findUnique({ where: { email: params.email } });
            if (!user) {
                return {
                    message: "Usuário não encontrado"
                };
            }

            const following = await prisma.follow.findMany({ where: { fk_user_email: user.email } });

            const followingEmails = following.map((follow) => follow.fk_user_email_);

            const posts = await prisma.post.findMany({
                where: {
                    fk_user_email: {
                        in: followingEmails
                    }
                },
                orderBy:{id: "desc"}
            });

            return posts;
        } catch (error) {
            return error;
        }
    }
}
