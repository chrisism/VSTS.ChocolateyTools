
Write-Output "Checking if Chocolatey is installed..."

$chocoBin = [Environment]::GetEnvironmentVariable("ChocolateyInstall", "Machine") + "\bin"
$chocInstalled = Test-Path "$chocoBin\cinst.exe"

if (-not $chocInstalled) {
    Write-Output "Chocolatey not found, installing..."
    
    $installPs1 = ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
    Invoke-Expression $installPs1
    
    Write-Output "Chocolatey installation complete."
} else {
    Write-Output "Chocolatey was found at $chocoBin and won't be reinstalled."
}