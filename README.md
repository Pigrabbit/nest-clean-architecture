# NestJS Clean Architecture

It is a repository which migrates [Java code](https://github.com/thombergs/buckpal/tree/master) in [Get Your Hands Dirty on Clean Architecture](https://reflectoring.io/book/) to Typescript code.

## Structure

First and foremost, the source of this repository is consists of two parts.
One is account(core) and the other is adapter(external concerns).

Account is composed of domain and application, both of which are independent of any external concerns.
It does not depend on database or web framework(NestJS).

![hexagonal-architecture](https://reflectoring.io/images/gyhdoca/hexagonal-architecture_hu6764515d7030d45af6f7f498c79e292b_50897_956x0_resize_box_3.png)


```
./src
├── account
│   ├── application
│   │   ├── application.module.ts
│   │   ├── index.ts
│   │   ├── port
│   │   │   ├── in
│   │   │   │   ├── command
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── send-money.command.spec.ts
│   │   │   │   │   └── send-money.command.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── query
│   │   │   │   │   ├── get-account-balance.query.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── use-case
│   │   │   │       ├── index.ts
│   │   │   │       └── send-money.use-case.ts
│   │   │   └── out
│   │   │       ├── account-lock.ts
│   │   │       ├── index.ts
│   │   │       ├── load-account.port.ts
│   │   │       └── update-account-state.port.ts
│   │   └── service
│   │       ├── get-account-balance.service.ts
│   │       ├── index.ts
│   │       ├── no-op-account-lock.ts
│   │       ├── send-money.service.spec.ts
│   │       └── send-money.service.ts
│   └── domain
│       ├── account-id.ts
│       ├── account.spec.ts
│       ├── account.ts
│       ├── acitivity-window.ts
│       ├── acitivity.ts
│       ├── activity-id.ts
│       ├── index.ts
│       └── money.ts
├── adapter
│   ├── in
│   │   └── web
│   │       ├── controller
│   │       │   ├── get-account-balance.controller.spec.ts
│   │       │   ├── get-account-balance.controller.ts
│   │       │   ├── index.ts
│   │       │   ├── send-money.controller.spec.ts
│   │       │   └── send-money.controller.ts
│   │       ├── index.ts
│   │       └── web-adapter.module.ts
│   └── out
│       └── persistence
│           ├── index.ts
│           ├── orm
│           │   ├── account-persistence.adapter.spec.ts
│           │   ├── account-persistence.adapter.ts
│           │   ├── entity
│           │   │   ├── account.typeorm.entity.ts
│           │   │   ├── activity.typeorm.entity.ts
│           │   │   └── index.ts
│           │   ├── index.ts
│           │   ├── mapper
│           │   │   ├── account-mapper.ts
│           │   │   └── index.ts
│           │   ├── orm-presistence.module.ts
│           │   └── repository
│           │       ├── account.repository.impl.spec.ts
│           │       ├── account.repository.impl.ts
│           │       ├── account.repository.ts
│           │       ├── activity.repository.impl.spec.ts
│           │       ├── activity.repository.impl.ts
│           │       ├── activity.repository.ts
│           │       └── index.ts
│           └── persistence-adapter.module.ts
├── app.module.ts
└── main.ts
```

## Test

Each classes have their own unit test.
Not even '@nestjs/testing' is used in testing application module because it is not dependent on web framework. 
'@nestjs/testing' library is used limitedly in testing controllers.
