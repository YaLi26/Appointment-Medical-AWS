# Medical Appointment Scheduling — Backend AWS
 
Aplicación backend para el agendamiento de citas médicas de asegurados que residen en Perú como en Colombia.

 
## Instalación y Despliegue
 
### Prerrequisitos
 
- Node.js >= 20.x
- AWS CLI 
- Serverless Framework v3 
### 1. Clonar e instalar dependencias
 
```bash
git clone https://github.com/tu-org/medical-appointment-backend.git
cd medical-appointment-backend
npm install
```
 
### 2. Compilar TypeScript
 
```bash
npm run build
```
 
### 3. Ejecutar pruebas
 
```bash
npm test
```
 

## API Reference
 
### Base URL
 
```
https://{api-id}.execute-api.{region}.amazonaws.com/{stage}
```
 
---
 
### `POST /appointments`
 
Registra una nueva solicitud de agendamiento.
 
**Request Body**
 
```json
{
  "insuredId": "00001",
  "scheduleId": 100,
  "countryISO": "PE"
}
```
 
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `insuredId` | string | Código de cinco digitos del asegurado |
| `scheduleId` | number | ID del espacio de cita |
| `countryISO` | string | País: `"PE"` o `"CL"` |
 
**Response `200 OK**
 
```json
{
  "message": "Agendamiento en proceso",
  "appointmentId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending"
}
```
 
**Response `400 Bad Request`**
 
```json
{
  "error": "ValidationError",
  "message": "countryISO debe ser 'PE' o 'CL'"
}
```
 
---
 
### `GET /appointments/{insuredId}`
 
Retorna todas las citas de un asegurado con su estado actual.
 
**Path Parameters**
 
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `insuredId` | string | Código del asegurado (5 dígitos) |
 
**Response `200 OK`**
 
```json
{
  "insuredId": "00123",
  "appointments": [
    {
      "appointmentId": "550e8400-e29b-41d4-a716-446655440000",
      "scheduleId": 100,
      "countryISO": "PE",
      "status": "completed",
      "createdAt": "2024-09-30T12:30:00Z",
      "updatedAt": "2024-09-30T12:31:45Z"
    },
    {
      "appointmentId": "661f9511-f30c-52e5-b827-557766551111",
      "scheduleId": 205,
      "countryISO": "PE",
      "status": "pending",
      "createdAt": "2024-10-01T09:00:00Z",
      "updatedAt": "2024-10-01T09:00:00Z"
    }
  ]
}
```
 
**Response `404 Not Found`**
 
```json
{
  "error": "NotFoundError",
  "message": "No se encontraron citas para el asegurado 00123"
}
```
 
---


