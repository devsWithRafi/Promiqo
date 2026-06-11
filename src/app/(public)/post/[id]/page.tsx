import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import ImageEngagement from './ImageEngagement';
import ImageCommentBox from '@/components/image-content/ImageCommentBox';
import { Input } from '@/components/ui/input';
import { HatGlasses, SendHorizontal } from 'lucide-react';
import ImagePromptBox from '@/components/image-content/ImagePromptBox';
import { CommentType } from '@/@types/types';
import { fetchPostOne } from '@/actions/apis/fetchPostOne';
import PostImageContainer from './PostImageContainer';

const ImageDetailspage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: post } = await fetchPostOne(id!);
  if (!post) return notFound();

  return (
    <section className="sm:p-5 pt-0 w-full md:h-[92vh] mx-auto h-full">
      <div className="w-full h-full flex md:flex-row flex-col sm:border rounded-lg overflow-hidden relative">
        {/* LEFT SIDE */}
        <PostImageContainer post={post} />

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 w-full h-full flex items-start justify-between flex-col p-4 pb-0 relative border-l border-border">
          <div className="flex items-start flex-col w-full h-[100%-calc(72px)] overflow-y-auto">
            {/* header */}
            <div className="flex justify-between gap-5 items-center w-full bg-background border-b pb-3 border-border">
              <div className="flex items-center gap-3">
                <Avatar className="rounded-full size-8 object-cover aspect-square">
                  <AvatarImage src={post.author.profileUrl} />
                  {post.author.isGuest ? (
                    <AvatarFallback>
                      <HatGlasses size={20} />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback>
                      {post?.author?.name?.charAt(0) || '?'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="flex flex-col">
                  <h5 className="font-semibold text-md leading-4">
                    {post.author.name}
                  </h5>
                  <p className="text-xs lowercase text-muted-foreground">
                    {post.author.email}
                  </p>
                </span>
              </div>
              <Button>Follow</Button>
            </div>

            <div className="flex items-start flex-col pt-2 px-1 gap-3">
              {/* CONTENT */}
              <span>
                <h2 className="font-semibold text-2xl">{post.title}</h2>
                <p className="text-md text-muted-foreground">
                  {post.description.slice(0, 100)}
                </p>
              </span>

              {/* PROMPT */}
              {post.prompt.map((prompt: { value: string }, index: number) => (
                <ImagePromptBox
                  key={index}
                  prompt={prompt.value}
                  label={post.prompt.length > 1 ? String(index + 1) : ''}
                />
              ))}

              {/* IMAGE ENGAGEMENTS */}
              <ImageEngagement image={post} />

              {/* IMAGE COMMENTS */}
              <div className="flex flex-col gap-5 mt-3">
                {post.comment.map((com: CommentType) => (
                  <ImageCommentBox key={com._id} comment={com} />
                ))}
              </div>
            </div>
          </div>

          {/* ADD COMMENT */}
          <div className="w-full flex items-center min-h-18 bg-background border-t border-border">
            <div className="w-full flex items-center h-10 relative">
              <Input
                placeholder="Add a comment"
                className="h-full rounded-full px-4"
              />
              <Button className="m-0 h-auto aspect-square rounded-full absolute right-0 scale-[0.85]">
                <SendHorizontal />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageDetailspage;
