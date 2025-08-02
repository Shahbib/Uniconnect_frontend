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
    type: string;
    description: string;
    file: File;
    tags?: string;
  }) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    course: "",
    type: "PDF",
    description: "",
    file: null as File | null,
    tags: "", 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleUpload = () => {
    if (formData.file) {
      onUpload({ ...formData, file: formData.file });
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
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Image">Image</SelectItem>
                <SelectItem value="Document">Document</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Input
              name="tags"
              placeholder="Add tags (comma-separated)"
              value={formData.tags || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              className="mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Attachment</label>
            <Input type="file" onChange={handleFileChange} className="mb-4" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!formData.file || !formData.title.trim()}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
