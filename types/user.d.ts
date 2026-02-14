export type User = {
  userId: string;
  fullName: string;
  email: string;
  address: string;
  contactNumber: string;
  roleLabel: string;
  role: "Admin" | "Customer";
};
