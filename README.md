# About the repository

This a generic template of a microservice using Nodejs and Typescript, applying good practices of Software Architecture and DevOps. Let's see some of there principles and technologies used on this microservice.

# Architecture

I choosed use Clean Architecture on this project, the main objective of this architecture is isolate Domain Business Rules of infrastructure and implementation details. So, let's see about the layers of application:

- **Domain**: this layer concenter the main business rules, in other words this contains entities, value objects, domain events, usecases and another interfaces whoose describe the domain rules of the software. Consult about **DDD (Domain-Driven Design)** for better comprehension of patterns and principles used here.

- **Infrastructure**: this layer contains the implementations of external drivers, frameworks and libraries that we used on project. Some examples would be connection with database, implementations using message brokers services or a HTTP server.

- **Application**: this layer contains the implementations domain business rules defined on **Domain** together with the implementations defined on **Infrastructure**. In application we define interfaces that **Infrastructure** implements, using the **Dependency Inversion Principle (DIP)**.

- **Presentation**: this layer contains the controllers, listeners and another entrypoints of our software, this use the implementations defined on **Application** to external clients interact with our Domain Rules.

- **Shared**: this layer contains the generic interfaces using in more than one layer on software.

- **Main**: this layer contains the configuration to initialize the software.

# Services, Databases and another Tools

- **PostgreSQL** as main detabase.
- **Kafka** for handle with asynchronous communication and dispatch events.
- **Redis** for handle with distributed cache.
- **Jaeger** for distributed tracing.
- **Elastic APM** for observability (Logging and APM).
- **Kibana** for data visualization.
- **Kubernetes and Docker** for the containerization of software.
- **Terraform** for infrastructure as code.

# Frameworks and Libraries

- **Express.js** for handle with HTTP requests.
- **Prisma Client** for Object-Relational Mapping (ORM).
- **Kafka.js** for asynchronous events and communication.
- **OpenTelemetry** for handle with distributed tracing.
- **Winston** for handle with logging.
- **ioredis** for handle with redis communication.
- **Node Cron** for create scheluded cron jobs.
