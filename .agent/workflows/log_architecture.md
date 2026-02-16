---
description: Log technical decisions and architecture notes
---

# Log Architecture & Technical Decisions Workflow

This workflow is used to document important technical decisions, bug fixes, and architectural changes in `docs/architecture.md`.

1. **Review Existing Logs**
   Read `docs/architecture.md` to see the current structure and previous entries.

   ```bash
   cat docs/architecture.md
   ```

2. **Draft the New Entry**
   Prepare a new entry under the "3. 技術的決定事項と解決策ログ" (Technical Decisions & Solutions Log) section.
   The entry should follow this format:

   ### YYYY-MM-DD: [Title of the Issue/Decision]
   - **課題 (Problem)**: What was the problem or requirement?
   - **解決策 (Solution)**: How was it solved? What alternative was chosen and why?
   - **影響 (Impact)**: Any side effects or things to watch out for.

3. **Append the Entry**
   Use `replace_file_content` (or read file first then rewrite) to append the new entry to the end of the log section. Ensure consistent formatting with existing entries.

4. **Verify**
   Read the file again to confirm the new entry is correctly added and readable.

   ```bash
   cat docs/architecture.md
   ```
