# PayChauki – Product Backlog

## Overview

The PayChauki product backlog is an ordered list of user stories and features required for the academic prototype. The backlog follows a Scrum-based Agile approach and may be reprioritized by the Product Owner during sprint planning based on project progress and team capacity.

---

## Product Backlog

| Priority | Backlog ID | User Story / Feature | Description | Story Points | Sprint |
|---:|---|---|---|---:|---|
| 1 | US-02 | Secure Login and Logout | Allow registered users to securely log in and log out, while preventing unauthorized access to protected features. | 3 | Sprint 1 |
| 2 | US-04 | Record Transaction | Allow users to enter transaction information, validate required fields, and submit transactions for fraud evaluation. | 3 | Sprint 1 |
| 3 | US-05 | Fraud Detection | Check transactions against predefined fraud detection rules, flag suspicious activity, and assign Low, Medium, or High risk levels. | 8 | Sprint 2 |
| 4 | US-06 | Fraud Alerts | Generate alerts when suspicious transaction activity is detected and provide relevant context where applicable. | 5 | Sprint 2 |
| 5 | US-07 | Block High-Risk Transactions | Block or stop transactions classified as high risk according to configured fraud detection rules. | 8 | Sprint 2 |
| 6 | US-03 | Transaction History | Allow users to view their own previous transaction records clearly. | 3 | Sprint 1 |
| 7 | US-08 | Report Suspicious Transaction | Allow users to report suspicious transactions for investigation. | 3 | Sprint 3 |
| 8 | US-09 | Fraud Case Review and Status Management | Allow fraud analysts to review flagged and reported transactions and update fraud case status. | 5 | Sprint 3 |
| 9 | US-01 | User Registration | Allow new users to create an account and access PayChauki after successful registration. | 3 | Sprint 1 |
| 10 | US-10 | User and Fraud Rule Management | Allow administrators to manage users, roles, and basic fraud detection rules. | 5 | Sprint 3 |

---

## Backlog Summary

- **Total Backlog Items:** 10
- **Total Story Points:** 46
- **Development Approach:** Scrum-based Agile
- **Product:** PayChauki
- **Data Scope:** Simulated or sample transaction data only

---

## Sprint Allocation

### Sprint 1 – Foundation and Basic System

**Goal:** Establish the core system and customer access.

| ID | Backlog Item | Points |
|---|---|---:|
| US-01 | User Registration | 3 |
| US-02 | Secure Login and Logout | 3 |
| US-03 | Transaction History | 3 |
| US-04 | Record Transaction | 3 |
| **Sprint Total** |  | **12** |

### Sprint 2 – Fraud Detection

**Goal:** Implement the core fraud monitoring workflow.

| ID | Backlog Item | Points |
|---|---|---:|
| US-05 | Fraud Detection and Risk Assignment | 8 |
| US-06 | Fraud Alerts | 5 |
| US-07 | Block High-Risk Transactions | 8 |
| **Sprint Total** |  | **21** |

### Sprint 3 – Investigation and Administration

**Goal:** Complete investigation and administrative functionality.

| ID | Backlog Item | Points |
|---|---|---:|
| US-08 | Report Suspicious Transaction | 3 |
| US-09 | Fraud Case Review and Status Management | 5 |
| US-10 | User and Fraud Rule Management | 5 |
| **Sprint Total** |  | **13** |

---

## Definition of Done

A product backlog item is considered complete when:

- Its functional requirements have been implemented.
- Relevant acceptance criteria have been satisfied.
- The feature has been tested.
- Critical defects have been resolved or documented.
- The code has been committed to the project repository.
- Relevant documentation has been updated.
- The work has been reviewed according to the team's GitHub workflow.

---

## Backlog Management

The Product Owner may reprioritize the backlog during sprint planning based on project progress, dependencies, implementation complexity, and team capacity. The backlog should remain aligned with the PayChauki prototype scope, which uses simulated transaction data and predefined fraud detection rules.
