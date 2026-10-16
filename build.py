"""Package the site for a drag-and-drop Netlify upload.

Creates dist/dslandscaping-site/ and dist/dslandscaping-site.zip. The index.html
in there has the stylesheet, script and favicon built in, so the site works even
if only that one file gets uploaded.

Run from the repository root:  python3 build.py
"""
import base64
import pathlib
import shutil
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "dist" / "dslandscaping-site"


def inline(html, old, new):
    if html.count(old) != 1:
        raise SystemExit(f"Expected exactly one {old!r} in index.html")
    return html.replace(old, new)


def main():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "css" / "styles.css").read_text(encoding="utf-8")
    js = (ROOT / "js" / "main.js").read_text(encoding="utf-8")
    favicon = base64.b64encode((ROOT / "images" / "favicon.svg").read_bytes()).decode()

    if "</style" in css or "</script" in js:
        raise SystemExit("The stylesheet or script contains a closing tag and can't be inlined")

    html = inline(html, '<link rel="stylesheet" href="css/styles.css">', "<style>\n" + css + "</style>")
    html = inline(html, '<script src="js/main.js" defer></script>', "<script>\n" + js + "</script>")
    html = inline(html, 'href="images/favicon.svg"', 'href="data:image/svg+xml;base64,' + favicon + '"')

    if OUT.parent.exists():
        shutil.rmtree(OUT.parent)
    OUT.mkdir(parents=True)
    (OUT / "index.html").write_text(html, encoding="utf-8")
    for name in ("netlify.toml", "robots.txt", "sitemap.xml"):
        shutil.copy2(ROOT / name, OUT / name)

    zip_path = OUT.parent / "dslandscaping-site.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(OUT.iterdir()):
            zf.write(path, f"{OUT.name}/{path.name}")

    print(f"Built {OUT.relative_to(ROOT)}/ and {zip_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
