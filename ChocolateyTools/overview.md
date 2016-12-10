# Chocolatey Tools (VSTS task)

VSTS tasks for using Chocolatey during deployment.

### Details
With these tasks you can use Chocolatey in VSTS or TFS. Either install chocolatey self, or check if it installed, or just
install one of the many packages available through Chocolatey.

For available packages check [Chocolatey website](https://chocolatey.org/)


## Available tasks
### Ensure Installed 
Ensures that the Chocolatey package manager is installed on the system. The installer is downloaded from https://chocolatey.org if required.

### Install Package
Installs a package using the Chocolatey package manager.

#### Available options
* **Chocolatey package:** The ID of an application package in the https://chocolatey.org repository. Required. Example: Git.
* **Version:** If a specific version of the Chocolatey package is required enter it here. Otherwise, leave this field blank to use the latest version. Example: 2.3.4.
