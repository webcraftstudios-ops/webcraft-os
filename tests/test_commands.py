from cli.main import build_parser, dispatch


def test_init_sprint_dispatch_returns_zero_and_prints_payload(capsys):
    parser = build_parser()
    args = parser.parse_args(
        ["init-sprint", "--name", "CLI scaffold", "--goal", "Dispatcher testen"]
    )

    exit_code = dispatch(args)
    captured = capsys.readouterr()

    assert exit_code == 0
    assert "[noop] init-sprint" in captured.out
    assert '"command": "init-sprint"' in captured.out
    assert '"name": "CLI scaffold"' in captured.out
    assert '"writes_files": false' in captured.out


def test_init_sprint_uses_default_name(capsys):
    parser = build_parser()
    args = parser.parse_args(["init-sprint"])

    exit_code = dispatch(args)
    captured = capsys.readouterr()

    assert exit_code == 0
    assert '"name": "unnamed-sprint"' in captured.out
