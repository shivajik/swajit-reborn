import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SiteSettings = Record<string, string>;

// Default fallback values
const DEFAULTS: SiteSettings = {
  company_name: 'SWAJIT ENGINEERING (P) LTD',
  company_phone: '+91 9922941689',
  company_email: 'marketing@swajit.com',
  company_email_sales: 'sales@swajit.com',
  company_fax: '',
  company_address: 'K-9, M.I.D.C., Waluj, Ch.Sambhajinagar (Aurangabad) - 431136, Maharashtra, India',
  company_website: 'www.swajit.com',
  company_map_link: '',
  social_facebook: '',
  social_linkedin: '',
  social_twitter: '',
  social_youtube: '',
  social_instagram: '',
  seo_title: 'Swajit Engineering Pvt. Ltd. | Industrial Equipment Manufacturer',
  seo_description: '',
  seo_og_image: '',
  branding_logo_url: '',
  branding_favicon_url: '',
};

let cachedSettings: SiteSettings | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings || DEFAULTS);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return;

    supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .then(({ data, error }) => {
        if (data && data.length > 0) {
          const map: SiteSettings = { ...DEFAULTS };
          data.forEach((row: any) => {
            if (row.setting_value) map[row.setting_key] = row.setting_value;
          });
          cachedSettings = map;
          setSettings(map);
        }
        setLoading(false);
      });
  }, []);

  return { settings, loading };
}
