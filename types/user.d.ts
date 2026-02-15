export type User = {
  userId: string;
  fullName: string;
  email: string;
  address: string;
  contactNumber: string;
  role: "Admin" | "Customer";
};
