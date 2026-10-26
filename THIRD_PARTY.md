# VirtuoX third-party notices

## GPL-covered application and panel

The browser coach, UI adaptation and supporting original project source are distributed under GNU GPL version 3 only; see LICENSE. The physical panel drawing/input layer derives from JIANT / Felucca / X0X. Retain its header notices. JIANT source basis: https://github.com/juanjiant-bit/JIANT/tree/cfff2d40de49cd0d6d8cd30aa60393c225a9c303 . JIANT by Juan Ignacio Antonucci; Felucca by Leo Kuroshita / Hügelton Instruments; X0X browser emulator by charlesvestal. This repository does not bundle the original compiled JIANT firmware emulator or its firmware image.

## DX7-compatible synthesis engine

`docs/play/engine/`: tetorica-msfa-dx7-wasm 0.3.1, Apache-2.0, derived from Google MSFA / the Dexed lineage. License and notices are included in `docs/play/engine/LICENSE` and `docs/play/engine/THIRD_PARTY_NOTICES.md`. Upstream source: https://github.com/kyorohiro/tetorica-msfa-dx7-wasm . This is DX7-compatible synthesis, not a bit-identical emulation of original analog output stages.

## Original M-VAVE FM-1 V15 factory sound data

Copyright (c) 2026 珠海笙科智能科技有限公司 (M-VAVE), as identified upstream. Bank source `app/fm_factory.inc` at official repository commit `4c7496daac04a95ff10d1afdcc8f9ead2dbabc41`: https://github.com/m-vave/fm1_open/tree/4c7496daac04a95ff10d1afdcc8f9ead2dbabc41 . The file carries SPDX Apache-2.0. Its provenance and resource terms are in the included `third-party/m-vave/THIRD_PARTY.md`, retained verbatim, and upstream https://github.com/m-vave/fm1_open/blob/4c7496daac04a95ff10d1afdcc8f9ead2dbabc41/THIRD_PARTY.md . Full Apache-2.0 text is included in `docs/play/engine/LICENSE`.

`third-party/m-vave/fm_factory.inc` and `factory-original.vmem` are unchanged factory representations. `scripts/build-factory-banks.mjs` decodes and checks the original VMEM SHA-256. The public browser's voices and bank files are modified derivatives: 12 out-of-range parameter values are adjusted for the strict browser engine. Every parameter change is recorded in `third-party/m-vave/compatibility-adjustments.json`. Factory names and slot order are preserved. These adjusted browser files are not asserted to be byte-identical to original device voices.

No M-VAVE proprietary binary SDK, recovery firmware, Yamaha ROM bank files or private Dexed collection is distributed here. Links to upstream workbenches/installers do not incorporate their code or licenses into VirtuoX.

## Fonts

DotGothic16 subset in `docs/play/fonts/`: SIL Open Font License 1.1, text included there. Project website uses optional Google Fonts CSS for DM Sans and Space Grotesk with system-font fallbacks. No third-party font binaries for those two fonts are bundled.

## Branding

M-VAVE, FM-1, Yamaha, DX7 and Moog identify compatible products/formats and remain trademarks of their owners. No affiliation or endorsement is claimed. VirtuoX is this independent project's label, not an assertion of exclusive trademark ownership.

## Musical study data and MIDI editions

The 16 original artist-inspired note-event studies in `style-library.js` are dedicated under CC0-1.0 (https://creativecommons.org/publicdomain/zero/1.0/). The module code remains GPL-3.0-only. These are original exercises, not Mike Dean or Jean-Michel Jarre transcriptions or endorsed artist presets. The ten unchanged Mutopia MIDI editions have per-file Public Domain or CC-BY-SA-3.0 status; see [attribution and provenance](docs/play/midi/README.md) and `library.json`. Those edition licenses are separate from the application license.

Yamaha and DX7 are trademarks of Yamaha Corporation. VirtuoX is an independent project and is not affiliated with or endorsed by Yamaha.
