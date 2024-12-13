import { HttpInterceptorFn } from '@angular/common/http';
import { BASE_URL } from '../config';

export const baseurlInterceptor: HttpInterceptorFn = (req, next) => {
  const updatedRequest = req.clone({
    url: req.url.startsWith('http') ? req.url : `${BASE_URL}${req.url}`,
  });
  return next(updatedRequest);
};
