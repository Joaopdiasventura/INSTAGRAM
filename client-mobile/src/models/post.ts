import Like from "./like";
import User from "./user";

interface Post {
  id: string;
  url_image: String;
  description: String;
  create_at: Date;
  fk_user_email: String | User;
  likes?: Like[]
}

export default Post;