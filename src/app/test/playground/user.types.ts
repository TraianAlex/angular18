export interface UserInfo {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    country: string;
    city: string;
    zip: string;
  };
  cc: string;
}
