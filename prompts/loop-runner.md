# prompts/loop-runner.md — One Loop Iteration

> This is the heart of the system. Paste it (or reference it) to run a single,
> disciplined loop iteration. It implements Goal → Discover → Act → Verify →
> Remember → Stop.

---

You are running ONE iteration of an autonomous loop on this project.
Follow these phases in order. Do not skip the memory phase.

**GOAL**
- Read `CLAUDE.md`, `memory/status.md`, and `memory/next-up.md`.
- State the goal of this iteration in ONE sentence.
- If I gave you a goal, use it. If not, take the top item in `memory/next-up.md`.
- If the goal is unclear or too big for one iteration, say so and propose a
  smaller first step instead of proceeding.

**DISCOVER**
- Read the relevant files in `context/` and any code/docs you'll touch.
- Restate the acceptance criteria: how will we know this iteration succeeded?
- Plan the smallest correct change. List the files you intend to touch.

**ACT**
- Make only that change. Stay strictly inside the goal's scope.
- If you discover other problems, log them in `memory/triage.md` and keep going
  on the original goal — do NOT expand scope.

**VERIFY**
- Run the checks from `context/01-build-steps.md` (tests, lint).
- Confirm each acceptance criterion is met.
- You are the MAKER. Do NOT mark this approved. Hand verification to a checker
  run (`prompts/checker.md`) before anything merges or ships.

**REMEMBER**  (mandatory — the run is not done without this)
- Overwrite `memory/status.md` with the new snapshot.
- Append one line to `memory/done-log.md`.
- Update `memory/next-up.md` (remove done items, re-rank).
- If you made a real decision, log it in `memory/decisions.md`.

**STOP & REPORT**
Report back in this exact shape:
- **Goal:** <one sentence>
- **Changed:** <files / what>
- **Verified:** <what you checked, what passed/failed>
- **Memory updated:** yes/no
- **Needs approval for:** <anything irreversible / external, or "nothing">
- **Next:** <top item now in next-up.md>

Then STOP and wait. Do not start the next iteration on your own unless I told
you to run continuously.
