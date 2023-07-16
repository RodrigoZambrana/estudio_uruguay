import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

export enum UserType {
  ADMIN = "admin",
  PRODUCTOR = "productor",
  CORTADOR = "cortador",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  contactNumber: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: UserType

}
