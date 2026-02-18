# ER Diagram — FakeKong 2.0

## Overview

The Entity Relationship (ER) diagram represents the database schema of the FakeKong 2.0 platform. It illustrates the relationships between users, organizations, API products, subscriptions, API keys, and usage logs.

The system follows a multi-tenant architecture where multiple organizations can manage APIs and developers can subscribe to API plans using generated API keys. The database is designed using relational modeling principles to ensure data integrity, scalability, and efficient querying.

The schema is implemented using PostgreSQL.

---

## Key Entities

* **Users** — Platform users including developers and administrators.
* **Organizations** — Multi-tenant workspaces that own APIs.
* **OrganizationMembers** — Mapping between users and organizations.
* **APIProducts** — APIs published by organizations.
* **Endpoints** — Individual API routes under each API product.
* **Plans** — Subscription plans with pricing and rate limits.
* **Subscriptions** — User subscriptions to API plans.
* **APIKeys** — Authentication keys issued for subscriptions.
* **RateLimitPolicies** — Rate limiting rules associated with plans.
* **UsageLogs** — Logs capturing API usage and performance metrics.

---

## ER Diagram

```plantuml
@startuml
entity Users {
  +id : UUID <<PK>>
  --
  name : varchar
  email : varchar <<UNIQUE>>
  password_hash : varchar
  role : varchar
  created_at : timestamp
}

entity Organizations {
  +id : UUID <<PK>>
  --
  name : varchar
  created_at : timestamp
}

entity OrganizationMembers {
  +id : UUID <<PK>>
  --
  user_id : UUID <<FK>>
  organization_id : UUID <<FK>>
  role : varchar
}

entity APIProducts {
  +id : UUID <<PK>>
  --
  organization_id : UUID <<FK>>
  name : varchar
  description : text
  status : varchar
  created_at : timestamp
}

entity Endpoints {
  +id : UUID <<PK>>
  --
  api_id : UUID <<FK>>
  path : varchar
  method : varchar
  target_url : varchar
}

entity Plans {
  +id : UUID <<PK>>
  --
  api_id : UUID <<FK>>
  name : varchar
  price : decimal
  rate_limit : int
}

entity Subscriptions {
  +id : UUID <<PK>>
  --
  user_id : UUID <<FK>>
  plan_id : UUID <<FK>>
  status : varchar
  start_date : date
  end_date : date
}

entity APIKeys {
  +id : UUID <<PK>>
  --
  subscription_id : UUID <<FK>>
  key_value : varchar
  status : varchar
  created_at : timestamp
}

entity RateLimitPolicies {
  +id : UUID <<PK>>
  --
  plan_id : UUID <<FK>>
  requests_per_minute : int
  burst_limit : int
  algorithm : varchar
}

entity UsageLogs {
  +id : UUID <<PK>>
  --
  api_key_id : UUID <<FK>>
  api_id : UUID <<FK>>
  timestamp : timestamp
  status_code : int
  latency_ms : int
}

Users ||--o{ OrganizationMembers
Organizations ||--o{ OrganizationMembers

Organizations ||--o{ APIProducts
APIProducts ||--o{ Endpoints

APIProducts ||--o{ Plans
Plans ||--o{ Subscriptions

Users ||--o{ Subscriptions
Subscriptions ||--o{ APIKeys

Plans ||--|| RateLimitPolicies

APIKeys ||--o{ UsageLogs
APIProducts ||--o{ UsageLogs

@enduml
```

---

## Design Considerations

The database design ensures:

* Multi-tenant isolation through organization relationships.
* Secure API access via API keys linked to subscriptions.
* Flexible subscription management using plans.
* Scalable logging through usage logs.
* Support for rate limiting using policy definitions.

Foreign key constraints maintain referential integrity between entities.

---

## Conclusion

The ER diagram models the core data architecture of FakeKong 2.0, supporting API management, subscription workflows, authentication, and analytics. It provides a scalable foundation for implementing a distributed API gateway and developer marketplace platform.

<img width="534" height="1154" alt="ErDiagram" src="https://github.com/user-attachments/assets/bfc78e54-963b-4ace-aff6-467ac494fb82" />

