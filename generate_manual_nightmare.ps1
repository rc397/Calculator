$ErrorActionPreference = 'Stop'

$outFile = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'manual_add_function.js'

$sb = New-Object System.Text.StringBuilder

[void]$sb.AppendLine('// THE MOST HORRIFICALLY MANUAL ADDITION FUNCTION EVER WRITTEN')
[void]$sb.AppendLine('// Every single combination from -100 to 100 explicitly checked')
[void]$sb.AppendLine('// This is approximately 40,000 if-statements because we are absolute madlads')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('function manualAdd(aStr, bStr) {')

$count = 0
for ($a = -100; $a -le 100; $a++) {
  for ($b = -100; $b -le 100; $b++) {
    $sum = $a + $b
    $result = if ($sum -ge -100 -and $sum -le 100) { [string]$sum } else { 'err idk' }
    
    [void]$sb.Append('  if (aStr === "')
    [void]$sb.Append($a)
    [void]$sb.Append('" && bStr === "')
    [void]$sb.Append($b)
    [void]$sb.Append('") return "')
    [void]$sb.Append($result)
    [void]$sb.AppendLine('";')
    
    $count++
    
    # Progress indicator every 5000 lines
    if ($count % 5000 -eq 0) {
      Write-Host "Generated $count if-statements..." -ForegroundColor Yellow
    }
  }
}

[void]$sb.AppendLine('  return undefined; // Should never reach here')
[void]$sb.AppendLine('}')

Write-Host "Writing to file..." -ForegroundColor Cyan
Set-Content -Path $outFile -Value $sb.ToString() -Encoding UTF8

Write-Host "Generated $count if-statements in manual_add_function.js" -ForegroundColor Green
Write-Host "File size: $([math]::Round((Get-Item $outFile).Length / 1MB, 2)) MB" -ForegroundColor Magenta
