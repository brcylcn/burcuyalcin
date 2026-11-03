export type Category = "Seminer" | "Atölye" | "Söyleşi" | string;

export interface CampusEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number | null;
}

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
