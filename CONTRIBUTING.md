# Contributing to VirtuoX

Please open a reproducible issue before a substantial change. Include browser/OS, MIDI device, mode, lesson/patch or sequence, BPM, timing settings, swing/gate, expected behavior and observed behavior. State whether the on-screen keyboard also reproduces it.

Run `node --test tests/*.test.mjs` and `node scripts/check-public.mjs` before submitting. Build factory assets reproducibly with `node scripts/build-factory-banks.mjs` if their source changes. Keep musical correctness, timing behavior and public/private sound separation testable.

No private patch banks, credentials, SDK binaries or unverified firmware images in pull requests. Retain applicable copyright and license notices. Describe native firmware features as planned until they are implemented and tested on hardware. Browser tests alone do not establish physical-device compatibility.
