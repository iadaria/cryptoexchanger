// types for connection between services inside the microservice.
// Data Transfer Object (DTO) — один из шаблонов проектирования, используется

import { LoginRequest } from 'contracts';

// для передачи данных между подсистемами приложения.
export interface LoginDto extends LoginRequest {
  ip?: string;
}
