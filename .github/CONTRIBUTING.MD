# Contributing

Thanks for reading this! That'd mean, hopefully, that you want to contribute
with us.

We try to make it possible that, by reading some of our code, you'll recognize
our conventions and style.

But if you're unsure about it, or you just want to know how we get things done,
you should read this.

## Contents

- [**Git Flow**](#git-flow)
  - [Commiting](#commiting)
  - [Branching](#branching)
- [**Code Style**](#code-style)
- [**Versioning**](#versioning)
- [**GitHub Related**](#github-related)
  - [Issues](#issues)
    - [Bugs](#bugs)
    - [Enhancements](#enhancements)
  - [Pull Requests](#pull-requests)
- [**Thanks!**](#thanks)

## Git Flow

We use git —surprise!— to control versions. In this section, you can get to
know our workflow in this project.

### Commiting

Commited changes should be small, avoiding big chunks of code being created,
modified, or removed.

Our commiting system is based on modularity. Each one should be able to be
described in one sentence. If you need more than one, maybe you should make
multiple commits.

Yes, this can cause non—meaningful commits, but it makes easy to track down
bugs and errors.

If the change of the commit is style related, it doesn't matter the size of the
modified code, as long as it doesn't change functionality.

### Branching

We try to follow the branching system published by 
[Vincent Driessen at nvie](https://nvie.com/posts/a-successful-git-branching-model/).

`master` only has released versions.

`develop` is where all approved changes (that are not big enough to make it to
a new version yet) go.

From develop, we have multiple branches. Branches with meaningful names related
to what is being developed inside each branch.

A branch name must be short and descriptive, all lowercase.
Again, keep modularity in mind. For branches with multiple words `use-hyphens`.

Once a new function or a bug-fix is implemented, we [create a Pull Request](#pull-requests)
to merge changes back into `develop`.

And once we feel that there are enough changes to make a new version of the
project, we [create a Pull Request](#pull-requests) to merge changes into
`master`.

Each merge into `master` is tagged, meaning there's a new release.
See [Versioning](#versioning).

## Code Style

We try to be consistent with our style. When you doubt whether you should write
`blah blah` or `yada yada`, follow the most important rule:
**optimize for readabaility**.

That said, these are our suggested rules

- Indent using 2 spaces
- Use spaces after commas (unless separated by newlines): `[1, 2, 3]`, `(a, b, c)`.
- Use spaces after flow control statements: `if ()`, `for ()`, `while ()`
- Use spaces around operators, except unaries: `x + y`, `x == y`, `x++`, `!x`.
- Try to keep the line length at ~85. If exceeded, separate it in different lines.
- `variableNames`, `CONSTANT_NAMES`, `functionNames`, `ClassNames`
- Write branch names in all lowercase, separeted with hyphens, and avoiding verbs: 
`style`, `docs`, `artist-histogram`
- Always use curly braces after flow control statements. Even if it's followed
  by only one line:

      ```js
      // Do this
      if (condition)
      {
          doSomethingInOneLine()
      }

      // Instead of this
      if (condition)
          doSomethingInOneLine()
      ```

## Versioning

We follow [SemVer](https://semver.org/).

Yup, just read it. Nothing to add.

## GitHub Related

### Issues

If you have a question, don't open an issue. You can send David an e-mail
at [davidomarfch@gmail.com](mailto:davidomarfch@gmail.com?Subject=Question)

Issues are intended for reporting bugs, or discussing changes and new features.

Fortunately, GitHub allows us to provide issue templates. When you try to file
a new issue, you'll see them. Try to fill it with all the info you can.

#### Bugs

The most important thing, is providing the necessary information to allow us to
reproduce the problem. **Try to be as descriptive as possible.**

Again, the best way to learn how to file an issue, is by taking a look at our
[bug issue template](https://github.com/davidomarf/lastfm/issues/new?template=bug.md).

#### Enhancements

This includes style changes, new features implementation, and general discussion
on how to make the project better.

You can take a look at our [change issue template](https://github.com/davidomarf/lastfm/issues/new?template=change.md),
and our [feature issue template](https://github.com/davidomarf/lastfm/issues/new?template=feature.md).

We are more permissive on the structure of these issues. Anyways, you should still
try to be as descriptive as possible.

### Pull Requests

Firs, you should read [Git Flow](#git-flow) and [Code Style](#code-style) sections.

Once you have some changes that you'd like to see merged into our codebase, [open a
Pull Request](https://github.com/davidomarf/lastfm/pull/new/master). We also have
a PR template, that you'll see once you try to open one.

Again, the most important thing is that you describe what changes you've made, and
why you made them.

---

## Thanks!

All that said, we will be very thankful and happy if you decide to contribute with
the project.

Don't be afraid to contribute if you feel you can't fulfil all of the rules in here.

We will help you to help us.

Cheers!
