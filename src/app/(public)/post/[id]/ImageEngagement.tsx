import { ArrowDownToLine, Heart, MessageSquare, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PostType } from '@/@types/types';

const ImageEngagement = ({ image }: { image: PostType }) => {
  return (
    <Card className="w-full min-h-15">
      <CardContent className="flex justify-evenly gap-3 items-center h-full w-full p-0 px-4">
        <button className="w-full flex items-center justify-center gap-1 text-muted-foreground p-2 rounded-full cursor-pointer hover:bg-muted">
          <Heart size={17} />
          {image.likeCount}
        </button>
        <Separator orientation="vertical" />
        <button className="w-full flex items-center justify-center gap-1 text-muted-foreground p-2 rounded-full cursor-pointer hover:bg-muted">
          <MessageSquare size={17} />
          {image.commentCount}
        </button>
        <Separator orientation="vertical" />
        <button className="w-full flex items-center justify-center gap-1 text-muted-foreground p-2 rounded-full cursor-pointer hover:bg-muted">
          <Share size={17} />
        </button>
        <Separator orientation="vertical" />
        <button className="w-full flex items-center justify-center gap-1 text-muted-foreground p-2 rounded-full cursor-pointer hover:bg-muted">
          <ArrowDownToLine size={17} />
          {image.downloadCount}
        </button>
      </CardContent>
    </Card>
  );
};

export default ImageEngagement;
