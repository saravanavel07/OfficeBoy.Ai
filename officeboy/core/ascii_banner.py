"""
OfficeBoy.ai — Terminal Presentation & Robot Mascot Art
"""

import sys

ROBOT_ASCII = r"""
               .---.
              /_____\
             (  . .  )     OfficeBoy.ai
              )  =  (      Autonomous AI Office Assistant
             /`-----'\     1 Managing Director + 5 Specialist Agents
            /  |   |  \
           (   |___|   )
            \_________/
             / /   \ \
            (_/     \_)
"""

BANNER_TEXT = r"""
 ============================================================================
  ___  ____ ____ _ ____ ____ ___  ____ _   _    ____ _ 
 |   | |___ |___ | |    |___ |__] |  |  \_/     |__| | 
 |___| |    |    | |___ |___ |__] |__|   |  .   |  | | 
 ============================================================================
   AUTONOMOUS MULTI-AGENT AI OFFICE OPERATING SYSTEM — PURE PYTHON EDITION
 ============================================================================
"""


def print_officeboy_banner():
    """Prints the stylish OfficeBoy robot banner to the terminal."""
    try:
        # Check if terminal supports ANSI colors
        print("\033[97;1m" + BANNER_TEXT + "\033[0m")
        print("\033[36m" + ROBOT_ASCII + "\033[0m")
    except Exception:
        print(BANNER_TEXT)
        print(ROBOT_ASCII)
