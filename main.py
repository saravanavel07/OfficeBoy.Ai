#!/usr/bin/env python3
"""
OfficeBoy.ai — Autonomous AI Office Assistant Operating System
Master CLI Entry Point

Usage:
  python main.py "Design and build a real-time crypto anomaly detector with WebSocket feed"
  python main.py --web --port 5000
  python main.py
"""

import sys
import os

# Ensure the root directory is on the python search path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from officeboy.cli import main

if __name__ == "__main__":
    main()
