import { AbstractEntity } from 'src/common/entities';
import { AccountRoles } from 'src/common/enum';
import { Column, Entity, Index, BeforeInsert } from 'typeorm';

@Entity('user')
export class User extends AbstractEntity {
  @Index({ unique: true })
  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ enum: AccountRoles, default: '' })
  role = AccountRoles.USER;

  @Column({ default: '', type: 'string' })
  refCode = '';

  // @Column({ enum: StaffRoles })
  // position: StaffRoles;

  @Column({ default: false, type: 'boolean' })
  isAccept = false;

  @BeforeInsert()
  nameToUpperCase() {
    this.userName = this.userName.toLowerCase();
  }
}
