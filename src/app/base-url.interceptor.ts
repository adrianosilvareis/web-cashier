import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newUri = req.url.replace('/api', '');
  const apiReq = req.clone({ url: `http://localhost:5000${newUri}` });

  return next(apiReq);
};
