# DOVA Futures Hub dashboard

This is the first read-only browser view of the repository hub. It is deliberately dependency-free and can be opened directly as a local file.

## Use

From this folder, run:

```powershell
python build_snapshot.py
```

Then open `index.html` in a browser. The snapshot contains workspace names, status summaries, declared code locations, and the first next action. It does not copy project documents or client files into the dashboard.

The dashboard is currently staged here because the repository root still contains the live website. After the website and preorder store move to their approved destination repositories, this interface can be promoted to the root entry point.
