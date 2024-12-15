import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => 
{
  const token = sessionStorage.getItem('jwt');

  let modifiedRequest = request;
  
  if (token)
  {
    modifiedRequest = request.clone({setHeaders: {Authorization: "Bearer " + token}});
  }
   
  return next(modifiedRequest);
};
