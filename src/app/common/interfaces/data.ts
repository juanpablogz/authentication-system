export interface UserData {
  active: boolean;
  data: {
    displayName: string;
    email: string;
  };
  uid: string;
}

export interface ProjectFirebaseData {
  data: {
    client: string;
    infrastructure: string;
    json: string;
    name: string;
    thumbnail: string;
  };
  pid: string;
  updated_at: number;
}
