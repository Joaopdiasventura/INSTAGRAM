interface Comment {
    id?: string;
    content?:string;
    fk_user_email?: string;
    fk_post_id?: string;
} 

export default Comment;