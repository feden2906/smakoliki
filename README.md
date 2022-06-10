# smakoliki

*********
model:

folders:
- dto (dto.ts && responce.dto.ts)
- entities
- tests
- types
- swagger (swagger.doc.ts)

files:
- module
- controller
- service
- repository
- mapper
- presenter


*********
services:

1.
name: Auth-micro
technologies: Nestjs, TypeORM, PostgresQL, JWT
logic: HTTP for auth user
type: opened

2.
name: Email-micro
technologies: Nestjs, SomeService*
logic: Event
type: closed

3.
name: Image-micro
technologies: Nestjs, AWS S3, 
logic: Event
type: closed

4.
name: Chat-micro
technologies: Nestjs, ... 
logic: HTTP, Socket, ...
type: open

5.
name: Pay-micro
technologies: Nestjs, TypeORM, PostgresQL, ... 
logic: HTTP, need money, ...
type: open

*********
