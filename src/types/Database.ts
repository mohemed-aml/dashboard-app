// src/types/Database.ts
export interface Database {
  public: {
    Tables: {
      data: {
        Row: {
          id: number;
          value1: number;
          value2: number;
          value3: number;
        };
        Insert: {
          value1: number;
          value2: number;
          value3: number;
        };
        Update: {
          id?: number;
          value1?: number;
          value2?: number;
          value3?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}