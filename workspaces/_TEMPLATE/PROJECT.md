# PROJECT.md — <Project Name>

> Copy this whole `_TEMPLATE/` folder to `workspaces/<new-slug>/`, fill in every
> section, delete the instructions in angle brackets, and add a row to
> `company/registry.md`. This file + this workspace's `memory/` is ALL the
> project-specific context a session should need.

## Identity

- **Workspace slug:** `<slug>`
- **One-line purpose:** <what this project is for>
- **Owner:** <who answers questions / approves>
- **Status:** <planning | active | paused | done>

## Why this project exists

<How it serves the company goals in `company/goals.md`. One short paragraph.>

## Where the code / files live

<Exact paths in this repo, e.g. `some-folder/`. If the code is elsewhere (another
repo, a drive), say where and how to reach it.>

## How to run / build / test

<Install, run, test, and verification commands. If not a code project, describe
how a change is checked instead.>

## Architecture / structure

<The smallest description that stops an agent from guessing: components,
boundaries, data flow, key files table.>

## Deployment

<Where and how it ships, or "not deployed". Name any file an agent must NOT
move or break (CI workflows, platform configs).>

## Project-specific rules & traps

<Anti-patterns, fragile spots, and "known traps" unique to this project.
Universal rules already live in `company/engineering-standards.md` — don't
repeat them.>

## Read-order for a session working here

1. Root `CLAUDE.md` (router + loop)
2. `company/` (registry, goals, ethics, voice-and-tone, brand, standards, doc policy)
3. This file
4. `workspaces/<slug>/memory/status.md` + `next-up.md`
