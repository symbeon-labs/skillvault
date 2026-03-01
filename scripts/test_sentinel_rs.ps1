# Suda-Sentinel-RS Verification Script
# This script tests the Rust core by piping JSON requests to its stdin

$BinaryPath = ".\suda-sentinel-rs\target\debug\suda-sentinel-rs.exe"

if (!(Test-Path $BinaryPath)) {
    Write-Host "❌ Error: Sentinel binary not found. Run 'cargo build' in suda-sentinel-rs first." -ForegroundColor Red
    exit 1
}

Write-Host "--- 🌌 Testing Suda-Sentinel-RS Core ---" -ForegroundColor Cyan

# Test 1: Ping
$PingReq = '{"action": "ping", "params": {}}'
$PingRes = $PingReq | & $BinaryPath | ConvertFrom-Json
if ($PingRes.status -eq "success") {
    Write-Host "✅ Test 1 (Ping): PASSED (Version: $($PingRes.data.version))" -ForegroundColor Green
}
else {
    Write-Host "❌ Test 1 (Ping): FAILED" -ForegroundColor Red
}

# Test 2: URTN Generation
$UrtnReq = '{"action": "generate_urtn", "params": {"skill_name": "DeepTranslation", "version": "1.0.0", "creator_addr": "0x123", "timestamp": "2026-03-01T12:00:00Z"}}'
$UrtnRes = $UrtnReq | & $BinaryPath | ConvertFrom-Json
if ($UrtnRes.status -eq "success" -and $UrtnRes.data.urtn_hash) {
    Write-Host "✅ Test 2 (URTN): PASSED (Hash: $($UrtnRes.data.urtn_hash.Substring(0,10))...)" -ForegroundColor Green
}
else {
    Write-Host "❌ Test 2 (URTN): FAILED" -ForegroundColor Red
}

# Test 3: x402 Challenge
$X402Req = '{"action": "emit_x402", "params": {"amount": "10", "recipient": "0xPROFIT"}}'
$X402Res = $X402Req | & $BinaryPath | ConvertFrom-Json
if ($X402Res.status -eq "success" -and $X402Res.data.headers."x-402-amount" -eq "10") {
    Write-Host "✅ Test 3 (x402): PASSED (Challenge Emitted)" -ForegroundColor Green
}
else {
    Write-Host "❌ Test 3 (x402): FAILED" -ForegroundColor Red
}

# Test 4: Atomic Split (80/10/10)
$SplitReq = '{"action": "calculate_split", "params": {"amount": "100"}}'
$SplitRes = $SplitReq | & $BinaryPath | ConvertFrom-Json
if ($SplitRes.status -eq "success" -and $SplitRes.data.splits.creator -eq 80) {
    Write-Host "✅ Test 4 (Split): PASSED (Creator: $($SplitRes.data.splits.creator), Gov: $($SplitRes.data.splits.governance), Pool: $($SplitRes.data.splits.collective))" -ForegroundColor Green
}
else {
    Write-Host "❌ Test 4 (Split): FAILED" -ForegroundColor Red
}

Write-Host "--- ✅ CORE VALIDATION COMPLETE ---" -ForegroundColor Cyan
