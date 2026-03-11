import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://nffqqhmyotnwznuzhkfv.supabase.co";
const supabaseKey = "sb_publishable_RiMDqj8R2qqORUsKvDHlww_6riOX6BK";

export const supabase = createClient(supabaseUrl, supabaseKey);