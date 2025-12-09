-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('first_year', 'renewal')),
  original_price INTEGER,
  current_price INTEGER NOT NULL,
  currency TEXT DEFAULT '₹',
  duration_text TEXT NOT NULL,
  badge_text TEXT,
  badge_icon TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  bonus_text TEXT,
  button_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  button_gradient TEXT DEFAULT 'from-blue-600 to-purple-600',
  border_color TEXT DEFAULT 'border-gray-100',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint
ALTER TABLE pricing_plans ADD CONSTRAINT unique_plan_type UNIQUE (plan_type);

-- Insert default pricing data
INSERT INTO pricing_plans (plan_name, plan_type, original_price, current_price, duration_text, badge_text, badge_icon, features, bonus_text, button_text, button_link, button_gradient, border_color, is_featured, display_order) VALUES
(
  'Go For Review Plan',
  'first_year',
  12500,
  10500,
  'One-time payment for the first year',
  'Diwali Special Offer',
  '🎁',
  '[
    "Custom QR code for your business",
    "AI-generated personalized reviews",
    "Mobile-optimized review page",
    "Direct Google Reviews integration",
    "Unlimited scans & reviews",
    "24/7 WhatsApp support",
    "Free updates & improvements",
    "Setup within 24 hours"
  ]'::jsonb,
  'FREE Premium Standee included',
  'Get Your QR Code Now',
  '/#lead-form',
  'from-blue-600 to-purple-600',
  'border-yellow-300',
  true,
  1
),
(
  'Renewal from Second Year',
  'renewal',
  NULL,
  10500,
  'Annual renewal for continued access',
  NULL,
  NULL,
  '[
    "Continued QR code access (no downtime)",
    "Keep unlimited scans & reviews active",
    "Ongoing access to AI review generator",
    "Lifetime support & future upgrades",
    "Google review page remains live",
    "Annual platform maintenance & security updates"
  ]'::jsonb,
  NULL,
  'Renew Your Access',
  '/renewalplanform',
  'from-yellow-400 to-orange-500',
  'border-gray-100',
  false,
  2
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_pricing_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pricing_updated_at_trigger
BEFORE UPDATE ON pricing_plans
FOR EACH ROW
EXECUTE FUNCTION update_pricing_updated_at();

-- Add RLS policies
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON pricing_plans
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage
CREATE POLICY "Allow all access for service role" ON pricing_plans
  FOR ALL USING (true);
