import { createClient }
from "https://esm.sh/@supabase/supabase-js";
const SUPABASE_URL='https://epzgbrmlkjdqzfutskyr.supabase.co'
const SUPABASE_ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwemdicm1sa2pkcXpmdXRza3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzAyMDgsImV4cCI6MjA5MjYwNjIwOH0.Lvzr78kN3XFv_dstfckIv5x2YPBmn52Sz2DAeN1bGII'

const sb = createClient(
  SUPABASE_URL,
  SUPABASE_ANON
);

document
.getElementById("password")
.addEventListener(
"input",
checkStrength
)

document
.getElementById("togglePassword")
.addEventListener(
"click",
()=>toggle(
"password",
document.getElementById(
"togglePassword"
)
)
)

document
.getElementById("toggleConfirm")
.addEventListener(
"click",
()=>toggle(
"confirm",
document.getElementById(
"toggleConfirm"
)
)
)

document
.getElementById("submit-btn")
.addEventListener(
"click",
updatePassword
)
