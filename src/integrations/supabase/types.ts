export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      demogoron_debuggers: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          leader_cnic: string
          leader_contact: string
          leader_department: string
          leader_email: string
          leader_name: string
          leader_university: string
          member_cnic: string | null
          member_contact: string | null
          member_email: string | null
          member_name: string | null
          member_university: string | null
          payment_screenshot_url: string | null
          payment_status: string | null
          team_name: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          leader_cnic: string
          leader_contact: string
          leader_department: string
          leader_email: string
          leader_name: string
          leader_university: string
          member_cnic?: string | null
          member_contact?: string | null
          member_email?: string | null
          member_name?: string | null
          member_university?: string | null
          payment_screenshot_url?: string | null
          payment_status?: string | null
          team_name: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          leader_cnic?: string
          leader_contact?: string
          leader_department?: string
          leader_email?: string
          leader_name?: string
          leader_university?: string
          member_cnic?: string | null
          member_contact?: string | null
          member_email?: string | null
          member_name?: string | null
          member_university?: string | null
          payment_screenshot_url?: string | null
          payment_status?: string | null
          team_name?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string | null
          department: string
          email: string
          event_type: string
          father_name: string
          id: string
          name: string
          phone: string
          roll_no: string
          university: string
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          event_type: string
          father_name: string
          id?: string
          name: string
          phone: string
          roll_no: string
          university: string
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          event_type?: string
          father_name?: string
          id?: string
          name?: string
          phone?: string
          roll_no?: string
          university?: string
        }
        Relationships: []
      }
      hackemon_registrations: {
        Row: {
          created_at: string | null
          id: string
          leader_cnic: string
          leader_contact: string
          leader_department: string
          leader_email: string
          leader_name: string
          leader_university: string
          member1_cnic: string
          member1_contact: string
          member1_department: string
          member1_email: string
          member1_name: string
          member1_university: string
          member2_cnic: string | null
          member2_contact: string | null
          member2_department: string | null
          member2_email: string | null
          member2_name: string | null
          member2_university: string | null
          payment_screenshot_url: string | null
          payment_status: string | null
          team_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          leader_cnic: string
          leader_contact: string
          leader_department: string
          leader_email: string
          leader_name: string
          leader_university: string
          member1_cnic: string
          member1_contact: string
          member1_department: string
          member1_email: string
          member1_name: string
          member1_university: string
          member2_cnic?: string | null
          member2_contact?: string | null
          member2_department?: string | null
          member2_email?: string | null
          member2_name?: string | null
          member2_university?: string | null
          payment_screenshot_url?: string | null
          payment_status?: string | null
          team_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          leader_cnic?: string
          leader_contact?: string
          leader_department?: string
          leader_email?: string
          leader_name?: string
          leader_university?: string
          member1_cnic?: string
          member1_contact?: string
          member1_department?: string
          member1_email?: string
          member1_name?: string
          member1_university?: string
          member2_cnic?: string | null
          member2_contact?: string | null
          member2_department?: string | null
          member2_email?: string | null
          member2_name?: string | null
          member2_university?: string | null
          payment_screenshot_url?: string | null
          payment_status?: string | null
          team_name?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
