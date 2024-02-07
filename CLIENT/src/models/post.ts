import Like from "./like";
import User from "./user";

export default interface Post {
    id: string;
    url_image: string;
    description: string;
    create_at: Date;
    fk_user_email: User;
    likes?: Like[]
}