import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL  = 'https://epzgbrmlkjdqzfutskyr.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwemdicm1sa2pkcXpmdXRza3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzAyMDgsImV4cCI6MjA5MjYwNjIwOH0.Lvzr78kN3XFv_dstfckIv5x2YPBmn52Sz2DAeN1bGII'

const sb = createClient(SUPABASE_URL, SUPABASE_ANON)

// Token'ı URL hash'ten al
const hash = window.location.hash.substring(1)
const params = new URLSearchParams(hash)
const accessToken  = params.get('access_token')
const refreshToken = params.get('refresh_token')

if (!accessToken) {
  document.getElementById('form-view').style.display = 'none'
  document.getElementById('success-view').innerHTML = `
    <div class="icon-circle">❌</div>
    <h1 class="title">Link Expired</h1>
    <p class="subtitle">This reset link is invalid or expired. Please request a new one.</p>
  `
  document.getElementById('success-view').style.display = 'block'
} else {
  sb.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
}

document.getElementById('togglePassword').addEventListener('click', () => toggle('password', document.getElementById('togglePassword')))
document.getElementById('toggleConfirm').addEventListener('click', () => toggle('confirm', document.getElementById('toggleConfirm')))
document.getElementById('password').addEventListener('input', checkStrength)
document.getElementById('submit-btn').addEventListener('click', updatePassword)

function toggle(id, el) {
  const input = document.getElementById(id)
  input.type = input.type === 'password' ? 'text' : 'password'
  el.textContent = input.type === 'password' ? '👁' : '🙈'
}

function checkStrength() {
  const val = document.getElementById('password').value
  const bars = ['s1','s2','s3','s4'].map(id => document.getElementById(id))
  const label = document.getElementById('strength-label')
  bars.forEach(b => b.style.background = '#E5E7EB')
  let score = 0
  if (val.length >= 8) score++
  if (/[A-Z]/.test(val)) score++
  if (/[0-9]/.test(val)) score++
  if (/[^A-Za-z0-9]/.test(val)) score++
  const colors = ['#FF6B6B','#F4A261','#6EE7B7','#2DD4BF']
  const labels = ['Weak','Fair','Good','Strong']
  for (let i = 0; i < score; i++) bars[i].style.background = colors[score - 1]
  label.textContent = score > 0 ? labels[score - 1] : ''
  label.style.color = score > 0 ? colors[score - 1] : '#9CA3AF'
}

function showMsg(text, type) {
  const el = document.getElementById('msg')
  el.textContent = text
  el.className = 'msg ' + type
  el.style.display = 'block'
}

async function updatePassword() {
  const pw  = document.getElementById('password').value
  const con = document.getElementById('confirm').value
  const btn = document.getElementById('submit-btn')

  if (pw.length < 6) return showMsg('Password must be at least 6 characters.', 'error')
  if (pw !== con)    return showMsg('Passwords do not match.', 'error')

  btn.disabled = true
  btn.textContent = 'Updating...'

  const { error } = await sb.auth.updateUser({ password: pw })

  if (error) {
    showMsg(error.message, 'error')
    btn.disabled = false
    btn.textContent = 'Update Password'
  } else {
    document.getElementById('form-view').style.display = 'none'
    document.getElementById('success-view').style.display = 'block'
  }
}
