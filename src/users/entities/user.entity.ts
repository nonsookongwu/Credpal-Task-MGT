import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({type:'enum', enum:UserRoles, array:true, default: [UserRoles.USER]})
  role: UserRoles[];
}




