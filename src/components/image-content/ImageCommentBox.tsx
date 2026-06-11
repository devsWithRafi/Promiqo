import { CommentType } from '@/@types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const ImageCommentBox = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="rounded-full size-6 object-cover aspect-square">
        {comment.profileUrl && <AvatarImage src={comment.profileUrl} />}
        <AvatarFallback>{comment.name.charAt(0) || '?'}</AvatarFallback>
      </Avatar>
      <span>
        <p className="font-medium text-md">{comment.name}</p>
        <p className="text-sm text-muted-foreground -mt-1">{comment.comment}</p>
      </span>
    </div>
  );
};

export default ImageCommentBox;
