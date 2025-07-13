import React,{useCallback} from 'react'
import service from '../appwrite/config'
import { RTE , Button , Input ,Select } from './index'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useForm } from 'react-hook-form'

export default function  Postform({post}){
     const {register,handleSubmit,watch,control,setValue,getValues}=useForm({
       defaultValues : {title:post?.title||"",
        content:post?.content|| "",
        slug:post?.$id ||"",
        status:post?.status||"active",
       },
     });
       
     const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
         console.log(userData);


const submit = async (data) => {
  try {
    if (!userData || !userData.$id) {
      console.error("User data is not available");
      return;
    }

   if (post) {
  // Edit existing post
  let uploadedFile = null;

  if (data.image && data.image[0]) {
    // Only upload a new file if one is selected
    uploadedFile = await service.uploadFile(data.image[0]);
    console.log("📦 Uploaded file ID:", uploadedFile?.$id);
    console.log("📁 Selected file:", uploadedFile);
    console.log("📄 File type:", uploadedFile.type);

    // Delete old image if new one is uploaded
    if (uploadedFile) {
      await service.deleteFile(post.featuredImage);
    }
  }

  // Update the post with or without new image
  const dbPost = await service.updatePost(post.$id, {
    title: data.title,
    content: data.content,
    status: data.status,
    featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
  });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      // Create new post
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const newPostData = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData.$id,
        };

        const dbPost = await service.createPost(newPostData);

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  } catch (error) {
    console.error("❌ Post submission error:", error);
  }
};

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
     return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 text-xl px-5"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 text-xl px-5"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
            
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />


            {post && (() => {
  const previewUrl = service.getFileView(post.featuredImage);
  console.log("📸 Image Preview URL:", previewUrl);

  return (
    <div className="w-full rounded-xl mb-4">
      <img
        src={previewUrl}
        alt={post.title}
        className="rounded-xl w-full border-2 shadow-xl shadow-black border-gray-400"
        onError={() => console.log("❌ Image failed to load")}
      />
    </div>
  );
})()}

                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-800 hover:bg-green-600" : undefined} className=" rounded-lg w-[80%] text-2xl font-bold shadow-lg shadow-black hover:bg-gray-800 py-[16px] mt-2">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
       
    );
}


