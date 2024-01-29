# heschl.dev

This repository contains the source code for my website heschl.dev which includes a
blog as well as a notes on cybersecurity and hacking.

## Running this project

To run this project, first install its dependencies using `npm install` and set up
the git hooks using `npm run prepare`. Once this is done, you can either start a
development server by running `npm run dev` or view a preview by running the commands
`npm run build` and `npm run preview` after each other.

## Development

If you want to make changes to this project, note that this project enforces eslint
and prettier code standards. Using a precommit git hook, staged changes are checked
by eslint and prettier before each commit automatically. You can manually check for
adherence and/or automatically format your code in accordance to the standards by
running `npm run lint:eslint` and `npm run format:code`.
