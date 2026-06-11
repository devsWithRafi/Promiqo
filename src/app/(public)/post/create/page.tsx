import ImageUploadForm from '../_component/ImageUploadForm';

const CreateImage = () => {
  return (
    <section className="p-5 w-full max-w-[1500px] mx-auto">
      <div>
        <h2 className="text-3xl font-righteous">Upload Image</h2>
        <p className="text-muted-foreground mt-2">
          Share your AI-generated mastery with the world. All fields are
          required for professional indexing.
        </p>
      </div>
      <ImageUploadForm />
    </section>
  );
};

export default CreateImage;
