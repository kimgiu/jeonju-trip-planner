#!/bin/bash
GITHUB_USERNAME="your-github-username"
REPO_NAME="jeonju-trip-planner"

git init
git remote add origin https://github.com/kimgiu/jeonju-trip-planner.git
git add .
git commit -m "Initial commit: Jeonju Trip Planner"
git branch -M main
git push -u origin main
