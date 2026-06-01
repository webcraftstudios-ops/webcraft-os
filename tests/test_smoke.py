from __future__ import annotations

import subprocess
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_cli_help_smoke():
    result = subprocess.run(
        [sys.executable, "-m", "cli", "--help"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 0
    assert "init-sprint" in result.stdout
    assert "Minimale CLI-runtime" in result.stdout
