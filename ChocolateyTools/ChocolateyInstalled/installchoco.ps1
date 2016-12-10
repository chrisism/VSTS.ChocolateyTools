param (
	[string]$upgradeIfNeeded
)

$chocoPath =  [Environment]::GetEnvironmentVariable("ChocolateyInstall", "Machine")
$isChocoInstalled = Test-Path "$chocoPath\bin\cinst.exe"

if (-not $isChocoInstalled) {
	Write-Host "Downloading and installing Chocolatey"
	iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex    
	
	Write-Host "Chocolatey installed"

} else if ($upgradeIfNeeded.ToLower() -eq "true") {
	
	Write-Host "Trying to upgrade Chocolatey"
	choco upgrade chocolatey
} else {
	Write-Host "Chocolatey already installed. Skipping step."
}