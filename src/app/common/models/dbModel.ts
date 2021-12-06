import { DbData } from '@interfaces/db';

export class DbFields {
  private _id: string;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: Partial<DbData>) {
    this._id = data.id!;
    this._isActive = data.is_active!;
    this._createdAt = data.created_at!;
    this._updatedAt = data.updated_at!;
  }

  get id(): string {
    return this._id;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
