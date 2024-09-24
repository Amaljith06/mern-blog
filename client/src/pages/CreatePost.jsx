import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          {/* Title */}
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          {/* Category */}
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="news">News</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          {/* Image Upload */}
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone={
              theme === "light" ? "pinkToOrange" : "purpleToBlue"
            }
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        {/* Write Box */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        {/* Publish Button */}
        <Button
          type="submit"
          gradientDuoTone={theme === "light" ? "pinkToOrange" : "purpleToBlue"}
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
