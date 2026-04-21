import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Loader2, ImageIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  placeholder?: string;
  previewClassName?: string;
}

/**
 * Reusable image upload widget.
 * - Shows current image preview
 * - Lets user upload a new file OR paste a URL
 * - Returns public URL via onChange
 */
const ImageUpload = ({
  value,
  onChange,
  bucket = 'site-assets',
  folder = '',
  placeholder = 'https://... or click upload',
  previewClassName = 'w-32 h-24',
}: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      toast({
        title: 'Upload failed',
        description: error.message.includes('not found')
          ? `Bucket "${bucket}" missing. Run docs/storage-and-rls-setup.sql in Supabase.`
          : error.message,
        variant: 'destructive',
      });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast({ title: 'Image uploaded' });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-3 items-start">
        <div className={`${previewClassName} bg-muted rounded-lg overflow-hidden shrink-0 border border-border flex items-center justify-center relative`}>
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 bg-background/80 hover:bg-background rounded-full p-0.5"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-3 h-3 mr-1" /> Upload Image</>
            )}
          </Button>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
