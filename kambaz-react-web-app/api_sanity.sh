#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-https://kambaz.onrender.com}"   # change to http://localhost:4000 for local testing
COOKIE="$(mktemp)"
USER="demo$RANDOM"
PASS="Passw0rd!"
EMAIL="$USER@example.com"

say() { printf "\n==> %s\n" "$*"; }
pass() { echo "✅ $*"; }
fail() { echo "❌ $*" && exit 1; }

# 0) Find courses base path automatically
COURSE_BASE=""
for p in /api/courses /api/course /courses; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" "$BASE$p")
  case "$code" in
    200|204|401|403) COURSE_BASE="$p"; break ;;
  esac
done
[ -n "$COURSE_BASE" ] || fail "Couldn't find courses endpoint (tried /api/courses, /api/course, /courses)"

say "Using courses endpoint: ${COURSE_BASE}"

# 1) Health
say "1) Health"
curl -fsS "$BASE/api/health" | grep -q '"ok":true' && pass "health ok" || fail "health failed"

# 2) Signup (minimal fields only)
say "2) Signup"
curl -fsS -c "$COOKIE" -H 'Content-Type: application/json' -X POST \
  -d '{"username":"'"$USER"'","password":"'"$PASS"'","email":"'"$EMAIL"'"}' \
  "$BASE/api/users/signup" | grep -q "\"username\":\"$USER\"" && pass "signup ok" || fail "signup failed"

# 3) Current user (correct route for your API)
say "3) /api/users/current"
curl -fsS -b "$COOKIE" "$BASE/api/users/current" | grep -q "\"username\":\"$USER\"" \
  && pass "current user ok" || fail "current user failed"

# 4) Create course
say "4) Create course"
COURSE=$(curl -fsS -b "$COOKIE" -H 'Content-Type: application/json' -X POST \
  -d '{"title":"Demo Course","description":"Smoke test"}' \
  "$BASE$COURSE_BASE")
CID=$(echo "$COURSE" | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
[ -n "${CID:-}" ] && pass "created course id=$CID" || fail "create course failed"

# 5) List courses includes created
say "5) List courses"
curl -fsS -b "$COOKIE" "$BASE$COURSE_BASE" | grep -q "$CID" && pass "list ok" || fail "list missing created"

# 6) Update course title
say "6) Update course"
curl -fsS -b "$COOKIE" -X PUT -H 'Content-Type: application/json' \
  -d '{"title":"Demo Course (edited)"}' \
  "$BASE$COURSE_BASE/$CID" | grep -q "edited" && pass "update ok" || fail "update failed"

# 7) Delete course
say "7) Delete course"
curl -fsS -b "$COOKIE" -X DELETE "$BASE$COURSE_BASE/$CID" | grep -q "$CID" && pass "delete ok" || fail "delete failed"

# 8) (Optional) Sign out
say "8) Sign out (optional)"
if curl -fsS -b "$COOKIE" -X POST "$BASE/api/users/signout" >/dev/null 2>&1; then
  pass "signout ok"
else
  echo "ℹ️ no signout endpoint (ok to skip)"
fi

rm -f "$COOKIE"
say "ALL API CHECKS PASSED 🎉"
