# Sequence Diagram — FakeKong 2.0

## Overview

The sequence diagram illustrates the interaction flow between system components when a developer invokes an API through the FakeKong platform. It demonstrates the request lifecycle including authentication, subscription validation, rate limiting enforcement, request routing, and analytics logging.

The system follows a distributed architecture where a gateway layer communicates with backend services using gRPC, while persistent data is stored in PostgreSQL and logs are indexed in Elasticsearch.

---

## Scenario: API Invocation via Gateway

The main sequence shown represents the following workflow:

1. A developer sends an API request using an API key.
2. The request passes through the GraphQL/Gateway layer.
3. Authentication and subscription validation are performed.
4. Rate limiting policies are enforced.
5. The request is routed to the target API service.
6. Usage data is logged for analytics and monitoring.
7. The response is returned to the developer.

This flow highlights the backend orchestration and service communication within the system.

---

## Sequence Diagram

```plantuml
@startuml
actor Developer
participant "Client Application" as Client
participant "GraphQL Gateway" as Gateway
participant "Auth Service" as Auth
participant "Subscription Service" as Sub
participant "Rate Limit Service" as Rate
participant "API Gateway Service" as APIGW
participant "Target API Service" as API
participant "Analytics Service" as Analytics
database "PostgreSQL" as DB
participant "Elasticsearch" as ES

Developer -> Client : Invoke API Request
Client -> Gateway : Request with API Key

Gateway -> Auth : Validate API Key (gRPC)
Auth -> DB : Fetch Key Details
DB --> Auth : Key Data
Auth --> Gateway : Validation Result

Gateway -> Sub : Check Subscription (gRPC)
Sub -> DB : Verify Plan & Access
DB --> Sub : Subscription Data
Sub --> Gateway : Access Granted

Gateway -> Rate : Enforce Rate Limit
Rate -> DB : Fetch Policy
DB --> Rate : Policy Data
Rate --> Gateway : Allowed / Denied

alt Request Allowed
    Gateway -> APIGW : Forward Request
    APIGW -> API : Call Target Endpoint
    API --> APIGW : API Response
    APIGW --> Gateway : Response

    Gateway -> Analytics : Log Usage Event
    Analytics -> DB : Store Metrics
    Analytics -> ES : Index Logs

    Gateway --> Client : Return Response
    Client --> Developer : Display Result

else Rate Limit Exceeded
    Gateway --> Client : Error Response (429)
end

@enduml
```

---

## Design Considerations

The sequence diagram demonstrates several important architectural aspects:

* Gateway-based request orchestration
* Service-to-service communication using gRPC
* Authentication and authorization workflow
* Rate limiting enforcement using policies
* Logging and analytics pipeline
* Separation of concerns across services

The design ensures scalability, maintainability, and secure API access.

---

## Conclusion

The sequence diagram provides a dynamic view of how components interact within FakeKong 2.0 during API invocation. It highlights the distributed system architecture and backend coordination required to enforce security, rate limits, and monitoring while processing client requests.

<img width="1713" height="926" alt="sequenceDiagram" src="https://github.com/user-attachments/assets/047d41d0-3ae4-48bd-889e-038f883b32e1" />
