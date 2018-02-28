# Chocolatey Tools (VSTS task)

VSTS tasks for using Chocolatey during deployment.

Are these VSTS extensions helping you? 

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSMTZP9VKP8QN)

### Details
With these tasks you can use Chocolatey in VSTS or TFS. Either install chocolatey self, or check if it installed, or just
install one of the many packages available through Chocolatey.

For available packages check [Chocolatey website](https://chocolatey.org/)


## Available tasks
### Install/Upgrade
Will download and install/upgrade Chocolatey on the server. Will only install if not already installed.

#### Available options
* **Upgrade (if needed):** If already installed, it will upgrade Chocolatey if needed.

### Install Package
Installs a package using Chocolatey.

#### Available options
* **Package:** The package ID of the package to install. Check https://chocolatey.org/ for available packages
* **Version:** Specific version of the package to install. Leave empty if you want to install the latest stable version.
* **Alternate package source:** The source to find the package(s) to install. Special sources include: ruby, webpi, cygwin, windowsfeatures, and python. To specify more than one source, pass it with a semi-colon separating the values (-e.g. 'source1;source2'). Defaults to default feeds.
* **Other options:** Add extra options or switches as needed.