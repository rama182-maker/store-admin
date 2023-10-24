import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://mtevjzeirqhpkhtybzku.supabase.co";
const supabaseAnonkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZXZqemVpcnFocGtodHliemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNTQzNzEsImV4cCI6MjAxMzczMDM3MX0.L4SslHpFoME8sP9MWrHdQJMSx3HxXNzQvUwLgc9moU4";

export const supabase = createClient(supabaseURL, supabaseAnonkey);
