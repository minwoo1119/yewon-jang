"use client";

import type { PortfolioContent } from "./portfolio-store";

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
};

type PortfolioResponse = {
  id: string;
  content: PortfolioContent;
  updatedAt: string;
};

type UploadResponse = {
  bucket: string;
  path: string;
  publicUrl: string;
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000/api"
  );
}

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as ApiErrorPayload;

    if (Array.isArray(payload.message)) {
      return payload.message.join(", ");
    }

    if (payload.message) {
      return payload.message;
    }

    if (payload.error) {
      return payload.error;
    }
  } catch {}

  return response.statusText || "Request failed.";
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function fetchPortfolio() {
  return request<PortfolioResponse>("/portfolio");
}

export async function savePortfolio(content: PortfolioContent) {
  return request<PortfolioResponse>("/portfolio", {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
}

export async function loginAdmin(password: string) {
  return request<{ authenticated: boolean }>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return request<UploadResponse>("/admin/uploads/image", {
    method: "POST",
    body: formData,
  });
}
