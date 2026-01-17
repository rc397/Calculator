# Really Efficient Copy and Paste
# Usage: Run this script for super fast manual data entry
# Press Ctrl+C to stop
#.\really_efficient_copy_and_paste.ps1
#.\really_efficient_copy_and_paste.ps1
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$outputFile = Join-Path $PSScriptRoot "Copy and paste progress.md"
$startTime = Get-Date

# Initialize file
"# Copy and Paste Progress`n`n" | Set-Content $outputFile -Encoding UTF8

function Get-RandomWPM {
    # Human typing: 40-70 WPM with variance
    return Get-Random -Minimum 35 -Maximum 75
}

function Get-CharDelay {
    param([int]$wpm)
    # Convert WPM to milliseconds per character (average word = 5 chars)
    $charsPerMinute = $wpm * 5
    $baseDelay = [int]((60000 / $charsPerMinute))
    # Add human variance: Â±40%
    $variance = Get-Random -Minimum (-$baseDelay * 0.4) -Maximum ($baseDelay * 0.4)
    return [Math]::Max(50, $baseDelay + $variance)
}

function Move-MouseSlightly {
    $current = [System.Windows.Forms.Cursor]::Position
    $offsetX = Get-Random -Minimum -15 -Maximum 15
    $offsetY = Get-Random -Minimum -15 -Maximum 15
    
    $newX = [Math]::Max(0, [Math]::Min([System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width, $current.X + $offsetX))
    $newY = [Math]::Max(0, [Math]::Min([System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Height, $current.Y + $offsetY))
    
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($newX, $newY)
}

function Write-Slowly {
    param([string]$text)
    
    $wpm = Get-RandomWPM
    
    foreach ($char in $text.ToCharArray()) {
        # Append to file
        Add-Content $outputFile $char -NoNewline -Encoding UTF8
        
        # Calculate delay for this character
        $delay = Get-CharDelay -wpm $wpm
        
        # Occasionally change typing speed mid-sentence (20% chance)
        if ((Get-Random -Minimum 0 -Maximum 100) -lt 20) {
            $wpm = Get-RandomWPM
        }
        
        # Longer pause for punctuation (realistic)
        if ($char -match '[.,;!?]') {
            $delay = $delay * (Get-Random -Minimum 2 -Maximum 4)
        }
        
        # Random typo simulation - pause longer (5% chance)
        if ((Get-Random -Minimum 0 -Maximum 100) -lt 5) {
            Start-Sleep -Milliseconds ($delay * 3)
        }
        
        Start-Sleep -Milliseconds $delay
        
        # Move mouse slightly while typing (10% chance per char)
        if ((Get-Random -Minimum 0 -Maximum 100) -lt 10) {
            Move-MouseSlightly
        }
    }
    
    Add-Content $outputFile "`n" -Encoding UTF8
}

function Take-MicroBreak {
    Write-Host "  [Taking 30 second break...]" -ForegroundColor Yellow
    Start-Sleep -Seconds (Get-Random -Minimum 25 -Maximum 35)
}

function Take-LongBreak {
    Write-Host "  [Taking 10 minute break...]" -ForegroundColor Magenta
    for ($i = 0; $i -lt 10; $i++) {
        Start-Sleep -Seconds 60
        Move-MouseSlightly
    }
}

function Generate-Equation {
    param([int]$a, [int]$b)
    $sum = $a + $b
    $result = if ($sum -ge -100 -and $sum -le 100) { $sum } else { 'err idk' }
    return "if (aStr === `"$a`" && bStr === `"$b`") return `"$result`";"
}

$inputFile = Join-Path $PSScriptRoot "input.txt"

if (-not (Test-Path $inputFile)) {
    Write-Host "âŒ input.txt not found! Create it and put text between <<<START>>> and <<<END>>>" -ForegroundColor Red
    exit 1
}

# Read input file and extract text between markers
$inputContent = Get-Content $inputFile -Raw
if ($inputContent -match '(?s)<<<START>>>(.*?)<<<END>>>') {
    $textToCopy = $matches[1].Trim()
} else {
    Write-Host "âŒ No <<<START>>> and <<<END>>> markers found in input.txt" -ForegroundColor Red
    exit 1
}

Write-Host "ðŸ“‹ Really Efficient Copy and Paste Started" -ForegroundColor Cyan
Write-Host "Input file: $inputFile" -ForegroundColor Green
Write-Host "Output file: $outputFile" -ForegroundColor Green
Write-Host "Text length: $($textToCopy.Length) characters" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Yellow

$lineCount = 0
$lastMicroBreak = Get-Date
$lastLongBreak = Get-Date

try {
    $lines = $textToCopy -split "`n"
    
    foreach ($line in $lines) {
        Write-Slowly $line
        
        $lineCount++
        $elapsed = (Get-Date) - $startTime
        
        # Progress indicator
        if ($lineCount % 5 -eq 0) {
            Write-Host "Copied $lineCount lines | Elapsed: $($elapsed.ToString('hh\:mm\:ss'))" -ForegroundColor Gray
        }
        
        # 30 second micro-break every ~60 minutes
        $minutesSinceLastMicro = ((Get-Date) - $lastMicroBreak).TotalMinutes
        if ($minutesSinceLastMicro -ge (Get-Random -Minimum 55 -Maximum 65)) {
            Take-MicroBreak
            $lastMicroBreak = Get-Date
        }
        
        # 10 minute long break every ~2 hours
        $minutesSinceLastLong = ((Get-Date) - $lastLongBreak).TotalMinutes
        if ($minutesSinceLastLong -ge (Get-Random -Minimum 115 -Maximum 125)) {
            Take-LongBreak
            $lastLongBreak = Get-Date
        }
        
        # Random micro-pauses (simulate thinking/distraction)
        if ((Get-Random -Minimum 0 -Maximum 100) -lt 3) {
            Start-Sleep -Seconds (Get-Random -Minimum 2 -Maximum 8)
        }
    }
    
    Write-Host "`nFinished! Total lines: $lineCount" -ForegroundColor Green
    Write-Host "Total time: $($elapsed.ToString('hh\:mm\:ss'))" -ForegroundColor Cyan
    
} catch {
    Write-Host "`nStopped by user" -ForegroundColor Red
    Write-Host "Lines copied so far: $lineCount" -ForegroundColor Yellow
}
