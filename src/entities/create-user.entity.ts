import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ContactList } from './contact-list.entity';

@Table({
  tableName: 'userRegister',
})
export class UserRegister extends Model<UserRegister> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_verified: boolean;

  @HasMany(() => ContactList)
  contactlist: ContactList[];
}
