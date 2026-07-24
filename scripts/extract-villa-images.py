"""Extract a compact set of unique OVV brochure images for the web experience."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps
from pypdf import PdfReader


PHOTO_ASSETS = (
    (25, "property-aerial", (0.5, 0.5)),
    (4, "plunge-pool", (0.5, 0.5)),
    (7, "open-living", (0.5, 0.5)),
    (22, "kitchen", (0.5, 0.5)),
    (10, "ocean-suite", (0.5, 0.5)),
    (9, "private-balcony", (0.5, 0.5)),
    (8, "family-room", (0.5, 0.5)),
)


def flatten(image: Image.Image) -> Image.Image:
    if "A" not in image.getbands():
        return image.convert("RGB")
    background = Image.new("RGBA", image.size, "white")
    background.alpha_composite(image.convert("RGBA"))
    return background.convert("RGB")


def extract_image(reader: PdfReader, page_number: int) -> Image.Image:
    page = reader.pages[page_number - 1]
    if not page.images:
        raise RuntimeError(f"Page {page_number} has no embedded image")
    return flatten(page.images[0].image)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--output", type=Path, default=Path("public/images/ovv"))
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(args.pdf))

    for page_number, name, centering in PHOTO_ASSETS:
        source = extract_image(reader, page_number)
        photo = ImageOps.fit(
            source,
            (1600, 900),
            method=Image.Resampling.LANCZOS,
            centering=centering,
        )
        photo.save(
            args.output / f"{name}.webp",
            "WEBP",
            quality=80,
            method=6,
        )

    master_plan = extract_image(reader, 12)
    master_plan.thumbnail((1800, 1200), Image.Resampling.LANCZOS)
    master_plan.save(
        args.output / "master-plan.webp",
        "WEBP",
        quality=84,
        method=6,
    )

    print(f"Extracted {len(PHOTO_ASSETS)} unique photos and the master plan")


if __name__ == "__main__":
    main()
