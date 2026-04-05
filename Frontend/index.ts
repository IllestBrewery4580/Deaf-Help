// index.ts
// ======== 
// ASL Bridge - real-time WebSocket server
//
// Two sufaces:
//   POST /internal/event   - Python posts events here (internal only)
//   socket.io              - React frontend connects here for live updates
// 
// Run:  npm run dev
//       npm run build && npm start

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import type {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from "./events";
import { InternalEventSchema } from "./validation";
import * as history from "./history";

// -- Config --------------------------------------------------------------------

const PORT                  = parseInt(process.env.PORT               ?? "3001");