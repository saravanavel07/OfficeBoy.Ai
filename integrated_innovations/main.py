#!/usr/bin/env python3
"""
INTEGRATED INNOVATIONS
Master CLI & Company Entry Point

Usage:
  python main.py "Design and build a real-time crypto anomaly detector with WebSocket feed"
  python main.py "Invoice processing pipeline" --web --port 5000
"""

import sys
import argparse
import logging
import threading
from typing import Optional

from core.orchestrator import CompanyOrchestrator
from web.app import start_server

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("IntegratedInnovations.Main")


def parse_arguments():
    parser = argparse.ArgumentParser(
        description="INTEGRATED INNOVATIONS — Autonomous Multi-Agent AI Company (1 MD + 5 Specialists)"
    )
    parser.add_argument(
        "brief",
        nargs="?",
        default="Architect a high-performance Python analytics engine with automated fraud detection and executive reporting.",
        help="Client project brief to dispatch to the Managing Director"
    )
    parser.add_argument(
        "--client",
        default="Aegis Capital & Global Partners",
        help="Name of the client entity receiving deliverables"
    )
    parser.add_argument(
        "--web",
        action="store_true",
        help="Launch the live Flask web dashboard on port 5000"
    )
    parser.add_argument(
        "--port",
        type=int,
        default=5000,
        help="Port for the web dashboard (default: 5000)"
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Simulation delay in seconds between agent workflow steps (default: 1.0)"
    )
    return parser.parse_args()


def main():
    args = parse_arguments()

    print("\n" + "=" * 70)
    print("  INTEGRATED INNOVATIONS — Autonomous Multi-Agent AI Enterprise")
    print("  Managing Director: Aegis | Specialists: Vega, Nova, Iris, Sable, Rune")
    print("=" * 70 + "\n")

    # If --web flag is passed, launch Flask web server in a daemon thread
    if args.web:
        server_thread = threading.Thread(
            target=start_server,
            kwargs={"port": args.port, "host": "0.0.0.0", "debug": False},
            daemon=True
        )
        server_thread.start()
        print(f"[*] Web Dashboard launched at: http://localhost:{args.port}")

    orchestrator = CompanyOrchestrator(
        log_path="company_log.json",
        delay_between_steps=args.delay
    )

    print(f"[*] Client: {args.client}")
    print(f"[*] Dispatching Brief: \"{args.brief}\"\n")

    try:
        final_state = orchestrator.run_project(
            client_brief=args.brief,
            client_name=args.client
        )

        print("\n" + "=" * 70)
        print("  PROJECT DELIVERY COMPLETE — FINAL DOSSIER SIGNED OFF")
        print("=" * 70)
        final_deliverable = final_state.get("final_deliverable", "")
        if isinstance(final_deliverable, str):
            print(f"\n{final_deliverable}\n")
        else:
            print(f"\n{final_deliverable.get('final_deliverable', '')}\n")

        print("State written to: company_log.json")

    except KeyboardInterrupt:
        print("\n[!] Process interrupted by user. Exiting gracefully.")
        sys.exit(0)


if __name__ == "__main__":
    main()
