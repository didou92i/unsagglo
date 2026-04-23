export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      adherents: {
        Row: {
          created_at: string
          email: string
          grade: string | null
          id: string
          nom: string
          prenom: string
          service: string | null
          statut: string
          telephone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          grade?: string | null
          id?: string
          nom: string
          prenom: string
          service?: string | null
          statut?: string
          telephone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          grade?: string | null
          id?: string
          nom?: string
          prenom?: string
          service?: string | null
          statut?: string
          telephone?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          auteur: string
          categorie: string
          contenu: string
          created_at: string
          id: string
          publie: boolean
          slug: string
          titre: string
        }
        Insert: {
          auteur?: string
          categorie: string
          contenu: string
          created_at?: string
          id?: string
          publie?: boolean
          slug: string
          titre: string
        }
        Update: {
          auteur?: string
          categorie?: string
          contenu?: string
          created_at?: string
          id?: string
          publie?: boolean
          slug?: string
          titre?: string
        }
        Relationships: []
      }
      captations_aide_carburant: {
        Row: {
          id: string
          email: string
          created_at: string
          eligibilite: string
          critere_bloquant: string | null
          opt_in_newsletter: boolean
          composition_foyer: string | null
          profil_kilometrage: string | null
          source: string
          pdf_telecharge: boolean
          statut_relance: string
          notes_internes: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          eligibilite: string
          critere_bloquant?: string | null
          opt_in_newsletter?: boolean
          composition_foyer?: string | null
          profil_kilometrage?: string | null
          source?: string
          pdf_telecharge?: boolean
          statut_relance?: string
          notes_internes?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          eligibilite?: string
          critere_bloquant?: string | null
          opt_in_newsletter?: boolean
          composition_foyer?: string | null
          profil_kilometrage?: string | null
          source?: string
          pdf_telecharge?: boolean
          statut_relance?: string
          notes_internes?: string | null
        }
        Relationships: []
      }
      simulator_funnel_events: {
        Row: {
          id: string
          session_id: string
          step: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          step: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          step?: string
          created_at?: string
        }
        Relationships: []
      }
      candidats_liste: {
        Row: {
          adresse: string
          created_at: string
          email: string
          id: string
          nom: string
          prenom: string
          service: string
          telephone: string
        }
        Insert: {
          adresse: string
          created_at?: string
          email: string
          id?: string
          nom?: string
          prenom: string
          service: string
          telephone: string
        }
        Update: {
          adresse?: string
          created_at?: string
          email?: string
          id?: string
          nom?: string
          prenom?: string
          service?: string
          telephone?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          nom: string
          objet: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          nom: string
          objet: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          nom?: string
          objet?: string
        }
        Relationships: []
      }
      contributions_elections: {
        Row: {
          anonyme: boolean
          contenu: string
          created_at: string
          id: string
          prenom: string
          service: string
          statut: string | null
          theme: string
        }
        Insert: {
          anonyme?: boolean
          contenu: string
          created_at?: string
          id?: string
          prenom: string
          service: string
          statut?: string | null
          theme: string
        }
        Update: {
          anonyme?: boolean
          contenu?: string
          created_at?: string
          id?: string
          prenom?: string
          service?: string
          statut?: string | null
          theme?: string
        }
        Relationships: []
      }
      page_visits: {
        Row: {
          id: string
          page_path: string
          visited_at: string
        }
        Insert: {
          id?: string
          page_path: string
          visited_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          visited_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          grade: string | null
          id: string
          nom: string
          prenom: string
          service: string | null
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          grade?: string | null
          id?: string
          nom?: string
          prenom?: string
          service?: string | null
          telephone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          grade?: string | null
          id?: string
          nom?: string
          prenom?: string
          service?: string | null
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rights_content: {
        Row: {
          categorie: string
          contenu: string
          created_at: string
          id: string
          sources: string[] | null
          updated_at: string
        }
        Insert: {
          categorie: string
          contenu?: string
          created_at?: string
          id?: string
          sources?: string[] | null
          updated_at?: string
        }
        Update: {
          categorie?: string
          contenu?: string
          created_at?: string
          id?: string
          sources?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: boolean
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: boolean
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: boolean
        }
        Relationships: []
      }
      sondage_options: {
        Row: {
          id: string
          label: string
          sondage_id: string
          votes: number
        }
        Insert: {
          id?: string
          label: string
          sondage_id: string
          votes?: number
        }
        Update: {
          id?: string
          label?: string
          sondage_id?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "sondage_options_sondage_id_fkey"
            columns: ["sondage_id"]
            isOneToOne: false
            referencedRelation: "sondages"
            referencedColumns: ["id"]
          },
        ]
      }
      sondage_votes: {
        Row: {
          created_at: string
          fingerprint: string
          id: string
          option_id: string
          sondage_id: string
        }
        Insert: {
          created_at?: string
          fingerprint: string
          id?: string
          option_id: string
          sondage_id: string
        }
        Update: {
          created_at?: string
          fingerprint?: string
          id?: string
          option_id?: string
          sondage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sondage_votes_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "sondage_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sondage_votes_sondage_id_fkey"
            columns: ["sondage_id"]
            isOneToOne: false
            referencedRelation: "sondages"
            referencedColumns: ["id"]
          },
        ]
      }
      sondages: {
        Row: {
          actif: boolean
          created_at: string
          id: string
          question: string
          theme: string
        }
        Insert: {
          actif?: boolean
          created_at?: string
          id?: string
          question: string
          theme: string
        }
        Update: {
          actif?: boolean
          created_at?: string
          id?: string
          question?: string
          theme?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      simulator_funnel_stats: {
        Row: {
          step: string | null
          unique_sessions: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      capture_aide_carburant_email: {
        Args: {
          p_email: string
          p_eligibilite: string
          p_critere_bloquant: string | null
          p_opt_in_newsletter: boolean
          p_composition_foyer: string | null
          p_profil_kilometrage: string | null
        }
        Returns: string
      }
      mark_aide_carburant_pdf_downloaded: {
        Args: {
          p_email: string
        }
        Returns: undefined
      }
      get_visit_stats: {
        Args: never
        Returns: {
          page_path: string
          visit_count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      vote_sondage: {
        Args: {
          p_fingerprint: string
          p_option_id: string
          p_sondage_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
