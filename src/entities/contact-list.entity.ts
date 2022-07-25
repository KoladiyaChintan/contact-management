import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRegister } from './create-user.entity';

@Table({
  tableName: 'contact-list',
})
export class ContactList extends Model<ContactList> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserRegister)
  @Column({
    type: DataType.UUID,
  })
  userid: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phonenumber: string;
}
