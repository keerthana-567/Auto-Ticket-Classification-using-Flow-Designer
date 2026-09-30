# Auto Ticket Classification using FLOW DESIGNER

This repository hosts the backend service for **Auto Ticket Classification**, mirroring ServiceNow `u_incident_workflow` custom table definitions and combining Google Gemini AI for automated ticket routing and classification.

## ServiceNow Table Data Mapping (`u_incident_workflow`)
- **`u_number`**: Incident Auto-numbering (Format: `INC100X`)
- **`u_caller`**: Reference to Sys User
- **`u_choice_2`**: Category (`network`, `hardware`, `access`, `performance`)
- **`u_choice_3`**: Subcategory (Dependent on Category)
- **`u_string_4`**: Short Description
- **`u_string_5`**: Full Description
- **`u_choice_6`**: Incident State
- **`u_reference_7`**: Assigned Group
- **`u_reference_8`**: Assigned To User

## Quick Start Guide

1. **Clone Repository & Install Dependencies**:
   ```bash
   npm install