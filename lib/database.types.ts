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
      stats: {
        Row: {
          id: string
          used_tokens: number
          remaining_tokens: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          used_tokens?: number
          remaining_tokens?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          used_tokens?: number
          remaining_tokens?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      threads: {
        Row: {
          headline: string | null
          context: string | null
          topic: number | null
          id: number
          created_at: string | null
          author: number | null
          content: string | null
          user_id: string | null
        }
        Insert: {
          headline?: string | null
          context?: string | null
          topic?: number | null
          id?: number
          created_at?: string | null
          author?: number | null
          content?: string | null
          user_id?: string | null
        }
        Update: {
          headline?: string | null
          context?: string | null
          topic?: number | null
          id?: number
          created_at?: string | null
          author?: number | null
          content?: string | null
          user_id?: string | null
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