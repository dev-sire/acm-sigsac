import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  bucketName: string;
  folderPath?: string;
  fileNamePrefix?: string;
  acceptedFileTypes?: string;
  maxSizeKB?: number;
}

const FileUpload = ({
  onUploadComplete,
  bucketName,
  folderPath = '',
  fileNamePrefix = '',
  acceptedFileTypes = 'image/*',
  maxSizeKB = 500,
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > maxSizeKB) {
        toast({
          title: "File too large",
          description: `File size must be less than ${maxSizeKB}KB. Current size: ${Math.round(fileSizeKB)}KB`,
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create file name with prefix (if provided)
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${fileNamePrefix ? fileNamePrefix + '_' : ''}${Date.now()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      // Pass the URL back to the parent component
      onUploadComplete(publicUrlData.publicUrl);

      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded",
      });

      // Reset file selection
      setSelectedFile(null);
      
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="bg-cyber-dark/80 text-white border border-white/20 focus-visible:ring-cyber-neon rounded-md px-3 py-2 flex items-center justify-between">
              <span className="truncate">
                {selectedFile ? selectedFile.name : "Select file"}
              </span>
              <Upload className="h-4 w-4 text-cyber-neon" />
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept={acceptedFileTypes}
              disabled={isUploading}
            />
          </label>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="bg-cyber-neon hover:bg-cyber-neon/80 text-cyber-dark flex-shrink-0"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </div>
      
      {selectedFile && (
        <p className="text-xs text-white/60">
          Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
          <span className="ml-1 text-cyber-neon">Max size: {maxSizeKB}KB</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
