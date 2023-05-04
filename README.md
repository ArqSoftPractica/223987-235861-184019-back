## Arquitectura de software en la práctica - Backend - Obligatorio 1
Docentes: Nicolás Fornaro y Guillermo Areosa

Evelyn Jodus (223987), Hernán Reyes (235861), Michael Ellis (184019)

4 de Mayo de 2023
_____________________________________________________________________________________________

## Contenido de este Repositorio
- [Introducción y funcionalidades](#IntroYFunc)
- [Requerimientos funcionales](#RF)
- [Diagramas de vistas](#vistas)
- [Docker Compose](#docker)
- [Guía de despliegue](#despliegue)
- [Desarrollo y tecnologías utilziadas](#tecnologias)


## 1. Introducción y funcionalidades <a name="IntroYFunc"></a>

A lo largo de este repositorio se detallarán distintos aspectos importantes con lo que respecta al backend de esta aplicación.

La aplicación que se nos solicitó desarrollar tiene como base el manejo de inventario para empresas. 
El principal objetivo por el cual se crea es para lograr reducir errores humanos y mejorar la eficiencia en la gestión del inventario. 
Basándonos, tanto en los requerimientos funcionales como en los no funcionales es que surge esta aplicación basada en roles. Más adelante en la documentación, detallaremos las distintas acciones capaces de realizar cada uno de los roles que se encuentran en nuestro sistema, pero adelantaremos que contaremos tanto con Administradores como con Empleados.

## 2. Desarrollo y tecnologías utilziadas  <a name="tecnologias"></a>
### Desarrollo
Para esta primera versión. el equipo determinó tener una arquitectura monolítica cloud native por ser la más apropiada. 
A continuación detallaremos las decisiones de tecnologías utilizadas: 
#### Backend
El desarrollo del Backend fue realizado con NodeJS. 
Motivos por los cuales se utilizó NodeJS: 
Era conocida por todos los miembros de equipo, factor importante para poder cumplir con el tiempo en el cual se fue solicitada la aplicación
Ofrece una buena gestión de paquetes por el uso de npm 
Muchos de los problemas y de las soluciones que ofrece NodeJs se encuentran documentadas por su gran uso en el mercado. Esto facilita también el desarrollo. 
La alta escalabilidad que nos brinda el lenguaje por el uso de los Clusters

#### Despliegue 
Para el despliegue de la aplicación Backend utilizamos AWS. La misma fue elegida por ser la ejemplificada en el curso. 
Más adelante en el Readme se tendrá acceso a la guia de despliegue utilizada

## 3. Requerimientos funcionales <a name="RF"></a>
En la siguiente tabla se verán reflejados los distintos requerimientos funcionales solicitados, en conjunto con los actores correspondientes: 

| **Requerimiento** | **Descripción** | **Actor** |
|:---:|:---:|:---:|
| RF1 | Permite el registro de un usuario de tipo Administrador | Usuario Administrador |
| RF2 | Permite el registro tanto de usuarios administradores como usuarios empleados vía un link por mail | Usuario Administrador / Usuario Empleado |
| RF3 | Permite tanto el login como el logout del sistema de los distintos usuarios | Usuario Administrador / Usuario Empleado |
| RF4.1 | Permite dar de alta productos | Usuario Administrador |
| RF4.2 | Permite la modificación de productos | Usuario Administrador |
| RF4.3 | Permite la eliminación lógica de productos | Usuario Administrador |
| RF5.1 | Permite dar de alta proveedores | Usuario Administrador |
| RF5.2 | Permite la modificación de proveedores | Usuario Administrador |
| RF5.3 | Permite la eliminación lógica de proveedores | Usuario Administrador |
| RF6 | Permite el registro de compras de productos  | Usuario Administrador |
| RF7 | Permite el registro de ventas de productos | Usuario Administrador / Usuario Empleado |
| RF8 | Permite llevar un control del inventario de la tienda, actualizando cada vez que se registre una compra o una venta | Usuario Administrador / Usuario Empleado |
| RF9 | Se permite visualizar una pantalla con las ventas realizadas para un cierto período | Usuario Administrador / Usuario Empleado |
| RF10 | Disponibilización de un endpoint con los 3 productos más vendidos de forma histórica para una empresa | Endpoint público |
| RF11 | Disponibilización de un endpoint que dado un periodo de tiempo, te devuelva todas las compras a un proveedor X en ese tiempo | Endpoint público |

## 4. Diagramas de vistas <a name="vistas"></a>

## 5. Docker Compose <a name= "docker"></a>

## 6. Guia de despliegue <a name= "despliegue"></a>