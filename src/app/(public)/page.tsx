import { PostType } from '@/@types/types';
import { fetchAllPost } from '@/actions/apis/fetchAllPost.action';
import GridLayoutPost from '@/components/GridLayoutPost';
import ImageCard from '@/components/image-content/ImageCard';

const HomePage = async () => {
  const posts = await fetchAllPost();

  return (
    <section className="p-4 pt-0 w-full max-w-550 mx-auto">
      {posts.data && (
        <GridLayoutPost>
          {posts.data.map((post: PostType) => (
            <ImageCard key={post._id} image={post} />
          ))}
        </GridLayoutPost>
      )}
    </section>
  );
};

export default HomePage;
