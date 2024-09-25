export interface User {
    active: boolean; // true or false
    image:string
    amountSpend: number; // amount spent by the user
    created: string; // timestamp of when the user was created
    email: string; // user's email
    firstname: string; // user's first name
    id: string; // user's unique ID
    lastname: string; // user's last name
    permission: "user" | "admin" | "moderator"; // user's permission level, assuming other roles may exist
    phone: string; // user's phone number
    totalRequest: number; // total number of requests made by the user
    totalSpent: number; // total amount spent by the user
    wallet: number; // user's wallet balance
  }