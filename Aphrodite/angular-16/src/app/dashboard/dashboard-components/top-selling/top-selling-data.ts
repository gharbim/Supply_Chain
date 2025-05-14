export interface TeamMember {
  image: string;
  name: string;
  email: string;
  role: string;
}

export const Team: TeamMember[] = [
  {
    image: 'assets/images/users/user1.jpg',
    name: 'Malika Gharbi',
    email: 'malika.gharbi@aphrodite.com',
    role: 'CEO'
  },
  {
    image: 'assets/images/users/user2.jpg',
    name: 'Billel Dabech',
    email: 'billel.dabech@aphrodite.com',
    role: 'Sales Manager'
  },
  {
    image: 'assets/images/users/user3.jpg',
    name: 'Mariem Boudhina',
    email: 'mariem.boudhina@aphrodite.com',
    role: 'Stock Manager'
  },
  {
    image: 'assets/images/users/user1.jpg',
    name: 'Aziza Kallel',
    email: 'aziza.kallel@aphrodite.com',
    role: 'Stock Manager'
  },
  {
    image: 'assets/images/users/user3.jpg',
    name: 'Dina Gharbi',
    email: 'dina.gharbi@aphrodite.com',
    role: 'Production Manager'
  },
  {
    image: 'assets/images/users/user4.jpg',
    name: 'Med Oussama Ayadi',
    email: 'oussama.ayadi@aphrodite.com',
    role: 'Production Manager'
  }
];
