export interface Message {
  message?: string;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T | Message;
}

export interface HttpRequest<T> {
  params?: T;
  body?: T;
}

export interface IController {
  handle(request?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}