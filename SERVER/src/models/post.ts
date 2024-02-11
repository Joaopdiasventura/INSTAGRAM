interface Post {
  id: string;
  url_image: String;
  description: String;
  create_at: Date;
  fk_user_email: String;
}

export default Post;