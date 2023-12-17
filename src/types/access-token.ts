export interface AccessTokenData {
  role: string;
  user: {
    id: number;
    name: string;
    email: string;
    institution_id?: number;
    unit_id?: number;
  };
}
