export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: {
    name: string;
    username: string;
    email: string;
  };
  Post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
  };
}
