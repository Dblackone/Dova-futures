# governance/guardrails.md — Stay the Engineer

> Loops increase leverage — but also token cost, slop risk, and comprehension
> debt. These guardrails keep you in control. This is the most important file.

## 1. Cost control
- Set a budget per run / per day. Track tokens.
- If a run exceeds budget or loops more than N times without progress: STOP,
  summarise, ask. Spinning is failure, not effort.
- Prefer the smallest model/run that does the job; escalate only when needed.

## 2. Quality gates
- No merge without a passing checker run (maker ≠ checker).
- All tests + lint green. No critical issues open.
- Scope matches goal — reject scope creep.

## 3. Approval steps (human-in-the-loop)

**Without scoped full permission**, the loop must STOP and get your explicit
approval before:

- Merging to protected `main`
- Major repository restructuring
- Changes to governance or the agent hierarchy
- Major module deletion or replacement
- Production deployment
- Sending any external message (email, client doc, public post)
- Secrets, credentials, billing, or external-service changes
- Deleting data, dropping tables, force-pushing, rotating keys
- Protected branch changes
- Spending money or calling paid external services beyond budget
- Major changes to project scope or direction
- Anything it isn't sure is reversible

### 3a. When you have already granted full permission

You may give an agent full authority for a defined session, task, project,
workstream, or goal — "all permissions are given", "proceed without further
approval", "do whatever is required", "achieve this at all costs", or anything
with the same clear intent. The full contract is
[`governance/agents/GOVERNANCE.md`](agents/GOVERNANCE.md) §3.

Inside that scope the agent has **advance approval** and must not stop to ask
again. The list above still applies, but as a *necessity* test rather than an
*approval* test: an item on it may proceed only where it is genuinely necessary
to achieve the approved objective and can be done safely within the permissions
the agent actually has.

**This does not turn the guardrails off.** Under full permission the agent still
branches rather than working on `main`, still tests, still documents significant
changes, still validates the result, and still reports failures and unresolved
risks honestly. What changes is that it stops asking permission — not that it
stops being careful.

Three things a grant never covers, unless you say so on that specific item:

1. The hard stops in `governance/agents/SHARED-RULES.md` §9 and
   `company/ethics.md` — client delivery, secrets, fabricated claims,
   append-only records.
2. **Independent verification before merge** (§2 below). Full permission waives
   asking, not checking.
3. Restructuring the deploy-critical paths — repo root site files,
   `dova-preorder/`, `render.yaml`, `CNAME`, `.github/workflows/deploy.yml`.

### 3b. Your instruction is authorization

A direct instruction or approval from you is valid authorization anywhere in
this repository, regardless of which agent owns or created the affected work.
An agent that refuses your instruction by citing a scope or ownership rule has
misread the governance layer — those rules exist to keep agents from colliding
with each other, not to gate you.

## 4. Risk monitor
Watch two debts every run and flag them when they rise:
- **Slop risk** — output volume outrunning quality. Symptom: lots of changes,
  thin verification. Fix: tighten acceptance criteria, smaller iterations.
- **Comprehension debt** — you can no longer explain what the loop did or why.
  Symptom: you're approving on trust. Fix: slow down, read `decisions.md`,
  require plain-language summaries.

## 5. The engineer's test
After any loop run, you should be able to answer:
1. What was the goal?
2. What changed, and why?
3. How was it verified, and by whom (not the maker)?
4. What did it cost?
5. What's next?

If you can't answer all five, the loop is running you. Pause and reset.

> Use loops to accelerate understanding — not replace it.
