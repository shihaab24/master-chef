from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent
OUTPUT = ROOT / "files.json"
EXCLUDE_DIRS = {"node_modules", ".git"}
EXCLUDE_FILES = {OUTPUT.name}


def should_skip(path: Path) -> bool:
    """Return True when the path is inside excluded directories or is an excluded file."""
    return any(part in EXCLUDE_DIRS for part in path.parts) or path.name in EXCLUDE_FILES


def collect_files() -> list[dict[str, str]]:
    files: list[dict[str, str]] = []
    for absolute_path in ROOT.rglob("*"):
        relative_path = absolute_path.relative_to(ROOT)

        if should_skip(relative_path) or absolute_path.is_dir():
            continue

        try:
            content = absolute_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            # Fallback for files with partial non-UTF-8 data.
            content = absolute_path.read_bytes().decode("utf-8", errors="ignore")

        files.append(
            {
                "path": relative_path.as_posix(),
                "content": content,
                "status": "completed",
            }
        )
    return files


def main() -> None:
    data = {"files": collect_files()}
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(data['files'])} entries to {OUTPUT}")


if __name__ == "__main__":
    main()

