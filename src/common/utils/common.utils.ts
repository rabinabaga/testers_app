// src/common/utils/date.utils.ts

import { isISO8601 } from 'class-validator';
import { Request } from 'express';
import moment from 'moment';
import * as _ from 'lodash';

export function isValidIsoDate(date: string): boolean {
  return isISO8601(date);
}

export function isTodayOrFuture(date: string | Date): boolean {
  const d = new Date(date);
  const today = new Date();

  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return d >= today;
}

export function getMatchAndSortData(req: Request) {
  let matchData: Record<string, any> = {};
  let sortData: Record<string, any> = { createdAt: -1 };

  if (req.query.sortBy || req.query.orderBy) {
    const orderBy = req.query.orderBy ? req.query.orderBy : 'desc';
    sortData[req.query.sortBy as string] = orderBy === 'desc' ? -1 : 1;
  }
  if (req.query.startDate && req.query.endDate) {
    matchData['createdAt'] = _.pickBy({
      $gte: new Date(req.query.startDate as string),
      $lt: moment(req.query.endDate as string)
        .add(1, 'days')
        .toDate(),
    });
  } else if (req.query.startDate) {
    matchData['createdAt'] = _.pickBy({
      $gte: new Date(req.query.startDate as string),
    });
  } else if (req.query.endDate) {
    matchData['createdAt'] = _.pickBy({
      $lt: moment(req.query.endDate as string)
        .add(1, 'days')
        .toDate(),
    });
  }
  if (req.query.createdDate) {
    matchData['createdAt'] = {
      $gte: new Date(req.query.createdDate as string),
      $lt: moment(req.query.createdDate as string).add(1, 'days'),
    };
  }
  if (req.query.updatedDate) {
    matchData['updatedAt'] = {
      $gte: new Date(req.query.updatedDate as string),
      $lt: moment(req.query.updatedDate as string).add(1, 'days'),
    };
  }

  return {
    matchData,
    sortData,
  };
}

export interface PaginationResult<T> {
  totalRecords: number;
  records: T[];
  perPage: number;
  currentPage: number;
  next: number | null;
  prev: number | null;
  totalPages: number;
  pagingCounter: number;
  hasPrevious: boolean;
  hasNext: boolean;
  recordShown: number;
}

export function isStandardError(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.message === 'string' &&
    typeof obj.error === 'string' &&
    typeof obj.statusCode === 'number'
  );
}

export function mapActionToPermission(
  document: string,
  action: string,
): string {
  const prefixMap: Record<string, string> = {
    view: 'VIEW',
    edit: 'UPDATE',
    create: 'CREATE',
    approve: 'APPROVE',
    manage: 'MANAGE',
  };

  const actionPrefix = prefixMap[action.toLowerCase()];
  if (!actionPrefix) throw new Error(`Unsupported action: ${action}`);

  return `${actionPrefix}_${document.toUpperCase()}`;
}

export function generateRandomPassword(length = 12): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?";
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
