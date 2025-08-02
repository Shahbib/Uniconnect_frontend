import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, UploadCloud } from "lucide-react";


interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFileSelect: (file: File | null) => void;
  onUpload?: (file: File) => Promise<any>;
}


export const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose, onFileSelect, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDeselect = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFile || !onUpload) return;
    setUploading(true);
    try {
      await onUpload(selectedFile);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setUploading(false);
        setSelectedFile(null);
        onClose();
      }, 1000);
    } catch (e) {
      setUploading(false);
      // Optionally show error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          style={{ cursor: "pointer" }}
        >
          <UploadCloud className="h-10 w-10 text-blue-500 mb-2" />
          <p className="text-sm text-slate-600 mb-2">Drag & drop a file here, or <span className="text-blue-600 underline">browse</span></p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            tabIndex={-1}
            disabled={uploading}
          />
          {selectedFile && (
            <div className="mt-4 flex items-center gap-2 bg-slate-100 rounded px-3 py-2">
              <span className="text-sm font-medium truncate max-w-[180px]">{selectedFile.name}</span>
              <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); handleDeselect(); }} disabled={uploading}>
                <X className="h-4 w-4 text-slate-500" />
              </Button>
            </div>
          )}
          {uploading && (
            <div className="mt-4 text-blue-600 flex items-center gap-2"><span className="loader h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>Uploading...</div>
          )}
          {success && (
            <div className="mt-4 text-green-600">Upload successful!</div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={uploading}>Cancel</Button>
          <Button onClick={handleUpload} disabled={!selectedFile || uploading} className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
