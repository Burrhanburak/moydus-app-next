// lib/api-error.ts
// Separate file for ApiError class (can't export classes in "use server" files)

export class ApiError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.status = status;
    this.url = url;
    this.name = "ApiError";
  }
}

