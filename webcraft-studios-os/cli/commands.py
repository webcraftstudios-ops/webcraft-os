from __future__ import annotations

import argparse
import json


def init_sprint(args: argparse.Namespace) -> int:
    goal = args.goal.strip() if args.goal else ""
    payload = {
        "command": "init-sprint",
        "mode": "noop",
        "name": args.name,
        "goal": goal or "Nog geen doel opgegeven.",
        "writes_files": False,
        "status": "gepland",
    }

    print("[noop] init-sprint uitgevoerd zonder schrijfacties.")
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    return 0
