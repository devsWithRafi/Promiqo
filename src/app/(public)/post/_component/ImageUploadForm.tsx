'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiMiniPlus } from 'react-icons/hi2';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { imageUploadFormSchema } from '../../imageUploadFormSchema';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { imageCategories } from '../../imageCategories';
import { UploadImages } from '@/actions/helpers/Uploader';
import { createImage } from '@/actions/action/createImage.action';
import LoadingAnim from '@/components/LoadingAnim';
import { useRouter } from 'next/navigation';

const ImageUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: true,
    onDrop: useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setImages((prev) => [...prev, ...acceptedFiles]);
      }
    }, []),
  });

  const [formPending, startFormPending] = useTransition();

  const [multiPrompt] = useState([{ value: '' }]);

  const form = useForm<z.infer<typeof imageUploadFormSchema>>({
    resolver: zodResolver(imageUploadFormSchema),
    defaultValues: {
      title: '',
      description: '',
      prompt: multiPrompt,
      category: '',
      tags: [],
      postType: 'image',
    },
  });

  const previewUrls = useMemo(() => {
    if (images.length === 0) return '';
    return images.map((image) => URL.createObjectURL(image));
  }, [images]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'prompt',
  });

  function onSubmit(data: z.infer<typeof imageUploadFormSchema>) {
    startFormPending(async () => {
      const imageUrls = await UploadImages(images);

      const result = await createImage({
        ...data,
        url: imageUrls,
      });
       console.log(result)
      if (result.success) {
        toast.success('Image uploaded successfully');
        form.reset();
        setImages([]);
      } else {
        console.log(result.error);
        toast.error(result.error as string);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        'w-full flex md:flex-row flex-col gap-5 mt-10',
        formPending && 'opacity-50 cursor-not-allowed pointer-events-none',
      )}
    >
      <div
        className={cn(
          'grid grid-cols-2 gap-3 relative aspect-square md:w-2/3 w-full md:h-2/3',
          previewUrls.length < 1 && 'grid-cols-1',
        )}
      >
        {previewUrls.length > 0 &&
          [...previewUrls].map((url, index) => (
            <div
              key={url}
              className="rounded-md aspect-square flex-1 relative group"
            >
              <Image
                src={url}
                alt={'image'}
                width={100}
                height={100}
                className="pointer-events-none w-full h-full select-none object-cover aspect-square rounded-md"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="bg-red-500 text-white rounded-full p-1 absolute right-1 top-1 opacity-0 group-hover:opacity-100"
              >
                <RxCross2 size={20} />
              </button>
            </div>
          ))}
        {images.length < 4 && (
          <div
            {...getRootProps()}
            onClick={open}
            className={cn(
              'border-2 border-border flex flex-col gap-2 items-center justify-center border-dashed rounded-md  aspect-square flex-1 duration-300 ease-in-out',
              isDragActive && 'bg-muted/50 border-muted-foreground',
            )}
          >
            <input {...getInputProps()} className="hidden" />
            {images.length > 0 ? (
              <HiMiniPlus className="size-10 text-muted-foreground" />
            ) : (
              <>
                <MdOutlineCloudUpload className="size-20 text-muted-foreground" />
                <h3 className="text-lg font-medium">Drag and drop media</h3>
                <p className="text-muted-foreground w-1/2 text-center text-sm">
                  Support for JPG, PNG, WEBP and MP4. Maximum file size 50MB.
                </p>
                <Button type="button" variant="outline" className="mt-2">
                  Browse File
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="w-full">
        <FieldGroup>
          <div className="flex items-center justify-between w-full gap-5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Title"
                    autoComplete="off"
                    className="rounded w-full h-10 px-4"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Category
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      type="button"
                      className="rounded w-full min-h-10 px-4"
                    >
                      <SelectValue
                        placeholder="Select"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {imageCategories.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`prompt.${index}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between w-full gap-5">
                    <FieldLabel>Image Prompt {index + 1}</FieldLabel>
                    <div className="flex gap-2">
                      {index === 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => append({ value: '' })}
                          className="text-xs rounded"
                        >
                          Add Prompt
                        </Button>
                      )}
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                          className="text-xs rounded"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Prompt"
                    autoComplete="off"
                    className="rounded w-full h-30 px-4"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Description (Optional)
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Description"
                  autoComplete="off"
                  className="rounded w-full h-20 max-h-40 px-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            className="rounded-full mt-5 h-auto py-2.5 px-5"
          >
            {formPending ? <LoadingAnim text="Uploading..." /> : 'Upload'}
          </Button>
          <Button
            type="button"
            variant={'destructive'}
            onClick={() => router.back()}
            className="rounded-full mt-5 h-auto py-2.5 px-5"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ImageUploadForm;
