import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: {
    title: string;
    subject: string;
    course: string;
    description: string;
    files: File[];
    tags?: string[];
  }) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    course: "",
    description: "",
    files: [] as File[], // now supports multiple images
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const tagSuggestions = ["Algorithms", "Data Structures", "Python", "React", "Machine Learning", "Math", "AI", "Notes", "Exam", "Project"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTagInput(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Tab" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const handleTagSuggestionClick = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const handleTagRemove = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []).filter(file => file.type.startsWith("image/"));
  setFormData((prev) => ({ ...prev, files }));
  };

  const handleUpload = () => {
    if (formData.files.length > 0) {
      onUpload({
        ...formData,
        files: formData.files,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Upload Material</h2>
        </div>
        <div className="overflow-y-auto max-h-[400px] space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <Input
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleInputChange}
              className="mb-2"
            />
          </div>
          {/* Removed upload type field */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  {tag}
                  <button type="button" className="ml-1 text-red-500" onClick={() => handleTagRemove(tag)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <Input
              name="tags"
              placeholder="Add tag and press Tab or Comma"
              value={tagInput}
              onChange={handleInputChange}
              onKeyDown={handleTagKeyDown}
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {tagSuggestions.filter((tag) =>
                tag.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(tag)
              ).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-blue-200"
                  onClick={() => handleTagSuggestionClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Attachment (Images Only)</label>
            <Input type="file" accept="image/*" multiple onChange={handleFileChange} className="mb-4" />
            {formData.files.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-16 w-16 object-cover rounded border"
                    />
                    <span className="text-xs mt-1 truncate max-w-[80px]">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={formData.files.length === 0 || !formData.title.trim()}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
