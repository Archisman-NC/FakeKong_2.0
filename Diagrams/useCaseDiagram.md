# Use Case Diagram — FakeKong 2.0

## Overview

The use case diagram illustrates the interactions between different actors and the FakeKong 2.0 platform. It represents the functional requirements of the system and shows how users interact with various components such as API publishing, subscription management, API gateway access, and analytics.

The platform supports multiple stakeholders including developers, API providers, organization administrators, and system administrators in a multi-tenant environment.

---

## Actors

* **Developer (API Consumer)** — Subscribes to APIs and invokes them using API keys.
* **API Provider** — Publishes and manages APIs within an organization.
* **Organization Admin** — Manages users, subscriptions, and organization settings.
* **System Administrator** — Oversees system-level monitoring and management.

---

## Major Functionalities

* User authentication and registration
* Organization and team management
* API publishing and configuration
* API subscription and key generation
* API gateway invocation with authentication and rate limiting
* Usage analytics and monitoring
* System administration and user management

---

## Use Case Diagram

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Developer (API Consumer)" as Developer
actor "API Provider" as Provider
actor "Organization Admin" as Admin
actor "System Administrator" as SysAdmin

rectangle "FakeKong 2.0 Platform" {

    (Register / Login) as UC1
    (Manage Organization) as UC2
    (Invite Team Members) as UC3
    
    (Publish API) as UC4
    (Configure API Endpoints) as UC5
    (Set Rate Limits & Plans) as UC6
    
    (Browse API Marketplace) as UC7
    (Subscribe to API) as UC8
    (Generate API Key) as UC9
    
    (Invoke API via Gateway) as UC10
    (Authenticate Request) as UC11
    (Enforce Rate Limiting) as UC12
    (Log Usage Data) as UC13
    
    (View Analytics Dashboard) as UC14
    (Search APIs) as UC15
    
    (Manage Subscriptions) as UC16
    (Manage API Keys) as UC17
    
    (System Monitoring) as UC18
    (Manage Users & Roles) as UC19
}

Developer --> UC1
Developer --> UC7
Developer --> UC8
Developer --> UC9
Developer --> UC10
Developer --> UC14
Developer --> UC17

Provider --> UC1
Provider --> UC2
Provider --> UC3
Provider --> UC4
Provider --> UC5
Provider --> UC6
Provider --> UC14

Admin --> UC2
Admin --> UC3
Admin --> UC16
Admin --> UC14

SysAdmin --> UC18
SysAdmin --> UC19

UC10 --> UC11 : <<include>>
UC10 --> UC12 : <<include>>
UC10 --> UC13 : <<include>>

UC4 --> UC5 : <<include>>
UC4 --> UC6 : <<include>>

UC8 --> UC9 : <<include>>

@enduml
```

---

## Design Considerations

The use case diagram reflects:

* Multi-tenant SaaS architecture
* Separation of roles and responsibilities
* Secure API access through authentication and rate limiting
* Subscription-based API consumption
* Monitoring and analytics capabilities

The diagram ensures clarity in system functionality and actor interactions.

---

## Conclusion

The use case diagram provides a high-level functional view of the FakeKong 2.0 platform, illustrating how different actors interact with the system to publish, manage, and consume APIs. It serves as a foundation for system design and implementation planning.


<img width="799" height="1113" alt="useCaseDiagram" src="https://github.com/user-attachments/assets/68143f30-d86b-4f8d-be95-afc9f3da7ad3" />
