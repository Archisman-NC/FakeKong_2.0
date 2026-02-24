# Class Diagram — FakeKong 2.0

## Overview

The class diagram represents the core object-oriented structure of the FakeKong 2.0 platform. It illustrates the main domain entities, their attributes, methods, and relationships within the system.

The system follows object-oriented design principles such as encapsulation, abstraction, and separation of concerns. The diagram models key components including users, organizations, APIs, subscriptions, API keys, rate limiting, and gateway processing.

This class structure supports a modular backend architecture aligned with software engineering best practices.

---

## Key Classes

* **User** — Represents platform users including developers and administrators.
* **Organization** — Multi-tenant workspace containing APIs and members.
* **APIProduct** — Represents an API published by an organization.
* **Endpoint** — Individual routes belonging to an API.
* **Plan** — Subscription plan with pricing and rate limits.
* **Subscription** — User subscription to an API plan.
* **APIKey** — Authentication key issued to access APIs.
* **RateLimitPolicy** — Defines rate limiting rules for API usage.
* **UsageLog** — Stores request logs and metrics.
* **AnalyticsRecord** — Aggregated analytics data.
* **APIGateway** — Core gateway responsible for request processing.

---

## Class Diagram

```plantuml
@startuml
skinparam classAttributeIconSize 0

class User {
  +id: UUID
  +name: String
  +email: String
  +passwordHash: String
  +role: String
  +createOrganization()
  +joinOrganization()
}

class Organization {
  +id: UUID
  +name: String
  +createdAt: DateTime
  +addMember()
  +removeMember()
}

class APIProduct {
  +id: UUID
  +name: String
  +description: String
  +status: String
  +publish()
  +deactivate()
}

class Endpoint {
  +id: UUID
  +path: String
  +method: String
  +targetURL: String
}

class Plan {
  +id: UUID
  +name: String
  +price: float
  +rateLimit: int
}

class Subscription {
  +id: UUID
  +status: String
  +startDate: Date
  +endDate: Date
  +activate()
  +cancel()
}

class APIKey {
  +id: UUID
  +keyValue: String
  +status: String
  +createdAt: Date
  +revoke()
  +regenerate()
}

class RateLimitPolicy {
  +id: UUID
  +requestsPerMinute: int
  +burstLimit: int
  +algorithm: String
  +validateRequest()
}

class UsageLog {
  +id: UUID
  +timestamp: DateTime
  +statusCode: int
  +latencyMs: int
}

class AnalyticsRecord {
  +totalRequests: int
  +errorRate: float
  +averageLatency: float
  +generateReport()
}

class APIGateway {
  +authenticate()
  +authorize()
  +routeRequest()
  +enforceRateLimit()
  +logUsage()
}

Organization "1" -- "*" User : members
Organization "1" -- "*" APIProduct : owns

APIProduct "1" -- "*" Endpoint : contains
APIProduct "1" -- "*" Plan : offers

User "1" -- "*" Subscription
Plan "1" -- "*" Subscription

Subscription "1" -- "*" APIKey : generates

Plan "1" -- "1" RateLimitPolicy

APIKey "1" -- "*" UsageLog
APIProduct "1" -- "*" UsageLog

APIProduct "1" -- "*" AnalyticsRecord

APIGateway --> APIKey
APIGateway --> RateLimitPolicy
APIGateway --> Endpoint
APIGateway --> UsageLog

@enduml
```

---

## Object-Oriented Principles Applied

The system demonstrates core OOP concepts:

* **Encapsulation** — Each class contains its own attributes and methods.
* **Abstraction** — Gateway and service behaviors hide implementation details.
* **Association** — Relationships between users, subscriptions, and APIs.
* **Composition** — API products contain endpoints.
* **Separation of Concerns** — Domain entities are independent of gateway logic.

---

## Design Patterns Reflected

The class design aligns with several software design patterns:

* Repository Pattern — Data access abstraction
* Service Layer Pattern — Business logic separation
* Factory Pattern — API key generation
* Strategy Pattern — Rate limiting algorithms
* Middleware Pattern — Gateway request pipeline
* Singleton Pattern — Configuration management

---

## Conclusion

The class diagram provides a structured view of the FakeKong 2.0 domain model and demonstrates object-oriented system design. It serves as the foundation for implementing a scalable API gateway and developer marketplace platform using modern backend engineering practices.

<img width="872" height="1382" alt="classDiagram" src="https://github.com/user-attachments/assets/3d7ea558-c8d6-40de-9781-f73a011bd043" />
