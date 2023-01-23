export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          value: string | null
          description: string | null
          avatar: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          value?: string | null
          description?: string | null
          avatar?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          value?: string | null
          description?: string | null
          avatar?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      threads: {
        Row: {
          id: number
          created_at: string | null
          content: string | null
          author: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          content?: string | null
          author?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          content?: string | null
          author?: string | null
        }
      }
      topics: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          value: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          value?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          value?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}