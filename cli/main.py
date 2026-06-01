from __future__ import annotations

import argparse
from collections.abc import Sequence

from . import commands


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="wcsos",
        description="Minimale CLI-runtime voor Webcraft Studios OS.",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    init_sprint_parser = subparsers.add_parser(
        "init-sprint",
        help="Initialiseer een sprint in no-op modus.",
        description="Valideer sprint-input zonder bestanden te wijzigen.",
    )
    init_sprint_parser.add_argument(
        "--name",
        default="unnamed-sprint",
        help="Naam van de sprint.",
    )
    init_sprint_parser.add_argument(
        "--goal",
        default="",
        help="Korte doelomschrijving voor de sprint.",
    )
    init_sprint_parser.set_defaults(handler=commands.init_sprint)

    return parser


def dispatch(args: argparse.Namespace) -> int:
    handler = getattr(args, "handler", None)
    if handler is None:
        raise SystemExit(2)

    result = handler(args)
    return 0 if result is None else int(result)


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return dispatch(args)


if __name__ == "__main__":
    raise SystemExit(main())
