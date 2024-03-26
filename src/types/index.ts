export type ResponseErrors = {
  errors: {
    [key: string]: string[];
  };
};
export type Pagination = {
  limit: number;
  offset: number;
};

export type User = {
  email: string;
  username: string;
  image: string;
  token: string;
  bio: string;
};

export type Article = {
  author: User;
  body: string;
  createdAt: Date;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: Date;
};

export type Tab = {
  name: string;
  show: boolean;
  close?: () => void;
};

export type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
