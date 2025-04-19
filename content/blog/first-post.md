---
title: "Git & GitHub Basics"
description: "Learnings of Github"
date: "2025-04-19"
slug: "git-github"
---

### Topics covered

- Git & GitHub Basics
- Basic Commands of Git
- PR merging, Branching Strategies for Devops
- Hooks (pre-commit Hooks)
- Repo setup end to end (GitHub Actions CI/CD)

Git → version control system

GitHub/GitLab/Bitbucket → SCM ( Source Code Manager )

`git init` - to initialize git repository

`git status`  - to see the status

untracked | staged | tracked

`git add {filename}`  - untracked → staged

`git rm —chache {filename}`  - staged → untracked

`git commit -m “added testing file”`  - staged → tracked

`rm {filename}` - to delete file

`git restore {filename}` - to restore

Local → PAT(Personal Access Token) → GitHub

`git remote add origin {repo-url}` 

`git branch -M main`

`git push -u origin main`

`get remote set-url origin https://{PAT-token}@github.com/{repo-url}`  - if error occurs, generate PAT then write this command

Forking and cloning : ) - `git clone { shh url }`

`git fetch` - to fetch all the branches from remote to local

`git pull`  - to pull from GitHub the updated changes

Branches and Branching Strategies →

`git branch {branchname}` - to create a new branch

`git switch {branchname}` - to switch between branches 

`git branch -d {branchname}` - to delete branch

`git merge {branchname}` - to merge branches

`git log —oneline`  - q to exit

`git remote -v` - to show remote URL

latest commit - HEAD

**Conflicts in Git and How to resolve?**

`git log --merge` - to produce list of commits that are causing conflicts

`git diff` - to identify the difference between state repositories

`git checkout` - to undo the changes made to the file or for changing branches

`git reset —mixed` - used to undo changes to the working directory and staging area

`git merge —abort` - helps in exiting the merge process and returning back to state before the merging began

`git reset` - used a time of merge conflict to reset the conflicted files to their original state

Stashing (hiding)

`git stash` - to stash an item (hide)

`git stash list` - to see stashed item list

`git stash apply stash@{<list_number>}` - to apply stash item

`git stash clear` - to clear stash item

`git stash pop` - popping an item from stash

`git stash drop` - (unstash)

What is git rebase?

Rebasing is the process of moving or combining a sequence of commits to a new base commit. Rebasing is most useful and easily visualized in the context of feature branching workflow. The primary reason for rebasing is to maintain a linear project history.

`git rebase <base>` 

**Git Hooks →** [ stop the commit if wrong code ]

`dir a;h` - to show hidden file (only for windows)

`ls -a` - to show all files

`pip install flake8` - to check quality of code in python

`flake8 {filename}`

pre-commit

```bash
file=$(git diff --cached --name-only --diff-filter-ACM | greo '.\py$')
flake8 $files
if git grep -q 'password\|secret_key\|API_KEY' $(git diff --cached --name-only)
   echo "you forgot to remove something important before loosing your job"
   exit 1
fi
```

`ls -l pre-commit`  - read-write functionality

`chmod 777 pre-commit`  - now file becomes executable

GitHub Actions →

Hands-on

pylint → automate by yaml file, also rate the code quality

GitHub + AWS

S3 > Bucket > {bucketname}

IAM > Users > Create user (attach policy)→administrator > create user

github-actions-user > access key(cli) > create access key

github→

add new file → .github/workflows/main.yml

```yaml
name: Portfolio Deployment

on:
	push:
		branches:
		- main
		
jobs:
	build-and-deploy:
		runs-on: ubuntu-latest
		steps:
			- name: Checkout
				uses: actions/checkout@v1
				
			- name: Configure AWS Credentials
				uses: aws-actions/configure-aws-credentials@v1
				with:
					aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
					aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
					aws-region: us-east-1
				
			- name: Delpoy static site to S3 bucket
				run: aws s3 sync . s3://{bucketname}-d --delete
```

settings → secrets and variables → actions → new repository secret

bucket - to use it as static website hosting

permissions → edit bucket policy → 

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{bucketname}/*"
    }
  ]
}
```
