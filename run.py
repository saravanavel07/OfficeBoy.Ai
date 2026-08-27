#!/usr/bin/env python3
"""
OfficeBoy.ai — One-Line Launcher
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from officeboy.cli import main

if __name__ == "__main__":
    main()
