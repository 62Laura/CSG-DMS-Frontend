#!/usr/bin/env bash
# Script to fix navigation path issues in Admin dashboard + related files

set -euo pipefail

# Root directory (you can adjust if your files are elsewhere)
ROOT_DIR="."
BACKUP_SUFFIX=".bak"

echo "🔍 Searching for .tsx files in $ROOT_DIR..."

# Loop through all TSX files
find "$ROOT_DIR" -type f -name "*.tsx" | while read -r FILE; do
  # Only process files that contain admin navigation patterns
  if grep -qE 'navigate\(\.\./admin/|navigate\(/admin/Admin' "$FILE"; then
    BACKUP="${FILE}${BACKUP_SUFFIX}"
    cp "$FILE" "$BACKUP"

    echo "📂 Backing up $FILE -> $BACKUP"
    echo "🛠️  Fixing navigation paths in $FILE"

    # Apply fixes
    sed -i '
      s|navigate("../admin/AdminProfile")|navigate("/admin/profile")|g
      s|navigate("../admin/MemberRegistration")|navigate("/admin/members")|g
      s|navigate("/admin/AdminSettings")|navigate("/admin/settings")|g
      s|navigate("../admin/AdminSettings")|navigate("/admin/settings")|g
      s|navigate("../admin/Dashboard")|navigate("/admin")|g
      s|navigate("/admin/AdminProfile")|navigate("/admin/profile")|g
      s|navigate("/admin/MemberRegistration")|navigate("/admin/members")|g
    ' "$FILE"

    echo "✅ Fixed $FILE"
  fi
done

echo "🎉 All admin navigation paths fixed successfully!"
