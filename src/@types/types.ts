export interface PostType {
  _id: string | number;
  postType: 'image' | 'video';
  category: string;
  url: UrlType[];
  title: string;
  description: string;
  prompt: string;
  tags: string[];
  author: Author;
  likeCount: number;
  commentCount: number;
  downloadCount: number;
  like: LikeType[];
  comment: CommentType[];
  createdAt: Date | string;
}

export interface LikeType {
  _id: string;
  postId: string;
  userId: string;
  email: string;
  name: string;
  profileUrl?: string;
}

export interface CommentType {
  _id: string | number;
  postId: string;
  userId: string;
  email: string;
  name: string;
  profileUrl?: string;
  comment: string;
}

export interface UrlType {
  _id: string;
  url: string;
  delete_url: string;
}

interface Author {
  isGuest: boolean;
  authorId: string;
  name?: string;
  email?: string;
  profileUrl?: string;
}
