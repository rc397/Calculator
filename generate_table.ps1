$ErrorActionPreference = 'Stop'

function New-AddTablePart {
  param(
    [Parameter(Mandatory=$true)][string]$OutFile,
    [Parameter(Mandatory=$true)][int]$AStart,
    [Parameter(Mandatory=$true)][int]$AEnd
  )

  $sb = New-Object System.Text.StringBuilder

  [void]$sb.AppendLine('// AUTO-GENERATED: giant manual lookup for a+b where a,b in [-100,100].')
  [void]$sb.AppendLine('// Values are either a stringified integer (if sum in [-100,100]) or the literal "err idk".')
  [void]$sb.AppendLine('window.DUMB_ADD_TABLE_PARTS.push({')

  for ($a = $AStart; $a -le $AEnd; $a++) {
    $aKey = [string]$a
    [void]$sb.Append('  "')
    [void]$sb.Append($aKey)
    [void]$sb.Append('": {')

    for ($b = -100; $b -le 100; $b++) {
      $bKey = [string]$b
      $sum = $a + $b

      $val = if ($sum -ge -100 -and $sum -le 100) { [string]$sum } else { 'err idk' }

      [void]$sb.Append(' "')
      [void]$sb.Append($bKey)
      [void]$sb.Append('": "')
      [void]$sb.Append($val)
      [void]$sb.Append('"')

      if ($b -lt 100) {
        [void]$sb.Append(',')
      }
    }

    [void]$sb.Append(' }')

    if ($a -lt $AEnd) {
      [void]$sb.Append(',')
    }

    [void]$sb.AppendLine('')
  }

  [void]$sb.AppendLine('});')

  Set-Content -Path $OutFile -Value $sb.ToString() -Encoding UTF8
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

New-AddTablePart -OutFile (Join-Path $root 'add_table_part1.js') -AStart -100 -AEnd -51
New-AddTablePart -OutFile (Join-Path $root 'add_table_part2.js') -AStart -50  -AEnd -1
New-AddTablePart -OutFile (Join-Path $root 'add_table_part3.js') -AStart 0    -AEnd 50
New-AddTablePart -OutFile (Join-Path $root 'add_table_part4.js') -AStart 51   -AEnd 100

Write-Host "Generated add_table_part1.js .. add_table_part4.js" -ForegroundColor Green
