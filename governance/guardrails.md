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
The loop must STOP and get your explicit approval before:
- Merging to protected `main`
- Sending any external message (email, client doc, public post)
- Deleting data, dropping tables, force-pushing, rotating keys
- Spending money or calling paid external services beyond budget
- Anything it isn't sure is reversible

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
