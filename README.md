# 📑 Project Specification: System Transparency Dashboard

## Architecture Style: Hybrid Lean Stack (Edge Compute + Regional Data)

**Objective:** A "Glass-Box" application that visualizes the infrastructure, 
latency, and security layers powering it in real-time.

---

## 1. The Tech Stack (The "Lean" Arsenal)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | TanStack Start | Full-stack SSR at the Edge (V8 Isolate optimized). |
| Database | AWS RDS (PostgreSQL) | The "Regional Source of Truth" located in a Private VPC. |
| ORM | Drizzle | The lightweight TypeScript SQL "Interpreter." |
| Accelerator | Cloudflare Hyperdrive | Regional-to-Edge connection pooling and read-caching. |
| Storage | Cloudflare R2 | Global blob storage with zero egress fees for assets. |
| Identity | AWS Cognito | Secure JWT-based regional authentication. |

---

## 2. Functional Requirements (The "Showcase")

To prove the system architecture, the app must implement and display:

- **Node Detection:** Display the specific Cloudflare PoP (City/Airport 
  code) serving the current request.

- **Latency Metrics:** A "Speedometer" showing the round-trip time (ms) from 
  the Edge Worker to the AWS RDS database.

- **Cache Status:** Visual indicator if a database "Read" was served via 
  Hyperdrive Cache (1ms) or fetched from AWS Region (100ms+).

- **Identity Verification:** A profile section showing the JWT payload issued 
  by Cognito and verified locally at the Edge.

- **The Asset Bridge:** An image gallery where photos are uploaded to R2 and 
  their pointers (URLs) are stored in RDS.

---

## 3. Engineering Deliverables (The Workflow)

### Phase 1: The Local Core

- Initialize TanStack Start with Vite.
- Configure Drizzle with a local PostgreSQL schema.
- Build the "Interpreter" logic to handle basic CRUD.

### Phase 2: The Regional Vault (AWS)

- Provision AWS RDS inside a Private VPC.
- Setup AWS Cognito for User Identity.
- Configure Security Groups to lock down the warehouse.

### Phase 3: The Edge Deployment (Cloudflare)

- Deploy TanStack Start to Cloudflare Workers.
- Setup Cloudflare Hyperdrive to bridge the gap to AWS RDS.
- Configure Cloudflare R2 for image orchestration.

### Phase 4: The Transparency UI

- Build the dashboard components using TanStack Router.
- Implement "Metadata" headers to capture system metrics (cf-ray, latency, 
  etc.).

---

## 4. Definition of Done

The project is considered complete when:

1. The app is accessible globally with Zero Cold Starts.
2. The RDS Database is unreachable via its public IP (Private-only).
3. The UI explicitly explains how the data is moving through the system at 
   any given moment.

---

## 5. Architectural Mantra for this Project

> "We do not hide the plumbing; we highlight the engineering."
