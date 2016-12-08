param (
	[string]$packageId,
	[string]$packageVersion
)

$chocoBin = [Environment]::GetEnvironmentVariable("ChocolateyInstall", "Machine") + "\bin"
if(-not (Test-Path $chocoBin)) {
	Write-Output "Environment variable 'ChocolateyInstall' was not found in the system variables. Attempting to find it in the user variables..."
	$chocoBin = [Environment]::GetEnvironmentVariable("ChocolateyInstall", "User") + "\bin"
}

$cinst = "$chocoBin\cinst.exe"
$choco = "$chocoBin\choco.exe"

if (-not (Test-Path $cinst) -or -not (Test-Path $choco)) {
	throw "Chocolatey was not found at $chocoBin."
}

if (-not $packageId) {
	throw "Please specify the ID of an application package to install."
}

$chocoVersion = & $choco --version
Write-Output "Running Chocolatey version $chocoVersion"

$chocoArgs = @()
if([System.Version]::Parse($chocoVersion) -ge [System.Version]::Parse("0.9.8.33")) {
	Write-Output "Adding --confirm to arguments passed to Chocolatey"
	$chocoArgs += @("-y", "")
}

if (-not $packageVersion) {
	Write-Output "Installing package $packageId from the Chocolatey package repository..."
	& $cinst $packageId $($chocoArgs)
} else {
	Write-Output "Installing package $packageId version $packageVersion from the Chocolatey package repository..."
	& $cinst $packageId -Version $packageVersion $($chocoArgs)
}