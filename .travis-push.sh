#!/bin/sh
# Credit: https://gist.github.com/willprice/e07efd73fb7f13f917ea

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_country_json_files() {
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%Y %b %d"`
  # Stage the modified files in dist/output
  git add docs/
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Update docs $dateAndMonth [skip ci]"
  git subtree split --prefix docs -b publish
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git > /dev/null 2>&1
  git push -f origin publish:publish
}

setup_git

commit_country_json_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in files. Nothing to do"
fi

