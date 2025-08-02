import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CodeEditorModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (code: string, language: string) => void;
}

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "Other", value: "other" },
];

const CodeEditorModal: React.FC<CodeEditorModalProps> = ({ open, onClose, onSend }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");

  const handleSend = () => {
    if (code.trim()) {
      onSend(code, language);
      setCode("");
      setLanguage("python");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Share Code Snippet</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {languages.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Code</label>
          <textarea
            className="w-full border rounded px-2 py-1 font-mono min-h-[120px]"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Paste or write your code here..."
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSend} disabled={!code.trim()} className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CodeEditorModal;
