import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  /** Current main image URL */
  mainImage: string;
  /** Current gallery URLs */
  gallery: string[];
  /** Called when main image changes */
  onMainImageChange: (url: string) => void;
  /** Called when gallery changes */
  onGalleryChange: (urls: string[]) => void;
  /** Folder prefix in the bucket (e.g. product slug) */
  folder?: string;
}

const BUCKET = "product-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

const ImageUploader = ({ mainImage, gallery, onMainImageChange, onGalleryChange, folder = "products" }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Use JPG, PNG, WebP, or SVG.", variant: "destructive" });
      return null;
    }
    if (file.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Maximum 5MB per image.", variant: "destructive" });
      return null;
    }
    const ext = file.name.split(".").pop() || "png";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    return getPublicUrl(path);
  };

  const handleMainUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) onMainImageChange(url);
    setUploading(false);
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) newUrls.push(url);
    }
    if (newUrls.length > 0) onGalleryChange([...gallery, ...newUrls]);
    setUploadingGallery(false);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGalleryImage = (index: number) => {
    onGalleryChange(gallery.filter((_, i) => i !== index));
  };

  const removeMainImage = () => {
    onMainImageChange("");
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div>
        <label className="text-sm font-semibold text-foreground block mb-2">Main Image</label>
        <div className="flex items-start gap-4">
          {mainImage ? (
            <div className="relative group">
              <img src={mainImage} alt="Main product" className="w-24 h-24 object-contain rounded-lg border border-border bg-secondary/30 p-1" />
              <button onClick={removeMainImage} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary/10">
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input ref={mainInputRef} type="file" accept="image/*" onChange={handleMainUpload} className="hidden" />
            <Button type="button" variant="outline" size="sm" onClick={() => mainInputRef.current?.click()} disabled={uploading} className="gap-2">
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG, WebP, SVG. Max 5MB.</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <label className="text-sm font-semibold text-foreground block mb-2">Gallery Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {gallery.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt={`Gallery ${i + 1}`} className="w-20 h-20 object-contain rounded-lg border border-border bg-secondary/30 p-1" />
              <button onClick={() => removeGalleryImage(i)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {gallery.length === 0 && (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary/10">
              <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
            </div>
          )}
        </div>
        <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
        <Button type="button" variant="outline" size="sm" onClick={() => galleryInputRef.current?.click()} disabled={uploadingGallery} className="gap-2">
          {uploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          {uploadingGallery ? "Uploading..." : "Upload Gallery Images"}
        </Button>
        <p className="text-xs text-muted-foreground mt-1">Select multiple files at once. Max 5MB each.</p>
      </div>
    </div>
  );
};

export default ImageUploader;
