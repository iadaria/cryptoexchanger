// types for connection between services inside the microservice.
// Data Transfer Object (DTO) — один из шаблонов проектирования, используется
import { User } from 'orm';

// для передачи данных между подсистемами приложения.
export type LoginInput = Pick<User, 'email' | 'password'> & {
  ip?: string;
};
