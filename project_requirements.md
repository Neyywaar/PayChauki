# PayChauki – Project Requirements

## 1. Project Overview

**Product Name:** PayChauki  
**Project Type:** Academic Software Engineering Project  
**Development Approach:** Scrum-based Agile development

PayChauki is an academic software prototype designed to demonstrate transaction monitoring and fraud detection using simulated transaction data and predefined rules. The system records transaction information, evaluates transactions for suspicious conditions, assigns risk levels, generates alerts, and blocks high-risk transactions when configured rules require it.

PayChauki is **not** intended to be a production banking system. It does not process real financial transactions or integrate with real banks, digital wallets, Nepal Rastra Bank systems, or live banking APIs.

### Project Workflow

```text
User Login
    ↓
Enter Transaction
    ↓
Validate Transaction
    ↓
Fraud Detection Rules
    ↓
Assign Risk Level
    ↓
Low Risk → Approve
Medium Risk → Alert / Review
High Risk → Block
    ↓
Record Transaction and Activity
```

---

## 2. Project Objectives

PayChauki shall aim to:

- Develop a basic prototype for detecting suspicious transactions.
- Apply predefined fraud detection rules to transaction data.
- Assign Low, Medium, or High risk levels.
- Generate alerts for suspicious activity.
- Block or stop transactions classified as high risk according to configured rules.
- Implement basic authentication and role-based access control.
- Provide interfaces for customers, fraud analysts, and administrators.
- Support fraud reporting and case management.
- Record important security and transaction activities.
- Provide practical experience with requirements engineering, Scrum, system design, testing, deployment, GitHub, and team collaboration.

---

## 3. Project Scope

### 3.1 In Scope

- User registration and login.
- Logout functionality.
- Role-based access control.
- Transaction recording.
- Transaction validation.
- Transaction history.
- Predefined fraud detection rules.
- Low, Medium, and High risk levels.
- Suspicious transaction flagging.
- Fraud alerts.
- Blocking or stopping high-risk transactions.
- Detection and flagging of suspicious login attempts.
- Fraud reporting by users.
- Fraud analyst dashboard.
- Review of flagged and reported transactions.
- Fraud case status management.
- Basic user management.
- Basic fraud rule management.
- Audit logging.
- Functional, security, integration, system, UI, and basic performance testing.
- Prototype demonstration and deployment.

### 3.2 Out of Scope

The following are outside the scope of the academic prototype:

- Direct integration with real banks.
- Real financial transactions.
- Integration with real digital wallets.
- Real-time banking APIs.
- Real customer financial data.
- Advanced AI or machine-learning fraud prediction.
- Large-scale production deployment.
- Production-grade scalability and availability infrastructure.

All demonstrations and testing shall use sample or simulated transaction data.

---

## 4. Stakeholders

| Stakeholder | Main Interest / Role |
|---|---|
| Customer/User | Registers, logs in, records transactions, monitors activity, receives alerts, and reports suspicious transactions. |
| Fraud Analyst | Reviews flagged and reported transactions, investigates fraud cases, and updates case status. |
| System Administrator | Manages users, roles, and basic fraud detection rules. |
| Project Team | Plans, designs, develops, tests, documents, and deploys the academic prototype. |
| Financial Institution | Represents a potential organization that could use a similar system in a real-world context. |

---

## 5. User Roles and Permissions

### Customer/User

The customer can:

- Register an account.
- Log in and log out.
- Record transactions.
- View their own transaction history.
- Receive suspicious activity alerts.
- Report suspicious transactions.

### Fraud Analyst

The fraud analyst can:

- View flagged transactions.
- View reported transactions.
- Review transaction and case details.
- View assigned risk levels.
- Update fraud case status.

### System Administrator

The administrator can:

- Manage users.
- Manage user roles.
- Configure, add, or modify basic fraud detection rules.
- Access administrative functions restricted from other roles.

---

# 6. Functional Requirements

## 6.1 User Management

### FR-01 — User Registration

The system shall allow users to register an account.

### FR-02 — Login and Logout

The system shall allow registered users to log in and log out.

### FR-03 — Role-Based Access

The system shall provide different access levels for customers, fraud analysts, and administrators.

---

## 6.2 Transaction Management

### FR-04 — Transaction Recording

The system shall allow transaction information to be recorded.


### FR-05 — Transaction History

The system shall allow users to view their transaction history.

**Acceptance Criteria:**

- Previous transactions are displayed clearly.
- Users can only view their own transaction records unless their role authorizes broader access.

### FR-06 — Transaction Validation

The system shall validate required transaction information before processing.

---

## 6.3 Fraud Detection

### FR-07 — Fraud Rule Checking

The system shall check transactions against predefined fraud detection rules.

### FR-08 — Risk Level Assignment

The system shall assign a risk level to each evaluated transaction.

**Supported risk levels:**

- Low
- Medium
- High

### FR-09 — Suspicious Transaction Flagging

The system shall flag transactions that meet suspicious activity conditions.

### FR-10 — High-Risk Transaction Blocking

The system shall block or stop high-risk transactions according to configured rules.


---

## 6.4 Security and Alerts

### FR-11 — Credential Verification

The system shall verify user credentials before allowing access.

### FR-12 — Feature Restriction by Role

The system shall restrict users from accessing features outside their assigned role.

### FR-13 — Suspicious Login Detection

The system shall detect and flag suspicious login attempts.

### FR-14 — Fraud Alerts

The system shall generate an alert when suspicious transaction activity is detected.

### FR-15 — Audit Logging

The system shall record important security and transaction activities in an audit log.

---

## 6.5 Fraud Reporting and Investigation

### FR-16 — Report Suspicious Transaction

The system shall allow users to report a suspicious transaction.

### FR-17 — View Flagged and Reported Transactions

The system shall allow fraud analysts to view flagged and reported transactions.

### FR-18 — Fraud Case Status Management

The system shall allow fraud analysts to update the status of a fraud case.

---

## 6.6 Administration

### FR-19 — User Management

The system shall allow administrators to manage users.

### FR-20 — Fraud Rule Management

The system shall allow administrators to configure basic fraud detection rules.
---

# 7. Non-Functional Requirements

## NFR-01 — Performance

- Normal user requests should respond within a reasonable time.
- Fraud checks should complete without significant delay for the scale of the academic prototype.

## NFR-02 — Usability

- The interface should be simple and understandable.
- Forms, dashboards, and alerts should be clear.
- Fraud alerts should communicate the reason or relevant context where applicable.

## NFR-03 — Reliability

- Transaction and fraud records should be stored correctly.
- Normal errors should be handled without crashing the system.

## NFR-04 — Maintainability

- The code should be organized into understandable modules.
- Fraud detection rules should be reasonably easy to modify.

## NFR-05 — Availability

- The prototype should be available during testing and demonstration.

## NFR-06 — Accuracy

- Transactions matching predefined fraud rules should be identified correctly.
- The system should minimize unnecessary alerts where possible within the limitations of rule-based detection.

## NFR-07 — Scalability

- The prototype should support an increasing number of sample users and transactions within the limits of the academic project.

---

# 8. User Stories

| ID | User Story | Points | Priority |
|---|---|---:|---|
| US-01 | As a customer, I want to create an account, so that I can use PayChauki. | 3 | High |
| US-02 | As a customer, I want to log in securely, so that only I can access my account. | 3 | High |
| US-03 | As a customer, I want to view my transaction history, so that I can monitor my activities. | 3 | Medium |
| US-04 | As a customer, I want to record a transaction, so that it can be checked for fraud. | 3 | High |
| US-05 | As a fraud analyst, I want PayChauki to check transactions for suspicious patterns, so that potential fraud can be detected. | 8 | High |
| US-06 | As a customer, I want to receive an alert for suspicious activity, so that I can take action. | 5 | High |
| US-07 | As a fraud analyst, I want high-risk transactions to be blocked, so that potentially fraudulent transactions can be stopped. | 8 | High |
| US-08 | As a customer, I want to report a suspicious transaction, so that it can be investigated. | 3 | Medium |
| US-09 | As a fraud analyst, I want to review flagged transactions, so that I can investigate potential fraud. | 5 | High |
| US-10 | As an administrator, I want to manage users and fraud rules, so that the system remains controlled. | 5 | Medium |

**Total Story Points: 46**

US-05 and US-07 are assigned 8 points because fraud detection and high-risk transaction handling represent the most complex areas of the prototype.

---

# 9. Product Backlog

| Priority | ID | Feature | Points |
|---:|---|---|---:|
| 1 | US-02 | Secure Login | 3 |
| 2 | US-04 | Record Transaction | 3 |
| 3 | US-05 | Fraud Detection | 8 |
| 4 | US-06 | Fraud Alert | 5 |
| 5 | US-07 | Block High-Risk Transaction | 8 |
| 6 | US-03 | Transaction History | 3 |
| 7 | US-08 | Report Fraud | 3 |
| 8 | US-09 | Fraud Case Review | 5 |
| 9 | US-01 | User Registration | 3 |
| 10 | US-10 | User and Rule Management | 5 |

The Product Owner may reprioritize the backlog during sprint planning based on project progress.

---

# 10. Sprint Plan

## Sprint 1 — Foundation and Basic System

**Goal:** Establish the core system and customer access.

**Main features:**

- User registration.
- Secure login and logout.
- User roles.
- Transaction recording.
- Transaction history.
- Basic user interface.

**User Stories:** US-01, US-02, US-03, US-04

---

## Sprint 2 — Fraud Detection

**Goal:** Implement the core fraud monitoring workflow.

**Main features:**

- Predefined fraud rules.
- Risk level assignment.
- Suspicious transaction flagging.
- Fraud alerts.
- High-risk transaction blocking.

**User Stories:** US-05, US-06, US-07

---

## Sprint 3 — Investigation and Administration

**Goal:** Complete investigation and administrative functionality.

**Main features:**

- Fraud reporting.
- Fraud analyst dashboard.
- Fraud case management.
- User and rule management.
- Testing and deployment preparation.

**User Stories:** US-08, US-09, US-10

---

# 11. Core Fraud Detection Workflow

The prototype shall follow this logical flow:

```text
Transaction Submitted
        ↓
Validate Required Information
        ↓
Apply Predefined Fraud Rules
        ↓
Calculate / Assign Risk Level
        ↓
┌───────────────┬────────────────────┬────────────────────┐
│ Low Risk      │ Medium Risk        │ High Risk          │
│ Approve       │ Flag / Alert       │ Block / Alert      │
└───────────────┴────────────────────┴────────────────────┘
        ↓
Record Transaction and Relevant Activity
        ↓
Make Flagged/Reported Cases Available for Analyst Review
```

The specific fraud rules and thresholds may be implemented as configurable prototype rules and should be documented with the implementation.

---

# 12. Data and Record Requirements

The system should maintain, as applicable:

- User account information.
- User role information.
- Transaction records.
- Transaction status.
- Assigned risk levels.
- Fraud flags.
- Fraud alerts.
- User-submitted fraud reports.
- Fraud case status.
- Basic fraud rule configuration.
- Security and transaction audit records.

The project shall use simulated or sample data only.

---

# 13. Testing Requirements

Testing should include the following areas:

## 13.1 Functional Testing

Verify that implemented features perform according to their functional requirements.

Examples:

- Registration.
- Login and logout.
- Transaction recording.
- Transaction history.
- Fraud detection.
- Alerts.
- Blocking.
- Fraud reporting.
- Case status updates.

## 13.2 Security Testing

Verify:

- Invalid login handling.
- Role-based access restrictions.
- Unauthorized access prevention.
- Suspicious login detection where implemented.

## 13.3 Integration Testing

Verify connections between:

- Transaction recording and fraud detection.
- Fraud detection and risk assignment.
- High-risk detection and blocking.
- Flagging and alert generation.
- Fraud reporting and analyst review.

## 13.4 System Testing

Verify complete user workflows from login through transaction processing and fraud outcomes.

## 13.5 User Interface Testing

Verify:

- Forms.
- Buttons.
- Validation messages.
- Alerts.
- Dashboards.
- Navigation.

## 13.6 Basic Performance Testing

Verify that normal prototype operations respond reasonably for the expected demonstration dataset.

### Minimum Test Cases

| ID | Type | Objective | Input | Expected Result |
|---|---|---|---|---|
| TC-01 | Unit | Test login validation | Valid credentials | Login succeeds |
| TC-02 | Unit | Test invalid login | Wrong credentials | Login is rejected |
| TC-03 | Integration | Test transaction and fraud check | Suspicious transaction | Transaction is flagged |
| TC-04 | Integration | Test alert generation | High-risk transaction | Alert is generated |
| TC-05 | System | Test normal transaction flow | Valid transaction | Transaction completes successfully |
| TC-06 | System | Test high-risk flow | High-risk transaction | Transaction is blocked according to rules |
| TC-07 | UAT | Test fraud reporting | Suspicious transaction | Report is submitted |
| TC-08 | UAT | Test analyst review | Flagged transaction | Case is displayed for review |

---

# 14. Defect Tracking

The project should maintain a basic defect record.

| Bug ID | Description | Priority | Status |
|---|---|---|---|
| BUG-01 | Invalid login accepted | High | Open |
| BUG-02 | Fraud alert not displayed | High | Fixed |
| BUG-03 | User can access administrator page | High | Open |

Actual defects and statuses should be updated to reflect real testing results.

---

# 15. Definition of Done

A backlog item may be considered complete when:

- Its functional requirements have been implemented.
- Relevant acceptance criteria have been satisfied.
- The feature has been tested.
- Critical defects have been resolved or documented.
- The code is committed to the repository.
- Relevant documentation is updated.
- The work is reviewed according to the team's GitHub workflow.

---


# 16. Prototype Constraints

PayChauki is intentionally limited to a manageable academic prototype.

The system:

- Uses simulated transaction data.
- Uses predefined fraud detection rules.
- Does not represent a real banking platform.
- Does not guarantee production-grade fraud detection accuracy.
- Does not use real customer financial information.
- Does not connect to live financial institutions.

These constraints allow the project to focus on demonstrating the complete software engineering process, including requirements, Agile planning, design, implementation, testing, collaboration, and deployment.

---

# 17. Summary

PayChauki demonstrates a complete academic software development workflow around transaction monitoring and rule-based fraud detection:

```text
User
  → Authentication
  → Transaction
  → Validation
  → Fraud Rule Check
  → Risk Level
  → Approve / Alert / Block
  → Investigation
  → Case Management
```

The project requirements are designed to provide a realistic but manageable scope for a four-person Scrum team while supporting system design, implementation, testing, GitHub collaboration, Agile project management, and final prototype demonstration.
