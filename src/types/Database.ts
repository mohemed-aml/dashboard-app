// src/types/Database.ts
import { DataEntry } from './DataEntry';

export interface Database {
  public: {
    Tables: {
      data: {
        Row: DataEntry;
        Insert: Omit<DataEntry, 'id'>; // Assuming 'id' is auto-generated
        Update: Partial<DataEntry>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}