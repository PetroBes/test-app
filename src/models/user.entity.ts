import { AfterInsert, AfterRemove, AfterUpdate, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with id:', this.id);
  }
}
