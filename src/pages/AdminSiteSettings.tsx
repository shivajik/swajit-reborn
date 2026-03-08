import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Building2, Globe, Search, Palette, Save, Upload, Loader2 } from 'lucide-react';

type Settings = Record<string, string>;

const SETTING_GROUPS = {
  company: {
    label: 'Company Info',
    icon: Building2,
    description: 'Basic company contact details shown across the site',
    fields: [
      { key: 'company_name', label: 'Company Name', type: 'text' },
      { key: 'company_phone', label: 'Phone Number', type: 'text' },
      { key: 'company_email', label: 'Email Address', type: 'text' },
      { key: 'company_email_sales', label: 'Sales Email', type: 'text' },
      { key: 'company_fax', label: 'Fax Number', type: 'text' },
      { key: 'company_address', label: 'Address', type: 'textarea' },
      { key: 'company_map_link', label: 'Google Maps Link', type: 'text' },
    ],
  },
  social: {
    label: 'Social Media',
    icon: Globe,
    description: 'Social media profile URLs for footer and contact pages',
    fields: [
      { key: 'social_facebook', label: 'Facebook URL', type: 'text' },
      { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'social_twitter', label: 'Twitter / X URL', type: 'text' },
      { key: 'social_youtube', label: 'YouTube URL', type: 'text' },
      { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
    ],
  },
  seo: {
    label: 'SEO Metadata',
    icon: Search,
    description: 'Search engine optimization settings for better visibility',
    fields: [
      { key: 'seo_title', label: 'Site Title (shown in browser tab)', type: 'text' },
      { key: 'seo_description', label: 'Meta Description', type: 'textarea' },
      { key: 'seo_og_image', label: 'OG Image URL (for social sharing)', type: 'text' },
    ],
  },
  branding: {
    label: 'Logo & Branding',
    icon: Palette,
    description: 'Upload or set URLs for your site logo and favicon',
    fields: [
      { key: 'branding_logo_url', label: 'Logo URL', type: 'image' },
      { key: 'branding_favicon_url', label: 'Favicon URL', type: 'image' },
    ],
  },
};

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (data) {
      const map: Settings = {};
      data.forEach((row: any) => {
        map[row.setting_key] = row.setting_value || '';
      });
      setSettings(map);
    }
    if (error) {
      toast({ title: 'Error loading settings', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(settings).map(([setting_key, setting_value]) =>
      supabase
        .from('site_settings')
        .update({ setting_value, updated_at: new Date().toISOString() })
        .eq('setting_key', setting_key)
    );

    const results = await Promise.all(updates);
    const hasError = results.some((r) => r.error);

    if (hasError) {
      toast({ title: 'Error saving some settings', variant: 'destructive' });
    } else {
      toast({ title: 'Settings saved successfully!' });
    }
    setSaving(false);
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(key);
    const ext = file.name.split('.').pop();
    const fileName = `${key}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('client-logos')
      .upload(`settings/${fileName}`, file, { upsert: true });

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('client-logos')
      .getPublicUrl(`settings/${fileName}`);

    handleChange(key, urlData.publicUrl);
    setUploading(null);
    toast({ title: 'Image uploaded!' });
  };

  const renderField = (field: { key: string; label: string; type: string }) => {
    const value = settings[field.key] || '';

    if (field.type === 'textarea') {
      return (
        <div key={field.key} className="space-y-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          <Textarea
            id={field.key}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            rows={3}
          />
        </div>
      );
    }

    if (field.type === 'image') {
      return (
        <div key={field.key} className="space-y-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          <div className="flex items-center gap-3">
            <Input
              id={field.key}
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder="https://... or upload"
              className="flex-1"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(field.key, file);
                }}
              />
              <Button type="button" variant="outline" size="icon" asChild disabled={uploading === field.key}>
                <span>{uploading === field.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}</span>
              </Button>
            </label>
          </div>
          {value && (
            <div className="mt-2">
              <img src={value} alt={field.label} className="h-16 object-contain rounded border border-border bg-muted p-1" />
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={field.key} className="space-y-2">
        <Label htmlFor={field.key}>{field.label}</Label>
        <Input
          id={field.key}
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold">Site Settings</h1>
              <p className="text-muted-foreground text-sm">Manage global site configuration</p>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save All
            </Button>
          </div>

          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(SETTING_GROUPS).map(([key, group]) => (
                <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                  <group.icon className="w-4 h-4 mr-1.5 hidden sm:inline-block" />
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(SETTING_GROUPS).map(([key, group]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <group.icon className="w-5 h-5" />
                      {group.label}
                    </CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.fields.map(renderField)}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminSiteSettings;
