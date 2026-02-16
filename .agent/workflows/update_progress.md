---
description: Update project progress status
---

# Update Progress Workflow

This workflow updates the project's progress tracking file (`progress/README.md`) to reflect the current status of tasks.

1. **Read the Progress File**
   First, read the current content of `progress/README.md` to understand the existing tasks and their statuses.

   ```bash
   cat progress/README.md
   ```

2. **Identify Completed Tasks**
   Based on the work you have just completed, identify which tasks in the list should be marked as done.

3. **Update the File**
   Use the `replace_file_content` tool to change `[ ]` to `[x]` for the completed tasks.
   If new tasks have emerged or existing tasks need to be broken down, add them to the list as well.

   _Example:_
   - [ ] Implement user login -> [x] Implement user login

4. **Verify Consistency**
   Run `cat progress/README.md` again to ensure the changes are correct and formatted properly.

5. **Commit Changes (Optional)**
   If you are managing version control, stage and commit the changes with a message like "docs: update progress status".
