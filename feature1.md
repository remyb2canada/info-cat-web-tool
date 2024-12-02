# Feature 1

This is a dummy file to demonstrate git branches used for developing new features in parallel to the production state (main).

The process would typically be:

1- Create a new local branch (e.g. "feature1")
2- Perform development in this new local branch
3- Push "up" the development to the remote repository (e.g. on GitHub) into a new branch (e.g. same name as the local one "feature1")
4- Ideally, automated testing would have been written and will be triggered from the push; warning the developer of any fails that occured
5- When satisfied with the changes, perform a "Pull Request (PR)", signaling your intention to "merge" the proposed changes in "feature1" branch to the production state (main)
6- The PR process executes, which may require another developer to peer review the proposed changes. Additionally, a good PR process has its set of automated tests that runs and warns of any errors that need to be corrected before the production state can be changed
7- The PR process closes when the changes are accepted (that is, they are "merged" to the main branch). At this point, the automated deployment script executes. It retrieves the production code from the GitHub repository and deploys it in the production environment (here, that would be using MS Azure Static Web Site service)