@echo off
title Siraj Ventures - Cloudflare Public Tunnel
echo =========================================================
echo   Starting Cloudflare Public Tunnel for Port 8088...
echo =========================================================
echo Forwarding http://localhost:8088 to Cloudflare...
echo.
"%~dp0cloudflared.exe" tunnel --url http://127.0.0.1:8088 --http-host-header localhost:8088
pause
